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
export interface CreateSessionPayload {
    gameType: 'stroop' | 'reaction' | 'nback';
    attempts?: number[];
    duration: number;
    score?: number;
    errors?: number;
    efficiency?: number;
    avgReactionTime?: number;
    interference?: number;
    nLevel?: number;
    bestStreak?: number;
    misses?: number;
    bestReactionTime?: number;
    congruentCount?: number;
    incongruentCount?: number;
}
export declare enum GameType {
    Stroop = "stroop",
    Reaction = "reaction",
    NBack = "nback"
}
export declare enum GamePhase {
    Idle = "IDLE",
    Playing = "PLAYING",
    GameOver = "GAMEOVER"
}
export declare enum Duration {
    OneMin = "1 min",
    OneAndHalfMin = "1.5 min",
    TwoMin = "2 min",
    ThreeMin = "3 min"
}
export declare enum NBackLevel {
    One = 1,
    Two = 2,
    Three = 3
}
export declare const DURATION_MAP: Record<Duration, number>;
//# sourceMappingURL=types.d.ts.map