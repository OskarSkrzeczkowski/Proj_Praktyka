import type { Meta, StoryObj } from '@storybook/react';
import { StatCard } from './StatCard';

const meta: Meta<typeof StatCard> = {
    title: 'Statystyki/StatCard',
    component: StatCard,
    tags: ['autodocs']
};
export default meta;

type Story = StoryObj<typeof StatCard>;

export const Default: Story = {
    args: {
        label: 'Najlepsza skuteczność',
        value: 87,
        unit: '%',
        color: '#facc15', 
    },
};

export const Zero: Story = {
    args: {
        label: 'Średni czas reakcji',
        value: 0,
        unit: 'ms',
        color: '#60a5fa',
    },
};

export const LongLabel: Story = {
    args: {
        label: 'Bardzo długa etykieta która może się nie zmieścić i rozwalić kartę',
        value: 1111,
        unit: 'ms',
        color: '#f87171',
    },
};