# Token Pipeline

## Overview

This document explains how a token change flows through the system from design to application.

## Pipeline Flow

```
Token Change → Validation → Compilation → Theme Packaging → Storybook/Demo/Apps
     │              │            │              │                    │
     │              │            │              │                    │
     ▼              ▼            ▼              ▼                    ▼
┌─────────┐   ┌──────────┐  ┌──────────┐  ┌──────────┐      ┌──────────┐
│ Tokens  │   │ Schema   │  │ Theme    │  │ Theme    │      │ Apps     │
│ (JSON)  │──▶│Validate  │──▶│ Engine   │──▶│Package   │─────▶│Consumer  │
│         │   │          │  │          │  │          │      │          │
└─────────┘   └──────────┘  └──────────┘  └──────────┘      └──────────┘
     │              │            │              │                    │
     │              │            │              │                    │
     └──────────────┴────────────┴──────────────┴────────────────────┘
                            Governance
```

## Step-by-Step Pipeline

### 1. Token Change

A designer or engineer modifies a token file:

```json
// tokens/bu-a/tokens.json
{
  "color": {
    "primary-500": {
      "$value": "#3A5B81",  // Changed from previous value
      "$type": "color"
    }
  }
}
```

**Requirements:**
- Must follow DTCG format
- Must update version file (`tokens/bu-a/version.json`)
- Must be valid JSON

### 2. Schema Validation

Run validation:

```bash
pnpm run tokens:validate
```

**What happens:**
- Validates token structure against Zod schema
- Checks DTCG format compliance
- Validates token types (color, dimension, etc.)
- Ensures required fields are present

**If validation fails:**
- Build/CI fails
- Error messages point to specific issues
- Token file must be fixed before proceeding

**Governance**: Validation is required in CI before merge.

### 3. Version Check

Run version bump check:

```bash
pnpm run tokens:check-version
```

**What happens:**
- Compares token files with git
- Checks if version file was updated
- Fails if tokens changed but version unchanged

**If check fails:**
- Build/CI fails
- Must update version file with at least patch bump
- Example: `1.0.0` → `1.0.1` (patch bump)

**Governance**: Version enforcement prevents unversioned changes.

### 4. Theme Compilation

Themes are compiled at runtime or build time:

```typescript
import { loadTokens } from '@theme-engine/loadTokens';
import { buildTheme } from '@theme-engine/buildTheme';

const tokens = await loadTokens('bu-a');
const theme = buildTheme(tokens);
```

**What happens:**
1. Load tokens from `tokens/bu-a/tokens.json`
2. Parse and validate token structure
3. Map tokens to MUI theme structure:
   - `color` tokens → `palette`
   - `typography` tokens → `typography`
   - `spacing` tokens → `spacing` function
   - `shape` tokens → `shape`
   - `semantic` tokens → `component` overrides
4. Return compiled MUI theme

**Key Principle**: Deterministic. Same tokens always produce the same theme.

### 5. Theme Packaging

Themes are packaged in `packages/themes`:

```typescript
// packages/themes/src/bu-a.ts
export async function getBuATheme(): Promise<Theme> {
  const tokens = await loadTokens('bu-a');
  return buildTheme(tokens);
}
```

**What happens:**
- Themes are compiled from tokens (not pre-compiled)
- Package uses `tsup` to bundle theme loaders
- Output: ESM and CJS formats with type declarations
- React and MUI externalized (not bundled)

**Build:**
```bash
pnpm --filter @multi-bu/themes run build
```

### 6. Storybook Consumption

Storybook loads themes via theme switcher:

```typescript
// storybook/.storybook/preview.tsx
const selectedTheme = context.globals.theme; // 'Core Banking Platform'
const theme = await getBuATheme();
```

**What happens:**
1. User selects BU theme via toolbar
2. Storybook loads corresponding theme
3. Stories re-render with selected theme
4. Visual divergence is visible immediately

**Purpose**: Review cross-BU consistency and visual divergence.

### 7. Demo Site Consumption

Demo site switches themes at runtime:

```typescript
// apps/demo-site/src/App.tsx
const buId = searchParams.get('bu') || 'bu-a';
const theme = await getThemeForBU(buId);
```

