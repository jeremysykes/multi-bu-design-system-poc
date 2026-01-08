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
 * Loads tokens for a business unit (DTCG format)
 * 
 * For all tokens: Loads from tokens/{bu}/tokens.json in DTCG format
 * 
 * @param buId - Business unit identifier (e.g., 'core', 'bu-a', 'bu-b')
 * @returns Token data in DTCG format (TokenSchema)
 */
export async function loadTokens(buId: string): Promise<TokenSchema> {
	const tokensPath = join(process.cwd(), 'tokens', buId, 'tokens.json');
	
	if (!(await fileExists(tokensPath))) {
		throw new Error(`Token file not found at tokens/${buId}/tokens.json`);
	}

	const content = await readFile(tokensPath, 'utf-8');
	const tokens: unknown = JSON.parse(content);
	
	return tokens as TokenSchema;
}
