# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.2.1] - 2026-04-20

### Changed
- File watcher now ignores changes in `.git` directory to prevent unnecessary reloads during git operations

## [1.2.0] - 2026-01-22

### Added
- CORS (Cross-Origin Resource Sharing) support: server now accepts requests from any origin
- OPTIONS preflight request handling for CORS compliance
- Access-Control headers on all responses (SSE endpoint, HTML files, static files, and error responses)

## [1.1.0] - 2026-01-10

### Added
- Automatic port fallback mechanism: when the requested port is in use, the server now automatically tries up to 10 alternative ports (e.g., if 3000 is in use, tries 3001, 3002, etc.)
- Directory validation with formatted error message: displays a clear, color-coded error banner when the specified directory does not exist
- Warning notification in startup banner when an alternative port is used

### Changed
- Improved error handling for port conflicts with graceful retry logic
- Enhanced user feedback with detailed logging during port selection process

### Fixed
- Server no longer exits immediately when port is in use; instead tries alternative ports
- Better handling of EADDRINUSE errors with informative messages

## [1.0.3] - 2026-01-10

### Initial features
- Live reloading development server for static HTML files
- SSE (Server-Sent Events) based auto-reload mechanism
- Automatic HTML injection for reload functionality
- File watching with recursive directory monitoring
- Path traversal protection
- .html extension resolution for clean URLs
- Network interface detection for LAN access
- Custom port and hostname configuration
- Formatted startup banner with local and network URLs
