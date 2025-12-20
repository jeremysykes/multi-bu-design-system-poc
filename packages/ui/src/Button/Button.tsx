import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';

/**
 * Button component wrapper
 * 
 * BU-agnostic button that uses theme tokens exclusively.
 * No hardcoded colors, spacing, or typography values.
 */
export interface ButtonProps extends Omit<MuiButtonProps, 'color'> {
	color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
	return <MuiButton {...props}>{children}</MuiButton>;
};
