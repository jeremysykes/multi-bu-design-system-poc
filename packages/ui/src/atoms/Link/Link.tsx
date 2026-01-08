import React from 'react';
import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material';

/**
 * Link component wrapper
 * 
 * BU-agnostic link that uses theme tokens exclusively.
 * No hardcoded colors, spacing, or typography values.
 */
export type LinkProps = MuiLinkProps;

export const Link: React.FC<LinkProps> = (props) => {
	return <MuiLink {...props} />;
};

