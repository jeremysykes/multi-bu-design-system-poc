# Governance

## Overview

Governance in this design system is enforced through automated validation and linting, not suggestions. Builds fail if violations are detected.

## Validation Rules

### Token Validation

The `validate:tokens` script checks:

1. **Schema Compliance** - All token files must match the token schema defined in `theme-engine/src/tokenSchema.ts`
2. **Semantic Token Coverage** - Required semantic tokens must be present in each BU
3. **Token Format** - Colors must be valid hex format, spacing/typography must be valid CSS values

**Run validation:**
```bash
pnpm run validate:tokens
```

### Code Pattern Linting

The `lint:design-system` script detects:

1. **Hardcoded Hex Colors** - No `#RRGGBB` values in component code
2. **Hardcoded Spacing** - No literal `px` or `rem` values in style objects
3. **Hardcoded Typography** - No literal font sizes or weights

**Run linting:**
```bash
pnpm run lint:design-system
```

## Forbidden Patterns

### ❌ Don't Do This

```tsx
// Hardcoded color
const style = { color: '#FF0000' };

// Hardcoded spacing
const style = { padding: '16px' };

// Hardcoded typography
const style = { fontSize: '14px' };
```

### ✅ Do This Instead

```tsx
// Use theme tokens
const theme = useTheme();
const style = { 
  color: theme.palette.primary.main,
  padding: theme.spacing(4),
  fontSize: theme.typography.body2.fontSize
};
```

## Token Diffing

The `tokens:diff` script compares token files or directories:

```bash
# Compare two BUs
pnpm run tokens:diff tokens/bu-a tokens/bu-b

# Compare a file with a backup
pnpm run tokens:diff tokens/bu-a/tokens.json tokens/bu-a/tokens.json.backup
```

**Output**: Markdown report showing:
- Added tokens (path and value)
- Removed tokens (path)
- Changed tokens (path, old value → new value)

**Use Cases**:
- Review token changes in PRs
- Understand differences between BUs
- Track token changes over time

## Version Enforcement

The `tokens:check-version` script enforces version bumps:

```bash
pnpm run tokens:check-version
```

**What it checks**:
- Compares token files with git to detect changes
- Verifies version file exists
- Ensures version was bumped (at least patch bump required)

**Rules**:
- Any token change requires at least a patch bump
- Version files: `tokens/{bu-id}/version.json`
- Format: Semver (`{ "version": "1.0.0" }`)

**If check fails**:
- Build/CI fails
- Must update version file before committing

See `docs/versioning.md` for detailed versioning policies.

## CI Checks

The GitHub Actions workflow (`.github/workflows/validate.yml`) runs:

1. Token validation (`tokens:validate`)
2. Version bump checks (`tokens:check-version`)
3. Design system linting (`lint:design-system`)
4. Type checking

All checks must pass for PRs to be merged.

## CI Integration Patterns

### Example GitHub Actions Workflow

```yaml
name: Validate Design System

on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm run tokens:validate
      - run: pnpm run tokens:check-version
      - run: pnpm run lint:design-system
      - run: pnpm run type-check
```

## How to Fix Violations

### Token Schema Violations

1. Check the error message for the specific field and file
2. Ensure the token file matches the schema in `theme-engine/src/tokenSchema.ts`
3. Verify hex colors are 6-digit format: `#RRGGBB`
4. Verify spacing values are strings with units: `"16px"`

### Code Pattern Violations

1. Remove hardcoded values
2. Replace with theme token references
3. Use `theme.palette.*` for colors
4. Use `theme.spacing()` for spacing
5. Use `theme.typography.*` for typography

## Enforcement

- **Local Development**: Scripts can be run manually
- **CI/CD**: All checks run automatically on push/PR
- **Pre-commit**: Consider adding pre-commit hooks (not implemented in POC)

## Exceptions

The only place hardcoded values are allowed is in the theme engine mappers, where tokens are converted to MUI theme values. This is the single source of truth transformation layer.
