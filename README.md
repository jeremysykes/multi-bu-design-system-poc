# Multi-BU Design System POC

Proof of concept demonstrating how to manage multiple business-unit design systems at enterprise scale using MUI. Focused on token-driven theming, governance, validation, versioning, and shared component APIs, addressing the gaps MUI intentionally leaves out.

## Overview

This POC demonstrates:

- **Token-driven architecture** - All visual decisions come from tokens, no hardcoded values
- **Multi-BU support** - Multiple business units share component APIs while expressing different brands
- **Governance enforcement** - Automated validation and linting enforce design system rules
- **Microservices-ready** - Clear service boundaries and interfaces for future decomposition

## Setup

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### Installation

```bash
pnpm install
```

### Available Scripts

- `pnpm build` - Build all packages
- `pnpm run validate:tokens` - Validate all token files against schema
- `pnpm run lint:design-system` - Lint for hardcoded values and design system violations
- `pnpm run build:themes` - Build themes from tokens
- `pnpm run storybook` - Start Storybook (shows components side-by-side for all BUs)
- `pnpm run test:visual` - Run visual regression tests (Chromatic)
- `pnpm run type-check` - Type check all packages
- `pnpm run lint` - Lint all packages

## Project Structure

```
/
├── tokens/              # Token JSON files
│   ├── core/           # Core/base tokens
│   ├── bu-a/           # BU A tokens
│   ├── bu-b/           # BU B tokens
│   └── bu-c/           # BU C tokens (example)
├── theme-engine/        # Theme compilation engine
│   ├── src/
│   │   ├── tokenSchema.ts    # Zod schema for tokens
│   │   ├── buildTheme.ts     # Main compilation function
│   │   ├── mappers/          # Token to MUI mappers
│   │   └── validators/       # Token validation
├── packages/
│   ├── ui/             # Component wrapper library
│   └── themes/         # Compiled MUI themes
├── storybook/          # Storybook stories
├── .storybook/         # Storybook configuration
├── scripts/            # Governance scripts
└── docs/               # Documentation
```

## Quick Start

### 1. Validate Tokens

```bash
pnpm run validate:tokens
```

This validates all token files against the schema defined in `theme-engine/src/tokenSchema.ts`.

### 2. View Components in Storybook

```bash
pnpm run storybook
```

Storybook will start on http://localhost:6006. Each story shows components side-by-side under both BU A and BU B themes, demonstrating visual divergence.

### 3. Use Components in Your App

```tsx
import { Button, Card, TextField } from '@multi-bu/ui';
import { getBuATheme } from '@multi-bu/themes';
import { ThemeProvider } from '@mui/material/styles';

// Load theme
const theme = await getBuATheme();

// Use components
<ThemeProvider theme={theme}>
  <Button variant="contained" color="primary">
    Click Me
  </Button>
</ThemeProvider>
```

## Architecture

The system follows a layered architecture:

```
Tokens (JSON) → Token Schema → Theme Engine → MUI Themes → Component Wrappers → Storybook
```

### Key Principles

1. **Tokens are the single source of truth** - No hardcoded colors, spacing, or typography in components
2. **Deterministic compilation** - Same tokens always produce the same theme
3. **Governance through validation** - CI fails on violations, not suggestions
4. **Multi-BU support** - BUs share component APIs but express different brands through tokens
5. **Microservices-ready** - Clear interfaces enable future service decomposition

## Adding a New Business Unit

See `docs/adding-a-bu.md` for complete step-by-step instructions. The process has been validated by adding BU C to this repository.

**Quick steps:**
1. Create `tokens/bu-x/` directory
2. Add `palette.json`, `typography.json`, `semantic.json`
3. Create theme file in `packages/themes/src/bu-x.ts`
4. Export from `packages/themes/src/index.ts`
5. Run validation: `pnpm run validate:tokens`

## Governance

### Token Validation

Validates token files against schema:

```bash
pnpm run validate:tokens
```

Checks:
- Schema compliance
- Semantic token coverage
- Token format (hex colors, CSS values)

### Code Pattern Linting

Detects hardcoded values in component code:

```bash
pnpm run lint:design-system
```

Detects:
- Hardcoded hex colors (`#RRGGBB`)
- Hardcoded spacing (`16px`, `1rem`)
- Hardcoded typography values

### CI Integration

GitHub Actions workflow (`.github/workflows/validate.yml`) runs all checks on push/PR.

## Documentation

- **`docs/tokens.md`** - Token dictionary, naming rules, semantic token meanings
- **`docs/governance.md`** - Validation rules, forbidden patterns, how to fix violations
- **`docs/adding-a-bu.md`** - Step-by-step guide for adding a new business unit
- **`docs/versioning.md`** - Versioning strategy and breaking change policy

## Example: Visual Divergence

BU A uses blue primary colors, BU B uses green primary colors. Both share the same component APIs but express different brands through tokens.

View in Storybook to see side-by-side comparison of all components under both themes.

## Status

This is a proof of concept. See `PROJECT_INTENT.md` for full requirements and success criteria.

## Success Criteria Met

- ✅ Token-driven architecture (no hardcoded values)
- ✅ Multiple BUs share component APIs with different brand expression
- ✅ Governance exists as enforcement (CI and validation)
- ✅ System scales beyond two BUs (BU C added as example)
- ✅ MUI is adapter layer, not the design system itself
- ✅ Third BU can be added using documented steps
