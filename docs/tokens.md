# Token Dictionary

## Overview

The design system uses a layered token model where tokens are the single source of truth for all visual decisions. No hardcoded values are allowed in component code.

## Token Hierarchy

1. **Base Tokens** - Raw values (palette ramps, typography ramps, spacing scale, shape)
2. **Semantic Tokens** - Intent-based mappings (surface, text, border, action, feedback)
3. **Component Tokens** - Component-specific overrides (optional, only if needed)

## Token Naming Rules

### Palette Tokens

- Format: `palette.{colorName}.{shade}`
- Color names: `primary`, `secondary`, `neutral`, `error`, `warning`, `info`, `success`
- Shades: `50`, `100`, `200`, `300`, `400`, `500`, `600`, `700`, `800`, `900`
- Example: `palette.primary.500`

### Typography Tokens

- Font families: `typography.fontFamily.{primary|secondary|mono}`
- Font sizes: `typography.fontSize.{xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl}`
- Font weights: `typography.fontWeight.{light|regular|medium|semibold|bold}`
- Line heights: `typography.lineHeight.{none|tight|snug|normal|relaxed|loose}`

### Spacing Tokens

- Format: `spacing.{number}`
- Scale: `0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `12`, `14`, `16`, `20`, `24`, `32`, `40`, `48`, `56`, `64`
- Example: `spacing.4` = `16px`

### Shape Tokens

- Border radius: `shape.borderRadius.{none|sm|base|md|lg|xl|2xl|full}`
- Elevation: `shape.elevation.{0|1|2|3|4|5}`

## Semantic Token Dictionary

### Surface Tokens

- `semantic.surface.default` - Default surface color (typically neutral.50)
- `semantic.surface.elevated` - Elevated surface (cards, modals)
- `semantic.surface.overlay` - Overlay surface (modals, dialogs)

### Text Tokens

- `semantic.text.primary` - Primary text color (typically neutral.900)
- `semantic.text.secondary` - Secondary text color (typically neutral.700)
- `semantic.text.disabled` - Disabled text color (typically neutral.400)
- `semantic.text.inverse` - Inverse text color (for dark backgrounds)

### Border Tokens

- `semantic.border.default` - Default border color (typically neutral.300)
- `semantic.border.focus` - Focus border color (typically primary.500)
- `semantic.border.error` - Error border color (typically error.500)

### Action Tokens

- `semantic.action.primary` - Primary action color (typically primary.500)
- `semantic.action.secondary` - Secondary action color (typically secondary.500)
- `semantic.action.disabled` - Disabled action color (typically neutral.300)

### Feedback Tokens

- `semantic.feedback.error` - Error feedback color (typically error.500)
- `semantic.feedback.warning` - Warning feedback color (typically warning.500)
- `semantic.feedback.info` - Info feedback color (typically info.500)
- `semantic.feedback.success` - Success feedback color (typically success.500)

## Token Reference Syntax

Semantic tokens reference base tokens using dot notation:

```json
{
	"semantic": {
		"text": {
			"primary": "palette.neutral.900"
		}
	}
}
```

## Adding New Tokens

1. Add base token value to `tokens/core/{category}.json`
2. Reference in semantic tokens if needed
3. Update token schema in `theme-engine/src/tokenSchema.ts`
4. Update mappers if new token category is added
5. Document in this file

## Examples

### Using Palette Tokens

```typescript
// In component (via theme)
const theme = useTheme();
const primaryColor = theme.palette.primary.main; // Uses palette.primary.500
```

### Using Spacing Tokens

```typescript
// In component (via theme)
const theme = useTheme();
const padding = theme.spacing(4); // Uses spacing.4 = 16px
```

### Using Typography Tokens

```typescript
// In component (via theme)
const theme = useTheme();
const fontSize = theme.typography.body1.fontSize; // Uses typography.fontSize.base
```
