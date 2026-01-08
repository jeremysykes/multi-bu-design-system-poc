import { Slider as MuiSlider, SliderProps as MuiSliderProps } from '@mui/material';

/**
 * Slider component wrapper
 * 
 * BU-agnostic slider that uses theme tokens exclusively.
 * No hardcoded colors, spacing, or typography values.
 */
export type { SliderProps } from '@mui/material';

export const Slider = MuiSlider;

