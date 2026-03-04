import { useState, useEffect, useCallback } from 'react';


export function useReactionTime() {
    const [isGameActive, setIsGameActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60);
    const [isGameOver, setIsGameOver] = useState(false);
    const [totalTime, setTotalTime] = useState(60);

    const exitGame = () => setIsGameActive(false);

    const [isWaiting, setIsWaiting] = useState(false); // Ten stan sprawdza czy użytkownik czeka za pojawieniem się odliczających się liczb
    const [signalActive, setSignalActive] = useState(false); // Ten stan sprawdza czy licznik już wystartował
    const [startTime, setStartTime] = useState<number | null>(null);
    const [counter, setCounter] = useState(0); // Stan ten odnosi się do czterech zer widzianych przez użytkownika na ekranie
    const [trials, setTrials] = useState<number[]>([]); // Ten stan to inaczej Tablica czasów reakcji
    const [misses, setMisses] = useState(0); //Ten stan odnosi się do ilości zaników

    const score = trials.length;


    const avgTime = trials.length > 0 
      ? Math.round(trials.reduce((a, b) => a + b, 0) / trials.length) 
      : 0;

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
            setIsGameOver(true);
            setIsGameActive(false);
          }
          return nextTime;
        });
      }, 50);
    }
    return () => clearInterval(timer);
  }, [isGameActive]);

  useEffect(() => {
        let interval: number;
        if (signalActive && startTime) {
            interval = setInterval(() => {
                const diff = Math.floor(performance.now() - startTime);
                setCounter(diff);
                if (diff > 1000) {
                    handleMiss();
                }
            }, 10); 
        }
        return () => clearInterval(interval);
    }, [signalActive, startTime]);

    const startNewTrial = useCallback(() => {
        setSignalActive(false);
        setCounter(0);
        setIsWaiting(true);

        const randomDelay = Math.floor(Math.random() * 3000) + 2000;
        setTimeout(() => {
            if (isGameActive) {
                setStartTime(performance.now());
                setSignalActive(true);
                setIsWaiting(false);
            }
        }, randomDelay);
    }, [isGameActive]);

    const handleMiss = () => {
        setMisses(m => m + 1);
        startNewTrial();
    };

    const startGame = (seconds: number) => {
    setTotalTime(seconds);
    setTimeLeft(seconds);
    setIsGameOver(false);
    setIsGameActive(true);
    setTimeout(() => startNewTrial(), 500);
  }

    useEffect(() => {
      if (isGameActive && trials.length === 0 && !isWaiting && !signalActive) {
          startNewTrial();
      }
    }, [isGameActive, trials.length, isWaiting, signalActive, startNewTrial]);

    const handleReaction = useCallback(() => {
        if (!isGameActive) return;

        if (signalActive && startTime) {
            const reactionTime = Math.floor(performance.now() - startTime);
            setTrials(prev => [...prev, reactionTime]);
            startNewTrial(); 
        } 
    }, [isGameActive, signalActive, startTime, isWaiting]);

  return {
        isGameActive,
        isGameOver,
        timeLeft,
        totalTime,
        counter,
        signalActive,
        trials,
        misses,
        avgTime,
        score,
        handleReaction,
        startGame,
        exitGame
    };
}
