export function types(): string {
  return 'types';
}

export interface StroopResult {
    id: string;
    date: string;
    duration: number;
    score: number;
    errors: number;
    efficiency: number;
    avgReactionTime: number;
    interference: number;
}

export interface ReactionResult {
    id: string;
    date: string;
    duration: number;
    attempts: number[];
    misses: number;
    avgReactionTime: number;
    bestReactionTime: number;
}

export interface NBackResult {
    id: string;
    date: string;
    duration: number;
    nLevel: number;
    correct: number;
    incorrect: number;
    efficiency: number;
    avgReactionTime: number;
    bestStreak: number;
}