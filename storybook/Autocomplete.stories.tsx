import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Autocomplete, TextField } from '@multi-bu/ui';

const meta: Meta<typeof Autocomplete> = {
	title: 'Molecules/Autocomplete',
	component: Autocomplete,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Autocomplete>;

const options = ['Option 1', 'Option 2', 'Option 3'];

export const Default: Story = {
	args: {
		options,
		renderInput: (params) => <TextField {...params} label="Autocomplete" />,
	} as any,
};

export const Multiple: Story = {
	args: {
		multiple: true,
		options,
		renderInput: (params) => <TextField {...params} label="Multiple Select" />,
	} as any,
};

