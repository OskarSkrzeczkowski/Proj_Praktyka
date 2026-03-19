import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SessionState {
  stroopSessions: number;
  reactionSessions: number;
  nbackSessions: number;
  incrementStroop: () => void;
  incrementReaction: () => void;
  incrementNBack: () => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      stroopSessions: 0,
      reactionSessions: 0,
      nbackSessions: 0,
      incrementStroop: () => set((state) => ({ stroopSessions: state.stroopSessions + 1 })),
      incrementReaction: () => set((state) => ({ reactionSessions: state.reactionSessions + 1 })),
      incrementNBack: () => set((state) => ({ nbackSessions: state.nbackSessions + 1 })),
    }),
    { name: 'session-storage' }
  )
);