**What happens:**
1. User selects BU via tabs
2. URL updates with `?bu=bu-a|bu-b|bu-c`
3. Theme loads asynchronously
4. Entire app re-renders with new theme
5. Navigation state preserved

**Purpose**: Demonstrate design system at application scale.

### 8. Product Application Consumption

Product applications load theme at initialization:

```typescript
// product-app/src/App.tsx
const theme = await getBuATheme(); // Or getBuBTheme(), getBuCTheme()

<ThemeProvider theme={theme}>
  <App />
</ThemeProvider>
```

**What happens:**
1. App determines which BU to use (config, user, permissions)
2. Loads corresponding theme
3. Wraps app in `ThemeProvider`
4. All components use selected theme

**Pattern**: One app typically uses one BU theme (determined at build or runtime).

## Governance Hooks

Governance is enforced at multiple points:

### 1. Token Validation (Schema)

**Location**: `scripts/validate-tokens.ts`

**When**: Before commit, in CI

**What**: Validates token structure against schema

**Enforcement**: Build fails if validation fails

### 2. Version Enforcement

**Location**: `scripts/check-version-bumps.ts`

**When**: Before commit, in CI

**What**: Ensures token changes are versioned

**Enforcement**: Build fails if version not bumped

### 3. Code Pattern Linting

**Location**: `scripts/lint-design-system.ts`

**When**: Before commit, in CI

**What**: Detects hardcoded values in component code

**Enforcement**: Build fails if hardcoded values found

### 4. CI Integration

**Location**: `.github/workflows/validate.yml` (if exists)

**When**: On push/PR

**What**: Runs all governance checks

**Enforcement**: PR cannot merge if checks fail

## Pipeline Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Token Change                              │
│  tokens/bu-a/tokens.json (modified)                         │
│  tokens/bu-a/version.json (bumped)                          │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    Validation                                │
│  pnpm run tokens:validate                                   │
│  ✓ Schema validation                                        │
│  ✓ DTCG format                                              │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│               Version Check                                  │
│  pnpm run tokens:check-version                              │
│  ✓ Version bumped                                           │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                  Compilation                                 │
│  loadTokens('bu-a') → buildTheme(tokens)                    │
│  ✓ Color tokens → palette                                   │
│  ✓ Typography tokens → typography                           │
│  ✓ Semantic tokens → component overrides                    │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                 Theme Packaging                              │
│  packages/themes/src/bu-a.ts                                │
│  getBuATheme() → Theme                                      │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
┌──────────────┐ ┌──────────┐ ┌─────────────┐
│  Storybook   │ │   Demo   │ │   Product   │
│              │ │   Site   │ │    Apps     │
│ Theme Switch │ │ Runtime  │ │ Static/Run │
│              │ │ Switch   │ │ Time       │
└──────────────┘ └──────────┘ └─────────────┘
```

## Example: Changing Primary Color

Let's trace changing the primary color for BU A:

1. **Token Change**: Modify `tokens/bu-a/tokens.json`
   ```json
   "primary-500": {
     "$value": "#2D4A6F",  // Changed from #3A5B81
     "$type": "color"
   }
   ```

2. **Version Bump**: Update `tokens/bu-a/version.json`
   ```json
   {
     "version": "1.0.1"  // Bumped from 1.0.0
   }
   ```

3. **Validate**: Run `pnpm run tokens:validate`
   - ✓ Schema valid
   - ✓ DTCG format correct

4. **Version Check**: Run `pnpm run tokens:check-version`
   - ✓ Version bumped correctly

5. **Compile**: Theme compiles at runtime
   - `paletteMapper` reads new color value
   - MUI theme uses new primary color

6. **Consume**: Apps automatically use new color
   - Storybook: Switch to BU A theme → see new color
   - Demo Site: Select BU A → see new color
   - Product Apps: Use BU A theme → see new color

**No component code changes needed.** Color change is driven entirely by tokens.

## Benefits of This Pipeline

1. **Single Source of Truth**: Changes happen at token level
2. **Deterministic**: Same tokens always produce same themes
3. **Governable**: Validation and versioning enforced
4. **Scalable**: Works for any number of BUs
5. **Maintainable**: Changes are isolated to token files
6. **Traceable**: Version files track token changes over time

