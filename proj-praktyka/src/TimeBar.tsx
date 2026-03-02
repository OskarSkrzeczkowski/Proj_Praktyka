interface TimeBarProps {
  timeLeft: number;
  totalTime: number;
}
export const TimeBar = ({ timeLeft, totalTime }: TimeBarProps) => {
  const percentage = (timeLeft / totalTime) * 100;

  return (
    <div className="absolute top-16 left-0 w-full h-1 bg-white/10 z-40">
      <div 
        className="h-full bg-red-500 transition-all duration-75 ease-linear"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};