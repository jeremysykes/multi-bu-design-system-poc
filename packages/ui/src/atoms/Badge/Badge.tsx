import React from 'react';
import { Badge as MuiBadge, BadgeProps as MuiBadgeProps } from '@mui/material';

/**
 * Badge component wrapper
 * 
 * BU-agnostic badge that uses theme tokens exclusively.
 * No hardcoded colors, spacing, or typography values.
 */
export type BadgeProps = MuiBadgeProps;

export const Badge: React.FC<BadgeProps> = (props) => {
	return <MuiBadge {...props} />;
};

