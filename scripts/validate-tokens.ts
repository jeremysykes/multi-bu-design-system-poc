#!/usr/bin/env tsx

/**
 * Token validation script
 *
 * Validates all token files against the schema by loading and merging tokens per BU
 */

import { validateTokens } from '../theme-engine/src/validators/validateTokens';
import { loadTokens } from '../theme-engine/src/loadTokens';
import { readdir } from 'fs/promises';
import { join } from 'path';

async function validateAllTokens() {
	const tokensDir = join(process.cwd(), 'tokens');
	const errors: Array<{ bu: string; errors: Array<{ path: string; message: string }> }> = [];

	// Get all BU directories (exclude 'figma' directory)
	const entries = await readdir(tokensDir, { withFileTypes: true });
	const buDirs = entries.filter((e) => e.isDirectory() && e.name !== 'figma');

	for (const buDir of buDirs) {
		const buId = buDir.name;

		try {
			// Load and merge tokens for this BU (this handles core + BU-specific merging)
			const mergedTokens = await loadTokens(buId);

			// Validate the merged token structure
			const result = validateTokens(mergedTokens);
			if (!result.valid) {
				errors.push({
					bu: buId,
					errors: result.errors,
				});
			}
		} catch (error) {
			errors.push({
				bu: buId,
				errors: [
					{
						path: 'load',
						message: error instanceof Error ? error.message : 'Failed to load tokens',
					},
				],
			});
		}
	}

	if (errors.length > 0) {
		console.error('❌ Token validation failed:\n');
		for (const { bu, errors: buErrors } of errors) {
			console.error(`  ${bu}:`);
			for (const error of buErrors) {
				console.error(`    - ${error.path}: ${error.message}`);
			}
		}
		process.exit(1);
	}

	console.log('✓ All tokens valid');
}

validateAllTokens().catch((error) => {
	console.error('Error validating tokens:', error);
	process.exit(1);
});
