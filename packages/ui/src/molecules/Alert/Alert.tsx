import React from 'react';
import { Alert as MuiAlert, AlertProps as MuiAlertProps } from '@mui/material';

/**
 * Alert component wrapper
 * 
 * BU-agnostic alert that uses theme tokens exclusively.
 * No hardcoded colors, spacing, or typography values.
 */
export type AlertProps = MuiAlertProps;

export const Alert: React.FC<AlertProps> = (props) => {
	return <MuiAlert {...props} />;
};
