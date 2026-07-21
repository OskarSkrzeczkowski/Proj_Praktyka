import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import { toggleGroupSx } from '../lib/toggleStyles';
import { NBackLevel } from '@clarity/types';

interface LevelListProps {
  onLevelChange: (level: NBackLevel) => void;
  currentLevel: NBackLevel;
}

export const LevelList = ({ onLevelChange, currentLevel }: LevelListProps) => {
  const levels = ["1-Back (podstawowy)", "2-Back (średni)", "3-Back (zaawansowany)"];

  return (
    <ToggleButtonGroup
      value={currentLevel}
      exclusive
      onChange={(_event, newValue) => {
        if (newValue !== null) {
          onLevelChange(newValue);
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
      {levels.map((levelElement) => (
        <ToggleButton key={levelElement} value={levelElement}>
          {levelElement}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};