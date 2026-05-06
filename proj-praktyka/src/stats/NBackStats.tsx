import { useSessionStore } from '../store/sessionStore';
import { StatCard } from './components/StatCard';
import { useState } from 'react';
import { NBackChart } from './components/NBackChart';
import { filterByDays } from '../utils/filter';
import { useMemo } from 'react';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';

const NBackStats = () => {
    const { nbackHistory, clearNBackHistory } = useSessionStore();
    const [daysFilter, setDaysFilter] = useState(7);
    const [levelFilter, setLevelFilter] = useState(1);

    const { filteredHistory, bestEfficiency, avgTime, maxStreak } = useMemo(() => {

        const filteredHistory = filterByDays(nbackHistory, daysFilter)
            .filter(session => session.nLevel === levelFilter);

        const hasData = filteredHistory.length > 0;

        const bestEfficiency = hasData 
            ? Math.max(...filteredHistory.map(session => session.efficiency)) 
            : 0;

        const avgTime = hasData
            ? Math.round(filteredHistory.reduce((acc, session) => acc + session.avgReactionTime, 0) / filteredHistory.length)
            : 0;

        const maxStreak = hasData
            ? Math.max(...filteredHistory.map(session => session.bestStreak))
            : 0;

        return { filteredHistory, bestEfficiency, avgTime, maxStreak};
    }, [nbackHistory, daysFilter, levelFilter]);

return (
    <div className="mt-6 border-2 border-white/60 rounded-4xl py-4 bg-green-600/50 w-200">
        <h2 className="text-3xl font-bold mb-4 text-white/60 flex justify-center items-center mt-4">Twoje wyniki N-Back</h2>
      
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center px-10 my-10">
            <StatCard 
                label="Najlepsza skuteczność" 
                value={bestEfficiency} 
                unit="%" 
                color="text-yellow-400" 
            />
            <StatCard 
                label="Średni czas reakcji" 
                value={avgTime} 
                unit="ms" 
                color="text-blue-400" 
            />
            <StatCard 
                label="Najlepsza seria" 
                value={maxStreak} 
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
                onClick={clearNBackHistory}
                sx={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '24px', 
                    textTransform: 'none',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'rgba(255, 255, 255, 0.5)',
                    '&:hover': {
                        color: 'rgba(255,255,255,0.7)'
                    }
                }}
            >
                Wyczyść historię
            </Button>
        </div>

        <div className="flex justify-center gap-2 mb-8">
            <ToggleButtonGroup
                value={levelFilter}
                exclusive
                onChange={(_event, newValue) => {
                    if (newValue !== null) {
                        setLevelFilter(newValue);
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
                            backgroundColor: '#3b82f6', // Niebieski dla aktywnego
                            color: 'white',
                        },
                        '&.Mui-selected:hover': {
                        backgroundColor: '#2563eb',
                        }
                    }
                }}
            >
            <ToggleButton value={1} sx={{ borderRadius: '24px 0 0 24px' }}>1-NBack</ToggleButton>
            <ToggleButton value={2}>2-NBack</ToggleButton>
            <ToggleButton value={3} sx={{ borderRadius: '0 24px 24px 0' }}>3-NBack</ToggleButton>
            </ToggleButtonGroup>
        </div>

        <div className="px-10 pb-6">
            <div className="bg-white/30 p-6 rounded-2xl border border-white/10">
                <h3 className="text-xl font-semibold mb-6 text-white/80">Trend skuteczności</h3>
                <div className="h-64 w-full">
                    <NBackChart data={filteredHistory} />
                </div>
            </div>
        </div>
    </div>

    
    );
};

export default NBackStats;