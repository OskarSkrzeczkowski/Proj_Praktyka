import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { LevelList } from './LevelList';

const meta: Meta<typeof LevelList> = {
    title: 'Gra/LevelList',
    component: LevelList,
    decorators: [
        (Story) => (
            <div className="bg-green-800 p-10 rounded-xl">
                <Story />
            </div>
        ),
    ],
};
export default meta;

type Story = StoryObj<typeof LevelList>;

const mockActiveStyle = 'bg-purple-700 shadow-lg border-2 border-purple-400 scale-105';
const mockInActiveStyle = 'bg-green-950 border-2 border-green-800 hover:bg-green-940';

export const Interactive: Story = {
    render: () => {
        const [current, setCurrent] = useState("1-Back (podstawowy)");

        return (
            <LevelList 
                activeElement={mockActiveStyle}
                inActiveElement={mockInActiveStyle}
                currentLevel={current} 
                onLevelChange={(newLevel) => setCurrent(newLevel)} 
            />
        );
    }
};