import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  PiggyBank,
  TrendingUp,
  Calendar,
  Target,
  DollarSign,
  BarChart3,
  Clock,
  CheckCircle,
  Calculator,
  Wallet
} from 'lucide-react';

export default function NWSMethodPage() {
  const [savingsGoal, setSavingsGoal] = useState(500000);
  const [timeHorizon, setTimeHorizon] = useState(12);
  const [currentSavings, setCurrentSavings] = useState(50000);

  const calculateNWS = () => {
    const monthlyRequired = (savingsGoal - currentSavings) / timeHorizon;
    const weeklyRequired = monthlyRequired / 4.33;
    const dailyRequired = weeklyRequired / 7;
    
    return {
      monthly: monthlyRequired,
      weekly: weeklyRequired,
      daily: dailyRequired,
      totalGoal: savingsGoal,
      currentAmount: currentSavings,
      remainingAmount: savingsGoal - currentSavings
    };
  };

  const nwsData = calculateNWS();

  const savingsStrategies = [
    {
      title: 'High-Interest Savings',
      description: 'Park money in high-yield savings accounts',
      expectedReturn: '6-8%',
      riskLevel: 'Low',
      color: 'green'
    },
    {
      title: 'Fixed Deposits',
      description: 'Secure fixed returns with bank FDs',
      expectedReturn: '5-7%',
      riskLevel: 'Very Low',
      color: 'blue'
    },
    {
      title: 'Debt Mutual Funds',
      description: 'Conservative mutual fund investments',
      expectedReturn: '7-9%',
      riskLevel: 'Low-Medium',
      color: 'purple'
    },
    {
      title: 'Liquid Funds',
      description: 'High liquidity with decent returns',
      expectedReturn: '4-6%',
      riskLevel: 'Very Low',
      color: 'orange'
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
          <div className="neo-button w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gradient-to-r from-blue-100 to-green-100">
            <PiggyBank className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-primary-900 dark:text-primary-100 font-['Manrope'] mb-2">
            N.W.S Method
          </h1>
          <p className="text-primary-700 dark:text-gray-400 font-['Manrope'] text-lg">
            <strong>N</strong>eed-based <strong>W</strong>ealth <strong>S</strong>avings Strategy
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
            What is the N.W.S Method?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6 font-['Manrope']">
            The N.W.S method is a systematic approach to savings that focuses on identifying specific financial needs, 
            creating wealth through disciplined saving, and implementing strategies that ensure consistent progress towards your goals.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="neo-button w-16 h-16 mx-auto mb-3 bg-gradient-to-r from-red-100 to-red-200 flex items-center justify-center">
                <Target className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="font-bold text-red-700 mb-2">Need</h3>
              <p className="text-sm text-gray-600">Identify specific financial goals and requirements</p>
            </div>
            
            <div className="text-center">
              <div className="neo-button w-16 h-16 mx-auto mb-3 bg-gradient-to-r from-green-100 to-green-200 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-green-700 mb-2">Wealth</h3>
              <p className="text-sm text-gray-600">Build wealth systematically through disciplined saving</p>
            </div>
            
            <div className="text-center">
              <div className="neo-button w-16 h-16 mx-auto mb-3 bg-gradient-to-r from-blue-100 to-blue-200 flex items-center justify-center">
                <BarChart3 className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-blue-700 mb-2">Savings</h3>
              <p className="text-sm text-gray-600">Implement strategic savings plans with measurable outcomes</p>
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
          {/* Calculator Inputs */}
          <div className="neo-card p-6">
            <h3 className="text-lg font-bold text-primary-800 mb-4 font-['Manrope'] flex items-center">
              <Calculator className="w-5 h-5 mr-2" />
              N.W.S Calculator
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Savings Goal: ₹{(savingsGoal / 100000).toFixed(1)}L
                </label>
                <input
                  type="range"
                  min="100000"
                  max="2000000"
                  step="50000"
                  value={savingsGoal}
                  onChange={(e) => setSavingsGoal(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-green"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time Horizon: {timeHorizon} months
                </label>
                <input
                  type="range"
                  min="6"
                  max="60"
                  step="3"
                  value={timeHorizon}
                  onChange={(e) => setTimeHorizon(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-blue"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Savings: ₹{(currentSavings / 100000).toFixed(1)}L
                </label>
                <input
                  type="range"
                  min="0"
                  max="500000"
                  step="10000"
                  value={currentSavings}
                  onChange={(e) => setCurrentSavings(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-orange"
                />
              </div>
            </div>
          </div>

          {/* Calculator Results */}
          <div className="neo-card p-6">
            <h3 className="text-lg font-bold text-primary-800 mb-4 font-['Manrope'] flex items-center">
              <Wallet className="w-5 h-5 mr-2" />
              Savings Breakdown
            </h3>
            
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-green-700">Monthly Required</span>
                  <span className="text-lg font-bold text-green-700">
                    ₹{Math.round(nwsData.monthly).toLocaleString()}
                  </span>
                </div>
                <div className="text-xs text-green-600">
                  To reach your goal in {timeHorizon} months
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-blue-700">Weekly Required</span>
                  <span className="text-lg font-bold text-blue-700">
                    ₹{Math.round(nwsData.weekly).toLocaleString()}
                  </span>
                </div>
                <div className="text-xs text-blue-600">
                  Consistent weekly savings target
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-purple-700">Daily Required</span>
                  <span className="text-lg font-bold text-purple-700">
                    ₹{Math.round(nwsData.daily).toLocaleString()}
                  </span>
                </div>
                <div className="text-xs text-purple-600">
                  Daily discipline for goal achievement
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border-t-2 border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Remaining Amount</span>
                  <span className="text-xl font-bold text-gray-800">
                    ₹{Math.round(nwsData.remainingAmount).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Savings Strategies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="neo-card p-6 mb-8"
        >
          <h3 className="text-lg font-bold text-primary-800 mb-6 font-['Manrope']">
            Recommended Savings Strategies
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {savingsStrategies.map((strategy, index) => (
              <motion.div
                key={strategy.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className={`neo-button p-4 text-left hover:shadow-md transition-all border-l-4 ${ 
                  strategy.color === 'green' ? 'border-green-500' :
                  strategy.color === 'blue' ? 'border-blue-500' :
                  strategy.color === 'purple' ? 'border-purple-500' :
                  'border-orange-500'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-gray-800">{strategy.title}</h4>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    strategy.color === 'green' ? 'bg-green-100 text-green-700' :
                    strategy.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                    strategy.color === 'purple' ? 'bg-purple-100 text-purple-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {strategy.riskLevel}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{strategy.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Expected Return</span>
                  <span className={`font-bold ${
                    strategy.color === 'green' ? 'text-green-600' :
                    strategy.color === 'blue' ? 'text-blue-600' :
                    strategy.color === 'purple' ? 'text-purple-600' :
                    'text-orange-600'
                  }`}>
                    {strategy.expectedReturn}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Implementation Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="neo-card p-6"
        >
          <h3 className="text-lg font-bold text-primary-800 mb-6 font-['Manrope']">
            N.W.S Implementation Timeline
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">
                N
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-1">Week 1-2: Identify Needs</h4>
                <p className="text-sm text-gray-600">Define specific financial goals, assess current situation, and set clear targets</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                W
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-1">Week 3-4: Build Wealth Framework</h4>
                <p className="text-sm text-gray-600">Create savings structure, choose appropriate investment vehicles, and set up automation</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                S
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-1">Ongoing: Execute Savings Plan</h4>
                <p className="text-sm text-gray-600">Implement disciplined saving habits, monitor progress, and adjust as needed</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}