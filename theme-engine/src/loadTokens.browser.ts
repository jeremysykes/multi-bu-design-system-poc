/**
 * Browser-compatible token loader
 * Uses static imports instead of fs/promises for browser compatibility
 */

import type { TokenSchema } from './types';

// Core tokens - DTCG format
import coreTokens from '../../tokens/core/tokens.json';

// BU-specific tokens - DTCG format
import buATokens from '../../tokens/bu-a/tokens.json';
import buBTokens from '../../tokens/bu-b/tokens.json';
import buCTokens from '../../tokens/bu-c/tokens.json';
import buDTokens from '../../tokens/bu-d/tokens.json';

/**
 * Resolve a token reference like "{color.error-500}" to its actual value
 * @param reference - The reference string, e.g. "{color.error-500}"
 * @param tokenObject - The token object to resolve from
 * @param visited - Set to track visited references to prevent circular resolution
 * @param coreTokens - Optional core tokens to use as fallback when resolution fails
 * @returns The resolved value, or undefined if not found
 */
function resolveReference(reference: string, tokenObject: any, visited: Set<string> = new Set(), coreTokens?: any): any {
	if (!reference.startsWith('{') || !reference.endsWith('}')) {
		return reference;
	}

	// Prevent infinite recursion
	if (visited.has(reference)) {
		return undefined;
	}
	visited.add(reference);

	const path = reference.slice(1, -1); // Remove { }
	const parts = path.split('.');

	// Handle flattened format: color.error-500
	if (parts.length === 2 && parts[0] === 'color' && parts[1].includes('-')) {
		const colorKey = parts[1];
		const token = tokenObject.color?.[colorKey];
		if (token && typeof token === 'object' && '$value' in token) {
			const value = token.$value;
			// If the value is a reference to itself (circular), try resolving from core tokens
			if (typeof value === 'string' && value.startsWith('{')) {
				// Check if this reference points to itself (circular)
				if (value === reference) {
					visited.delete(reference);
					// Circular reference detected - try resolving from core tokens if available
					if (coreTokens) {
						const coreResolved = resolveReference(reference, coreTokens, new Set());
						if (coreResolved !== undefined && coreResolved !== reference) {
							return coreResolved;
						}
					}
					return undefined;
				}
				// If it's a different reference, resolve it recursively
				const resolved = resolveReference(value, tokenObject, visited, coreTokens);
				visited.delete(reference);
				// If resolution failed, try core tokens
				if (resolved === undefined && coreTokens) {
					const coreResolved = resolveReference(value, coreTokens, new Set());
					if (coreResolved !== undefined && coreResolved !== value) {
						return coreResolved;
					}
				}
				return resolved;
			}
			visited.delete(reference);
			return value;
		}
		// If not found and core tokens are available, try resolving from core
		if (coreTokens) {
			const coreResolved = resolveReference(reference, coreTokens, new Set());
			if (coreResolved !== undefined && coreResolved !== reference) {
				visited.delete(reference);
				return coreResolved;
			}
		}
		visited.delete(reference);
		return undefined;
	}

	// Handle nested format: color.neutral.900 (converts to flattened: neutral-900)
	// Core tokens use nested format in semantic tokens but flattened format in color tokens
	// Check flattened format first since that's how tokens are stored
	if (parts.length === 3 && parts[0] === 'color') {
		const category = parts[1]; // e.g., "neutral", "error", "primary"
		const shade = parts[2]; // e.g., "900", "500"
		const flattenedKey = `${category}-${shade}`;
		const flattenedToken = tokenObject.color?.[flattenedKey];
		if (flattenedToken && typeof flattenedToken === 'object' && '$value' in flattenedToken) {
			const value = flattenedToken.$value;
			// If the value is a reference, check if it's circular (references itself)
			if (typeof value === 'string' && value.startsWith('{')) {
				if (value === reference) {
					visited.delete(reference);
					// Circular reference detected - try resolving from core tokens if available
					if (coreTokens) {
						const coreResolved = resolveReference(reference, coreTokens, new Set());
						if (coreResolved !== undefined && coreResolved !== reference) {
							return coreResolved;
						}
					}
					return undefined;
				}
				const resolved = resolveReference(value, tokenObject, visited, coreTokens);
				visited.delete(reference);
				// If resolution failed, try core tokens
				if (resolved === undefined && coreTokens) {
					const coreResolved = resolveReference(value, coreTokens, new Set());
					if (coreResolved !== undefined && coreResolved !== value) {
						return coreResolved;
					}
				}
				return resolved;
			}
			visited.delete(reference);
			return value;
		}
		// If not found and core tokens are available, try resolving from core
		if (coreTokens) {
			const coreResolved = resolveReference(reference, coreTokens, new Set());
			if (coreResolved !== undefined && coreResolved !== reference) {
				visited.delete(reference);
				return coreResolved;
			}
		}
	}

	// Handle true nested format: color.primary.500 (if tokens are actually nested)
	let current: any = tokenObject;
	for (const part of parts) {
		if (current && typeof current === 'object' && part in current) {
			current = current[part];
		} else {
			visited.delete(reference);
			// If not found and core tokens are available, try resolving from core
			if (coreTokens) {
				const coreResolved = resolveReference(reference, coreTokens, new Set());
				if (coreResolved !== undefined && coreResolved !== reference) {
					return coreResolved;
				}
			}
			return undefined;
		}
	}

	if (current && typeof current === 'object' && '$value' in current) {
		const value = current.$value;
		// If the value is another reference, resolve it recursively
		if (typeof value === 'string' && value.startsWith('{') && value !== reference) {
			const resolved = resolveReference(value, tokenObject, visited, coreTokens);
			visited.delete(reference);
			// If resolution failed, try core tokens
			if (resolved === undefined && coreTokens) {
				const coreResolved = resolveReference(value, coreTokens, new Set());
				if (coreResolved !== undefined && coreResolved !== value) {
					return coreResolved;
				}
			}
			return resolved;
		}
		visited.delete(reference);
		return value;
	}

	visited.delete(reference);
	// Final fallback to core tokens if available
	if (coreTokens) {
		const coreResolved = resolveReference(reference, coreTokens, new Set());
		if (coreResolved !== undefined && coreResolved !== reference) {
			return coreResolved;
		}
	}
	return undefined;
}

