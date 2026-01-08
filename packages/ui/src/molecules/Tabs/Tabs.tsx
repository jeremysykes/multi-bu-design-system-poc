import React from 'react';
import {
	Tabs as MuiTabs,
	TabsProps as MuiTabsProps,
	Tab,
	TabProps as MuiTabProps,
} from '@mui/material';

/**
 * Tabs component wrapper
 * 
 * BU-agnostic tabs that use theme tokens exclusively.
 * No hardcoded colors, spacing, or typography values.
 */
export type TabsProps = MuiTabsProps;
export type TabProps = MuiTabProps;

export const Tabs: React.FC<TabsProps> = (props) => {
	return <MuiTabs {...props} />;
};

export { Tab };

