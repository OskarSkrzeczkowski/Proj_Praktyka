import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useNBackGame } from './useNBackGame';
import { GamePhase } from '@clarity/types';

describe('useNBackGame', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('powinno inicjalizować hooka z domyślnymi wartościami', () => {
    const { result } = renderHook(() => useNBackGame());

    expect(result.current.isGameActive).toBe(false);
    expect(result.current.canAnswer).toBe(false);
    expect(result.current.correct).toBe(0);
    expect(result.current.incorrect).toBe(0);
    expect(result.current.streak).toBe(0);
  });

  it('powinno prawidłowo zbudować historię (buildup) przed pozwoleniem na odpowiedź (N=1)', () => {
    const { result } = renderHook(() => useNBackGame());

    act(() => {
      result.current.startGame(60, 1);
    });


    expect(result.current.canAnswer).toBe(false);

    act(() => {
      vi.runOnlyPendingTimers();
    });

    expect(result.current.canAnswer).toBe(true);
    expect(result.current.stepIndex).toBe(1);
  });

  it('powinno poprawnie zarejestrować dobrą odpowiedź (dopasowanie)', () => {

    vi.spyOn(Math, 'random').mockReturnValue(0.1);

    const { result } = renderHook(() => useNBackGame());

    act(() => {
      result.current.startGame(60, 1);
    });

    act(() => {
      vi.runOnlyPendingTimers();
    });

    act(() => {
      vi.advanceTimersByTime(400);
      result.current.handleAnswer(true);
    });

    expect(result.current.feedback).toBe('Dobrze!');
    expect(result.current.correct).toBe(1);
    expect(result.current.streak).toBe(1);
    expect(result.current.efficiency).toBe(100);
  });

  it('powinno poprawnie zarejestrować błąd i zresetować serię (streak)', () => {

    vi.spyOn(Math, 'random')
      .mockReturnValueOnce(0.1) 
      .mockReturnValueOnce(0.9) 
      .mockReturnValueOnce(0.9);

    const { result } = renderHook(() => useNBackGame());

    act(() => {
      result.current.startGame(60, 1);
    });

    act(() => {
      vi.runOnlyPendingTimers();
    });

    act(() => {
      result.current.handleAnswer(true);
    });

    expect(result.current.feedback).toBe('Błąd!');
    expect(result.current.incorrect).toBe(1);
    expect(result.current.streak).toBe(0);
  });

  it('powinno zablokować możliwość odpowiedzi podczas przetwarzania (isProcessing)', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.1);
    const { result } = renderHook(() => useNBackGame());

    act(() => {
      result.current.startGame(60, 1);
    });

    act(() => {
      vi.runOnlyPendingTimers();
    });

    act(() => {
      result.current.handleAnswer(true);
    });

    expect(result.current.correct).toBe(1);

    act(() => {
      result.current.handleAnswer(true);
    });

    expect(result.current.correct).toBe(1);
  });

  it('powinno zareagować na poprawne klawisze (y / n)', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.1);
    const { result } = renderHook(() => useNBackGame());

    act(() => {
      result.current.startGame(60, 1);
    });

    act(() => {
      vi.runOnlyPendingTimers();
    });

    act(() => {
      const event = new KeyboardEvent('keydown', { key: 'y' });
      window.dispatchEvent(event);
    });

    expect(result.current.feedback).toBe('Dobrze!');
    expect(result.current.correct).toBe(1);
  });
});