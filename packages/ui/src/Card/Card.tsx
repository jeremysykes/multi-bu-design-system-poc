import React from 'react';
import { Card as MuiCard, CardProps as MuiCardProps } from '@mui/material';

/**
 * Card component wrapper
 * 
 * BU-agnostic card that uses theme tokens exclusively.
 * No hardcoded colors, spacing, or typography values.
 */
export type CardProps = MuiCardProps;

export const Card: React.FC<CardProps> = ({ children, ...props }) => {
	return <MuiCard {...props}>{children}</MuiCard>;
};
