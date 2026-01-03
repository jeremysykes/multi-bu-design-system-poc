import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import { resolve } from 'path';

// Calculate project root relative to this config file
// This file is at: storybook/.storybook/main.ts
// Project root is two levels up
const projectRoot = resolve(__dirname, '../..');

const config: StorybookConfig = {
	stories: ['../*.stories.@(js|jsx|ts|tsx|mdx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@chromatic-com/storybook',
	],
	framework: {
		name: '@storybook/react-vite',
		options: {},
	},
	typescript: {
		check: false,
		reactDocgen: 'react-docgen-typescript',
		reactDocgenTypescriptOptions: {
			shouldExtractLiteralValuesFromEnum: true,
			propFilter: (prop) =>
				prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
		},
	},
	async viteFinal(config) {
		// Merge with path aliases and file system access
		return mergeConfig(config, {
			resolve: {
				alias: {
					'@multi-bu/ui': resolve(projectRoot, 'packages/ui/src'),
					'@multi-bu/themes': resolve(projectRoot, 'packages/themes/src'),
					'@theme-engine': resolve(projectRoot, 'theme-engine/src'),
				},
			},
			optimizeDeps: {
				// Force emotion packages to be pre-bundled, ensuring version consistency
				// Note: The emotion duplicate loading warning cannot be fully eliminated
				// because Storybook's manager and preview are separate bundles (different
				// JavaScript execution contexts). Emotion's singleton check will always
				// detect them as separate instances. This is a known Storybook limitation
				// and the warning is harmless - it doesn't affect functionality.
				include: ['@emotion/react', '@emotion/styled'],
				force: true, // Force fresh bundling even if cache exists
			},
			server: {
				fs: {
					// Allow serving files from the project root
					allow: [projectRoot],
				},
			},
		});
	},
};

export default config;
