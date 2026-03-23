import { useState, useEffect, useCallback } from 'react';

type GamePhase = 'IDLE' | 'WAITING' | 'SIGNAL' | 'GAMEOVER' | 'COOLDOWN';

export function useReactionTime() {
    const [phase, setPhase] = useState<GamePhase>('IDLE');
    const [nextSignalTime, setNextSignalTime] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);
    const [totalTime, setTotalTime] = useState(60);
    const [startTime, setStartTime] = useState<number>(0);
    const [counter, setCounter] = useState(0); // Stan ten odnosi się do czterech zer widzianych przez użytkownika na ekranie
    const [trials, setTrials] = useState<number[]>([]); // Ten stan to inaczej Tablica czasów reakcji
    const [misses, setMisses] = useState(0); //Ten stan odnosi się do ilości zaników
    const [feedback, setFeedback] = useState<string | null>(null);
    const [gameStartTime, setGameStartTime] = useState<number | null>(null);

    const validTrials = trials.filter(t => t>  0);
    const avgTime = validTrials.length > 0 
      ? Math.round(validTrials.reduce((a, b) => a + b, 0) / validTrials.length) 
      : 0;
    
    const score = trials.length;

    const bestTime = validTrials.length > 0 ? Math.min(...validTrials) : 0;

    const feedbackMain = (text: string) => {

      setFeedback(text);
      setTimeout(() => setFeedback(null), 800);
    };

    useEffect(() => {
    let interval: number;
    if (phase !== 'IDLE' && phase !== 'GAMEOVER' && gameStartTime) {
        interval = window.setInterval(() => {
            const nowPerf = performance.now();
            const nowReal = Date.now();

            const passedSeconds = (nowReal - gameStartTime) / 1000;
            const leftSeconds = totalTime - passedSeconds;

            if (leftSeconds <= 0) {
                setTimeLeft(0);
                setPhase('GAMEOVER');
            } else {
                setTimeLeft(leftSeconds);
            }

      if (phase === 'WAITING') {
                    if (nowPerf >= nextSignalTime) {
                        setPhase('SIGNAL');
                        setStartTime(nowPerf);
                    }
                }

                if (phase === 'SIGNAL') {
                    const diff = Math.floor(nowPerf - startTime);
                    setCounter(diff);
                    if (diff > 1000) {
                        setMisses(m => m + 1);
                        feedbackMain("Za późno!");
                        startNewTrial();
                    }
                }
            }, 10);
        }
        return () => clearInterval(interval);
    }, [phase, startTime, gameStartTime, totalTime, nextSignalTime]);

    const startNewTrial = useCallback(() => {
        setPhase('COOLDOWN')
        setCounter(0);
        setTimeout(() => {
          setPhase(current => {
          if(current === 'COOLDOWN'){
            setNextSignalTime(performance.now() + Math.random() * 3000 + 2000);
            return 'WAITING';
          }
          return current;
        }); }, 800);}, [])

    const startGame = (seconds: number) => {
    setGameStartTime(Date.now());
    setTotalTime(seconds);
    setTimeLeft(seconds);
    setMisses(0);
    setCounter(0);
    setTrials([]);
    startNewTrial();
  }

const handleReaction = () => {
        if (phase === 'SIGNAL') {
            const reactionTime = Math.floor(performance.now() - startTime);
            setTrials(prev => [...prev, reactionTime]);

            if (reactionTime > 600) {
            setMisses(m => m + 1);
            feedbackMain(`Za wolno! (${reactionTime} ms)`);
        } else {
            feedbackMain(`Trafiono! (${reactionTime} ms)`);
        }
            startNewTrial();
        } else if (phase === 'WAITING') {
          setTrials(prev => [...prev, 0]); 
          feedbackMain("Za wcześnie!") 
          startNewTrial(); 
        }
    };

    useEffect(() => {
        if (phase !== 'SIGNAL' && phase !== 'WAITING') return;
    
        const handleKey = (e: KeyboardEvent) => {
            if(e.code === 'Space'){
                handleReaction();
            }
        }
        window.addEventListener('keydown', handleKey);

        return () => window.removeEventListener('keydown', handleKey);
    },[phase, handleReaction])

  return {
        isGameActive: phase !== 'IDLE' && phase !=='GAMEOVER',
        isGameOver: phase === 'GAMEOVER',
        timeLeft,
        totalTime,
        counter,
        trials,
        misses,
        avgTime,
        score,
        bestTime,
        feedback,
        handleReaction,
        startGame,
        exitGame: () => setPhase('IDLE')
    };
}
