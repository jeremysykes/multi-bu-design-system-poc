import { readFile, access } from 'fs/promises';
import { join } from 'path';
import type { TokenSchema } from './types';

/**
 * Check if a file exists
 */
async function fileExists(filePath: string): Promise<boolean> {
	try {
		await access(filePath);
		return true;
	} catch {
		return false;
	}
}

/**
 * Resolve a token reference like "{color.error-500}" to its actual value
 * @param reference - The reference string, e.g. "{color.error-500}"
 * @param tokenObject - The token object to resolve from
 * @param visited - Set to track visited references to prevent circular resolution
 * @returns The resolved value, or undefined if not found
 */
function resolveReference(reference: string, tokenObject: any, visited: Set<string> = new Set()): any {
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
			// If the value is a reference to itself (circular), return undefined
			if (typeof value === 'string' && value.startsWith('{')) {
				if (value === reference) {
					visited.delete(reference);
					return undefined; // Circular reference
				}
				// If it's a different reference, resolve it recursively
				const resolved = resolveReference(value, tokenObject, visited);
				visited.delete(reference);
				return resolved;
			}
			visited.delete(reference);
			return value;
		}
		// If not found, return undefined so we can fall back to core
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
					return undefined; // Circular reference
				}
				const resolved = resolveReference(value, tokenObject, visited);
				visited.delete(reference);
				return resolved;
			}
			visited.delete(reference);
			return value;
		}
	}

	// Handle true nested format: color.primary.500 (if tokens are actually nested)
	let current: any = tokenObject;
	for (const part of parts) {
		if (current && typeof current === 'object' && part in current) {
			current = current[part];
		} else {
			visited.delete(reference);
			return undefined;
		}
	}

	if (current && typeof current === 'object' && '$value' in current) {
		const value = current.$value;
		// If the value is another reference, resolve it recursively
		if (typeof value === 'string' && value.startsWith('{') && value !== reference) {
			const resolved = resolveReference(value, tokenObject, visited);
			visited.delete(reference);
			return resolved;
		}
		visited.delete(reference);
		return value;
	}

	visited.delete(reference);
	return undefined;
}

/**
 * Deep merge function to merge core tokens with BU tokens
 * BU tokens override core tokens, and references are resolved from the merged result
 * This ensures BU-specific colors are used when resolving references like {color.primary-500}
 * Handles circular references by resolving from core when BU tokens reference themselves
 */
function deepMerge(core: any, bu: any): any {
	// First pass: Merge BU tokens into core (without resolving references)
	// This allows BU overrides to take effect
	const merged = { ...core };
	for (const key in bu) {
		if (bu[key] && typeof bu[key] === 'object' && !Array.isArray(bu[key])) {
			if ('$value' in bu[key]) {
				// DTCG token object - check if it's a self-referential reference
				// If BU token references itself (e.g., neutral-50: {color.neutral-50}),
				// skip the override and keep the core value to avoid circular references
				const buValue = bu[key].$value;
				if (typeof buValue === 'string' && buValue.startsWith('{') && buValue.endsWith('}')) {
					const path = buValue.slice(1, -1);
					const parts = path.split('.');
					// Check if this is a flattened format reference like {color.neutral-50}
					if (parts.length === 2 && parts[0] === 'color' && parts[1].includes('-')) {
						const referencedKey = parts[1];
						// If the key being referenced is the same as the current key, it's circular
						// Skip this override and keep the core value
						if (referencedKey === key) {
							// Don't override - keep core value to avoid circular reference
							continue;
						}
					}
					// Check if this is a nested format reference that references itself
					if (parts.length === 3 && parts[0] === 'color') {
						const category = parts[1];
						const shade = parts[2];
						const flattenedKey = `${category}-${shade}`;
						if (flattenedKey === key) {
							// Don't override - keep core value to avoid circular reference
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
	// This ensures references like {color.primary-500} resolve to BU-specific colors
	// Pass core tokens as a fallback for circular references or unresolved references
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
			// Circular reference detected - try to resolve from core tokens
			const resolved = resolveReference(obj.$value, coreTokens, visited);
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
		const resolved = resolveReference(obj.$value, resolveFrom, visited);
		
		// If resolution failed or returned undefined, try resolving from core tokens
		if (resolved === undefined) {
			const coreResolved = resolveReference(obj.$value, coreTokens, visited);
			visited.delete(obj.$value);
			if (coreResolved !== undefined && coreResolved !== obj.$value) {
				return {
					...obj,
					$value: coreResolved
				};
			}
			// If still couldn't resolve, keep as-is
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
 * Loads tokens for a business unit (DTCG format)
 * 
 * For all tokens: Loads from tokens/{bu}/tokens.json in DTCG format
 * BU tokens are merged with core tokens so references like {color.error-500} can resolve
 * 
 * @param buId - Business unit identifier (e.g., 'core', 'bu-a', 'bu-b', 'bu-c', 'bu-d')
 * @returns Token data in DTCG format (merged with core if not 'core')
 */
export async function loadTokens(buId: string): Promise<TokenSchema> {
	if (buId === 'core') {
		const tokensPath = join(process.cwd(), 'tokens', 'core', 'tokens.json');
		const content = await readFile(tokensPath, 'utf-8');
		return JSON.parse(content) as TokenSchema;
	}

	// Load core tokens
	const coreTokensPath = join(process.cwd(), 'tokens', 'core', 'tokens.json');
	const coreContent = await readFile(coreTokensPath, 'utf-8');
	const coreTokens = JSON.parse(coreContent);

	// Load BU tokens
	const buTokensPath = join(process.cwd(), 'tokens', buId, 'tokens.json');
	
	if (!(await fileExists(buTokensPath))) {
		throw new Error(`Token file not found at tokens/${buId}/tokens.json`);
	}

	const buContent = await readFile(buTokensPath, 'utf-8');
	const buTokens = JSON.parse(buContent);
	
	// Merge BU tokens with core tokens (BU overrides, and references resolve from merged result)
	// This ensures BU-specific colors are used when resolving references like {color.primary-500}
	const merged = deepMerge(coreTokens, buTokens);
	return merged as TokenSchema;
}
