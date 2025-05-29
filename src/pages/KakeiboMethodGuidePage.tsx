import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft,
  ShoppingCart,
  Heart,
  BookOpen,
  AlertTriangle,
  ArrowDownRight,
  ArrowRight,
  DollarSign
} from 'lucide-react';

export default function KakeiboMethodGuidePage() {
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

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Kakeibo Method Implementation Guide
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          家計簿 (Kakeibo) - The Japanese art of mindful spending and saving
        </p>
      </div>

      {/* Method Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Understanding the Kakeibo Method
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The Kakeibo method, developed in 1904, helps you become mindful of your spending habits by
          dividing expenses into four main categories and encouraging regular reflection.
        </p>
        
        {/* Flow Diagram */}
        <div className="relative py-12">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 -translate-y-1/2" />
          
          {/* Income Entry Point */}
          <div className="relative z-10 flex justify-center mb-8">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center"
            >
              <DollarSign className="w-8 h-8 text-green-600 dark:text-green-400" />
            </motion.div>
          </div>

          {/* Categories Flow */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Needs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-xl relative"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <ArrowDownRight className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex items-center space-x-3 mb-4">
                <ShoppingCart className="w-8 h-8 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-blue-900 dark:text-blue-300">Needs (50%)</h3>
                  <p className="text-sm text-blue-600">Essential Living</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                <li className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4" />
                  <span>Housing (25%)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4" />
                  <span>Utilities (10%)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4" />
                  <span>Groceries (15%)</span>
                </li>
              </ul>
            </motion.div>

            {/* Wants */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-pink-50 dark:bg-pink-900/10 p-6 rounded-xl relative"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <ArrowDownRight className="w-6 h-6 text-pink-600" />
              </div>
              <div className="flex items-center space-x-3 mb-4">
                <Heart className="w-8 h-8 text-pink-600" />
                <div>
                  <h3 className="font-semibold text-pink-900 dark:text-pink-300">Wants (20%)</h3>
                  <p className="text-sm text-pink-600">Discretionary</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-pink-800 dark:text-pink-200">
                <li className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4" />
                  <span>Entertainment (8%)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4" />
                  <span>Shopping (7%)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4" />
                  <span>Dining Out (5%)</span>
                </li>
              </ul>
            </motion.div>

            {/* Culture */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-purple-50 dark:bg-purple-900/10 p-6 rounded-xl relative"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <ArrowDownRight className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex items-center space-x-3 mb-4">
                <BookOpen className="w-8 h-8 text-purple-600" />
                <div>
                  <h3 className="font-semibold text-purple-900 dark:text-purple-300">Culture (20%)</h3>
                  <p className="text-sm text-purple-600">Personal Growth</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-purple-800 dark:text-purple-200">
                <li className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4" />
                  <span>Education (8%)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4" />
                  <span>Books (6%)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4" />
                  <span>Events (6%)</span>
                </li>
              </ul>
            </motion.div>

            {/* Unexpected */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-orange-50 dark:bg-orange-900/10 p-6 rounded-xl relative"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <ArrowDownRight className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex items-center space-x-3 mb-4">
                <AlertTriangle className="w-8 h-8 text-orange-600" />
                <div>
                  <h3 className="font-semibold text-orange-900 dark:text-orange-300">Unexpected (10%)</h3>
                  <p className="text-sm text-orange-600">Emergency Fund</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-orange-800 dark:text-orange-200">
                <li className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4" />
                  <span>Emergency Fund (5%)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4" />
                  <span>Healthcare (3%)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4" />
                  <span>Repairs (2%)</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Implementation Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Getting Started
          </h3>
          <ol className="space-y-4">
            <li className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/20 text-primary-600 flex items-center justify-center">1</span>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Track Your Spending</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Record all expenses daily and categorize them appropriately.</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/20 text-primary-600 flex items-center justify-center">2</span>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Set Monthly Goals</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Establish clear savings targets and spending limits for each category.</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/20 text-primary-600 flex items-center justify-center">3</span>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Regular Reflection</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Review your spending patterns and adjust your habits accordingly.</p>
              </div>
            </li>
          </ol>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Monthly Reflection Questions
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center">
                <span className="text-sm">1</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">How much money do you have?</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Take stock of your current financial situation.</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-pink-100 dark:bg-pink-900/20 text-pink-600 flex items-center justify-center">
                <span className="text-sm">2</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">How much would you like to save?</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Set realistic savings goals for the month.</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/20 text-purple-600 flex items-center justify-center">
                <span className="text-sm">3</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">How can you improve?</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Identify areas for improvement in your spending habits.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}