import type { PaletteTokens } from '../types';
import type { PaletteOptions } from '@mui/material/styles';

/**
 * Maps token palette to MUI palette
 * Pure function - no side effects, stateless
 */
export function mapPalette(tokens: PaletteTokens): PaletteOptions {
	return {
		primary: {
			main: tokens.primary[500],
			light: tokens.primary[300],
			dark: tokens.primary[700],
			contrastText: '#ffffff',
		},
		secondary: {
			main: tokens.secondary[500],
			light: tokens.secondary[300],
			dark: tokens.secondary[700],
			contrastText: '#ffffff',
		},
		error: tokens.error
			? {
					main: tokens.error[500],
					light: tokens.error[300],
					dark: tokens.error[700],
					contrastText: '#ffffff',
				}
			: undefined,
		warning: tokens.warning
			? {
					main: tokens.warning[500],
					light: tokens.warning[300],
					dark: tokens.warning[700],
					contrastText: '#ffffff',
				}
			: undefined,
		info: tokens.info
			? {
					main: tokens.info[500],
					light: tokens.info[300],
					dark: tokens.info[700],
					contrastText: '#ffffff',
				}
			: undefined,
		success: tokens.success
			? {
					main: tokens.success[500],
					light: tokens.success[300],
					dark: tokens.success[700],
					contrastText: '#ffffff',
				}
			: undefined,
		grey: {
			50: tokens.neutral[50],
			100: tokens.neutral[100],
			200: tokens.neutral[200],
			300: tokens.neutral[300],
			400: tokens.neutral[400],
			500: tokens.neutral[500],
			600: tokens.neutral[600],
			700: tokens.neutral[700],
			800: tokens.neutral[800],
			900: tokens.neutral[900],
		},
	};
}
