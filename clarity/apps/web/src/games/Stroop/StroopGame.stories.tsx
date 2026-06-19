import type { Meta, StoryObj } from '@storybook/react';
import { StroopGame } from './StroopGame';

const meta: Meta<typeof StroopGame> = {
  title: 'Games/StroopGame',
  component: StroopGame,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  
  decorators: [
    (Story) => (
      <div 
        className="min-h-screen w-full font-sans text-white" 
        style={{
          background: 'linear-gradient(135deg, #020617 0%, #172554 40%, #1e40af 100%)',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof StroopGame>;

export const Default: Story = {
  args: {
    totalTime: 60,
    formattedTime: '00:45',
    score: 12,
    errors: 2,
    efficiency: '85%',
    
    currentWord: { name: 'CZERWONY', colorClass: 'text-red-500', btnClass: 'bg-red-900 border-red-500' },
    currentColor: { name: 'NIEBIESKI', colorClass: 'text-blue-500', btnClass: 'bg-blue-900 border-blue-500' },
    
    COLORS: [
      { name: 'CZERWONY', colorClass: 'text-red-500', btnClass: 'bg-red-900 border border-red-500' },
      { name: 'NIEBIESKI', colorClass: 'text-blue-500', btnClass: 'bg-blue-900 border border-blue-500' },
      { name: 'ZIELONY', colorClass: 'text-green-500', btnClass: 'bg-green-900 border border-green-500' },
      { name: 'ŻÓŁTY', colorClass: 'text-yellow-400', btnClass: 'bg-yellow-900 border border-yellow-500' },
    ],

    onAnswer: (colorName: string) => console.log(`Kliknięto odpowiedź: ${colorName}`),
    onExit: () => console.log('Kliknięto przycisk Wyjście'),
  },
};