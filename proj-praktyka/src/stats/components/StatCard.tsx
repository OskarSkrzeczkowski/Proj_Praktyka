interface StatCardProps {
  label: string;
  value?: number;
  unit: string;
  color: string;
}

export const StatCard = ({ 
  label, 
  value, 
  unit, 
  color = 'text-purple-400'
}: StatCardProps) => {

  return (
    <div className="bg-white/10 border-2 border-white/60 rounded-4xl p-6 flex flex-col items-center justify-center min-w-[150px]">
      
      <p className="text-white/60 text-center mb-2">{label}</p>
    
      <p className={`text-4xl font-bold ${color}`}>
        {value}

        {unit && <span className="text-xl ml-1 opacity-80">{unit}</span>}
      </p>
      
    </div>
  );
};