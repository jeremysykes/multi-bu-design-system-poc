import type { Meta, StoryObj } from '@storybook/react';
import { LoginPage } from '@multi-bu/ui';

const meta: Meta<typeof LoginPage> = {
	title: 'Pages/LoginPage',
	component: LoginPage,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LoginPage>;

export const Default: Story = {};

