import { useState, useEffect, useCallback } from 'react';

type GamePhase = 'IDLE' | 'PLAYING' | 'GAMEOVER';
const SYMBOLS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

export function useNBackGame() {
    const [phase, setPhase] = useState<GamePhase>('IDLE');
    const [timeLeft, setTimeLeft] = useState(60);
    const [totalTime, setTotalTime] = useState(60);
    const [history, setHistory] = useState<string[]>([]);
    const [nLevel, setNLevel] = useState(1);
    const [currentSymbol, setCurrentSymbol] = useState<string | null>(null);
    const [correct, setCorrect] = useState(0);
    const [incorrect, setIncorrect] = useState(0); 
    const [streak, setStreak] = useState(0);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [startTime, setStartTime] = useState<number | null>(null);

    const [reactionTimes, setReactionTimes] = useState<number[]>([]);
    const [bestStreak, setBestStreak] = useState(0);
    const [lastStepTimestamp, setLastStepTimestamp] = useState(0);

    const [isProcessing, setIsProcessing] = useState(false);

    const avgTime = reactionTimes.length > 0 
    ? Math.round(reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length) 
    : 0;

    const canAnswer = history.length >= nLevel;

    const feedbackMain = (text: string) => {
        setFeedback(text);
        setTimeout(() => setFeedback(null), 1000);
    };

    const nextStep = useCallback(() => {
        let newSymbol;
        const shouldBeMatch = Math.random() < 0.3;

        if (shouldBeMatch && history.length >= nLevel) {
            newSymbol = history[history.length - nLevel];
        } else {
            newSymbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
        }
        setHistory(prev => [...prev, newSymbol]);
        setCurrentSymbol(newSymbol);
        setLastStepTimestamp(performance.now());
    }, []);

    useEffect(() => {
        let timer: number;
        if (phase === 'PLAYING' && startTime) {
        timer = window.setInterval(() => {
            const now = Date.now();
            const elapsedSeconds = (now - startTime) / 1000;
            const remaining = totalTime - elapsedSeconds;

            if (remaining <= 0) {
                setTimeLeft(0);
                setPhase('GAMEOVER');
                clearInterval(timer);
            } else {
                setTimeLeft(remaining);
            }
        }, 100);
        }
        return () => clearInterval(timer);
    }, [phase, startTime, totalTime]);

    const startGame = (seconds: number, level: number) => {
        const now = Date.now();
        setStartTime(now);
        setTotalTime(seconds);
        setTimeLeft(seconds);
        setNLevel(level);
        setCorrect(0);
        setIncorrect(0);
        setStreak(0);
        setHistory([]);
        setPhase('PLAYING');
        setReactionTimes([]);
        setBestStreak(0);
        setBestStreak(0);
        setIsProcessing(false);

        const startChar = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
        setCurrentSymbol(startChar);
    };

    useEffect(() => {
        if (phase !== 'PLAYING' || isProcessing) return;

        if (history.length < nLevel) {
            const timer = setTimeout(() => {
                nextStep();
            }, 1200);
        return () => clearTimeout(timer);
        }
    }, [history.length, phase, nLevel, nextStep, isProcessing]);

    const handleAnswer = (userClaimedMatch: boolean) => {
        if (phase !== 'PLAYING' || !canAnswer || isProcessing) return;

        setIsProcessing(true);

        const now = performance.now();
        const timeTaken = Math.round(now - lastStepTimestamp);
        setReactionTimes(prev => [...prev, timeTaken]);

        const targetSymbol = history[history.length - (nLevel + 1)];
        const isActualMatch = currentSymbol === targetSymbol;

        if (userClaimedMatch === isActualMatch) {
            setCorrect(prev => prev + 1);
            setStreak(prev => {
            const newStreak = prev + 1;
            if (newStreak > bestStreak) {
                setBestStreak(newStreak);
            }
            return newStreak;
            });
            feedbackMain("Dobrze!");
        } else {
            setIncorrect(prev => prev + 1);
            setStreak(0);
            feedbackMain("Błąd!");
        }
        
        setTimeout(() =>{
            nextStep();
            setIsProcessing(false);
        }, 600);
    }
    
    return {
        isGameActive: phase === 'PLAYING',
        isGameOver: phase === 'GAMEOVER',
        timeLeft,
        totalTime,
        currentSymbol,
        feedback,
        correct,
        incorrect,
        streak,
        avgTime,
        bestStreak,
        efficiency: (correct + incorrect) === 0 ? 0 : Math.round((correct / (correct + incorrect)) * 100),
        canAnswer,
        handleAnswer,
        startGame,
        exitGame: () => setPhase('IDLE')
    };
}