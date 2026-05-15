import type { Meta, StoryObj } from '@storybook/react';
import { StatCard } from './StatCard';

const meta: Meta<typeof StatCard> = {
    title: 'Statystyki/StatCard',
    component: StatCard
};
export default meta;

type Story = StoryObj<typeof StatCard>;

export const Default: Story = {
    args: {
        label: 'Najlepsza skuteczność',
        value: 87,
        unit: '%',
        color: 'text-yellow-400', 
    },
};

export const Zero: Story = {
    args: {
        label: 'Średni czas reakcji',
        value: 0,
        unit: 'ms',
        color: 'text-blue-400',
    },
};

export const LongLabel: Story = {
    args: {
        label: 'Bardzo długa etykieta która może się nie zmieścić i rozwalić kartę',
        value: 1111,
        unit: 'ms',
        color: 'text-red-400',
    },
};