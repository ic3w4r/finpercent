import React from 'react';
import { motion } from 'framer-motion';
import {
  Wallet, PiggyBank, TrendingUp, DollarSign,
  Building2, Coins, LineChart, Lightbulb,
  ArrowRight, BarChart3, PieChart
} from 'lucide-react';
import SankeyDiagram from '../components/charts/SankeyDiagram';

const financialFlowData = {
  nodes: [
    { name: 'Products', value: 1200000 },               // 0 (Left)
    { name: 'Services', value: 800000 },                // 1 (Left)
    { name: 'Total Revenue', value: 2000000 },          // 2 (Center)
    { name: 'Product Cost', value: 540000 },            // 3 (Right)
    { name: 'Service Cost', value: 360000 },            // 4 (Right)
    { name: 'Cost of Revenue', value: 900000 },         // 5 (Right)
    { name: 'Gross Profit', value: 500000 },            // 6 (Right)
    { name: 'Operating Expenses', value: 600000 },       // 7 (Right)
    { name: 'R&D', value: 250000 },                     // 8 (Right)
    { name: 'SG&A', value: 300000 },                    // 9 (Right)
    { name: 'Other', value: 50000 },                    // 10 (Right)
    { name: 'Operating Profit', value: 350000 },        // 11 (Right)
    { name: 'Tax', value: 70000 },                      // 12 (Right)
    { name: 'Net Profit', value: 280000 }               // 13 (Right)
  ],
  links: [
    // Left flows (into Total Revenue)
    { source: 0, target: 2, value: 1200000 },  // Products → Total Revenue
    { source: 1, target: 2, value: 800000 },   // Services → Total Revenue
    
    // Right flows (out of Total Revenue)
    { source: 2, target: 3, value: 540000 },   // Total Revenue → Product Cost
    { source: 2, target: 4, value: 360000 },   // Total Revenue → Service Cost
    { source: 3, target: 5, value: 540000 },   // Product Cost → Cost of Revenue
    { source: 4, target: 5, value: 360000 },   // Service Cost → Cost of Revenue
    { source: 2, target: 7, value: 600000 },   // Total Revenue → Operating Expenses
    { source: 2, target: 6, value: 500000 },   // Total Revenue → Gross Profit
    
    // Expense breakdowns
    { source: 7, target: 8, value: 250000 },   // Operating Expenses → R&D
    { source: 7, target: 9, value: 300000 },   // Operating Expenses → SG&A
    { source: 7, target: 10, value: 50000 },   // Operating Expenses → Other
    
    // Profit flows
    { source: 6, target: 11, value: 350000 },  // Gross Profit → Operating Profit
    { source: 11, target: 12, value: 70000 },  // Operating Profit → Tax
    { source: 11, target: 13, value: 280000 }  // Operating Profit → Net Profit
  ]
};

const financialStats = [
  {
    title: 'Monthly Income',
    value: '$8,246',
    change: '+12.3%',
    icon: DollarSign,
    description: 'Total monthly revenue across all channels'
  },
  {
    title: 'Monthly Expenses',
    value: '$5,127',
    change: '-8.1%',
    icon: TrendingUp,
    description: 'Total operational and fixed costs'
  },
  {
    title: 'Gross Margin',
    value: '42.5%',
    change: '+3.2%',
    icon: PieChart,
    description: 'Revenue minus cost of goods sold'
  },
  {
    title: 'Operating Margin',
    value: '28.1%',
    change: '+1.8%',
    icon: BarChart3,
    description: 'Operating income as % of revenue'
  },
  {
    title: 'Net Margin',
    value: '22.7%',
    change: '+2.1%',
    icon: LineChart,
    description: 'Net income as % of revenue'
  },
  {
    title: 'Y/Y Growth',
    value: '15.3%',
    change: '+4.5%',
    icon: TrendingUp,
    description: 'Year-over-year revenue growth'
  }
];

const quickStats = [
  {
    title: 'Total Balance',
    value: '$12,345.67',
    icon: Wallet,
    change: '+5.2%',
    description: 'Current account balance'
  },
  {
    title: 'Total Savings',
    value: '$3,456.78',
    icon: PiggyBank,
    change: '+12.3%',
    description: 'Accumulated savings'
  },
  {
    title: 'Investments',
    value: '$8,901.23',
    icon: TrendingUp,
    change: '+8.7%',
    description: 'Investment portfolio value'
  }
];

