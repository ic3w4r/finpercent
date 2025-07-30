import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, TrendingDown, DollarSign, 
  Activity, PieChart, BarChart2, 
  Target, Briefcase, ShoppingBag,
  Wallet, ArrowDownCircle, ArrowUpCircle,
  PiggyBank, Receipt, Building2, Book,
  BookOpen, ChevronRight, BarChart3
} from 'lucide-react';
import StockMarketLayout from '../layouts/StockMarketLayout';
import MarketChart from '../components/stock-market/MarketChart';
import { STOPMethod } from '../components/STOPMethod';
import NWSMethod from '../components/stats/NWSMethod';
import DebtManagement from '../components/DebtManagement';
import KakeiboMethod from '../components/KakeiboMethod';
import { useNavigate, Link } from 'react-router-dom';

type MethodType = 'nws' | 'kakeibo';

// Core Business KPIs
const businessKPIs = [
  {
    label: 'STOP Score',
    value: '85.4',
    change: 3.2,
    icon: <Target className="w-5 h-5 text-primary-600" />
  },
  {
    label: 'NWS Balance',
    value: '$24.5K',
    change: -1.8,
    icon: <Wallet className="w-5 h-5 text-primary-600" />
  },
  {
    label: 'Debt Ratio',
    value: '18.6%',
    change: -2.4,
    icon: <ArrowDownCircle className="w-5 h-5 text-primary-600" />
  }
];

// Financial Method Metrics
const methodMetrics = [
  { 
    category: 'STOP Method', 
    value: 'Optimized', 
    score: 85.4,
    change: 2.8,
    description: 'Business optimization score'
  },
  { 
    category: 'NWS Method', 
    value: 'Balanced', 
    score: 78.2,
    change: 1.5,
    description: 'Personal finance balance'
  },
  { 
    category: 'Debt Management', 
    value: 'Reducing', 
    score: 92.1,
    change: -3.2,
    description: 'Debt reduction progress'
  }
];

// Detailed Breakdown Data
const detailedBreakdowns = {
  stop: [
    {
      name: 'Savings',
      percentage: 25,
      amount: 2500,
      icon: <PiggyBank className="w-6 h-6 text-green-600" />,
      color: 'text-green-600',
      details: [
        { name: 'Emergency Fund', percentage: 40, amount: 1000, description: 'Business contingency reserve' },
        { name: 'Investment Reserve', percentage: 40, amount: 1000, description: 'Future business expansion' },
        { name: 'Asset Acquisition', percentage: 20, amount: 500, description: 'Equipment and infrastructure' }
      ]
    },
    {
      name: 'Taxes',
      percentage: 30,
      amount: 3000,
      icon: <Receipt className="w-6 h-6 text-red-600" />,
      color: 'text-red-600',
      details: [
        { name: 'Income Tax', percentage: 50, amount: 1500, description: 'Corporate income tax provision' },
        { name: 'VAT/Sales Tax', percentage: 33, amount: 1000, description: 'Value added and sales tax' },
        { name: 'Other Taxes', percentage: 17, amount: 500, description: 'Local and miscellaneous taxes' }
      ]
    },
    {
      name: 'Operations',
      percentage: 35,
      amount: 3500,
      icon: <Building2 className="w-6 h-6 text-blue-600" />,
      color: 'text-blue-600',
      details: [
        { name: 'Staff & Payroll', percentage: 45, amount: 1575, description: 'Employee salaries and benefits' },
        { name: 'Production Costs', percentage: 30, amount: 1050, description: 'Manufacturing and service delivery' },
        { name: 'Operating Expenses', percentage: 25, amount: 875, description: 'Utilities, rent, and supplies' }
      ]
    },
    {
      name: 'Profit',
      percentage: 10,
      amount: 1000,
      icon: <TrendingUp className="w-6 h-6 text-purple-600" />,
      color: 'text-purple-600',
      details: [
        { name: 'Shareholder Distribution', percentage: 40, amount: 400, description: 'Dividend payments' },
        { name: 'Business Growth', percentage: 40, amount: 400, description: 'Reinvestment in business' },
        { name: 'Innovation Fund', percentage: 20, amount: 200, description: 'R&D and new initiatives' }
      ]
    }
  ],
  nws: [
    {
      name: 'Necessities',
      percentage: 50,
      amount: 5000,
      icon: <Wallet className="w-6 h-6 text-blue-600" />,
      color: 'text-blue-600',
      details: [
        { name: 'Housing', percentage: 40, amount: 2000, description: 'Rent/Mortgage and utilities' },
        { name: 'Transportation', percentage: 30, amount: 1500, description: 'Vehicle and commuting costs' },
        { name: 'Food', percentage: 30, amount: 1500, description: 'Groceries and essentials' }
      ]
    },
    {
      name: 'Wants',
      percentage: 30,
      amount: 3000,
      icon: <ShoppingBag className="w-6 h-6 text-purple-600" />,
      color: 'text-purple-600',
      details: [
        { name: 'Entertainment', percentage: 40, amount: 1200, description: 'Leisure activities' },
        { name: 'Shopping', percentage: 30, amount: 900, description: 'Non-essential purchases' },
        { name: 'Dining Out', percentage: 30, amount: 900, description: 'Restaurants and takeout' }
      ]
    },
    {
      name: 'Savings',
      percentage: 20,
      amount: 2000,
      icon: <PiggyBank className="w-6 h-6 text-green-600" />,
      color: 'text-green-600',
      details: [
        { name: 'Emergency Fund', percentage: 40, amount: 800, description: 'Rainy day fund' },
        { name: 'Investments', percentage: 40, amount: 800, description: 'Long-term investments' },
        { name: 'Goals', percentage: 20, amount: 400, description: 'Specific financial goals' }
      ]
    }
  ]
};

