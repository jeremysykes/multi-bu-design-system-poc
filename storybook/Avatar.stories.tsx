import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Avatar } from '@multi-bu/ui';
import { Person } from '@mui/icons-material';

const meta: Meta<typeof Avatar> = {
	title: 'Atoms/Avatar',
	component: Avatar,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
	args: {
		children: 'AB',
	},
};

export const Image: Story = {
	args: {
		alt: 'Avatar',
		src: 'https://mui.com/static/images/avatar/1.jpg',
	},
};

export const Icon: Story = {
	args: {
		children: <Person />,
	},
};

export const ColorPrimary: Story = {
	args: {
		children: 'AB',
		sx: { bgcolor: 'primary.main' },
	},
};

export const SizeSmall: Story = {
	args: {
		children: 'AB',
		size: 'small',
	},
};

export const SizeLarge: Story = {
	args: {
		children: 'AB',
		size: 'large',
	},
};

