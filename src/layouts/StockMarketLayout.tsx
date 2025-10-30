import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, Activity, Target } from 'lucide-react';

interface BusinessKPI {
  label: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

interface StockMarketLayoutProps {
  children: React.ReactNode;
  marketKPIs?: BusinessKPI[];
}

export default function StockMarketLayout({ children, marketKPIs = [] }: StockMarketLayoutProps) {
  const defaultKPIs: BusinessKPI[] = [
    {
      label: 'STOP Score',
      value: '85.4/100',
      change: 2.4,
      icon: <Target className="w-5 h-5" />
    },
    {
      label: 'NWS Balance',
      value: '+$24.5K',
      change: -1.2,
      icon: <DollarSign className="w-5 h-5" />
    },
    {
      label: 'Growth Rate',
      value: '7.8%',
      change: 1.5,
      icon: <Activity className="w-5 h-5" />
    }
  ];

  const kpis = marketKPIs.length > 0 ? marketKPIs : defaultKPIs;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Business Metrics Overview */}
      <div className="sticky top-0 z-40 bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-3">
            {kpis.map((kpi, index) => (
              <motion.div
                key={kpi.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex-shrink-0 p-3 bg-primary-100 dark:bg-primary-900 rounded-lg">
                  {kpi.icon}
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {kpi.label}
                  </p>
                  <div className="flex items-baseline justify-between">
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {kpi.value}
                    </p>
                    {kpi.change !== 0 && (
                      <span className={`ml-2 flex items-center text-sm ${
                        kpi.change > 0 
                          ? 'text-green-600 dark:text-green-500' 
                          : 'text-red-600 dark:text-red-500'
                      }`}>
                        {kpi.change > 0 ? (
                          <TrendingUp className="w-4 h-4 mr-1" />
                        ) : (
                          <TrendingDown className="w-4 h-4 mr-1" />
                        )}
                        {Math.abs(kpi.change)}%
                      </span>
                    )}
                  </div>
                  <div className="mt-1">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full ${
                          kpi.change > 0 ? 'bg-green-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min(Math.abs(kpi.change) * 10, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          {/* Method Integration Indicator */}
          <div className="absolute top-0 right-0 flex items-center space-x-2 text-sm">
            <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 rounded text-green-700 dark:text-green-300 font-medium">
              STOP Active
            </span>
            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 rounded text-blue-700 dark:text-blue-300 font-medium">
              NWS Active
            </span>
            <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 rounded text-purple-700 dark:text-purple-300 font-medium">
              Debt Management
            </span>
          </div>
          
          {/* Ensure consistent vertical rhythm between top-level sections */}
          <div className="space-y-6">{children}</div>
        </motion.div>
      </main>
    </div>
  );
} 