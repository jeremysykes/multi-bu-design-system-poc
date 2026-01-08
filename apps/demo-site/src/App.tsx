import React, { useState, useEffect } from 'react';
import { Routes, Route, useSearchParams, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box, Container } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import { getBuATheme, getBuBTheme, getBuCTheme } from '@multi-bu/themes';
import { BUSelector } from './components/BUSelector';
import { Navigation } from './components/Navigation';
import { DashboardPage } from './pages/DashboardPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { SettingsPage } from './pages/SettingsPage';

export type BU = 'bu-a' | 'bu-b' | 'bu-c';

function App() {
	const [searchParams, setSearchParams] = useSearchParams();
	const buId = (searchParams.get('bu') || 'bu-a') as BU;
	const [theme, setTheme] = useState<Theme | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let cancelled = false;

		const loadTheme = async () => {
			setLoading(true);
			let themeLoader;
			switch (buId) {
				case 'bu-a':
					themeLoader = getBuATheme;
					break;
				case 'bu-b':
					themeLoader = getBuBTheme;
					break;
				case 'bu-c':
					themeLoader = getBuCTheme;
					break;
				default:
					themeLoader = getBuATheme;
			}

			try {
				const loadedTheme = await themeLoader();
				if (!cancelled) {
					setTheme(loadedTheme);
					setLoading(false);
				}
			} catch (error) {
				console.error('Failed to load theme:', error);
				if (!cancelled) {
					setLoading(false);
				}
			}
		};

		loadTheme();

		return () => {
			cancelled = true;
		};
	}, [buId]);

	const handleBUChange = (newBU: BU) => {
		setSearchParams({ bu: newBU });
	};

	if (loading || !theme) {
		return (
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
				}}
			>
				Loading theme...
			</Box>
		);
	}

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
				<Container maxWidth="xl" sx={{ py: 3 }}>
					<BUSelector selectedBU={buId} onChange={handleBUChange} />
					<Box sx={{ display: 'flex', gap: 3, mt: 3 }}>
						<Navigation />
						<Box sx={{ flexGrow: 1 }}>
							<Routes>
								<Route path="/" element={<DashboardPage buId={buId} />} />
								<Route path="/onboarding" element={<OnboardingPage buId={buId} />} />
								<Route path="/settings" element={<SettingsPage buId={buId} />} />
								<Route path="*" element={<Navigate to="/" replace />} />
							</Routes>
						</Box>
					</Box>
				</Container>
			</Box>
		</ThemeProvider>
	);
}

export default App;

