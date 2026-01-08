import React from 'react';
import { Paper as MuiPaper, PaperProps as MuiPaperProps } from '@mui/material';

/**
 * Paper component wrapper
 * 
 * BU-agnostic paper that uses theme tokens exclusively.
 * No hardcoded colors, spacing, or typography values.
 */
export type PaperProps = MuiPaperProps;

export const Paper: React.FC<PaperProps> = (props) => {
	return <MuiPaper {...props} />;
};

