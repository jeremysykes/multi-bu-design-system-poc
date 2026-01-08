import React from 'react';
import {
	Box,
	Typography,
	Stack,
	Divider,
	Paper,
	useTheme,
	CardContent,
} from '@mui/material';
import { Card, Button, TextField, Alert } from '@multi-bu/ui';
import type { BU } from '../App';

interface SettingsPageProps {
	buId: BU;
}

const pageTitles: Record<BU, string> = {
	'bu-a': 'Settings - Core Banking Platform',
	'bu-b': 'Settings - Growth & Payments Experience',
	'bu-c': 'Preferences - Wealth Management',
};

export function SettingsPage({ buId }: SettingsPageProps) {
	const theme = useTheme();
	return (
		<Box sx={{ maxWidth: theme.breakpoints.values.md }}>
			<Typography variant='h4' component='h1' gutterBottom>
				{pageTitles[buId]}
			</Typography>
			<Typography variant='body1' color='text.secondary' sx={{ mb: 3 }}>
				Manage your account settings and preferences.
			</Typography>

			<Stack spacing={3}>
				<Card>
					<CardContent>
						<Stack spacing={3}>
							<Typography variant='h6'>Profile Information</Typography>
							<Divider />
							<TextField
								label='Display Name'
								defaultValue='John Doe'
								fullWidth
							/>
							<TextField
								label='Email Address'
								type='email'
								defaultValue='john@example.com'
								fullWidth
							/>
							<TextField
								label='Phone Number'
								type='tel'
								defaultValue='+1 (555) 123-4567'
								fullWidth
							/>
							<Button variant='contained' color='primary'>
								Save Changes
							</Button>
						</Stack>
					</CardContent>
				</Card>

				<Card>
					<CardContent>
						<Stack spacing={3}>
							<Typography variant='h6'>Preferences</Typography>
							<Divider />
							<Alert severity='info'>
								Preferences are saved automatically when you switch business
								unit themes.
							</Alert>
							<TextField
								label='Language'
								defaultValue='English'
								fullWidth
								select
								SelectProps={{ native: true }}
							>
								<option>English</option>
								<option>Spanish</option>
								<option>French</option>
							</TextField>
							<TextField
								label='Timezone'
								defaultValue='UTC'
								fullWidth
								select
								SelectProps={{ native: true }}
							>
								<option>UTC</option>
								<option>EST</option>
								<option>PST</option>
							</TextField>
						</Stack>
					</CardContent>
				</Card>

				<Paper sx={{ p: 3 }} elevation={0}>
					<Stack spacing={2}>
						<Typography variant='h6'>Danger Zone</Typography>
						<Divider />
						<Alert severity='warning'>
							These actions cannot be undone. Please proceed with caution.
						</Alert>
						<Button variant='contained' color='error'>
							Delete Account
						</Button>
					</Stack>
				</Paper>
			</Stack>
		</Box>
	);
}
