#!/usr/bin/env tsx

/**
 * Bi-directional Figma ↔ Tokens Pipeline
 *
 * Simple 1:1 synchronization between Figma and the project.
 * - Export: Read tokens/{bu}/tokens.json → Write tokens/figma/{bu}.json (DTCG format, 1:1)
 * - Import: Read tokens/figma/{bu}.json → Write tokens/{bu}/tokens.json (DTCG format, 1:1)
 *
 * The tokens.json file uses DTCG (Design Tokens Community Group) format - the standard format
 * that Figma expects. This enables seamless editing in Figma and direct use in the project.
 */

import { readFile, writeFile, mkdir, access } from 'fs/promises';
import { join, dirname } from 'path';
import type { TokenSchema } from '../theme-engine/src/types';

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
 * Write JSON file with proper formatting
 * Ensures parent directory exists and writes with 2-space indentation and trailing newline
 */
async function writeJsonFile(filePath: string, data: unknown): Promise<void> {
	const dir = dirname(filePath);
	await mkdir(dir, { recursive: true });
	const content = JSON.stringify(data, null, 2) + '\n';
	await writeFile(filePath, content, 'utf-8');
}

/**
 * Load tokens from tokens/{bu}/tokens.json
 * Returns TokenSchema format (ready to use by theme engine)
 */
async function loadBuTokens(build: 'bu-a' | 'bu-b'): Promise<TokenSchema> {
	const filePath = join(process.cwd(), 'tokens', build, 'tokens.json');

	if (!(await fileExists(filePath))) {
		throw new Error(`Token file not found at tokens/${build}/tokens.json`);
	}

	const content = await readFile(filePath, 'utf-8');
	const parsed: unknown = JSON.parse(content);

	// Basic validation - should be an object
	if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
		throw new Error(`Invalid JSON structure: expected object, got ${typeof parsed}`);
	}

	return parsed as TokenSchema;
}

/**
 * Write tokens to tokens/{bu}/tokens.json
 * Writes TokenSchema format (1:1 mapping from Figma)
 */
async function writeBuTokens(build: 'bu-a' | 'bu-b', tokens: TokenSchema): Promise<void> {
	const filePath = join(process.cwd(), 'tokens', build, 'tokens.json');
	await writeJsonFile(filePath, tokens);
}

/**
 * Load tokens from tokens/figma/{bu}.json
 * Returns TokenSchema format (same format as project uses)
 */
async function loadFigmaTokens(build: 'bu-a' | 'bu-b'): Promise<TokenSchema> {
	const filePath = join(process.cwd(), 'tokens', 'figma', `${build}.json`);

	if (!(await fileExists(filePath))) {
		throw new Error(`Figma token file not found at tokens/figma/${build}.json`);
	}

	const content = await readFile(filePath, 'utf-8');
	const parsed: unknown = JSON.parse(content);

	// Basic validation - should be an object
	if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
		throw new Error(`Invalid JSON structure: expected object, got ${typeof parsed}`);
	}

	return parsed as TokenSchema;
}

/**
 * Write tokens to tokens/figma/{bu}.json
 * Writes TokenSchema format (1:1 mapping to project)
 */
async function writeFigmaTokens(build: 'bu-a' | 'bu-b', tokens: TokenSchema): Promise<void> {
	const filePath = join(process.cwd(), 'tokens', 'figma', `${build}.json`);
	await writeJsonFile(filePath, tokens);
}

/**
 * Main function
 */
async function main() {
	const direction = process.argv[2];
	const buildArg = process.argv[3];

	if (direction !== 'import' && direction !== 'export') {
		console.error('Usage: npm run figma:import -- <bu-a|bu-b> or npm run figma:export -- <bu-a|bu-b>');
		console.error('  export: Read tokens/{bu}/tokens.json → Write tokens/figma/{bu}.json');
		console.error('  import: Read tokens/figma/{bu}.json → Write tokens/{bu}/tokens.json');
		console.error('');
		console.error('Format: TokenSchema (same format used by theme engine)');
		console.error('Purpose: 1:1 synchronization - edit in Figma, use directly in project');
		process.exit(1);
	}

	if (buildArg !== 'bu-a' && buildArg !== 'bu-b') {
		console.error('Build must be "bu-a" or "bu-b"');
		process.exit(1);
	}

	const build = buildArg as 'bu-a' | 'bu-b';

	try {
		if (direction === 'export') {
			const tokens = await loadBuTokens(build);
			await writeFigmaTokens(build, tokens);
			console.log(`✓ Exported ${build} tokens to tokens/figma/${build}.json`);
			console.log(`  → Copy this file into Figma, edit, export, then run: npm run figma:import -- ${build}`);
		} else {
			const tokens = await loadFigmaTokens(build);
			await writeBuTokens(build, tokens);
			console.log(`✓ Imported ${build} tokens from tokens/figma/${build}.json`);
			console.log(`  → Tokens are now in tokens/${build}/tokens.json (ready to use)`);
		}
	} catch (error) {
		console.error('Error:', error instanceof Error ? error.message : String(error));
		process.exit(1);
	}
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
