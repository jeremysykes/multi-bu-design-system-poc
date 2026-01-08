# Governance

## Overview

Governance in this design system is enforced through automated validation and linting, not suggestions. Builds fail if violations are detected.

## Enterprise Context

### Why Governance Matters at Enterprise Scale

At enterprise scale, design system violations have significant costs:

**Without Governance**:
- Design drift: Components diverge from design system over time
- Inconsistent user experiences: Different parts of the app look different
- Technical debt: Hardcoded values accumulate, making changes difficult
- Tribal knowledge: Design rules exist only in documentation or team memory
- Review burden: Manual code reviews catch violations inconsistently

**With Governance**:
- Design consistency: Automated validation prevents violations
- Consistent user experiences: All components follow design system rules
- Reduced technical debt: Hardcoded values are blocked automatically
- Explicit rules: Design rules are encoded in schema and enforced
- Reduced review burden: Automated checks catch violations before review

### Cost of Design System Violations

**Productivity Impact**:
- Engineers spend time on manual reviews and fixes
- Designers spend time on inconsistency issues
- Product teams spend time on user experience problems

**Quality Impact**:
- Inconsistent user experiences reduce brand trust
- Accessibility issues from non-standard patterns
- Maintenance burden from hardcoded values

**Business Impact**:
- Design inconsistencies reduce brand perception
- Technical debt slows feature development
- Migration costs accumulate over time

### Enforcement vs. Guidelines

**Guidelines (Don't Scale)**:
- Documentation that says "don't hardcode colors"
- Code review comments suggesting token usage
- Team training on design system rules

**Enforcement (Scales)**:
- Automated validation that blocks invalid tokens
- Version enforcement that prevents unversioned changes
- Linting that blocks hardcoded values
- CI/CD integration that fails builds on violations

**Result**: Governance is enforced, not suggested. Violations break CI/CD, preventing design system drift at scale.

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

### GitHub Actions Workflow Structure

The governance checks integrate with CI/CD pipelines:

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
      
      # Governance checks (blocking, not warnings)
      - name: Validate tokens
        run: pnpm run tokens:validate
        
      - name: Check token versions
        run: pnpm run tokens:check-version
        
      - name: Lint design system
        run: pnpm run lint:design-system
        
      - name: Type check
        run: pnpm run type-check
```

**Workflow File**: `.github/workflows/validate.yml` (if implemented)

### Blocking vs. Warning Patterns

**Blocking Checks** (Fail CI on violations):
- Token validation (invalid tokens break builds)
- Version enforcement (unversioned changes break builds)
- Design system linting (hardcoded values break builds)

**Warning Checks** (Report but don't fail):
- Token diffing (shows differences but doesn't block)
- Visual regression (reports differences but doesn't block)

**Result**: Governance checks are blocking. Violations prevent merges, not warnings.

### Production Deployment Considerations

**Pre-Deployment Checks**:
- All governance checks must pass before deployment
- Token validation ensures production tokens are valid
- Version enforcement ensures changes are tracked
- Linting ensures no hardcoded values enter production

**Deployment Pipeline Integration**:
- Governance checks run in CI/CD before deployment
- Failed checks prevent deployment
- Token changes trigger theme recompilation automatically

**Result**: Governance is enforced throughout the deployment pipeline. Invalid tokens cannot reach production.

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

## Compliance & Auditing

### Token Change Tracking via Versioning

**Version Files**:
- Each BU has a version file (`tokens/{bu-id}/version.json`)
- Version files track token changes over time
- Version bumps indicate token changes (patch, minor, major)

**Change History**:
- Version files provide audit trail of token changes
- Git history shows token file changes
- Version bumps show when changes were made

**Result**: All token changes are tracked through version files. Change history is maintained.

### Change Review Process via Diffing

**Token Diffing**:
- Compare token files or directories to see differences
- Output markdown reports showing added/removed/changed tokens
- Enable focused PR reviews on token changes

**Review Process**:
1. Engineer modifies token file
2. Updates version file (at least patch bump)
3. Creates PR with token changes
4. Reviewer runs `pnpm run tokens:diff` to see changes
5. Review focuses on visual impact of token changes
6. CI runs validation checks (blocks merge if fails)

**Result**: Token changes are reviewed through diffing. Changes are tracked and auditable.

### Audit Trail through Version Files

**Version Tracking**:
- Version files show token version history
- Git history shows when versions were bumped
- Token changes are tracked with version bumps

**Compliance**:
- Version files provide audit trail for compliance
- Token changes are documented through versioning
- Breaking changes are identified through version bumps

**Result**: Version files provide audit trail. Token changes are documented and auditable.

### Compliance with Design Standards

**Design Standards Enforcement**:
- Schema validation ensures tokens follow DTCG format
- Semantic token coverage ensures design standards are met
- Linting ensures components follow design system rules

**Compliance Reporting**:
- Token validation reports compliance with design standards
- Version enforcement reports token change compliance
- Linting reports component compliance with design system rules

**Result**: Design standards are enforced automatically. Compliance is validated, not assumed.

## Enforcement

- **Local Development**: Scripts can be run manually
- **CI/CD**: All checks run automatically on push/PR
- **Pre-commit**: Consider adding pre-commit hooks (not implemented in POC)

## Exceptions

The only place hardcoded values are allowed is in the theme engine mappers, where tokens are converted to MUI theme values. This is the single source of truth transformation layer.
