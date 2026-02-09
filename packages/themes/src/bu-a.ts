import { buildTheme, loadTokens } from '@multi-bu/theme-engine';
import type { Theme } from '@mui/material/styles';

/**
 * Core Banking Platform Theme
 * Compiled from tokens/bu-a/*.json
 * 
 * Visual intent: Conservative, dense, predictable, low visual noise
 * Internal, regulated, operational tooling
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
