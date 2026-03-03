import { useState, useEffect } from 'react';
import type { ColorOption } from '../games/Stroop/Stroop';

const COLORS: ColorOption[] = [
  { name: 'CZERWONY', colorClass: 'text-red-500', btnClass: 'bg-red-900 border-red-500' },
  { name: 'NIEBIESKI', colorClass: 'text-blue-500', btnClass: 'bg-blue-900 border-blue-500' },
  { name: 'ZIELONY', colorClass: 'text-green-500', btnClass: 'bg-green-900 border-green-500' },
  { name: 'ŻÓŁTY', colorClass: 'text-yellow-400', btnClass: 'bg-yellow-900 border-yellow-500' },
];


export function useStroopGame() {
  const [isGameActive, setIsGameActive] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [totalTime, setTotalTime] = useState(60);
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [reactionTimes, setReactionTimes] = useState<number[]>([]);
  const [currentWord, setCurrentWord] = useState(COLORS[0]);
  const [currentColor, setCurrentColor] = useState(COLORS[1]);
  const [lastQuestionTimestamp, setLastQuestionTimestamp] = useState(Date.now());

  useEffect(() => {
    let timer: number;
    if (isGameActive && timeLeft > 0) {
      let lastTimestamp = Date.now();
      timer = setInterval(() => {
        const now = Date.now();
        const delta = (now - lastTimestamp) / 1000;
        lastTimestamp = now;
        setTimeLeft((prev) => {
          const nextTime = prev - delta;
          if (nextTime <= 0) {
            setIsGameActive(false);
            setIsGameOver(true);
          }
          return nextTime;
        });
      }, 50);
    }
    return () => clearInterval(timer);
  }, [isGameActive]);

  const drawNewCard = () => {
    setCurrentWord(COLORS[Math.floor(Math.random() * COLORS.length)]);
    setCurrentColor(COLORS[Math.floor(Math.random() * COLORS.length)]);
  };

  const startGame = (seconds: number) => {
    setTotalTime(seconds);
    setTimeLeft(seconds);
    setScore(0);
    setErrors(0);
    setReactionTimes([]);
    setIsGameOver(false);
    setLastQuestionTimestamp(Date.now()); // ← fix buga z timestampem
    setIsGameActive(true);
  };
    useEffect(() => {
    if(isGameActive){
      drawNewCard();
    }
  }, [isGameActive])

  const handleAnswer = (clickedName: string) => {
    const now = Date.now();
    const timeTaken = now - lastQuestionTimestamp;
    setReactionTimes((prev) => [...prev, timeTaken]);
    if (clickedName === currentColor.name) {
      setScore((s) => s + 1);
    } else {
      setErrors((e) => e + 1);
    }
    setLastQuestionTimestamp(now);
    drawNewCard();
  };

  return {
    COLORS,
    isGameActive,
    isGameOver,
    timeLeft,
    totalTime,
    score,
    errors,
    reactionTimes,
    currentWord,
    currentColor,
    startGame,
    handleAnswer,
    exitGame: () => setIsGameActive(false)
  };
}