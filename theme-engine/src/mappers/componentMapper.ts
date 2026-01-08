import type { Components, Theme } from '@mui/material/styles';
import { extractValue } from '../utils/extractValue';

/**
 * Calculates the contrast ratio between two colors using WCAG formula
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
 * Determines if a color is blue or purple (colors that should always have white text)
 */
function isBlueOrPurple(color: string): boolean {
	if (!color || typeof color !== 'string' || !color.startsWith('#')) {
		return false;
	}

	// Convert hex to RGB
	const hexToRgb = (hex: string): [number, number, number] | null => {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result
			? [
					parseInt(result[1], 16),
					parseInt(result[2], 16),
					parseInt(result[3], 16),
			  ]
			: null;
	};

	const rgb = hexToRgb(color);
	if (!rgb) return false;

	const [r, g, b] = rgb;

	// Check if color is blue or purple
	// Blue: low red, green varies, high blue
	// Purple: red and blue are high, green is lower
	// Navy blue (like BU A primary): low to medium red, low green, medium to high blue
	const isBlue = b > r && b > g && r < 200 && g < 200;
	const isPurple = r > 100 && b > 100 && g < Math.max(r, b) * 0.8;
	const isNavyBlue = r < 100 && g < 100 && b > 50 && b > r && b > g;

	return isBlue || isPurple || isNavyBlue;
}

/**
 * Determines the best contrast text color (black or white) for a given background
 * Returns '#000000' (black) or '#ffffff' (white) based on WCAG contrast ratios
 * Special handling: Blue and purple colors always get white text for better readability
 */
function getContrastText(background: string): string {
	// Ensure we have a valid hex color string
	if (
		!background ||
		typeof background !== 'string' ||
		!background.startsWith('#')
	) {
		// If not a valid hex color, return white as safe default
		if (process.env.NODE_ENV === 'development') {
			console.warn(
				`Invalid background color for contrast calculation: ${background}, defaulting to white text`
			);
		}
		return '#ffffff';
	}

	// Blue and purple colors should always have white text for better readability
	if (isBlueOrPurple(background)) {
		return '#ffffff';
	}

	const blackContrast = getContrastRatio('#000000', background);
	const whiteContrast = getContrastRatio('#ffffff', background);

	// Return the color with better contrast (higher ratio)
	return whiteContrast > blackContrast ? '#ffffff' : '#000000';
}

/**
 * Maps DTCG semantic tokens to MUI component overrides
 *
 * Expected DTCG format:
 * {
 *   semantic: {
 *     surface: { default: { $value: "{color.neutral.50}", $type: "color" }, ... },
 *     text: { primary: { $value: "{color.neutral.900}", $type: "color" }, ... },
 *     ...
 *   },
 *   color: { ... } // For resolving references
 * }
 */
