import { useState } from 'react';
import NBackStats from './NBackStats';
import ReactionStats from './ReactionStats';
import StroopStats from './StroopStats';
import { useNavigate } from 'react-router-dom';

function Stats() {
    const navigate = useNavigate();
    
    const [activeTab, setActiveTab] = useState('stroop');

    const backToMenu = () => {
        navigate('/');
    }

  return (
      <div className="flex flex-col gap-8 min-h-screen w-full items-center pb-10">
        
        <div className="flex justify-between items-center w-full max-w-[1000px] px-8 text-white mt-8">
            <h1 className="text-5xl font-bold">Statystyki</h1>
            <button 
              className="border-2 rounded-full px-6 py-2 bg-white/10 cursor-pointer hover:bg-white/15 transition-colors" 
              onClick={backToMenu}
            >
              Wróć
            </button>
        </div>

        <div className="flex gap-4 w-full max-w-[1000px] px-8 border-b-2 border-white/10 pb-4">
            <button 
                onClick={() => setActiveTab('stroop')} 
                className={`text-xl font-medium transition-colors cursor-pointer ${activeTab === 'stroop' ? 'text-red-400' : 'text-white/50 hover:text-white'}`}
            >
                Stroop
            </button>
            <button 
                onClick={() => setActiveTab('reaction')} 
                className={`text-xl font-medium transition-colors cursor-pointer ${activeTab === 'reaction' ? 'text-blue-400' : 'text-white/50 hover:text-white'}`}
            >
                Czujność
            </button>
            <button 
                onClick={() => setActiveTab('nback')} 
                className={`text-xl font-medium transition-colors cursor-pointer ${activeTab === 'nback' ? 'text-green-400' : 'text-white/50 hover:text-white'}`}
            >
                Tor myślenia
            </button>
        </div>

        <div className="w-full flex justify-center">
            {activeTab === 'stroop' && <StroopStats />}
            {activeTab === 'reaction' && <ReactionStats />}
            {activeTab === 'nback' && <NBackStats />}
        </div>

      </div>
  );
}
export default Stats;