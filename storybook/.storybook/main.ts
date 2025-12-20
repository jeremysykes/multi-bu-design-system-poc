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
