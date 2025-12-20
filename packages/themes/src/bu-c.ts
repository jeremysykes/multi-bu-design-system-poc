import { buildTheme } from '@theme-engine/buildTheme';
import { loadTokens } from '@theme-engine/loadTokens.browser';
import type { Theme } from '@mui/material/styles';

/**
 * BU C Theme
 * Compiled from tokens/bu-c/*.json
 *
 * This theme was added following the guide in docs/adding-a-bu.md
 * to validate the documentation process.
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
