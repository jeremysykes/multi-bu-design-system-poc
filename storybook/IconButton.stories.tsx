import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { IconButton } from '@multi-bu/ui';
import { Delete, Favorite, Settings } from '@mui/icons-material';

const meta: Meta<typeof IconButton> = {
	title: 'Atoms/IconButton',
	component: IconButton,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
	args: {
		children: <Delete />,
	},
};

export const ColorPrimary: Story = {
	args: {
		color: 'primary',
		children: <Favorite />,
	},
};

export const ColorSecondary: Story = {
	args: {
		color: 'secondary',
		children: <Settings />,
	},
};

export const SizeSmall: Story = {
	args: {
		size: 'small',
		children: <Delete />,
	},
};

export const SizeLarge: Story = {
	args: {
		size: 'large',
		children: <Delete />,
	},
};

