import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { StroopMenu } from './StroopMenu';
import { StroopGame } from './StroopGame';
import { StroopEnd } from './StroopEnd';
import { AnimatePresence, motion } from 'framer-motion';
import { useStroopGame } from '@clarity/game-logic';
import { DURATION_MAP, formatPercent, formatTime } from '@clarity/utils';
import { useSessionStore } from '@clarity/game-logic';
import { saveGameSession } from '@clarity/utils';

function Stroop() {
    const [selectedDuration, setSelectedDuration] = useState("1 min");
    const navigate = useNavigate();
    const game = useStroopGame();
    const { addStroopResult } = useSessionStore();
    const hasSaved = useRef(false);


    useEffect(() => {
        if (game.isGameOver && !hasSaved.current) {
            hasSaved.current = true;
            const duration = DURATION_MAP[selectedDuration] ?? 60;

            addStroopResult({
                duration: duration,
                score: game.score,
                errors: game.errors,
                efficiency: game.efficiencyValue,
                avgReactionTime: game.avgTime,
                interference: game.interference,
            });

            saveGameSession('stroop', {
                duration: duration,
                score: game.score,
                errors: game.errors,
                efficiency: game.efficiencyValue,
                avgTime: game.avgTime,
                interference: game.interference,
                congruentCount: game.congruentCount,
                incongruentCount: game.incongruentCount
            });
        }
    }, [game.isGameOver]);

    const backToMain = () => {
        hasSaved.current = false;
        game.exitGame();
        navigate('/');
    };

    const startTimer = () => {
        hasSaved.current = false;
        const seconds = DURATION_MAP[selectedDuration] ?? 60;
        game.startGame(seconds);
    };

    return (
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
            <AnimatePresence mode="wait">
                {game.isGameActive ? (
                    <motion.div key="game" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <StroopGame
                            {...game}
                            formattedTime={formatTime(game.timeLeft)}
                            efficiency={formatPercent(game.efficiencyValue)}
                            onExit={game.exitGame}
                            onAnswer={game.handleAnswer}
                        />
                    </motion.div>
                ) : game.isGameOver ? (
                    <motion.div key="end" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <StroopEnd
                            score={game.score}
                            errors={game.errors}
                            efficiency={formatPercent(game.efficiencyValue)}
                            avgTime={game.avgTime}
                            interference={game.interference}
                            congruentCount={game.congruentCount}
                            incongruentCount={game.incongruentCount}
                            onRestart={backToMain}
                        />
                    </motion.div>
                ) : (
                    <motion.div key="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <StroopMenu
                            selectedDuration={selectedDuration}
                            setSelectedDuration={setSelectedDuration}
                            onStart={startTimer}
                            onBack={() => navigate('/')}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default Stroop;