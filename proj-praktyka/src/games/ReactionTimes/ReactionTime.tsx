import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactionGame } from './ReactionTimeGame';
import { ReactionEnd } from './ReactionTimeEnd'
import { ReactionMenu } from './ReactionTimeMenu';
import { useReactionTime } from '../../hooks/useReactionTimeGame';
import { DURATION_MAP } from '../../utils/time';
import { useSessionStore } from '../../store/sessionStore';
import { formatTime, formatMs } from '../../utils/format'

function Reaction() {
    const game = useReactionTime();
    const { incrementReaction } = useSessionStore();
    const [selectedDuration, setSelectedDuration] = useState("1 min");

    const navigate = useNavigate();

    const startTimer = () => {
        const seconds = DURATION_MAP[selectedDuration] ?? 60;
        game.startGame(seconds);
    };

    const backToMain = () => {
        if (game.isGameOver) incrementReaction();
        game.exitGame();
        navigate('/');
    }

    const backToMenu = () => {
        navigate('/');
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
        >
            <AnimatePresence>
                {game.isGameActive ? (
                    <motion.div
                        key="game"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}>
                        <ReactionGame
                            timeLeft={game.timeLeft}
                            totalTime={game.totalTime}
                            formattedTime={formatTime(game.timeLeft)}
                            score={game.score}
                            avgTime={formatMs(game.avgTime)}
                            losses={game.misses.toString()}
                            onExit={game.exitGame}
                            displayTime={game.counter}
                            feedback={game.feedback}
                            onAnswer={game.handleReaction}
                        /></motion.div>
                ) : game.isGameOver ? (
                    <motion.div
                        key="end"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}>
                        <ReactionEnd
                            onRestart={backToMain}
                            score={game.score}
                            avgTime={formatMs(game.avgTime)}
                            misses={game.misses}
                            bTime={formatMs(game.bestTime)}
                        /></motion.div>
                ) : (
                    <motion.div
                        key="menu"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}>
                        <ReactionMenu
                            selectedDuration={selectedDuration}
                            setSelectedDuration={setSelectedDuration}
                            onStart={startTimer}
                            onBack={backToMenu}
                        /></motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
export default Reaction;