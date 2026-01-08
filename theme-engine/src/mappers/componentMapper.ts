import type { Components, Theme } from '@mui/material/styles';
import { extractValue } from '../utils/extractValue';

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
		let tokenRef = typeof tokenValue === 'object' ? extractValue(tokenValue) : tokenValue;
		
		// Handle direct color values (hex codes)
		if (typeof tokenRef === 'string' && tokenRef.startsWith('#')) {
			return tokenRef;
		}

		// Handle rgba values
		if (typeof tokenRef === 'string' && tokenRef.startsWith('rgba')) {
			return tokenRef;
		}

		// Handle DTCG token references like "{color.primary-500}" (flattened) or "{color.primary.500}" (legacy)
		if (typeof tokenRef === 'string' && tokenRef.startsWith('{') && tokenRef.endsWith('}')) {
			const path = tokenRef.slice(1, -1); // Remove { }
			const parts = path.split('.');
			
			// Check if this is a flattened format (color.primary-500)
			if (parts.length === 2 && parts[0] === 'color' && parts[1].includes('-')) {
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

	return {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: 'none',
				},
				containedPrimary: {
					backgroundColor: getSemanticValue('action', 'primary'),
					color: _theme.palette.primary.contrastText,
				},
				containedSecondary: {
					backgroundColor: getSemanticValue('action', 'secondary') || getSemanticValue('action', 'primary'),
					color: _theme.palette.secondary.contrastText,
				},
				containedError: {
					color: _theme.palette.error?.contrastText || '#ffffff',
				},
				containedWarning: {
					color: _theme.palette.warning?.contrastText || '#ffffff',
				},
				containedInfo: {
					color: _theme.palette.info?.contrastText || '#ffffff',
				},
				containedSuccess: {
					color: _theme.palette.success?.contrastText || '#ffffff',
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
							borderColor: getSemanticValue('border', 'focus') || getSemanticValue('action', 'primary'),
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
						backgroundColor: getSemanticValue('feedback', 'error') || getSemanticValue('action', 'primary'),
						// Use MUI's automatically calculated contrastText for accessibility
						color: _theme.palette.error?.contrastText || _theme.palette.error?.main || '#ffffff',
					},
					'&.MuiAlert-standardWarning': {
						backgroundColor: getSemanticValue('feedback', 'warning') || getSemanticValue('action', 'primary'),
						// Use MUI's automatically calculated contrastText for accessibility
						color: _theme.palette.warning?.contrastText || _theme.palette.warning?.main || '#ffffff',
					},
					'&.MuiAlert-standardInfo': {
						backgroundColor: getSemanticValue('feedback', 'info') || getSemanticValue('action', 'primary'),
						// Use MUI's automatically calculated contrastText for accessibility
						color: _theme.palette.info?.contrastText || _theme.palette.info?.main || '#ffffff',
					},
					'&.MuiAlert-standardSuccess': {
						backgroundColor: getSemanticValue('feedback', 'success') || getSemanticValue('action', 'primary'),
						// Use MUI's automatically calculated contrastText for accessibility
						color: _theme.palette.success?.contrastText || _theme.palette.success?.main || '#ffffff',
					},
				},
			},
		},
	};
}
