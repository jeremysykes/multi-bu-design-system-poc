import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { RadioGroup, Radio, FormControlLabel } from '@multi-bu/ui';

const meta: Meta<typeof RadioGroup> = {
	title: 'Molecules/RadioGroup',
	component: RadioGroup,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
	render: () => (
		<RadioGroup defaultValue="option1">
			<FormControlLabel control={<Radio />} label="Option 1" value="option1" />
			<FormControlLabel control={<Radio />} label="Option 2" value="option2" />
			<FormControlLabel control={<Radio />} label="Option 3" value="option3" />
		</RadioGroup>
	),
};

