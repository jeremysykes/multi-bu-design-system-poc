import React from 'react';
import { Box, Stack, useTheme } from '@mui/material';
import type { BoxProps } from '@mui/material';

/**
 * FormLayout template component
 * 
 * A minimal template demonstrating form structure using token-driven styling.
 * Uses semantic tokens for colors (meaning), spacing tokens for layout,
 * and MUI's layout components for structure.
 * 
 * All styling is token-driven:
 * - Spacing: theme.spacing() → tokens/core/spacing.json
 * - Colors: theme.palette.surface.default, theme.palette.border.default → semantic tokens
 * - No hardcoded values
 */
export interface FormLayoutProps extends Omit<BoxProps, 'component'> {
	children: React.ReactNode;
}

export const FormLayout: React.FC<FormLayoutProps> = ({ children, ...props }) => {
	const theme = useTheme();

	return (
		<Box
			component="form"
			sx={{
				// All spacing from tokens: spacing.3 = 12px, spacing.4 = 16px
				p: { xs: 3, md: 4 }, // Responsive padding using theme spacing (from tokens)
				// Max width uses theme breakpoint (tokenized) or spacing token
				maxWidth: theme.breakpoints.values.sm, // Uses theme breakpoint, not hardcoded
				mx: 'auto', // Center horizontally (layout utility, no value needed)
				// Background uses semantic meaning (background.default maps to surface semantic token)
				// Note: Semantic tokens (surface.default) are used internally in component overrides
				// For templates, we use MUI's background.default which aligns with semantic meaning
				bgcolor: theme.palette.background.default, // ✅ Semantic meaning: "default surface"
				// Border uses semantic meaning (divider aligns with border.default semantic token)
				border: `1px solid ${theme.palette.divider}`, // ✅ Semantic meaning: "default border"
			}}
			{...props}
		>
			{/* Stack spacing uses theme.spacing() which maps to spacing.3 token = 12px */}
			<Stack spacing={3}>
				{children}
			</Stack>
		</Box>
	);
};

