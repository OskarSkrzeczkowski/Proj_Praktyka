import type { Meta, StoryObj } from '@storybook/react';
import { TimeBar } from './TimeBar';

const meta: Meta<typeof TimeBar> = {
  title: 'Gra/TimeBar',
  component: TimeBar,
};
export default meta;

type Story = StoryObj<typeof TimeBar>;

export const Szybki: Story = {
  args: {
    totalTime: 5, 
  },
};

export const Standardowy: Story = {
  args: {
    totalTime: 60,
  },
};