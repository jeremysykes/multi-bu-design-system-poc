# Multi-BU Design System POC

Enterprise-grade multi business-unit design system platform built on MUI. **Token-first, design-to-code pipeline** with enforced governance, versioning, and shared component APIs.

## Not a Theme Switcher Demo

This is a complete **design system platform**, not a theme switcher demo:

| Theme Switcher Demos | This Platform |
|----------------------|---------------|
| Runtime CSS/theme switching | Token-first architecture (DTCG JSON) with deterministic compilation |
| Optional guidelines | **Enforced governance** (CI fails on violations) |
| Manual theme creation | Automated compilation from tokens |
| Ad-hoc changes | Versioned changes with enforcement |
| No validation/versioning | Schema validation + versioning discipline |

**Key differentiators**: Token-first architecture, enforced governance (CI blocks violations), versioning discipline, zero code changes to add BUs, production-ready patterns.

See `docs/enterprise-readiness.md` for comprehensive enterprise considerations.

## Overview

**Token-first pipeline**: Design Tokens (DTCG JSON) → Schema Validation → Theme Engine → MUI Themes → Component Wrappers → Applications

**Four business units** share component APIs while expressing different brands:
- **Core Banking Platform (BU A)**: Conservative, dense, professional
- **Growth & Payments Experience (BU B)**: Expressive, spacious, modern
- **Wealth Management (BU C)**: Sophisticated, premium, elegant
- **Developer Platform (BU D)**: Tech-focused, developer-friendly, internal tooling

**MUI is an adapter layer** - The design system is defined at the token and theme engine layers.

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
- `pnpm run storybook` - Start Storybook (theme switcher for all four BUs)
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
│   ├── bu-d/           # Developer Platform tokens
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

### 1. Validate Tokens & Run Governance Checks

```bash
pnpm run tokens:validate        # Schema validation
pnpm run tokens:check-version   # Version enforcement
pnpm run lint:design-system     # Lint for hardcoded values
```

**These checks run automatically in CI and must pass before merging.**

### 2. View Components & Demo

```bash
pnpm run storybook    # Component documentation (http://localhost:6006)
pnpm run demo:dev     # Demo site with runtime BU switching (http://localhost:3000)
```

Use theme switcher in Storybook or tabs in demo site to see visual divergence across all four BUs.

### 3. Use in Your App

```tsx
import { Button, Card } from '@multi-bu/ui';
import { getBuATheme } from '@multi-bu/themes';
import { ThemeProvider } from '@mui/material/styles';

const theme = await getBuATheme();

<ThemeProvider theme={theme}>
  <Button variant="contained" color="primary">Click Me</Button>
</ThemeProvider>
```

See `docs/consuming-themes.md` for detailed consumption patterns.

## Architecture

**Token-first pipeline**: `Design Tokens (DTCG JSON) → Schema Validation → Theme Engine → MUI Themes (Adapter) → Component Wrappers → Applications`

**Key principles**: Tokens are single source of truth, deterministic compilation, governance through enforcement (CI fails on violations), zero code changes to add BUs, framework-agnostic token layer.

See `docs/architecture.md` for detailed documentation.

## Enterprise Features

**Governance**: CI fails on violations (validation, versioning, linting enforced). Schema validation prevents errors. Version enforcement prevents breaking changes. Token diffing provides audit trails.

**Scalability**: Add new BUs through token files only (zero code changes). Framework-agnostic tokens (can compile to Vue, Angular). Shared component APIs across all BUs.

**Production Ready**: Full TypeScript support, tree-shaking, deterministic compilation, error handling patterns, packaged themes (ESM/CJS).

See `docs/enterprise-readiness.md` for comprehensive enterprise considerations and production patterns.

## Business Units

Four fully realized BUs share component APIs while expressing different brands:
- **Core Banking Platform (BU A)**: Conservative, dense, professional
- **Growth & Payments Experience (BU B)**: Expressive, spacious, modern
- **Wealth Management (BU C)**: Sophisticated, premium, elegant
- **Developer Platform (BU D)**: Tech-focused, developer-friendly, internal tooling

See `docs/business-units.md` for detailed descriptions.

**Adding a new BU**: Create `tokens/bu-x/tokens.json` (DTCG format) and `version.json`, add theme file, export. Zero component code changes needed. See `docs/adding-a-bu.md` for complete instructions.

## Component Library

The component library is organized using atomic design principles with comprehensive coverage:

**Atoms** (11): Button, Typography, Checkbox, Radio, Switch, IconButton, Link, Chip, Badge, Avatar, Divider

**Molecules** (10): TextField, Alert, Select, Autocomplete, CheckboxGroup, RadioGroup, Slider, Tabs, Breadcrumbs, Progress

**Organisms** (8): Card, Dialog, Drawer, AppBar, Table, List, Accordion, Paper

**Templates** (3): FormLayout, DashboardTemplate, SettingsTemplate

**Pages** (1): LoginPage

All components are token-driven, BU-agnostic, and work seamlessly across all four business units.

## Governance

**Governance is enforced, not suggested.** CI fails on violations.

- **`tokens:validate`** - Schema compliance, semantic coverage, format validation
- **`tokens:check-version`** - Enforces version bumps for token changes (semver)
- **`tokens:diff`** - Compare token files/directories (audit trails)
- **`lint:design-system`** - Detects hardcoded colors, spacing, typography

All checks run automatically in CI. See `docs/governance.md` for detailed rules and CI integration patterns.

## Production Readiness

**Bundle & Performance**: Tree-shaking support, deterministic compilation, ~20KB single-BU footprint. **TypeScript**: Full type safety with IDE autocomplete. **CI/CD**: Blocking checks prevent violations. **Error Handling**: Clear validation errors, graceful fallbacks.

See `docs/enterprise-readiness.md` and `docs/consuming-themes.md` for deployment strategies, team workflows, and production patterns.

## Documentation

**Architecture & Pipeline**: `docs/architecture.md`, `docs/pipeline.md`, `docs/business-units.md`  
**Enterprise & Governance**: `docs/enterprise-readiness.md`, `docs/governance.md`, `docs/versioning.md`  
**Consumption & Reference**: `docs/consuming-themes.md`, `docs/adding-a-bu.md`, `docs/tokens.md`, `docs/multi-bu-demo.md`

## Status

This is a proof of concept demonstrating enterprise-grade multi-BU design system capabilities. See `PROJECT_PROGRESS.md` for project intent, requirements, and progress tracking.

**Key achievements**: Token-driven architecture, enforced governance (CI blocks violations), four fully realized BUs, comprehensive component library (32+ components), zero code changes to add BUs, production-ready patterns (TypeScript, tree-shaking, error handling), comprehensive documentation.
