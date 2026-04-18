import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { NBackResult } from '../../store/types';

interface NBackChartProps {
  data: NBackResult[];
}

export const NBackChart = ({ data: rawData }: NBackChartProps) => {
  const chartData = [...rawData]
    .reverse()
    .slice(-20)
    .map((session) => ({
      date: new Date(session.date).toLocaleDateString('pl-PL', { 
        day: '2-digit', 
        month: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      skuteczność: session.efficiency
    }));

    if (chartData.length < 2) {
    return <p className="text-white/60">Zagraj co najmniej 2 sesje, żeby zobaczyć trend.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 50 }}>
     
        <XAxis 
            dataKey="date" 
            stroke="#ffffff60" 
            angle={-30} 
            textAnchor="end" 
            height={70} 
            tick={{ fontSize: 11 }}
            dy={35}
        />
        
        <YAxis 
            stroke="#ffffff60" 
            tickFormatter={(value) => `${value}%`} 
            domain={[0, 100]}
        />
        
        <Tooltip
            contentStyle={{ backgroundColor: '#09205e', border: 'none', borderRadius: '10px', color:'#fff'}}
            formatter={(value: any) => [`${value}%`, "Skuteczność"]}
        />

        <Line 
            type="monotone" 
            dataKey="skuteczność" 
            stroke="#68a9ff" 
            strokeWidth={3} 
            dot={{ r: 4, fill: '#68a9ff' }}
            activeDot={{ r: 6 }}
            animationDuration={1000}
        />
        
      </LineChart>
    </ResponsiveContainer>
  );
};