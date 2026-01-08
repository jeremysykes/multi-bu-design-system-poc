import {
	CircularProgress,
	CircularProgressProps as MuiCircularProgressProps,
	LinearProgress,
	LinearProgressProps as MuiLinearProgressProps,
} from '@mui/material';

/**
 * Progress component wrapper
 * 
 * BU-agnostic progress indicators that use theme tokens exclusively.
 * No hardcoded colors, spacing, or typography values.
 */
export type CircularProgressProps = MuiCircularProgressProps;
export type LinearProgressProps = MuiLinearProgressProps;

export { CircularProgress, LinearProgress };

