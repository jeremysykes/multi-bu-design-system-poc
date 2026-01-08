import React from 'react';
import { Radio as MuiRadio, RadioProps as MuiRadioProps } from '@mui/material';

/**
 * Radio component wrapper
 * 
 * BU-agnostic radio button that uses theme tokens exclusively.
 * No hardcoded colors, spacing, or typography values.
 */
export type RadioProps = MuiRadioProps;

export const Radio: React.FC<RadioProps> = (props) => {
	return <MuiRadio {...props} />;
};

