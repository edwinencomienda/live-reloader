# Live Reloader

A lightweight live-reload development server built with Bun. Serves static files and automatically reloads connected browsers when files change.

## Binary Usage

### Installation (macOS)

Download the latest release and install to `/usr/local/bin`:

```bash
curl -fL --progress-bar https://github.com/edwinencomienda/live-reloader/releases/latest/download/live-reloader -o /tmp/live-reloader && \
chmod +x /tmp/live-reloader && \
sudo mv /tmp/live-reloader /usr/local/bin/live-reloader
```

Verify the installation:

```bash
live-reloader --version
```

### Usage

```bash
# Serve current directory
live-reloader

# Serve a specific directory
live-reloader ./public

# Change the port
live-reloader --port 5173

# Combine both
live-reloader ./public --port 5173
```

## Development

### Install Dependencies

```bash
bun install
```

### Run from Source

```bash
# Development mode (hot reload on code changes)
bun run dev

# Standard mode
bun run start

# Serve a specific directory
bun run start ./public

# Change the port
bun run start --port 5173
```

### Build

Build a standalone executable (includes Bun runtime, no dependencies needed):

```bash
bun run build
```

Then run the executable directly:

```bash
./dist/live-reloader ./public --port 3000
```

### Global Installation from Build

To make the locally built binary available globally:

```bash
sudo mv ./dist/live-reloader /usr/local/bin/live-reloader
```

---

This project was created using `bun init` in bun v1.3.5. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
