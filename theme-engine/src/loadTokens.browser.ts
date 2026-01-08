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

/**
 * Loads tokens for a business unit (browser-compatible)
 * 
 * All BUs use DTCG format tokens.json files
 *
 * @param buId - Business unit identifier (e.g., 'core', 'bu-a', 'bu-b', 'bu-c')
 * @returns Token data in DTCG format
 */
export async function loadTokens(buId: string): Promise<TokenSchema> {
	if (buId === 'core') {
		return coreTokens as TokenSchema;
	}

	if (buId === 'bu-a') {
		return buATokens as TokenSchema;
	}

	if (buId === 'bu-b') {
		return buBTokens as TokenSchema;
	}

	if (buId === 'bu-c') {
		return buCTokens as TokenSchema;
	}

	throw new Error(`Unknown business unit: ${buId}`);
}
