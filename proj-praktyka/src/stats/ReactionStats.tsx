import { useSessionStore } from '../store/sessionStore';
import { StatCard } from './components/StatCard';

const ReactionStats = () => {
    const { reactionHistory } = useSessionStore();

    if(reactionHistory.length === 0) {
        return <p className="text-white/50">Brak danych</p>;
    }
  
    const bestAllTime = Math.min(...reactionHistory.map(s => s.bestReactionTime));

    const totalAvg = Math.round(
        reactionHistory.reduce((acc, s) => acc + s.avgReactionTime, 0) / reactionHistory.length
    );

    const totalAttempts = reactionHistory.reduce((acc, s) => acc + s.attempts.length, 0);

    const totalMisses = reactionHistory.reduce((acc, s) => acc + s.misses, 0);

return (
    <div className="mt-6 border-6 border-white/60 rounded-lg py-4 ">
        <h2 className="text-3xl font-bold mb-4 text-blue-400 flex justify-center items-center mt-4">Twoje wyniki w grze ReactionTimes</h2>
      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center px-20 my-10">
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
                label="Wszystkie kliknięcia" 
                value={totalAttempts} 
                unit="" 
                color="text-green-400" 
            />
            <StatCard 
                label="Ilość zaników" 
                value={totalMisses} 
                unit="" 
                color="text-red-400" 
            />
        </div>
    </div>
    );
};

export default ReactionStats;