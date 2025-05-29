import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft,
  PiggyBank,
  Receipt,
  Building2,
  TrendingUp,
  ArrowDownRight,
  ArrowRight,
  DollarSign
} from 'lucide-react';

export default function STOPMethodGuidePage() {
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
          S.T.O.P Method Implementation Guide
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Strategic Tax Optimization Process - A comprehensive approach to business financial management
        </p>
      </div>

      {/* Method Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Understanding the S.T.O.P Method
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The S.T.O.P method is designed to help businesses optimize their financial flow by systematically
          allocating revenue across four key areas: Savings, Taxes, Operations, and Profit.
        </p>
        
        {/* Flow Diagram */}
        <div className="relative py-12">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 -translate-y-1/2" />
          
          {/* Revenue Entry Point */}
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
            {/* Savings */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-50 dark:bg-green-900/10 p-6 rounded-xl relative"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <ArrowDownRight className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex items-center space-x-3 mb-4">
                <PiggyBank className="w-8 h-8 text-green-600" />
                <div>
                  <h3 className="font-semibold text-green-900 dark:text-green-300">Savings (25%)</h3>
                  <p className="text-sm text-green-600">First Allocation</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-green-800 dark:text-green-200">
                <li className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4" />
                  <span>Emergency Fund (40%)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4" />
                  <span>Investment Reserve (40%)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4" />
                  <span>Asset Acquisition (20%)</span>
                </li>
              </ul>
            </motion.div>

            {/* Taxes */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-red-50 dark:bg-red-900/10 p-6 rounded-xl relative"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <ArrowDownRight className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex items-center space-x-3 mb-4">
                <Receipt className="w-8 h-8 text-red-600" />
                <div>
                  <h3 className="font-semibold text-red-900 dark:text-red-300">Taxes (30%)</h3>
                  <p className="text-sm text-red-600">Second Allocation</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-red-800 dark:text-red-200">
                <li className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4" />
                  <span>Income Tax (50%)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4" />
                  <span>VAT/Sales Tax (33%)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4" />
                  <span>Other Taxes (17%)</span>
                </li>
              </ul>
            </motion.div>

            {/* Operations */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-xl relative"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <ArrowDownRight className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex items-center space-x-3 mb-4">
                <Building2 className="w-8 h-8 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-blue-900 dark:text-blue-300">Operations (35%)</h3>
                  <p className="text-sm text-blue-600">Third Allocation</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                <li className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4" />
                  <span>Staff & Payroll (45%)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4" />
                  <span>Production Costs (30%)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4" />
                  <span>Operating Expenses (25%)</span>
                </li>
              </ul>
            </motion.div>

            {/* Profit */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-purple-50 dark:bg-purple-900/10 p-6 rounded-xl relative"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <ArrowDownRight className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex items-center space-x-3 mb-4">
                <TrendingUp className="w-8 h-8 text-purple-600" />
                <div>
                  <h3 className="font-semibold text-purple-900 dark:text-purple-300">Profit (10%)</h3>
                  <p className="text-sm text-purple-600">Final Allocation</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-purple-800 dark:text-purple-200">
                <li className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4" />
                  <span>Shareholder Distribution (40%)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4" />
                  <span>Business Growth (40%)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4" />
                  <span>Innovation Fund (20%)</span>
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
                <h4 className="font-medium text-gray-900 dark:text-white">Calculate Monthly Revenue</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Determine your total monthly business income before any deductions.</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/20 text-primary-600 flex items-center justify-center">2</span>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Set Up Separate Accounts</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Create dedicated accounts for each category to maintain clear separation of funds.</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/20 text-primary-600 flex items-center justify-center">3</span>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Implement Allocation System</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Set up automatic transfers to distribute funds according to the percentages.</p>
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
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 flex items-center justify-center">
                <PiggyBank className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Prioritize Savings</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Always allocate to savings first to ensure business stability.</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/20 text-red-600 flex items-center justify-center">
                <Receipt className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Regular Tax Review</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Review tax allocations quarterly to ensure adequate coverage.</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Optimize Operations</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Regularly review operational expenses for efficiency improvements.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}