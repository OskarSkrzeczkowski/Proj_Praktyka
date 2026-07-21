import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactionTimeGame } from './ReactionTimeGame';
import { ReactionEnd } from './ReactionTimeEnd';
import { ReactionMenu } from './ReactionTimeMenu';
import { useReactionTime, useSessionStore } from '@clarity/game-logic';
import { DURATION_MAP, formatTime, formatMs } from '@clarity/utils';
import { sessionsApi } from '@clarity/utils';

function Reaction() {
    const game = useReactionTime();
    const { addReactionResult } = useSessionStore();
    const [selectedDuration, setSelectedDuration] = useState("1 min");
    const navigate = useNavigate();
    const hasSaved = useRef(false);

    useEffect(() => {
        if (game.isGameOver && !hasSaved.current) {
            hasSaved.current = true;
            const duration = DURATION_MAP[selectedDuration] ?? 60;

            addReactionResult({
                duration: duration,
                attempts: game.trials,
                misses: game.misses,
                avgReactionTime: game.avgTime,
                bestReactionTime: game.bestTime
            });

            sessionsApi.save({
                gameType: 'reaction',
                duration: duration,
                attempts: game.trials,
                misses: game.misses,
                avgReactionTime: game.avgTime,
                bestReactionTime: game.bestTime
            });
        }
    }, [game.isGameOver, game, selectedDuration, addReactionResult]);

    const startTimer = () => {
        hasSaved.current = false;
        const seconds = DURATION_MAP[selectedDuration] ?? 60;
        game.startGame(seconds);
    };

    const backToMain = () => {
        hasSaved.current = false;
        game.exitGame();
        navigate('/');
    };

    return (
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
            <AnimatePresence mode="wait">
                {game.isGameActive ? (
                    <motion.div key="game" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <ReactionTimeGame
                            totalTime={game.totalTime}
                            formattedTime={formatTime(game.timeLeft)}
                            score={game.score}
                            avgTime={formatMs(game.avgTime)}
                            losses={game.misses}
                            onExit={game.exitGame}
                            displayTime={game.counter}
                            feedback={game.feedback}
                            onAnswer={game.handleReaction}
                        />
                    </motion.div>
                ) : game.isGameOver ? (
                    <motion.div key="end" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <ReactionEnd
                            onRestart={backToMain}
                            score={game.score}
                            avgTime={formatMs(game.avgTime)}
                            misses={game.misses}
                            bTime={formatMs(game.bestTime)}
                        />
                    </motion.div>
                ) : (
                    <motion.div key="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <ReactionMenu
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
export default Reaction;