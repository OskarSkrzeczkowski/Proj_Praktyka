import type { Meta, StoryObj } from '@storybook/react';
import { GameBox } from './gameBox';

const meta: Meta<typeof GameBox> = {
  title: 'Components/GameBox',
  component: GameBox,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['red', 'green', 'blue'],
      description: 'Wariant kolorystyczny komponentu',
    },
  },
};

export default meta;
type Story = StoryObj<typeof GameBox>;

export const Red: Story = {
  args: {
    color: 'red',
    gameVariant: 'stroop',
    children: (
      <div className="p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-2">Czerwony GameBox</h2>
        <p>Storybook kolorystyki Stroop</p>
      </div>
    ),
  },
};

export const Green: Story = {
  args: {
    color: 'green',
    gameVariant: 'nback',
    children: (
      <div className="p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-2">Zielony GameBox</h2>
        <p>Storybook kolorystyki NBack</p>
      </div>
    ),
  },
};

export const Blue: Story = {
  args: {
    color: 'blue',
    gameVariant: 'reaction',
    children: (
      <div className="p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-2">Niebieski GameBox</h2>
        <p>Storybook kolorystyki ReactionTimes</p>
      </div>
    ),
  },
};