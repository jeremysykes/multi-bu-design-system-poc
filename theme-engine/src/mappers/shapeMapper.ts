import { extractValue } from '../utils/extractValue';

/**
 * Maps DTCG shape tokens to MUI shape
 * 
 * Expected DTCG format:
 * {
 *   shape: {
 *     borderRadius: {
 *       sm: { $value: "4px", $type: "dimension" },
 *       base: { $value: "8px", $type: "dimension" },
 *       ...
 *     },
 *     elevation: { ... }
 *   }
 * }
 */
export function mapShape(shapeTokens: any): { borderRadius: number } {
	// Extract borderRadius.base value (or use default)
	const borderRadiusToken = shapeTokens.borderRadius?.base;
	const borderRadiusValue = borderRadiusToken ? extractValue(borderRadiusToken) : '8px';
	
	// Parse border radius (convert "8px" to 8, or "0.5rem" to pixels)
	const parseBorderRadius = (value: string): number => {
		if (value.endsWith('px')) {
			return parseFloat(value);
		}
		if (value.endsWith('rem')) {
			return parseFloat(value) * 16; // Convert rem to px
		}
		return parseFloat(value) || 8;
	};

	return {
		borderRadius: parseBorderRadius(borderRadiusValue),
	};
}
