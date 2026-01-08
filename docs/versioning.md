# Versioning Policy

## Overview

This document defines the versioning strategy for the multi-BU design system, including token versioning, component API versioning, and breaking change policies.

## Versioning Strategy

### Semantic Versioning

The design system follows [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Token Versioning

Tokens are versioned independently from component APIs using semver format:

- **Token Schema Changes**: MAJOR version bump
- **New Token Categories**: MINOR version bump
- **New Token Values**: MINOR version bump
- **Token Value Changes**: MAJOR version bump (breaking)
- **Any Token Change**: Requires at least a PATCH version bump

Each BU has its own version file: `tokens/{bu-id}/version.json`. Core tokens have a version file at `tokens/version.json`.

### Component API Versioning

Component wrappers maintain stable APIs:

- **API Changes**: MAJOR version bump
- **New Props**: MINOR version bump (if optional)
- **Prop Changes**: MAJOR version bump (breaking)
- **Internal Implementation Changes**: PATCH version bump

## Breaking Change Policy

### What Constitutes a Breaking Change

1. **Token Schema Changes**
   - Removing required fields
   - Changing field types
   - Changing token structure

2. **Component API Changes**
   - Removing props
   - Changing prop types
   - Changing component behavior

3. **Theme Structure Changes**
   - Changing MUI theme structure
   - Removing theme properties

### Migration Strategy

When breaking changes are necessary:

1. **Deprecation Period**: Mark deprecated features with warnings
2. **Migration Guide**: Provide step-by-step migration instructions
3. **Version Support**: Support previous version for at least one major version cycle
4. **Communication**: Clearly document breaking changes in release notes

## Versioning Tokens

### Token File Structure

Token versioning is managed via version files:

```
tokens/
  version.json         # Core tokens version
  core/
    tokens.json
  bu-a/
    tokens.json
    version.json       # BU A tokens version
  bu-b/
    tokens.json
    version.json       # BU B tokens version
  bu-c/
    tokens.json
    version.json       # BU C tokens version
```

Each version file uses semver format: `{ "version": "1.0.0" }`

### Running Token Version Checks

Check if token files have changed without version bumps:

```bash
pnpm run tokens:check-version
```

This script:
- Compares token files with git to detect changes
- Verifies that version files exist and have been bumped
- Fails if tokens changed without at least a patch version bump

### CI Integration

Add version checks to your CI pipeline:

```yaml
- name: Check token versions
  run: pnpm run tokens:check-version
```

This ensures that token changes are always accompanied by version updates.

### Token Compatibility

- **Backward Compatible**: New tokens can be added without breaking existing themes
- **Forward Compatible**: Missing optional tokens fall back to core tokens
- **Breaking**: Removing or changing required tokens breaks compatibility

## Component Versioning

### Package Versioning

Each package is versioned independently:

- `@multi-bu/ui`: Component wrapper library
- `@multi-bu/themes`: Compiled themes
- `@multi-bu/theme-engine`: Theme compilation engine

### API Stability

Component APIs should remain stable:

- **Stable APIs**: Props, component structure, behavior
- **Internal Changes**: Implementation can change without version bump
- **New Features**: Add via new optional props (MINOR bump)

## Upgrade Paths

### Minor Version Upgrades

Minor version upgrades should be:

- **Automatic**: No code changes required
- **Backward Compatible**: Existing code continues to work
- **Additive**: New features don't break existing functionality

### Major Version Upgrades

Major version upgrades require:

- **Migration Guide**: Step-by-step instructions
- **Breaking Changes Document**: List of all breaking changes
- **Deprecation Warnings**: Advance notice of breaking changes

## Token Diff

Compare token files or directories to see what changed:

```bash
pnpm run tokens:diff <old-file-or-dir> <new-file-or-dir>
```

Examples:
```bash
# Compare two BUs
pnpm run tokens:diff tokens/bu-a tokens/bu-b

# Compare a file with a backup
pnpm run tokens:diff tokens/bu-a/tokens.json tokens/bu-a/tokens.json.backup
```

The diff script outputs a markdown report showing:
- Added tokens (path and value)
- Removed tokens (path)
- Changed tokens (path, old value → new value)

This is useful for:
- Reviewing token changes in PRs
- Understanding differences between BUs
- Tracking token changes over time

## Versioning Best Practices

1. **Incremental Changes**: Prefer many small changes over large breaking changes
2. **Documentation**: Always document version changes
3. **Testing**: Test backward compatibility before releasing
4. **Communication**: Announce major version changes in advance
5. **Version Enforcement**: Use `tokens:check-version` in CI to enforce version bumps
6. **Token Diffing**: Use `tokens:diff` to review changes before committing

## Example Versioning Scenarios

### Scenario 1: New Token Category

- **Change**: Add `animation` token category
- **Impact**: MINOR version bump
- **Migration**: No migration needed (additive)

### Scenario 2: Remove Token Field

- **Change**: Remove `typography.fontSize.xs`
- **Impact**: MAJOR version bump
- **Migration**: Update all references to use alternative size

### Scenario 3: New Component Prop

- **Change**: Add optional `icon` prop to Button
- **Impact**: MINOR version bump
- **Migration**: No migration needed (optional prop)

### Scenario 4: Change Prop Type

- **Change**: Change `Button.color` from string to enum
- **Impact**: MAJOR version bump
- **Migration**: Update all Button color values

## Release Process

1. **Version Bump**: Update package.json versions
2. **Changelog**: Document changes in CHANGELOG.md
3. **Migration Guide**: Create migration guide if breaking changes
4. **Testing**: Verify all tests pass
5. **Release**: Tag and publish

## Version History

Track version history in:

- `CHANGELOG.md` (if created)
- Git tags
- Release notes
- Package.json version fields
