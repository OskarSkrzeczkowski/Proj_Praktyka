export const toggleGroupSx = {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '24px',
    '& .MuiToggleButton-root': {
        color: 'rgba(255, 255, 255, 0.5)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        textTransform: 'none',
        padding: '4px 16px',
        '&.Mui-selected': {
            backgroundColor: '#3b82f6',
            color: 'white',
        },
        '&.Mui-selected:hover': {
            backgroundColor: '#2563eb',
        }
    }
};