import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { NBackMenu } from './NBackMenu'
import { NBackGame } from './NBackGame'
import { useNBackGame } from '../../hooks/useNBackGame'
import { useState } from 'react'
import { motion } from 'framer-motion';

function NBack() {

    const game = useNBackGame(); 
    const navigate = useNavigate();

    const [selectedDuration, setSelectedDuration] = useState("1 min");
    const [selectedLevel, setSelectedLevel] = useState("1-Back (podstawowy)");

    const startTimer = () => {
        let seconds = 60;
        if (selectedDuration === "1.5 min") seconds = 90;
        if (selectedDuration === "2 min") seconds = 120;
        if (selectedDuration === "3 min") seconds = 180;
        
        const level = parseInt(selectedLevel);
        game.startGame(seconds, level);
    };

    const formattedTime = useMemo(() => {
        const total = Math.ceil(game.timeLeft);
        return `${Math.floor(total / 60)}:${(total % 60).toString().padStart(2, '0')}`;
    }, [game.timeLeft]);

    return (
        <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
        >

            { game.isGameActive ? (
                <NBackGame 
                    timeLeft={game.timeLeft}           
                    totalTime={game.totalTime}          
                    formattedTime={formattedTime}     
                    correct={game.correct}               
                    incorrect={game.incorrect}              
                    efficiency={game.efficiency}    
                    series={game.streak}    
                    currentSymbol={game.currentSymbol}
                    onExit={game.exitGame}
                    feedback={game.feedback}
                    onAnswer={game.handleAnswer}
                />
                
            ) : game.isGameOver ? (
                <p className="text-white text-center text-2xl">Koniec!</p>
            ) : (
                <NBackMenu
                    selectedDuration={selectedDuration}
                    setSelectedDuration={setSelectedDuration}
                    selectedLevel={selectedLevel}
                    setSelectedLevel={setSelectedLevel}
                    onStart={startTimer}
                    onBack={() => navigate('/')}
                />
            )}

        </motion.div>
    );
}
export default NBack;