/**
 * Deep merge function to merge core tokens with BU tokens
 * BU tokens override core tokens, and references are resolved from the merged result
 * This ensures BU-specific colors are used when resolving references like {color.primary-500}
 * Handles circular references by using core tokens as fallback when BU tokens reference themselves
 */
function deepMerge(core: any, bu: any): any {
	// First pass: Merge BU tokens into core (both may have unresolved references)
	// Don't pre-resolve core tokens - merge first, then resolve all references after merging
	// This ensures BU semantic tokens (references) override core semantic tokens, and all references
	// resolve from the merged object (which has BU-specific colors), not pre-resolved core colors
	const merged = { ...core };
	for (const key in bu) {
		if (bu[key] && typeof bu[key] === 'object' && !Array.isArray(bu[key])) {
			if ('$value' in bu[key]) {
				// DTCG token object - check if it's a self-referential reference
				// If BU token references itself (e.g., neutral-50: {color.neutral-50}),
				// skip the override to avoid circular references (will be handled during resolution)
				const buValue = bu[key].$value;
				if (typeof buValue === 'string' && buValue.startsWith('{') && buValue.endsWith('}')) {
					const path = buValue.slice(1, -1);
					const parts = path.split('.');
					// Check if this is a flattened format reference like {color.neutral-50}
					if (parts.length === 2 && parts[0] === 'color' && parts[1].includes('-')) {
						const referencedKey = parts[1];
						// If the key being referenced is the same as the current key, it's circular
						// Skip the override - keep core value (will resolve to core during resolution)
						if (referencedKey === key) {
							// Keep core value - don't override with circular reference
							continue;
						}
					}
					// Check if this is a nested format reference that references itself
					if (parts.length === 3 && parts[0] === 'color') {
						const category = parts[1];
						const shade = parts[2];
						const flattenedKey = `${category}-${shade}`;
						if (flattenedKey === key) {
							// Keep core value - don't override with circular reference
							continue;
						}
					}
				}
				// Not a self-reference, override with BU token
				merged[key] = bu[key];
			} else {
				// Nested object - merge recursively
				merged[key] = deepMerge(core[key] || {}, bu[key]);
			}
		} else {
			// Primitive or array - replace
			merged[key] = bu[key];
		}
	}

	// Second pass: Resolve all references from the merged result
	// This ensures references like {color.primary-500} resolve to BU-specific colors from merged.color.primary-500
	// Pass original (unresolved) core tokens as fallback for circular references or truly missing tokens only
	return resolveAllReferences(merged, merged, core);
}

