import React from 'react';
import { LineChart, Line, XAxis, ResponsiveContainer } from 'recharts';
import { useCurrency } from '../hooks/useCurrency';

const data = [
  { date: '1D', value: 2500 },
  { date: '1W', value: 3200 },
  { date: '1M', value: 2800 },
  { date: '3M', value: 4000 },
  { date: '1Y', value: 5943 }
];

interface AccountBalanceProps {
  balance: number;
  percentageChange: number;
}

export default function AccountBalance({ balance, percentageChange }: AccountBalanceProps) {
  const { formatAmount } = useCurrency();

  return (
    <div className="glass-card rounded-xl p-6 neomorphic-shadow">
      <h2 className="text-lg text-gray-200">Account Balance</h2>
      <div className="flex items-baseline space-x-2 mt-2">
        <span className="text-3xl font-bold">{formatAmount(balance)}</span>
        <span className={`text-sm ${percentageChange >= 0 ? 'text-primary-600' : 'text-red-500'}`}>
          {percentageChange >= 0 ? '+' : ''}{percentageChange}%
        </span>
      </div>
      
      <div className="h-32 mt-4 bg-black/10 rounded-lg p-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="date" axisLine={false} tickLine={false} />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#B8860B"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
