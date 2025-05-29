import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const kpiData = [
  { name: 'Current Ratio', value: 1.8, target: 2.0, status: 'warning' },
  { name: 'Debt to Equity', value: 0.6, target: 0.5, status: 'warning' },
  { name: 'Net Profit Margin', value: 0.15, target: 0.18, status: 'success' },
  { name: 'ROA', value: 0.075, target: 0.1, status: 'warning' },
  { name: 'Revenue Growth', value: 0.15, target: 0.12, status: 'success' }
];

export default function KPIBreakdown() {
  return (
    <div className="glass-card rounded-xl p-6">
      <h2 className="text-xl font-bold mb-6">KPI Analysis</h2>
      
      <div className="space-y-4">
        {kpiData.map((kpi) => (
          <div key={kpi.name} className="p-4 glass-card rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{kpi.name}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-2xl font-bold">
                    {(kpi.value * 100).toFixed(1)}%
                  </span>
                  <span className="text-sm text-gray-500">
                    Target: {(kpi.target * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
              {kpi.value >= kpi.target ? (
                <TrendingUp className="w-6 h-6 text-primary-600" />
              ) : (
                <TrendingDown className="w-6 h-6 text-amber-500" />
              )}
            </div>
            <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-300 ${
                  kpi.status === 'success' ? 'bg-primary-500' : 'bg-amber-500'
                }`}
                style={{ width: `${(kpi.value / kpi.target) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
