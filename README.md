# Live Reloader

A lightweight live-reload development server built with Bun. Serves static files and automatically reloads connected browsers when files change.

## Installation

Install globally using npm:

```bash
npm install -g @edwinencomienda/live-reloader
```

Or using bun:

```bash
bun install -g @edwinencomienda/live-reloader
```

**Note:** This package requires Bun to be installed on your system. [Install Bun](https://bun.sh/docs/installation) first if you haven't already.

### Updating

To update to the latest version:

```bash
npm update -g @edwinencomienda/live-reloader
```

Or with bun:

```bash
bun update -g @edwinencomienda/live-reloader
```

## Usage

```bash
# Serve current directory
live-reloader

# Serve a specific directory
live-reloader ./public

# Change the port
live-reloader --port 5173

# Custom host and port
live-reloader ./public --host 0.0.0.0 --port 8080

# Check version
live-reloader --version
```

## Development

### Prerequisites

- [Bun](https://bun.sh/docs/installation) installed on your system

### Getting Started

Install dependencies:

```bash
bun install
```

Run in development mode (with hot reload):

```bash
bun run dev
```

Run from source:

```bash
bun run start

# With options
bun run start ./public --port 5173
```

### Building

**Build for npm publishing:**

```bash
bun run build
```

This creates `dist/index.js` and is automatically run before publishing.

**Build standalone binary:**

```bash
bun run build:binary
```

This creates a standalone executable at `dist/live-reloader` that includes the Bun runtime.

---

Built with [Bun](https://bun.sh) 🚀

