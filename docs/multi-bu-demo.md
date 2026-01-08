# Multi-BU Demonstration

## Overview

The multi-BU design system demonstrates how multiple business units share component APIs while expressing different visual identities. This document explains the demonstration surfaces for reviewing multi-BU design system implementation.

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

## Visual Divergence

The three business units express distinct visual identities while sharing the same component APIs. See `docs/business-units.md` for detailed descriptions of visual differences and token variations between BUs.

**Key principle**: All visual differences are driven by tokens, not component code changes.

## Best Practices Demonstrated

1. **Token-Driven**: No hardcoded values in components
2. **Semantic Consumption**: Components use semantic tokens (meaning), not raw values
3. **Theme Switching**: Clean implementation of runtime theme switching
4. **Cross-BU Consistency**: Same components work across all BUs
5. **Visual Divergence**: Clear visual differences driven by tokens
6. **Governance**: Validation and versioning enforced
