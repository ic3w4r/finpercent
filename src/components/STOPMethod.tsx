import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PiggyBank, Receipt, Building2, TrendingUp } from 'lucide-react';

interface STOPMethodProps {
  monthlyRevenue: number;
  percentageChange: number;
}

export default function STOPMethod({ monthlyRevenue, percentageChange }: STOPMethodProps) {
  const navigate = useNavigate();

  const handleCategoryClick = (category: string) => {
    console.log('Navigating to:', `/method/stop/${category.toLowerCase()}`);
    navigate(`/method/stop/${category.toLowerCase()}`);
  };

  const categories = [
    {
      name: 'Savings',
      percentage: 25,
      icon: <PiggyBank className="w-5 h-5 text-green-600" />,
      color: 'bg-green-100 text-green-800',
      amount: monthlyRevenue * 0.25
    },
    {
      name: 'Taxes',
      percentage: 30,
      icon: <Receipt className="w-5 h-5 text-red-600" />,
      color: 'bg-red-100 text-red-800',
      amount: monthlyRevenue * 0.30
    },
    {
      name: 'Operations',
      percentage: 35,
      icon: <Building2 className="w-5 h-5 text-blue-600" />,
      color: 'bg-blue-100 text-blue-800',
      amount: monthlyRevenue * 0.35
    },
    {
      name: 'Profit',
      percentage: 10,
      icon: <TrendingUp className="w-5 h-5 text-purple-600" />,
      color: 'bg-purple-100 text-purple-800',
      amount: monthlyRevenue * 0.10
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            S.T.O.P Method Analysis
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Monthly Revenue: ${monthlyRevenue.toLocaleString()}
          </p>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm ${
          percentageChange >= 0
            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
            : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
        }`}>
          {percentageChange >= 0 ? '+' : ''}{percentageChange}%
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((category) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
            onClick={() => handleCategoryClick(category.name)}
          >
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-full ${category.color} bg-opacity-20 flex items-center justify-center`}>
                {category.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {category.name}
                </h3>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-primary-600 font-medium">
                    {category.percentage}%
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    ${category.amount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-primary-500"
                  style={{ width: `${category.percentage}%` }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
