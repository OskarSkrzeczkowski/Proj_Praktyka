export const formatMs = (ms: number) => `${ms} ms`;
export const formatPercent = (value: number) => `${value}%`;
export const formatTime = (seconds: number) => {
  const total = Math.ceil(seconds);
  return `${Math.floor(total / 60)}:${(total % 60).toString().padStart(2, '0')}`;
};

export const DURATION_MAP: Record<string, number> = {
  "1 min": 60,
  "1.5 min": 90,
  "2 min": 120,
  "3 min": 180,
};

export function filterByDays<T extends { date: number }>(history: T[], days: number): T[] {
    const now = new Date();
    return history.filter(session => {
        if (days === 1) {
            return new Date(session.date).toLocaleDateString('pl-PL') === now.toLocaleDateString('pl-PL');
        }
        const diff = (now.getTime() - session.date) / (1000 * 60 * 60 * 24);
        return diff <= days;
    });
}