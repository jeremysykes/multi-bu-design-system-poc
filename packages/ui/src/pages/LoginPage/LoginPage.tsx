import React from 'react';
import { Container, Box, Stack, useTheme } from '@mui/material';
import { Card } from '../../organisms/Card/Card';
import { TextField } from '../../molecules/TextField/TextField';
import { Button } from '../../atoms/Button/Button';
import { Typography } from '../../atoms/Typography/Typography';

/**
 * LoginPage - Minimal page example
 * 
 * Demonstrates template usage with real content. Uses multiple molecules/organisms
 * (TextField, Button, Card) to show composition patterns.
 * 
 * All styling is token-driven:
 * - Spacing: theme.spacing() → tokens/core/spacing.json
 * - Colors: theme.palette.background.default → semantic meaning (surface)
 * - No hardcoded values
 */
export const LoginPage: React.FC = () => {
	const theme = useTheme();

	return (
		<Container maxWidth="sm">
			{/* Uses theme breakpoint, not hardcoded */}
			<Box
				sx={{
					// All spacing from tokens: spacing.4 = 16px, spacing.8 = 32px
					py: { xs: 4, md: 8 }, // Responsive vertical padding (from tokens)
					minHeight: '100vh', // Viewport unit (layout constraint, acceptable)
					display: 'flex',
					alignItems: 'center',
					// Background uses semantic meaning (background.default maps to surface semantic token)
					bgcolor: theme.palette.background.default, // ✅ Semantic meaning: "default surface"
				}}
			>
				<Card sx={{ width: '100%' }}>
					{/* All spacing from tokens: spacing.4 = 16px */}
					<Stack spacing={4} sx={{ p: 4 }}>
						<Typography variant="h5" component="h1">
							Login
						</Typography>
						<TextField label="Email" type="email" fullWidth />
						<TextField label="Password" type="password" fullWidth />
						<Button variant="contained" color="primary" fullWidth>
							Sign In
						</Button>
					</Stack>
				</Card>
			</Box>
		</Container>
	);
};

