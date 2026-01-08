import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemText, Box, Button } from '@multi-bu/ui';
import { useTheme } from '@mui/material';

const meta: Meta<typeof Drawer> = {
	title: 'Organisms/Drawer',
	component: Drawer,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Temporary: Story = {
	render: () => {
		const [open, setOpen] = useState(false);
		const theme = useTheme();
		return (
			<>
				<Button onClick={() => setOpen(true)}>Open Drawer</Button>
				<Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
					<Box sx={{ width: theme.spacing(30) }}>
						<List>
							<ListItem disablePadding>
								<ListItemButton>
									<ListItemText primary="Item 1" />
								</ListItemButton>
							</ListItem>
							<ListItem disablePadding>
								<ListItemButton>
									<ListItemText primary="Item 2" />
								</ListItemButton>
							</ListItem>
						</List>
					</Box>
				</Drawer>
			</>
		);
	},
};

