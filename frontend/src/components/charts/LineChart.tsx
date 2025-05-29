import React from 'react';
import { LineChart as RechartsLineChart, Line, XAxis, ResponsiveContainer } from 'recharts';

interface DataPoint {
  date: string;
  value: number;
}

interface LineChartProps {
  data: DataPoint[];
}

export function LineChart({ data }: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart data={data}>
        <XAxis 
          dataKey="date" 
          axisLine={false} 
          tickLine={false}
          tick={{ fontSize: 12 }}
        />
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke="#16a34a"
          strokeWidth={2}
          dot={false}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}
