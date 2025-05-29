import React from 'react';

interface KakeiboMethodProps {
  monthlyIncome?: number;
}

const KakeiboMethod = ({ monthlyIncome = 0 }: KakeiboMethodProps) => {
  const categories = [
    {
      name: 'Needs',
      percentage: 50,
      amount: monthlyIncome * 0.5,
      color: 'bg-blue-100 dark:bg-blue-900/20',
      textColor: 'text-blue-800 dark:text-blue-300',
      description: 'Essential living expenses'
    },
    {
      name: 'Wants',
      percentage: 20,
      amount: monthlyIncome * 0.2,
      color: 'bg-pink-100 dark:bg-pink-900/20',
      textColor: 'text-pink-800 dark:text-pink-300',
      description: 'Non-essential purchases'
    },
    {
      name: 'Culture',
      percentage: 20,
      amount: monthlyIncome * 0.2,
      color: 'bg-purple-100 dark:bg-purple-900/20',
      textColor: 'text-purple-800 dark:text-purple-300',
      description: 'Personal growth and education'
    },
    {
      name: 'Unexpected',
      percentage: 10,
      amount: monthlyIncome * 0.1,
      color: 'bg-orange-100 dark:bg-orange-900/20',
      textColor: 'text-orange-800 dark:text-orange-300',
      description: 'Emergency fund and unexpected expenses'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Kakeibo Budget Allocation
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Monthly Income: ${monthlyIncome.toLocaleString()}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <div
              key={category.name}
              className={`${category.color} rounded-lg p-4`}
            >
              <h3 className={`text-lg font-semibold ${category.textColor}`}>
                {category.name}
              </h3>
              <div className="mt-2">
                <div className="flex justify-between items-baseline">
                  <span className={`text-2xl font-bold ${category.textColor}`}>
                    ${category.amount.toLocaleString()}
                  </span>
                  <span className={`text-sm font-medium ${category.textColor}`}>
                    {category.percentage}%
                  </span>
                </div>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${category.color.replace('bg-', 'bg-opacity-50 bg-')}`}
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                </div>
                <p className={`mt-2 text-sm ${category.textColor}`}>
                  {category.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Monthly Reflection Questions
        </h3>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white">How much money do you have?</h4>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Current Balance: ${monthlyIncome.toLocaleString()}
            </p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white">How much would you like to save?</h4>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Target Savings: ${(monthlyIncome * 0.2).toLocaleString()}
            </p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white">How much are you spending?</h4>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Total Budget: ${(monthlyIncome * 0.8).toLocaleString()}
            </p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white">How can you improve?</h4>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Track your daily expenses and review your spending patterns regularly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KakeiboMethod;
