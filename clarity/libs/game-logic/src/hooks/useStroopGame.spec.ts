import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useStroopGame } from './useStroopGame';

describe('useStroopGame', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('inicjalizuje się w fazie IDLE z poprawnymi wartościami domyślnymi', () => {
    const { result } = renderHook(() => useStroopGame());

    expect(result.current.isGameActive).toBe(false);
    expect(result.current.isGameOver).toBe(false);
    expect(result.current.score).toBe(0);
    expect(result.current.timeLeft).toBe(60);
  });

  it('startGame ustawia fazę PLAYING i prawidłowy czas całkowity', () => {
    const { result } = renderHook(() => useStroopGame());

    act(() => {
      result.current.startGame(120);
    });

    expect(result.current.isGameActive).toBe(true);
    expect(result.current.isGameOver).toBe(false);
    expect(result.current.timeLeft).toBe(120);
    expect(result.current.totalTime).toBe(120);
    expect(result.current.score).toBe(0);
  });
});