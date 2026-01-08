import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Divider, Typography, Box } from '@multi-bu/ui';

const meta: Meta<typeof Divider> = {
	title: 'Atoms/Divider',
	component: Divider,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = {
	render: () => (
		<Box sx={{ width: '100%' }}>
			<Typography>Above Divider</Typography>
			<Divider />
			<Typography>Below Divider</Typography>
		</Box>
	),
};

export const Vertical: Story = {
	render: () => (
		<Box sx={{ display: 'flex', height: 100 }}>
			<Typography>Left</Typography>
			<Divider orientation="vertical" flexItem />
			<Typography>Right</Typography>
		</Box>
	),
};

export const WithText: Story = {
	render: () => (
		<Box sx={{ width: '100%' }}>
			<Divider>
				<Typography variant="body2">OR</Typography>
			</Divider>
		</Box>
	),
};

