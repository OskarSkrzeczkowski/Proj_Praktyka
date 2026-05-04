import { useState, useEffect } from 'react';

export const TimeBar = ({ totalTime }: { totalTime: number }) => {
  const [width, setWidth] = useState('100%');

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth('0%');
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute top-16 left-0 w-full h-1 bg-white/10 z-40">
      <div
        className="h-full bg-red-500"
        style={{
          width: width,
          transition: `width ${totalTime}s linear`,
        }}
      />
    </div>
  );
};