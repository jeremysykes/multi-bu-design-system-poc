import type { Meta, StoryObj } from '@storybook/react';
import { FormLayout } from '@multi-bu/ui';
import { TextField } from '@multi-bu/ui';
import { Button } from '@multi-bu/ui';

const meta: Meta<typeof FormLayout> = {
	title: 'Templates/FormLayout',
	component: FormLayout,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FormLayout>;

export const Default: Story = {
	args: {
		children: (
			<>
				<TextField label="Email" type="email" fullWidth />
				<TextField label="Password" type="password" fullWidth />
				<Button variant="contained" color="primary" fullWidth>
					Submit
				</Button>
			</>
		),
	},
};

export const WithMultipleFields: Story = {
	args: {
		children: (
			<>
				<TextField label="First Name" fullWidth />
				<TextField label="Last Name" fullWidth />
				<TextField label="Email" type="email" fullWidth />
				<TextField label="Phone" type="tel" fullWidth />
				<Button variant="contained" color="primary" fullWidth>
					Submit
				</Button>
			</>
		),
	},
};

