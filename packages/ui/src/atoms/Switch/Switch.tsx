import React from 'react';
import { Switch as MuiSwitch, SwitchProps as MuiSwitchProps } from '@mui/material';

/**
 * Switch component wrapper
 * 
 * BU-agnostic switch that uses theme tokens exclusively.
 * No hardcoded colors, spacing, or typography values.
 */
export type SwitchProps = MuiSwitchProps;

export const Switch: React.FC<SwitchProps> = (props) => {
	return <MuiSwitch {...props} />;
};

