import React from 'react';
import {
	Select as MuiSelect,
	SelectProps as MuiSelectProps,
	FormControl,
	FormControlProps,
	InputLabel,
	InputLabelProps,
	MenuItem,
	MenuItemProps,
} from '@mui/material';

/**
 * Select component wrapper
 * 
 * BU-agnostic select that uses theme tokens exclusively.
 * No hardcoded colors, spacing, or typography values.
 */
export type SelectProps = MuiSelectProps;
export type SelectFormControlProps = FormControlProps;
export type SelectInputLabelProps = InputLabelProps;
export type SelectMenuItemProps = MenuItemProps;

export const Select: React.FC<SelectProps> = (props) => {
	return <MuiSelect {...props} />;
};

export { FormControl, InputLabel, MenuItem };

