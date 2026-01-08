import React from 'react';
import { Box, Stack, Divider, useTheme } from '@mui/material';
import type { BoxProps } from '@mui/material';
import { Typography } from '../../atoms/Typography/Typography';

/**
 * SettingsTemplate template component
 * 
 * A template demonstrating settings page layout using token-driven styling.
 * Uses semantic tokens for colors, spacing tokens for layout,
 * and MUI's Stack component for structure.
 * 
 * All styling is token-driven:
 * - Spacing: theme.spacing() → tokens/core/spacing.json
 * - Colors: theme.palette.surface.default → semantic tokens
 * - No hardcoded values
 */
export interface SettingsTemplateProps extends Omit<BoxProps, 'component'> {
	sections?: Array<{
		title: string;
		children: React.ReactNode;
	}>;
	children?: React.ReactNode;
}

export const SettingsTemplate: React.FC<SettingsTemplateProps> = ({ sections, children, ...props }) => {
	const theme = useTheme();

	return (
		<Box
			sx={{
				p: { xs: 3, md: 4 },
				maxWidth: theme.breakpoints.values.md,
				mx: 'auto',
				bgcolor: theme.palette.background.default,
			}}
			{...props}
		>
			<Typography variant="h4" gutterBottom>
				Settings
			</Typography>
			<Stack spacing={4} sx={{ mt: 3 }}>
				{sections ? (
					sections.map((section, index) => (
						<Box key={index}>
							<Typography variant="h6" gutterBottom>
								{section.title}
							</Typography>
							<Divider sx={{ mb: 2 }} />
							{section.children}
						</Box>
					))
				) : (
					children
				)}
			</Stack>
		</Box>
	);
};

