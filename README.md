# Multi-BU Design System POC

Enterprise-grade multi business-unit design system platform built on MUI. Demonstrates **token-first, design-to-code pipeline** with governance, validation, versioning, and shared component APIs. Addresses the gaps MUI intentionally leaves out: token architecture, multi-tenant theming, governance enforcement, and versioning discipline.

## MUI Gaps Addressed

MUI provides excellent component APIs and theming, but intentionally leaves out enterprise-scale concerns:

- **Token architecture** - MUI expects manual theme creation; this POC provides a structured token system with schema validation
- **Multi-tenant theming** - MUI doesn't provide patterns for managing multiple brand identities; this POC demonstrates token-driven BU differentiation
- **Governance enforcement** - MUI doesn't enforce design system rules; this POC adds automated validation and linting
- **Versioning discipline** - MUI doesn't provide versioning strategy for design tokens; this POC includes versioning policies
- **Deterministic compilation** - MUI themes are manually crafted; this POC compiles themes deterministically from tokens

## Overview

This POC demonstrates:

- **Token-first pipeline** - Design tokens (DTCG JSON) → Schema Validation → Theme Engine → MUI Themes → Component Wrappers → Applications
- **Token-driven architecture** - All visual decisions come from tokens, no hardcoded values in components
- **Multi-BU support** - Three fully realized business units share component APIs while expressing different brands:
  - **Core Banking Platform** (BU A): Conservative, dense, professional
  - **Growth & Payments Experience** (BU B): Expressive, spacious, modern
  - **Wealth Management** (BU C): Sophisticated, premium, elegant
- **Governance enforcement** - Automated validation, versioning, and linting enforce design system rules (CI fails on violations)
- **MUI as adapter layer** - MUI adapts our design system to React; the design system itself is defined at the token and theme engine layers

## Setup

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### Installation

```bash
pnpm install
```

### Available Scripts

**Build & Development:**
- `pnpm build` - Build all packages
- `pnpm run storybook` - Start Storybook (theme switcher for all three BUs)
- `pnpm run demo:dev` - Start demo site with runtime BU switching
- `pnpm run demo:build` - Build demo site

**Token Governance:**
- `pnpm run tokens:validate` - Validate all token files against schema
- `pnpm run tokens:diff` - Compare token files/directories (shows added/removed/changed)
- `pnpm run tokens:check-version` - Enforce version bumps for token changes

**Quality Checks:**
- `pnpm run lint:design-system` - Lint for hardcoded values and design system violations
- `pnpm run type-check` - Type check all packages
- `pnpm run lint` - Lint all packages
- `pnpm run test:visual` - Run visual regression tests (Chromatic)

## Project Structure

```
/
├── tokens/              # Design tokens (DTCG JSON format)
│   ├── core/           # Core/base tokens
│   ├── bu-a/           # Core Banking Platform tokens
│   ├── bu-b/           # Growth & Payments Experience tokens
│   ├── bu-c/           # Wealth Management tokens
│   └── version.json    # Core tokens version
├── theme-engine/        # Theme compilation engine
│   ├── src/
│   │   ├── tokenSchema.ts    # Zod schema for DTCG tokens
│   │   ├── buildTheme.ts     # Deterministic compilation function
│   │   ├── mappers/          # Token to MUI mappers
│   │   └── validators/       # Token validation
├── packages/
│   ├── ui/             # Component wrapper library (atomic design)
│   └── themes/         # Compiled MUI themes (consumable package)
├── apps/
│   └── demo-site/      # Demo site with runtime BU switching
├── storybook/          # Storybook with theme switcher
├── scripts/            # Governance scripts (validation, diff, versioning)
└── docs/               # Comprehensive documentation
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

Storybook will start on http://localhost:6006. Use the theme switcher toolbar (top right) to switch between:
- Core Banking Platform (BU A)
- Growth & Payments Experience (BU B)
- Wealth Management (BU C)

All stories automatically re-render with the selected theme, demonstrating visual divergence.

### 3. View Demo Site

```bash
pnpm run demo:dev
```

Demo site will start on http://localhost:3000. Switch between BU themes using the tabs at the top. Navigate between pages (Dashboard, Onboarding, Settings) to see the design system at application scale.

### 4. Use Components in Your App

```tsx
import { Button, Card, TextField } from '@multi-bu/ui';
import { getBuATheme } from '@multi-bu/themes';
import { ThemeProvider } from '@mui/material/styles';

// Load theme
const theme = await getBuATheme();

// Use components
<ThemeProvider theme={theme}>
	<Button variant='contained' color='primary'>
		Click Me
	</Button>
