import React from 'react';
import { Box, Grid, useTheme } from '@mui/material';
import type { BoxProps } from '@mui/material';
import { Card } from '../../organisms/Card/Card';
import { Typography } from '../../atoms/Typography/Typography';

/**
 * DashboardTemplate template component
 * 
 * A template demonstrating dashboard layout using token-driven styling.
 * Uses semantic tokens for colors, spacing tokens for layout,
 * and MUI's Grid system for structure.
 * 
 * All styling is token-driven:
 * - Spacing: theme.spacing() → tokens/core/spacing.json
 * - Colors: theme.palette.surface.default → semantic tokens
 * - No hardcoded values
 */
export interface DashboardTemplateProps extends Omit<BoxProps, 'component'> {
	children?: React.ReactNode;
}

export const DashboardTemplate: React.FC<DashboardTemplateProps> = ({ children, ...props }) => {
	const theme = useTheme();

	return (
		<Box
			sx={{
				p: { xs: 3, md: 4 },
				bgcolor: theme.palette.background.default,
				minHeight: '100vh',
			}}
			{...props}
		>
			<Grid container spacing={3}>
				{children || (
					<>
						<Grid item xs={12} md={4}>
							<Card>
								<Typography variant="h6">Metric Card 1</Typography>
								<Typography variant="body2" color="text.secondary">
									Dashboard content goes here
								</Typography>
							</Card>
						</Grid>
						<Grid item xs={12} md={4}>
							<Card>
								<Typography variant="h6">Metric Card 2</Typography>
								<Typography variant="body2" color="text.secondary">
									Dashboard content goes here
								</Typography>
							</Card>
						</Grid>
						<Grid item xs={12} md={4}>
							<Card>
								<Typography variant="h6">Metric Card 3</Typography>
								<Typography variant="body2" color="text.secondary">
									Dashboard content goes here
								</Typography>
							</Card>
						</Grid>
					</>
				)}
			</Grid>
		</Box>
	);
};

