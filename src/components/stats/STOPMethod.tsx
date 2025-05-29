import React from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, 
  Target, 
  TrendingUp, 
  BarChart4, 
  ClipboardCheck,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

export default function STOPMethod() {
  const metrics = [
    {
      name: 'Sales Tracking',
      value: '₦2.5M',
      change: '+12.5%',
      isPositive: true,
      icon: <LineChart className="w-5 h-5" />,
      description: 'Monthly revenue from all channels'
    },
    {
      name: 'Target Setting',
      value: '₦3.0M',
      change: '85%',
      isPositive: true,
      icon: <Target className="w-5 h-5" />,
      description: 'Progress towards monthly goal'
    },
    {
      name: 'Optimization',
      value: '18.5%',
      change: '-2.3%',
      isPositive: false,
      icon: <TrendingUp className="w-5 h-5" />,
      description: 'Profit margin optimization'
    },
    {
      name: 'Performance',
      value: '92.3',
      change: '+4.7%',
      isPositive: true,
      icon: <BarChart4 className="w-5 h-5" />,
      description: 'Overall business performance score'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          STOP Method Analysis
        </h2>
        <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
          Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <motion.div
            key={metric.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
                {metric.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {metric.name}
              </h3>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {metric.value}
              </div>
              <div className="flex items-center space-x-2">
                <span className={`flex items-center ${
                  metric.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {metric.isPositive ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  {metric.change}
                </span>
                <span className="text-gray-500 dark:text-gray-400">vs last month</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {metric.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Implementation Steps */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Implementation Steps
        </h3>
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                <span className="text-primary-700 dark:text-primary-300 font-medium">S</span>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Sales Tracking</h4>
              <p className="text-sm text-gray-500 mt-1">
                Monitor daily sales across all channels, identify trends, and track customer behavior patterns.
                Set up automated reporting systems for real-time sales data.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                <span className="text-primary-700 dark:text-primary-300 font-medium">T</span>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Target Setting</h4>
              <p className="text-sm text-gray-500 mt-1">
                Establish clear, measurable goals for revenue, profit margins, and market share.
                Break down annual targets into monthly and weekly objectives.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                <span className="text-primary-700 dark:text-primary-300 font-medium">O</span>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Optimization</h4>
              <p className="text-sm text-gray-500 mt-1">
                Analyze operational efficiency, reduce costs, and improve profit margins.
                Implement process improvements and automate repetitive tasks.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                <span className="text-primary-700 dark:text-primary-300 font-medium">P</span>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Performance Review</h4>
              <p className="text-sm text-gray-500 mt-1">
                Regularly assess business performance against targets, identify areas for improvement,
                and adjust strategies based on data-driven insights.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Items */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Priority Actions
          </h3>
          <ClipboardCheck className="w-5 h-5 text-primary-600" />
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <span className="text-gray-900 dark:text-white">Update sales tracking system</span>
            <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
              In Progress
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <span className="text-gray-900 dark:text-white">Review Q2 targets</span>
            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
              Completed
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <span className="text-gray-900 dark:text-white">Optimize inventory management</span>
            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
              Planned
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
