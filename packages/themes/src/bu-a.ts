import { buildTheme } from '@theme-engine/buildTheme';
import { loadTokens } from '@theme-engine/loadTokens.browser';
import type { Theme } from '@mui/material/styles';

/**
 * BU A Theme
 * Compiled from tokens/bu-a/*.json
 */

let buATheme: Theme | null = null;

export async function getBuATheme(): Promise<Theme> {
	if (!buATheme) {
		const tokens = await loadTokens('bu-a');
		buATheme = buildTheme(tokens);
	}
	return buATheme;
}

// For synchronous access (requires tokens to be pre-loaded)
export const buAThemeSync = (() => {
	// This will be populated when build script runs
	return null as Theme | null;
})();
