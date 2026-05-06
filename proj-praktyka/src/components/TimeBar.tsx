import { useState, useEffect } from 'react';
import LinearProgress from '@mui/material/LinearProgress';

export const TimeBar = ({ totalTime }: { totalTime: number }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(0);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute top-16 left-0 w-full z-40">
      <LinearProgress 
        variant="determinate" 
        value={progress} 
        color="error"
        sx={{ 
          height: 6,
          '& .MuiLinearProgress-bar': {
            transition: `transform ${totalTime}s linear !important`,
          }
        }} 
      />
    </div>
  );
};