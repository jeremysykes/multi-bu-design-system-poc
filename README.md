# Multi-BU Design System POC

Enterprise-grade multi business-unit design system platform built on MUI. Demonstrates **token-first, design-to-code pipeline** with governance, validation, versioning, and shared component APIs. Addresses the gaps MUI intentionally leaves out: token architecture, multi-tenant theming, governance enforcement, and versioning discipline.

## MUI Gaps Addressed

MUI provides excellent component APIs and theming, but intentionally leaves out enterprise-scale concerns:

- **Token architecture** - MUI expects manual theme creation; this POC provides a structured token system with schema validation
- **Multi-tenant theming** - MUI doesn't provide patterns for managing multiple brand identities; this POC demonstrates token-driven BU differentiation
- **Governance enforcement** - MUI doesn't enforce design system rules; this POC adds automated validation and linting
- **Versioning discipline** - MUI doesn't provide versioning strategy for design tokens; this POC includes versioning policies
- **Deterministic compilation** - MUI themes are manually crafted; this POC compiles themes deterministically from tokens

## Not a Theme Switcher Demo

This is **not** a theme switcher demo. It is a complete design system platform built for enterprise scale. Key differentiators:

### Theme Switcher Demos vs. This Platform

| Theme Switcher Demos | This Platform |
|----------------------|---------------|
| Runtime CSS/theme switching | Token-first architecture with deterministic compilation |
| Optional styling guidelines | Enforced governance (CI fails on violations) |
| Manual theme creation | Automated theme compilation from tokens |
| Ad-hoc changes | Versioned token changes with enforcement |
| Single application focus | Multi-BU platform with shared component APIs |
| No validation | Schema validation preventing errors |
| No versioning | Versioning discipline with change tracking |

### What Makes This Different

1. **Token-First Architecture**: Design tokens (DTCG JSON) are the single source of truth. Themes are compiled deterministically from tokens, not manually crafted.

2. **Governance Enforcement**: Automated validation, versioning, and linting enforce design system rules. CI/CD pipelines fail on violations - this is enforcement, not suggestions.

3. **Versioning Discipline**: Token changes are versioned, tracked, and diffed. Breaking changes are prevented through version enforcement.

4. **Deterministic Compilation**: Same tokens always produce the same theme. No runtime magic or manual adjustments required.

5. **Scalable Architecture**: Add new business units without code changes. The system scales through token files, not component modifications.

6. **Production-Ready Patterns**: Type safety, error handling, performance optimization, and deployment strategies are built in, not afterthoughts.

See `docs/enterprise-readiness.md` for comprehensive enterprise considerations and production patterns.

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

### 0. Run Governance Checks

Before working with tokens or components, run governance checks:

```bash
# Validate all tokens against schema
pnpm run tokens:validate

# Check that token changes are versioned
pnpm run tokens:check-version

# Lint for hardcoded values
pnpm run lint:design-system
```

**These checks run automatically in CI and must pass before merging.**

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

## Enterprise Readiness

This platform is built for enterprise scale with governance, type safety, and production-ready patterns:

### Governance Enforcement

- **CI fails on violations** - Token validation, versioning, and linting are enforced, not optional
- **Automated validation** - Schema validation prevents invalid tokens from entering the system
- **Version enforcement** - Token changes must be versioned; unversioned changes break CI
- **Code pattern linting** - Hardcoded values are detected and blocked
- **Change tracking** - Token diffing provides audit trails for all changes

### Type Safety & Developer Experience

- **Full TypeScript support** - All packages are fully typed with proper type declarations
- **IDE autocomplete** - Token references and theme properties provide IDE support
- **Error messages** - Validation failures provide clear, actionable error messages
- **Component API stability** - Components maintain stable APIs across all BUs

### Scalability

- **Zero code changes for new BUs** - Add new business units through token files only
- **Shared component APIs** - All BUs use the same component code; differentiation is token-driven
- **Framework-agnostic tokens** - Token layer can be compiled to other frameworks (Vue, Angular)
- **Extensible architecture** - Add new token categories without breaking existing themes

### Production Deployment

- **Packaged themes** - Themes are bundled as consumable libraries (ESM/CJS)
- **Tree-shaking support** - Import only the BU theme you need
- **Performance optimized** - Deterministic compilation ensures fast runtime performance
- **Error handling patterns** - Graceful fallbacks and error recovery built in

### Versioning Discipline

- **Token versioning** - Each BU has its own version file tracking changes
- **Change diffing** - Compare token sets to understand differences
- **Breaking change prevention** - Version enforcement prevents unversioned breaking changes
- **Migration paths** - Clear upgrade paths for version changes

### Schema Validation

- **DTCG format compliance** - Tokens must follow Design Tokens Community Group format
- **Type checking** - Colors, dimensions, typography are validated against schemas
- **Fail-fast validation** - Invalid tokens are caught before compilation

See `docs/enterprise-readiness.md` for detailed enterprise considerations, production patterns, and adoption guidance.

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

