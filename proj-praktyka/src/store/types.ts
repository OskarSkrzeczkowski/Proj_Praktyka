export interface StroopResult {
    id: string;
    date: number;
    duration: number;
    score: number;
    errors: number;
    efficiency: number;
    avgReactionTime: number;
    interference: number;
}

export interface ReactionResult {
    id: string;
    date: number;
    duration: number;
    attempts: number[];
    misses: number;
    avgReactionTime: number;
    bestReactionTime: number;
}

export interface NBackResult {
    id: string;
    date: number;
    duration: number;
    nLevel: number;
    correct: number;
    incorrect: number;
    efficiency: number;
    avgReactionTime: number;
    bestStreak: number;
}