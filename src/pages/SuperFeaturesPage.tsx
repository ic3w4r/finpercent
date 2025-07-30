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
      description: 'Pool resources with others for larger investment opportunities',
      subFeatures: [
        {
          title: 'Pool Creation',
          description: 'Start a new investment pool with customized parameters',
          icon: <BadgeDollarSign className="w-5 h-5" />,
          action: 'Create Pool'
        },
        {
          title: 'Risk Management',
          description: 'Advanced risk assessment and mitigation tools',
          icon: <Scale className="w-5 h-5" />,
          action: 'Analyze Risk'
        },
        {
          title: 'Performance Tracking',
          description: 'Monitor and analyze pool performance metrics',
          icon: <LineChart className="w-5 h-5" />,
          action: 'View Analytics'
        }
      ]
    },
    {
      id: 'automated-banking',
      title: 'Automated Banking',
      icon: <Building2 className="w-6 h-6" />,
      description: 'Automate your banking operations and transactions',
      subFeatures: [
        {
          title: 'Bank Integration',
          description: 'Connect and manage multiple bank accounts',
          icon: <Landmark className="w-5 h-5" />,
          action: 'Connect Bank'
        },
        {
          title: 'Smart Transfers',
          description: 'Set up automated transfers and bill payments',
          icon: <BanknoteIcon className="w-5 h-5" />,
          action: 'Setup Transfers'
        },
        {
          title: 'Transaction Rules',
          description: 'Create custom rules for automated transactions',
          icon: <Calculator className="w-5 h-5" />,
          action: 'Create Rules'
        }
      ]
    },
    {
      id: 'debt-repayment',
      title: 'Debt Repayment',
      icon: <Calculator className="w-6 h-6" />,
      description: 'Optimize your debt repayment strategy',
      subFeatures: [
        {
          title: 'Debt Analysis',
          description: 'Comprehensive analysis of your debt situation',
          icon: <PieChart className="w-5 h-5" />,
          action: 'Analyze Debt'
        },
        {
          title: 'Payment Planning',
          description: 'Create optimized debt repayment schedules',
          icon: <Calendar className="w-5 h-5" />,
          action: 'Plan Payments'
        },
        {
          title: 'Progress Tracking',
          description: 'Monitor your debt repayment progress',
          icon: <TrendingUp className="w-5 h-5" />,
          action: 'Track Progress'
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
          {poolMetrics.map((metric) => (
            <div key={metric.title} className="bg-white dark:bg-gray-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
                  {metric.icon}
                </div>
                <span className="text-green-600 text-sm">{metric.change}</span>
              </div>
              <h3 className="text-gray-600 dark:text-gray-400 text-sm">{metric.title}</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
            </div>
          ))}
        </div>

        {/* Pool Creation Form */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">Create New Investment Pool</h3>
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
                  className="pl-8 w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                  placeholder="Enter amount"
                />
              </div>
            </div>
            <button className="w-full py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
              Create Pool
            </button>
          </div>
        </div>

        {/* Active Pools */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">Active Pools</h3>
          <div className="space-y-4">
            {[
              { name: 'Tech Growth Fund', value: '$75,000', members: 5, return: '+15.2%' },
              { name: 'Real Estate Pool', value: '$250,000', members: 12, return: '+8.7%' },
              { name: 'Startup Fund', value: '$50,000', members: 4, return: '+22.1%' }
            ].map((pool) => (
              <div key={pool.name} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{pool.name}</h4>
                  <p className="text-sm text-gray-500">{pool.members} members</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900 dark:text-white">{pool.value}</p>
                  <p className="text-sm text-green-600">{pool.return}</p>
                </div>
              </div>
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
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">Connect Your Bank</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'Chase', icon: <Building2 /> },
              { name: 'Wells Fargo', icon: <Building2 /> },
              { name: 'Bank of America', icon: <Building2 /> },
              { name: 'Citibank', icon: <Building2 /> }
            ].map((bank) => (
              <button
                key={bank.name}
                onClick={() => setSelectedBank(bank.name)}
                className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-colors ${
                  selectedBank === bank.name
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-primary-500'
                }`}
              >
                <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
                  {bank.icon}
                </div>
                <span className="font-medium">{bank.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* NWS Setup */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">N.W.S Configuration</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Needs ({nwsPercentages.needs}%)</span>
                <span className="text-primary-600">${(5000 * nwsPercentages.needs / 100).toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={nwsPercentages.needs}
                onChange={(e) => setNwsPercentages(prev => ({ ...prev, needs: parseInt(e.target.value) }))}
                className="w-full"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Wants ({nwsPercentages.wants}%)</span>
                <span className="text-primary-600">${(5000 * nwsPercentages.wants / 100).toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={nwsPercentages.wants}
                onChange={(e) => setNwsPercentages(prev => ({ ...prev, wants: parseInt(e.target.value) }))}
                className="w-full"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Savings ({nwsPercentages.savings}%)</span>
                <span className="text-primary-600">${(5000 * nwsPercentages.savings / 100).toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={nwsPercentages.savings}
                onChange={(e) => setNwsPercentages(prev => ({ ...prev, savings: parseInt(e.target.value) }))}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Automation Rules */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">Active Automation Rules</h3>
          <div className="space-y-4">
            {[
              { name: 'Monthly Savings Transfer', amount: '$500', frequency: 'Monthly', status: 'Active' },
              { name: 'Bill Payment', amount: '$150', frequency: 'Weekly', status: 'Active' },
              { name: 'Investment Contribution', amount: '$1,000', frequency: 'Monthly', status: 'Active' }
            ].map((rule) => (
              <div key={rule.name} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{rule.name}</h4>
                  <p className="text-sm text-gray-500">{rule.frequency}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900 dark:text-white">{rule.amount}</p>
                  <p className="text-sm text-green-600">{rule.status}</p>
                </div>
              </div>
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
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">Add New Debt</h3>
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
                  className="pl-8 w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700"
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
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                placeholder="Enter rate"
              />
            </div>
            <button className="w-full py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
              Add Debt
            </button>
          </div>
        </div>

        {/* Debt Overview */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">Debt Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
              <h4 className="text-sm text-gray-600 dark:text-gray-400">Total Debt</h4>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">$45,000</p>
              <span className="text-sm text-red-600">+2.3% from last month</span>
            </div>
            <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
              <h4 className="text-sm text-gray-600 dark:text-gray-400">Monthly Payment</h4>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">$1,250</p>
              <span className="text-sm text-green-600">On track</span>
            </div>
            <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
              <h4 className="text-sm text-gray-600 dark:text-gray-400">Debt Free Date</h4>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">Jun 2025</p>
              <span className="text-sm text-green-600">-3 months</span>
            </div>
          </div>

          {/* Active Debts */}
          <div className="space-y-4">
            {[
              { name: 'Credit Card', amount: 15000, rate: 18.99, progress: 35 },
              { name: 'Car Loan', amount: 20000, rate: 5.99, progress: 45 },
              { name: 'Personal Loan', amount: 10000, rate: 8.99, progress: 60 }
            ].map((debt) => (
              <div key={debt.name} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{debt.name}</h4>
                    <p className="text-sm text-gray-500">{debt.rate}% APR</p>
                  </div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    ${debt.amount.toLocaleString()}
                  </p>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Progress</span>
                    <span className="text-gray-900 dark:text-white">{debt.progress}%</span>
                  </div>
                  <ProgressBar percentage={debt.progress} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Repayment Strategy */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">Recommended Strategy</h3>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-medium text-green-800 dark:text-green-200">Avalanche Method</h4>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                Focus on high-interest debt first while maintaining minimum payments on others
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Monthly Savings</h4>
                <p className="text-2xl font-bold text-green-600">$350</p>
                <p className="text-sm text-gray-500 mt-1">In interest charges</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Time Saved</h4>
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
          {features.map((feature) => (
            <div key={feature.id} className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`glass-card p-6 cursor-pointer transition-all duration-300 ${
                  selectedFeature === feature.id ? 'ring-2 ring-primary-500' : ''
                }`}
                onClick={() => setSelectedFeature(
                  selectedFeature === feature.id ? null : feature.id
                )}
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-xl">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
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
                    {feature.subFeatures.map((subFeature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-card p-4 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex flex-col items-center text-center space-y-3">
                          <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
                            {subFeature.icon}
                          </div>
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {subFeature.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {subFeature.description}
                          </p>
                          <button className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium">
                            <span>{subFeature.action}</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Feature-specific Content */}
                  <div className="glass-card p-6">
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