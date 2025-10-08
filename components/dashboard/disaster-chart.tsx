'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { HistoricalDisaster } from '@/lib/api/emergency-data';

interface DisasterChartProps {
  data: HistoricalDisaster[];
}

export default function DisasterChart({ data }: DisasterChartProps) {
  // Aggregate by type
  const chartData = data.reduce((acc, item) => {
    const existing = acc.find(d => d.year === item.year);
    if (existing) {
      existing[item.type] = item.count;
    } else {
      acc.push({ year: item.year, [item.type]: item.count });
    }
    return acc;
  }, [] as any[]);

  const types = Array.from(new Set(data.map(d => d.type)));
  const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Historical Disaster Trends</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis label={{ value: 'Number of Events', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          {types.map((type, index) => (
            <Bar key={type} dataKey={type} fill={colors[index % colors.length]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
