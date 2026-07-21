import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { formatMs, filterByDays } from './utils.js';

describe('formatMs', () => {
  it('powinno poprawnie sformatować milisekundy', () => {
    expect(formatMs(500)).toEqual('500 ms');
  });
});

describe('filterByDays', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-10-15T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('powinno filtrować sesje dokładnie z dzisiaj (days === 1)', () => {
    const history = [
      { id: 1, date: new Date('2026-10-15T08:00:00Z').getTime() },
      { id: 2, date: new Date('2026-10-14T10:00:00Z').getTime() },
    ];

    const result = filterByDays(history, 1);
    
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });

  it('powinno filtrować sesje z ostatnich 7 dni (days === 7)', () => {
    const history = [
      { id: 1, date: new Date('2026-10-15T10:00:00Z').getTime() },
      { id: 2, date: new Date('2026-10-10T10:00:00Z').getTime() },
      { id: 3, date: new Date('2026-10-01T10:00:00Z').getTime() },
    ];

    const result = filterByDays(history, 7);
    
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe(1);
    expect(result[1].id).toBe(2);
  });
});