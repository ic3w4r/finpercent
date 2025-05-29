import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft,
  Wallet,
  ShoppingBag,
  PiggyBank,
  ArrowDownRight,
  ArrowRight,
  DollarSign,
  Home,
  Car,
  Utensils,
  Building
} from 'lucide-react';

export default function NWSMethodGuidePage() {
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
          N.W.S Method Implementation Guide
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Necessities, Wants, and Savings - A balanced approach to personal financial management
        </p>
      </div>

      {/* Method Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Understanding the N.W.S Method
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The N.W.S method helps individuals manage their personal finances by dividing income into three
          main categories: Necessities (50%), Wants (30%), and Savings (20%).
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Necessities */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-xl relative"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <ArrowDownRight className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex items-center space-x-3 mb-4">
                <Wallet className="w-8 h-8 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-blue-900 dark:text-blue-300">Necessities (50%)</h3>
                  <p className="text-sm text-blue-600">Essential Expenses</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                <li className="flex items-center space-x-2">
                  <Home className="w-4 h-4" />
                  <span>Housing (30%)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Car className="w-4 h-4" />
                  <span>Transportation (10%)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Utensils className="w-4 h-4" />
                  <span>Food & Utilities (10%)</span>
                </li>
              </ul>
            </motion.div>

            {/* Wants */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-purple-50 dark:bg-purple-900/10 p-6 rounded-xl relative"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <ArrowDownRight className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex items-center space-x-3 mb-4">
                <ShoppingBag className="w-8 h-8 text-purple-600" />
                <div>
                  <h3 className="font-semibold text-purple-900 dark:text-purple-300">Wants (30%)</h3>
                  <p className="text-sm text-purple-600">Discretionary Spending</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-purple-800 dark:text-purple-200">
                <li className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4" />
                  <span>Entertainment (12%)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4" />
                  <span>Shopping (10%)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4" />
                  <span>Dining Out (8%)</span>
                </li>
              </ul>
            </motion.div>

            {/* Savings */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-green-50 dark:bg-green-900/10 p-6 rounded-xl relative"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <ArrowDownRight className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex items-center space-x-3 mb-4">
                <PiggyBank className="w-8 h-8 text-green-600" />
                <div>
                  <h3 className="font-semibold text-green-900 dark:text-green-300">Savings (20%)</h3>
                  <p className="text-sm text-green-600">Future Security</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-green-800 dark:text-green-200">
                <li className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4" />
                  <span>Emergency Fund (8%)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4" />
                  <span>Retirement (7%)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4" />
                  <span>Investments (5%)</span>
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
                <h4 className="font-medium text-gray-900 dark:text-white">Calculate Monthly Income</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Determine your total monthly income after taxes.</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/20 text-primary-600 flex items-center justify-center">2</span>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">List Essential Expenses</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Identify and categorize all necessary monthly expenses.</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/20 text-primary-600 flex items-center justify-center">3</span>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Set Up Automatic Transfers</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Automate your savings and bill payments for consistent management.</p>
              </div>
            </li>
          </ol>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Best Practices
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center">
                <Wallet className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Track Essential Spending</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Monitor your necessities to ensure they stay within the 50% limit.</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/20 text-purple-600 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Mindful Discretionary Spending</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Be conscious of wants vs needs when making purchase decisions.</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 flex items-center justify-center">
                <Building className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Build Emergency Fund First</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Prioritize emergency savings before other investment goals.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}