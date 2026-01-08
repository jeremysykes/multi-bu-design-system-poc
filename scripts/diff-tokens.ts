#!/usr/bin/env tsx

/**
 * Token diff script
 *
 * Compares two token files or directories and outputs a human-readable report
 * showing added, removed, and changed tokens.
 */

import { readFile, stat } from 'fs/promises';
import { join, resolve } from 'path';

interface TokenDiff {
	added: Array<{ path: string; value: any }>;
	removed: Array<{ path: string; value: any }>;
	changed: Array<{ path: string; oldValue: any; newValue: any }>;
}

/**
 * Flatten a nested object into dot-notation paths
 */
function flattenObject(obj: any, prefix = ''): Record<string, any> {
	const result: Record<string, any> = {};

	for (const [key, value] of Object.entries(obj)) {
		const path = prefix ? `${prefix}.${key}` : key;

		if (value && typeof value === 'object' && !Array.isArray(value)) {
			// Skip DTCG token objects ($value, $type, $description)
			if ('$value' in value) {
				result[path] = value;
			} else {
				Object.assign(result, flattenObject(value, path));
			}
		} else {
			result[path] = value;
		}
	}

	return result;
}

/**
 * Load tokens from a file or directory
 */
async function loadTokens(input: string): Promise<any> {
	const fullPath = resolve(process.cwd(), input);
	const stats = await stat(fullPath);

	if (stats.isDirectory()) {
		// Try to load tokens.json from directory
		const tokensPath = join(fullPath, 'tokens.json');
		try {
			const content = await readFile(tokensPath, 'utf-8');
			return JSON.parse(content);
		} catch {
			throw new Error(`No tokens.json found in directory: ${input}`);
		}
	} else {
		const content = await readFile(fullPath, 'utf-8');
		return JSON.parse(content);
	}
}

/**
 * Compare two token objects
 */
function diffTokens(oldTokens: any, newTokens: any): TokenDiff {
	const oldFlat = flattenObject(oldTokens);
	const newFlat = flattenObject(newTokens);

	const added: Array<{ path: string; value: any }> = [];
	const removed: Array<{ path: string; value: any }> = [];
	const changed: Array<{ path: string; oldValue: any; newValue: any }> = [];

	// Find added and changed tokens
	for (const [path, newValue] of Object.entries(newFlat)) {
		if (!(path in oldFlat)) {
			added.push({ path, value: newValue });
		} else {
			const oldValue = oldFlat[path];
			// Compare values (for DTCG tokens, compare $value)
			const oldVal = oldValue && typeof oldValue === 'object' && '$value' in oldValue ? oldValue.$value : oldValue;
			const newVal = newValue && typeof newValue === 'object' && '$value' in newValue ? newValue.$value : newValue;

			if (JSON.stringify(oldVal) !== JSON.stringify(newVal)) {
				changed.push({ path, oldValue: oldVal, newValue: newVal });
			}
		}
	}

	// Find removed tokens
	for (const [path, oldValue] of Object.entries(oldFlat)) {
		if (!(path in newFlat)) {
			removed.push({ path, value: oldValue });
		}
	}

	return { added, removed, changed };
}

/**
 * Format value for display
 */
function formatValue(value: any): string {
	if (value && typeof value === 'object' && '$value' in value) {
		return formatValue(value.$value);
	}
	if (typeof value === 'string') {
		return `"${value}"`;
	}
	return JSON.stringify(value);
}

/**
 * Generate markdown report
 */
function generateReport(diff: TokenDiff, oldName: string, newName: string): string {
	const lines: string[] = [];

	lines.push(`# Token Diff Report`);
	lines.push(``);
	lines.push(`**Comparing:** ${oldName} → ${newName}`);
	lines.push(``);
	lines.push(`---`);
	lines.push(``);

	if (diff.added.length > 0) {
		lines.push(`## Added Tokens (${diff.added.length})`);
		lines.push(``);
		for (const { path, value } of diff.added) {
			lines.push(`- \`${path}\`: ${formatValue(value)}`);
		}
		lines.push(``);
	}

	if (diff.removed.length > 0) {
		lines.push(`## Removed Tokens (${diff.removed.length})`);
		lines.push(``);
		for (const { path, value } of diff.removed) {
			lines.push(`- \`${path}\`: ${formatValue(value)}`);
		}
		lines.push(``);
	}

	if (diff.changed.length > 0) {
		lines.push(`## Changed Tokens (${diff.changed.length})`);
		lines.push(``);
		for (const { path, oldValue, newValue } of diff.changed) {
			lines.push(`- \`${path}\`:`);
			lines.push(`  - Old: ${formatValue(oldValue)}`);
			lines.push(`  - New: ${formatValue(newValue)}`);
		}
		lines.push(``);
	}

	if (diff.added.length === 0 && diff.removed.length === 0 && diff.changed.length === 0) {
		lines.push(`✅ No differences found.`);
		lines.push(``);
	}

	return lines.join('\n');
}

/**
 * Main function
 */
async function main() {
	const args = process.argv.slice(2);

	if (args.length < 2) {
		console.error('Usage: tsx scripts/diff-tokens.ts <old-file-or-dir> <new-file-or-dir>');
		console.error('');
		console.error('Examples:');
		console.error('  tsx scripts/diff-tokens.ts tokens/bu-a tokens/bu-b');
		console.error('  tsx scripts/diff-tokens.ts tokens/bu-a/tokens.json tokens/bu-a/tokens.json.backup');
		process.exit(1);
	}

	const [oldInput, newInput] = args;

	try {
		const oldTokens = await loadTokens(oldInput);
		const newTokens = await loadTokens(newInput);

		const diff = diffTokens(oldTokens, newTokens);
		const report = generateReport(diff, oldInput, newInput);

		console.log(report);

		// Exit with non-zero if there are changes (useful for CI)
		if (diff.added.length > 0 || diff.removed.length > 0 || diff.changed.length > 0) {
			process.exit(1);
		}
	} catch (error) {
		console.error('Error comparing tokens:', error instanceof Error ? error.message : error);
		process.exit(1);
	}
}

main().catch((error) => {
	console.error('Fatal error:', error);
	process.exit(1);
});

