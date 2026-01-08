import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@multi-bu/ui';

const meta: Meta<typeof Table> = {
	title: 'Organisms/Table',
	component: Table,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {
	render: () => (
		<Paper>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell>Email</TableCell>
						<TableCell>Role</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow>
						<TableCell>John Doe</TableCell>
						<TableCell>john@example.com</TableCell>
						<TableCell>Admin</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Jane Smith</TableCell>
						<TableCell>jane@example.com</TableCell>
						<TableCell>User</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</Paper>
	),
};

