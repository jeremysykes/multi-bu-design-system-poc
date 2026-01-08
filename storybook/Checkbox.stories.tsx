import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Checkbox, FormControlLabel } from '@multi-bu/ui';

const meta: Meta<typeof Checkbox> = {
	title: 'Atoms/Checkbox',
	component: Checkbox,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
	args: {},
};

export const Checked: Story = {
	args: {
		defaultChecked: true,
	},
};

export const WithLabel: Story = {
	render: (args) => (
		<FormControlLabel control={<Checkbox {...args} />} label="Checkbox Label" />
	),
};

