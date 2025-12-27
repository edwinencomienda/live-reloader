import { serve } from "bun";
import { watch } from "fs";
import { resolve, sep } from "path";

type ClientController = ReadableStreamDefaultController<Uint8Array>;
const clients = new Set<ClientController>();
const encoder = new TextEncoder();

function parseArgs(): { port: number; rootDir: string } {
  const argv = Bun.argv.slice(2); // skip `bun` and script path

  let port = 3000;
  let rootDir: string | undefined;

  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]!;

    // --port / -p
    if (a === "--port" || a === "-p") {
      const v = argv[i + 1];
      if (v) {
        const n = Number(v);
        if (Number.isFinite(n) && n > 0) port = n;
      }
      i += 1;
      continue;
    }
    if (a.startsWith("--port=")) {
      const n = Number(a.slice("--port=".length));
      if (Number.isFinite(n) && n > 0) port = n;
      continue;
    }

    // Positional: first non-flag arg is the directory
    if (!a.startsWith("-") && !rootDir) {
      rootDir = a;
    }
  }

  return { port, rootDir: resolve(rootDir ?? process.cwd()) };
}

const { port, rootDir } = parseArgs();

function now() {
  return new Date().toISOString();
}

function log(line: string) {
  console.log(`[${now()}] ${line}`);
}

function formatPath(url: URL) {
  return `${url.pathname}${url.search}`;
}

let server: ReturnType<typeof serve>;
try {
  server = serve({
    port,
    async fetch(req) {
      const url = new URL(req.url);
      const reqPath = formatPath(url);

      if (url.pathname === "/__reload") {
        let controllerRef: ClientController | null = null;
        const stream = new ReadableStream<Uint8Array>({
          start(controller) {
            controllerRef = controller;
            clients.add(controller);
            controller.enqueue(encoder.encode("retry: 1000\n\n"));
            log(`SSE connected (clients=${clients.size})`);
          },
          cancel() {
            if (controllerRef) clients.delete(controllerRef);
            log(`SSE disconnected (clients=${clients.size})`);
          },
        });
        const res = new Response(stream, {
          headers: {
            "Content-Type": "text/event-stream; charset=utf-8",
            "Cache-Control": "no-cache, no-transform",
            Connection: "keep-alive",
          },
        });
        log(`${req.method} ${reqPath} -> ${res.status}`);
        return res;
      }

      let pathname: string;
      try {
        pathname = decodeURIComponent(url.pathname);
      } catch {
        const res = new Response("Bad Request", { status: 400 });
        log(`${req.method} ${reqPath} -> ${res.status}`);
        return res;
      }

      // Redirect /index.html to / for cleaner URLs
      if (pathname === "/index.html") {
        const res = Response.redirect(url.origin + "/" + url.search, 301);
        log(`${req.method} ${reqPath} -> ${res.status} (redirect to /)`);
        return res;
      }

      // Default document
      if (pathname === "/") pathname = "/index.html";

      // Prevent path traversal: resolve against rootDir and ensure the result stays inside it.
      // We keep the leading "/" in pathname and prefix with "." so resolve treats it as relative.
      const rootPrefix = rootDir.endsWith(sep) ? rootDir : rootDir + sep;

      function isInsideRoot(p: string) {
        return p === rootDir || p.startsWith(rootPrefix);
      }

      let resolvedPath = resolve(rootDir, `.${pathname}`);
      if (!isInsideRoot(resolvedPath)) {
        const res = new Response("Forbidden", { status: 403 });
        log(`${req.method} ${reqPath} -> ${res.status}`);
        return res;
      }

      let file = Bun.file(resolvedPath);

      // If file doesn't exist and path has no extension, try .html
      if (!(await file.exists())) {
        const hasExtension = pathname.includes(".") && !pathname.endsWith("/");
        if (!hasExtension) {
          const htmlPath = resolve(rootDir, `.${pathname}.html`);
          if (isInsideRoot(htmlPath)) {
            const htmlFile = Bun.file(htmlPath);
            if (await htmlFile.exists()) {
              resolvedPath = htmlPath;
              file = htmlFile;
            }
          }
        }
      }

      if (!(await file.exists())) {
        const res = new Response("Not Found", { status: 404 });
        log(`${req.method} ${reqPath} -> ${res.status}`);
        return res;
      }

      if (file.type.startsWith("text/html")) {
        const t = await file.text();
        const injected = `<script>
const es=new EventSource('/__reload');
es.onmessage=()=>location.reload();
</script>`;

        const body = t.includes("</body>")
          ? t.replace("</body>", `${injected}</body>`)
          : `${t}\n${injected}\n`;

        const res = new Response(body, {
          headers: {
            "Content-Type": file.type || "text/html; charset=utf-8",
          },
        });
        log(`${req.method} ${reqPath} -> ${res.status} (${resolvedPath})`);
        return res;
      }

      const res = new Response(file);
      log(`${req.method} ${reqPath} -> ${res.status} (${resolvedPath})`);
      return res;
    },
  });
} catch (err) {
  const msg = err instanceof Error ? err.message : String(err);
  if (msg.includes("EADDRINUSE") || msg.toLowerCase().includes("in use")) {
    log(`Port ${port} is already in use.`);
    console.log(
      `  Try using a different port: live-reloader --port ${port + 1}`
    );
  } else {
    log(`Failed to start server: ${msg}`);
  }
  process.exit(1);
}

log(`Serving "${rootDir}" at http://localhost:${server.port}`);

let reloadTimer: ReturnType<typeof setTimeout> | undefined;
const watcher = watch(rootDir, { recursive: true }, (eventType, filename) => {
  const label = filename ? String(filename) : "(unknown file)";
  log(`fs.watch ${eventType}: ${label}`);

  if (reloadTimer) clearTimeout(reloadTimer);
  reloadTimer = setTimeout(() => {
    const msg = encoder.encode("data: reload\n\n");
    let ok = 0;
    for (const c of clients) {
      try {
        c.enqueue(msg);
        ok += 1;
      } catch {
        clients.delete(c);
      }
    }
    if (ok > 0) log(`reload broadcast -> ${ok} client(s)`);
  }, 75);
});

watcher.on("error", (e) => {
  const msg = e instanceof Error ? e.message : String(e);
  log(`fs.watch error: ${msg}`);
});

log(`Watching "${rootDir}" for changes (recursive)`);
