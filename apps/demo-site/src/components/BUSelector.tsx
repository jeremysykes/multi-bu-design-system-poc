import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import type { BU } from '../App';

interface BUSelectorProps {
	selectedBU: BU;
	onChange: (bu: BU) => void;
}

export function BUSelector({ selectedBU, onChange }: BUSelectorProps) {
	return (
		<Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
			<Tabs
				value={selectedBU}
				onChange={(_, newValue) => onChange(newValue as BU)}
				aria-label="Business unit selector"
			>
				<Tab label="Core Banking Platform" value="bu-a" />
				<Tab label="Growth & Payments Experience" value="bu-b" />
				<Tab label="Wealth Management" value="bu-c" />
			</Tabs>
		</Box>
	);
}