// Zone of Play Component
const ZoneOfPlay = () => {
  const [position, setPosition] = useState(-80); // Start from distress zone
  const [isAnimating, setIsAnimating] = useState(true);
  const [displayValue, setDisplayValue] = useState(0);

  // Altman Z-Score ranges
  const zones = {
    distress: { min: -100, max: -33 }, // Z-Score < 1.8
    caution: { min: -33, max: 33 },    // 1.8 < Z-Score < 3.0
    safe: { min: 33, max: 100 }        // Z-Score > 3.0
  };

  // Target position for Z-Score of 2.8 (upper caution zone)
  const targetPosition = 25;

  useEffect(() => {
    let animationFrame: number;
    let startTime: number;
    const duration = 6000; // 6 seconds total animation
    const bounceCount = 8; // Number of bounces
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      if (progress < 0.8) { // First 80% of time for bouncing
        // Create a bouncing effect using sine and exponential decay
        const bounce = Math.sin(progress * bounceCount * Math.PI * 2);
        const decay = Math.exp(-progress * 3);
        
        // Calculate base position moving from distress to target
        const basePosition = -80 + (targetPosition + 80) * (progress / 0.8);
        
        // Calculate bounce amplitude that decreases as we progress
        const maxBounceAmplitude = 50 * (1 - progress); // Starts at 50, reduces to 0
        const randomOffset = bounce * decay * maxBounceAmplitude;
        
        // Ensure position stays within bounds
        const newPosition = Math.max(-100, Math.min(100, basePosition + randomOffset));
        setPosition(newPosition);

        // Animate the display value with a similar but smaller bounce effect
        const baseValue = 2.8 * (progress / 0.8);
        const valueOffset = bounce * decay * 0.5; // Smaller bounce for the value
        setDisplayValue(Math.max(0, Math.min(5, baseValue + valueOffset)));
      } else {
        // Final 20% of time for settling
        const settlingProgress = (progress - 0.8) / 0.2;
        const easedProgress = 1 - Math.pow(1 - settlingProgress, 3); // Cubic ease-out
        
        // Smoothly settle to target position
        const currentPos = position;
        const diff = targetPosition - currentPos;
        setPosition(currentPos + diff * easedProgress);
        
        // Smoothly settle display value
        const currentValue = displayValue;
        const valueDiff = 2.8 - currentValue;
        setDisplayValue(currentValue + valueDiff * easedProgress);
        
        if (progress === 1) {
          setIsAnimating(false);
          return;
        }
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  const getZoneFromPosition = (pos: number) => {
    if (pos <= zones.distress.max) return 'Distress';
    if (pos <= zones.caution.max) return 'Caution';
    return 'Safe';
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Zone of Play
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Altman Z-Score Analysis
        </p>
        <motion.div 
          className="text-4xl font-bold mt-2 text-primary-600 dark:text-primary-400"
          animate={{ scale: isAnimating ? [1, 1.1, 1] : 1 }}
          transition={{ 
            duration: 0.5,
            repeat: isAnimating ? Infinity : 0,
            repeatType: "reverse"
          }}
        >
          {displayValue.toFixed(1)}
        </motion.div>
      </div>

      <div className="relative h-24 mb-4">
        <div className="absolute inset-0 flex items-center">
          {/* Background gradient for zones */}
          <div className="w-full h-4 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500" />
          
          {/* Animated slider */}
          <motion.div
            className="absolute w-6 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center"
            style={{ 
              left: `${((position + 100) / 200) * 100}%`,
              x: "-50%"
            }}
            animate={{
              scale: isAnimating ? [1, 1.2, 1] : 1,
            }}
            transition={{
              scale: {
                duration: 0.5,
                repeat: isAnimating ? Infinity : 0,
                repeatType: "reverse"
              }
            }}
          >
            <div className="w-2 h-2 rounded-full bg-primary-600" />
          </motion.div>
        </div>
      </div>

      {/* Zone labels */}
      <div className="flex justify-between text-sm font-medium">
        <span className="text-red-600 dark:text-red-400">Distress</span>
        <span className="text-yellow-600 dark:text-yellow-400">Caution</span>
        <span className="text-green-600 dark:text-green-400">Safe</span>
      </div>

      {/* Current zone indicator */}
      <div className="text-center mt-4">
        <motion.span 
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            getZoneFromPosition(position) === 'Safe' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
              : getZoneFromPosition(position) === 'Caution'
              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
              : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
          }`}
          animate={{
            scale: isAnimating ? [1, 1.05, 1] : 1
          }}
          transition={{
            duration: 0.5,
            repeat: isAnimating ? Infinity : 0,
            repeatType: "reverse"
          }}
        >
          {getZoneFromPosition(position)} Zone
        </motion.span>
      </div>
    </div>
  );
};

export default function StockMarketPage() {
  const [activeMethod, setActiveMethod] = useState('overview');
  const [activeSubMethod, setActiveSubMethod] = useState<MethodType>('nws');
  const [showMethodToggle, setShowMethodToggle] = useState(false);
  const navigate = useNavigate();

  // Handle method switch between NWS and Kakeibo
  const handleMethodSwitch = (method: MethodType) => {
    setActiveSubMethod(method);
    if (method === 'kakeibo') {
      navigate('/kakeibo');
    }
  };

  const renderDetailedBreakdown = (method: 'stop' | 'nws') => (
    <div className="space-y-6">
      {detailedBreakdowns[method].map((category) => (
        <motion.div
          key={category.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg bg-opacity-20 ${category.color.replace('text', 'bg')}`}>
                {category.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {category.percentage}% - ${category.amount.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            {category.details.map((detail) => (
              <div key={detail.name} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{detail.name}</h4>
                    <p className="text-sm text-gray-500">{detail.description}</p>
                  </div>
                  <div className="text-right">
                    <span className={`font-medium ${category.color}`}>{detail.percentage}%</span>
                    <p className="text-sm text-gray-500">${detail.amount.toLocaleString()}</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full ${category.color.replace('text', 'bg')}`}
                    style={{ width: `${detail.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Method Selection Tabs - Scrollable on mobile */}
        <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0 mb-6">
          <div className="flex space-x-2 min-w-max pb-2">
            <button
              onClick={() => setActiveMethod('overview')}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 whitespace-nowrap ${
                activeMethod === 'overview'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
              }`}
            >
              <PieChart className="w-4 h-4" />
              <span>Overview</span>
            </button>
            <button
              onClick={() => setActiveMethod('stop')}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 whitespace-nowrap ${
                activeMethod === 'stop'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
              }`}
            >
              <Target className="w-4 h-4" />
              <span>STOP Method</span>
            </button>
            <div className="relative">
              <button
                onClick={() => {
                  setActiveMethod('nws');
                  setShowMethodToggle(true);
                }}
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 whitespace-nowrap ${
                  activeMethod === 'nws'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                }`}
              >
                <Wallet className="w-4 h-4" />
                <span>NWS Method</span>
              </button>
              
              {showMethodToggle && activeMethod === 'nws' && (
                <div className="absolute top-full mt-2 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 z-50">
                  <div className="flex flex-col space-y-2">
                    <button
                      onClick={() => handleMethodSwitch('nws')}
                      className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${activeSubMethod === 'nws' ? 'bg-primary-100 text-primary-600' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                    >
                      <Wallet className="w-4 h-4" />
                      <span>NWS</span>
                    </button>
                    <button
                      onClick={() => handleMethodSwitch('kakeibo')}
                      className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${activeSubMethod === 'kakeibo' ? 'bg-primary-100 text-primary-600' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                    >
                      <Book className="w-4 h-4" />
                      <span>Kakeibo</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={() => setActiveMethod('debt')}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 whitespace-nowrap ${
                activeMethod === 'debt'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
              }`}
            >
              <ArrowDownCircle className="w-4 h-4" />
              <span>Debt Management</span>
            </button>
          </div>
        </div>

        {/* Business KPIs - Grid layout adjusts for mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {businessKPIs.map((kpi, index) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{kpi.label}</p>
                  <p className="mt-2 text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                    {kpi.value}
                  </p>
                </div>
                <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg">
                  {kpi.icon}
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center">
                  {kpi.change > 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                  )}
                  <span className={kpi.change > 0 ? 'text-green-500' : 'text-red-500'}>
                    {kpi.change > 0 ? '+' : ''}{kpi.change}%
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Zone of Play - Only visible in overview */}
        {activeMethod === 'overview' && <ZoneOfPlay />}

        {/* Method Content */}
        <div className="min-h-[600px] space-y-6">
          {activeMethod === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {methodMetrics.map((method) => (
                <motion.div
                  key={method.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {method.category}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      method.change > 0 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                    }`}>
                      {method.change > 0 ? '+' : ''}{method.change}%
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-baseline justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Score</span>
                      <span className="text-2xl font-bold text-primary-600">{method.score}</span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Status</span>
                      <span className="font-medium text-gray-900 dark:text-white">{method.value}</span>
                    </div>
                    <p className="text-sm text-gray-500">{method.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeMethod === 'stop' && (
            <div className="space-y-6">
              <div className="mt-8">
                <div className="flex flex-col space-y-2 mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    S.T.O.P Method Analysis
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">$10,000</span>
                    <span className="text-sm text-green-600">+15%</span>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {[
                    { letter: 'S', label: 'Savings', percent: '25%', amount: '$2,500', color: 'bg-green-500', path: '/method/stop/savings' },
                    { letter: 'T', label: 'Taxes', percent: '30%', amount: '$3,000', color: 'bg-red-500', path: '/method/stop/taxes' },
                    { letter: 'O', label: 'Operations', percent: '35%', amount: '$3,500', color: 'bg-blue-500', path: '/method/stop/operations' },
                    { letter: 'P', label: 'Profit', percent: '10%', amount: '$1,000', color: 'bg-purple-500', path: '/method/stop/profit' }
                  ].map((item) => (
                    <div
                      key={item.letter}
                      onClick={() => navigate(item.path)}
                      className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className={`${item.color} w-8 h-8 rounded-full flex items-center justify-center text-white font-bold`}>
                          {item.letter}
                        </div>
                        <span className="text-gray-600 dark:text-gray-400">{item.percent}</span>
                      </div>
                      <div className="mt-1">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{item.label}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{item.amount}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {renderDetailedBreakdown('stop')}
            </div>
          )}

          {activeMethod === 'nws' && (
            <div className="space-y-6">
              <div className="mt-12">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {activeSubMethod === 'nws' ? 'NWS Method Analysis' : 'Kakeibo Method Analysis'}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">$10,000</span>
                      <span className="text-sm text-green-600">+12.5%</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                    <button
                      onClick={() => setActiveSubMethod('nws')}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                        activeSubMethod === 'nws'
                          ? 'bg-white dark:bg-gray-700 shadow-sm'
                          : 'hover:bg-white/50 dark:hover:bg-gray-700/50'
                      }`}
                    >
                      <Wallet className="w-5 h-5" />
                      <span>NWS Method</span>
                    </button>
                    <button
                      onClick={() => setActiveSubMethod('kakeibo')}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                        activeSubMethod === 'kakeibo'
                          ? 'bg-white dark:bg-gray-700 shadow-sm'
                          : 'hover:bg-white/50 dark:hover:bg-gray-700/50'
                      }`}
                    >
                      <Book className="w-5 h-5" />
                      <span>Kakeibo Method</span>
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { letter: 'N', label: 'Necessities', percent: '50%', amount: '$5,000', color: 'bg-blue-500', path: '/method/nws/necessities' },
                    { letter: 'W', label: 'Wants', percent: '30%', amount: '$3,000', color: 'bg-purple-500', path: '/method/nws/wants' },
                    { letter: 'S', label: 'Savings', percent: '20%', amount: '$2,000', color: 'bg-green-500', path: '/method/nws/savings' }
                  ].map((item) => (
                    <div
                      key={item.letter}
                      onClick={() => navigate(item.path)}
                      className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className={`${item.color} w-8 h-8 rounded-full flex items-center justify-center text-white font-bold`}>
                          {item.letter}
                        </div>
                        <span className="text-gray-600 dark:text-gray-400">{item.percent}</span>
                      </div>
                      <div className="mt-1">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{item.label}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{item.amount}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {activeSubMethod === 'kakeibo' ? (
                  <KakeiboMethod monthlyIncome={10000} />
                ) : (
                  /* Line Charts for NWS Categories */
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Necessities Trend</h4>
                      <div className="h-48">
                        <MarketChart
                          data={{
                            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                            datasets: [{
                              label: 'Necessities',
                              data: [4800, 4900, 4950, 5100, 5050, 5000],
                              borderColor: '#3b82f6',
                              backgroundColor: 'transparent',
                            }]
                          }}
                          height={180}
                        />
                      </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Wants Trend</h4>
                      <div className="h-48">
                        <MarketChart
                          data={{
                            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                            datasets: [{
                              label: 'Wants',
                              data: [2800, 2900, 2950, 3100, 3050, 3000],
                              borderColor: '#a855f7',
                              backgroundColor: 'transparent',
                            }]
                          }}
                          height={180}
                        />
                      </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Savings Trend</h4>
                      <div className="h-48">
                        <MarketChart
                          data={{
                            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                            datasets: [{
                              label: 'Savings',
                              data: [1800, 1850, 1900, 1950, 1980, 2000],
                              borderColor: '#22c55e',
                              backgroundColor: 'transparent',
                            }]
                          }}
                          height={180}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeMethod === 'debt' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6">
              <DebtManagement />
            </div>
          )}
        </div>

        {/* Additional Insights - Responsive grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Method Integration
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">STOP + NWS Synergy</span>
                <span className="font-medium text-green-600">92%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Debt Optimization</span>
                <span className="font-medium text-blue-600">85%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Overall Efficiency</span>
                <span className="font-medium text-primary-600">88%</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Recommendations
            </h3>
            <div className="space-y-4">
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-sm text-green-700 dark:text-green-300">
                  Increase STOP method implementation in operations
                </p>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Optimize NWS allocation for better returns
                </p>
              </div>
              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <p className="text-sm text-purple-700 dark:text-purple-300">
                  Accelerate debt reduction using snowball method
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Next Steps
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                  <span className="text-primary-700 dark:text-primary-300 font-medium">1</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Review STOP method metrics weekly
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                  <span className="text-primary-700 dark:text-primary-300 font-medium">2</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Update NWS allocations monthly
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                  <span className="text-primary-700 dark:text-primary-300 font-medium">3</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Track debt reduction progress
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Methods Guide Section */}
        <div className="mt-8 space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Financial Methods Guide
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Understand how our proven financial methodologies integrate with stock market analysis 
              to optimize your investment strategy and financial planning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* NWS Method Guide */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-blue-500"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
                  <Wallet className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    NWS Method
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Needs, Wants, Savings
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                Allocate your portfolio across essential expenses (50%), discretionary spending (30%), 
                and investments (20%) for balanced market exposure and risk management.
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Market Integration:</span>
                  <span className="text-xs font-medium text-blue-600">Portfolio Allocation</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Risk Level:</span>
                  <span className="text-xs font-medium text-green-600">Moderate</span>
                </div>
              </div>
              <Link 
                to="/methods/nws"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                Learn NWS Method
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </motion.div>

            {/* Kakeibo Method Guide */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-green-500"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg mr-4">
                  <BookOpen className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Kakeibo Method
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Japanese Budgeting
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                Traditional Japanese approach to mindful spending and saving, helping identify 
                surplus funds for strategic market investments through conscious expense tracking.
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Market Integration:</span>
                  <span className="text-xs font-medium text-green-600">Surplus Identification</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Focus:</span>
                  <span className="text-xs font-medium text-green-600">Mindful Investment</span>
                </div>
              </div>
              <Link 
                to="/methods/kakeibo"
                className="inline-flex items-center text-green-600 hover:text-green-700 font-medium text-sm"
              >
                Learn Kakeibo Method
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </motion.div>

            {/* STOP Method Guide */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-purple-500"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg mr-4">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    S.T.O.P Method
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Savings, Taxes, Operations, Profit
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                Business-focused allocation strategy optimizing cash flow for market opportunities. 
                Balance operational needs with strategic investments for sustainable growth.
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Market Integration:</span>
                  <span className="text-xs font-medium text-purple-600">Business Growth</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Best For:</span>
                  <span className="text-xs font-medium text-purple-600">Entrepreneurs</span>
                </div>
              </div>
              <Link 
                to="/methods/stop"
                className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium text-sm"
              >
                Learn S.T.O.P Method
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </motion.div>
          </div>

          {/* Method Integration with Stock Market */}
          <div className="bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <BarChart3 className="w-6 h-6 text-primary-600 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                How Methods Enhance Market Analysis
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">1</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Risk Assessment</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Methods help determine your risk capacity based on financial structure and obligations.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">2</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Capital Allocation</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Systematic approach to determining how much capital to deploy in different market sectors.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">3</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Performance Tracking</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Monitor investment performance against your structured financial plan and goals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
