import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/glass.css';
import '../styles/neomorphic.css';
import {
  ChevronRight,
  ChevronDown,
  Users,
  HandCoins,
  Scale,
  TrendingUp,
  FileText,
  ShieldCheck,
  CreditCard,
  Settings,
  Shield,
  RefreshCw,
  Check,
  TrendingDown,
  Building2,
  PiggyBank,
  Banknote,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Target,
  LineChart,
  BarChart2,
  Receipt,
  Landmark,
  Calculator,
  PieChart,
  ArrowRight,
  BadgeDollarSign,
  BanknoteIcon,
  Coins,
  Calendar
} from 'lucide-react';
import ProgressBar from '../components/ProgressBar';

interface TreeNode {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  children?: TreeNode[];
}

export default function SuperFeaturesPage() {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [poolAmount, setPoolAmount] = useState<number>(0);
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [nwsPercentages, setNwsPercentages] = useState({
    needs: 50,
    wants: 30,
    savings: 20
  });
  const [debtAmount, setDebtAmount] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(0);

  const features = [
    {
      id: 'investment-pooling',
      title: 'Investment Pooling',
      icon: <Coins className="w-6 h-6" />,
      description: 'Pool resources with others for larger investment opportunities with advanced risk assessment',
      status: 'Available',
      color: 'text-green-600 dark:text-green-400',
      action: 'Start Pooling',
      subFeatures: [
        {
          title: 'Pool Creation',
          description: 'Start a new investment pool with customized parameters',
          icon: <BadgeDollarSign className="w-5 h-5" />,
          action: 'Create Pool',
          status: 'Active'
        },
        {
          title: 'Risk Management',
          description: 'Advanced risk assessment and mitigation tools',
          icon: <Scale className="w-5 h-5" />,
          action: 'Analyze Risk',
          status: 'Available'
        },
        {
          title: 'Performance Tracking',
          description: 'Monitor and analyze pool performance metrics',
          icon: <LineChart className="w-5 h-5" />,
          action: 'View Analytics',
          status: 'Beta'
        }
      ]
    },
    {
      id: 'automated-banking',
      title: 'Automated Banking',
      icon: <Building2 className="w-6 h-6" />,
      description: 'Automate your banking operations and transactions with intelligent money management',
      status: 'Available',
      color: 'text-green-600 dark:text-green-400',
      action: 'Connect Banks',
      subFeatures: [
        {
          title: 'Bank Integration',
          description: 'Connect and manage multiple bank accounts',
          icon: <Landmark className="w-5 h-5" />,
          action: 'Connect Bank',
          status: 'Available'
        },
        {
          title: 'Smart Transfers',
          description: 'Set up automated transfers and bill payments',
          icon: <BanknoteIcon className="w-5 h-5" />,
          action: 'Setup Transfers',
          status: 'Available'
        },
        {
          title: 'Transaction Rules',
          description: 'Create custom rules for automated transactions',
          icon: <Calculator className="w-5 h-5" />,
          action: 'Create Rules',
          status: 'Beta'
        }
      ]
    },
    {
      id: 'debt-repayment',
      title: 'Debt Repayment',
      icon: <Calculator className="w-6 h-6" />,
      description: 'Optimize your debt repayment strategy with intelligent algorithms and planning tools',
      status: 'Available', 
      color: 'text-green-600 dark:text-green-400',
      action: 'Optimize Debt',
      subFeatures: [
        {
          title: 'Debt Analysis',
          description: 'Comprehensive analysis of your debt situation',
          icon: <PieChart className="w-5 h-5" />,
          action: 'Analyze Debt',
          status: 'Available'
        },
        {
          title: 'Payment Planning',
          description: 'Create optimized debt repayment schedules',
          icon: <Calendar className="w-5 h-5" />,
          action: 'Plan Payments',
          status: 'Available'
        },
        {
          title: 'Progress Tracking',
          description: 'Monitor your debt repayment progress',
          icon: <TrendingUp className="w-5 h-5" />,
          action: 'Track Progress',
          status: 'Beta'
        }
      ]
    }
  ];

  const renderInvestmentPoolingContent = () => {
    const poolMetrics = [
      {
        title: 'Total Pool Value',
        value: '$125,000',
        change: '+12.5%',
        icon: <DollarSign className="w-5 h-5" />
      },
      {
        title: 'Active Participants',
        value: '8',
        change: '+2',
        icon: <Users className="w-5 h-5" />
      },
      {
        title: 'ROI',
        value: '18.3%',
        change: '+2.1%',
        icon: <TrendingUp className="w-5 h-5" />
      },
      {
        title: 'Pool Score',
        value: '92/100',
        change: '+5',
        icon: <Target className="w-5 h-5" />
      }
    ];

    return (
      <div className="space-y-6">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {poolMetrics.map((metric, index) => (
            <motion.div 
              key={metric.title} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="neo-card p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="neo-button p-2 text-primary-600 dark:text-primary-400">
                  {metric.icon}
                </div>
                <span className="text-green-600 text-sm font-medium">{metric.change}</span>
              </div>
              <h3 className="text-gray-600 dark:text-gray-400 text-sm">{metric.title}</h3>
              <p className="text-2xl font-bold text-primary-900 dark:text-primary-100">{metric.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Pool Creation Form */}
        <div className="neo-card p-6">
          <h3 className="text-xl font-semibold mb-4 text-primary-900 dark:text-primary-100">Create New Investment Pool</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Initial Pool Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="text"
                  value={poolAmount}
                  onChange={(e) => setPoolAmount(parseInt(e.target.value))}
                  className="neo-input pl-8 w-full"
                  placeholder="Enter amount"
                />
              </div>
            </div>
            <button className="w-full neo-button px-4 py-3 text-primary-600 dark:text-primary-400 font-medium">
              Create Pool
            </button>
          </div>
        </div>

        {/* Active Pools */}
        <div className="neo-card p-6">
          <h3 className="text-xl font-semibold mb-4 text-primary-900 dark:text-primary-100">Active Pools</h3>
          <div className="space-y-4">
            {[
              { name: 'Tech Growth Fund', value: '$75,000', members: 5, return: '+15.2%' },
              { name: 'Real Estate Pool', value: '$250,000', members: 12, return: '+8.7%' },
              { name: 'Startup Fund', value: '$50,000', members: 4, return: '+22.1%' }
            ].map((pool, index) => (
              <motion.div 
                key={pool.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="neo-card p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-primary-900 dark:text-primary-100">{pool.name}</h4>
                    <p className="text-sm text-gray-500">{pool.members} members</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary-900 dark:text-primary-100">{pool.value}</p>
                    <p className="text-sm text-green-600">{pool.return}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderAutomatedBankingContent = () => {
    return (
      <div className="space-y-6">
        {/* Bank Connection */}
        <div className="neo-card p-6">
          <h3 className="text-xl font-semibold mb-4 text-primary-900 dark:text-primary-100">Connect Your Bank</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'Chase', icon: <Building2 /> },
              { name: 'Wells Fargo', icon: <Building2 /> },
              { name: 'Bank of America', icon: <Building2 /> },
              { name: 'Citibank', icon: <Building2 /> }
            ].map((bank, index) => (
              <motion.button
                key={bank.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedBank(bank.name)}
                className={`neo-button flex items-center space-x-3 p-4 transition-all duration-200 ${
                  selectedBank === bank.name
                    ? 'ring-2 ring-primary-500'
                    : ''
                }`}
              >
                <div className="neo-button p-2 text-primary-600 dark:text-primary-400">
                  {bank.icon}
                </div>
                <span className="font-medium text-primary-900 dark:text-primary-100">{bank.name}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* NWS Setup */}
        <div className="neo-card p-6">
          <h3 className="text-xl font-semibold mb-4 text-primary-900 dark:text-primary-100">N.W.S Configuration</h3>
          <div className="space-y-6">
            {[
              { key: 'needs', label: 'Needs', color: 'text-blue-600' },
              { key: 'wants', label: 'Wants', color: 'text-purple-600' },
              { key: 'savings', label: 'Savings', color: 'text-green-600' }
            ].map((item, index) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-primary-900 dark:text-primary-100">
                    {item.label} ({nwsPercentages[item.key as keyof typeof nwsPercentages]}%)
                  </span>
                  <span className={`${item.color} font-semibold`}>
                    ${(5000 * nwsPercentages[item.key as keyof typeof nwsPercentages] / 100).toFixed(2)}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={nwsPercentages[item.key as keyof typeof nwsPercentages]}
                  onChange={(e) => setNwsPercentages(prev => ({ ...prev, [item.key]: parseInt(e.target.value) }))}
                  className="w-full accent-primary-600"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Automation Rules */}
        <div className="neo-card p-6">
          <h3 className="text-xl font-semibold mb-4 text-primary-900 dark:text-primary-100">Active Automation Rules</h3>
          <div className="space-y-4">
            {[
              { name: 'Monthly Savings Transfer', amount: '$500', frequency: 'Monthly', status: 'Active' },
              { name: 'Bill Payment', amount: '$150', frequency: 'Weekly', status: 'Active' },
              { name: 'Investment Contribution', amount: '$1,000', frequency: 'Monthly', status: 'Active' }
            ].map((rule, index) => (
              <motion.div 
                key={rule.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="neo-card p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-primary-900 dark:text-primary-100">{rule.name}</h4>
                    <p className="text-sm text-gray-500">{rule.frequency}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary-900 dark:text-primary-100">{rule.amount}</p>
                    <p className="text-sm text-green-600">{rule.status}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderDebtRepaymentContent = () => {
    return (
      <div className="space-y-6">
        {/* Debt Input Form */}
        <div className="neo-card p-6">
          <h3 className="text-xl font-semibold mb-4 text-primary-900 dark:text-primary-100">Add New Debt</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Debt Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="text"
                  value={debtAmount}
                  onChange={(e) => setDebtAmount(parseInt(e.target.value))}
                  className="neo-input pl-8 w-full"
                  placeholder="Enter amount"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Interest Rate (%)
              </label>
              <input
                type="text"
                value={interestRate}
                onChange={(e) => setInterestRate(parseInt(e.target.value))}
                className="neo-input w-full"
                placeholder="Enter rate"
              />
            </div>
            <button className="w-full neo-button px-4 py-3 text-primary-600 dark:text-primary-400 font-medium">
              Add Debt
            </button>
          </div>
        </div>

        {/* Debt Overview */}
        <div className="neo-card p-6">
          <h3 className="text-xl font-semibold mb-4 text-primary-900 dark:text-primary-100">Debt Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              { title: 'Total Debt', value: '$45,000', change: '+2.3% from last month', color: 'text-red-600' },
              { title: 'Monthly Payment', value: '$1,250', change: 'On track', color: 'text-green-600' },
              { title: 'Debt Free Date', value: 'Jun 2025', change: '-3 months', color: 'text-green-600' }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="neo-card p-4"
              >
                <h4 className="text-sm text-gray-600 dark:text-gray-400">{item.title}</h4>
                <p className="text-2xl font-bold text-primary-900 dark:text-primary-100">{item.value}</p>
                <span className={`text-sm ${item.color}`}>{item.change}</span>
              </motion.div>
            ))}
          </div>

          {/* Active Debts */}
          <div className="space-y-4">
            {[
              { name: 'Credit Card', amount: 15000, rate: 18.99, progress: 35 },
              { name: 'Car Loan', amount: 20000, rate: 5.99, progress: 45 },
              { name: 'Personal Loan', amount: 10000, rate: 8.99, progress: 60 }
            ].map((debt, index) => (
              <motion.div 
                key={debt.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="neo-card p-4"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-primary-900 dark:text-primary-100">{debt.name}</h4>
                    <p className="text-sm text-gray-500">{debt.rate}% APR</p>
                  </div>
                  <p className="font-semibold text-primary-900 dark:text-primary-100">
                    ${debt.amount.toLocaleString()}
                  </p>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Progress</span>
                    <span className="text-primary-900 dark:text-primary-100">{debt.progress}%</span>
                  </div>
                  <ProgressBar percentage={debt.progress} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Repayment Strategy */}
        <div className="neo-card p-6">
          <h3 className="text-xl font-semibold mb-4 text-primary-900 dark:text-primary-100">Recommended Strategy</h3>
          <div className="space-y-4">
            <div className="neo-card p-4 border-l-4 border-green-500">
              <h4 className="font-medium text-green-700 dark:text-green-300">Avalanche Method</h4>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                Focus on high-interest debt first while maintaining minimum payments on others
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="neo-card p-4">
                <h4 className="font-medium text-primary-900 dark:text-primary-100 mb-2">Monthly Savings</h4>
                <p className="text-2xl font-bold text-green-600">$350</p>
                <p className="text-sm text-gray-500 mt-1">In interest charges</p>
              </div>
              <div className="neo-card p-4">
                <h4 className="font-medium text-primary-900 dark:text-primary-100 mb-2">Time Saved</h4>
                <p className="text-2xl font-bold text-green-600">8 months</p>
                <p className="text-sm text-gray-500 mt-1">Compared to minimum payments</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-beige-50 to-primary-100 p-6 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Super Features
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Explore our advanced financial management tools and features
          </p>
        </div>

        <div className="space-y-8">
          {features.map((feature, index) => (
            <div key={feature.id} className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`neo-card p-6 cursor-pointer transition-all duration-300 hover:shadow-xl ${
                  selectedFeature === feature.id ? 'ring-2 ring-primary-500' : ''
                }`}
                onClick={() => setSelectedFeature(
                  selectedFeature === feature.id ? null : feature.id
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="neo-button w-12 h-12 flex items-center justify-center text-primary-600 dark:text-primary-400">
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-primary-900 dark:text-primary-100">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mt-1">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${feature.color} bg-opacity-10 border border-current`}>
                      {feature.status}
                    </span>
                    <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                      selectedFeature === feature.id ? 'rotate-90' : ''
                    }`} />
                  </div>
                </div>
                
                <div className="mt-4">
                  <button className="neo-button px-4 py-2 text-primary-600 dark:text-primary-400 font-medium hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors duration-200">
                    {feature.action}
                  </button>
                </div>
              </motion.div>

              <AnimatePresence>
                {selectedFeature === feature.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pl-4 border-l-2 border-primary-500"
                  >
                    {/* Sub-features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      {feature.subFeatures.map((subFeature, subIndex) => (
                        <motion.div
                          key={subIndex}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: subIndex * 0.1 }}
                          className="neo-card p-4 space-y-3 hover:shadow-lg transition-all duration-300"
                        >
                          <div className="flex items-start justify-between">
                            <div className="neo-button p-2 text-primary-600 dark:text-primary-400">
                              {subFeature.icon}
                            </div>
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                              subFeature.status === 'Active' ? 'text-green-600 dark:text-green-400' :
                              subFeature.status === 'Beta' ? 'text-yellow-600 dark:text-yellow-400' :
                              'text-blue-600 dark:text-blue-400'
                            } bg-opacity-10 border border-current`}>
                              {subFeature.status}
                            </span>
                          </div>
                          <h4 className="font-semibold text-primary-900 dark:text-primary-100">
                            {subFeature.title}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                            {subFeature.description}
                          </p>
                          <button className="w-full neo-button px-3 py-2 text-primary-600 dark:text-primary-400 font-medium text-sm">
                            {subFeature.action}
                          </button>
                        </motion.div>
                      ))}
                    </div>

                    {/* Feature-specific Content */}
                    <div className="neo-card p-6">
                      {feature.id === 'investment-pooling' && renderInvestmentPoolingContent()}
                      {feature.id === 'automated-banking' && renderAutomatedBankingContent()}
                      {feature.id === 'debt-repayment' && renderDebtRepaymentContent()}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}