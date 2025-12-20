import { buildTheme } from '@theme-engine/buildTheme';
import { loadTokens } from '@theme-engine/loadTokens.browser';
import type { Theme } from '@mui/material/styles';

/**
 * BU B Theme
 * Compiled from tokens/bu-b/*.json
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
