#!/usr/bin/env tsx

/**
 * Design system linting script
 * 
 * Detects hardcoded values in wrapper code:
 * - Hardcoded hex colors
 * - Hardcoded spacing/typography values
 */

import { readFile, readdir } from 'fs/promises';
import { join } from 'path';

interface Violation {
	file: string;
	line: number;
	message: string;
}

async function lintDesignSystem() {
	const violations: Violation[] = [];
	const uiSrcPath = join(process.cwd(), 'packages', 'ui', 'src');

	// Get all TypeScript/TSX files
	const files = await getFilesRecursive(uiSrcPath, ['.ts', '.tsx']);

	for (const file of files) {
		const content = await readFile(file, 'utf-8');
		const lines = content.split('\n');

		lines.forEach((line, index) => {
			const lineNum = index + 1;

			// Check for hardcoded hex colors (6-digit hex)
			const hexColorRegex = /#[0-9A-Fa-f]{6}/g;
			const hexMatches = line.match(hexColorRegex);
			if (hexMatches) {
				// Allow hex colors in comments
				if (!line.trim().startsWith('//') && !line.includes('/*')) {
					violations.push({
						file,
						line: lineNum,
						message: `Hardcoded hex color found: ${hexMatches.join(', ')}. Use theme tokens instead.`,
					});
				}
			}

			// Check for hardcoded px/rem values in style objects (not in comments)
			if (!line.trim().startsWith('//') && !line.includes('/*')) {
				// Match patterns like "10px", "1.5rem" but not in strings that are token references
				const hardcodedSizeRegex = /:\s*['"]?\d+\.?\d*(px|rem)['"]?/g;
				const sizeMatches = line.match(hardcodedSizeRegex);
				if (sizeMatches && !line.includes('fontSize') && !line.includes('lineHeight')) {
					// Allow in fontSize/lineHeight as those might be from tokens
					violations.push({
						file,
						line: lineNum,
						message: `Potential hardcoded size value: ${sizeMatches.join(', ')}. Consider using theme spacing/typography tokens.`,
					});
				}
			}
		});
	}

	if (violations.length > 0) {
		console.error('❌ Design system violations found:\n');
		for (const violation of violations) {
			console.error(`  ${violation.file}:${violation.line}`);
			console.error(`    ${violation.message}\n`);
		}
		process.exit(1);
	}

	console.log('✓ No design system violations found');
}

async function getFilesRecursive(dir: string, extensions: string[]): Promise<string[]> {
	const files: string[] = [];
	const entries = await readdir(dir, { withFileTypes: true });

	for (const entry of entries) {
		const fullPath = join(dir, entry.name);
		if (entry.isDirectory()) {
			files.push(...(await getFilesRecursive(fullPath, extensions)));
		} else if (extensions.some((ext) => entry.name.endsWith(ext))) {
			files.push(fullPath);
		}
	}

	return files;
}

lintDesignSystem().catch((error) => {
	console.error('Error linting design system:', error);
	process.exit(1);
});
