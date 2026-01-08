import React from 'react';
import {
	RadioGroup as MuiRadioGroup,
	RadioGroupProps as MuiRadioGroupProps,
	FormControlLabel,
	FormControlLabelProps,
} from '@mui/material';
import { Radio, RadioProps } from '../../atoms/Radio/Radio';

/**
 * RadioGroup component wrapper
 * 
 * BU-agnostic radio group that uses theme tokens exclusively.
 * No hardcoded colors, spacing, or typography values.
 * Composes Radio atom.
 */
export type RadioGroupProps = MuiRadioGroupProps;
export type { FormControlLabelProps as RadioGroupFormControlLabelProps };

export const RadioGroup: React.FC<RadioGroupProps> = (props) => {
	return <MuiRadioGroup {...props} />;
};

export { FormControlLabel, FormControlLabel as RadioGroupFormControlLabel, Radio };
export type { RadioProps };

