import React from 'react';
import { Checkbox as MuiCheckbox, CheckboxProps as MuiCheckboxProps } from '@mui/material';

/**
 * Checkbox component wrapper
 * 
 * BU-agnostic checkbox that uses theme tokens exclusively.
 * No hardcoded colors, spacing, or typography values.
 */
export type CheckboxProps = MuiCheckboxProps;

export const Checkbox: React.FC<CheckboxProps> = (props) => {
	return <MuiCheckbox {...props} />;
};

