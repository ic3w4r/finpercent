import React from 'react';
import { useCurrency } from '../hooks/useCurrency';

export interface KPIData {
  currentRatio: number;
  debtToEquity: number;
  netProfitMargin: number;
  operatingProfitMargin: number;
  roa: number;
  revenueGrowth: number;
  customerRetention: number;
  inventoryTurnover: number;
  employeeTurnover: number;
  cashFlowRatio: number;
}


interface FinancialReportProps {
  kpiData: KPIData;
}

// ... rest of the imports and interfaces remain the same ...

export default function FinancialReport({ kpiData }: FinancialReportProps) {
  const { formatAmount } = useCurrency();

  // Format KPI values as percentages or currency based on the metric
  const formatKPIValue = (key: string, value: number) => {
    const currencyMetrics = ['currentRatio', 'cashFlowRatio', 'inventoryTurnover'];
    if (currencyMetrics.includes(key)) {
      return formatAmount(value);
    }
    return (value * 100).toFixed(1) + '%';
  };

  return (
    <div className="glass-container rounded-2xl p-8 space-y-8">
      {/* ... rest of the JSX remains the same, but use formatAmount where needed ... */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(kpiData).map(([key, value]) => (
          <div 
            key={key} 
            className="p-6 glass-card rounded-2xl hover:shadow-neo-hover transition-neo"
          >
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
              <p className="text-sm text-gray-300 uppercase tracking-wider">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </p>
            </div>
            <p className="text-2xl font-bold text-gray-100 mt-3">
              {formatKPIValue(key, value)}
            </p>
          </div>
        ))}
      </div>
      {/* ... rest of the component remains the same ... */}
    </div>
  );
}
