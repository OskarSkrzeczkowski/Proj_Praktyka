import Button from '@mui/material/Button';

interface GameButtonProps {
  label: string;
  onClick: () => void;
  variant: 'yes' | 'no';
}

export const GameButton = ({ label, onClick, variant }: GameButtonProps) => {
  const isYes = variant === 'yes';
  const bgColor = isYes ? '#169135a8' : 'rgba(127, 29, 29, 0.4)';
  const hoverBg = isYes ? '#189738' : 'rgba(127, 29, 29, 0.6)';
  const borderColor = isYes ? '#1ed14b' : '#ef4444';

  return (
    <Button 
      variant="outlined"
      onClick={onClick}
      sx={{
        flex: 1,
        height: '6rem',
        backgroundColor: bgColor,
        border: '2px solid',
        borderColor: borderColor,
        borderRadius: '1rem',
        fontWeight: 'bold',
        fontSize: '1.25rem',
        color: 'white',
        transition: 'all 0.2s ease',
        '&:hover': {
          backgroundColor: hoverBg,
          borderColor: borderColor,
        },
        '&:active': {
          transform: 'scale(0.95)',
        }
      }}
    >
      {label}
    </Button>
  );
};