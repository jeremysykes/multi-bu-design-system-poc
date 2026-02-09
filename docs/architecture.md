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

## Why This Isn't a Theme Switcher

This platform is fundamentally different from theme switcher demos:

### Token-First vs. Runtime Switching

**Theme Switcher Demos**:
- Focus on runtime CSS/theme switching
- Themes are manually crafted and hardcoded
- Switching happens at runtime through CSS variables or theme objects
- No single source of truth for design decisions

**This Platform**:
- Tokens are the single source of truth (DTCG JSON files)
- Themes are compiled deterministically from tokens (not manually crafted)
- Token changes flow through validation → compilation → packaging → consumption
- Visual design is defined at the token level, not the theme level

### Tokens as Source of Truth

**Theme Switcher Approach**:
```
Manually Crafted Theme → Runtime Switching → Applications
```

**Token-First Approach**:
```
Design Tokens → Schema Validation → Theme Engine → MUI Themes → Applications
```

**Key Difference**: Tokens drive themes, not the other way around. Changes happen at the token level, not the theme level.

### Governance Layer

**Theme Switcher Demos**:
- No governance or validation
- Changes are ad-hoc and unversioned
- No enforcement of design system rules
- Manual review processes

**This Platform**:
- Automated validation prevents invalid tokens
- Version enforcement prevents unversioned changes
- Linting prevents design system violations
- CI/CD integration enforces governance (blocks merges on violations)

**Key Difference**: Governance is enforced, not optional. Violations break CI/CD, not warnings.

### Deterministic Compilation

**Theme Switcher Demos**:
- Themes are manually adjusted
- Same input may produce different output
- Manual tweaks and overrides are common

**This Platform**:
- Same tokens always produce the same theme
- Compilation is deterministic and repeatable
- No manual tweaks or overrides needed
- Changes are versioned and tracked

**Key Difference**: Compilation is deterministic and repeatable. Same tokens = same output, always.

### Production Readiness

**Theme Switcher Demos**:
- Built for demonstration purposes
- No production deployment patterns
- No type safety or error handling
- No scalability considerations

**This Platform**:
- Deployment patterns documented
- Full TypeScript support with type safety
- Scalable architecture (add BUs without code changes)

**Key Difference**: This is a full platform, not a demo.

## Architecture Patterns

This architecture implements:

### Single Source of Truth (Tokens)

**Pattern**: All visual design decisions come from design tokens (DTCG JSON files).

**Implementation**:
- Tokens are JSON files (version-controlled)
- Tokens are the authoritative source for all visual values
- Components consume tokens via themes, never hardcoded values

**Benefits**:
- Design changes happen in one place (tokens)
- Consistency enforced automatically
- Design-to-code handoff is seamless

### Enforced Governance vs. Suggestions

**Pattern**: Governance is enforced through automated checks, not optional guidelines.

**Implementation**:
- Schema validation catches invalid tokens (CI blocks merge)
- Version enforcement prevents unversioned changes (CI blocks merge)
- Linting prevents hardcoded values (CI blocks merge)

**Benefits**:
- Design system rules cannot be violated
- No tribal knowledge required
- Governance is automatic, not manual

### Versioning Discipline

**Pattern**: Token changes are versioned, tracked, and diffed to prevent breaking changes.

**Implementation**:
- Each BU has a version file (`tokens/{bu-id}/version.json`)
- Token changes require version bumps (enforced by CI)
- Token diffing provides change tracking and audit trails

**Benefits**:
- Breaking changes are prevented (version enforcement)
- Change history is maintained (version files)
- Change review is focused (token diffing)

### Schema Validation Preventing Errors

**Pattern**: Invalid tokens are caught before compilation, preventing runtime errors.

**Implementation**:
- Zod schema validates token structure
- DTCG format compliance is enforced
- Token types are validated (color, dimension, etc.)

**Benefits**:
- Errors are caught early (before compilation)
- Invalid tokens cannot enter the system
- Clear error messages guide fixes

### Scalable Architecture Patterns

**Pattern**: Add new business units without code changes; extend to other frameworks.

**Implementation**:
- New BUs added through token files only
- Same component code works for all BUs
- Framework-agnostic token layer (can compile to Vue, Angular, etc.)

**Benefits**:
- Scales to any number of BUs
- Reduces code duplication
- Supports multiple tech stacks

### Deterministic Compilation

**Pattern**: Same input (tokens) always produces the same output (theme).

**Implementation**:
- Pure function compilation (`buildTheme(tokens)`)
- No side effects or random values
- Cached after first compilation

**Benefits**:
- Predictable results
- Testable compilation process
- No runtime compilation overhead

### Framework-Agnostic Token Layer

**Pattern**: Tokens are framework-agnostic; framework-specific themes are compiled from tokens.

**Implementation**:
- Tokens are JSON files (framework-agnostic)
- Theme engine compiles tokens to framework-specific themes
- Current implementation: MUI themes
- Can be extended to Vue, Angular, etc.

**Benefits**:
- Visual consistency across tech stacks
- Same tokens work with different frameworks
- Reduced vendor lock-in

## Extension Points

### Adding a New Business Unit

**Zero Code Changes Required**:

1. Create `tokens/bu-x/tokens.json` following DTCG format
2. Create `tokens/bu-x/version.json` with version
3. Create `packages/themes/src/bu-x.ts` with theme loader
4. Export from `packages/themes/src/index.ts`
5. Add to Storybook theme switcher
6. Components automatically work (no code changes needed)

**Result**: New BU works with all existing components immediately. Same components, different visual expression.

### Adding a New Token Category

**Extensible Token Schema**:

1. Add to Zod schema in `theme-engine/src/tokenSchema.ts`
2. Create mapper in `theme-engine/src/mappers/`
3. Use mapper in `buildTheme.ts`
4. Update token files to include new category
5. Components can now consume new tokens

**Result**: New token category available across all BUs. Components can consume new tokens via theme.

### Adding a New Component

**Framework-Agnostic Token Layer**:

1. Create wrapper in `packages/ui/src/`
2. Follow token paradigm (consume semantic tokens)
3. Add Storybook stories
4. Works automatically with all BU themes

**Result**: New component works with all BU themes automatically. No theme-specific code needed.

**Framework Extension**:

1. Create mapper for target framework (e.g., Vue, Angular)
2. Compile tokens to framework theme format
3. Create framework component wrappers
4. Same tokens work across frameworks

**Result**: Visual consistency across tech stacks. Same tokens, different frameworks.

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

