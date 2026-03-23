import ReactionStats from './ReactionStats';
import StroopStats from './StroopStats';

function Stats() {
  return (
    <div className="p-8 text-white min-h-screen">
      <h1 className="text-5xl font-bold mb-8 flex justify-center">Statystyki</h1>
      <div className="grid md:grid-cols-2 gap-8">
      <StroopStats />
      <ReactionStats /> 
      </div>
    </div>
  );
}
export default Stats;