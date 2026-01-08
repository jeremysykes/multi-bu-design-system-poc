# Architecture

## Overview

The multi-BU design system follows a layered token-driven architecture where design tokens are the single source of truth. MUI (Material-UI) serves as an adapter layer, not the design system itself.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Design Tokens (DTCG)                      │
│  tokens/core/tokens.json                                     │
│  tokens/bu-a/tokens.json                                     │
│  tokens/bu-b/tokens.json                                     │
│  tokens/bu-c/tokens.json                                     │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              Schema Validation (Zod)                         │
│  theme-engine/src/tokenSchema.ts                            │
│  scripts/validate-tokens.ts                                 │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                  Theme Engine                                │
│  theme-engine/src/buildTheme.ts                             │
│  theme-engine/src/mappers/*                                 │
│    - paletteMapper.ts                                       │
│    - typographyMapper.ts                                    │
│    - spacingMapper.ts                                       │
│    - shapeMapper.ts                                         │
│    - componentMapper.ts                                     │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              MUI Themes (Adapter Layer)                      │
│  packages/themes/src/*.ts                                   │
│    - getBuATheme()                                          │
│    - getBuBTheme()                                          │
│    - getBuCTheme()                                          │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              Component Wrappers                              │
│  packages/ui/src/*                                          │
│    - atoms/ (Button, Typography)                            │
│    - molecules/ (TextField, Alert)                          │
│    - organisms/ (Card)                                      │
│    - templates/ (FormLayout)                                │
│    - pages/ (LoginPage)                                     │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                  Applications                                │
│  - Storybook                                                │
│  - Demo Site                                                │
│  - Product Applications                                     │
└─────────────────────────────────────────────────────────────┘
```

## Layer Responsibilities

### 1. Design Tokens (Source of Truth)

**Location**: `tokens/`

Design tokens are JSON files in DTCG (Design Tokens Community Group) format. They define:

- **Color**: Complete palette (primary, secondary, neutral, error, warning, info, success) with 50-900 ramps
- **Typography**: Font families, sizes, weights, line heights
- **Spacing**: Dimension tokens (0-64 scale)
- **Shape**: Border radius, elevation
- **Semantic**: Intent-based mappings (surface, text, border, action, feedback)

**Key Principle**: Tokens are the single source of truth. No hardcoded visual values exist in components.

### 2. Schema Validation

**Location**: `theme-engine/src/tokenSchema.ts`, `scripts/validate-tokens.ts`

Zod schema validates token structure:

- Ensures DTCG format compliance
- Validates token types (color, dimension, fontFamily, etc.)
- Checks required fields
- Fails fast on invalid tokens

**Governance**: Validation runs in CI to enforce token structure.

### 3. Theme Engine

**Location**: `theme-engine/src/`

Pure function that compiles tokens into MUI themes:

- **buildTheme.ts**: Main compilation function
- **Mappers**: Convert token categories to MUI theme structure
  - `paletteMapper.ts`: Color tokens → MUI palette
  - `typographyMapper.ts`: Typography tokens → MUI typography
  - `spacingMapper.ts`: Spacing tokens → MUI spacing function
  - `shapeMapper.ts`: Shape tokens → MUI shape
  - `componentMapper.ts`: Semantic tokens → MUI component overrides

**Key Principle**: Deterministic compilation. Same tokens always produce the same theme.

### 4. MUI Themes (Adapter Layer)

**Location**: `packages/themes/src/`

Compiled themes for each business unit:

- `getBuATheme()` - Core Banking Platform
- `getBuBTheme()` - Growth & Payments Experience
- `getBuCTheme()` - Wealth Management

**Key Principle**: MUI is an adapter, not the design system. The design system is defined at the token and theme engine layers.

### 5. Component Wrappers

**Location**: `packages/ui/src/`

Thin wrappers around MUI components organized by atomic design:

- **Atoms**: Button, Typography
- **Molecules**: TextField, Alert
- **Organisms**: Card
- **Templates**: FormLayout
- **Pages**: LoginPage

**Key Principles**:
- Components consume semantic tokens (meaning), not raw values
- Styling via MUI's `sx` prop, `Box`, `Stack`, `Grid`, `Container`
- No custom CSS files
- BU-agnostic APIs

### 6. Applications

**Location**: `storybook/`, `apps/demo-site/`, and product applications

Applications consume themes and components:

- **Storybook**: Component documentation with BU theme switching
- **Demo Site**: Application-scale demonstration with runtime BU switching
- **Product Apps**: Real applications using the design system

## How BU A, B, and C are Driven by the Same Token Engine

All three business units:

1. **Use the Same Token Schema**: All BUs follow the same DTCG token structure
2. **Compile Through the Same Engine**: `buildTheme()` compiles all BU tokens identically
3. **Share Component APIs**: Same component wrappers work for all BUs
4. **Differ Only in Token Values**: Visual differences come from token values, not code

Example:

```typescript
// Same compilation process for all BUs
const buATokens = await loadTokens('bu-a');
const buATheme = buildTheme(buATokens); // Uses same buildTheme function

const buBTokens = await loadTokens('bu-b');
const buBTheme = buildTheme(buBTokens); // Same function, different tokens

const buCTokens = await loadTokens('bu-c');
const buCTheme = buildTheme(buCTokens); // Same function, different tokens
```

The only difference is the token files:
- `tokens/bu-a/tokens.json` has navy blue primary colors
- `tokens/bu-b/tokens.json` has cyan primary colors
- `tokens/bu-c/tokens.json` has purple primary colors

## MUI as Adapter Layer

MUI provides:
- Component APIs
- Theme structure
- Styling system

MUI does not provide:
- Token architecture (we provide this)
- Multi-tenant theming patterns (we provide this)
- Governance enforcement (we provide this)
- Versioning discipline (we provide this)
- Deterministic compilation (we provide this)

**The design system is defined at the token and theme engine layers.** MUI adapts our design system to React/MUI's component model.

## Extension Points

### Adding a New Business Unit

1. Create `tokens/bu-x/tokens.json` following DTCG format
2. Create `tokens/bu-x/version.json` with version
3. Create `packages/themes/src/bu-x.ts` with theme loader
4. Export from `packages/themes/src/index.ts`
5. Add to Storybook theme switcher
6. Components automatically work (no code changes needed)

### Adding a New Token Category

1. Add to Zod schema in `theme-engine/src/tokenSchema.ts`
2. Create mapper in `theme-engine/src/mappers/`
3. Use mapper in `buildTheme.ts`
4. Update token files to include new category
5. Components can now consume new tokens

### Adding a New Component

1. Create wrapper in `packages/ui/src/`
2. Follow token paradigm (consume semantic tokens)
3. Add Storybook stories
4. Works automatically with all BU themes

## Governance Points

Governance is enforced at multiple layers:

1. **Token Validation**: Schema validation catches invalid tokens
2. **Version Enforcement**: Version bump checks prevent unversioned changes
3. **Code Linting**: Pattern linting prevents hardcoded values
4. **CI Integration**: All checks run in CI, failing builds on violations

## Benefits of This Architecture

1. **Token-Driven**: Single source of truth at token level
2. **Scalable**: Easy to add new BUs without code duplication
3. **Governable**: Validation and linting enforce design system rules
4. **Framework-Agnostic**: Tokens could be compiled to other frameworks
5. **Deterministic**: Same tokens always produce same themes
6. **Maintainable**: Changes to visual design happen at token level, not component level