</ThemeProvider>;
```

## Architecture

The system follows a **token-first, layered architecture**:

```
Design Tokens (DTCG JSON) → Schema Validation (Zod) → Theme Engine → MUI Themes (Adapter) → Component Wrappers → Applications
```

**Key Principle**: MUI is an adapter layer, not the design system itself. The design system is defined at the token and theme engine layers.

### Key Principles

1. **Tokens are the single source of truth** - No hardcoded colors, spacing, or typography in components
2. **Token-first pipeline** - All visual decisions flow from tokens through deterministic compilation
3. **Deterministic compilation** - Same tokens always produce the same theme
4. **Governance through enforcement** - CI fails on violations (validation, versioning, linting), not suggestions
5. **Multi-BU support** - Three fully realized BUs share component APIs but express different brands through tokens
6. **Semantic consumption** - Components use semantic tokens (meaning), not raw values

See `docs/architecture.md` for detailed architecture documentation.

## Business Units

The system supports three fully realized business units:

- **Core Banking Platform (BU A)**: Conservative, dense, professional - Internal, regulated, operational tooling
- **Growth & Payments Experience (BU B)**: Expressive, spacious, modern - External-facing, revenue and conversion focused
- **Wealth Management (BU C)**: Sophisticated, premium, elegant - High-value advisory services, premium client experiences

See `docs/business-units.md` for detailed descriptions and how they complement each other.

## Adding a New Business Unit

See `docs/adding-a-bu.md` for complete step-by-step instructions. The process has been validated by adding BU C to this repository.

**Quick steps:**

1. Create `tokens/bu-x/` directory
2. Add `tokens.json` file (DTCG format) with complete token structure
3. Add `version.json` file with version `1.0.0`
4. Create theme file in `packages/themes/src/bu-x.ts`
5. Export from `packages/themes/src/index.ts`
6. Run validation: `pnpm run tokens:validate`

## Governance

**Governance is enforced, not suggested.** CI fails on violations.

### Token Validation

Validates token files against Zod schema:

```bash
pnpm run tokens:validate
```

Checks:
- Schema compliance (DTCG format)
- Semantic token coverage
- Token format (hex colors, CSS values)

### Token Versioning

Enforces version bumps for token changes:

```bash
pnpm run tokens:check-version
```

Rules:
- Any token change requires at least a patch bump
- Version files: `tokens/{bu-id}/version.json`
- Format: Semver (`{ "version": "1.0.0" }`)

### Token Diffing

Compare token files or directories:

```bash
pnpm run tokens:diff tokens/bu-a tokens/bu-b
```

Outputs markdown report showing added/removed/changed tokens.

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

GitHub Actions workflow runs all governance checks on push/PR:
- Token validation
- Version enforcement
- Code pattern linting
- Type checking

See `docs/governance.md` for detailed governance rules and CI integration patterns.

## Documentation

**Core Documentation:**
- **`docs/architecture.md`** - Layered architecture, token pipeline, MUI as adapter layer
- **`docs/pipeline.md`** - Step-by-step token flow: tokens → validation → compilation → packaging → consumption
- **`docs/business-units.md`** - BU descriptions, design directions, how they complement each other

**Governance:**
- **`docs/governance.md`** - Validation rules, versioning enforcement, token diffing, CI integration
- **`docs/versioning.md`** - Versioning strategy, token versioning, breaking change policy

**Consumption:**
- **`docs/consuming-themes.md`** - How to consume themes in applications, multi-BU patterns
- **`docs/adding-a-bu.md`** - Step-by-step guide for adding a new business unit
- **`docs/demo-site.md`** - Demo site structure, runtime BU switching, usage patterns

**Reference:**
- **`docs/tokens.md`** - Token dictionary, naming rules, semantic token meanings
- **`docs/multi-bu-demo.md`** - Storybook and demo site overview, cross-BU review process

## Visual Divergence

The three business units express distinct visual identities while sharing the same component APIs:

- **BU A (Core Banking)**: Deep navy blue, dense typography, high contrast → Conservative, professional
- **BU B (Growth & Payments)**: Vibrant cyan, spacious typography, softer contrast → Modern, approachable
- **BU C (Wealth Management)**: Rich purple/indigo, balanced typography, refined contrast → Sophisticated, premium

**All visual differences are driven by tokens, not component code changes.**

View in Storybook (theme switcher) or demo site (runtime switching) to see visual divergence across all three BUs.

## Status

This is a proof of concept. See `PROJECT_PROGRESS.md` for project intent, requirements, and progress tracking.

## Success Criteria Met

- ✅ **Token-driven architecture** - No hardcoded values in components; all styling from tokens
- ✅ **Token-first pipeline** - Design tokens → validation → compilation → themes → components
- ✅ **Multi-BU support** - Three fully realized BUs share component APIs with different brand expression
- ✅ **BU C fully realized** - Structurally consistent, visually distinct, used throughout Storybook and demo site
- ✅ **Governance enforcement** - Validation, versioning, and linting enforced in CI (not suggestions)
- ✅ **Versioning discipline** - Token versioning system with enforcement
- ✅ **Token diffing** - Scripts for comparing tokens and tracking changes
- ✅ **Theme packaging** - Themes packaged as consumable libraries
- ✅ **Storybook theme switching** - Theme switcher for all three BUs (not side-by-side)
- ✅ **Demo site** - Runtime BU switching at application scale
- ✅ **MUI as adapter** - MUI adapts our design system; the design system is defined at token/engine layers
- ✅ **Comprehensive documentation** - Architecture, pipeline, governance, consumption guides
