import { buildTheme, loadTokens } from '@multi-bu/theme-engine';
import type { Theme } from '@mui/material/styles';

/**
 * BU D Theme - Developer Platform
 * 
 * Compiled from tokens/bu-d/tokens.json (DTCG format)
 *
 * Design Direction: Tech-focused, developer-friendly, internal tooling
 * 
 * Visual Characteristics:
 * - Primary: Cyan/teal (#00BCD4) - technology, code, developer tools
 * - Secondary: Blue-gray (#607D8B) - tech/professional
 * - Typography: Developer-friendly with monospace primary font, balanced sizing (1rem base)
 * - Contrast: Clean, technical, modern, developer-friendly appearance
 * 
 * Use Case: Internal developer tools, API documentation, developer portal, code management systems
 * 
 * This theme complements BU A (Core Banking Platform - conservative, dense), 
 * BU B (Growth & Payments Experience - expressive, spacious), and
 * BU C (Wealth Management - sophisticated, premium) by providing a
 * tech-focused, developer-oriented option for developer platform applications.
 */

let buDTheme: Theme | null = null;

export async function getBuDTheme(): Promise<Theme> {
	if (!buDTheme) {
		const tokens = await loadTokens('bu-d');
		buDTheme = buildTheme(tokens);
	}
	return buDTheme;
}

// For synchronous access (requires tokens to be pre-loaded)
export const buDThemeSync = (() => {
	// This will be populated when build script runs
	return null as Theme | null;
})();

