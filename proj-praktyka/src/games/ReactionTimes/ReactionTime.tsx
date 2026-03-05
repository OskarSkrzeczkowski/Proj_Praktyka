import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ReactionGame } from './ReactionTimeGame';
import { ReactionEnd } from './ReactionTimeEnd'
import { ReactionMenu } from './ReactionTimeMenu';
import { useReactionTime } from '../../hooks/useReactionTimeGame';

function Reaction(){
    const game = useReactionTime(); 
    const [selectedDuration, setSelectedDuration] = useState("1 min");

    const navigate = useNavigate();

    const startTimer = () => {
        let seconds = 60;
        if (selectedDuration === "1.5 min") seconds = 90;
        if (selectedDuration === "2 min") seconds = 120;
        if (selectedDuration === "3 min") seconds = 180;
        
        game.startGame(seconds); 
    };

const backToMain = () => {
    if (game.isGameOver) {
      const saved = localStorage.getItem('reaction_sessions') || '0';
      localStorage.setItem('reaction_sessions', (parseInt(saved) + 1).toString());
    }
    game.exitGame();
    navigate('/');
  }

    const formattedTime = useMemo(() => {
    const total = Math.ceil(game.timeLeft);
    return `${Math.floor(total / 60)}:${(total % 60).toString().padStart(2, '0')}`;
    }, [game.timeLeft]);

    return(
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
        >
        {game.isGameActive ? (
            <ReactionGame 
                timeLeft={game.timeLeft}           
                totalTime={game.totalTime}          
                formattedTime={formattedTime}     
                score={game.score}               
                avgTime={`${game.avgTime}ms`}               
                losses={game.misses.toString()}          
                onExit={game.exitGame}
                displayTime={game.counter}
                feedback={game.feedback}
                onAnswer={game.handleReaction}
            />
    ) : game.isGameOver ? (
            <ReactionEnd 
            onRestart={backToMain}
            score={game.score}  
            avgTime={`${game.avgTime}ms`}         
            misses={game.misses}
            bTime={`${game.bestTime} ms`}
            />

    ) : (
            <ReactionMenu
                selectedDuration={selectedDuration}
                setSelectedDuration={setSelectedDuration}
                onStart={startTimer}
            />
        ) }
 </motion.div>
    );
}

export default Reaction;