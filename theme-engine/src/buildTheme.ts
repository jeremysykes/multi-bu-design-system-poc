import { createTheme } from '@mui/material/styles';
import type { TokenSchema } from './types';
import { mapPalette } from './mappers/paletteMapper';
import { mapTypography } from './mappers/typographyMapper';
import { mapSpacing } from './mappers/spacingMapper';
import { mapShape } from './mappers/shapeMapper';
import { mapComponents } from './mappers/componentMapper';
import type { Theme } from '@mui/material/styles';

/**
 * Builds a MUI theme from token data
 * Pure function - no side effects, stateless, deterministic
 *
 * @param tokens - Complete token schema data
 * @returns Compiled MUI theme
 */
export function buildTheme(tokens: TokenSchema): Theme {
	// Create base theme with palette, typography, spacing, shape
	const theme = createTheme({
		palette: mapPalette(tokens.base.palette),
		typography: mapTypography(tokens.base.typography),
		spacing: mapSpacing(tokens.base.spacing),
		shape: mapShape(tokens.base.shape),
	});

	// Add component overrides based on semantic tokens
	const components = mapComponents(tokens.semantic, tokens.base, theme);

	return createTheme({
		...theme,
		components,
	});
}
