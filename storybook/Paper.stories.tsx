import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Paper, Typography, Box } from '@multi-bu/ui';

const meta: Meta<typeof Paper> = {
	title: 'Organisms/Paper',
	component: Paper,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Paper>;

export const Default: Story = {
	render: () => (
		<Box sx={{ p: 2 }}>
			<Paper sx={{ p: 2 }}>
				<Typography>Paper content goes here.</Typography>
			</Paper>
		</Box>
	),
};

export const WithElevation: Story = {
	render: () => (
		<Box sx={{ p: 2 }}>
			<Paper elevation={3} sx={{ p: 2 }}>
				<Typography>Paper with elevation.</Typography>
			</Paper>
		</Box>
	),
};

