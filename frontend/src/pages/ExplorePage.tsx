import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, Coins, LineChart, Lightbulb, ArrowRight, 
  CreditCard, PiggyBank, Target, Calculator, BookOpen,
  TrendingUp, Shield, Smartphone, Globe, Users
} from 'lucide-react';

const features = [
  {
    title: 'Smart Banking',
    description: 'Connect multiple bank accounts with military-grade encryption and real-time synchronization',
    icon: Building2,
    action: 'Connect Banks',
    status: 'Available',
    color: 'text-green-600 dark:text-green-400'
  },
  {
    title: 'Investment Pooling',
    description: 'Pool investments across platforms with automated portfolio rebalancing and risk management',
    icon: Coins,
    action: 'Start Pooling',
    status: 'Available',
    color: 'text-green-600 dark:text-green-400'
  },
  {
    title: 'AI Market Analysis',
    description: 'Get AI-powered market insights with predictive analytics and personalized recommendations',
    icon: LineChart,
    action: 'View Markets',
    status: 'Beta',
    color: 'text-yellow-600 dark:text-yellow-400'
  },
  {
    title: 'Credit Score Monitoring',
    description: 'Track your credit score changes with detailed breakdowns and improvement suggestions',
    icon: CreditCard,
    action: 'Monitor Score',
    status: 'Coming Soon',
    color: 'text-blue-600 dark:text-blue-400'
  },
  {
    title: 'Automated Savings',
    description: 'Set up intelligent savings rules that automatically optimize your money allocation',
    icon: PiggyBank,
    action: 'Set Rules',
    status: 'Available',
    color: 'text-green-600 dark:text-green-400'
  },
  {
    title: 'Goal Tracking',
    description: 'Define financial goals with milestone tracking and progress visualization',
    icon: Target,
    action: 'Set Goals',
    status: 'Available',
    color: 'text-green-600 dark:text-green-400'
  }
];

const tools = [
  {
    title: 'Budget Calculator',
    description: 'Calculate optimal budget distributions based on income and expenses',
    icon: Calculator,
    users: '12.5k',
    rating: 4.8
  },
  {
    title: 'Investment Simulator',
    description: 'Simulate investment scenarios with different strategies and timeframes',
    icon: TrendingUp,
    users: '8.2k',
    rating: 4.6
  },
  {
    title: 'Retirement Planner',
    description: 'Plan your retirement with detailed projections and optimization tips',
    icon: Shield,
    users: '15.1k',
    rating: 4.9
  },
  {
    title: 'Expense Tracker',
    description: 'Track expenses automatically with smart categorization and insights',
    icon: Smartphone,
    users: '22.3k',
    rating: 4.7
  }
];

const insights = [
  {
    title: 'Financial Education Hub',
    description: 'Access curated courses, articles, and tutorials to improve your financial literacy',
    icon: BookOpen,
    badge: 'New'
  },
  {
    title: 'Community Features',
    description: 'Connect with other users, share strategies, and learn from financial experts',
    icon: Users,
    badge: 'Beta'
  },
  {
    title: 'Global Markets',
    description: 'Access international markets and currencies with real-time exchange rates',
    icon: Globe,
    badge: 'Premium'
  },
  {
    title: 'Advanced Analytics',
    description: 'Deep dive into your financial patterns with machine learning insights',
    icon: Lightbulb,
    badge: 'Pro'
  }
];

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState('features');

  const tabs = [
    { id: 'features', label: 'Features', count: features.length },
    { id: 'tools', label: 'Tools', count: tools.length },
    { id: 'insights', label: 'Insights', count: insights.length }
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-primary-900 dark:text-primary-100 mb-4">
          Explore FinPercent
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Discover powerful tools and features designed to transform your financial management experience
        </p>
      </motion.div>

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="neo-card p-2 flex space-x-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400'
              }`}
            >
              {tab.label}
              <span className="ml-2 px-2 py-1 text-xs rounded-full bg-gray-200 dark:bg-gray-700">
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Features Tab */}
      {activeTab === 'features' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="neo-card p-6 space-y-4 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="neo-button w-12 h-12 flex items-center justify-center text-primary-600 dark:text-primary-400">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${feature.color} bg-opacity-10 border border-current`}>
                    {feature.status}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-primary-900 dark:text-primary-100">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
                <button className="w-full neo-button px-4 py-3 text-primary-600 dark:text-primary-400 font-medium hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors duration-200">
                  {feature.action}
                </button>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Tools Tab */}
      {activeTab === 'tools' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="neo-card p-6 space-y-4"
              >
                <div className="flex items-start space-x-4">
                  <div className="neo-button p-3 text-primary-600 dark:text-primary-400">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100">
                      {tool.title}
                    </h3>
                    <p className="mt-1 text-gray-600 dark:text-gray-400 text-sm">
                      {tool.description}
                    </p>
                    <div className="mt-3 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <span>{tool.users} users</span>
                      <span>★ {tool.rating}</span>
                    </div>
                  </div>
                </div>
                <button className="w-full neo-button px-4 py-2 text-primary-600 dark:text-primary-400 font-medium">
                  Try Tool
                </button>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Insights Tab */}
      {activeTab === 'insights' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <motion.div
                key={insight.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="neo-card p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="neo-button p-3 text-primary-600 dark:text-primary-400">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400">
                    {insight.badge}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100 mb-2">
                  {insight.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {insight.description}
                </p>
                <button className="mt-4 text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline">
                  Learn More →
                </button>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center neo-card p-8"
      >
        <h2 className="text-2xl font-bold text-primary-900 dark:text-primary-100 mb-4">
          Ready to Transform Your Finances?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
          Join thousands of users who have already improved their financial health with FinPercent's comprehensive tools and insights.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="neo-button px-8 py-3 text-primary-600 dark:text-primary-400 font-semibold">
            Get Started Free
          </button>
          <button className="px-8 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
            View Pricing
          </button>
        </div>
      </motion.div>
    </div>
  );
}