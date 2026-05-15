import type { Meta, StoryObj } from '@storybook/react';
import { NBackChart } from './NBackChart';

const mockHistory = [
  { date: '2026-05-01T10:00:00', efficiency: 30 },
  { date: '2026-05-02T14:30:00', efficiency: 45 },
  { date: '2026-05-03T09:15:00', efficiency: 40 },
  { date: '2026-05-04T18:45:00', efficiency: 65 },
] as any[]; 

const meta: Meta<typeof NBackChart> = {
  title: 'Gra/NBackChart',
  component: NBackChart,
  decorators: [
    (Story) => (
      <div className="bg-[#031530] p-10 rounded-xl w-full max-w-3xl">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof NBackChart>;
export const FullChart: Story = {
  args: {
    data: mockHistory,
  },
};

export const NoData: Story = {
  args: {
    data: [ { date: '2026-05-06T16:00:00', efficiency: 50 } as any ],
  },
};