**Enterprise Readiness:**
- **`docs/enterprise-readiness.md`** - Enterprise considerations, production patterns, adoption guidance
- **`docs/governance.md`** - Validation rules, versioning enforcement, token diffing, CI integration
- **`docs/versioning.md`** - Versioning strategy, token versioning, breaking change policy

**Consumption:**
- **`docs/consuming-themes.md`** - How to consume themes in applications, multi-BU patterns, production deployment
- **`docs/adding-a-bu.md`** - Step-by-step guide for adding a new business unit
- **`docs/demo-site.md`** - Demo site structure, runtime BU switching, usage patterns

**Reference:**
- **`docs/tokens.md`** - Token dictionary, naming rules, semantic token meanings
- **`docs/multi-bu-demo.md`** - Storybook and demo site overview, cross-BU review process

## Visual Divergence

The three business units express distinct visual identities while sharing the same component APIs. See `docs/business-units.md` for detailed descriptions of visual differences and how each BU is differentiated through tokens.

**Key principle**: All visual differences are driven by tokens, not component code changes.

View in Storybook (theme switcher) or demo site (runtime switching) to see visual divergence across all three BUs.

## Production Considerations

### Bundle Size & Performance

- **Tree-shaking supported** - Import only the BU theme you need; unused code is eliminated
- **No runtime overhead** - Themes are compiled at build/load time, not runtime
- **Deterministic compilation** - Same tokens always produce the same optimized theme output
- **Small token footprint** - Token files are JSON, parsed once and cached

### TypeScript Support

- **Full type safety** - All packages include TypeScript definitions
- **Type inference** - Theme properties are fully typed with autocomplete support
- **Type checking** - Run `pnpm run type-check` to validate types across all packages

### Error Handling

- **Validation errors** - Schema validation provides clear error messages with file and token path
- **Theme compilation errors** - Missing or invalid tokens fail fast with specific errors
- **Runtime fallbacks** - Applications can implement fallback themes for error scenarios

### CI/CD Integration

- **GitHub Actions ready** - Governance checks are designed for CI/CD pipelines
- **Blocking checks** - Failed checks prevent merges; this is enforcement, not warnings
- **Fast validation** - Token validation runs in seconds, suitable for PR checks
- **Visual regression** - Chromatic integration for cross-BU visual regression testing

### Deployment Strategies

- **Single-BU applications** - Most apps use one BU theme; tree-shaking eliminates unused themes
- **Multi-BU applications** - Apps can switch BUs at runtime; themes are loaded asynchronously
- **Monorepo integration** - Workspace packages are designed for monorepo consumption
- **Published packages** - Themes can be published to npm for distributed teams

### Team Workflows

- **Design-to-code handoff** - Tokens bridge design and development with DTCG format
- **Change review process** - Token diffing enables PR reviews focused on token changes
- **Release management** - Version files track token changes for release notes
- **Team training** - Clear documentation and governance make onboarding straightforward

See `docs/enterprise-readiness.md` for comprehensive production deployment patterns and team workflows.

## Status

This is a proof of concept. See `PROJECT_PROGRESS.md` for project intent, requirements, and progress tracking.

## Success Criteria Met

### Governance & Enforcement

- ✅ **Governance enforcement** - Validation, versioning, and linting enforced in CI (not suggestions)
- ✅ **Versioning discipline** - Token versioning system with enforcement preventing unversioned changes
- ✅ **Schema validation** - Token schema validation prevents invalid tokens from entering the system
- ✅ **Code pattern linting** - Hardcoded values are detected and blocked automatically
- ✅ **Token diffing** - Scripts for comparing tokens and tracking changes for audit trails

### Scalability

- ✅ **Token-driven architecture** - No hardcoded values in components; all styling from tokens
- ✅ **Multi-BU support** - Three fully realized BUs share component APIs with different brand expression
- ✅ **Zero code changes for new BUs** - Add new business units through token files only
- ✅ **Framework-agnostic tokens** - Token layer can be compiled to other frameworks

### Production Readiness

- ✅ **Token-first pipeline** - Design tokens → validation → compilation → themes → components
- ✅ **Deterministic compilation** - Same tokens always produce the same theme output
- ✅ **Theme packaging** - Themes packaged as consumable libraries (ESM/CJS) with type declarations
- ✅ **Type safety** - Full TypeScript support across all packages
- ✅ **Error handling** - Clear error messages and validation failures

### Demonstration & Integration

- ✅ **Three fully realized BUs** - All BUs are structurally consistent, visually distinct, and integrated throughout Storybook and demo site
- ✅ **Storybook theme switching** - Theme switcher for all three BUs (not side-by-side)
- ✅ **Demo site** - Runtime BU switching at application scale
- ✅ **MUI as adapter** - MUI adapts our design system; the design system is defined at token/engine layers

### Documentation

- ✅ **Comprehensive documentation** - Architecture, pipeline, governance, consumption guides
- ✅ **Enterprise readiness** - Production patterns, deployment strategies, team workflows documented
