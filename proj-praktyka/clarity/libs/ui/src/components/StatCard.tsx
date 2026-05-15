import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface StatCardProps {
  label: string;
  value?: number;
  unit: string;
  color: string;
}

export const StatCard = ({ label, value, unit, color = 'text-purple-400' }: StatCardProps) => {
    return (
        <Card 
        sx={{ 
            minWidth: 150, 
            textAlign: 'center',
            bgcolor: 'rgba(255, 255, 255, 0.1)', 
            borderRadius: 2, 
            border: '2px solid rgba(255, 255, 255, 0.6)'
        }}
        >
        <CardContent sx={{ padding: '24px' }}>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', mb: 1 }}>
                {label}
            </Typography>
        
            <Typography variant="h4" sx={{ fontWeight: 'bold' }} className={color}>
                {value}
                    {unit && (
                    <Typography component="span" variant="h6" sx={{ ml: 0.5, opacity: 0.8 }}>
                        {unit}
                    </Typography>
                    )}
            </Typography>
        </CardContent>
        </Card>
    );
};