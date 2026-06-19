import React from 'react';
import Box from '@mui/material/Box';
import { BoxProps } from '@mui/material';

interface GameBoxProps extends BoxProps {
  gameVariant: 'stroop' | 'reaction' | 'nback';
  children: React.ReactNode;
}

const gradientMap = {
  stroop: {
    background: 'linear-gradient(135deg, #4e0101 0%, #741414 50%, #af1212 100%)',
    border: '2px solid rgb(85, 7, 7)',
  },
  reaction: {
    background: 'linear-gradient(135deg, #09205e 0%, #0e3470 50%, #1d4ed8 100%)',
    border: '2px solid rgb(14, 3, 109)',
  },
  nback: {
    background: 'linear-gradient(135deg, #033f1a 0%, #055a24 50%, #15803d 100%)',
    border: '2px solid rgb(0, 46, 18)',
  },
};

export const GameBox = ({ gameVariant, children, sx, ...props }: GameBoxProps) => {
  const gameStyle = gradientMap[gameVariant];

  return (
    <Box
      {...props}
      sx={{
        ...gameStyle,
        borderRadius: '15px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
        transition: 'transform 0.2s ease-in-out',
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};