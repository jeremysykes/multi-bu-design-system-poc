/**
 * Browser-compatible token loader
 * Uses static imports instead of fs/promises for browser compatibility
 */

import type { TokenSchema } from './types';

// Core tokens - static imports
import corePalette from '../../tokens/core/palette.json';
import coreTypography from '../../tokens/core/typography.json';
import coreSpacing from '../../tokens/core/spacing.json';
import coreShape from '../../tokens/core/shape.json';
import coreSemantic from '../../tokens/core/semantic.json';

// BU-specific tokens - static imports
import buAPalette from '../../tokens/bu-a/palette.json';
import buATypography from '../../tokens/bu-a/typography.json';
import buASemantic from '../../tokens/bu-a/semantic.json';

import buBPalette from '../../tokens/bu-b/palette.json';
import buBTypography from '../../tokens/bu-b/typography.json';
import buBSemantic from '../../tokens/bu-b/semantic.json';

import buCPalette from '../../tokens/bu-c/palette.json';
import buCTypography from '../../tokens/bu-c/typography.json';
import buCSemantic from '../../tokens/bu-c/semantic.json';

/**
 * Loads and merges tokens for a business unit (browser-compatible)
 * Core tokens are loaded first, then BU-specific tokens override/extend them
 *
 * @param buId - Business unit identifier (e.g., 'core', 'bu-a', 'bu-b', 'bu-c')
 * @returns Merged token data
 */
export async function loadTokens(buId: string): Promise<TokenSchema> {
	// If loading core, return as-is
	if (buId === 'core') {
		return {
			base: {
				palette: corePalette as any,
				typography: coreTypography as any,
				spacing: coreSpacing as any,
				shape: coreShape as any,
			},
			semantic: coreSemantic as any,
		};
	}

	// Load BU-specific tokens based on buId
	let buPalette: any;
	let buTypography: any;
	let buSemantic: any;

	switch (buId) {
		case 'bu-a':
			buPalette = buAPalette;
			buTypography = buATypography;
			buSemantic = buASemantic;
			break;
		case 'bu-b':
			buPalette = buBPalette;
			buTypography = buBTypography;
			buSemantic = buBSemantic;
			break;
		case 'bu-c':
			buPalette = buCPalette;
			buTypography = buCTypography;
			buSemantic = buCSemantic;
			break;
		default:
			throw new Error(`Unknown business unit: ${buId}`);
	}

	// Merge: BU tokens override/extend core tokens
	return {
		base: {
			palette: { ...corePalette, ...buPalette } as any,
			typography: { ...coreTypography, ...buTypography } as any,
			spacing: coreSpacing as any, // Spacing typically doesn't vary by BU
			shape: coreShape as any, // Shape typically doesn't vary by BU
		},
		semantic: { ...coreSemantic, ...buSemantic } as any,
	};
}
