import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Chip } from '@multi-bu/ui';
import { Delete } from '@mui/icons-material';

const meta: Meta<typeof Chip> = {
	title: 'Atoms/Chip',
	component: Chip,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
	args: {
		label: 'Chip',
	},
};

export const ColorPrimary: Story = {
	args: {
		label: 'Primary Chip',
		color: 'primary',
	},
};

export const ColorSecondary: Story = {
	args: {
		label: 'Secondary Chip',
		color: 'secondary',
	},
};

export const Deletable: Story = {
	args: {
		label: 'Deletable Chip',
		onDelete: () => {},
	},
};

export const WithIcon: Story = {
	args: {
		label: 'With Icon',
		icon: <Delete />,
	},
};

export const VariantOutlined: Story = {
	args: {
		label: 'Outlined Chip',
		variant: 'outlined',
	},
};

