import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import { toggleGroupSx } from '../lib/toggleStyles';

interface TimeListProps {
  onTimeChange: (time: string) => void;
  currentTime: string;                 
}

export const TimeList = ({ onTimeChange, currentTime }: TimeListProps) => {
  const tList = ["1 min", "1.5 min", "2 min", "3 min"];
  
  return (
    <ToggleButtonGroup
      value={currentTime}
      exclusive
      onChange={(_event, newValue) => {
        if (newValue !== null) {
          onTimeChange(newValue);
        }
      }}
      sx={{ 
        ...toggleGroupSx, 
        display: 'flex', 
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '8px'
      }}
    >
      {tList.map((timeElement) => (
        <ToggleButton key={timeElement} value={timeElement}>
          {timeElement}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};