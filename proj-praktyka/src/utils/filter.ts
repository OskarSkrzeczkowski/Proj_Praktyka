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