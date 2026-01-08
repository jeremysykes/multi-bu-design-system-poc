import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { getBuATheme, getBuBTheme, getBuCTheme } from '@multi-bu/themes';
import type { Preview } from '@storybook/react';

type BUTheme = 'Core Banking Platform' | 'Growth & Payments Experience' | 'Wealth Management';

// Theme switcher decorator with toolbar integration
const themeDecorator = (Story: React.ComponentType, context: any) => {
	const selectedTheme = (context.globals.theme || 'Core Banking Platform') as BUTheme;
	const [theme, setTheme] = React.useState<any>(null);

	React.useEffect(() => {
		let cancelled = false;

		const loadTheme = async () => {
			let themeLoader;
			switch (selectedTheme) {
				case 'Core Banking Platform':
					themeLoader = getBuATheme;
					break;
				case 'Growth & Payments Experience':
					themeLoader = getBuBTheme;
					break;
				case 'Wealth Management':
					themeLoader = getBuCTheme;
					break;
				default:
					themeLoader = getBuATheme;
			}

			const loadedTheme = await themeLoader();
			if (!cancelled) {
				setTheme(loadedTheme);
			}
		};

		loadTheme();

		return () => {
			cancelled = true;
		};
	}, [selectedTheme]);

	if (!theme) {
		return <div>Loading theme...</div>;
	}

	return (
		<ThemeProvider theme={theme}>
			<Story />
		</ThemeProvider>
	);
};

const preview: Preview = {
	decorators: [themeDecorator],
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
		chromatic: {
			modes: {
				'Core Banking Platform': { theme: 'Core Banking Platform' },
				'Growth & Payments Experience': { theme: 'Growth & Payments Experience' },
				'Wealth Management': { theme: 'Wealth Management' },
			},
		},
	},
	globalTypes: {
		theme: {
			name: 'Business Unit Theme',
			description: 'Select a business unit theme to preview',
			defaultValue: 'Core Banking Platform',
			toolbar: {
				icon: 'paintbrush',
				items: [
					{ value: 'Core Banking Platform', title: 'Core Banking Platform', right: '🏦' },
					{ value: 'Growth & Payments Experience', title: 'Growth & Payments Experience', right: '🚀' },
					{ value: 'Wealth Management', title: 'Wealth Management', right: '💎' },
				],
				showName: true,
				dynamicTitle: true,
			},
		},
	},
};

export default preview;
