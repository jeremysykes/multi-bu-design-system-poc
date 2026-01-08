import { Autocomplete as MuiAutocomplete, AutocompleteProps as MuiAutocompleteProps } from '@mui/material';

/**
 * Autocomplete component wrapper
 * 
 * BU-agnostic autocomplete that uses theme tokens exclusively.
 * No hardcoded colors, spacing, or typography values.
 */
export type AutocompleteProps<
	T,
	Multiple extends boolean | undefined = undefined,
	DisableClearable extends boolean | undefined = undefined,
	FreeSolo extends boolean | undefined = undefined
> = MuiAutocompleteProps<T, Multiple, DisableClearable, FreeSolo>;

export const Autocomplete = MuiAutocomplete as typeof MuiAutocomplete;

