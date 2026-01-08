import React from 'react';
import {
	Dialog as MuiDialog,
	DialogProps as MuiDialogProps,
	DialogTitle,
	DialogTitleProps,
	DialogContent,
	DialogContentProps,
	DialogActions,
	DialogActionsProps,
} from '@mui/material';

/**
 * Dialog component wrapper
 * 
 * BU-agnostic dialog that uses theme tokens exclusively.
 * No hardcoded colors, spacing, or typography values.
 */
export type DialogProps = MuiDialogProps;
export type { DialogTitleProps, DialogContentProps, DialogActionsProps };

export const Dialog: React.FC<DialogProps> = (props) => {
	return <MuiDialog {...props} />;
};

export { DialogTitle, DialogContent, DialogActions };

