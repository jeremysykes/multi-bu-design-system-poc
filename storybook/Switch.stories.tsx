import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Switch, FormControlLabel } from '@multi-bu/ui';

const meta: Meta<typeof Switch> = {
	title: 'Atoms/Switch',
	component: Switch,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Switch>;

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
		<FormControlLabel control={<Switch {...args} />} label="Switch Label" />
	),
};

