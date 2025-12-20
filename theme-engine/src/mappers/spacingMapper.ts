import type { SpacingTokens } from '../types';

/**
 * Maps token spacing to MUI spacing function
 * Pure function - no side effects, stateless
 * 
 * Returns a function that MUI expects for spacing
 */
export function mapSpacing(tokens: SpacingTokens): (factor: number) => string {
	// Convert spacing tokens to numeric values (removing 'px')
	const spacingValues = Object.entries(tokens).reduce((acc, [key, value]) => {
		const numValue = parseFloat(value);
		if (!isNaN(numValue)) {
			acc[parseInt(key, 10)] = numValue;
		}
		return acc;
	}, {} as Record<number, number>);

	// Default spacing unit (4px)
	const unit = spacingValues[1] || 4;

	return (factor: number): string => {
		return `${factor * unit}px`;
	};
}
