import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { StroopMenu } from './StroopMenu';
import { StroopGame } from './StroopGame';
import { StroopEnd } from './StroopEnd';
import { motion } from 'framer-motion';

const COLORS: ColorOption[] = [
  {name: 'CZERWONY', colorClass: 'text-red-500', btnClass: 'bg-red-900 border-red-500'},
  {name: 'NIEBIESKI', colorClass: 'text-blue-500', btnClass: 'bg-blue-900 border-blue-500'},
  {name: 'ZIELONY', colorClass: 'text-green-500', btnClass: 'bg-green-900 border-green-500'},
  {name: 'ŻÓŁTY', colorClass: 'text-yellow-400', btnClass: 'bg-yellow-900 border-yellow-500'},
];

export interface ColorOption { 
  name: string; 
  colorClass: string; 
  btnClass: string; 
}

function Stroop() {
  //Stany gry.
  const [isGameActive, setIsGameActive] = useState(false); //Ten stan odnosi się do tego czy gra jest aktualnie w działaniu.
  const [timeLeft, setTimeLeft] = useState(60); //Ten stan tyczy się bieżącego czasu, czyli odliczanie.
  const [totalTime, setTotalTime] = useState(60); //Ten stan dotyczy czasu startowego danej sesji.
  const [selectedDuration, setSelectedDuration] = useState("1 min"); //Ten stan odnosi się do wyboru czasu przez użytkownika z poziomu pola z instrukcją.
  
  const [currentWord, setCurrentWord] = useState(COLORS[0]); //Ten stan dotyczy słowa wyświetlanego w grze.
  const [currentColor, setCurrentColor] = useState(COLORS[1]); //Ten stan dotyczy koloru czcionki słowa wyświetlanego w grze.
  
  const [isGameOver, setIsGameOver] = useState(false); //Ten stan odnosi się do tego czy gra się zakończyła.
  const [reactionTimes, setReactionTimes] = useState<number[]>([]); //Ten stan jest tablicą przechowującą czasy rekacji.
  const [lastQuestionTimestamp, setLastQuestionTimestamp] = useState<number>(Date.now()); //Ten stan przedstawia czas pojawienia się zadania.

  const [score, setScore] = useState(0); //Ten stan pokazuje licznik poprawnych odpowiedzi.
  const [errors, setErrors] = useState(0); //Ten stan pokazuje licznik błędnych odpowiedzi.

  const navigate = useNavigate(); //Narzędzie do zmiany podstron.
  
  //Funkcja, która kończy sesję gry i powodująca powrót do strony głównej.
  const BackToMain = () => {
    if (isGameOver) {
      //Zapis, który umożiwia zapisanie odbytej sesji gry w pamięci przeglądarki, czyli taki licznik sesji.
      const saved = localStorage.getItem('stroop_sessions') || '0';
      localStorage.setItem('stroop_sessions', (parseInt(saved) + 1).toString());
    }
    setIsGameActive(false);
    setIsGameOver(false);
    setTimeLeft(60);
    navigate('/');
  }

  useEffect(() => {
    let timer: number;
    if (isGameActive && timeLeft > 0) {
      let lastTimestamp = Date.now();
      timer = setInterval(() => {
        const now = Date.now();
        //Zmienna (delta) oblicza ile upłynęło czasu.
        const delta = (now - lastTimestamp) / 1000;
        lastTimestamp = now;
        setTimeLeft((prev) => { 
            const nextTime = prev - delta;
            if(nextTime<=0){
              setIsGameActive(false);
              setIsGameOver(true);
            }
            return nextTime;
        });
      }, 50);
    }
    //Zerowanie timera, aby zapobiec jego działaniu w tle.
    return () => clearInterval(timer);
  }, [isGameActive]);

  //Gdy nowa gra zostaje uruchomiona następuje zerowanie licznika i ustawienie nowego czasu sesji uprzednio wybranego przez użytkownika.
  const startTimer = () => {
    let seconds = 60;
    if (selectedDuration === "1.5 min") seconds = 90;
    if (selectedDuration === "2 min") seconds = 120;
    if (selectedDuration === "3 min") seconds = 180;

    setTotalTime(seconds);
    setTimeLeft(seconds);
    setScore(0); 
    setErrors(0);
    setReactionTimes([]);
    setIsGameOver(false);
    setIsGameActive(true);
    drawNewCard();
  };

  //Funkcja losująca nową kombinację słowa i koloru czcionki.
  const drawNewCard = () => {
    setCurrentWord(COLORS[Math.floor(Math.random() * COLORS.length)]);
    setCurrentColor(COLORS[Math.floor(Math.random() * COLORS.length)]);
  };

  //Funkcja, która obsługuję kliknięcie przycisku przez gracza.
  const handleAnswer = (clickedName: string) => {
    const now = Date.now();
    //Obliczanie czasu reakcji, czyli różnicy czasu pojawienia się słowa i bieżącego czasu.
    const timeTaken = now - lastQuestionTimestamp;
    setReactionTimes(prev => [...prev, timeTaken]);
    //Weryfikacja zgodności wyświetlanego koloru czcionki z odpowiedzią użytkownika.
    if (clickedName === currentColor.name) {
      setScore(s => s + 1);
    } else {
      setErrors(e => e + 1);
    }
    setLastQuestionTimestamp(now); //Odświeżenie czasu dla każdego nowo wyświetlanego słowa.
    drawNewCard();
  };

  // Obliczanie sumy wszystkich kliknięć oraz skuteczność
  const totalAnswers = score + errors;
  const efficiency = totalAnswers === 0 ? "0" : ((score / totalAnswers) * 100).toFixed(0);
  //Napis - minuty i sekundy
  const displaySecondsTotal = Math.ceil(timeLeft);
  const formattedTime = `${Math.floor(displaySecondsTotal / 60)}:${(displaySecondsTotal % 60).toString().padStart(2, '0')}`;

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
    isGameActive ? (
      <StroopGame 
        timeLeft={timeLeft} 
        totalTime={totalTime} 
        formattedTime={formattedTime}
        currentWord={currentWord}
        currentColor={currentColor}
        COLORS={COLORS}
        score={score}
        errors={errors}
        efficiency={efficiency}
        onExit={() => setIsGameActive(false)}
        onAnswer={handleAnswer}
      />
    ) : isGameOver ? (
      <StroopEnd 
        score={score}
        errors={errors}
        efficiency={efficiency}
        reactionTimes={reactionTimes}
        onRestart={BackToMain} 
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