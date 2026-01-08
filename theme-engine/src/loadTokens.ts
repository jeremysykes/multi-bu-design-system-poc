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
 * @returns The resolved value, or undefined if not found
 */
function resolveReference(reference: string, tokenObject: any): any {
	if (!reference.startsWith('{') || !reference.endsWith('}')) {
		return reference;
	}

	const path = reference.slice(1, -1); // Remove { }
	const parts = path.split('.');

	// Handle flattened format: color.error-500
	if (parts.length === 2 && parts[0] === 'color' && parts[1].includes('-')) {
		const colorKey = parts[1];
		const token = tokenObject.color?.[colorKey];
		if (token && typeof token === 'object' && '$value' in token) {
			const value = token.$value;
			// If the value is another reference, resolve it recursively (but only once)
			if (typeof value === 'string' && value.startsWith('{') && value !== reference) {
				return resolveReference(value, tokenObject);
			}
			return value;
		}
		// If not found, return undefined so we can fall back to core
		return undefined;
	}

	// Handle legacy nested format: color.primary.500
	let current: any = tokenObject;
	for (const part of parts) {
		if (current && typeof current === 'object' && part in current) {
			current = current[part];
		} else {
			return undefined;
		}
	}

	if (current && typeof current === 'object' && '$value' in current) {
		const value = current.$value;
		// If the value is another reference, resolve it recursively (but only once)
		if (typeof value === 'string' && value.startsWith('{') && value !== reference) {
			return resolveReference(value, tokenObject);
		}
		return value;
	}

	return undefined;
}

/**
 * Deep merge function to merge core tokens with BU tokens
 * BU tokens override core tokens, but references are resolved from core during merge
 */
function deepMerge(core: any, bu: any, resolveFrom: any = core): any {
	const result = { ...core };
	for (const key in bu) {
		if (bu[key] && typeof bu[key] === 'object' && !Array.isArray(bu[key]) && '$value' in bu[key]) {
			// DTCG token object - check if it's a reference
			const value = bu[key].$value;
			if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
				// It's a reference - try to resolve it from core tokens
				const resolved = resolveReference(value, resolveFrom);
				if (resolved !== undefined) {
					// Reference resolved - use the resolved value
					result[key] = {
						...bu[key],
						$value: resolved
					};
				} else {
					// Reference couldn't be resolved - keep the reference (might resolve later)
					result[key] = bu[key];
				}
			} else {
				// Not a reference - replace entirely
				result[key] = bu[key];
			}
		} else if (bu[key] && typeof bu[key] === 'object' && !Array.isArray(bu[key])) {
			// Nested object - merge recursively
			result[key] = deepMerge(core[key] || {}, bu[key], resolveFrom);
		} else {
			// Primitive or array - replace
			result[key] = bu[key];
		}
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
	
	// Merge BU tokens with core tokens (BU overrides, but references can resolve from merged tokens)
	const merged = deepMerge(coreTokens, buTokens);
	return merged as TokenSchema;
}
