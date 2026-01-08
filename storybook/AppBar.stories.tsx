import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@multi-bu/ui';
import { Menu } from '@mui/icons-material';

const meta: Meta<typeof AppBar> = {
	title: 'Organisms/AppBar',
	component: AppBar,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AppBar>;

export const Default: Story = {
	render: () => (
		<AppBar position="static">
			<Toolbar>
				<IconButton edge="start" color="inherit" aria-label="menu">
					<Menu />
				</IconButton>
				<Typography variant="h6">App Title</Typography>
			</Toolbar>
		</AppBar>
	),
};

