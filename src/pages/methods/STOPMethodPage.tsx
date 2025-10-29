import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  PiggyBank,
  DollarSign,
  Settings,
  TrendingUp,
  Calculator,
  BarChart3,
  Target,
  Wallet,
  Building,
  FileText,
  ArrowRight
} from 'lucide-react';

export default function STOPMethodPage() {
  const navigate = useNavigate();
  const [monthlyRevenue, setMonthlyRevenue] = useState(200000);
  
  // Calculate STOP breakdown
  const calculateSTOP = () => {
    // Recommended percentages for STOP method
    const savingsPercentage = 20; // 20% for savings
    const taxesPercentage = 15;   // 15% for taxes
    const operationsPercentage = 45; // 45% for operations
    const profitPercentage = 20;  // 20% for profit
    
    return {
      savings: (monthlyRevenue * savingsPercentage) / 100,
      taxes: (monthlyRevenue * taxesPercentage) / 100,
      operations: (monthlyRevenue * operationsPercentage) / 100,
      profit: (monthlyRevenue * profitPercentage) / 100,
      percentages: {
        savings: savingsPercentage,
        taxes: taxesPercentage,
        operations: operationsPercentage,
        profit: profitPercentage
      }
    };
  };

  const stopBreakdown = calculateSTOP();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-beige-50 to-primary-100 p-6 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="neo-button w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gradient-to-r from-purple-100 to-blue-100">
            <Target className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-3xl font-bold text-primary-900 dark:text-primary-100 font-['Manrope'] mb-2">
            S.T.O.P Method
          </h1>
          <p className="text-primary-700 dark:text-gray-400 font-['Manrope'] text-lg">
            <strong>S</strong>avings, <strong>T</strong>axes, <strong>O</strong>perations, <strong>P</strong>rofit Management
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
            What is the S.T.O.P Method?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6 font-['Manrope']">
            The S.T.O.P method is a comprehensive financial management framework that helps businesses and individuals 
            allocate their revenue effectively across four critical areas: Savings for future growth, Taxes for compliance, 
            Operations for daily functioning, and Profit for sustainability and rewards.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="neo-button w-16 h-16 mx-auto mb-3 bg-gradient-to-r from-green-100 to-green-200 flex items-center justify-center">
                <PiggyBank className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-green-700 mb-2">Savings</h3>
              <p className="text-sm text-gray-600">Future growth and emergency funds</p>
            </div>
            
            <div className="text-center">
              <div className="neo-button w-16 h-16 mx-auto mb-3 bg-gradient-to-r from-red-100 to-red-200 flex items-center justify-center">
                <FileText className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="font-bold text-red-700 mb-2">Taxes</h3>
              <p className="text-sm text-gray-600">Legal compliance and tax planning</p>
            </div>
            
            <div className="text-center">
              <div className="neo-button w-16 h-16 mx-auto mb-3 bg-gradient-to-r from-blue-100 to-blue-200 flex items-center justify-center">
                <Settings className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-blue-700 mb-2">Operations</h3>
              <p className="text-sm text-gray-600">Daily business operations and expenses</p>
            </div>
            
            <div className="text-center">
              <div className="neo-button w-16 h-16 mx-auto mb-3 bg-gradient-to-r from-purple-100 to-purple-200 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-purple-700 mb-2">Profit</h3>
              <p className="text-sm text-gray-600">Net profit for growth and distribution</p>
            </div>
          </div>
        </motion.div>

        {/* Interactive Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
        >
          {/* Revenue Input */}
          <div className="neo-card p-6">
            <h3 className="text-lg font-bold text-primary-800 mb-4 font-['Manrope'] flex items-center">
              <Calculator className="w-5 h-5 mr-2" />
              S.T.O.P Calculator
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Revenue: ₹{(monthlyRevenue / 1000).toFixed(0)}k
                </label>
                <input
                  type="range"
                  min="50000"
                  max="1000000"
                  step="10000"
                  value={monthlyRevenue}
                  onChange={(e) => setMonthlyRevenue(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-green"
                />
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-3">Recommended Allocation</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-green-700">Savings (20%)</span>
                    <span className="font-medium">₹{(stopBreakdown.savings / 1000).toFixed(0)}k</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-red-700">Taxes (15%)</span>
                    <span className="font-medium">₹{(stopBreakdown.taxes / 1000).toFixed(0)}k</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Operations (45%)</span>
                    <span className="font-medium">₹{(stopBreakdown.operations / 1000).toFixed(0)}k</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-700">Profit (20%)</span>
                    <span className="font-medium">₹{(stopBreakdown.profit / 1000).toFixed(0)}k</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* S.T.O.P Breakdown */}
          <div className="neo-card p-6">
            <h3 className="text-lg font-bold text-primary-800 mb-4 font-['Manrope'] flex items-center">
              <Wallet className="w-5 h-5 mr-2" />
              Financial Allocation
            </h3>
            
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-2">
                    <PiggyBank className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-green-700">Savings</span>
                  </div>
                  <span className="text-lg font-bold text-green-700">
                    ₹{(stopBreakdown.savings / 1000).toFixed(0)}k
                  </span>
                </div>
                <div className="text-xs text-green-600">
                  {stopBreakdown.percentages.savings}% of revenue - Emergency funds, investments
                </div>
              </div>

              <div className="bg-red-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-red-600" />
                    <span className="text-sm font-medium text-red-700">Taxes</span>
                  </div>
                  <span className="text-lg font-bold text-red-700">
                    ₹{(stopBreakdown.taxes / 1000).toFixed(0)}k
                  </span>
                </div>
                <div className="text-xs text-red-600">
                  {stopBreakdown.percentages.taxes}% of revenue - GST, income tax, compliance
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-2">
                    <Settings className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-700">Operations</span>
                  </div>
                  <span className="text-lg font-bold text-blue-700">
                    ₹{(stopBreakdown.operations / 1000).toFixed(0)}k
                  </span>
                </div>
                <div className="text-xs text-blue-600">
                  {stopBreakdown.percentages.operations}% of revenue - Rent, salaries, utilities, materials
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-medium text-purple-700">Profit</span>
                  </div>
                  <span className="text-lg font-bold text-purple-700">
                    ₹{(stopBreakdown.profit / 1000).toFixed(0)}k
                  </span>
                </div>
                <div className="text-xs text-purple-600">
                  {stopBreakdown.percentages.profit}% of revenue - Net profit, reinvestment, distributions
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Detailed S.T.O.P Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"
        >
          {/* Savings Strategies */}
          <div className="neo-card p-6">
            <h3 className="text-lg font-bold text-green-700 mb-4 font-['Manrope'] flex items-center">
              <PiggyBank className="w-5 h-5 mr-2" />
              Savings Strategies
            </h3>
            <div className="space-y-3">
              <div className="neo-button p-3 text-left">
                <h4 className="font-semibold text-gray-800 mb-1">Emergency Fund</h4>
                <p className="text-sm text-gray-600">6-12 months of operational expenses</p>
              </div>
              <div className="neo-button p-3 text-left">
                <h4 className="font-semibold text-gray-800 mb-1">Growth Investment</h4>
                <p className="text-sm text-gray-600">Technology, equipment, market expansion</p>
              </div>
              <div className="neo-button p-3 text-left">
                <h4 className="font-semibold text-gray-800 mb-1">Future Opportunities</h4>
                <p className="text-sm text-gray-600">R&D, new product development</p>
              </div>
            </div>
          </div>

          {/* Tax Planning */}
          <div className="neo-card p-6">
            <h3 className="text-lg font-bold text-red-700 mb-4 font-['Manrope'] flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Tax Planning
            </h3>
            <div className="space-y-3">
              <div className="neo-button p-3 text-left">
                <h4 className="font-semibold text-gray-800 mb-1">GST Management</h4>
                <p className="text-sm text-gray-600">Input credit optimization, compliance</p>
              </div>
              <div className="neo-button p-3 text-left">
                <h4 className="font-semibold text-gray-800 mb-1">Income Tax</h4>
                <p className="text-sm text-gray-600">Corporate tax, advance tax planning</p>
              </div>
              <div className="neo-button p-3 text-left">
                <h4 className="font-semibold text-gray-800 mb-1">Deductions</h4>
                <p className="text-sm text-gray-600">Section 80C, business expenses</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Implementation Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="neo-card p-6"
        >
          <h3 className="text-lg font-bold text-primary-800 mb-6 font-['Manrope']">
            S.T.O.P Implementation Guide
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  S
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Set Up Savings</h4>
                  <p className="text-sm text-gray-600">Automate 20% of revenue to savings accounts and investments</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  T
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Tax Allocation</h4>
                  <p className="text-sm text-gray-600">Reserve 15% for all tax obligations and compliance</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  O
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Operations Budget</h4>
                  <p className="text-sm text-gray-600">Allocate 45% for all operational expenses and costs</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  P
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Profit Management</h4>
                  <p className="text-sm text-gray-600">Maintain 20% as net profit for growth and distributions</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}