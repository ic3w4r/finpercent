import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Target,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  BarChart3,
  ArrowUp,
  ArrowDown,
  Pause
} from 'lucide-react';

export default function STOPMethodPage() {
  const [selectedExample, setSelectedExample] = useState<string>('example1');

  const examples = {
    example1: {
      title: 'Conservative Growth Stock',
      symbol: 'RELIANCE',
      currentPrice: 2450,
      stopLoss: 2200,
      targetPrice: 2800,
      analysis: {
        support: 2200,
        resistance: 2800,
        riskReward: '1:2.3'
      }
    },
    example2: {
      title: 'Volatile Tech Stock',
      symbol: 'TCS',
      currentPrice: 3650,
      stopLoss: 3400,
      targetPrice: 4200,
      analysis: {
        support: 3400,
        resistance: 4200,
        riskReward: '1:2.2'
      }
    },
    example3: {
      title: 'Dividend Aristocrat',
      symbol: 'HDFC',
      currentPrice: 1580,
      stopLoss: 1450,
      targetPrice: 1800,
      analysis: {
        support: 1450,
        resistance: 1800,
        riskReward: '1:1.7'
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-beige-50 to-primary-100 p-6 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="neo-button w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gradient-to-r from-red-100 to-orange-100">
            <Target className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-primary-900 dark:text-primary-100 font-['Manrope'] mb-2">
            S.T.O.P Method
          </h1>
          <p className="text-primary-700 dark:text-gray-400 font-['Manrope'] text-lg">
            <strong>S</strong>upport, <strong>T</strong>arget, <strong>O</strong>ptimization, <strong>P</strong>rofit Strategy
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
            The S.T.O.P method is a comprehensive trading strategy that focuses on identifying key support and resistance levels, 
            setting realistic targets, optimizing entry and exit points, and maximizing profit potential while minimizing risk.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="neo-button w-16 h-16 mx-auto mb-3 bg-gradient-to-r from-green-100 to-green-200 flex items-center justify-center">
                <ArrowUp className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-green-700 mb-2">Support</h3>
              <p className="text-sm text-gray-600">Identify strong support levels for safe entry</p>
            </div>
            
            <div className="text-center">
              <div className="neo-button w-16 h-16 mx-auto mb-3 bg-gradient-to-r from-blue-100 to-blue-200 flex items-center justify-center">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-blue-700 mb-2">Target</h3>
              <p className="text-sm text-gray-600">Set realistic profit targets based on resistance</p>
            </div>
            
            <div className="text-center">
              <div className="neo-button w-16 h-16 mx-auto mb-3 bg-gradient-to-r from-purple-100 to-purple-200 flex items-center justify-center">
                <BarChart3 className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-purple-700 mb-2">Optimization</h3>
              <p className="text-sm text-gray-600">Optimize timing and position sizing</p>
            </div>
            
            <div className="text-center">
              <div className="neo-button w-16 h-16 mx-auto mb-3 bg-gradient-to-r from-orange-100 to-orange-200 flex items-center justify-center">
                <DollarSign className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-bold text-orange-700 mb-2">Profit</h3>
              <p className="text-sm text-gray-600">Execute profit-taking strategy effectively</p>
            </div>
          </div>
        </motion.div>

        {/* Interactive Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8"
        >
          {/* Example Selection */}
          <div className="lg:col-span-1">
            <div className="neo-card p-6">
              <h3 className="text-lg font-bold text-primary-800 mb-4 font-['Manrope']">
                Select Example
              </h3>
              <div className="space-y-3">
                {Object.entries(examples).map(([key, example]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedExample(key)}
                    className={`w-full neo-button p-4 text-left transition-all ${
                      selectedExample === key
                        ? 'bg-gradient-to-r from-primary-500 to-green-500 text-white shadow-lg'
                        : 'hover:shadow-md'
                    }`}
                  >
                    <h4 className="font-semibold mb-1">{example.title}</h4>
                    <p className="text-sm opacity-80">{example.symbol} - ₹{example.currentPrice}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Example Analysis */}
          <div className="lg:col-span-2">
            <div className="neo-card p-6">
              <h3 className="text-lg font-bold text-primary-800 mb-4 font-['Manrope']">
                S.T.O.P Analysis: {examples[selectedExample as keyof typeof examples].symbol}
              </h3>
              
              <div className="space-y-6">
                {/* Current Status */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary-600 mb-1">
                        ₹{examples[selectedExample as keyof typeof examples].currentPrice}
                      </div>
                      <div className="text-sm text-gray-600">Current Price</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600 mb-1">
                        ₹{examples[selectedExample as keyof typeof examples].stopLoss}
                      </div>
                      <div className="text-sm text-gray-600">Stop Loss</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 mb-1">
                        ₹{examples[selectedExample as keyof typeof examples].targetPrice}
                      </div>
                      <div className="text-sm text-gray-600">Target Price</div>
                    </div>
                  </div>
                </div>

                {/* S.T.O.P Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-green-700 mb-3 flex items-center">
                      <ArrowUp className="w-4 h-4 mr-2" />
                      Support Level
                    </h4>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-lg font-bold text-green-700 mb-2">
                        ₹{examples[selectedExample as keyof typeof examples].analysis.support}
                      </div>
                      <p className="text-sm text-gray-600">
                        Strong support level identified through technical analysis. 
                        This level has been tested multiple times and held firm.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-blue-700 mb-3 flex items-center">
                      <Target className="w-4 h-4 mr-2" />
                      Target Analysis
                    </h4>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-lg font-bold text-blue-700 mb-2">
                        ₹{examples[selectedExample as keyof typeof examples].analysis.resistance}
                      </div>
                      <p className="text-sm text-gray-600">
                        Resistance level based on historical price action and 
                        fibonacci retracement levels.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-purple-700 mb-3 flex items-center">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Optimization
                    </h4>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="text-lg font-bold text-purple-700 mb-2">
                        Risk:Reward {examples[selectedExample as keyof typeof examples].analysis.riskReward}
                      </div>
                      <p className="text-sm text-gray-600">
                        Optimal risk-to-reward ratio ensures profitable trades 
                        even with 40% success rate.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-orange-700 mb-3 flex items-center">
                      <DollarSign className="w-4 h-4 mr-2" />
                      Profit Strategy
                    </h4>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <div className="text-lg font-bold text-orange-700 mb-2">
                        Partial Booking
                      </div>
                      <p className="text-sm text-gray-600">
                        Book 50% profits at 70% of target, trail stop loss 
                        for remaining position.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Implementation Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="neo-card p-6"
        >
          <h3 className="text-lg font-bold text-primary-800 mb-6 font-['Manrope']">
            Implementation Steps
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Identify Support</h4>
                  <p className="text-sm text-gray-600">Use technical analysis to find strong support levels</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Set Target</h4>
                  <p className="text-sm text-gray-600">Determine realistic profit targets based on resistance</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Optimize Entry</h4>
                  <p className="text-sm text-gray-600">Time your entry near support with volume confirmation</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Set Stop Loss</h4>
                  <p className="text-sm text-gray-600">Place stop loss below support with 2-3% buffer</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  5
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Execute Profit Strategy</h4>
                  <p className="text-sm text-gray-600">Book partial profits and trail stop loss</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  6
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Review & Learn</h4>
                  <p className="text-sm text-gray-600">Analyze results and refine your approach</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}