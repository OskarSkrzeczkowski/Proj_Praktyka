import { useSessionStore } from '../store/sessionStore';
import { StatCard } from './components/StatCard';

const StroopStats = () => {
    const { stroopHistory } = useSessionStore();

    if(stroopHistory.length === 0) {
        return <p className="text-white/50">Brak danych</p>;
    }
  
    const bestEfficiency = Math.max(...stroopHistory.map(s => s.efficiency));

    const avgInterference = Math.round(
        stroopHistory.reduce((acc, s) => acc + s.interference, 0) / stroopHistory.length
    );

    const totalScore = stroopHistory.reduce((acc, s) => acc + s.score, 0);

    const avgTime = Math.round(
        stroopHistory.reduce((acc, s) => acc + s.avgReactionTime, 0) / stroopHistory.length
    );
return (
    <div className="mt-6 border-6 border-white/60 rounded-lg py-4">
        <h2 className="text-3xl font-bold mb-4 text-blue-400 flex justify-center items-center mt-4">Twoje wyniki w grze Stroop</h2>
      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center px-20 my-10">
            <StatCard 
                label="Skuteczność" 
                value={bestEfficiency} 
                unit="%" 
                color="text-yellow-400" 
            />
            <StatCard 
                label="Średni czas inteferencji" 
                value={avgInterference} 
                unit="ms" 
                color="text-blue-400" 
            />
            <StatCard 
                label="Suma punktów" 
                value={totalScore} 
                unit="pkt" 
                color="text-green-400" 
            />
            <StatCard 
                label="Średni czas reakcji" 
                value={avgTime} 
                unit="" 
                color="text-red-400" 
            />
        </div>
    </div>
    );
};

export default StroopStats;