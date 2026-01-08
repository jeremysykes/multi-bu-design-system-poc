import { Link, useLocation } from 'react-router-dom';
import {
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Box,
	Paper,
	useTheme,
} from '@mui/material';
import { Dashboard, PersonAdd, Settings } from '@mui/icons-material';

const navItems = [
	{ path: '/', label: 'Dashboard', icon: <Dashboard /> },
	{ path: '/onboarding', label: 'Onboarding', icon: <PersonAdd /> },
	{ path: '/settings', label: 'Settings', icon: <Settings /> },
];

export function Navigation() {
	const location = useLocation();
	const theme = useTheme();

	return (
		<Paper sx={{ p: 2, minWidth: theme.spacing(25), flexShrink: 0 }}>
			<List>
				{navItems.map((item) => (
					<ListItem key={item.path} disablePadding>
						<ListItemButton
							component={Link}
							to={item.path}
							selected={location.pathname === item.path}
						>
							<Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
								{item.icon}
							</Box>
							<ListItemText primary={item.label} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Paper>
	);
}
