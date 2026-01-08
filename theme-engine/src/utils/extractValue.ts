/**
 * Extract value from DTCG token format
 * 
 * DTCG tokens have the structure: { $value: <value>, $type: <type>, ... }
 * This helper extracts the $value, or returns the value as-is if it's not a DTCG token
 */

export function extractValue(token: any): any {
	// If it's a DTCG token object with $value property, extract it
	if (token && typeof token === 'object' && '$value' in token) {
		return token.$value;
	}
	// Otherwise, return as-is (for backward compatibility or non-DTCG values)
	return token;
}

/**
 * Extract value from nested DTCG structure
 * Handles cases where we might have nested objects that need value extraction
 */
export function extractValueDeep(obj: any): any {
	if (obj === null || obj === undefined) {
		return obj;
	}
	
	// If it's a DTCG token, extract value
	if (typeof obj === 'object' && '$value' in obj) {
		return extractValueDeep(obj.$value);
	}
	
	// If it's an array, map recursively
	if (Array.isArray(obj)) {
		return obj.map(extractValueDeep);
	}
	
	// If it's an object, recursively extract values
	if (typeof obj === 'object') {
		const result: any = {};
		for (const [key, value] of Object.entries(obj)) {
			result[key] = extractValueDeep(value);
		}
		return result;
	}
	
	// Primitive value, return as-is
	return obj;
}

