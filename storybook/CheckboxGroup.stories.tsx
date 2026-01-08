import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { CheckboxGroup, Checkbox, FormControlLabel } from '@multi-bu/ui';

const meta: Meta<typeof CheckboxGroup> = {
	title: 'Molecules/CheckboxGroup',
	component: CheckboxGroup,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CheckboxGroup>;

export const Default: Story = {
	render: () => (
		<CheckboxGroup>
			<FormControlLabel control={<Checkbox />} label="Option 1" />
			<FormControlLabel control={<Checkbox />} label="Option 2" />
			<FormControlLabel control={<Checkbox />} label="Option 3" />
		</CheckboxGroup>
	),
};

