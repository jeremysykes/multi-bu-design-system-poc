import { readFile } from 'fs/promises';
import { join } from 'path';
import type { TokenSchema } from './types';

/**
 * Loads and merges tokens for a business unit
 * Core tokens are loaded first, then BU-specific tokens override/extend them
 * 
 * @param buId - Business unit identifier (e.g., 'core', 'bu-a', 'bu-b')
 * @returns Merged token data
 */
export async function loadTokens(buId: string): Promise<TokenSchema> {
	// Load core tokens first
	const corePath = join(process.cwd(), 'tokens', 'core');
	const corePalette = JSON.parse(await readFile(join(corePath, 'palette.json'), 'utf-8'));
	const coreTypography = JSON.parse(await readFile(join(corePath, 'typography.json'), 'utf-8'));
	const coreSpacing = JSON.parse(await readFile(join(corePath, 'spacing.json'), 'utf-8'));
	const coreShape = JSON.parse(await readFile(join(corePath, 'shape.json'), 'utf-8'));
	const coreSemantic = JSON.parse(await readFile(join(corePath, 'semantic.json'), 'utf-8'));

	// If loading core, return as-is
	if (buId === 'core') {
		return {
			base: {
				palette: corePalette,
				typography: coreTypography,
				spacing: coreSpacing,
				shape: coreShape,
			},
			semantic: coreSemantic,
		};
	}

	// Load BU-specific tokens and merge with core
	const buPath = join(process.cwd(), 'tokens', buId);
	const buPalette = JSON.parse(await readFile(join(buPath, 'palette.json'), 'utf-8'));
	const buTypography = JSON.parse(await readFile(join(buPath, 'typography.json'), 'utf-8'));
	const buSemantic = JSON.parse(await readFile(join(buPath, 'semantic.json'), 'utf-8'));

	// Merge: BU tokens override/extend core tokens
	return {
		base: {
			palette: { ...corePalette, ...buPalette },
			typography: { ...coreTypography, ...buTypography },
			spacing: coreSpacing, // Spacing typically doesn't vary by BU
			shape: coreShape, // Shape typically doesn't vary by BU
		},
		semantic: { ...coreSemantic, ...buSemantic },
	};
}
