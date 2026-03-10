import { useState, useEffect, useCallback } from 'react';

type GamePhase = 'IDLE' | 'PLAYING' | 'GAMEOVER';

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

    const SYMBOLS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];


    const isBufferFull = history.length > nLevel;

    const feedbackMain = (text: string) => {
        setFeedback(text);
        setTimeout(() => setFeedback(null), 1000);
    };


    const nextStep = useCallback(() => {
        const randomSymbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
        setCurrentSymbol(randomSymbol);
        setHistory(prev => [...prev, randomSymbol]);
        setFeedback(null);
    }, []);


    useEffect(() => {
        let timer: number;
        if (phase === 'PLAYING') {
            timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 0) {
                        setPhase('GAMEOVER');
                        return 0;
                    }
                    return prev - 0.1;
                });
            }, 100);
        }
        return () => clearInterval(timer);
    }, [phase]);

    const startGame = (seconds: number, level: number) => {
        setTotalTime(seconds);
        setTimeLeft(seconds);
        setNLevel(level);
        setCorrect(0);
        setIncorrect(0);
        setStreak(0);
        setHistory([]);
        setPhase('PLAYING');

        const first = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
        setHistory([first]);
        setCurrentSymbol(first);

        for (let i = 1; i <= level; i++) {
            setTimeout(() => {
                nextStep();
            }, i * 1500);
        }
    };

    const handleAnswer = (userClaimedMatch: boolean) => {
        if (phase !== 'PLAYING' || !isBufferFull) return;

        const targetSymbol = history[history.length - (nLevel + 1)];
        const isActualMatch = currentSymbol === targetSymbol;

        if (userClaimedMatch === isActualMatch) {
            setCorrect(prev => prev + 1);
            setStreak(prev => prev + 1);
            feedbackMain("Dobrze!");
        } else {
            setIncorrect(prev => prev + 1);
            setStreak(0);
            feedbackMain("Błąd!");
        }
        
        setTimeout(() =>{
            nextStep();
        }, 500);
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
        efficiency: (correct + incorrect) === 0 ? 0 : Math.round((correct / (correct + incorrect)) * 100),
        isBufferFull,
        handleAnswer,
        startGame,
        exitGame: () => setPhase('IDLE')
    };
}