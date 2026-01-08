import { extractValue } from '../utils/extractValue';

/**
 * Maps DTCG spacing tokens to MUI spacing function
 * 
 * Expected DTCG format:
 * {
 *   spacing: {
 *     "0": { $value: "0px", $type: "dimension" },
 *     "1": { $value: "4px", $type: "dimension" },
 *     ...
 *   }
 * }
 * 
 * Returns a function that MUI expects for spacing
 */
export function mapSpacing(spacingTokens: Record<string, any>): (factor: number) => string {
	// Convert spacing tokens to numeric values (extracting $value and removing 'px')
	const spacingValues = Object.entries(spacingTokens).reduce((acc, [key, token]) => {
		const value = extractValue(token);
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
