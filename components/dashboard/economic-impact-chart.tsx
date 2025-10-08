'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { HistoricalDisaster } from '@/lib/api/emergency-data';

interface EconomicImpactChartProps {
  data: HistoricalDisaster[];
}

export default function EconomicImpactChart({ data }: EconomicImpactChartProps) {
  const chartData = data.map(item => ({
    year: item.year,
    impact: item.economicImpact / 1000000, // Convert to millions
    population: item.affectedPopulation / 1000, // Convert to thousands
  }));

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Economic Impact & Affected Population</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis yAxisId="left" label={{ value: 'Impact ($M)', angle: -90, position: 'insideLeft' }} />
          <YAxis yAxisId="right" orientation="right" label={{ value: 'Population (K)', angle: 90, position: 'insideRight' }} />
          <Tooltip
            formatter={(value: number, name: string) => {
              if (name === 'impact') return [`$${value.toFixed(1)}M`, 'Economic Impact'];
              if (name === 'population') return [`${value.toFixed(1)}K`, 'Affected Population'];
              return [value, name];
            }}
          />
          <Legend />
          <Line yAxisId="left" type="monotone" dataKey="impact" stroke="#ef4444" strokeWidth={2} name="Economic Impact ($M)" />
          <Line yAxisId="right" type="monotone" dataKey="population" stroke="#3b82f6" strokeWidth={2} name="Affected Population (K)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
