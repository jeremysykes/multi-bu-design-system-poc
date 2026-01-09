# System Architecture

**Copyright (c) 2025 Jeremy Sykes. All rights reserved.**

This document describes the system architecture of the Multi-Business Unit Design System Platform. The architecture, design patterns, and implementation approach described herein are proprietary intellectual property of Jeremy Sykes.

---

## Executive Summary

This platform implements a production-grade, multi-tenant design system architecture that enables multiple business units to share component APIs while maintaining distinct brand identities. The system is built on a 4-layer model that separates design intent from implementation, ensuring scalability, maintainability, and governance at enterprise scale.

**Key Architectural Principles:**
- **Token-Driven**: Design tokens are the single source of truth
- **Deterministic**: Same tokens always produce the same output
- **Governed**: Automated validation and enforcement prevent drift
- **Scalable**: Architecture supports unlimited business units without code changes

---

## 4-Layer Architecture Model

The platform is organized into four distinct layers, each with clear responsibilities and boundaries:

### Layer 1: Design Layer (Visualization)

**Purpose**: Visual design representation and communication

**Components**:
- **Figma Files**: Design mockups and visual specifications
- **Design System Documentation**: Visual style guides and component libraries

**Key Principle**: **Figma is visualization, not source of truth**

Figma serves as a design tool for creating and communicating design intent. However, Figma files are not the authoritative source for the design system. The actual design system is defined in the Tokens Layer (Layer 2).

**Workflow**:
1. Designers create designs in Figma
2. Design tokens are extracted from Figma (or defined directly)
3. Tokens are stored in DTCG format JSON files
4. Tokens become the source of truth

**Location**: `tokens/figma/` (optional, for reference only)

---

### Layer 2: Tokens Layer (Source of Truth)

**Purpose**: Authoritative definition of design decisions

**Components**:
- **Core Tokens**: Shared design tokens (`tokens/core/tokens.json`)
- **Business Unit Tokens**: BU-specific overrides (`tokens/bu-*/tokens.json`)
- **Token Schema**: DTCG-compliant structure validation

**Key Principle**: **Tokens are the single source of truth**

All design decisions are encoded as design tokens in DTCG (Design Tokens Community Group) format. No hardcoded visual values exist in components or themes.

**Token Categories**:
- **Color**: Complete palette with 50-900 ramps (primary, secondary, neutral, error, warning, info, success)
- **Typography**: Font families, sizes, weights, line heights
- **Spacing**: Dimension tokens (0-64 scale)
- **Shape**: Border radius, elevation
- **Semantic**: Intent-based mappings (surface, text, border, action, feedback)

**Token Structure**:
```json
{
  "color": {
    "primary-500": {
      "$value": "#3A5B81",
      "$type": "color"
    }
  },
  "semantic": {
    "action": {
      "primary": {
        "$value": "{color.primary-500}",
        "$type": "color"
      }
    }
  }
}
```

**Location**: `tokens/`

**Token Control Plane**:
- **Registry**: Centralized token registry per business unit
- **Versioning**: Semantic versioning enforced for all token changes
- **Validation**: Schema validation ensures DTCG compliance
- **Diffing**: Automated token comparison and change tracking
- **Merging**: Core tokens merged with BU-specific overrides

---

### Layer 3: Runtime Layer (Compilation & Adaptation)

**Purpose**: Transform tokens into framework-specific themes and components

**Components**:
- **Theme Engine**: Pure function compilation (`theme-engine/src/buildTheme.ts`)
- **Mappers**: Token-to-theme transformation
  - `paletteMapper.ts`: Color tokens → MUI palette
  - `typographyMapper.ts`: Typography tokens → MUI typography
  - `spacingMapper.ts`: Spacing tokens → MUI spacing function
  - `shapeMapper.ts`: Shape tokens → MUI shape
  - `componentMapper.ts`: Semantic tokens → MUI component overrides
- **MUI Adapter**: Framework-specific theme compilation
- **Component Wrappers**: BU-agnostic component APIs

**Key Principle**: **MUI is an adapter layer, not the design system**

MUI provides component APIs and theme structure. The design system is defined at the token and theme engine layers. MUI adapts our design system to React/MUI's component model.

