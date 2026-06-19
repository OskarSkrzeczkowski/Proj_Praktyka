import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TimeList } from './TimeList';

const meta: Meta<typeof TimeList> = {
    title: 'Gra/TimeList',
    component: TimeList,
    tags: ['autodocs'],
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

export const Interactive: Story = {
    render: () => {
        const [current, setCurrent] = useState("1 min");

        return (
            <TimeList 
                currentTime={current}
                onTimeChange={(newTime) => setCurrent(newTime)}
            />
        );
    }
};