const features = [
  {
    title: 'Bank Integration',
    description: 'Connect your bank accounts securely and track all your finances in one place',
    icon: Building2,
    action: 'Connect Bank'
  },
  {
    title: 'Investment Pooling',
    description: 'Pool your investments and track their performance across different platforms',
    icon: Coins,
    action: 'Start Pooling'
  },
  {
    title: 'Market Analysis',
    description: 'Get real-time market analysis and insights for better investment decisions',
    icon: LineChart,
    action: 'View Markets'
  }
];

const insights = [
  {
    title: 'Industry Insights',
    description: 'Learn about the latest trends and developments in personal finance',
    icon: Lightbulb
  },
  {
    title: 'Future Features',
    description: 'Exciting new features coming soon to help you manage your finances better',
    icon: ArrowRight
  }
];

export default function DashboardPage() {
  console.log('DashboardPage rendering with financialStats:', financialStats);
  console.log('Quick stats:', quickStats);
  
  return (
    <div className="space-y-8">
      {/* Header Section with Badge to Logo Animation */}
      <div className="flex flex-col items-center justify-center">
        <motion.div 
          className="logo-container relative"
          initial={{ scale: 0.3, opacity: 0, y: -50 }}
          animate={{ 
            scale: 1, 
            opacity: 1, 
            y: 0,
          }}
          transition={{
            duration: 1.2,
            ease: [0.34, 1.56, 0.64, 1],
            scale: {
              type: "spring",
              damping: 12,
              stiffness: 120
            }
          }}
        >
          {/* Badge Animation that morphs into Logo */}
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            animate={{ 
              opacity: [1, 1, 1, 0],
              scale: [1, 1.1, 1.2, 0],
              rotate: [0, 180, 360, 540]
            }}
            transition={{
              duration: 3,
              times: [0, 0.4, 0.7, 1],
              ease: "easeInOut"
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Gold Badge rotating */}
            <motion.img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfAAAAHyCAYAAAAMx0p8AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAuIwAALiMBeKU/dgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAACBvSURBVHic7N37fxzV/T/w1+yNLWO5m2Iy9g0v5OKFCxebgJJgCJAQ4BtuISEkTYP7tY0bQsitSYHQJrRNaNuk6df+2qTfl5Y0TfoNIQFCA4HdvW5A7eBv2nUWxgbOz1/vc5Jbbd3Onjmf2dmZ0/f8fD9ez2OYfgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8Hq9evPxgAAAAAACsJBAAAAAAJSLBAMBAAII4vHwAAAACMAAAAgHgAREAQKkzgAAAAYBAuTOAAAABAqTOAAAABgEAAABAqTOAAAABgEAAABAqTOAAAABgEAAABAqTOAAAABgEAAABAqTOAAAABgEAAABAqTOAAAABgEAAABAqTOAAAABgEAAABAqTOAAAABgEAAABAqTOAAAABgEAAABAqTOAAAABgEAAABAqTOAAAABgEAAABAqTOAAAABgEAAABAqTOAAAABgEAAABAqTOAAAABgEAAABAqTOAAAABgEAAABAqTOAAAABgEAAABAqTOAAAABgEAAABAqTOAAAABgEAAABAqTOAAAABgEAAABAqTOAAAABgEAAABAqTOAAAABgEAAABAqTOAAAABgEAAABAqTOAAAABgEAAABAqTOAAAABgEAAABAqTOAAAABgEAAABAqTOAAAABgEAAABAqTOAAAABgEAAABAqTOAAAABgEAAABAqTOAAAABgEAAABAqTOAAAABgEAAABAqTOAAAABgEAAABAqTOAAAABgEAAABAqTOAAAABy"
              alt="Gold Badge"
              className="w-96 h-96 object-contain filter drop-shadow-2xl"
              animate={{
                rotate: [0, 360, 720, 1080],
                scale: [1, 1.1, 1.2, 0.8]
              }}
              transition={{
                duration: 3,
                ease: "easeInOut"
              }}
            />
          </motion.div>

          {/* FinPercent Logo that appears after badge */}
          <motion.img 
            src="/logo.svg" 
            alt="Finpercent Logo" 
            className="h-[400px] w-auto"
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ 
              opacity: [0, 0, 0, 1],
              scale: [0, 0, 0, 1],
              rotate: [-180, -180, -180, 0],
              rotateY: [0, 0, 0, 360]
            }}
            transition={{
              duration: 3,
              times: [0, 0.5, 0.7, 1],
              ease: "easeInOut",
              delay: 0.5
            }}
          />

          {/* Particle Effects during Morph */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  scale: 0,
                  x: 0,
                  y: 0
                }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1, 1.5, 0],
                  x: [0, (Math.random() - 0.5) * 200],
                  y: [0, (Math.random() - 0.5) * 200],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 2,
                  delay: 2 + (i * 0.1),
                  ease: "easeOut"
                }}
                className="absolute w-3 h-3 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                  filter: 'drop-shadow(0 0 6px rgba(255, 215, 0, 0.8))'
                }}
              />
            ))}
          </div>

          {/* Glow Effect during Transformation */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.6, 0.8, 0.4, 0],
              scale: [1, 1.2, 1.5, 1.8, 2]
            }}
            transition={{
              duration: 3,
              delay: 1.5,
              ease: "easeOut"
            }}
            style={{
              background: 'radial-gradient(circle, rgba(255,215,0,0.3) 0%, rgba(255,215,0,0.1) 50%, transparent 70%)',
              borderRadius: '50%'
            }}
          />
        </motion.div>

        <div className="text-center -mt-8">
          <motion.h1 
            className="text-3xl font-bold text-primary-900 dark:text-primary-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.5, duration: 0.5 }}
          >
            Financial Dashboard
          </motion.h1>
          <motion.p 
            className="text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4, duration: 0.5 }}
          >
            Comprehensive overview of your financial metrics and insights
          </motion.p>
        </div>
      </div>

      {/* Financial Flow Visualization - Moved to top */}
      <motion.div
        initial={{ 
          opacity: 0,
          scale: 0.8,
          clipPath: 'circle(0% at 50% 50%)'
        }}
        animate={{ 
          opacity: 1,
          scale: 1,
          clipPath: 'circle(100% at 50% 50%)',
          transition: {
            delay: 0.5,
            duration: 1.5,
            ease: [0.16, 1, 0.3, 1]
          }
        }}
        className="mb-8"
      >
        <SankeyDiagram data={financialFlowData} />
      </motion.div>

      {/* Quick Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="neo-card p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
                  <p className="mt-2 text-2xl font-semibold text-primary-900 dark:text-primary-100">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">{stat.description}</p>
                </div>
                <div className="neo-button p-3 text-primary-600 dark:text-primary-400">
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <p className="mt-4 text-sm text-green-600 dark:text-green-400">
                {stat.change} from last month
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Detailed Financial Stats with Debug Info */}
      <div className="neo-card p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Financial Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {financialStats.map((stat) => {
            const Icon = stat.icon || DollarSign; // Fallback icon
            const isPositive = stat.change?.startsWith('+') ?? false;
            const title = stat.title || 'Unnamed Metric';
            const value = stat.value || 'N/A';
            const change = stat.change || '0%';
            const description = stat.description || 'No description available';

            console.log('Rendering stat:', { 
              title,
              value,
              change,
              description,
              hasIcon: !!stat.icon
            });

            return (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border rounded-lg p-4 bg-white dark:bg-gray-800"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {title}
                    </p>
                    <p className="mt-2 text-2xl font-bold text-primary-900 dark:text-primary-100">
                      {value}
                    </p>
                  </div>
                  <div className="p-2 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <p className={`mt-2 text-xs font-medium ${
                  isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {change} from last month
                </p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="neo-card p-6 space-y-4"
            >
              <div className="neo-button w-12 h-12 flex items-center justify-center text-primary-600 dark:text-primary-400">
                <Icon className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-semibold text-primary-900 dark:text-primary-100">
                {feature.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
              <button className="neo-button px-4 py-2 text-primary-600 dark:text-primary-400 font-medium">
                {feature.action}
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Insights Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insights.map((insight) => {
          const Icon = insight.icon;
          return (
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="neo-card p-6"
            >
              <div className="flex items-start space-x-4">
                <div className="neo-button p-3 text-primary-600 dark:text-primary-400">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100">
                    {insight.title}
                  </h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                    {insight.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>


      {/* Coming Soon Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="neo-card p-6"
      >
        <h2 className="text-xl font-semibold text-primary-900 dark:text-primary-100 mb-4">
          Coming Soon
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          We're working on detailed financial analysis tools including:
        </p>
        <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-400">
          <li>• Advanced trend analysis</li>
          <li>• Predictive financial modeling</li>
          <li>• Custom report generation</li>
          <li>• Budget optimization suggestions</li>
        </ul>
      </motion.div>
    </div>
  );
}
