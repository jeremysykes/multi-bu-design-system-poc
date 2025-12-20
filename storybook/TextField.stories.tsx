import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from '@multi-bu/ui';

const meta: Meta<typeof TextField> = {
	title: 'Components/TextField',
	component: TextField,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Default: Story = {
	args: {
		label: 'Default Text Field',
		variant: 'outlined',
	},
};

export const Filled: Story = {
	args: {
		label: 'Filled Text Field',
		variant: 'filled',
	},
};

export const WithValue: Story = {
	args: {
		label: 'Text Field with Value',
		variant: 'outlined',
		defaultValue: 'Sample text',
	},
};
