import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { ReactionResult } from '../../store/types';

interface ReactionChartProps {
  data: ReactionResult[];
}

export const ReactionChart = ({ data: rawData }: ReactionChartProps) => {
  const chartData = [...rawData].reverse().slice(-20).map((session) => ({
    date: new Date(session.date).toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }),
    ms: session.avgReactionTime
  }));

    if (chartData.length < 2) {
    return <p className="text-white/60">Zagraj co najmniej 2 sesje, żeby zobaczyć trend.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={chartData} margin={{ bottom: 30, right: 50, left: 10 }}>
        <XAxis dataKey="date" stroke="#ffffff60" angle={-30} dy={35} height={60} />
        <YAxis stroke="#ffffff60" tickFormatter={(value) => `${value}ms`} domain={['auto', 'auto']} />
        <Tooltip 
          contentStyle={{ backgroundColor: '#09205e', borderRadius: '10px', border: 'none' }}
          formatter={(value: any) => [`${value} ms`, "Średni czas"]}
        />
        <Line type="monotone" dataKey="ms" stroke="#68a9ff" strokeWidth={3} dot={{ r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};