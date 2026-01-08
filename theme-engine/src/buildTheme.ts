import { createTheme } from '@mui/material/styles';
import type { TokenSchema } from './types';
import { mapPalette } from './mappers/paletteMapper';
import { mapTypography } from './mappers/typographyMapper';
import { mapSpacing } from './mappers/spacingMapper';
import { mapShape } from './mappers/shapeMapper';
import { mapComponents } from './mappers/componentMapper';
import type { Theme } from '@mui/material/styles';

/**
 * Builds a MUI theme from DTCG token data
 * Pure function - no side effects, stateless, deterministic
 *
 * @param tokens - DTCG token schema data
 * @returns Compiled MUI theme
 */
export function buildTheme(tokens: TokenSchema): Theme {
	// Create base theme with palette, typography, spacing, shape
	// DTCG format has tokens.color, tokens.typography, tokens.spacing, tokens.shape
	const theme = createTheme({
		palette: mapPalette(tokens.color || {}),
		typography: mapTypography(tokens.typography || {}),
		spacing: mapSpacing(tokens.spacing || {}),
		shape: mapShape(tokens.shape || {}),
	});

	// Add component overrides based on semantic tokens
	// DTCG format has tokens.semantic
	const components = mapComponents(tokens.semantic || {}, tokens, theme);

	return createTheme({
		...theme,
		components,
	});
}
