# live-reloader

A lightweight live-reload development server built with Bun. Serves static files and automatically reloads connected browsers when files change.

## Installation

To install dependencies:

```bash
bun install
```

## Usage

```bash
# Serve current directory
bun run start

# Serve a specific directory
bun run start ./public

# Change the port
bun run start --port 5173

# Combine both
bun run start ./public --port 5173
```

## Build

Build a standalone executable (includes Bun runtime, no dependencies needed):

```bash
# Build executable
bun run build
```

Then run the executable directly:

```bash
./dist/live-reloader ./public --port 3000
```

## Global Installation (macOS)

To make the binary available globally:

```bash
sudo mv ./dist/live-reloader /usr/local/bin/live-reloader
```

Now you can use it from any directory:

```bash
live-reloader ./my-project --port 3000
```

This project was created using `bun init` in bun v1.3.5. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
