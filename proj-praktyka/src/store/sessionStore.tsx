import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { StroopResult, ReactionResult, NBackResult } from './types';

const MAX_HISTORY = 50;

interface SessionState {
    stroopHistory: StroopResult[];
    reactionHistory: ReactionResult[];
    nbackHistory: NBackResult[];

    clearStroopHistory: () => void;
    clearReactionHistory: () => void;
    clearNBackHistory: () => void;

    addStroopResult: (result: Omit<StroopResult, 'id' | 'date'>) => void;
    addReactionResult: (result: Omit<ReactionResult, 'id' | 'date'>) => void;
    addNBackResult: (result: Omit<NBackResult, 'id' | 'date'>) => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
        stroopHistory: [],
        reactionHistory: [],
        nbackHistory: [],

        clearStroopHistory: () => set({ stroopHistory: [] }),
        clearReactionHistory: () => set({ reactionHistory: [] }),
        clearNBackHistory: () => set({ nbackHistory: [] }),

        addStroopResult: (result) => set((state) => ({
            stroopHistory: [
                {...result, id: crypto.randomUUID(), date: Date.now()},
                ...state.stroopHistory,
            ].slice(0, MAX_HISTORY),
        })),

        addReactionResult: (result) => set((state) => ({
            reactionHistory: [
                {...result, id: crypto.randomUUID(), date: Date.now()},
                ...state.reactionHistory,
            ].slice(0, MAX_HISTORY),
        })),

        addNBackResult: (result) => set((state) => ({
            nbackHistory: [
                {...result, id: crypto.randomUUID(), date: Date.now()},
                ...state.nbackHistory,
            ].slice(0, MAX_HISTORY),
        })),
    }),
    { name: 'sessions' }
  )
);