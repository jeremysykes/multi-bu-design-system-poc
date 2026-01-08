import React from 'react';
import {
	Breadcrumbs as MuiBreadcrumbs,
	BreadcrumbsProps as MuiBreadcrumbsProps,
} from '@mui/material';
import { Link, LinkProps } from '../../atoms/Link/Link';

/**
 * Breadcrumbs component wrapper
 * 
 * BU-agnostic breadcrumbs that use theme tokens exclusively.
 * No hardcoded colors, spacing, or typography values.
 * Composes Link atom.
 */
export type BreadcrumbsProps = MuiBreadcrumbsProps;

export const Breadcrumbs: React.FC<BreadcrumbsProps> = (props) => {
	return <MuiBreadcrumbs {...props} />;
};

export { Link };
export type { LinkProps };