**Compilation Process**:
1. Load tokens (core + BU-specific)
2. Merge tokens (BU overrides core)
3. Resolve token references
4. Validate token structure
5. Map tokens to MUI theme structure
6. Generate deterministic theme output

**Deterministic Compilation**:
- Same tokens always produce the same theme
- No side effects or random values
- Pure function compilation
- Cached after first compilation

**Location**: `theme-engine/src/`, `packages/themes/src/`, `packages/ui/src/`

---

### Layer 4: Governance Layer (Enforcement)

**Purpose**: Automated validation, versioning, and compliance enforcement

**Components**:
- **Schema Validation**: Zod-based token structure validation
- **Version Enforcement**: Semantic versioning required for token changes
- **Pattern Linting**: Detection of hardcoded values in code
- **CI/CD Integration**: Automated checks in build pipeline
- **Token Diffing**: Change tracking and comparison
- **AI Validation**: Automated compliance checking (where applicable)

**Key Principle**: **Governance is enforced, not suggested**

Violations break builds. Governance is automated, not manual review.

**Validation Rules**:
1. **Token Schema Compliance**: All tokens must match DTCG schema
2. **Version Bumps Required**: Token changes require version bumps
3. **No Hardcoded Values**: Components must use tokens, not raw values
4. **Semantic Token Coverage**: Required semantic tokens must be present

**Enforcement Points**:
- **Local Development**: Scripts can be run manually
- **Pre-commit**: Validation before commits (optional)
- **CI/CD**: All checks run automatically on push/PR
- **Pre-deployment**: All checks must pass before deployment

**Location**: `scripts/`, `.github/workflows/`, `theme-engine/src/validators/`

---

## Multi-BU Theming System

### Architecture Overview

The platform supports multiple business units (BUs) sharing the same component APIs while maintaining distinct brand identities. This is achieved through:

1. **Shared Component Code**: All BUs use the same component wrappers
2. **BU-Specific Tokens**: Each BU has its own token file
3. **Token Merging**: BU tokens override core tokens
4. **Deterministic Compilation**: Same compilation process for all BUs

### Token Merging Strategy

**Core Tokens** (`tokens/core/tokens.json`):
- Shared design tokens across all BUs
- Base color palettes, typography, spacing
- Semantic tokens with default values

**BU Tokens** (`tokens/bu-*/tokens.json`):
- BU-specific overrides
- Brand-specific colors, typography
- Semantic token overrides

**Merging Process**:
1. Load core tokens
2. Load BU-specific tokens
3. Deep merge (BU overrides core)
4. Resolve token references
5. Validate merged result

**Result**: Each BU gets a complete token set with BU-specific values where overridden, core values elsewhere.

### Theme Compilation

**Process**:
```typescript
// Same compilation process for all BUs
const buATokens = await loadTokens('bu-a');
const buATheme = buildTheme(buATokens);

const buBTokens = await loadTokens('bu-b');
const buBTheme = buildTheme(buBTokens);
```

**Output**: Each BU gets a compiled MUI theme with BU-specific values.

### Component Consumption

**BU-Agnostic Components**:
```tsx
// Same component code works for all BUs
<Button variant="contained" color="primary">
  Click Me
</Button>
```

**Theme Switching**:
- Runtime theme switching in applications
- Storybook theme switcher for documentation
- Each BU theme is independently compiled

---

## Token Control Plane

### Token Registry

**Structure**:
- **Core Registry**: `tokens/core/tokens.json`
- **BU Registries**: `tokens/bu-*/tokens.json`
- **Version Files**: `tokens/*/version.json`

**Registry Operations**:
- **Read**: Load tokens for compilation
- **Write**: Update tokens (requires version bump)
- **Validate**: Schema validation before write
- **Diff**: Compare token versions
- **Merge**: Core + BU token merging

### Token Resolution

**Reference Resolution**:
- Tokens can reference other tokens: `{color.primary-500}`
- Supports flattened format: `{color.primary-500}`
- Supports nested format: `{color.primary.500}`
- Circular reference detection and fallback

**Resolution Process**:
1. Parse token references
2. Resolve from merged token object
3. Fallback to core tokens for circular references
4. Validate resolved values

### Token Versioning

**Version Files**: `tokens/{bu-id}/version.json`
- Format: Semver (`{ "version": "1.0.0" }`)
- Required for all token changes
- Enforced in CI/CD

