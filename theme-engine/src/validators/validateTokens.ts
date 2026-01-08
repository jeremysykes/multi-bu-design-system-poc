import { dtcgTokenSchema } from '../tokenSchema';

/**
 * Validates tokens against the DTCG schema
 * @param tokens - Token data to validate
 * @returns Validation result with errors if any
 */
export function validateTokens(tokens: unknown): {
	valid: boolean;
	errors: Array<{ path: string; message: string }>;
} {
	const result = dtcgTokenSchema.safeParse(tokens);
	
	if (result.success) {
		return { valid: true, errors: [] };
	}

	const errors = result.error.errors.map((err) => ({
		path: err.path.join('.'),
		message: err.message,
	}));

	return { valid: false, errors };
}

/**
 * Loads and validates tokens from a file path
 * @param filePath - Path to token JSON file
 * @returns Validated token data or throws error
 */
export async function loadAndValidateTokens(filePath: string): Promise<any> {
	const fs = await import('fs/promises');
	const content = await fs.readFile(filePath, 'utf-8');
	const tokens = JSON.parse(content);

	const result = validateTokens(tokens);
	if (!result.valid) {
		throw new Error(
			`Token validation failed for ${filePath}:\n${result.errors.map((e) => `  - ${e.path}: ${e.message}`).join('\n')}`
		);
	}

	return tokens;
}
