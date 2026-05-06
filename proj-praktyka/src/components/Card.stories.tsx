import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { Card } from './Card';
import nbackIcon from '../assets/green2.png';

const meta: Meta<typeof Card> = {
  title: 'Menu/Card',
  component: Card,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div className="w-80 p-4 border-4 rounded-xl">
          <Story />
        </div>
      </BrowserRouter>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof Card>;

export const NBack: Story = {
  args: {
    ses: '3 sesje',
    name: 'N-Back',
    aname: 'Pamięć robocza',
    desc: 'Trening pamięci roboczej i koncentracji. Poprawia zdolność skupienia uwagi.',
    img: nbackIcon,
    imgAlt: 'Ikona gry N-Back',
    path: '/n-back',
    borderCol: 'border-green-500 text-green-500', 
  },
};

export const LongDescription: Story = {
  args: {
    ses: '99 sesji',
    name: 'Niesamowicie długa nazwa gry z wieloma słowami',
    aname: 'Pamięć robocza i czas reakcji w jednym',
    desc: 'Bardzo długi tekst - Oskar Skrzeczkowski to początkujący programista, który stale rozwija się w nowych językach, technologiach aby poszerzać swoją wiedzę',
    img: nbackIcon,
    imgAlt: 'Ikona testowa',
    path: '/test-path',
    borderCol: 'border-green-500 text-green-500',
  },
};