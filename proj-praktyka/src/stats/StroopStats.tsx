import { useSessionStore } from '../store/sessionStore';
import { StatCard } from './components/StatCard';
import { StroopChart } from './components/StroopChart';
import { useState } from 'react';

const StroopStats = () => {
    const { stroopHistory, clearStroopHistory } = useSessionStore();
    const [daysFilter, setDaysFilter] = useState(7);

    const filteredHistory = stroopHistory.filter(session => {
        const sessionDate = new Date(session.date).toLocaleDateString('pl-PL')
        const now = new Date().toLocaleDateString('pl-PL');        

        if(daysFilter === 1){
            return sessionDate === now;
        }
        const diff = (new Date().getTime() - new Date(session.date).getTime()) / (1000 * 60 * 60 * 24);
            return diff <= daysFilter;
    });

    const hasData = filteredHistory.length > 0;

    const bestEfficiency = hasData 
        ? Math.max(...filteredHistory.map(session => session.efficiency)) 
        : 0;

    const avgInterference = hasData
        ? Math.round(filteredHistory.reduce((acc, session) => acc + session.interference, 0) / filteredHistory.length)
        : 0;

    const avgTime = hasData
        ? Math.round(filteredHistory.reduce((acc, session) => acc + session.avgReactionTime, 0) / filteredHistory.length)
        : 0;
return (
    <div className="mt-6 border-6 border-white/60 rounded-4xl py-4 bg-white/10 w-200">
        <h2 className="text-3xl font-bold mb-4 text-blue-400 flex justify-center items-center mt-4">Twoje wyniki w grze Stroop</h2>
      
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center px-10 my-10">
            <StatCard 
                label="Najlepsza skuteczność" 
                value={bestEfficiency} 
                unit="%" 
                color="text-yellow-400" 
            />
            <StatCard 
                label="Średni czas interferencji" 
                value={avgInterference} 
                unit="ms" 
                color="text-blue-400" 
            />
            <StatCard 
                label="Średni czas reakcji" 
                value={avgTime} 
                unit="ms" 
                color="text-red-400" 
            />
        </div>
        
        <div className="flex justify-center gap-2 mb-8">
            {[1, 7, 14, 30].map((days) => (
                <button
                    key={days}
                    onClick={() => setDaysFilter(days)}
                    className={`px-4 py-1 rounded-full border transition-all cursor-pointer ${
                        daysFilter === days 
                            ? 'bg-blue-500 border-blue-400 text-white' 
                            : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'
                    }`}
                >
                    {days === 1 ? 'Dziś' : `${days} dni`}
                </button>
            ))}
            <button className="bg-white/5 border-2 border-white/10 text-white/50 hover:bg-white/10 flex ml-12 justify-center items-center rounded-full px-4 py-1 cursor-pointer" onClick={clearStroopHistory}>Wyczyść historię</button>
        </div>
        

        <div className="px-10 pb-6">
            <div className="bg-white/30 p-6 rounded-2xl border border-white/10">
                <h3 className="text-xl font-semibold mb-6 text-white/80">Trend skuteczności</h3>
                <div className="h-64 w-full">
                    <StroopChart data={filteredHistory} />
                </div>
            </div>
        </div>
    </div>
    );
};

export default StroopStats;


