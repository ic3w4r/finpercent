import React from 'react';
import { useCurrency } from '../../hooks/useCurrency';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const balanceSheetData = [
  { month: 'Jan', assets: 1500000, liabilities: 900000 },
  { month: 'Feb', assets: 1600000, liabilities: 950000 },
  { month: 'Mar', assets: 1750000, liabilities: 1000000 },
  { month: 'Apr', assets: 1900000, liabilities: 1100000 },
  { month: 'May', assets: 2000000, liabilities: 1150000 },
  { month: 'Jun', assets: 2200000, liabilities: 1200000 }
];

export default function BalanceSheetAnalysis() {
  const { formatAmount } = useCurrency();

  return (
    <div className="glass-card rounded-xl p-6">
      <h2 className="text-xl font-bold mb-6">Balance Sheet Analysis</h2>
      
      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={balanceSheetData}>
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
            <Tooltip 
              formatter={(value: number) => formatAmount(value)}
              labelFormatter={(label) => `Month: ${label}`}
            />
            <Line 
              type="monotone" 
              dataKey="assets" 
              stroke="#16a34a" 
              name="Assets"
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="liabilities" 
              stroke="#dc2626" 
              name="Liabilities"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-4 bg-primary-50 rounded-lg text-center">
          <h3 className="text-sm font-medium text-gray-600">Total Assets</h3>
          <p className="text-2xl font-bold text-primary-600 my-2">
            {formatAmount(2200000)}
          </p>
          <span className="text-sm text-primary-600">+15% growth</span>
        </div>
        <div className="p-4 bg-red-50 rounded-lg text-center">
          <h3 className="text-sm font-medium text-gray-600">Total Liabilities</h3>
          <p className="text-2xl font-bold text-red-600 my-2">
            {formatAmount(1200000)}
          </p>
          <span className="text-sm text-red-600">+8% growth</span>
        </div>
      </div>

      <div className="w-2/3 mx-auto p-4 bg-blue-50 rounded-lg text-center mb-4">
        <h3 className="text-sm font-medium text-gray-600">Net Working Capital</h3>
        <p className="text-2xl font-bold text-blue-600 my-2">
          {formatAmount(1000000)}
        </p>
        <div className="flex justify-center items-center space-x-2">
          <span className="text-sm font-medium text-blue-600">1.83 Current Ratio</span>
          <span className="text-xs text-gray-500">(Assets ÷ Liabilities)</span>
        </div>
      </div>

      <div className="w-2/3 mx-auto p-4 bg-gray-50 rounded-lg text-center">
        <h3 className="text-sm font-medium text-gray-600 mb-2">Liquidity Analysis</h3>
        <p className="text-sm text-gray-700">
          Healthy ratio (1.5+) indicates strong ability to meet short-term obligations
        </p>
      </div>
    </div>
  );
}
