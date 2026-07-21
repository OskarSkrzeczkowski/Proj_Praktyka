import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useReactionTime } from './useReactionTime';

describe('useReactionTime', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(Math, 'random').mockReturnValue(0);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('powinno inicjalizować hooka z domyślnymi wartościami', () => {
    const { result } = renderHook(() => useReactionTime());
    expect(result.current.isGameActive).toBe(false);
  });

  it('powinno poprawnie obsłużyć falstart (Za wcześnie!)', () => {
    const { result } = renderHook(() => useReactionTime());

    act(() => result.current.startGame(60));
    
    act(() => vi.runOnlyPendingTimers()); 

    act(() => result.current.handleReaction());
    expect(result.current.feedback).toBe('Za wcześnie!');
  });

  it('powinno zarejestrować poprawne trafienie i obliczyć statystyki', () => {
    const { result } = renderHook(() => useReactionTime());

    act(() => result.current.startGame(60));
    
    act(() => vi.runOnlyPendingTimers());
    act(() => vi.runOnlyPendingTimers());
    
    act(() => vi.advanceTimersByTime(350));
    
    act(() => result.current.handleReaction());

    expect(result.current.feedback).toMatch(/Trafiono!/);
    expect(result.current.score).toBe(1);
  });

  it('powinno zarejestrować spóźnienie, gdy gracz w ogóle nie kliknie (Za późno!)', () => {
    const { result } = renderHook(() => useReactionTime());

    act(() => result.current.startGame(60));
    
    act(() => vi.runOnlyPendingTimers()); 
    act(() => vi.runOnlyPendingTimers()); 
    
    act(() => vi.runOnlyPendingTimers());

    expect(result.current.feedback).toBe('Za późno!');
    expect(result.current.misses).toBe(1);
    expect(result.current.score).toBe(0);
  });
});