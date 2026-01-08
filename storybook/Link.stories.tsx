import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Link } from '@multi-bu/ui';

const meta: Meta<typeof Link> = {
	title: 'Atoms/Link',
	component: Link,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {
	args: {
		children: 'Link Text',
		href: '#',
	},
};

export const UnderlineAlways: Story = {
	args: {
		children: 'Always Underlined',
		href: '#',
		underline: 'always',
	},
};

export const UnderlineHover: Story = {
	args: {
		children: 'Underline on Hover',
		href: '#',
		underline: 'hover',
	},
};

export const UnderlineNone: Story = {
	args: {
		children: 'No Underline',
		href: '#',
		underline: 'none',
	},
};

