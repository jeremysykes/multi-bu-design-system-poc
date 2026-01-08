import React from 'react';
import { Box, Typography, Stack, Paper } from '@mui/material';
import { Card, Button, TextField, Alert } from '@multi-bu/ui';
import type { BU } from '../App';

interface OnboardingPageProps {
	buId: BU;
}

const pageTitles: Record<BU, string> = {
	'bu-a': 'Account Setup - Core Banking Platform',
	'bu-b': 'Get Started - Growth & Payments Experience',
	'bu-c': 'Welcome to Wealth Management',
};

export function OnboardingPage({ buId }: OnboardingPageProps) {
	return (
		<Box sx={{ maxWidth: 600, mx: 'auto' }}>
			<Typography variant="h4" gutterBottom>
				{pageTitles[buId]}
			</Typography>
			<Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
				Create your account to get started. All fields are required.
			</Typography>

			<Card>
				<Stack spacing={3}>
					<Alert severity="info">
						This form demonstrates how components adapt to different business unit themes.
						The same form structure looks distinct under each BU theme.
					</Alert>

					<TextField
						label="Full Name"
						placeholder="Enter your full name"
						fullWidth
						required
					/>

					<TextField
						label="Email Address"
						type="email"
						placeholder="Enter your email"
						fullWidth
						required
					/>

					<TextField
						label="Phone Number"
						type="tel"
						placeholder="Enter your phone number"
						fullWidth
						required
					/>

					<TextField
						label="Password"
						type="password"
						placeholder="Create a password"
						fullWidth
						required
					/>

					<Stack direction="row" spacing={2}>
						<Button variant="contained" color="primary" fullWidth>
							Create Account
						</Button>
						<Button variant="outlined" color="secondary" fullWidth>
							Cancel
						</Button>
					</Stack>
				</Stack>
			</Card>
		</Box>
	);
}

