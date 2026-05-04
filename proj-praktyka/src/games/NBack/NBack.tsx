import { useNavigate } from 'react-router-dom'
import { NBackMenu } from './NBackMenu'
import { NBackGame } from './NBackGame'
import { useNBackGame } from '../../hooks/useNBackGame'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { NBackEnd } from './NBackEnd'
import { DURATION_MAP } from '../../utils/time';
import { useSessionStore } from '../../store/sessionStore';
import { formatTime } from '../../utils/format'


function NBack() {
    const game = useNBackGame();
    const navigate = useNavigate();
    const { addNBackResult } = useSessionStore();

    const [selectedDuration, setSelectedDuration] = useState("1 min");
    const [selectedLevel, setSelectedLevel] = useState("1-Back (podstawowy)");

    const startTimer = () => {
        const seconds = DURATION_MAP[selectedDuration] ?? 60;

        const level = parseInt(selectedLevel.split('-')[0]);
        game.startGame(seconds, level);
    };

    const backToMain = () => {
        if (game.isGameOver){
            addNBackResult({
                duration: DURATION_MAP[selectedDuration] ?? 60,
                nLevel: parseInt(selectedLevel.split('-')[0]),
                correct: game.correct,
                incorrect: game.incorrect,
                efficiency: game.efficiency,
                avgReactionTime: game.avgTime,
                bestStreak: game.bestStreak

            })
        }
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
                            efficiency={`${game.efficiency}%`}
                            series={game.bestStreak}
                            avgTime={`${game.avgTime} ms`}
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
                            selectedLevel={selectedLevel}
                            setSelectedLevel={setSelectedLevel}
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