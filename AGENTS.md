# Instructions for AI Agents

This document provides guidelines for AI agents (like GitHub Copilot, Claude, etc.) working on this project.

## Changelog Management

**CRITICAL: Always update the changelog before publishing or pushing changes to npm.**

### When to Update CHANGELOG.md

Update `docs/CHANGELOG.md` in the following situations:
- Before running `npm publish` or any publish command
- When adding new features
- When fixing bugs
- When making breaking changes
- When deprecating functionality
- When removing features
- When making significant performance improvements

### Changelog Format

The changelog follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) format.

#### Structure:
```markdown
## [Unreleased]

### Added
- New features go here

### Changed
- Changes to existing functionality

### Deprecated
- Soon-to-be removed features

### Removed
- Removed features

### Fixed
- Bug fixes

### Security
- Security fixes

## [Version Number] - YYYY-MM-DD
(Previous releases)
```

#### Guidelines:
1. **Always add new changes to the `[Unreleased]` section** at the top
2. **Use clear, user-focused descriptions** - explain what changed from a user's perspective
3. **Group changes by category** (Added, Changed, Fixed, etc.)
4. **Be specific** - include enough detail for users to understand the impact
5. **Use bullet points** for each change

### Before Publishing to npm

When preparing to publish a new version:

1. **Move unreleased changes** to a new version section:
   ```markdown
   ## [0.2.0] - 2026-01-10
   
   ### Added
   - Feature X
   
   (Move all items from [Unreleased] here)
   ```

2. **Update the version number** in both:
   - `docs/CHANGELOG.md`
   - `package.json`
   - `index.ts` (VERSION constant)

3. **Add the release date** in YYYY-MM-DD format

4. **Keep the `[Unreleased]` section** empty but present for future changes

### Example Workflow

```bash
# 1. Make code changes
# 2. Update CHANGELOG.md [Unreleased] section
# 3. Commit changes
git add .
git commit -m "feat: add new feature"

# 4. When ready to publish:
# - Move [Unreleased] items to new version section
# - Update version in package.json and index.ts
# - Commit version bump
git add .
git commit -m "chore: bump version to 0.2.0"

# 5. Publish to npm
npm publish
```

## Version Numbering

Follow [Semantic Versioning](https://semver.org/):
- **MAJOR** (1.0.0): Breaking changes
- **MINOR** (0.1.0): New features, backwards compatible
- **PATCH** (0.0.1): Bug fixes, backwards compatible

## Commit Message Convention

Use [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `chore:` - Maintenance tasks
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Test changes

## Important Reminders

- ✅ **DO** update the changelog with every significant change
- ✅ **DO** keep changelog entries user-focused and clear
- ✅ **DO** bump version numbers according to semver
- ❌ **DON'T** publish without updating the changelog
- ❌ **DON'T** forget to move unreleased items to a versioned section before publishing
- ❌ **DON'T** skip version number updates in all three files (CHANGELOG.md, package.json, index.ts)
