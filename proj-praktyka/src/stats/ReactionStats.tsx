import { useSessionStore } from '../store/sessionStore';
import { StatCard } from './components/StatCard';
import { useState } from 'react';
import { ReactionChart } from './components/ReactionChart';
import { filterByDays } from '../utils/filter';
import { useMemo } from 'react';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';

const ReactionStats = () => {
    const { reactionHistory, clearReactionHistory } = useSessionStore();
    const [daysFilter, setDaysFilter] = useState(7);

    const { filteredHistory, bestAllTime, totalAvg, maxMisses } = useMemo(() => {
    
        const filteredHistory = filterByDays(reactionHistory, daysFilter);
    
        const bestAllTime = filteredHistory.length > 0
            ? Math.min(...filteredHistory.map(session => session.bestReactionTime))
            : 0;

        const totalAvg = filteredHistory.length > 0
            ? Math.round(filteredHistory.reduce((acc, session) => acc + session.avgReactionTime, 0) / filteredHistory.length)
            : 0;

        const maxMisses = filteredHistory.length > 0
            ? Math.max(...filteredHistory.map(session => session.misses))
            : 0;

        return { filteredHistory, bestAllTime, totalAvg, maxMisses };
    }, [reactionHistory, daysFilter]);

return (
    <div className="mt-6 border-2 border-white/60 rounded-4xl py-4 bg-blue-700/69 w-200">
        <h2 className="text-3xl font-bold mb-4 text-white/80 flex justify-center items-center mt-4">Twoje wyniki - Reaction Time</h2>
      
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center px-10 my-10">
            <StatCard 
                label="Najlepszy czas" 
                value={bestAllTime} 
                unit="ms" 
                color="text-yellow-400" 
            />
            <StatCard 
                label="Ogólna średnia czasu" 
                value={totalAvg} 
                unit="ms" 
                color="text-blue-400" 
            />
            <StatCard 
                label="Zaniki w najgorszej sesji" 
                value={maxMisses} 
                unit="" 
                color="text-red-400" 
            />
        </div>

        <div className="flex justify-center gap-2 mb-8">
            <ToggleButtonGroup
                value={daysFilter}
                exclusive
                onChange={(_event, newValue) => {
                    if (newValue !== null) {
                        setDaysFilter(newValue);
                    }
                }}
                sx={{
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
                }}
            >
            <ToggleButton value={1} sx={{ borderRadius: '24px 0 0 24px' }}>Dziś</ToggleButton>
            <ToggleButton value={7}>7 dni</ToggleButton>
            <ToggleButton value={14}>14 dni</ToggleButton>
            <ToggleButton value={30} sx={{ borderRadius: '0 24px 24px 0' }}>30 dni</ToggleButton>
            </ToggleButtonGroup>

            <Button 
                variant="outlined" 
                color="error" 
                onClick={clearReactionHistory}
                sx={{ 
                    borderRadius: '24px', 
                    textTransform: 'none',
                    borderColor: 'rgba(255,255,255,0.3)',
                    color: 'rgba(255,255,255,0.7)',
                    '&:hover': {
                        borderColor: 'rgba(255,255,255,0.7)',
                        color: 'rgba(255,255,255,0.7)'
                    }
                }}
            >
                Wyczyść historię
            </Button>
        </div>

        <div className="px-10 pb-6">
            <div className="bg-white/30 p-6 rounded-4xl border border-white/10">
                <h3 className="text-xl font-semibold mb-6 text-white/80">Trend skuteczności</h3>
                <div className="h-64 w-full">
                    <ReactionChart data={filteredHistory} />
                </div>
            </div>
        </div>
    </div>

    
    );
};

export default ReactionStats;