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

## CI Checks

The GitHub Actions workflow (`.github/workflows/validate.yml`) runs:

1. Token validation
2. Design system linting
3. Type checking

All checks must pass for PRs to be merged.

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
