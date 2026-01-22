# Publishing Guide

This document outlines the complete workflow for publishing a new version of live-reloader to npm.

## Pre-Publish Checklist

Before publishing, ensure you have:
- [ ] Made and tested all code changes
- [ ] Determined the appropriate version number (following [Semantic Versioning](https://semver.org/))
- [ ] npm account credentials ready (you'll be prompted to authenticate)

## Publishing Workflow

Follow these steps in order:

### 1. Update the Changelog

Edit `docs/CHANGELOG.md`:
- Move items from `[Unreleased]` section to a new version section
- Add the new version number and date
- Format: `## [X.Y.Z] - YYYY-MM-DD`

Example:
```markdown
## [Unreleased]

## [1.2.0] - 2026-01-22

### Added
- CORS support for cross-origin access
- OPTIONS preflight request handling
```

### 2. Update Version Numbers

Update the version in **all three files**:
- `package.json` → `"version": "X.Y.Z"`
- `index.ts` → `const VERSION = "X.Y.Z";`
- `docs/CHANGELOG.md` → Already done in step 1

### 3. Commit Changes

```bash
git add -A
git commit -m "feat: descriptive message

- Detailed point 1
- Detailed point 2
- Bump version to X.Y.Z"
```

Use conventional commit prefixes:
- `feat:` - New feature
- `fix:` - Bug fix
- `chore:` - Maintenance
- `docs:` - Documentation

### 4. Push to GitHub

```bash
git push
```

### 5. Create Release Tag

```bash
git tag -a vX.Y.Z -m "Release vX.Y.Z - Brief description"
```

Example:
```bash
git tag -a v1.2.0 -m "Release v1.2.0 - Add CORS support for cross-origin access"
```

### 6. Push the Tag

```bash
git push origin vX.Y.Z
```

### 7. Publish to npm

```bash
npm publish
```

You'll be prompted to authenticate via browser if needed. The `prepublishOnly` script will automatically build the package before publishing.

## Version Numbering Guide

Follow [Semantic Versioning](https://semver.org/):

- **MAJOR** (X.0.0) - Breaking changes
  - Incompatible API changes
  - Removed functionality
  
- **MINOR** (0.X.0) - New features, backwards compatible
  - New functionality added
  - New options or features
  - CORS support addition (like v1.2.0)
  
- **PATCH** (0.0.X) - Bug fixes, backwards compatible
  - Bug fixes
  - Performance improvements
  - Documentation updates

## Quick Reference

Complete command sequence:
```bash
# After updating changelog and version numbers
git add -A
git commit -m "feat: your message"
git push
git tag -a vX.Y.Z -m "Release vX.Y.Z - description"
git push origin vX.Y.Z
npm publish
```

## Troubleshooting

### npm authentication expired
If you see "Access token expired or revoked":
```bash
npm login
```
Then retry `npm publish`

### Tag already exists
If the tag already exists locally:
```bash
git tag -d vX.Y.Z  # Delete local tag
git tag -a vX.Y.Z -m "Message"  # Create new tag
git push origin vX.Y.Z --force  # Force push (use with caution)
```

### Wrong version published
You cannot unpublish a version within 72 hours of publishing it (npm policy). Instead:
1. Publish a new patch version with the fix
2. Or wait 72 hours and use `npm unpublish`

## Post-Publish Verification

After publishing, verify:
1. Package appears at: `https://www.npmjs.com/package/@edwinencomienda/live-reloader`
2. Version is correct on npm
3. Tag appears on GitHub: `https://github.com/edwinencomienda/live-reloader/releases`
4. Test installation: `npm install -g @edwinencomienda/live-reloader@X.Y.Z`
