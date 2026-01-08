import React from 'react';
import { Avatar as MuiAvatar, AvatarProps as MuiAvatarProps } from '@mui/material';

/**
 * Avatar component wrapper
 * 
 * BU-agnostic avatar that uses theme tokens exclusively.
 * No hardcoded colors, spacing, or typography values.
 */
export type AvatarProps = MuiAvatarProps;

export const Avatar: React.FC<AvatarProps> = (props) => {
	return <MuiAvatar {...props} />;
};

