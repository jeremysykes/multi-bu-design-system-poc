import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Breadcrumbs, Link, Typography } from '@multi-bu/ui';

const meta: Meta<typeof Breadcrumbs> = {
	title: 'Molecules/Breadcrumbs',
	component: Breadcrumbs,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

export const Default: Story = {
	render: () => (
		<Breadcrumbs>
			<Link href="#">Home</Link>
			<Link href="#">Category</Link>
			<Typography color="text.primary">Current Page</Typography>
		</Breadcrumbs>
	),
};

