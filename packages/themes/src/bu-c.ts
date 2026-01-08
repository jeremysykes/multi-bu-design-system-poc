import { buildTheme } from '@theme-engine/buildTheme';
import { loadTokens } from '@theme-engine/loadTokens.browser';
import type { Theme } from '@mui/material/styles';

/**
 * BU C Theme - Wealth Management
 * 
 * Compiled from tokens/bu-c/tokens.json (DTCG format)
 *
 * Design Direction: Sophisticated, premium, elegant
 * 
 * Visual Characteristics:
 * - Primary: Rich deep purple/indigo (#673AB7) - sophisticated, refined, premium
 * - Secondary: Warm gold/amber (#FFC107) - luxury feel, wealth associations
 * - Typography: Balanced sizing (1rem base), elegant serif option (Georgia)
 * - Contrast: Refined and sophisticated
 * 
 * Use Case: High-value advisory services, premium client experiences
 * 
 * This theme complements BU A (Core Banking Platform - conservative, dense) and
 * BU B (Growth & Payments Experience - expressive, spacious) by providing a
 * premium, sophisticated option for wealth management applications.
 */

let buCTheme: Theme | null = null;

export async function getBuCTheme(): Promise<Theme> {
	if (!buCTheme) {
		const tokens = await loadTokens('bu-c');
		buCTheme = buildTheme(tokens);
	}
	return buCTheme;
}

// For synchronous access (requires tokens to be pre-loaded)
export const buCThemeSync = (() => {
	// This will be populated when build script runs
	return null as Theme | null;
})();
