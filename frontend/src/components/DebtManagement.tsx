import React from 'react';
import { ArrowRight, TrendingDown } from 'lucide-react';
import { LineChart, Line, XAxis, ResponsiveContainer } from 'recharts';
import { useCurrency } from '../hooks/useCurrency';

const data = [
  { date: '1D', value: 10000 },
  { date: '1W', value: 9800 },
  { date: '1M', value: 9500 },
  { date: '3M', value: 9000 },
  { date: '1Y', value: 8500 }
];

export default function DebtManagement() {
  const { formatAmount } = useCurrency();

  return (
    <div className="glass-card rounded-xl p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">Total Debt</h2>
        <div className="flex items-baseline space-x-2 mt-2">
          <span className="text-3xl font-bold">{formatAmount(10000)}</span>
          <span className="text-sm text-primary-600">-8% Last 30 Days</span>
        </div>
      </div>

      <div className="h-32 mt-4 mb-6">
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

      <div className="space-y-4">
        <h3 className="font-medium">Debt Management Methods</h3>
        {[
          { name: 'Snowball Method', desc: 'Pay smallest debts first' },
          { name: 'Avalanche Method', desc: 'Focus on highest interest rates' },
          { name: 'Velocity Banking', desc: 'Use credit line transfer' }
        ].map((method) => (
          <button
            key={method.name}
            className="flex items-center justify-between w-full p-4 glass-card rounded-xl hover:bg-white/40 transition-all"
          >
            <div>
              <h4 className="font-medium">{method.name}</h4>
              <p className="text-sm text-gray-600">{method.desc}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400" />
          </button>
        ))}
      </div>

      <div className="mt-6 p-4 bg-primary-50 rounded-xl">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-primary-100 rounded-full">
            <TrendingDown className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h4 className="font-medium">Debt-Free in 5 Years</h4>
            <p className="text-sm text-gray-600">Stay on track with your current plan</p>
          </div>
        </div>
      </div>
    </div>
  );
}
