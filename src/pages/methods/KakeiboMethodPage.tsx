import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen,
  Home,
  ShoppingCart,
  Heart,
  Star,
  PieChart,
  Calculator,
  TrendingDown,
  TrendingUp,
  Target
} from 'lucide-react';

export default function KakeiboMethodPage() {
  const [monthlyIncome, setMonthlyIncome] = useState(80000);
  const [needs, setNeeds] = useState(40000);
  const [wants, setWants] = useState(16000);
  const [culture, setCulture] = useState(8000);
  const [unexpected, setUnexpected] = useState(8000);

  const totalExpenses = needs + wants + culture + unexpected;
  const savings = monthlyIncome - totalExpenses;
  const savingsRate = (savings / monthlyIncome) * 100;

  const categories = [
    {
      name: 'Needs (Survival)',
      amount: needs,
      setter: setNeeds,
      color: 'red',
      icon: Home,
      description: 'Essential expenses like rent, groceries, utilities',
      percentage: (needs / monthlyIncome) * 100
    },
    {
      name: 'Wants (Optional)',
      amount: wants,
      setter: setWants,
      color: 'blue',
      icon: ShoppingCart,
      description: 'Entertainment, dining out, non-essential shopping',
      percentage: (wants / monthlyIncome) * 100
    },
    {
      name: 'Culture (Enrichment)',
      amount: culture,
      setter: setCulture,
      color: 'purple',
      icon: Heart,
      description: 'Books, courses, cultural activities, self-improvement',
      percentage: (culture / monthlyIncome) * 100
    },
    {
      name: 'Unexpected (Emergency)',
      amount: unexpected,
      setter: setUnexpected,
      color: 'orange',
      icon: Star,
      description: 'Emergency fund, unexpected expenses, contingencies',
      percentage: (unexpected / monthlyIncome) * 100
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-beige-50 to-primary-100 p-6 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="neo-button w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gradient-to-r from-orange-100 to-red-100">
            <BookOpen className="w-8 h-8 text-orange-600" />
          </div>
          <h1 className="text-3xl font-bold text-primary-900 dark:text-primary-100 font-['Manrope'] mb-2">
            Kakeibo Method
          </h1>
          <p className="text-primary-700 dark:text-gray-400 font-['Manrope'] text-lg">
            Japanese Art of Budgeting and Saving
          </p>
        </motion.div>

        {/* Method Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="neo-card p-6 mb-8"
        >
          <h2 className="text-xl font-bold text-primary-800 mb-4 font-['Manrope']">
            What is Kakeibo?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6 font-['Manrope']">
            Kakeibo (pronounced "kah-keh-bo") is a Japanese budgeting method created by journalist Hani Motoko in 1904. 
            It emphasizes mindful spending and categorizes expenses into four simple categories to help you achieve your savings goals.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <div key={category.name} className="text-center">
                  <div className={`neo-button w-16 h-16 mx-auto mb-3 bg-gradient-to-r ${
                    category.color === 'red' ? 'from-red-100 to-red-200' :
                    category.color === 'blue' ? 'from-blue-100 to-blue-200' :
                    category.color === 'purple' ? 'from-purple-100 to-purple-200' :
                    'from-orange-100 to-orange-200'
                  } flex items-center justify-center`}>
                    <Icon className={`w-8 h-8 ${
                      category.color === 'red' ? 'text-red-600' :
                      category.color === 'blue' ? 'text-blue-600' :
                      category.color === 'purple' ? 'text-purple-600' :
                      'text-orange-600'
                    }`} />
                  </div>
                  <h3 className={`font-bold mb-2 ${
                    category.color === 'red' ? 'text-red-700' :
                    category.color === 'blue' ? 'text-blue-700' :
                    category.color === 'purple' ? 'text-purple-700' :
                    'text-orange-700'
                  }`}>
                    {category.name.split(' ')[0]}
                  </h3>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Interactive Budget Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
        >
          {/* Budget Controls */}
          <div className="neo-card p-6">
            <h3 className="text-lg font-bold text-primary-800 mb-4 font-['Manrope'] flex items-center">
              <Calculator className="w-5 h-5 mr-2" />
              Monthly Budget Planner
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Income: ₹{monthlyIncome.toLocaleString()}
                </label>
                <input
                  type="range"
                  min="30000"
                  max="200000"
                  step="5000"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-green"
                />
              </div>
              
              {categories.map((category) => (
                <div key={category.name}>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      {category.name}: ₹{category.amount.toLocaleString()}
                    </label>
                    <span className={`text-xs font-medium ${
                      category.color === 'red' ? 'text-red-600' :
                      category.color === 'blue' ? 'text-blue-600' :
                      category.color === 'purple' ? 'text-purple-600' :
                      'text-orange-600'
                    }`}>
                      {category.percentage.toFixed(1)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={monthlyIncome * 0.6}
                    step="2000"
                    value={category.amount}
                    onChange={(e) => category.setter(parseInt(e.target.value))}
                    className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer ${
                      category.color === 'red' ? 'slider-red' :
                      category.color === 'blue' ? 'slider-blue' :
                      category.color === 'purple' ? 'slider-blue' :
                      'slider-orange'
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Budget Analysis */}
          <div className="neo-card p-6">
            <h3 className="text-lg font-bold text-primary-800 mb-4 font-['Manrope'] flex items-center">
              <PieChart className="w-5 h-5 mr-2" />
              Budget Analysis
            </h3>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Monthly Income</span>
                  <span className="text-lg font-bold text-gray-800">
                    ₹{monthlyIncome.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="bg-red-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-red-700">Total Expenses</span>
                  <span className="text-lg font-bold text-red-700">
                    ₹{totalExpenses.toLocaleString()}
                  </span>
                </div>
                <div className="text-xs text-red-600">
                  {((totalExpenses / monthlyIncome) * 100).toFixed(1)}% of income
                </div>
              </div>

              <div className={`p-4 rounded-lg ${
                savings >= 0 ? 'bg-green-50' : 'bg-red-50'
              }`}>
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-sm font-medium ${
                    savings >= 0 ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {savings >= 0 ? 'Monthly Savings' : 'Monthly Deficit'}
                  </span>
                  <span className={`text-xl font-bold ${
                    savings >= 0 ? 'text-green-700' : 'text-red-700'
                  }`}>
                    ₹{Math.abs(savings).toLocaleString()}
                  </span>
                </div>
                <div className={`text-xs flex items-center ${
                  savings >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {savings >= 0 ? (
                    <TrendingUp className="w-3 h-3 mr-1" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-1" />
                  )}
                  {Math.abs(savingsRate).toFixed(1)}% of income
                </div>
              </div>

              {/* Savings Recommendations */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-700 mb-2">Recommendations</h4>
                <div className="text-sm text-blue-600 space-y-1">
                  {savingsRate >= 20 && <p>✅ Excellent savings rate! You're on track for financial success.</p>}
                  {savingsRate >= 10 && savingsRate < 20 && <p>👍 Good savings rate. Consider increasing to 20% if possible.</p>}
                  {savingsRate >= 0 && savingsRate < 10 && <p>⚠️ Low savings rate. Try to reduce wants and unexpected expenses.</p>}
                  {savingsRate < 0 && <p>🚨 You're overspending. Review and cut unnecessary expenses immediately.</p>}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Kakeibo Questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="neo-card p-6 mb-8"
        >
          <h3 className="text-lg font-bold text-primary-800 mb-6 font-['Manrope']">
            The Four Kakeibo Questions
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="neo-button p-4 text-left">
                <h4 className="font-semibold text-primary-700 mb-2">1. How much money do you have available?</h4>
                <p className="text-sm text-gray-600">Calculate your total monthly income after taxes and fixed obligations.</p>
              </div>
              
              <div className="neo-button p-4 text-left">
                <h4 className="font-semibold text-primary-700 mb-2">2. How much would you like to save?</h4>
                <p className="text-sm text-gray-600">Set a realistic savings goal (typically 10-20% of income).</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="neo-button p-4 text-left">
                <h4 className="font-semibold text-primary-700 mb-2">3. How much are you spending?</h4>
                <p className="text-sm text-gray-600">Track every expense and categorize them into the four categories.</p>
              </div>
              
              <div className="neo-button p-4 text-left">
                <h4 className="font-semibold text-primary-700 mb-2">4. How can you improve?</h4>
                <p className="text-sm text-gray-600">Review monthly and identify areas for optimization.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Implementation Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="neo-card p-6"
        >
          <h3 className="text-lg font-bold text-primary-800 mb-6 font-['Manrope']">
            Getting Started with Kakeibo
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Set Your Goals</h4>
                  <p className="text-sm text-gray-600">Define what you want to achieve and how much you want to save</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Track Every Expense</h4>
                  <p className="text-sm text-gray-600">Record all expenses and categorize them mindfully</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Weekly Reviews</h4>
                  <p className="text-sm text-gray-600">Analyze spending patterns and make adjustments</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Monthly Reflection</h4>
                  <p className="text-sm text-gray-600">Reflect on successes and areas for improvement</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  5
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Adjust and Continue</h4>
                  <p className="text-sm text-gray-600">Refine your budget based on learnings and continue the cycle</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  6
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Celebrate Achievements</h4>
                  <p className="text-sm text-gray-600">Acknowledge progress and reward yourself appropriately</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}