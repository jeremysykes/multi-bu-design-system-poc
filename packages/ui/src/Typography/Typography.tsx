import React from 'react';
import { Typography as MuiTypography, TypographyProps as MuiTypographyProps } from '@mui/material';

/**
 * Typography component wrapper
 * 
 * BU-agnostic typography that uses theme tokens exclusively.
 * No hardcoded colors, spacing, or typography values.
 */
export type TypographyProps = MuiTypographyProps;

export const Typography: React.FC<TypographyProps> = (props) => {
	return <MuiTypography {...props} />;
};
