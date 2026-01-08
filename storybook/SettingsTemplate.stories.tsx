import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { SettingsTemplate, TextField, Button, Switch, FormControlLabel } from '@multi-bu/ui';

const meta: Meta<typeof SettingsTemplate> = {
	title: 'Templates/SettingsTemplate',
	component: SettingsTemplate,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SettingsTemplate>;

export const Default: Story = {
	args: {
		sections: [
			{
				title: 'Profile',
				children: (
					<>
						<TextField label="Name" fullWidth sx={{ mb: 2 }} />
						<TextField label="Email" type="email" fullWidth sx={{ mb: 2 }} />
						<Button variant="contained">Save</Button>
					</>
				),
			},
			{
				title: 'Notifications',
				children: (
					<>
						<FormControlLabel control={<Switch />} label="Email notifications" />
					</>
				),
			},
		],
	},
};

