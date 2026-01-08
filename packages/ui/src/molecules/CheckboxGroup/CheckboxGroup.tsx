import React from 'react';
import {
	FormGroup,
	FormGroupProps,
	FormControlLabel,
	FormControlLabelProps,
} from '@mui/material';
import { Checkbox, CheckboxProps } from '../../atoms/Checkbox/Checkbox';

/**
 * CheckboxGroup component wrapper
 * 
 * BU-agnostic checkbox group that uses theme tokens exclusively.
 * No hardcoded colors, spacing, or typography values.
 * Composes Checkbox atom.
 */
export type CheckboxGroupProps = FormGroupProps;
export type { FormControlLabelProps as CheckboxGroupFormControlLabelProps };

export const CheckboxGroup: React.FC<CheckboxGroupProps> = (props) => {
	return <FormGroup {...props} />;
};

export { FormControlLabel, FormControlLabel as CheckboxGroupFormControlLabel, Checkbox };
export type { CheckboxProps };

