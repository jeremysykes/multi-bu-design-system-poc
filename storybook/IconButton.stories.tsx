import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { IconButton } from '@multi-bu/ui';
import { Delete, Favorite, Settings } from '@mui/icons-material';

const meta: Meta<typeof IconButton> = {
	title: 'Atoms/IconButton',
	component: IconButton,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'IconButton component with accessibility requirement. All icon-only buttons must provide either `aria-label` or `aria-labelledby` for screen reader compatibility (WCAG 2.2).',
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
	args: {
		children: <Delete />,
		'aria-label': 'Delete item',
	},
};

export const ColorPrimary: Story = {
	args: {
		color: 'primary',
		children: <Favorite />,
		'aria-label': 'Add to favorites',
	},
};

export const ColorSecondary: Story = {
	args: {
		color: 'secondary',
		children: <Settings />,
		'aria-label': 'Open settings',
	},
};

export const SizeSmall: Story = {
	args: {
		size: 'small',
		children: <Delete />,
		'aria-label': 'Delete item',
	},
};

export const SizeLarge: Story = {
	args: {
		size: 'large',
		children: <Delete />,
		'aria-label': 'Delete item',
	},
};

export const WithAriaLabelledBy: Story = {
	args: {
		children: <Settings />,
		'aria-labelledby': 'settings-button-label',
	},
	render: (args) => (
		<>
			<span id="settings-button-label" style={{ display: 'none' }}>
				Open settings menu
			</span>
			<IconButton {...args} />
		</>
	),
};

