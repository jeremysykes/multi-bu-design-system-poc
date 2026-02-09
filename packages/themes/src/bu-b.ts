import { buildTheme, loadTokens } from '@multi-bu/theme-engine';
import type { Theme } from '@mui/material/styles';

/**
 * Growth & Payments Experience Theme
 * Compiled from tokens/bu-b/*.json
 * 
 * Visual intent: Expressive, spacious, modern, approachable
 * External-facing, revenue and conversion focused
 */

let buBTheme: Theme | null = null;

export async function getBuBTheme(): Promise<Theme> {
	if (!buBTheme) {
		const tokens = await loadTokens('bu-b');
		buBTheme = buildTheme(tokens);
	}
	return buBTheme;
}

// For synchronous access (requires tokens to be pre-loaded)
export const buBThemeSync = (() => {
	// This will be populated when build script runs
	return null as Theme | null;
})();
