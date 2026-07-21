import Button from '@mui/material/Button';

interface GameButtonProps {
  label: string;
  onClick: () => void;
  variant: 'yes' | 'no' | 'color'; 
  colorClass?: string;             
}

export const GameButton = ({ label, onClick, variant, colorClass = '' }: GameButtonProps) => {
  
  if (variant === 'color') {
    return (
      <button
        onClick={onClick}
        className={`h-24 rounded-2xl text-[20px] w-64 font-bold transition-all duration-300 hover:scale-105 cursor-pointer text-white border-none ${colorClass}`}
      >
        {label}
      </button>
    );
  }

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
        textTransform: 'none',
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