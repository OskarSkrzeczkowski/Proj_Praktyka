import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { StroopResult } from '../../store/types';

interface StroopChartProps {
  data: StroopResult[];
}

export const StroopChart = ({ data: rawData }: StroopChartProps) => {
  const chartData = [...rawData]
    .reverse()
    .slice(-20) 
    .map((session) => ({
      date: new Date(session.date).toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }),
      skuteczność: session.efficiency
    }));

  if (chartData.length < 2) {
    return <p className="text-white/60">Zagraj co najmniej 2 sesje, żeby zobaczyć trend.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={chartData} margin={{ bottom: 30, right: 50, left: 10 }}>
        <XAxis 
            dataKey="date" 
            stroke="#ffffff60" 
            minTickGap={40} 
            interval={0} 
            dy={35} 
            height={60} 
            angle={-30} 
            tick={{ fontSize: 11 }}
        />

        <YAxis 
            stroke="#ffffff60" 
            tickFormatter={(value) => `${value}%`} 
        />

        <Tooltip
            contentStyle={{ backgroundColor: '#09205e', border:'none', borderRadius:'10px', justifyContent:'center', color:'#fff'}}
            formatter={(value: any, name: any): [string, string] => {
                const val = value !== undefined && value !== null ? value : 0;

                if (name === "skuteczność") {
                return [`${val}%`, "Skuteczność"];
            }    
                return [val.toString(), name.toString()];
            }}
            
        />

        <Line
            type="monotone"
            dataKey="skuteczność" 
            stroke="#68a9fff8" 
            strokeWidth={3} dot={{ r: 4}}
        />

      </LineChart>
    </ResponsiveContainer>
  );
};