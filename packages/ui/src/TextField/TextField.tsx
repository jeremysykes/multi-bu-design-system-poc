import React from 'react';
import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from '@mui/material';

/**
 * TextField component wrapper
 * 
 * BU-agnostic text field that uses theme tokens exclusively.
 * No hardcoded colors, spacing, or typography values.
 */
export type TextFieldProps = MuiTextFieldProps;

export const TextField: React.FC<TextFieldProps> = (props) => {
	return <MuiTextField {...props} />;
};
