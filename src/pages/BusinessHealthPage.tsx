import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, PieChart, TrendingUp, DollarSign, 
  Calendar, Filter, Download, RefreshCw,
  ArrowUp, ArrowDown, Minus,
  Wallet, CreditCard, PiggyBank, Target
} from 'lucide-react';

const timeRanges = [
  { id: '30d', label: '30 Days' },
  { id: '90d', label: '90 Days' },
  { id: '1y', label: '1 Year' }
];

const stats = [
  {
    title: 'Total Operating Revenue',
    value: '₹25,00,000',
    change: '+12.3%',
    changeValue: '+₹2,75,000',
    icon: Wallet,
    trend: 'up',
    description: 'B2B Invoice Revenue'
  },
  {
    title: 'Operating Profit (EBITDA)',
    value: '₹4,50,000',
    change: '+8.7%',
    changeValue: '+₹36,000',
    icon: DollarSign,
    trend: 'up',
    description: '18% Operating Margin'
  },
  {
    title: 'Fixed Monthly Expenses',
    value: '₹2,10,000',
    change: '-5.1%',
    changeValue: '-₹11,000',
    icon: CreditCard,
    trend: 'down',
    description: 'Rent, Salaries & Amortization'
  },
  {
    title: 'Operating Cash Surplus',
    value: '₹6,40,000',
    change: '+15.2%',
    changeValue: '+₹84,000',
    icon: PiggyBank,
    trend: 'up',
    description: 'Net liquid operational cache'
  },
  {
    title: 'Receivables Aging Average',
    value: '42 Days',
    change: '+4 Days',
    changeValue: '+10.5%',
    icon: TrendingUp,
    trend: 'up',
    description: 'Peenya cluster concentrations'
  },
  {
    title: 'Outstanding Debt Facilities',
    value: '₹14,50,000',
    change: '-12.3%',
    changeValue: '-₹2,00,000',
    icon: Target,
    trend: 'down',
    description: 'Total active OCC & OD loans'
  }
];

const categoryBreakdown = [
  { name: 'Raw Material BOM', amount: '₹2,45,000', percentage: 47.8, color: 'bg-blue-500' },
  { name: 'Power & Fuel', amount: '₹85,600', percentage: 16.7, color: 'bg-green-500' },
  { name: 'Direct Logistics Freight', amount: '₹62,300', percentage: 12.2, color: 'bg-yellow-500' },
  { name: 'Salaries & Wages', amount: '₹44,500', percentage: 8.7, color: 'bg-purple-500' },
  { name: 'Lease & Equipment Rent', amount: '₹31,200', percentage: 6.1, color: 'bg-red-500' },
  { name: 'Other Admin Overheads', amount: '₹44,100', percentage: 8.5, color: 'bg-gray-500' }
];

export default function BusinessHealthPage() {
  const [selectedRange, setSelectedRange] = useState('30d');

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUp className="w-4 h-4 text-green-500" />;
      case 'down': return <ArrowDown className="w-4 h-4 text-red-500" />;
      default: return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 p-6 pb-20">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-extrabold text-primary-950 dark:text-white">
              Business Health Indicators
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Financial health, operating stability, and expenditure analysis
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={selectedRange}
              onChange={(e) => setSelectedRange(e.target.value)}
              className="neo-input text-xs"
            >
              {timeRanges.map((range) => (
                <option key={range.id} value={range.id}>
                  {range.label}
                </option>
              ))}
            </select>
            <button className="neo-button p-2 text-gray-500">
              <RefreshCw className="w-4 h-4" />
            </button>
            <button className="neo-button p-2 text-gray-500">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const isPositive = stat.change.startsWith('+');
            const isNegativeGood = stat.title.includes('Expenses') || stat.title.includes('Debt');
            const trendColor = isNegativeGood 
              ? (isPositive ? 'text-red-500' : 'text-green-500')
              : (isPositive ? 'text-green-500' : 'text-red-500');

            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div className="p-3 bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 rounded-xl">
                    <Icon className="w-6 h-6" />
                  </div>
                  {getTrendIcon(stat.trend)}
                </div>
                
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 block">
                    {stat.title}
                  </span>
                  <span className="text-2xl font-bold text-primary-950 dark:text-white block">
                    {stat.value}
                  </span>
                  <div className="flex items-center space-x-2 text-xs">
                    <span className={`font-semibold ${trendColor}`}>
                      {stat.change}
                    </span>
                    <span className="text-gray-400">
                      ({stat.changeValue})
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-400 block pt-1 border-t border-gray-50 dark:border-gray-700/50">
                    {stat.description}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Expense Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Expenditure breakdown card */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-50 dark:border-gray-700 pb-3">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Monthly OPEX Breakdown
              </h2>
              <PieChart className="w-5 h-5 text-primary-600" />
            </div>
            <div className="space-y-4">
              {categoryBreakdown.map((category) => (
                <div key={category.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-gray-700 dark:text-gray-300">{category.name}</span>
                    <span className="text-gray-500 font-bold">{category.amount} ({category.percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                    <div className={`${category.color} h-full`} style={{ width: `${category.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick recommendations */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="border-b border-gray-50 dark:border-gray-700 pb-3">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Margin Leakage Alerts</h3>
                <p className="text-xs text-gray-500">System detected anomalies in operating costs</p>
              </div>
              <ul className="space-y-3 text-xs">
                <li className="flex space-x-2 items-start text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950/20 p-2.5 rounded-lg border border-red-100 dark:border-red-900">
                  <ArrowDown className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>Logistics freight charges increased by 12% in May due to off-contract freight bookings.</span>
                </li>
                <li className="flex space-x-2 items-start text-yellow-700 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-950/20 p-2.5 rounded-lg border border-yellow-100 dark:border-yellow-900">
                  <Minus className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>Power tariff has spiked by 6% due to high reactive load penalty. Spoke to maintenance team.</span>
                </li>
              </ul>
            </div>
            <button 
              onClick={() => navigate('/action-plan')}
              className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl text-xs transition-all shadow-md"
            >
              Access Business Action Plan
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
