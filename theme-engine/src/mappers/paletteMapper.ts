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
 * 
 * Note: Token references are resolved during token loading, so by the time
 * tokens reach this mapper, all values are actual color strings (hex/rgba)
 */
export function mapPalette(colorTokens: any): PaletteOptions {
	// Extract color values from DTCG format (supports both flattened and nested)
	const getColor = (category: string, shade: string | number): string => {
		// Try flattened format first (primary-50)
		const flattenedKey = `${category}-${shade}`;
		if (colorTokens[flattenedKey]) {
			const value = extractValue(colorTokens[flattenedKey]);
			// At this point, values should already be resolved (no references)
			if (typeof value === 'string' && (value.startsWith('#') || value.startsWith('rgb'))) {
				return value;
			}
		}
		// Fall back to nested format for backward compatibility (color.primary.50)
		if (colorTokens[category]?.[shade]) {
			const value = extractValue(colorTokens[category][shade]);
			if (typeof value === 'string' && (value.startsWith('#') || value.startsWith('rgb'))) {
				return value;
			}
		}
		
		// Development warning for missing tokens
		if (process.env.NODE_ENV === 'development') {
			console.warn(`Missing color token: ${category}-${shade}, falling back to #000000`);
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
			// contrastText is automatically calculated by MUI from main color using WCAG contrast algorithms
		},
		secondary: {
			main: getColor('secondary', '500'),
			light: getColor('secondary', '300'),
			dark: getColor('secondary', '700'),
			// contrastText is automatically calculated by MUI from main color using WCAG contrast algorithms
		},
		error: hasCategory('error')
			? {
					main: getColor('error', '500'),
					light: getColor('error', '300'),
					dark: getColor('error', '700'),
					// contrastText is automatically calculated by MUI from main color using WCAG contrast algorithms
				}
			: undefined,
		warning: hasCategory('warning')
			? {
					main: getColor('warning', '500'),
					light: getColor('warning', '300'),
					dark: getColor('warning', '700'),
					// contrastText is automatically calculated by MUI from main color using WCAG contrast algorithms
				}
			: undefined,
		info: hasCategory('info')
			? {
					main: getColor('info', '500'),
					light: getColor('info', '300'),
					dark: getColor('info', '700'),
					// contrastText is automatically calculated by MUI from main color using WCAG contrast algorithms
				}
			: undefined,
		success: hasCategory('success')
			? {
					main: getColor('success', '500'),
					light: getColor('success', '300'),
					dark: getColor('success', '700'),
					// contrastText is automatically calculated by MUI from main color using WCAG contrast algorithms
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
