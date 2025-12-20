import type { TypographyTokens } from '../types';

/**
 * Maps token typography to MUI typography
 * Pure function - no side effects, stateless
 */
export function mapTypography(tokens: TypographyTokens): {
	fontFamily?: string;
	fontSize?: number;
	fontWeightLight?: number;
	fontWeightRegular?: number;
	fontWeightMedium?: number;
	fontWeightBold?: number;
	h1?: any;
	h2?: any;
	h3?: any;
	h4?: any;
	h5?: any;
	h6?: any;
	body1?: any;
	body2?: any;
	button?: any;
} {
	return {
		fontFamily: tokens.fontFamily.primary,
		fontSize: parseFloat(tokens.fontSize.base),
		fontWeightLight: tokens.fontWeight.light || 300,
		fontWeightRegular: tokens.fontWeight.regular,
		fontWeightMedium: tokens.fontWeight.medium || 500,
		fontWeightBold: tokens.fontWeight.bold,
		h1: {
			fontSize: tokens.fontSize['5xl'] || tokens.fontSize['4xl'],
			fontWeight: tokens.fontWeight.bold,
			lineHeight:
				typeof tokens.lineHeight.loose === 'number'
					? tokens.lineHeight.loose
					: parseFloat(tokens.lineHeight.loose),
		},
		h2: {
			fontSize: tokens.fontSize['4xl'] || tokens.fontSize['3xl'],
			fontWeight: tokens.fontWeight.bold,
			lineHeight:
				typeof tokens.lineHeight.loose === 'number'
					? tokens.lineHeight.loose
					: parseFloat(tokens.lineHeight.loose),
		},
		h3: {
			fontSize: tokens.fontSize['3xl'] || tokens.fontSize['2xl'],
			fontWeight: tokens.fontWeight.semibold || tokens.fontWeight.bold,
			lineHeight:
				typeof tokens.lineHeight.normal === 'number'
					? tokens.lineHeight.normal
					: parseFloat(tokens.lineHeight.normal),
		},
		h4: {
			fontSize: tokens.fontSize['2xl'] || tokens.fontSize.xl,
			fontWeight:
				tokens.fontWeight.semibold ||
				tokens.fontWeight.medium ||
				tokens.fontWeight.regular,
			lineHeight:
				typeof tokens.lineHeight.normal === 'number'
					? tokens.lineHeight.normal
					: parseFloat(tokens.lineHeight.normal),
		},
		h5: {
			fontSize: tokens.fontSize.xl || tokens.fontSize.lg,
			fontWeight: tokens.fontWeight.medium || tokens.fontWeight.regular,
			lineHeight:
				typeof tokens.lineHeight.normal === 'number'
					? tokens.lineHeight.normal
					: parseFloat(tokens.lineHeight.normal),
		},
		h6: {
			fontSize: tokens.fontSize.lg || tokens.fontSize.base,
			fontWeight: tokens.fontWeight.medium || tokens.fontWeight.regular,
			lineHeight:
				typeof tokens.lineHeight.normal === 'number'
					? tokens.lineHeight.normal
					: parseFloat(tokens.lineHeight.normal),
		},
		body1: {
			fontSize: tokens.fontSize.base,
			fontWeight: tokens.fontWeight.regular,
			lineHeight:
				typeof tokens.lineHeight.normal === 'number'
					? tokens.lineHeight.normal
					: parseFloat(tokens.lineHeight.normal),
		},
		body2: {
			fontSize: tokens.fontSize.sm,
			fontWeight: tokens.fontWeight.regular,
			lineHeight:
				typeof tokens.lineHeight.normal === 'number'
					? tokens.lineHeight.normal
					: parseFloat(tokens.lineHeight.normal),
		},
		button: {
			fontWeight: tokens.fontWeight.medium || tokens.fontWeight.regular,
		},
	};
}
