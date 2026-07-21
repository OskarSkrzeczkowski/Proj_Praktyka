import Button from '@mui/material/Button';

interface BackButtonProps {
    onClick: () => void;
    label?: string;
}

export const BackButton = ({ onClick, label = '← Wróć' }: BackButtonProps) => (
    <Button
        variant="outlined"
        color="inherit"
        onClick={onClick}
        sx={{
            borderRadius: '8px',
            borderWidth: '2px',
            textTransform: 'none',
            '&:hover': { borderWidth: '2px', transform: 'scale(1.05)' }
        }}
    >
        {label}
    </Button>
);