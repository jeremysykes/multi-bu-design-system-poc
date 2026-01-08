import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Radio, FormControlLabel } from '@multi-bu/ui';

const meta: Meta<typeof Radio> = {
	title: 'Atoms/Radio',
	component: Radio,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
	args: {},
};

export const Checked: Story = {
	args: {
		checked: true,
	},
};

export const WithLabel: Story = {
	render: (args) => (
		<FormControlLabel control={<Radio {...args} />} label="Radio Label" value="radio" />
	),
};

