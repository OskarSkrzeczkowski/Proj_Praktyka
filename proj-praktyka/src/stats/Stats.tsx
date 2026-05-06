import { useState } from 'react';
import NBackStats from './NBackStats';
import ReactionStats from './ReactionStats';
import StroopStats from './StroopStats';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';

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
                <Button 
                    variant="outlined" 
                    color="inherit"
                    onClick={backToMenu}
                    sx={{
                        borderRadius: '50px',
                        borderWidth: '2px',
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        textTransform: 'none',
                        padding: '8px 24px',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.15)',
                            borderWidth: '2px',
                            borderColor: 'rgba(255, 255, 255, 0.3)',
                        }
                    }}
                >
                    Wróć
                </Button>
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