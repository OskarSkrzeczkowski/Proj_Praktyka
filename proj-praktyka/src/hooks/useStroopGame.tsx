import { useState, useEffect, useMemo } from 'react';
import type { ColorOption } from '../games/Stroop/Stroop';

const COLORS: ColorOption[] = [
  { name: 'CZERWONY', colorClass: 'text-red-500', btnClass: 'bg-red-900 border-red-500' },
  { name: 'NIEBIESKI', colorClass: 'text-blue-500', btnClass: 'bg-blue-900 border-blue-500' },
  { name: 'ZIELONY', colorClass: 'text-green-500', btnClass: 'bg-green-900 border-green-500' },
  { name: 'ŻÓŁTY', colorClass: 'text-yellow-400', btnClass: 'bg-yellow-900 border-yellow-500' },
];
 
type GamePhase = 'IDLE' | 'PLAYING' | 'GAMEOVER';

export interface ReactionInter {
  time: number;
  wasCongruent: boolean;
}

export function useStroopGame() {
  const [timeLeft, setTimeLeft] = useState(60);
  const [totalTime, setTotalTime] = useState(60);
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [reactionTimes, setReactionTimes] = useState<ReactionInter[]>([]);
  const [currentWord, setCurrentWord] = useState(COLORS[0]);
  const [currentColor, setCurrentColor] = useState(COLORS[1]);
  const [lastQuestionTimestamp, setLastQuestionTimestamp] = useState(performance.now());
  const [phase, setPhase] = useState<GamePhase>('IDLE');
  const [gameStart, setGameStart] = useState<number | null>(null);

  const [isProcessing, setIsProcessing] = useState(false);

  const totalAnswers = score + errors;
  const efficiencyValue = totalAnswers === 0 ? 0 : Math.round((score / totalAnswers) * 100);

    const { avgTime, interference, congruentCount, incongruentCount } = useMemo(() => {

        const avgTime = reactionTimes.length > 0 
            ? Math.round(reactionTimes.reduce((a, b) => a + b.time, 0) / reactionTimes.length) 
            : 0;

        const congruent = reactionTimes.filter(r => r.wasCongruent);
        const incongruent = reactionTimes.filter(r => !r.wasCongruent);

        const avgCongruent = congruent.length > 0
            ? congruent.reduce((a, b) => a + b.time, 0) / congruent.length
            : 0;

        const avgIncongruent = incongruent.length > 0
            ? incongruent.reduce((a, b) => a + b.time, 0) / incongruent.length
            : 0;

        const interference = Math.round(avgIncongruent - avgCongruent);

        return { avgTime, interference, congruentCount: congruent.length, incongruentCount: incongruent.length };
    }, [reactionTimes]);

  useEffect(() => {
    let timer: number;
    if (phase === 'PLAYING' && gameStart) {
        timer = window.setInterval(() => {
            const nowReal = Date.now();
            
            const passed = (nowReal - gameStart) / 1000;
            const left = totalTime - passed;

            if (left <= 0) {
                setPhase('GAMEOVER');
                setTimeLeft(0);
            } else {
                setTimeLeft(left);
            }
        }, 100);
    }
    return () => clearInterval(timer);
  }, [phase, gameStart, totalTime]);

  const drawNewCard = () => {
    let nextWord, nextColor;
    
  do {
    nextWord = COLORS[Math.floor(Math.random() * COLORS.length)];
    nextColor = COLORS[Math.floor(Math.random() * COLORS.length)];
  } while (nextColor.name === currentColor.name);

    setCurrentWord(nextWord);
    setCurrentColor(nextColor);
    setLastQuestionTimestamp(performance.now());
  };

  const startGame = (seconds: number) => {
    setGameStart(Date.now());
    setTotalTime(seconds);
    setTimeLeft(seconds);
    setScore(0);
    setErrors(0);
    setReactionTimes([]);
    setLastQuestionTimestamp(performance.now());
    drawNewCard();
    setPhase('PLAYING');
  };


const handleAnswer = (clickedName: string) => {
    if (phase !== 'PLAYING' || isProcessing) return;

    const now = performance.now();
    const timeTaken = now - lastQuestionTimestamp;
    const wasCongruent = currentWord.name === currentColor.name;

    setReactionTimes(prev => [...prev, { time: timeTaken, wasCongruent }]);

    if (clickedName === currentColor.name) {
      setScore((s) => s + 1);
    } else {
      setErrors((e) => e + 1);
    }

    setIsProcessing(true);

    setTimeout(() => {
      drawNewCard();
      setIsProcessing(false);
    }, 150);
  };

    useEffect(() => {
        if (phase !== 'PLAYING') return;

        const handleKey = (e: KeyboardEvent) => {

            const keyMap: { [key: string]: number } = {
             '1': 0, // Czerwony
             '2': 1, // Niebieski
             '3': 2, // Zielony
             '4': 3  // Żółty
            };

            const colorIndex = keyMap[e.key];

            if (colorIndex !== undefined) {
                const colorName = COLORS[colorIndex].name;
                handleAnswer(colorName);
            }
        };

        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [phase, handleAnswer]);

  return {
    isGameActive: phase === 'PLAYING',
    isGameOver: phase === 'GAMEOVER',
    COLORS,
    timeLeft,
    totalTime,
    score,
    errors,
    avgTime,
    interference,
    efficiencyValue,
    congruentCount,
    incongruentCount,
    reactionTimes,
    currentWord,
    currentColor,
    isProcessing,
    startGame,
    handleAnswer,
    exitGame: () => setPhase('IDLE')
  };
}