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

### Step 2: Create Palette Tokens

Create `tokens/bu-c/palette.json` with your BU's brand colors:

```json
{
	"primary": {
		"50": "#...",
		"100": "#...",
		...
		"900": "#..."
	},
	"secondary": {
		...
	}
}
```

**Requirements:**
- Must include `primary` and `secondary` color ramps
- Each ramp must have shades 50-900
- Colors must be valid hex format: `#RRGGBB`
- Should be visually distinct from other BUs

### Step 3: Create Typography Tokens

Create `tokens/bu-c/typography.json`:

```json
{
	"fontFamily": {
		"primary": "\"Your Font\", sans-serif"
	},
	"fontSize": {
		"xs": "0.75rem",
		...
	}
}
```

**Requirements:**
- Must include `fontFamily.primary`
- Must include `fontSize` with at least `xs`, `sm`, `base`, `lg`, `xl`, `2xl`
- Can override core typography values

### Step 4: Create Semantic Mappings

Create `tokens/bu-c/semantic.json`:

```json
{
	"surface": {
		"default": "palette.neutral.50"
	},
	"text": {
		"primary": "palette.neutral.900"
	},
	"action": {
		"primary": "palette.primary.500"
	}
}
```

**Requirements:**
- Must include `surface.default`
- Must include `text.primary`
- Must include `action.primary`
- Can reference palette tokens using dot notation

### Step 5: Validate Tokens

Run token validation:

```bash
pnpm run validate:tokens
```

Fix any errors before proceeding.

### Step 6: Create Theme File

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

### Step 7: Export Theme

Update `packages/themes/src/index.ts`:

```typescript
export { getBuCTheme } from './bu-c';
```

### Step 8: Add to Storybook (Optional)

Update `.storybook/preview.tsx` to include your BU theme in the side-by-side decorator.

### Step 9: Verify

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

## Token Inheritance

BU tokens extend core tokens:

- **Palette**: BU tokens override/extend core palette
- **Typography**: BU tokens override/extend core typography
- **Spacing**: Inherits from core (typically doesn't vary by BU)
- **Shape**: Inherits from core (typically doesn't vary by BU)
- **Semantic**: BU tokens override/extend core semantic mappings

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
