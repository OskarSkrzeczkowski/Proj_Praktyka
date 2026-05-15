import type { Meta, StoryObj } from '@storybook/react';
import { GameButton } from './GameButtonTF';

const meta: Meta<typeof GameButton> = {
    title: 'Gra/GameButton',
    component: GameButton,
    decorators: [
        (Story) => (
            <div className="w-96 bg-green-800/80 p-6 flex gap-4 rounded-xl">
                <Story />
            </div>
        ),
    ],
};
export default meta;

type Story = StoryObj<typeof GameButton>;

export const PrzyciskTak: Story = {
    args: {
        label: 'TAK',
        variant: 'yes',
    },
};

export const PrzyciskNie: Story = {
    args: {
        label: 'NIE',
        variant: 'no',
    },
};