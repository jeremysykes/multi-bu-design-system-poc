import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { CircularProgress, LinearProgress, Box } from '@multi-bu/ui';

const meta: Meta<typeof CircularProgress> = {
	title: 'Molecules/Progress',
	tags: ['autodocs'],
};

export default meta;

export const Circular: StoryObj<typeof CircularProgress> = {
	render: () => <CircularProgress />,
};

export const Linear: StoryObj<typeof LinearProgress> = {
	render: () => (
		<Box sx={{ width: '100%' }}>
			<LinearProgress />
		</Box>
	),
};

export const CircularWithValue: StoryObj<typeof CircularProgress> = {
	render: () => <CircularProgress value={75} variant="determinate" />,
};

export const LinearWithValue: StoryObj<typeof LinearProgress> = {
	render: () => (
		<Box sx={{ width: '100%' }}>
			<LinearProgress value={60} variant="determinate" />
		</Box>
	),
};

