import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Slider } from '@multi-bu/ui';

const meta: Meta<typeof Slider> = {
	title: 'Molecules/Slider',
	component: Slider,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
	args: {
		defaultValue: 30,
	},
};

export const WithMarks: Story = {
	args: {
		defaultValue: 30,
		marks: true,
		min: 0,
		max: 100,
	},
};

export const Range: Story = {
	args: {
		defaultValue: [20, 37],
		valueLabelDisplay: 'auto',
	},
};

