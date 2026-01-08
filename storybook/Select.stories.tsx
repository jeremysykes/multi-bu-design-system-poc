import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Select, FormControl, InputLabel, MenuItem } from '@multi-bu/ui';

const meta: Meta<typeof Select> = {
	title: 'Molecules/Select',
	component: Select,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
	render: () => (
		<FormControl fullWidth>
			<InputLabel>Select Option</InputLabel>
			<Select label="Select Option" defaultValue="">
				<MenuItem value="option1">Option 1</MenuItem>
				<MenuItem value="option2">Option 2</MenuItem>
				<MenuItem value="option3">Option 3</MenuItem>
			</Select>
		</FormControl>
	),
};

export const WithDefaultValue: Story = {
	render: () => (
		<FormControl fullWidth>
			<InputLabel>Select Option</InputLabel>
			<Select label="Select Option" defaultValue="option2">
				<MenuItem value="option1">Option 1</MenuItem>
				<MenuItem value="option2">Option 2</MenuItem>
				<MenuItem value="option3">Option 3</MenuItem>
			</Select>
		</FormControl>
	),
};

