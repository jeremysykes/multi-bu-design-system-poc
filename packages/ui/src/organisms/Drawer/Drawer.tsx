import React from 'react';
import { Drawer as MuiDrawer, DrawerProps as MuiDrawerProps } from '@mui/material';

/**
 * Drawer component wrapper
 * 
 * BU-agnostic drawer that uses theme tokens exclusively.
 * No hardcoded colors, spacing, or typography values.
 */
export type DrawerProps = MuiDrawerProps;

export const Drawer: React.FC<DrawerProps> = (props) => {
	return <MuiDrawer {...props} />;
};

