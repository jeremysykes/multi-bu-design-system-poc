import React from 'react';
import { IconButton as MuiIconButton, IconButtonProps as MuiIconButtonProps } from '@mui/material';

/**
 * IconButton component wrapper
 * 
 * BU-agnostic icon button that uses theme tokens exclusively.
 * No hardcoded colors, spacing, or typography values.
 */
export type IconButtonProps = MuiIconButtonProps;

export const IconButton: React.FC<IconButtonProps> = (props) => {
	return <MuiIconButton {...props} />;
};

