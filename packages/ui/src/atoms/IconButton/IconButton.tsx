import React from 'react';
import { IconButton as MuiIconButton, IconButtonProps as MuiIconButtonProps } from '@mui/material';

/**
 * IconButton component wrapper
 * 
 * BU-agnostic icon button that uses theme tokens exclusively.
 * No hardcoded colors, spacing, or typography values.
 * 
 * **Accessibility Requirement**: Icon-only buttons must have an accessible name.
 * Provide either `aria-label` or `aria-labelledby` prop.
 * 
 * @example
 * ```tsx
 * <IconButton aria-label="Delete item">
 *   <DeleteIcon />
 * </IconButton>
 * ```
 */
export type IconButtonProps = MuiIconButtonProps & {
	/**
	 * Required for accessibility: Icon-only buttons must have an accessible name.
	 * Provide either aria-label or aria-labelledby.
	 */
	'aria-label'?: string;
	'aria-labelledby'?: string;
};

export const IconButton: React.FC<IconButtonProps> = (props) => {
	// Development warning if neither aria-label nor aria-labelledby is provided
	if (process.env.NODE_ENV === 'development') {
		if (!props['aria-label'] && !props['aria-labelledby']) {
			console.warn(
				'IconButton requires either aria-label or aria-labelledby for accessibility. ' +
					'Icon-only buttons must have an accessible name (WCAG 2.2).'
			);
		}
	}
	// Ensure at least one accessibility prop is provided at runtime
	// Note: TypeScript cannot enforce this at compile time without complex discriminated unions,
	// so we rely on development warnings and documentation.
	return <MuiIconButton {...props} />;
};