/**
 * Recursively resolves all token references in the merged token object
 * @param obj - The token object to resolve references in
 * @param resolveFrom - The token object to resolve references from (should be the merged result)
 * @param coreTokens - The original core tokens to use as fallback for circular references
 * @param visited - Set to track visited references to prevent circular resolution
 */
function resolveAllReferences(obj: any, resolveFrom: any, coreTokens: any, visited: Set<string> = new Set()): any {
	if (!obj || typeof obj !== 'object') {
		return obj;
	}

	// If this is a DTCG token object with a reference value
	if ('$value' in obj && typeof obj.$value === 'string' && obj.$value.startsWith('{') && obj.$value.endsWith('}')) {
		// Prevent circular references by checking if we've seen this reference before
		if (visited.has(obj.$value)) {
			// Circular reference detected - try to resolve from core tokens (unresolved core as fallback)
			// This handles cases like BU D's neutral-50: {color.neutral-50} which should resolve to core's neutral-50
			const resolved = resolveReference(obj.$value, coreTokens, new Set());
			if (resolved !== undefined && resolved !== obj.$value) {
				return {
					...obj,
					$value: resolved
				};
			}
			// If still couldn't resolve, keep as-is to avoid infinite loop
			return obj;
		}
		
		visited.add(obj.$value);
		// Resolve from merged object first (which has BU-specific colors)
		// Only pass coreTokens for fallback, but don't use it unless absolutely necessary
		const resolved = resolveReference(obj.$value, resolveFrom, visited, coreTokens);
		
		// If resolution failed or returned undefined, only try core tokens if this might be a circular reference
		// or if the token doesn't exist in the merged object. Don't fall back to core for normal resolution failures.
		if (resolved === undefined) {
			// Check if this might be a circular reference or missing token by checking if visited set indicates circularity
			// Only use core tokens as fallback for circular references detected during resolution
			// For normal resolution failures, keep as-is rather than falling back to core (which might have different colors)
			visited.delete(obj.$value);
			// Keep as-is - don't fall back to core tokens unless it's a circular reference
			// Circular references are already handled above with visited.has check
			return obj;
		}
		
		visited.delete(obj.$value);
		if (resolved !== obj.$value) {
			return {
				...obj,
				$value: resolved
			};
		}
		// If reference resolved to itself, keep as-is
		return obj;
	}

	// Recursively process nested objects
	if (Array.isArray(obj)) {
		return obj.map(item => resolveAllReferences(item, resolveFrom, coreTokens, visited));
	}

	const result: any = {};
	for (const key in obj) {
		result[key] = resolveAllReferences(obj[key], resolveFrom, coreTokens, visited);
	}
	return result;
}

/**
 * Token registry for BU-specific tokens
 * This registry pattern makes it easy to add new BUs without modifying the loadTokens function
 */
const tokenRegistry: Record<string, TokenSchema> = {
	'core': coreTokens as TokenSchema,
	'bu-a': buATokens as TokenSchema,
	'bu-b': buBTokens as TokenSchema,
	'bu-c': buCTokens as TokenSchema,
	'bu-d': buDTokens as TokenSchema,
};

/**
 * Loads tokens for a business unit (browser-compatible)
 * 
 * All BUs use DTCG format tokens.json files
 * BU tokens are merged with core tokens so references like {color.error-500} can resolve
 * 
 * Note: This function is intentionally async for future dynamic loading support.
 * Currently returns statically imported tokens, but the async API enables
 * potential future features like lazy loading, network fetching, or dynamic token updates.
 *
 * @param buId - Business unit identifier (e.g., 'core', 'bu-a', 'bu-b', 'bu-c', 'bu-d')
 * @returns Token data in DTCG format (merged with core if not 'core')
 */
export async function loadTokens(buId: string): Promise<TokenSchema> {
	const tokens = tokenRegistry[buId];
	if (!tokens) {
		throw new Error(`Unknown business unit: ${buId}`);
	}

	// Core tokens don't need merging
	if (buId === 'core') {
		return tokens;
	}

	// Merge BU tokens with core tokens (BU overrides, and references resolve from merged result)
	// This ensures BU-specific colors are used when resolving references like {color.primary-500}
	const merged = deepMerge(coreTokens, tokens);
	return merged as TokenSchema;
}
