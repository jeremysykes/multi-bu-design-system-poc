#!/usr/bin/env tsx

/**
 * Generate tokens.json files from existing multi-file structure
 * 
 * This script creates tokens/{bu}/tokens.json files in TokenSchema format
 * by merging core tokens with BU-specific tokens.
 * 
 * Usage: pnpm generate:tokens-json <bu-a|bu-b|bu-c>
 * 
 * This is a one-time migration script to convert from the legacy multi-file
 * structure to the new single-file structure for Figma integration.
 */

import { readFile, writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import type { TokenSchema } from '../theme-engine/src/types';

async function writeJsonFile(filePath: string, data: unknown): Promise<void> {
	const dir = dirname(filePath);
	await mkdir(dir, { recursive: true });
	const content = JSON.stringify(data, null, 2) + '\n';
	await writeFile(filePath, content, 'utf-8');
}

async function generateTokensJson(buId: 'bu-a' | 'bu-b' | 'bu-c'): Promise<void> {
	// Load core tokens
	const corePath = join(process.cwd(), 'tokens', 'core');
	const corePalette = JSON.parse(await readFile(join(corePath, 'palette.json'), 'utf-8'));
	const coreTypography = JSON.parse(await readFile(join(corePath, 'typography.json'), 'utf-8'));
	const coreSpacing = JSON.parse(await readFile(join(corePath, 'spacing.json'), 'utf-8'));
	const coreShape = JSON.parse(await readFile(join(corePath, 'shape.json'), 'utf-8'));
	const coreSemantic = JSON.parse(await readFile(join(corePath, 'semantic.json'), 'utf-8'));

	// Load BU-specific tokens
	const buPath = join(process.cwd(), 'tokens', buId);
	const buPalette = JSON.parse(await readFile(join(buPath, 'palette.json'), 'utf-8'));
	const buTypography = JSON.parse(await readFile(join(buPath, 'typography.json'), 'utf-8'));
	const buSemantic = JSON.parse(await readFile(join(buPath, 'semantic.json'), 'utf-8'));

	// Merge: BU tokens override/extend core tokens
	// Using DTCG format (not legacy base.palette format)
	const mergedTokens: TokenSchema = {
		color: { ...corePalette, ...buPalette },
		typography: { ...coreTypography, ...buTypography },
		spacing: coreSpacing, // Spacing typically doesn't vary by BU
		shape: coreShape, // Shape typically doesn't vary by BU
		semantic: { ...coreSemantic, ...buSemantic },
	};

	// Write to tokens/{bu}/tokens.json
	const outputPath = join(process.cwd(), 'tokens', buId, 'tokens.json');
	await writeJsonFile(outputPath, mergedTokens);
	console.log(`✓ Generated tokens/${buId}/tokens.json`);
	console.log(`  → This file can now be exported to Figma using: pnpm figma:export:${buId}`);
}

async function main() {
	const buIdArg = process.argv[2];

	if (buIdArg !== 'bu-a' && buIdArg !== 'bu-b' && buIdArg !== 'bu-c') {
		console.error('Usage: pnpm generate:tokens-json <bu-a|bu-b|bu-c>');
		console.error('');
		console.error('This script generates tokens/{bu}/tokens.json from the existing multi-file structure.');
		console.error('After generation, you can export to Figma using: pnpm figma:export:{bu}');
		process.exit(1);
	}

	try {
		await generateTokensJson(buIdArg as 'bu-a' | 'bu-b' | 'bu-c');
	} catch (error) {
		console.error('Error:', error instanceof Error ? error.message : String(error));
		process.exit(1);
	}
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});

