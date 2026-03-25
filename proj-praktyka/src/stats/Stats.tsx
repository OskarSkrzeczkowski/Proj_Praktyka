import ReactionStats from './ReactionStats';
import StroopStats from './StroopStats';
import { useNavigate } from 'react-router-dom';

function Stats() {
    const navigate = useNavigate();

    const backToMenu = () => {
        navigate('/');
    }
  return (
      <div className="flex flex-col gap-8 min-h-screen w-full justify-center items-center">
        <div className="flex justify-center items-center text-white mt-8">
            <h1 className="text-5xl font-bold">Statystyki</h1>
            <button className="flex relative left-24 border-4 rounded-full px-4 py-6 bg-white/10 cursor-pointer hover:bg-white/15" onClick={backToMenu}>Wróć</button>
        </div>
      <StroopStats />
      <ReactionStats /> 
      </div>
  );
}
export default Stats;