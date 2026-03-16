import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { NBackMenu } from './NBackMenu'
import { NBackGame } from './NBackGame'
import { useNBackGame } from '../../hooks/useNBackGame'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { NBackEnd } from './NBackEnd'

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

        const level = parseInt(selectedLevel.split('-')[0]);
        game.startGame(seconds, level);
    };

    const backToMain = () => {
        if (game.isGameOver) {
            const saved = localStorage.getItem('nback_sessions') || '0';
            localStorage.setItem('nback_sessions', (parseInt(saved) + 1).toString());
        }
        game.exitGame();
        navigate('/');
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
            <AnimatePresence mode="wait">
                {game.isGameActive ? (
                    <motion.div
                        key="game"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}>
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