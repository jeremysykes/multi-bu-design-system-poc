import React from 'react';
import { Divider as MuiDivider, DividerProps as MuiDividerProps } from '@mui/material';

/**
 * Divider component wrapper
 * 
 * BU-agnostic divider that uses theme tokens exclusively.
 * No hardcoded colors, spacing, or typography values.
 */
export type DividerProps = MuiDividerProps;

export const Divider: React.FC<DividerProps> = (props) => {
	return <MuiDivider {...props} />;
};

