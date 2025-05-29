import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, PieChart, TrendingUp, DollarSign, 
  Calendar, Filter, Download, RefreshCw,
  ArrowUp, ArrowDown, Minus,
  Wallet, CreditCard, PiggyBank, Target
} from 'lucide-react';

const timeRanges = [
  { id: '7d', label: '7 Days' },
  { id: '30d', label: '30 Days' },
  { id: '90d', label: '90 Days' },
  { id: '1y', label: '1 Year' }
];

const stats = [
  {
    title: 'Total Balance',
    value: '$24,576.89',
    change: '+12.3%',
    changeValue: '+$2,698',
    icon: Wallet,
    trend: 'up',
    description: 'Across all accounts'
  },
  {
    title: 'Monthly Income',
    value: '$8,246.00',
    change: '+5.7%',
    changeValue: '+$445',
    icon: DollarSign,
    trend: 'up',
    description: 'Average monthly income'
  },
  {
    title: 'Monthly Expenses',
    value: '$5,127.42',
    change: '-8.1%',
    changeValue: '-$451',
    icon: CreditCard,
    trend: 'down',
    description: 'Average monthly spending'
  },
  {
    title: 'Savings Rate',
    value: '37.8%',
    change: '+4.2%',
    changeValue: '+3.2%',
    icon: PiggyBank,
    trend: 'up',
    description: 'Of total income saved'
  },
  {
    title: 'Investment Returns',
    value: '21.5%',
    change: '+2.4%',
    changeValue: '+$1,247',
    icon: TrendingUp,
    trend: 'up',
    description: 'Year-to-date performance'
  },
  {
    title: 'Debt Reduction',
    value: '$12,459',
    change: '-15.3%',
    changeValue: '-$2,247',
    icon: Target,
    trend: 'down',
    description: 'Total debt remaining'
  }
];

const categoryBreakdown = [
  { name: 'Housing', amount: 2450, percentage: 47.8, color: 'bg-blue-500' },
  { name: 'Food & Dining', amount: 856, percentage: 16.7, color: 'bg-green-500' },
  { name: 'Transportation', amount: 623, percentage: 12.2, color: 'bg-yellow-500' },
  { name: 'Entertainment', amount: 445, percentage: 8.7, color: 'bg-purple-500' },
  { name: 'Utilities', amount: 312, percentage: 6.1, color: 'bg-red-500' },
  { name: 'Other', amount: 441, percentage: 8.5, color: 'bg-gray-500' }
];

const recentTransactions = [
  { id: 1, description: 'Salary Deposit', amount: 4500, type: 'income', date: '2024-01-15', category: 'Income' },
  { id: 2, description: 'Rent Payment', amount: -1200, type: 'expense', date: '2024-01-14', category: 'Housing' },
  { id: 3, description: 'Grocery Store', amount: -87.65, type: 'expense', date: '2024-01-13', category: 'Food' },
  { id: 4, description: 'Investment Return', amount: 245.30, type: 'income', date: '2024-01-12', category: 'Investment' },
  { id: 5, description: 'Gas Station', amount: -45.20, type: 'expense', date: '2024-01-11', category: 'Transportation' }
];

export default function StatsPage() {
  const [selectedRange, setSelectedRange] = useState('30d');
  const [showTransactions, setShowTransactions] = useState(false);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUp className="w-4 h-4 text-green-500" />;
      case 'down': return <ArrowDown className="w-4 h-4 text-red-500" />;
      default: return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-primary-900 dark:text-primary-100">
            Financial Statistics
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Comprehensive overview of your financial performance
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <select
            value={selectedRange}
            onChange={(e) => setSelectedRange(e.target.value)}
            className="neo-input text-sm"
          >
            {timeRanges.map((range) => (
              <option key={range.id} value={range.id}>
                {range.label}
              </option>
            ))}
          </select>
          <button className="neo-button p-2">
            <RefreshCw className="w-4 h-4" />
          </button>
          <button className="neo-button p-2">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const isPositive = stat.change.startsWith('+');
          const isNegativeGood = stat.title === 'Monthly Expenses' || stat.title === 'Debt Reduction';
          const trendColor = isNegativeGood 
            ? (isPositive ? 'text-red-500' : 'text-green-500')
            : (isPositive ? 'text-green-500' : 'text-red-500');

          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="neo-card p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="neo-button p-3 text-primary-600 dark:text-primary-400">
                  <Icon className="w-6 h-6" />
                </div>
                {getTrendIcon(stat.trend)}
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-primary-900 dark:text-primary-100 mb-2">
                  {stat.value}
                </p>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-semibold ${trendColor}`}>
                    {stat.change}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    ({stat.changeValue})
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Expense Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="neo-card p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-primary-900 dark:text-primary-100">
            Expense Breakdown
          </h2>
          <PieChart className="w-5 h-5 text-primary-600 dark:text-primary-400" />
        </div>
        
        <div className="space-y-4">
          {categoryBreakdown.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-4"
            >
              <div className={`w-4 h-4 rounded-full ${category.color}`} />
              <div className="flex-1 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {category.name}
                </span>
                <div className="text-right">
                  <span className="text-sm font-semibold text-primary-900 dark:text-primary-100">
                    ${category.amount.toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                    {category.percentage}%
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="neo-card p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-primary-900 dark:text-primary-100">
            Recent Transactions
          </h2>
          <button
            onClick={() => setShowTransactions(!showTransactions)}
            className="text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline"
          >
            {showTransactions ? 'Hide' : 'View All'}
          </button>
        </div>

        <div className="space-y-3">
          {recentTransactions.slice(0, showTransactions ? undefined : 3).map((transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  transaction.type === 'income' 
                    ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400'
                    : 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400'
                }`}>
                  {transaction.type === 'income' ? 
                    <ArrowUp className="w-4 h-4" /> : 
                    <ArrowDown className="w-4 h-4" />
                  }
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {transaction.description}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {transaction.category} • {transaction.date}
                  </p>
                </div>
              </div>
              <span className={`text-sm font-semibold ${
                transaction.type === 'income' 
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {transaction.type === 'income' ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Analytics Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="neo-card p-6"
      >
        <h2 className="text-xl font-semibold text-primary-900 dark:text-primary-100 mb-4">
          Financial Health Score
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-3">
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">85</span>
            </div>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Overall Score</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Excellent financial health</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-3">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">92</span>
            </div>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Savings Rate</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Above average</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center mb-3">
              <span className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">78</span>
            </div>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Budget Control</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Good spending habits</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}