import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TimeList } from './TimeList';

const meta: Meta<typeof TimeList> = {
    title: 'Gra/TimeList',
    component: TimeList,
    decorators: [
        (Story) => (
            <div className="bg-[#033f1a] p-10 rounded-xl">
                <Story />
            </div>
        ),
    ],
};
export default meta;

type Story = StoryObj<typeof TimeList>;

const mockActiveStyle = 'bg-purple-700 shadow-lg border-2 border-purple-400 scale-105';
const mockInActiveStyle = 'bg-green-950 border-2 border-green-800 hover:bg-green-940';

export const Interactive: Story = {
    render: () => {
        const [current, setCurrent] = useState("1 min");

        return (
            <TimeList 
                activeElement={mockActiveStyle}
                inActiveElement={mockInActiveStyle}
                currentTime={current}
                onTimeChange={(newTime) => setCurrent(newTime)}
            />
        );
    }
};