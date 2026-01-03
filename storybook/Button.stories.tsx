import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@multi-bu/ui';

const meta: Meta<typeof Button> = {
	title: 'Atoms/Button',
	component: Button,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
	args: {
		children: 'Primary Button',
		variant: 'contained',
		color: 'primary',
	},
};

export const Secondary: Story = {
	args: {
		children: 'Secondary Button',
		variant: 'contained',
		color: 'secondary',
	},
};

export const Outlined: Story = {
	args: {
		children: 'Outlined Button',
		variant: 'outlined',
		color: 'primary',
	},
};

export const Text: Story = {
	args: {
		children: 'Text Button',
		variant: 'text',
		color: 'primary',
	},
};
