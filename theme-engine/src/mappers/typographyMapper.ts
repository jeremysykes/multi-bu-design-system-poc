import { extractValue } from '../utils/extractValue';

/**
 * Maps DTCG typography tokens to MUI typography
 * 
 * Expected DTCG format:
 * {
 *   typography: {
 *     fontFamily: { primary: { $value: "...", $type: "fontFamily" }, ... },
 *     fontSize: { base: { $value: "1rem", $type: "dimension" }, ... },
 *     fontWeight: { regular: { $value: 400, $type: "number" }, ... },
 *     lineHeight: { normal: { $value: 1.5, $type: "number" }, ... }
 *   }
 * }
 */
export function mapTypography(typographyTokens: any): {
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
	// Helper to extract value from nested token
	const getTokenValue = (group: string, key: string): any => {
		const token = typographyTokens[group]?.[key];
		return token ? extractValue(token) : undefined;
	};

	// Helper to parse base fontSize (MUI expects number in px)
	const parseBaseFontSize = (size: string): number => {
		if (size.endsWith('rem')) {
			const num = parseFloat(size);
			// Convert rem to px (assuming 16px base)
			return num * 16;
		}
		if (size.endsWith('px')) {
			return parseFloat(size);
		}
		// Fallback: try to parse as number
		return parseFloat(size) || 16;
	};

	const fontFamily = getTokenValue('fontFamily', 'primary') || 'Roboto, Arial, sans-serif';
	const baseFontSize = getTokenValue('fontSize', 'base') || '1rem';
	const fontSizeNumber = parseBaseFontSize(baseFontSize);

	const fontWeightLight = getTokenValue('fontWeight', 'light') || 300;
	const fontWeightRegular = getTokenValue('fontWeight', 'regular') || 400;
	const fontWeightMedium = getTokenValue('fontWeight', 'medium') || 500;
	const fontWeightBold = getTokenValue('fontWeight', 'bold') || 700;

	// Get fontSize tokens
	const fontSizeXs = getTokenValue('fontSize', 'xs') || '0.75rem';
	const fontSizeSm = getTokenValue('fontSize', 'sm') || '0.875rem';
	const fontSizeBase = getTokenValue('fontSize', 'base') || '1rem';
	const fontSizeLg = getTokenValue('fontSize', 'lg') || '1.125rem';
	const fontSizeXl = getTokenValue('fontSize', 'xl') || '1.25rem';
	const fontSize2xl = getTokenValue('fontSize', '2xl') || '1.5rem';
	const fontSize3xl = getTokenValue('fontSize', '3xl') || '1.875rem';
	const fontSize4xl = getTokenValue('fontSize', '4xl') || '2.25rem';

	// Get lineHeight tokens
	const lineHeightNormal = getTokenValue('lineHeight', 'normal');
	const lineHeightTight = getTokenValue('lineHeight', 'tight');
	const lineHeightRelaxed = getTokenValue('lineHeight', 'relaxed');

	const parseLineHeight = (lh: string | number | undefined, fallback: number): number => {
		if (lh === undefined) return fallback;
		if (typeof lh === 'number') return lh;
		const parsed = parseFloat(lh);
		return isNaN(parsed) ? fallback : parsed;
	};

	return {
		fontFamily,
		fontSize: fontSizeNumber,
		fontWeightLight,
		fontWeightRegular,
		fontWeightMedium,
		fontWeightBold,
		h1: {
			fontSize: fontSize4xl,
			fontWeight: fontWeightBold,
			lineHeight: parseLineHeight(lineHeightTight, 1.2),
			fontFamily,
		},
		h2: {
			fontSize: fontSize3xl,
			fontWeight: fontWeightBold,
			lineHeight: parseLineHeight(lineHeightTight, 1.3),
			fontFamily,
		},
		h3: {
			fontSize: fontSize2xl,
			fontWeight: fontWeightMedium,
			lineHeight: parseLineHeight(lineHeightNormal, 1.4),
			fontFamily,
		},
		h4: {
			fontSize: fontSizeXl,
			fontWeight: fontWeightMedium,
			lineHeight: parseLineHeight(lineHeightNormal, 1.4),
			fontFamily,
		},
		h5: {
			fontSize: fontSizeLg,
			fontWeight: fontWeightRegular,
			lineHeight: parseLineHeight(lineHeightNormal, 1.5),
			fontFamily,
		},
		h6: {
			fontSize: fontSizeBase,
			fontWeight: fontWeightMedium,
			lineHeight: parseLineHeight(lineHeightNormal, 1.5),
			fontFamily,
		},
		body1: {
			fontSize: fontSizeBase,
			fontWeight: fontWeightRegular,
			lineHeight: parseLineHeight(lineHeightNormal, 1.5),
			fontFamily,
		},
		body2: {
			fontSize: fontSizeSm,
			fontWeight: fontWeightRegular,
			lineHeight: parseLineHeight(lineHeightRelaxed, 1.6),
			fontFamily,
		},
		button: {
			fontSize: fontSizeBase,
			fontWeight: fontWeightMedium,
			lineHeight: 1.75,
			fontFamily,
			textTransform: 'none',
		},
	};
}
