import React from 'react';
import {
	List as MuiList,
	ListProps as MuiListProps,
	ListItem,
	ListItemProps,
	ListItemText,
	ListItemTextProps,
	ListItemIcon,
	ListItemIconProps,
	ListItemButton,
	ListItemButtonProps,
} from '@mui/material';

/**
 * List component wrapper
 * 
 * BU-agnostic list that uses theme tokens exclusively.
 * No hardcoded colors, spacing, or typography values.
 */
export type ListProps = MuiListProps;
export type { ListItemProps, ListItemTextProps, ListItemIconProps, ListItemButtonProps };

export const List: React.FC<ListProps> = (props) => {
	return <MuiList {...props} />;
};

export { ListItem, ListItemText, ListItemIcon, ListItemButton };

