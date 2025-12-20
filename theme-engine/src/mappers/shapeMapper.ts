import type { ShapeTokens } from '../types';

/**
 * Maps token shape to MUI shape
 * Pure function - no side effects, stateless
 */
export function mapShape(tokens: ShapeTokens): { borderRadius: number } {
	return {
		borderRadius: parseFloat(
			tokens.borderRadius.base || tokens.borderRadius.md || '8'
		),
	};
}
