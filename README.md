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

## Publishing to npm

### First Time Setup

1. Create an npm account at [npmjs.com](https://www.npmjs.com/) if you don't have one
2. Login to npm from your terminal:

```bash
npm login
```

### Publishing Updates

1. **Update the version** in `package.json`:

```bash
# Patch release (0.1.4 -> 0.1.5)
npm version patch

# Minor release (0.1.4 -> 0.2.0)
npm version minor

# Major release (0.1.4 -> 1.0.0)
npm version major
```

This automatically creates a git commit and tag.

2. **Publish to npm**:

```bash
npm publish
```

The `prepublishOnly` script automatically builds the dist folder before publishing.

3. **Push changes to GitHub**:

```bash
git push && git push --tags
```

### Testing Before Publishing

Test the package locally before publishing:

```bash
# Build the package
bun run build

# Create a test link
npm link

# Test the CLI
live-reloader --version

# Unlink when done
npm unlink -g live-reloader
```

---

Built with [Bun](https://bun.sh) 🚀

