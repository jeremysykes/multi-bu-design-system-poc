import { tokenSchema } from '../tokenSchema';
import type { TokenSchema } from '../types';

/**
 * Validates token data against the schema
 * @param tokens - Token data to validate
 * @returns Validation result with errors if any
 */
export function validateTokens(tokens: unknown): {
	valid: boolean;
	errors: Array<{ path: string; message: string }>;
} {
	const errors: Array<{ path: string; message: string }> = [];

	try {
		tokenSchema.parse(tokens);
		return { valid: true, errors: [] };
	} catch (error) {
		if (error instanceof Error && 'issues' in error) {
			const zodError = error as { issues: Array<{ path: (string | number)[]; message: string }> };
			errors.push(
				...zodError.issues.map((issue) => ({
					path: issue.path.join('.'),
					message: issue.message,
				}))
			);
		} else {
			errors.push({
				path: 'root',
				message: error instanceof Error ? error.message : 'Unknown validation error',
			});
		}
		return { valid: false, errors };
	}
}

/**
 * Loads and validates tokens from a file path
 * @param filePath - Path to token JSON file
 * @returns Validated token data or throws error
 */
export async function loadAndValidateTokens(filePath: string): Promise<TokenSchema> {
	const fs = await import('fs/promises');
	const content = await fs.readFile(filePath, 'utf-8');
	const tokens = JSON.parse(content);

	const result = validateTokens(tokens);
	if (!result.valid) {
		throw new Error(
			`Token validation failed for ${filePath}:\n${result.errors.map((e) => `  - ${e.path}: ${e.message}`).join('\n')}`
		);
	}

	return tokens as TokenSchema;
}
