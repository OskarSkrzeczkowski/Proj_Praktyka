import type { Meta, StoryObj } from '@storybook/react';
import { NBackGame } from './NBackGame';
import { Particles } from '../../Particles';

const meta: Meta<typeof NBackGame> = {
  title: 'Games/NBackGame',
  component: NBackGame,
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
type Story = StoryObj<typeof NBackGame>;

export const Default: Story = {
  args: {
    totalTime: 60,
    formattedTime: '00:45',
    correct: 5,
    incorrect: 1,
    efficiency: 83,
    series: 2,
    currentSymbol: 'K',
    stepIndex: 12,
    feedback: null,
    onAnswer: (match: boolean) => console.log(`Kliknięto: ${match ? 'TAK' : 'NIE'}`),
    onExit: () => console.log('Wyjście z gry'),
  },
};

export const CorrectAnswer: Story = {
  args: {
    ...Default.args,
    currentSymbol: 'A',
    stepIndex: 13,
    correct: 6,
    series: 3,
    feedback: 'Dobrze!',
  },
};

export const WrongAnswer: Story = {
  args: {
    ...Default.args,
    currentSymbol: 'X',
    stepIndex: 14,
    incorrect: 2,
    efficiency: 75,
    series: 0,
    feedback: 'Błąd!',
  },
};

export const Missed: Story = {
  args: {
    ...Default.args,
    currentSymbol: 'M',
    stepIndex: 15,
    incorrect: 3,
    series: 0,
    feedback: 'Przegapiono!',
  },
};