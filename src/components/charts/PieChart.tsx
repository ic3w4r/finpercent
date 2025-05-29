import React from 'react';
import { PieChart as ReChartsPie, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface PieChartProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

export function PieChart({ data }: PieChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ReChartsPie>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: number) => `${value}%`}
          labelFormatter={(name) => `${name}`}
        />
      </ReChartsPie>
    </ResponsiveContainer>
  );
}
