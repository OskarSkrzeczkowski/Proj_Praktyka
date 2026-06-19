import { useState, useEffect, useCallback, useMemo } from 'react';

type GamePhase = 'IDLE' | 'WAITING' | 'SIGNAL' | 'GAMEOVER' | 'COOLDOWN';

export function useReactionTime() {
    const [phase, setPhase] = useState<GamePhase>('IDLE');
    const [nextSignalTime, setNextSignalTime] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);
    const [totalTime, setTotalTime] = useState(60);
    const [startTime, setStartTime] = useState<number>(0);
    const [counter, setCounter] = useState(0);
    const [trials, setTrials] = useState<number[]>([]);
    const [misses, setMisses] = useState(0);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [gameStartTime, setGameStartTime] = useState<number | null>(null);

    const { score, avgTime, bestTime } = useMemo(() => {
        const validTrials = trials.filter(t => t > 0);
    
        const avgTime = validTrials.length > 0 
            ? Math.round(validTrials.reduce((a, b) => a + b, 0) / validTrials.length) 
            : 0;
    
        const bestTime = validTrials.length > 0 
            ? Math.min(...validTrials) 
            : 0;

        return { score: trials.length, avgTime, bestTime };
    }, [trials]);

    const feedbackMain = useCallback((text: string) => {
        setFeedback(text);
        setTimeout(() => setFeedback(null), 800);
    }, []);

    const startNewTrial = useCallback(() => {
        setPhase('COOLDOWN');
        setCounter(0);
        setTimeout(() => {
            setPhase(current => {
                if (current === 'COOLDOWN') {
                    setNextSignalTime(performance.now() + Math.random() * 3000 + 2000);
                    return 'WAITING';
                }
                return current;
            }); 
        }, 800);
    }, []);

useEffect(() => {
        if (phase === 'IDLE' || phase === 'GAMEOVER' || !gameStartTime) return;

        const interval = window.setInterval(() => {
            const passedSeconds = (Date.now() - gameStartTime) / 1000;
            const leftSeconds = totalTime - passedSeconds;

            if (leftSeconds <= 0) {
                setTimeLeft(0);
                setPhase('GAMEOVER');
            } else {
                setTimeLeft(leftSeconds);
            }
        }, 100);

        return () => window.clearInterval(interval);
    }, [phase, gameStartTime, totalTime]);

    useEffect(() => {
        if (phase !== 'WAITING') return;

        const delay = nextSignalTime - performance.now();
        const timeout = window.setTimeout(() => {
            setPhase('SIGNAL');
            setStartTime(performance.now());
        }, Math.max(0, delay));

        return () => window.clearTimeout(timeout);
    }, [phase, nextSignalTime]);

    useEffect(() => {
        if (phase !== 'SIGNAL') return;

        const interval = window.setInterval(() => {
            setCounter(Math.floor(performance.now() - startTime));
        }, 10);

        const missTimeout = window.setTimeout(() => {
            setMisses(m => m + 1);
            feedbackMain("Za późno!");
            startNewTrial();
        }, 1000);

        return () => {
            window.clearInterval(interval);
            window.clearTimeout(missTimeout);
        };
    }, [phase, startTime, feedbackMain, startNewTrial]);

    const startGame = (seconds: number) => {
        setGameStartTime(Date.now());
        setTotalTime(seconds);
        setTimeLeft(seconds);
        setMisses(0);
        setCounter(0);
        setTrials([]);
        startNewTrial();
    };

    const handleReaction = useCallback(() => {
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
            feedbackMain("Za wcześnie!");
            startNewTrial(); 
        }
    }, [phase, startTime, feedbackMain, startNewTrial]);

    useEffect(() => {
        if (phase !== 'SIGNAL' && phase !== 'WAITING') return;
    
        const handleKey = (e: globalThis.KeyboardEvent) => {
            if (e.code === 'Space') {
                handleReaction();
            }
        };
        
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [phase, handleReaction]);

    return {
        isGameActive: phase !== 'IDLE' && phase !== 'GAMEOVER',
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