#!/usr/bin/env tsx

/**
 * Migration script: Convert TokenSchema format to DTCG format
 * 
 * Converts from:
 * {
 *   base: { palette: {...}, typography: {...}, spacing: {...}, shape: {...} },
 *   semantic: {...}
 * }
 * 
 * To DTCG format:
 * {
 *   color: { primary: { 50: { $value: "#...", $type: "color" }, ... } },
 *   typography: { fontSize: { base: { $value: "1rem", $type: "dimension" }, ... } },
 *   spacing: { "0": { $value: "0px", $type: "dimension" }, ... },
 *   shape: { borderRadius: { sm: { $value: "4px", $type: "dimension" }, ... } },
 *   semantic: { surface: { default: { $value: "{color.neutral.50}", $type: "color" }, ... } }
 * }
 */

import { readFile, writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';

/**
 * Convert a color value to DTCG format
 */
function toDTCGColor(value: string): { $value: string; $type: string } {
	return { $value: value, $type: 'color' };
}

/**
 * Convert a dimension value to DTCG format
 */
function toDTCGDimension(value: string): { $value: string; $type: string } {
	return { $value: value, $type: 'dimension' };
}

/**
 * Convert a number value to DTCG format
 */
function toDTCGNumber(value: number): { $value: number; $type: string } {
	return { $value: value, $type: 'number' };
}

/**
 * Convert a string value to DTCG format
 */
function toDTCGString(value: string): { $value: string; $type: string } {
	return { $value: value, $type: 'string' };
}

/**
 * Convert fontFamily to DTCG format
 */
function toDTCGFontFamily(value: string): { $value: string; $type: string } {
	return { $value: value, $type: 'fontFamily' };
}

/**
 * Convert palette tokens to DTCG color format (flattened for Figma compatibility)
 * Flattens from color.primary.50 to color.primary-50 to avoid numeric key issues in Figma
 */
function convertPalette(palette: Record<string, Record<string, string>>): Record<string, { $value: string; $type: string }> {
	const result: Record<string, { $value: string; $type: string }> = {};
	for (const [category, colorRamp] of Object.entries(palette)) {
		for (const [shade, color] of Object.entries(colorRamp)) {
			// Flatten structure: color.primary.50 -> color.primary-50
			const flattenedKey = `${category}-${shade}`;
			result[flattenedKey] = toDTCGColor(color);
		}
	}
	return result;
}

/**
 * Convert typography tokens to DTCG format
 */
function convertTypography(typography: any): any {
	const result: any = {};
	
	if (typography.fontFamily) {
		result.fontFamily = {};
		for (const [key, value] of Object.entries(typography.fontFamily)) {
			result.fontFamily[key] = toDTCGFontFamily(value as string);
		}
	}
	
	if (typography.fontSize) {
		result.fontSize = {};
		for (const [key, value] of Object.entries(typography.fontSize)) {
			result.fontSize[key] = toDTCGDimension(value as string);
		}
	}
	
	if (typography.fontWeight) {
		result.fontWeight = {};
		for (const [key, value] of Object.entries(typography.fontWeight)) {
			result.fontWeight[key] = toDTCGNumber(value as number);
		}
	}
	
	if (typography.lineHeight) {
		result.lineHeight = {};
		for (const [key, value] of Object.entries(typography.lineHeight)) {
			// lineHeight can be number or string
			if (typeof value === 'number') {
				result.lineHeight[key] = toDTCGNumber(value);
			} else {
				result.lineHeight[key] = toDTCGDimension(value as string);
			}
		}
	}
	
	return result;
}

/**
 * Convert spacing tokens to DTCG format
 */
function convertSpacing(spacing: Record<string, string>): Record<string, { $value: string; $type: string }> {
	const result: Record<string, { $value: string; $type: string }> = {};
	for (const [key, value] of Object.entries(spacing)) {
		result[key] = toDTCGDimension(value);
	}
	return result;
}

/**
 * Convert shape tokens to DTCG format
 */
function convertShape(shape: any): any {
	const result: any = {};
	
	if (shape.borderRadius) {
		result.borderRadius = {};
		for (const [key, value] of Object.entries(shape.borderRadius)) {
			result.borderRadius[key] = toDTCGDimension(value as string);
		}
	}
	
	if (shape.elevation) {
		result.elevation = {};
		for (const [key, value] of Object.entries(shape.elevation)) {
			result.elevation[key] = toDTCGString(value as string);
		}
	}
	
	return result;
}

/**
 * Convert semantic tokens to DTCG format
 * Semantic tokens can reference color tokens using {color.primary-500} syntax (flattened format)
 */
function convertSemantic(semantic: any): any {
	const result: any = {};
	
	for (const [category, tokens] of Object.entries(semantic)) {
		result[category] = {};
		const tokenMap = tokens as Record<string, string>;
		for (const [key, value] of Object.entries(tokenMap)) {
			// Convert palette references from "palette.primary.500" to "{color.primary-500}" (flattened)
			let dtcgValue = value;
			if (value.startsWith('palette.')) {
				// Convert palette.primary.500 -> color.primary-500 (flattened)
				const path = value.replace('palette.', '');
				const parts = path.split('.');
				if (parts.length === 2) {
					dtcgValue = `{color.${parts[0]}-${parts[1]}}`;
				} else {
					dtcgValue = `{color.${path}}`;
				}
			} else if (value.startsWith('{color.') && value.includes('.')) {
				// If already in {color.primary.500} format, convert to flattened {color.primary-500}
				const path = value.slice(1, -1); // Remove { }
				const parts = path.split('.');
				if (parts.length === 3 && parts[0] === 'color') {
					// color.primary.500 -> color.primary-500
					dtcgValue = `{color.${parts[1]}-${parts[2]}}`;
				} else {
					dtcgValue = value; // Keep as-is if not in expected format
				}
			}
			// Determine type based on category
			const type = category === 'surface' || category === 'text' || category === 'border' || category === 'action' || category === 'feedback' 
				? 'color' 
				: 'string';
			result[category][key] = { $value: dtcgValue, $type: type };
		}
	}
	
	return result;
}

/**
 * Flatten existing DTCG format (nested color.primary.50 -> flattened color.primary-50)
 */
function flattenDTCG(tokens: any): any {
	const result: any = {
		$schema: tokens.$schema || 'https://schemas.figma.com/tokens/v1',
	};
	
	// Flatten color tokens from nested structure to flat structure
	if (tokens.color) {
		result.color = {};
		for (const [category, shades] of Object.entries(tokens.color)) {
			if (shades && typeof shades === 'object' && !('$value' in shades)) {
				// Nested structure: color.primary.50
				for (const [shade, token] of Object.entries(shades as any)) {
					const flattenedKey = `${category}-${shade}`;
					result.color[flattenedKey] = token;
				}
			} else {
				// Already flat structure, keep as-is
				result.color[category] = shades;
			}
		}
	}
	
	// Keep typography, spacing, shape as-is (no flattening needed)
	if (tokens.typography) {
		result.typography = tokens.typography;
	}
	if (tokens.spacing) {
		result.spacing = tokens.spacing;
	}
	if (tokens.shape) {
		result.shape = tokens.shape;
	}
	
	// Flatten semantic token references
	if (tokens.semantic) {
		result.semantic = {};
		for (const [category, semanticTokens] of Object.entries(tokens.semantic)) {
			result.semantic[category] = {};
			const tokenMap = semanticTokens as Record<string, any>;
			for (const [key, token] of Object.entries(tokenMap)) {
				if (token && typeof token === 'object' && '$value' in token) {
					const value = token.$value;
					// Convert {color.primary.500} references to {color.primary-500}
					if (typeof value === 'string' && value.startsWith('{color.') && value.includes('.')) {
						const path = value.slice(1, -1); // Remove { }
						const parts = path.split('.');
						if (parts.length === 3 && parts[0] === 'color') {
							// color.primary.500 -> color.primary-500
							token.$value = `{color.${parts[1]}-${parts[2]}}`;
						}
					}
					result.semantic[category][key] = token;
				} else {
					result.semantic[category][key] = token;
				}
			}
		}
	}
	
	return result;
}

/**
 * Convert TokenSchema format to DTCG format
 */
function convertToDTCG(tokens: any): any {
	const result: any = {
		$schema: 'https://schemas.figma.com/tokens/v1',
	};
	
	if (tokens.base) {
		if (tokens.base.palette) {
			result.color = convertPalette(tokens.base.palette);
		}
		if (tokens.base.typography) {
			result.typography = convertTypography(tokens.base.typography);
		}
		if (tokens.base.spacing) {
			result.spacing = convertSpacing(tokens.base.spacing);
		}
		if (tokens.base.shape) {
			result.shape = convertShape(tokens.base.shape);
		}
	}
	
	if (tokens.semantic) {
		result.semantic = convertSemantic(tokens.semantic);
	}
	
	return result;
}

/**
 * Migrate a single token file
 * Handles both old TokenSchema format and existing DTCG format (for re-migration)
 */
async function migrateFile(inputPath: string, outputPath: string): Promise<void> {
	console.log(`Migrating ${inputPath} -> ${outputPath}`);
	const content = await readFile(inputPath, 'utf-8');
	const tokens = JSON.parse(content);
	
	// Check if this is already in DTCG format (has $schema and color/typography/spacing/shape at top level)
	const isDTCG = tokens.$schema || (tokens.color && !tokens.base);
	
	let dtcgTokens: any;
	if (isDTCG) {
		// Already in DTCG format, just flatten it
		dtcgTokens = flattenDTCG(tokens);
	} else {
		// Old TokenSchema format, convert to DTCG
		dtcgTokens = convertToDTCG(tokens);
	}
	
	const dir = dirname(outputPath);
	await mkdir(dir, { recursive: true });
	await writeFile(outputPath, JSON.stringify(dtcgTokens, null, 2) + '\n', 'utf-8');
	console.log(`✓ Migrated ${outputPath}`);
}

/**
 * Migrate core tokens (multi-file structure)
 */
async function migrateCoreTokens(): Promise<void> {
	const coreDir = join(process.cwd(), 'tokens', 'core');
	const coreFiles = ['palette.json', 'typography.json', 'spacing.json', 'shape.json', 'semantic.json'];
	
	// For core, we need to combine all files into one DTCG format file
	// But wait - core tokens are used differently. Let me check how they're loaded...
	// Actually, for now, let's migrate core tokens to a single tokens.json file in DTCG format
	const tokens: any = {
		base: {},
		semantic: {},
	};
	
	for (const file of coreFiles) {
		const filePath = join(coreDir, file);
		try {
			const content = await readFile(filePath, 'utf-8');
			const data = JSON.parse(content);
			if (file === 'semantic.json') {
				tokens.semantic = data;
			} else {
				tokens.base[file.replace('.json', '')] = data;
			}
		} catch (error) {
			console.warn(`Warning: Could not read ${filePath}`);
		}
	}
	
	const dtcgTokens = convertToDTCG(tokens);
	const outputPath = join(coreDir, 'tokens.json');
	await writeFile(outputPath, JSON.stringify(dtcgTokens, null, 2) + '\n', 'utf-8');
	console.log(`✓ Migrated core tokens to ${outputPath}`);
}

/**
 * Main function
 */
async function main() {
	const buIdArg = process.argv[2];
	
	if (buIdArg === 'core') {
		await migrateCoreTokens();
		return;
	}
	
	if (buIdArg !== 'bu-a' && buIdArg !== 'bu-b' && buIdArg !== 'bu-c') {
		console.error('Usage: npm run migrate-to-dtcg -- <core|bu-a|bu-b|bu-c>');
		console.error('');
		console.error('This script converts TokenSchema format to DTCG format.');
		console.error('The output file will be tokens/{bu}/tokens.json in DTCG format.');
		process.exit(1);
	}
	
	const inputPath = join(process.cwd(), 'tokens', buIdArg, 'tokens.json');
	const outputPath = inputPath; // Overwrite existing file
	
	try {
		await migrateFile(inputPath, outputPath);
		console.log(`\n✓ Migration complete for ${buIdArg}`);
		console.log(`  → File: ${outputPath}`);
		console.log(`  → Format: DTCG (ready for Figma import)`);
	} catch (error) {
		console.error('Error:', error instanceof Error ? error.message : String(error));
		process.exit(1);
	}
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});

