import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from '@multi-bu/ui';

const meta: Meta<typeof Alert> = {
	title: 'Molecules/Alert',
	component: Alert,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Success: Story = {
	args: {
		severity: 'success',
		children: 'This is a success alert message.',
	},
};

export const Error: Story = {
	args: {
		severity: 'error',
		children: 'This is an error alert message.',
	},
};

export const Warning: Story = {
	args: {
		severity: 'warning',
		children: 'This is a warning alert message.',
	},
};

export const Info: Story = {
	args: {
		severity: 'info',
		children: 'This is an info alert message.',
	},
};
