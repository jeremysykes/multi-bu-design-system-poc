# Adding a New Business Unit

This guide walks you through adding a new business unit (BU) to the design system.

## Prerequisites

- All core tokens exist in `tokens/core/`
- Token validation passes: `pnpm run validate:tokens`
- Understanding of token structure (see `docs/tokens.md`)

## Step-by-Step Instructions

### Step 1: Create BU Directory

Create a new directory for your BU:

```bash
mkdir -p tokens/bu-c
```

Replace `bu-c` with your BU identifier (e.g., `bu-retail`, `bu-enterprise`).

### Step 2: Create Unified Token File

Create `tokens/bu-c/tokens.json` with your BU's complete token set in DTCG format:

```json
{
  "$schema": "https://schemas.figma.com/tokens/v1",
  "color": {
    "primary-50": {
      "$value": "#...",
      "$type": "color"
    },
    ...
    "primary-900": {
      "$value": "#...",
      "$type": "color"
    },
    "secondary-50": {
      "$value": "#...",
      "$type": "color"
    },
    ...
    "neutral-50": {
      "$value": "#FAFAFA",
      "$type": "color"
    },
    ...
  },
  "typography": {
    "fontFamily": {
      "primary": {
        "$value": "\"Your Font\", sans-serif",
        "$type": "fontFamily"
      }
    },
    "fontSize": {
      "xs": {
        "$value": "0.75rem",
        "$type": "dimension"
      },
      ...
    }
  },
  "spacing": { ... },
  "shape": { ... },
  "semantic": {
    "surface": {
      "default": {
        "$value": "{color.neutral-50}",
        "$type": "color"
      }
    },
    "text": {
      "primary": {
        "$value": "{color.neutral-900}",
        "$type": "color"
      }
    },
    "action": {
      "primary": {
        "$value": "{color.primary-500}",
        "$type": "color"
      }
    }
  }
}
```

**Requirements:**
- Must use DTCG format (same structure as BU A and BU B)
- Must include complete color palette (primary, secondary, neutral, error, warning, info, success) with 50-900 ramps
- Must include typography (fontFamily, fontSize, fontWeight, lineHeight)
- Must include spacing and shape tokens
- Must include semantic mappings (surface, text, border, action, feedback)
- Reference colors using `{color.primary-500}` format
- Should be visually distinct from other BUs

**Reference:** Look at `tokens/bu-a/tokens.json` or `tokens/bu-b/tokens.json` for complete examples.

### Step 3: Create Version File

Create `tokens/bu-c/version.json`:

```json
{
  "version": "1.0.0"
}
```

This version file is required for governance. See `docs/versioning.md` for versioning policies.

### Step 4: Validate Tokens

Run token validation:

```bash
pnpm run validate:tokens
```

Fix any errors before proceeding.

### Step 5: Create Theme File

Create `packages/themes/src/bu-c.ts`:

```typescript
import { buildTheme } from '../../theme-engine/src/buildTheme';
import { loadTokens } from '../../theme-engine/src/loadTokens';
import type { Theme } from '@mui/material/styles';

let buCTheme: Theme | null = null;

export async function getBuCTheme(): Promise<Theme> {
	if (!buCTheme) {
		const tokens = await loadTokens('bu-c');
		buCTheme = buildTheme(tokens);
	}
	return buCTheme;
}
```

### Step 6: Export Theme

Update `packages/themes/src/index.ts`:

```typescript
export { getBuCTheme } from './bu-c';
```

### Step 7: Add to Storybook

Update Storybook to include your BU theme. See Phase 3 documentation for theme switching setup.

### Step 8: Verify

1. Run validation: `pnpm run validate:tokens`
2. Run linting: `pnpm run lint:design-system`
3. Type check: `pnpm run type-check`
4. Test in Storybook: `pnpm run storybook`

## Testing Checklist

- [ ] Token files created and valid JSON
- [ ] Token validation passes
- [ ] Theme compiles without errors
- [ ] Theme exports correctly
- [ ] Visual divergence from other BUs is clear
- [ ] Components render correctly under new theme
- [ ] All governance checks pass

## Token Structure

BU tokens are self-contained DTCG format files:

- Each BU has a complete `tokens.json` file with all token categories
- Tokens reference each other using `{color.primary-500}` format
- All BUs follow the same structure for consistency
- The theme engine compiles tokens directly without merging with core

## Common Issues

### Token Validation Fails

- Check hex color format: must be `#RRGGBB`
- Ensure all required fields are present
- Verify JSON syntax is valid

### Theme Doesn't Compile

- Check that `loadTokens` can find your BU directory
- Verify token structure matches schema
- Check TypeScript errors in theme file

### No Visual Difference

- Ensure palette colors are distinct from other BUs
- Check that semantic tokens reference your BU's palette
- Verify typography differs if intended

## Next Steps

After adding a BU:

1. Document BU-specific design decisions
2. Add to Storybook stories
3. Update any BU-specific documentation
4. Consider adding BU-specific component variants if needed
