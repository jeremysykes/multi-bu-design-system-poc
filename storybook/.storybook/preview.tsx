import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { getBuATheme, getBuBTheme } from '@multi-bu/themes';
import type { Preview } from '@storybook/react';

const sideBySideDecorator = (Story: React.ComponentType) => {
	const [buATheme, setBuATheme] = React.useState<any>(null);
	const [buBTheme, setBuBTheme] = React.useState<any>(null);

	React.useEffect(() => {
		getBuATheme().then(setBuATheme);
		getBuBTheme().then(setBuBTheme);
	}, []);

	if (!buATheme || !buBTheme) {
		return <div>Loading themes...</div>;
	}

	return (
		<div style={{ display: 'flex', gap: '24px', padding: '24px' }}>
			<div
				style={{
					flex: 1,
					border: '1px solid #e0e0e0',
					padding: '16px',
					borderRadius: '8px',
				}}
			>
				<div
					style={{ marginBottom: '16px', fontWeight: 'bold', color: '#666' }}
				>
					BU A
				</div>
				<ThemeProvider theme={buATheme}>
					<Story />
				</ThemeProvider>
			</div>
			<div
				style={{
					flex: 1,
					border: '1px solid #e0e0e0',
					padding: '16px',
					borderRadius: '8px',
				}}
			>
				<div
					style={{ marginBottom: '16px', fontWeight: 'bold', color: '#666' }}
				>
					BU B
				</div>
				<ThemeProvider theme={buBTheme}>
					<Story />
				</ThemeProvider>
			</div>
		</div>
	);
};

const preview: Preview = {
	decorators: [sideBySideDecorator],
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
				'BU A': {},
				'BU B': {},
			},
		},
	},
};

export default preview;
