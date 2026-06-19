import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { LevelList } from './LevelList';

const meta: Meta<typeof LevelList> = {
    title: 'Gra/LevelList',
    component: LevelList,
    tags: ['autodocs'],
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

export const Interactive: Story = {
    render: () => {
        const [current, setCurrent] = useState("1-Back (podstawowy)");

        return (
            <LevelList 
                currentLevel={current} 
                onLevelChange={(newLevel) => setCurrent(newLevel)} 
            />
        );
    }
};