import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, PieChart, BarChart2, 
  TrendingUp, DollarSign,
  PiggyBank, Receipt, Building2, Wallet, ShoppingBag,
  ShoppingCart, Heart, BookOpen, AlertTriangle
} from 'lucide-react';
import MarketChart from '../stock-market/MarketChart';

interface DetailedBreakdown {
  name: string;
  percentage: number;
  description: string;
  amount: number;
}

interface CategoryData {
  name: string;
  percentage: number;
  amount: number;
  icon: React.ReactNode;
  color: string;
  details: DetailedBreakdown[];
  trend: number[];
}

export default function MethodDetails() {
  const { method, category } = useParams<{ method: string; category: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getMethodData = (): { title: string; data: CategoryData } => {
    if (method === 'stop') {
      switch (category) {
        case 'savings':
          return {
            title: 'Savings Breakdown',
            data: {
              name: 'Savings',
              percentage: 25,
              amount: 2500,
              icon: <PiggyBank className="w-6 h-6 text-green-600" />,
              color: 'text-green-600',
              trend: [2000, 2200, 2300, 2400, 2450, 2500],
              details: [
                { name: 'Emergency Fund', percentage: 40, amount: 1000, description: 'Business contingency reserve' },
                { name: 'Investment Reserve', percentage: 40, amount: 1000, description: 'Future business expansion' },
                { name: 'Asset Acquisition', percentage: 20, amount: 500, description: 'Equipment and infrastructure' }
              ]
            }
          };
        case 'taxes':
          return {
            title: 'Tax Allocation',
            data: {
              name: 'Taxes',
              percentage: 30,
              amount: 3000,
              icon: <Receipt className="w-6 h-6 text-red-600" />,
              color: 'text-red-600',
              trend: [2800, 2900, 2950, 3100, 3050, 3000],
              details: [
                { name: 'Income Tax', percentage: 50, amount: 1500, description: 'Corporate income tax provision' },
                { name: 'VAT/Sales Tax', percentage: 33, amount: 1000, description: 'Value added and sales tax' },
                { name: 'Other Taxes', percentage: 17, amount: 500, description: 'Local and miscellaneous taxes' }
              ]
            }
          };
        case 'operations':
          return {
            title: 'Operations Management',
            data: {
              name: 'Operations',
              percentage: 35,
              amount: 3500,
              icon: <Building2 className="w-6 h-6 text-blue-600" />,
              color: 'text-blue-600',
              trend: [3200, 3300, 3400, 3450, 3480, 3500],
              details: [
                { name: 'Staff & Payroll', percentage: 45, amount: 1575, description: 'Employee salaries and benefits' },
                { name: 'Production Costs', percentage: 30, amount: 1050, description: 'Manufacturing and service delivery' },
                { name: 'Operating Expenses', percentage: 25, amount: 875, description: 'Utilities, rent, and supplies' }
              ]
            }
          };
        case 'profit':
          return {
            title: 'Profit Distribution',
            data: {
              name: 'Profit',
              percentage: 10,
              amount: 1000,
              icon: <TrendingUp className="w-6 h-6 text-purple-600" />,
              color: 'text-purple-600',
              trend: [800, 850, 900, 950, 980, 1000],
              details: [
                { name: 'Shareholder Distribution', percentage: 40, amount: 400, description: 'Dividend payments' },
                { name: 'Business Growth', percentage: 40, amount: 400, description: 'Reinvestment in business' },
                { name: 'Innovation Fund', percentage: 20, amount: 200, description: 'R&D and new initiatives' }
              ]
            }
          };
        default:
          return { title: '', data: null as any };
      }
    } else if (method === 'nws') {
      switch (category) {
        case 'necessities':
          return {
            title: 'Necessities Management',
            data: {
              name: 'Necessities',
              percentage: 50,
              amount: 5000,
              icon: <Wallet className="w-6 h-6 text-blue-600" />,
              color: 'text-blue-600',
              trend: [4800, 4900, 4950, 5100, 5050, 5000],
              details: [
                { name: 'Housing', percentage: 40, amount: 2000, description: 'Rent/Mortgage and utilities' },
                { name: 'Transportation', percentage: 30, amount: 1500, description: 'Vehicle and commuting costs' },
                { name: 'Food', percentage: 30, amount: 1500, description: 'Groceries and essentials' }
              ]
            }
          };
        case 'wants':
          return {
            title: 'Discretionary Spending',
            data: {
              name: 'Wants',
              percentage: 30,
              amount: 3000,
              icon: <ShoppingBag className="w-6 h-6 text-purple-600" />,
              color: 'text-purple-600',
              trend: [2800, 2900, 2950, 3100, 3050, 3000],
              details: [
                { name: 'Entertainment', percentage: 40, amount: 1200, description: 'Leisure activities' },
                { name: 'Shopping', percentage: 30, amount: 900, description: 'Non-essential purchases' },
                { name: 'Dining Out', percentage: 30, amount: 900, description: 'Restaurants and takeout' }
              ]
            }
          };
        case 'savings':
          return {
            title: 'Savings Strategy',
            data: {
              name: 'Savings',
              percentage: 20,
              amount: 2000,
              icon: <PiggyBank className="w-6 h-6 text-green-600" />,
              color: 'text-green-600',
              trend: [1800, 1850, 1900, 1950, 1980, 2000],
              details: [
                { name: 'Emergency Fund', percentage: 40, amount: 800, description: 'Rainy day fund' },
                { name: 'Investments', percentage: 40, amount: 800, description: 'Long-term investments' },
                { name: 'Goals', percentage: 20, amount: 400, description: 'Specific financial goals' }
              ]
            }
          };
        default:
          return { title: '', data: null as any };
      }
    } else if (method === 'kakeibo') {
      switch (category) {
        case 'needs':
          return {
            title: 'Essential Needs',
            data: {
              name: 'Needs',
              percentage: 50,
              amount: 5000,
              icon: <ShoppingCart className="w-6 h-6 text-blue-600" />,
              color: 'text-blue-600',
              trend: [4800, 4900, 4950, 5100, 5050, 5000],
              details: [
                { name: 'Housing', percentage: 50, amount: 2500, description: 'Rent/Mortgage and utilities' },
                { name: 'Groceries', percentage: 30, amount: 1500, description: 'Essential food items' },
                { name: 'Utilities', percentage: 20, amount: 1000, description: 'Electricity, water, and other bills' }
              ]
            }
          };
        case 'wants':
          return {
            title: 'Discretionary Wants',
            data: {
              name: 'Wants',
              percentage: 20,
              amount: 2000,
              icon: <Heart className="w-6 h-6 text-pink-600" />,
              color: 'text-pink-600',
              trend: [1800, 1850, 1900, 1950, 1980, 2000],
              details: [
                { name: 'Entertainment', percentage: 40, amount: 800, description: 'Leisure activities' },
                { name: 'Shopping', percentage: 35, amount: 700, description: 'Non-essential purchases' },
                { name: 'Dining Out', percentage: 25, amount: 500, description: 'Restaurants and takeout' }
              ]
            }
          };
        case 'culture':
          return {
            title: 'Cultural Enrichment',
            data: {
              name: 'Culture',
              percentage: 20,
              amount: 2000,
              icon: <BookOpen className="w-6 h-6 text-purple-600" />,
              color: 'text-purple-600',
              trend: [1800, 1850, 1900, 1950, 1980, 2000],
              details: [
                { name: 'Education', percentage: 40, amount: 800, description: 'Courses and learning materials' },
                { name: 'Books', percentage: 30, amount: 600, description: 'Reading materials' },
                { name: 'Events', percentage: 30, amount: 600, description: 'Cultural events and experiences' }
              ]
            }
          };
        case 'unexpected':
          return {
            title: 'Unexpected Expenses',
            data: {
              name: 'Unexpected',
              percentage: 10,
              amount: 1000,
              icon: <AlertTriangle className="w-6 h-6 text-orange-600" />,
              color: 'text-orange-600',
              trend: [800, 850, 900, 950, 980, 1000],
              details: [
                { name: 'Emergency Fund', percentage: 50, amount: 500, description: 'Unexpected emergencies' },
                { name: 'Healthcare', percentage: 30, amount: 300, description: 'Unplanned medical expenses' },
                { name: 'Repairs', percentage: 20, amount: 200, description: 'Home and vehicle repairs' }
              ]
            }
          };
        default:
          return { title: '', data: null as any };
      }
    }
    return { title: '', data: null as any };
  };

  const { title, data } = getMethodData();

  useEffect(() => {
    console.log('MethodDetails - Mounted with params:', { method, category });
    setLoading(false);
  }, [method, category]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return <div>Category not found</div>;
  }

  const renderMetrics = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-2 mb-2">
          <PieChart className="w-5 h-5 text-primary-600" />
          <span className="text-sm text-gray-600">Allocation</span>
        </div>
        <div className="text-2xl font-bold text-primary-600">
          {data.percentage}%
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-2 mb-2">
          <DollarSign className="w-5 h-5 text-green-600" />
          <span className="text-sm text-gray-600">Amount</span>
        </div>
        <div className="text-2xl font-bold text-green-600">
          ${data.amount.toLocaleString()}
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-2 mb-2">
          <BarChart2 className="w-5 h-5 text-blue-600" />
          <span className="text-sm text-gray-600">Sub-categories</span>
        </div>
        <div className="text-2xl font-bold text-blue-600">
          {data.details.length}
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-2 mb-2">
          <TrendingUp className="w-5 h-5 text-purple-600" />
          <span className="text-sm text-gray-600">Total Impact</span>
        </div>
        <div className="text-2xl font-bold text-purple-600">
          {(data.percentage * data.details.length / 100).toFixed(1)}x
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4">
          {method === 'stop' ? 'S.T.O.P Method' : method === 'nws' ? 'N.W.S Method' : 'Kakeibo Method'} - {data.name}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Financial breakdown and analysis
        </p>
      </div>

      <div className="space-y-6">
        {/* Metrics Overview */}
        {renderMetrics()}

        {/* Current Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-lg bg-opacity-20 ${data.color.replace('text', 'bg')}`}>
                {data.icon}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {data.percentage}% - ${data.amount.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Trend Chart */}
          <div className="h-64 mb-6">
            <MarketChart
              data={{
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [
                  {
                    label: `${data.name} Trend`,
                    data: data.trend,
                    borderColor: data.color.includes('green') 
                      ? '#22c55e' 
                      : data.color.includes('blue') 
                        ? '#3b82f6'
                        : data.color.includes('red')
                          ? '#ef4444'
                          : '#a855f7',
                    backgroundColor: 'transparent',
                  }
                ]
              }}
              height={250}
            />
          </div>
        </motion.div>

        {/* Detailed Breakdown */}
        <div className="space-y-6">
          {data.details.map((detail) => (
            <motion.div
              key={detail.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {detail.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {detail.description}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`font-medium ${data.color}`}>
                    {detail.percentage}%
                  </span>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    ${detail.amount.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${data.color.replace('text', 'bg')}`}
                  style={{ width: `${detail.percentage}%` }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Recommendations
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-green-800 dark:text-green-200">
                Optimize allocation based on current market conditions
              </p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-blue-800 dark:text-blue-200">
                Consider adjusting percentages for better efficiency
              </p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <p className="text-purple-800 dark:text-purple-200">
                Review and update goals periodically
              </p>
            </div>
          </div>
        </motion.div>

        {/* Performance Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Performance Trends
          </h2>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-400">Efficiency</span>
                <span className="text-green-600">↑ 2.3%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-green-500"
                  style={{ width: '92%' }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-400">Cost Reduction</span>
                <span className="text-blue-600">↓ 5.1%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-blue-500"
                  style={{ width: '85%' }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-400">Growth Rate</span>
                <span className="text-purple-600">↑ 3.7%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-purple-500"
                  style={{ width: '78%' }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}