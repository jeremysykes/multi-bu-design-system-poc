import type { PaletteOptions } from '@mui/material/styles';
import { extractValue } from '../utils/extractValue';

/**
 * Calculates the contrast ratio between two colors
 * Returns a ratio between 1 (no contrast) and 21 (maximum contrast)
 * WCAG AA requires 4.5:1 for normal text, 3:1 for large text
 */
function getContrastRatio(foreground: string, background: string): number {
	// Convert hex to RGB
	const hexToRgb = (hex: string): [number, number, number] => {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result
			? [
					parseInt(result[1], 16),
					parseInt(result[2], 16),
					parseInt(result[3], 16),
			  ]
			: [0, 0, 0];
	};

	// Calculate relative luminance
	const getLuminance = (rgb: [number, number, number]): number => {
		const [r, g, b] = rgb.map((val) => {
			val = val / 255;
			return val <= 0.03928
				? val / 12.92
				: Math.pow((val + 0.055) / 1.055, 2.4);
		});
		return 0.2126 * r + 0.7152 * g + 0.0722 * b;
	};

	const fgRgb = hexToRgb(foreground);
	const bgRgb = hexToRgb(background);

	const fgLum = getLuminance(fgRgb);
	const bgLum = getLuminance(bgRgb);

	const lighter = Math.max(fgLum, bgLum);
	const darker = Math.min(fgLum, bgLum);

	return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Determines the best contrast text color (black or white) for a given background
 * Returns '#000000' (black) or '#ffffff' (white) based on WCAG contrast ratios
 */
function getContrastText(background: string): string {
	const blackContrast = getContrastRatio('#000000', background);
	const whiteContrast = getContrastRatio('#ffffff', background);

	// Return the color with better contrast (higher ratio)
	return whiteContrast > blackContrast ? '#ffffff' : '#000000';
}

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
			if (
				typeof value === 'string' &&
				(value.startsWith('#') || value.startsWith('rgb'))
			) {
				return value;
			}
		}
		// Fall back to nested format for backward compatibility (color.primary.50)
		if (colorTokens[category]?.[shade]) {
			const value = extractValue(colorTokens[category][shade]);
			if (
				typeof value === 'string' &&
				(value.startsWith('#') || value.startsWith('rgb'))
			) {
				return value;
			}
		}

		// Development warning for missing tokens
		if (process.env.NODE_ENV === 'development') {
			console.warn(
				`Missing color token: ${category}-${shade}, falling back to #000000`
			);
		}
		return '#000000';
	};

	// Helper to check if a category exists (supports both flattened and nested formats)
	const hasCategory = (category: string): boolean => {
		// Check flattened format (category-50, category-100, etc.)
		if (
			colorTokens[`${category}-50`] ||
			colorTokens[`${category}-100`] ||
			colorTokens[`${category}-500`]
		) {
			return true;
		}
		// Check nested format
		if (colorTokens[category] && typeof colorTokens[category] === 'object') {
			return true;
		}
		return false;
	};

	const primaryMain = getColor('primary', '500');
	const secondaryMain = getColor('secondary', '500');

	return {
		primary: {
			main: primaryMain,
			light: getColor('primary', '300'),
			dark: getColor('primary', '700'),
			contrastText: getContrastText(primaryMain),
		},
		secondary: {
			main: secondaryMain,
			light: getColor('secondary', '300'),
			dark: getColor('secondary', '700'),
			contrastText: getContrastText(secondaryMain),
		},
		error: hasCategory('error')
			? (() => {
					const errorMain = getColor('error', '500');
					return {
						main: errorMain,
						light: getColor('error', '300'),
						dark: getColor('error', '700'),
						contrastText: getContrastText(errorMain),
					};
			  })()
			: undefined,
		warning: hasCategory('warning')
			? (() => {
					const warningMain = getColor('warning', '500');
					return {
						main: warningMain,
						light: getColor('warning', '300'),
						dark: getColor('warning', '700'),
						contrastText: getContrastText(warningMain),
					};
			  })()
			: undefined,
		info: hasCategory('info')
			? (() => {
					const infoMain = getColor('info', '500');
					return {
						main: infoMain,
						light: getColor('info', '300'),
						dark: getColor('info', '700'),
						contrastText: getContrastText(infoMain),
					};
			  })()
			: undefined,
		success: hasCategory('success')
			? (() => {
					const successMain = getColor('success', '500');
					return {
						main: successMain,
						light: getColor('success', '300'),
						dark: getColor('success', '700'),
						contrastText: getContrastText(successMain),
					};
			  })()
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