**Version Bump Rules**:
- **Patch**: Token value changes (same semantic meaning)
- **Minor**: New tokens added (backward compatible)
- **Major**: Token removal or breaking changes

**Enforcement**:
- CI/CD checks version bumps on token changes
- Build fails if version not bumped
- Version history tracked in git

---

## Governance & Validation

### Automated Validation

**Token Schema Validation**:
- Zod schema validates DTCG format compliance
- Type checking (color, dimension, fontFamily, etc.)
- Required field validation
- Format validation (hex colors, CSS values)

**Code Pattern Validation**:
- Hardcoded hex color detection
- Hardcoded spacing detection
- Hardcoded typography detection
- Pattern matching in component code

**Version Enforcement**:
- Git diff detection for token changes
- Version file existence check
- Version bump validation (at least patch)

### AI Validation and Drift Detection

**Compliance Checking**:
- Automated pattern detection
- Token usage analysis
- Component compliance checking
- Design system rule enforcement

**Drift Detection**:
- Token change tracking
- Component pattern analysis
- Design system consistency checking
- Automated reporting

**Integration Points**:
- CI/CD pipeline integration
- Pre-commit hooks (optional)
- Automated PR comments
- Compliance reporting

---

## Design-to-Delivery Pipeline

### Pipeline Stages

**1. Design Phase**:
- Designers create designs in Figma
- Design decisions documented
- Token requirements identified

**2. Token Definition Phase**:
- Tokens extracted from Figma (or defined directly)
- Tokens stored in DTCG format JSON
- Token schema validation
- Version files created/updated

**3. Compilation Phase**:
- Tokens loaded and merged
- Theme engine compiles tokens to MUI themes
- Component wrappers consume themes
- Deterministic output generated

**4. Validation Phase**:
- Schema validation
- Version enforcement
- Pattern linting
- CI/CD checks

**5. Packaging Phase**:
- Themes packaged as consumable libraries
- Components packaged as UI library
- Type definitions generated
- Documentation generated

**6. Delivery Phase**:
- Packages published (internal or external)
- Storybook documentation updated
- Demo site updated
- Product applications consume packages

### Pipeline Automation

**Automated Steps**:
- Token validation on commit
- Version enforcement on token changes
- Theme compilation on token changes
- Package building on changes
- CI/CD validation on PR

**Manual Steps**:
- Design creation in Figma
- Token definition (can be automated)
- Design review
- Token review

### Quality Gates

**Pre-Commit**:
- Token schema validation
- Version bump check
- Pattern linting

**Pre-Merge**:
- All validation checks
- Type checking
- Build verification

**Pre-Deployment**:
- Full validation suite
- Integration testing
- Visual regression (if applicable)

---

## Extension Points

### Adding a New Business Unit

**Zero Code Changes Required**:
1. Create `tokens/bu-x/tokens.json` following DTCG format
2. Create `tokens/bu-x/version.json` with version
3. Create `packages/themes/src/bu-x.ts` with theme loader
4. Export from `packages/themes/src/index.ts`
5. Add to Storybook theme switcher

**Result**: New BU works with all existing components immediately.

### Adding a New Token Category

**Extensible Token Schema**:
1. Add to Zod schema in `theme-engine/src/tokenSchema.ts`
2. Create mapper in `theme-engine/src/mappers/`
3. Use mapper in `buildTheme.ts`
4. Update token files to include new category

**Result**: New token category available across all BUs.

### Framework Extension

**Framework-Agnostic Token Layer**:
- Tokens are JSON files (framework-agnostic)
- Theme engine can compile to different frameworks
- Current implementation: MUI themes
- Can be extended to Vue, Angular, etc.

**Result**: Same tokens work with different frameworks.

---

## Conclusion

This 4-layer architecture provides a scalable, maintainable, and governed foundation for multi-tenant design systems. By separating design intent (tokens) from implementation (themes/components), the platform enables unlimited business units to share component APIs while maintaining distinct brand identities.

The architecture is production-ready, enterprise-grade, and designed for scale. All layers are automated, validated, and enforced, ensuring design system consistency at enterprise scale.

---

**Copyright (c) 2025 Jeremy Sykes. All rights reserved.**

This system architecture is proprietary intellectual property. Unauthorized use, reproduction, or distribution is prohibited.

