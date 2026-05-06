import type { Meta, StoryObj } from '@storybook/react';
import { StroopChart } from './StroopChart';

const mockStroopData = [
    { date: '2026-05-01T10:00:00', efficiency: 40 },
    { date: '2026-05-02T14:30:00', efficiency: 55 },
    { date: '2026-05-03T09:15:00', efficiency: 60 },
    { date: '2026-05-04T18:45:00', efficiency: 100 },
] as any[]; 

const meta: Meta<typeof StroopChart> = {
    title: 'Gra/StroopChart',
    component: StroopChart,
    decorators: [
        (Story) => (
            <div className="bg-[#031530] p-10 rounded-xl w-full max-w-3xl">
                <Story />
            </div>
        ),
    ],
};
export default meta;

type Story = StoryObj<typeof StroopChart>;

export const FullChart: Story = {
    args: {
        data: mockStroopData,
    },
};

export const NoData: Story = {
    args: {
        data: [ { date: '2024-05-06T16:00:00', efficiency: 60 } as any ],
    },
};