import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  Heart, 
  BookOpen, 
  AlertTriangle,
  TrendingUp,
  PiggyBank,
  Book,
  ArrowLeft,
  Wallet
} from 'lucide-react';

interface KakeiboMethodProps {
  monthlyIncome: number;
  standalone?: boolean;
}

export default function KakeiboMethod({ monthlyIncome = 0, standalone = false }: KakeiboMethodProps) {
  const navigate = useNavigate();
  const [activeMethod, setActiveMethod] = useState<'nws' | 'kakeibo'>('kakeibo');

  const handleMethodSwitch = (method: 'nws' | 'kakeibo') => {
    if (method === 'nws') {
      const confirmed = window.confirm('Would you like to switch to the NWS method? This will take you back to the dashboard.');
      if (confirmed) {
        navigate('/');
      }
    }
  };

  const categories = [
    {
      name: 'Needs',
      percentage: 50,
      amount: monthlyIncome * 0.5,
      icon: <ShoppingCart className="w-5 h-5" />,
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
      description: 'Essential living expenses',
      subCategories: [
        { name: 'Housing', percentage: 25 },
        { name: 'Utilities', percentage: 10 },
        { name: 'Groceries', percentage: 15 }
      ]
    },
    {
      name: 'Wants',
      percentage: 20,
      amount: monthlyIncome * 0.2,
      icon: <Heart className="w-5 h-5" />,
      color: 'bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-300',
      description: 'Non-essential purchases',
      subCategories: [
        { name: 'Entertainment', percentage: 8 },
        { name: 'Shopping', percentage: 7 },
        { name: 'Dining Out', percentage: 5 }
      ]
    },
    {
      name: 'Culture',
      percentage: 20,
      amount: monthlyIncome * 0.2,
      icon: <BookOpen className="w-5 h-5" />,
      color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300',
      description: 'Personal and cultural growth',
      subCategories: [
        { name: 'Education', percentage: 8 },
        { name: 'Books', percentage: 6 },
        { name: 'Events', percentage: 6 }
      ]
    },
    {
      name: 'Unexpected',
      percentage: 10,
      amount: monthlyIncome * 0.1,
      icon: <AlertTriangle className="w-5 h-5" />,
      color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300',
      description: 'Emergency fund and unexpected expenses',
      subCategories: [
        { name: 'Emergency Fund', percentage: 5 },
        { name: 'Healthcare', percentage: 3 },
        { name: 'Repairs', percentage: 2 }
      ]
    }
  ];

  // If this component is being used standalone (as a page), render the full page layout
  if (standalone) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Navigation */}
        <div className="mb-8">
          <Link 
            to="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        {/* Method Toggle */}
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Financial Planning Methods
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Monthly Income: ${monthlyIncome.toLocaleString()}
              </p>
            </div>
            
            {/* Method Toggle Switch */}
            <div className="flex items-center space-x-4 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => handleMethodSwitch('nws')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeMethod === 'nws'
                    ? 'bg-white dark:bg-gray-700 shadow-sm'
                    : 'hover:bg-white/50 dark:hover:bg-gray-700/50'
                }`}
              >
                <Wallet className="w-5 h-5" />
                <span>NWS Method</span>
              </button>
              <button
                onClick={() => handleMethodSwitch('kakeibo')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeMethod === 'kakeibo'
                    ? 'bg-white dark:bg-gray-700 shadow-sm'
                    : 'hover:bg-white/50 dark:hover:bg-gray-700/50'
                }`}
              >
                <Book className="w-5 h-5" />
                <span>Kakeibo Method</span>
              </button>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              About Kakeibo (家計簿)
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Kakeibo, pronounced "kah-keh-boh," is a Japanese budgeting system that helps you understand 
              your relationship with money by combining spending awareness with mindfulness. It was invented 
              in 1904 by Japan's first female journalist, Hani Motoko.
            </p>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-medium text-blue-900 dark:text-blue-300">Needs (50%)</h3>
              <p className="text-sm text-blue-600 dark:text-blue-400">Essential expenses</p>
            </div>
            <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
              <h3 className="font-medium text-pink-900 dark:text-pink-300">Wants (20%)</h3>
              <p className="text-sm text-pink-600 dark:text-pink-400">Non-essential purchases</p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h3 className="font-medium text-purple-900 dark:text-purple-300">Culture (20%)</h3>
              <p className="text-sm text-purple-600 dark:text-purple-400">Personal growth</p>
            </div>
            <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <h3 className="font-medium text-orange-900 dark:text-orange-300">Unexpected (10%)</h3>
              <p className="text-sm text-orange-600 dark:text-orange-400">Emergency funds</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Kakeibo Method Component */}
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
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-6 rounded-xl ${category.color}`}
                  >
                    <div className="flex items-center space-x-3">
                      {category.icon}
                      <h3 className="text-lg font-semibold">{category.name}</h3>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold">
                          ${category.amount.toLocaleString()}
                        </span>
                        <span className="text-sm font-medium">
                          {category.percentage}%
                        </span>
                      </div>
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${category.color.replace('text', 'bg').replace('bg-', 'bg-opacity-50 bg-')}`}
                            style={{ width: `${category.percentage}%` }}
                          />
                        </div>
                      </div>
                      <p className="mt-2 text-sm">{category.description}</p>
                    </div>
                    <div className="mt-4 space-y-2">
                      {category.subCategories.map((sub) => (
                        <div key={sub.name} className="flex justify-between items-center text-sm">
                          <span>{sub.name}</span>
                          <span className="font-medium">{sub.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Monthly Performance
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Budget</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      ${monthlyIncome.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <PiggyBank className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Savings Target</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      ${(monthlyIncome * 0.1).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Monthly Reflection Questions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Monthly Reflection Questions
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white">How much money do you have?</h4>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Take stock of your current financial situation
                  </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white">How much would you like to save?</h4>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Set a realistic savings goal for the month
                  </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white">How much would you like to improve?</h4>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Identify areas for improvement in your spending habits
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render the component without the standalone wrapper
  return (
    <div className="space-y-6">
      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-xl ${category.color}`}
          >
            <div className="flex items-center space-x-3">
              {category.icon}
              <h3 className="text-lg font-semibold">{category.name}</h3>
            </div>
            <div className="mt-4">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">
                  ${category.amount.toLocaleString()}
                </span>
                <span className="text-sm font-medium">
                  {category.percentage}%
                </span>
              </div>
              <div className="mt-2">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${category.color.replace('text', 'bg').replace('bg-', 'bg-opacity-50 bg-')}`}
                    style={{ width: `${category.percentage}%` }}
                  />
                </div>
              </div>
              <p className="mt-2 text-sm">{category.description}</p>
            </div>
            <div className="mt-4 space-y-2">
              {category.subCategories.map((sub) => (
                <div key={sub.name} className="flex justify-between items-center text-sm">
                  <span>{sub.name}</span>
                  <span className="font-medium">{sub.percentage}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}