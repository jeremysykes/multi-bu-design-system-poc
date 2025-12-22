import type { SemanticTokens, BaseTokens } from '../types';
import type { Components, Theme } from '@mui/material/styles';

/**
 * Maps semantic tokens to MUI component overrides
 * Pure function - no side effects, stateless
 */
export function mapComponents(
	tokens: SemanticTokens,
	baseTokens: BaseTokens,
	_theme: Theme
): Components<Theme> {
	// Helper to resolve token references like "palette.primary.500" to actual color values
	const resolveToken = (tokenRef: string): string => {
		// Handle direct color values (hex codes)
		if (tokenRef.startsWith('#')) {
			return tokenRef;
		}

		// Handle rgba values
		if (tokenRef.startsWith('rgba')) {
			return tokenRef;
		}

		// Handle token references like "palette.primary.500"
		const parts = tokenRef.split('.');
		if (parts.length >= 3 && parts[0] === 'palette') {
			const category = parts[1];
			const shade = parts[2];
			const paletteCategory =
				baseTokens.palette[category as keyof typeof baseTokens.palette];
			if (paletteCategory && typeof paletteCategory === 'object') {
				const colorRamp = paletteCategory as Record<string, string>;
				if (colorRamp[shade]) {
					return colorRamp[shade];
				}
			}
		}

		// Fallback: return as-is (will be handled by theme)
		return tokenRef;
	};

	return {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: 'none',
				},
				containedPrimary: {
					backgroundColor: resolveToken(tokens.action.primary),
					color: _theme.palette.primary.contrastText,
				},
				containedSecondary: {
					backgroundColor: resolveToken(
						tokens.action.secondary || tokens.action.primary
					),
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
							borderColor: resolveToken(tokens.border.default),
						},
						'&:hover fieldset': {
							borderColor: resolveToken(tokens.border.default),
						},
						'&.Mui-focused fieldset': {
							borderColor: resolveToken(
								tokens.border.focus || tokens.action.primary
							),
						},
					},
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					backgroundColor: resolveToken(tokens.surface.default),
				},
			},
		},
		MuiAlert: {
			styleOverrides: {
				root: {
					backgroundColor: resolveToken(
						tokens.surface.elevated || tokens.surface.default
					),
				},
				standardError: {
					backgroundColor: tokens.feedback?.error
						? resolveToken(tokens.feedback.error)
						: undefined,
				},
				standardWarning: {
					backgroundColor: tokens.feedback?.warning
						? resolveToken(tokens.feedback.warning)
						: undefined,
				},
				standardInfo: {
					backgroundColor: tokens.feedback?.info
						? resolveToken(tokens.feedback.info)
						: undefined,
				},
				standardSuccess: {
					backgroundColor: tokens.feedback?.success
						? resolveToken(tokens.feedback.success)
						: undefined,
				},
			},
		},
	};
}
