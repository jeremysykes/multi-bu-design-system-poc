# Multi-BU Demonstration

## Overview

The multi-BU design system demonstrates how multiple business units share component APIs while expressing different visual identities. This document explains the demonstration surfaces and how BU C fits into the portfolio.

## Demonstration Surfaces

### Storybook

**Location**: `storybook/`

**Purpose**: Component-level multi-BU review

**Features**:
- Theme switcher toolbar control
- All stories render under selected theme
- Visual divergence visible immediately
- Chromatic visual regression for all three BUs

**Usage**:
1. Open Storybook: `pnpm run storybook`
2. Select BU theme via toolbar (top right)
3. Navigate through stories
4. Compare component appearance across BUs

**See**: `docs/BU-Switching.mdx` in Storybook for detailed guide

### Demo Site

**Location**: `apps/demo-site/`

**Purpose**: Application-scale multi-BU demonstration

**Features**:
- Runtime BU switching via tabs
- Three realistic pages (Dashboard, Onboarding, Settings)
- URL-based BU selection (`?bu=bu-a|bu-b|bu-c`)
- Complete application experience

**Usage**:
1. Start demo site: `pnpm run demo:dev`
2. Select BU theme via tabs (top of page)
3. Navigate between pages
4. See how entire app adapts to selected theme

**See**: `docs/demo-site.md` for detailed documentation

## Business Units

The three business units share component APIs while expressing different visual identities. See `docs/business-units.md` for detailed descriptions of each BU's design direction, use cases, and how they complement each other:

- **Core Banking Platform (BU A)**: Conservative, dense, professional
- **Growth & Payments Experience (BU B)**: Expressive, spacious, modern  
- **Wealth Management (BU C)**: Sophisticated, premium, elegant

## Cross-BU Review Process

### For Designers

1. **Open Storybook**: Use theme switcher to compare components
2. **Check Visual Hierarchy**: Ensure hierarchy maintained across BUs
3. **Verify Accessibility**: Check contrast ratios for all BUs
4. **Review Brand Expression**: Ensure each BU expresses its identity
5. **Test Responsiveness**: Verify components work across screen sizes

### For Engineers

1. **Review Component Code**: Ensure components consume semantic tokens
2. **Check Token Usage**: Verify no hardcoded values
3. **Test Theme Switching**: Ensure smooth transitions between themes
4. **Validate Token Structure**: Run `pnpm run tokens:validate`
5. **Check Versioning**: Ensure token changes are versioned

### For Stakeholders

1. **Open Demo Site**: See design system at application scale
2. **Switch BUs**: Use tabs to see visual divergence
3. **Navigate Pages**: See how pages adapt to BU themes
4. **Understand Scope**: See how three BUs share same components
5. **Review Consistency**: Verify cross-BU consistency

## BU C as Fully Realized Third BU

BU C (Wealth Management) is a fully realized business unit:

### Token Completeness

- **Complete token structure**: All token categories (color, typography, spacing, shape, semantic)
- **Full color palette**: Primary, secondary, neutral, error, warning, info, success (50-900 ramps)
- **Typography system**: Font families, sizes, weights, line heights
- **Semantic mappings**: Surface, text, border, action, feedback

### Theme Compilation

- **Valid theme**: Compiles cleanly through theme engine
- **MUI theme**: Produces valid MUI theme object
- **Component overrides**: Semantic tokens mapped to component styles

### Storybook Integration

- **Theme switcher**: Included in Storybook toolbar
- **All stories**: Work with BU C theme
- **Visual regression**: Captured in Chromatic for all three BUs

### Demo Site Integration

- **Runtime switching**: BU C selectable in demo site tabs
- **All pages**: Work with BU C theme
- **URL routing**: BU C accessible via `?bu=bu-c`

### Documentation

- **Design direction**: Documented in `docs/business-units.md`
- **Token structure**: Follows same DTCG format as BU A/B
- **Versioning**: Has version file (`tokens/bu-c/version.json`)

## Visual Divergence

When viewing the same component side-by-side across BUs:

### Color Differences

- **BU A**: Deep navy blue - professional, authoritative
- **BU B**: Vibrant cyan - energetic, modern
- **BU C**: Rich purple/indigo - sophisticated, premium

### Typography Differences

- **BU A**: Dense (0.875rem base) - information-focused
- **BU B**: Spacious (1.125rem base) - comfortable reading
- **BU C**: Balanced (1rem base) - elegant, refined

### Contrast Differences

- **BU A**: High contrast - conservative, defined
- **BU B**: Softer contrast - modern, approachable
- **BU C**: Refined contrast - sophisticated, premium

### Border Differences

- **BU A**: Defined borders (neutral-400) - structured
- **BU B**: Soft borders (neutral-200) - approachable
- **BU C**: Standard borders (neutral-300) - balanced

**All differences are driven by tokens, not component code changes.**

## Best Practices Demonstrated

1. **Token-Driven**: No hardcoded values in components
2. **Semantic Consumption**: Components use semantic tokens (meaning), not raw values
3. **Theme Switching**: Clean implementation of runtime theme switching
4. **Cross-BU Consistency**: Same components work across all BUs
5. **Visual Divergence**: Clear visual differences driven by tokens
6. **Governance**: Validation and versioning enforced

## Future Enhancements

While BU C is fully realized, potential future enhancements include:

- Additional BUs (Developer Platform, Retail Banking, etc.)
- BU-specific component variants (if needed)
- BU-specific documentation
- Figma integration for token sync
- Additional framework adapters (Vue, Angular)

These are explicitly out of scope for the current enhancement cycle.

