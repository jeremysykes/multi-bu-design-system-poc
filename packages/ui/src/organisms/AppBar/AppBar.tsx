import React from 'react';
import {
	AppBar as MuiAppBar,
	AppBarProps as MuiAppBarProps,
	Toolbar,
} from '@mui/material';
import type { ToolbarProps as MuiToolbarProps } from '@mui/material';

/**
 * AppBar component wrapper
 * 
 * BU-agnostic app bar that uses theme tokens exclusively.
 * No hardcoded colors, spacing, or typography values.
 */
export type AppBarProps = MuiAppBarProps;
export type ToolbarProps = MuiToolbarProps;

export const AppBar: React.FC<AppBarProps> = (props) => {
	return <MuiAppBar {...props} />;
};

export { Toolbar };