export function mapComponents(
	semanticTokens: any,
	allTokens: any, // Full token object for resolving references
	_theme: Theme
): Components<Theme> {
	// Helper to resolve token references like "{color.primary.500}" to actual color values
	const resolveToken = (tokenValue: string): string => {
		// Extract value from DTCG token if it's an object
		let tokenRef =
			typeof tokenValue === 'object' ? extractValue(tokenValue) : tokenValue;

		// Handle direct color values (hex codes)
		if (typeof tokenRef === 'string' && tokenRef.startsWith('#')) {
			return tokenRef;
		}

		// Handle rgba values
		if (typeof tokenRef === 'string' && tokenRef.startsWith('rgba')) {
			return tokenRef;
		}

		// Handle DTCG token references like "{color.primary-500}" (flattened) or "{color.primary.500}" (legacy)
		if (
			typeof tokenRef === 'string' &&
			tokenRef.startsWith('{') &&
			tokenRef.endsWith('}')
		) {
			const path = tokenRef.slice(1, -1); // Remove { }
			const parts = path.split('.');

			// Check if this is a flattened format (color.primary-500)
			if (
				parts.length === 2 &&
				parts[0] === 'color' &&
				parts[1].includes('-')
			) {
				// Flattened format: color.primary-500
				const colorKey = parts[1];
				if (allTokens.color && allTokens.color[colorKey]) {
					return extractValue(allTokens.color[colorKey]);
				}
			}

			// Legacy nested format: color.primary.500
			// Navigate through token structure
			let value: any = allTokens;
			for (const part of parts) {
				if (value && typeof value === 'object' && part in value) {
					value = value[part];
				} else {
					// Reference not found, return as-is
					return tokenRef;
				}
			}

			// Extract value from DTCG token if needed
			return extractValue(value);
		}

		// Fallback: return as-is (will be handled by theme)
		return typeof tokenRef === 'string' ? tokenRef : String(tokenRef);
	};

	// Extract values from semantic tokens
	const getSemanticValue = (category: string, key: string): string => {
		const token = semanticTokens[category]?.[key];
		if (!token) return '#000000';
		const value = extractValue(token);
		return resolveToken(value);
	};

	// Get a darker shade for hover states
	// If the semantic token references a color like {color.primary-500}, return {color.primary-600}
	const getDarkerShadeForHover = (category: string, key: string): string => {
		const token = semanticTokens[category]?.[key];
		if (!token) return '#000000';

		let tokenRef = typeof token === 'object' ? extractValue(token) : token;

		// If it's a token reference like {color.primary-500}
		if (
			typeof tokenRef === 'string' &&
			tokenRef.startsWith('{') &&
			tokenRef.endsWith('}')
		) {
			const path = tokenRef.slice(1, -1);
			const parts = path.split('.');

			// Handle flattened format: color.primary-500
			if (
				parts.length === 2 &&
				parts[0] === 'color' &&
				parts[1].includes('-')
			) {
				const colorParts = parts[1].split('-');
				if (colorParts.length === 2) {
					const category = colorParts[0]; // primary, secondary, etc.
					const shade = parseInt(colorParts[1]); // 500, 600, etc.

					// Use next darker shade (600 instead of 500, or 700 if already 600)
					const darkerShade = shade >= 600 ? 700 : 600;
					const darkerKey = `${category}-${darkerShade}`;

					// Get the darker shade from tokens
					if (allTokens.color && allTokens.color[darkerKey]) {
						return extractValue(allTokens.color[darkerKey]);
					}
				}
			}
		}

		// Fallback: use theme palette dark value or manually darken the color
		const baseColor = getSemanticValue(category, key);
		return baseColor;
	};

	const primaryBg = getSemanticValue('action', 'primary');
	const secondaryBg = getSemanticValue('action', 'secondary') || primaryBg;
	const primaryHoverBg = getDarkerShadeForHover('action', 'primary');
	// If secondary doesn't exist, use primary hover; otherwise use secondary hover
	const secondaryHoverBg = semanticTokens.action?.secondary
		? getDarkerShadeForHover('action', 'secondary')
		: primaryHoverBg;

	return {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: 'none',
				},
				containedPrimary: {
					backgroundColor: primaryBg,
					// Calculate contrastText dynamically based on the actual background color
					color: getContrastText(primaryBg),
					// Hover state uses a darker shade of the same color
					'&:hover': {
						backgroundColor: primaryHoverBg,
						// Maintain same text color (white for blue/purple, calculated for others)
						color: getContrastText(primaryHoverBg),
					},
				},
				containedSecondary: {
					backgroundColor: secondaryBg,
					// Calculate contrastText dynamically based on the actual background color
					color: getContrastText(secondaryBg),
					// Hover state uses a darker shade of the same color
					'&:hover': {
						backgroundColor: secondaryHoverBg,
						// Maintain same text color (white for blue/purple, calculated for others)
						color: getContrastText(secondaryHoverBg),
					},
				},
				containedError: {
					color: _theme.palette.error?.contrastText || '#ffffff',
					'&:hover': {
						backgroundColor: _theme.palette.error?.dark,
						color: _theme.palette.error?.contrastText || '#ffffff',
					},
				},
				containedWarning: {
					color: _theme.palette.warning?.contrastText || '#ffffff',
					'&:hover': {
						backgroundColor: _theme.palette.warning?.dark,
						color: _theme.palette.warning?.contrastText || '#ffffff',
					},
				},
				containedInfo: {
					color: _theme.palette.info?.contrastText || '#ffffff',
					'&:hover': {
						backgroundColor: _theme.palette.info?.dark,
						color: _theme.palette.info?.contrastText || '#ffffff',
					},
				},
				containedSuccess: {
					color: _theme.palette.success?.contrastText || '#ffffff',
					'&:hover': {
						backgroundColor: _theme.palette.success?.dark,
						color: _theme.palette.success?.contrastText || '#ffffff',
					},
				},
			},
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					'& .MuiOutlinedInput-root': {
						'& fieldset': {
							borderColor: getSemanticValue('border', 'default'),
						},
						'&:hover fieldset': {
							borderColor: getSemanticValue('border', 'default'),
						},
						'&.Mui-focused fieldset': {
							borderColor:
								getSemanticValue('border', 'focus') ||
								getSemanticValue('action', 'primary'),
						},
					},
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					backgroundColor: getSemanticValue('surface', 'default'),
				},
			},
		},
		MuiAlert: {
			styleOverrides: {
				root: {
					'&.MuiAlert-standardError': {
						backgroundColor:
							getSemanticValue('feedback', 'error') ||
							getSemanticValue('action', 'primary'),
						// Use MUI's automatically calculated contrastText for accessibility
						color:
							_theme.palette.error?.contrastText ||
							_theme.palette.error?.main ||
							'#ffffff',
					},
					'&.MuiAlert-standardWarning': {
						backgroundColor:
							getSemanticValue('feedback', 'warning') ||
							getSemanticValue('action', 'primary'),
						// Use MUI's automatically calculated contrastText for accessibility
						color:
							_theme.palette.warning?.contrastText ||
							_theme.palette.warning?.main ||
							'#ffffff',
					},
					'&.MuiAlert-standardInfo': {
						backgroundColor:
							getSemanticValue('feedback', 'info') ||
							getSemanticValue('action', 'primary'),
						// Use MUI's automatically calculated contrastText for accessibility
						color:
							_theme.palette.info?.contrastText ||
							_theme.palette.info?.main ||
							'#ffffff',
					},
					'&.MuiAlert-standardSuccess': {
						backgroundColor:
							getSemanticValue('feedback', 'success') ||
							getSemanticValue('action', 'primary'),
						// Use MUI's automatically calculated contrastText for accessibility
						color:
							_theme.palette.success?.contrastText ||
							_theme.palette.success?.main ||
							'#ffffff',
					},
				},
			},
		},
	};
}
