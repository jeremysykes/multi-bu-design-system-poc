import React from 'react';
import { Box, Typography, Grid, Paper, Stack } from '@mui/material';
import { Card, Button } from '@multi-bu/ui';
import type { BU } from '../App';

interface DashboardPageProps {
	buId: BU;
}

const pageTitles: Record<BU, string> = {
	'bu-a': 'Core Banking Platform - Dashboard',
	'bu-b': 'Growth & Payments Experience - Dashboard',
	'bu-c': 'Wealth Advisory Dashboard',
};

export function DashboardPage({ buId }: DashboardPageProps) {
	return (
		<Box>
			<Typography variant="h4" gutterBottom>
				{pageTitles[buId]}
			</Typography>
			<Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
				This dashboard demonstrates the design system at application scale. Switch between
				business units using the tabs above to see how the same components express different
				brand identities.
			</Typography>

			<Grid container spacing={3}>
				<Grid item xs={12} md={4}>
					<Card>
						<Stack spacing={2}>
							<Typography variant="h6">Overview</Typography>
							<Typography variant="body2" color="text.secondary">
								Total Accounts
							</Typography>
							<Typography variant="h4">1,234</Typography>
							<Button variant="contained" color="primary" size="small">
								View Details
							</Button>
						</Stack>
					</Card>
				</Grid>

				<Grid item xs={12} md={4}>
					<Card>
						<Stack spacing={2}>
							<Typography variant="h6">Activity</Typography>
							<Typography variant="body2" color="text.secondary">
								Recent Transactions
							</Typography>
							<Typography variant="h4">$12,345</Typography>
							<Button variant="outlined" color="primary" size="small">
								View Activity
							</Button>
						</Stack>
					</Card>
				</Grid>

				<Grid item xs={12} md={4}>
					<Card>
						<Stack spacing={2}>
							<Typography variant="h6">Performance</Typography>
							<Typography variant="body2" color="text.secondary">
								This Month
							</Typography>
							<Typography variant="h4">+5.2%</Typography>
							<Button variant="text" color="primary" size="small">
								View Report
							</Button>
						</Stack>
					</Card>
				</Grid>

				<Grid item xs={12}>
					<Paper sx={{ p: 3 }}>
						<Typography variant="h6" gutterBottom>
							Quick Actions
						</Typography>
						<Stack direction="row" spacing={2} flexWrap="wrap">
							<Button variant="contained" color="primary">
								Primary Action
							</Button>
							<Button variant="contained" color="secondary">
								Secondary Action
							</Button>
							<Button variant="outlined" color="primary">
								Tertiary Action
							</Button>
						</Stack>
					</Paper>
				</Grid>
			</Grid>
		</Box>
	);
}

