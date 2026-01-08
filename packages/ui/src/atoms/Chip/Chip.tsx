import React from 'react';
import { Chip as MuiChip, ChipProps as MuiChipProps } from '@mui/material';

/**
 * Chip component wrapper
 * 
 * BU-agnostic chip that uses theme tokens exclusively.
 * No hardcoded colors, spacing, or typography values.
 */
export type ChipProps = MuiChipProps;

export const Chip: React.FC<ChipProps> = (props) => {
	return <MuiChip {...props} />;
};

