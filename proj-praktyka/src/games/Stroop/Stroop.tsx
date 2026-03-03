import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { StroopMenu } from './StroopMenu';
import { StroopGame } from './StroopGame';
import { StroopEnd } from './StroopEnd';
import { motion } from 'framer-motion';
import { useStroopGame } from '../../hooks/useStroopGame';

export interface ColorOption { 
  name: string; 
  colorClass: string; 
  btnClass: string; 
}

function Stroop() {
  const [selectedDuration, setSelectedDuration] = useState("1 min"); //Ten stan odnosi się do wyboru czasu przez użytkownika z poziomu pola z instrukcją.
  const navigate = useNavigate(); //Narzędzie do zmiany podstron.
  const game = useStroopGame();
  
  //Funkcja, która kończy sesję gry i powodująca powrót do strony głównej.
  const backToMain = () => {
    if (game.isGameOver) {
      //Zapis, który umożiwia zapisanie odbytej sesji gry w pamięci przeglądarki, czyli taki licznik sesji.
      const saved = localStorage.getItem('stroop_sessions') || '0';
      localStorage.setItem('stroop_sessions', (parseInt(saved) + 1).toString());
    }
    game.exitGame();
    navigate('/');
  }

  //Gdy nowa gra zostaje uruchomiona następuje zerowanie licznika i ustawienie nowego czasu sesji uprzednio wybranego przez użytkownika.
  const startTimer = () => {
    let seconds = 60;
    if (selectedDuration === "1.5 min") seconds = 90;
    if (selectedDuration === "2 min") seconds = 120;
    if (selectedDuration === "3 min") seconds = 180;
    game.startGame(seconds);
  };

  // Obliczanie sumy wszystkich kliknięć oraz skuteczność
  const totalAnswers = game.score + game.errors;
  const efficiency = totalAnswers === 0 ? "0" : ((game.score / totalAnswers) * 100).toFixed(0);
  //Napis - minuty i sekundy
  const formattedTime = useMemo(() => {
  const total = Math.ceil(game.timeLeft);
  return `${Math.floor(total / 60)}:${(total % 60).toString().padStart(2, '0')}`;
  }, [game.timeLeft]);

  return (
    //Animacja przejść między podstronami
    <motion.div
      initial={{ opacity: 0, x: -20 }} 
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
    {
    //Renderowanie na podstawie stanu gry
    game.isGameActive ? (
      <StroopGame 
        {...game}
        formattedTime={formattedTime}
        efficiency={efficiency}
        onExit={game.exitGame}
        onAnswer={game.handleAnswer}
      />
    ) : game.isGameOver ? (
      <StroopEnd 
        score={game.score}
        errors={game.errors}
        efficiency={efficiency}
        reactionTimes={game.reactionTimes}
        onRestart={backToMain} 
      />
    ) : (
      <StroopMenu 
        selectedDuration={selectedDuration} 
        setSelectedDuration={setSelectedDuration} 
        onStart={startTimer} 
      />
    )}
  </motion.div>
);
}

export default Stroop;