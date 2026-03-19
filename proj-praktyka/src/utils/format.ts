export const formatMs = (ms: number) => `${ms} ms`;
export const formatPercent = (value: number) => `${value}%`;
export const formatTime = (seconds: number) => {
  const total = Math.ceil(seconds);
  return `${Math.floor(total / 60)}:${(total % 60).toString().padStart(2, '0')}`;
};