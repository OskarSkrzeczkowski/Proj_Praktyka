import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StroopMenu } from './StroopMenu';
import { StroopGame } from './StroopGame';
import { StroopEnd } from './StroopEnd';
import { AnimatePresence, motion } from 'framer-motion';
import { useStroopGame } from '../../hooks/useStroopGame';
import { DURATION_MAP } from '../../utils/time';
import { useSessionStore } from '../../store/sessionStore';
import { formatPercent, formatTime } from '../../utils/format'


export interface ColorOption {
    name: string;
    colorClass: string;
    btnClass: string;
}

function Stroop() {
    const [selectedDuration, setSelectedDuration] = useState("1 min"); //Ten stan odnosi się do wyboru czasu przez użytkownika z poziomu pola z instrukcją.
    const navigate = useNavigate(); //Narzędzie do zmiany podstron.
    const game = useStroopGame();
    const { incrementStroop } = useSessionStore();
    //Funkcja, która kończy sesję gry i powodująca powrót do strony głównej.
    const backToMain = () => {
        if (game.isGameOver) incrementStroop();
        game.exitGame();
        navigate('/');
    }
    const backToMenu = () => {
        navigate('/');
    }

    //Gdy nowa gra zostaje uruchomiona następuje zerowanie licznika i ustawienie nowego czasu sesji uprzednio wybranego przez użytkownika.
    const startTimer = () => {
        const seconds = DURATION_MAP[selectedDuration] ?? 60;
        game.startGame(seconds);
    };

    // Obliczanie sumy wszystkich kliknięć oraz skuteczność
    const totalAnswers = game.score + game.errors;
    const efficiencyValue = totalAnswers === 0 ? 0 : Math.round((game.score / totalAnswers) * 100);

    return (
        //Animacja przejść między podstronami
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
        >
            {/*Renderowanie na podstawie stanu gry*/}
            <AnimatePresence>
                {game.isGameActive ? (
                    <motion.div
                        key="game"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}>
                        <StroopGame
                            {...game}
                            formattedTime={formatTime(game.timeLeft)}
                            efficiency={formatPercent(efficiencyValue)}
                            onExit={game.exitGame}
                            onAnswer={game.handleAnswer}
                        /></motion.div>
                ) : game.isGameOver ? (
                    <motion.div
                        key="end"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}>
                        <StroopEnd
                            score={game.score}
                            errors={game.errors}
                            efficiency={formatPercent(efficiencyValue)}
                            reactionTimes={game.reactionTimes}
                            onRestart={backToMain}
                        /></motion.div>
                ) : (
                    <motion.div
                        key="menu"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}>
                        <StroopMenu
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

export default Stroop;