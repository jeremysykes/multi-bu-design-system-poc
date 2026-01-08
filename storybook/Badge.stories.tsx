import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Badge } from '@multi-bu/ui';
import { Mail } from '@mui/icons-material';

const meta: Meta<typeof Badge> = {
	title: 'Atoms/Badge',
	component: Badge,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
	args: {
		badgeContent: 4,
		children: <Mail />,
	},
};

export const ColorPrimary: Story = {
	args: {
		badgeContent: 4,
		color: 'primary',
		children: <Mail />,
	},
};

export const ColorSecondary: Story = {
	args: {
		badgeContent: 4,
		color: 'secondary',
		children: <Mail />,
	},
};

export const ColorError: Story = {
	args: {
		badgeContent: 99,
		color: 'error',
		children: <Mail />,
	},
};

export const ShowZero: Story = {
	args: {
		badgeContent: 0,
		showZero: true,
		children: <Mail />,
	},
};

