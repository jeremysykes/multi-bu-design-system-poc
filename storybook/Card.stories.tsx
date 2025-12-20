import type { Meta, StoryObj } from '@storybook/react';
import { Card, Typography } from '@multi-bu/ui';
import { CardContent } from '@mui/material';

const meta: Meta<typeof Card> = {
	title: 'Components/Card',
	component: Card,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
	args: {
		children: (
			<CardContent>
				<Typography variant='h5' component='div'>
					Card Title
				</Typography>
				<Typography variant='body2' color='text.secondary'>
					Card content goes here. This demonstrates how the card component looks
					under both BU themes.
				</Typography>
			</CardContent>
		),
	},
};

export const Elevated: Story = {
	args: {
		elevation: 3,
		children: (
			<CardContent>
				<Typography variant='h5' component='div'>
					Elevated Card
				</Typography>
				<Typography variant='body2' color='text.secondary'>
					This card has elevation applied.
				</Typography>
			</CardContent>
		),
	},
};
