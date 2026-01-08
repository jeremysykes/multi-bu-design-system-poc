import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@multi-bu/ui';
import { ExpandMore } from '@mui/icons-material';

const meta: Meta<typeof Accordion> = {
	title: 'Organisms/Accordion',
	component: Accordion,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
	render: () => (
		<Accordion>
			<AccordionSummary expandIcon={<ExpandMore />}>
				<Typography>Accordion 1</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Typography>Content for accordion 1 goes here.</Typography>
			</AccordionDetails>
		</Accordion>
	),
};

