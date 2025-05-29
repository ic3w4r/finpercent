import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, PiggyBank, Briefcase, TrendingUp } from 'lucide-react';

export default function NWSMethod() {
  const categories = [
    {
      name: 'Necessities',
      percentage: 50,
      amount: 2500,
      icon: <Wallet className="w-5 h-5" />,
      description: 'Essential expenses and bills'
    },
    {
      name: 'Wants',
      percentage: 30,
      amount: 1500,
      icon: <PiggyBank className="w-5 h-5" />,
      description: 'Discretionary spending'
    },
    {
      name: 'Savings',
      percentage: 20,
      amount: 1000,
      icon: <Briefcase className="w-5 h-5" />,
      description: 'Future investments and emergency fund'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          NWS Method Analysis
        </h2>
        <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
          Balanced
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
                {category.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {category.name}
              </h3>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-gray-600 dark:text-gray-400">Allocation</span>
                  <span className="text-2xl font-bold text-primary-600">
                    {category.percentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-primary-500"
                    style={{ width: `${category.percentage}%` }}
                  />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-gray-600 dark:text-gray-400">Amount</span>
                <span className="text-xl font-semibold text-gray-900 dark:text-white">
                  ${category.amount.toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-gray-500">
                {category.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Implementation Guide */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mt-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Implementation Guide
        </h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
              <span className="text-primary-700 dark:text-primary-300 font-medium">N</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Necessities (50%)</h4>
              <p className="text-sm text-gray-500">Allocate half of income to essential expenses</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
              <span className="text-primary-700 dark:text-primary-300 font-medium">W</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Wants (30%)</h4>
              <p className="text-sm text-gray-500">Set aside for lifestyle and discretionary spending</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
              <span className="text-primary-700 dark:text-primary-300 font-medium">S</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Savings (20%)</h4>
              <p className="text-sm text-gray-500">Dedicate to savings and investments</p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Performance Metrics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-green-700 dark:text-green-300 font-medium">Savings Rate</span>
              <span className="text-green-700 dark:text-green-300">
                <TrendingUp className="w-4 h-4 inline mr-1" />
                +2.5%
              </span>
            </div>
            <div className="text-2xl font-bold text-green-800 dark:text-green-200">
              20.5%
            </div>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-blue-700 dark:text-blue-300 font-medium">Budget Adherence</span>
              <span className="text-blue-700 dark:text-blue-300">
                <TrendingUp className="w-4 h-4 inline mr-1" />
                +1.8%
              </span>
            </div>
            <div className="text-2xl font-bold text-blue-800 dark:text-blue-200">
              92.3%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
