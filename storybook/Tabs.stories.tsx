import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@multi-bu/ui';

const meta: Meta<typeof Tabs> = {
	title: 'Molecules/Tabs',
	component: Tabs,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
	render: () => {
		const [value, setValue] = useState(0);
		return (
			<Box sx={{ width: '100%' }}>
				<Tabs value={value} onChange={(_, newValue) => setValue(newValue)}>
					<Tab label="Tab 1" />
					<Tab label="Tab 2" />
					<Tab label="Tab 3" />
				</Tabs>
			</Box>
		);
	},
};

