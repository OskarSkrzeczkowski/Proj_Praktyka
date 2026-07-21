import { useNavigate } from 'react-router-dom';
import { NBackMenu } from './NBackMenu';
import { NBackGame } from './NBackGame';
import { useNBackGame } from '@clarity/game-logic';
import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { NBackEnd } from './NBackEnd';
import { DURATION_MAP } from '@clarity/utils';
import { useSessionStore } from '@clarity/game-logic';
import { formatTime } from '@clarity/utils';
import { sessionsApi } from '@clarity/utils';
import { NBackLevel } from '@clarity/types';

function NBack() {
    const game = useNBackGame();
    const navigate = useNavigate();
    const { addNBackResult } = useSessionStore();

    const [selectedDuration, setSelectedDuration] = useState("1 min");
    const [selectedLevel, setSelectedLevel] = useState<NBackLevel>(NBackLevel.One);

    const hasSaved = useRef(false);

    const startTimer = () => {
        hasSaved.current = false;
        const seconds = DURATION_MAP[selectedDuration] ?? 60;
        game.startGame(seconds, selectedLevel);
    };

    useEffect(() => {
        if (game.isGameOver && !hasSaved.current) {
            hasSaved.current = true;

            const duration = DURATION_MAP[selectedDuration] ?? 60;
            const level = selectedLevel;

            addNBackResult({
                duration: duration,
                nLevel: level,
                correct: game.correct,
                incorrect: game.incorrect,
                efficiency: game.efficiency,
                avgReactionTime: game.avgTime,
                bestStreak: game.bestStreak
            });

            sessionsApi.save({
                gameType: 'nback',
                duration: duration,
                score: game.correct,
                efficiency: game.efficiency,
                avgReactionTime: game.avgTime,
                nLevel: level,
                bestStreak: game.bestStreak
            });
        }
    }, [game.isGameOver, selectedDuration, selectedLevel, game, addNBackResult]);

    const backToMain = () => {
        game.exitGame();
        navigate('/');
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
        >
            <AnimatePresence mode="wait">
                {game.isGameActive ? (
                    <motion.div
                        key="game"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}>
                        <NBackGame
                            totalTime={game.totalTime}
                            formattedTime={formatTime(game.timeLeft)}
                            correct={game.correct}
                            incorrect={game.incorrect}
                            efficiency={game.efficiency}
                            series={game.streak}
                            currentSymbol={game.currentSymbol}
                            stepIndex={game.stepIndex}
                            onExit={game.exitGame}
                            feedback={game.feedback}
                            onAnswer={game.handleAnswer}
                        />
                    </motion.div>

                ) : game.isGameOver ? (
                    <motion.div
                        key="end"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}>
                        <NBackEnd
                            score={game.correct}
                            errors={game.incorrect}
                            efficiency={game.efficiency}
                            series={game.bestStreak}
                            avgTime={game.avgTime}
                            onRestart={backToMain}
                        />
                    </motion.div>
                ) : (
                    <motion.div
                        key="menu"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}>
                        <NBackMenu
                            selectedDuration={selectedDuration}
                            setSelectedDuration={setSelectedDuration}
                            level={selectedLevel}
                            setLevel={setSelectedLevel}
                            onStart={startTimer}
                            onBack={() => navigate('/')}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default NBack;