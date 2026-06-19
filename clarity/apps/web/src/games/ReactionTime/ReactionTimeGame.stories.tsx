import type { Meta, StoryObj } from '@storybook/react';
import { ReactionTimeGame } from './ReactionTimeGame';
import { Particles } from '../../Particles'; 

const meta: Meta<typeof ReactionTimeGame> = {
  title: 'Games/ReactionTimeGame',
  component: ReactionTimeGame,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen w-full font-sans text-white overflow-hidden relative">
        
        <Particles />
        
        <div className="relative z-10 w-full min-h-screen">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ReactionTimeGame>;

export const Default: Story = {
  args: {
    totalTime: 60,
    formattedTime: '0:55',
    score: 3,
    avgTime: '245ms',
    losses: 0,
    displayTime: 120,
    feedback: null,
    onAnswer: () => console.log('Kliknięto w ekran!'),
    onExit: () => console.log('Wyjście z gry'),
  },
};

export const Success: Story = {
  args: {
    ...Default.args,
    feedback: 'Trafiono! 215ms',
    score: 4,
    displayTime: 0,
  },
};

export const Early: Story = {
  args: {
    ...Default.args,
    feedback: 'Za wcześnie!',
    displayTime: 0,
  },
};

export const TooSlow: Story = {
  args: {
    ...Default.args,
    feedback: 'Za wolno!',
    losses: 1,
    displayTime: 0,
  },
};