import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { List, ListItem, ListItemButton, ListItemText, ListItemIcon } from '@multi-bu/ui';
import { Inbox, Drafts } from '@mui/icons-material';

const meta: Meta<typeof List> = {
	title: 'Organisms/List',
	component: List,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof List>;

export const Default: Story = {
	render: () => (
		<List>
			<ListItem disablePadding>
				<ListItemButton>
					<ListItemIcon>
						<Inbox />
					</ListItemIcon>
					<ListItemText primary="Inbox" />
				</ListItemButton>
			</ListItem>
			<ListItem disablePadding>
				<ListItemButton>
					<ListItemIcon>
						<Drafts />
					</ListItemIcon>
					<ListItemText primary="Drafts" />
				</ListItemButton>
			</ListItem>
		</List>
	),
};

