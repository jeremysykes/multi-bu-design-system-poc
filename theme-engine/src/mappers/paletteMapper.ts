import type { PaletteOptions } from '@mui/material/styles';
import { extractValue } from '../utils/extractValue';

/**
 * Maps DTCG color tokens to MUI palette
 * 
 * Expected DTCG format (flattened for Figma compatibility):
 * {
 *   color: {
 *     "primary-50": { $value: "#...", $type: "color" },
 *     "primary-100": { $value: "#...", $type: "color" },
 *     "primary-500": { $value: "#...", $type: "color" },
 *     "secondary-50": { ... },
 *     "neutral-50": { ... },
 *     ...
 *   }
 * }
 * 
 * Also supports legacy nested format for backward compatibility:
 * {
 *   color: {
 *     primary: { "50": { $value: "#...", $type: "color" }, ... },
 *     ...
 *   }
 * }
 */
export function mapPalette(colorTokens: any): PaletteOptions {
	// Extract color values from DTCG format (supports both flattened and nested)
	const getColor = (category: string, shade: string | number): string => {
		// Try flattened format first (primary-50)
		const flattenedKey = `${category}-${shade}`;
		if (colorTokens[flattenedKey]) {
			return extractValue(colorTokens[flattenedKey]);
		}
		// Fall back to nested format for backward compatibility (color.primary.50)
		if (colorTokens[category]?.[shade]) {
			return extractValue(colorTokens[category][shade]);
		}
		return '#000000';
	};

	// Helper to check if a category exists (supports both flattened and nested formats)
	const hasCategory = (category: string): boolean => {
		// Check flattened format (category-50, category-100, etc.)
		if (colorTokens[`${category}-50`] || colorTokens[`${category}-100`] || colorTokens[`${category}-500`]) {
			return true;
		}
		// Check nested format
		if (colorTokens[category] && typeof colorTokens[category] === 'object') {
			return true;
		}
		return false;
	};

	return {
		primary: {
			main: getColor('primary', '500'),
			light: getColor('primary', '300'),
			dark: getColor('primary', '700'),
			contrastText: '#ffffff',
		},
		secondary: {
			main: getColor('secondary', '500'),
			light: getColor('secondary', '300'),
			dark: getColor('secondary', '700'),
			contrastText: '#ffffff',
		},
		error: hasCategory('error')
			? {
					main: getColor('error', '500'),
					light: getColor('error', '300'),
					dark: getColor('error', '700'),
					contrastText: '#ffffff',
				}
			: undefined,
		warning: hasCategory('warning')
			? {
					main: getColor('warning', '500'),
					light: getColor('warning', '300'),
					dark: getColor('warning', '700'),
					contrastText: '#ffffff',
				}
			: undefined,
		info: hasCategory('info')
			? {
					main: getColor('info', '500'),
					light: getColor('info', '300'),
					dark: getColor('info', '700'),
					contrastText: '#ffffff',
				}
			: undefined,
		success: hasCategory('success')
			? {
					main: getColor('success', '500'),
					light: getColor('success', '300'),
					dark: getColor('success', '700'),
					contrastText: '#ffffff',
				}
			: undefined,
		grey: {
			50: getColor('neutral', '50'),
			100: getColor('neutral', '100'),
			200: getColor('neutral', '200'),
			300: getColor('neutral', '300'),
			400: getColor('neutral', '400'),
			500: getColor('neutral', '500'),
			600: getColor('neutral', '600'),
			700: getColor('neutral', '700'),
			800: getColor('neutral', '800'),
			900: getColor('neutral', '900'),
		},
	};
}
