import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { DashboardTemplate, Card, Typography, Grid } from '@multi-bu/ui';

const meta: Meta<typeof DashboardTemplate> = {
	title: 'Templates/DashboardTemplate',
	component: DashboardTemplate,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DashboardTemplate>;

export const Default: Story = {
	args: {},
};

export const WithCustomContent: Story = {
	render: () => (
		<DashboardTemplate>
			<Grid item xs={12} md={6}>
				<Card>
					<Typography variant="h6">Custom Metric 1</Typography>
					<Typography variant="body2" color="text.secondary">
						Custom content
					</Typography>
				</Card>
			</Grid>
			<Grid item xs={12} md={6}>
				<Card>
					<Typography variant="h6">Custom Metric 2</Typography>
					<Typography variant="body2" color="text.secondary">
						Custom content
					</Typography>
				</Card>
			</Grid>
		</DashboardTemplate>
	),
};

