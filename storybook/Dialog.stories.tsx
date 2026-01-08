import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@multi-bu/ui';

const meta: Meta<typeof Dialog> = {
	title: 'Organisms/Dialog',
	component: Dialog,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
	render: () => {
		const [open, setOpen] = useState(false);
		return (
			<>
				<Button onClick={() => setOpen(true)}>Open Dialog</Button>
				<Dialog open={open} onClose={() => setOpen(false)}>
					<DialogTitle>Dialog Title</DialogTitle>
					<DialogContent>
						<Typography>Dialog content goes here.</Typography>
					</DialogContent>
					<DialogActions>
						<Button onClick={() => setOpen(false)}>Cancel</Button>
						<Button onClick={() => setOpen(false)} variant="contained">Confirm</Button>
					</DialogActions>
				</Dialog>
			</>
		);
	},
};

