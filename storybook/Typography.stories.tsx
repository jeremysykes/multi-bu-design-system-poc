import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from '@multi-bu/ui';

const meta: Meta<typeof Typography> = {
	title: 'Components/Typography',
	component: Typography,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Heading1: Story = {
	args: {
		variant: 'h1',
		children: 'Heading 1',
	},
};

export const Heading2: Story = {
	args: {
		variant: 'h2',
		children: 'Heading 2',
	},
};

export const Body1: Story = {
	args: {
		variant: 'body1',
		children:
			'Body text - this is the default typography variant for regular content.',
	},
};

export const Body2: Story = {
	args: {
		variant: 'body2',
		children: 'Body 2 - smaller body text for secondary content.',
	},
};
