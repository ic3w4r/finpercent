import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings,
  TrendingDown,
  BarChart3,
  Target,
  Users,
  Clock,
  DollarSign,
  Zap,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Cog
} from 'lucide-react';

export default function OperationsGuidePage() {
  const [selectedMetric, setSelectedMetric] = useState<string>('efficiency');

  const operationalMetrics = {
    efficiency: {
      title: 'Operational Efficiency',
      description: 'Measure of how well resources are utilized to generate revenue',
      formula: '(Revenue - Operating Costs) / Revenue × 100',
      benchmarks: [
        { range: '> 80%', status: 'Excellent', color: 'green' },
        { range: '60-80%', status: 'Good', color: 'blue' },
        { range: '40-60%', status: 'Average', color: 'yellow' },
        { range: '< 40%', status: 'Poor', color: 'red' }
      ]
    },
    productivity: {
      title: 'Employee Productivity',
      description: 'Revenue generated per employee or per hour worked',
      formula: 'Total Revenue / Total Employees',
      benchmarks: [
        { range: '> ₹15L', status: 'Excellent', color: 'green' },
        { range: '₹10-15L', status: 'Good', color: 'blue' },
        { range: '₹5-10L', status: 'Average', color: 'yellow' },
        { range: '< ₹5L', status: 'Poor', color: 'red' }
      ]
    },
    costs: {
      title: 'Cost Management',
      description: 'Percentage of revenue spent on operations',
      formula: 'Operating Costs / Total Revenue × 100',
      benchmarks: [
        { range: '< 30%', status: 'Excellent', color: 'green' },
        { range: '30-45%', status: 'Good', color: 'blue' },
        { range: '45-65%', status: 'Average', color: 'yellow' },
        { range: '> 65%', status: 'Poor', color: 'red' }
      ]
    }
  };

  const improvementStrategies = [
    {
      title: 'Process Automation',
      description: 'Implement automated systems to reduce manual work and errors',
      impact: 'High',
      timeframe: '3-6 months',
      cost: 'Medium',
      icon: Zap
    },
    {
      title: 'Employee Training',
      description: 'Upskill workforce to improve productivity and efficiency',
      impact: 'Medium',
      timeframe: '2-4 months',
      cost: 'Low',
      icon: Users
    },
    {
      title: 'Workflow Optimization',
      description: 'Streamline processes and eliminate bottlenecks',
      impact: 'High',
      timeframe: '1-3 months',
      cost: 'Low',
      icon: Settings
    },
    {
      title: 'Technology Upgrade',
      description: 'Invest in modern tools and infrastructure',
      impact: 'High',
      timeframe: '6-12 months',
      cost: 'High',
      icon: Cog
    },
    {
      title: 'Vendor Negotiation',
      description: 'Renegotiate contracts with suppliers and service providers',
      impact: 'Medium',
      timeframe: '1-2 months',
      cost: 'Low',
      icon: DollarSign
    },
    {
      title: 'Quality Management',
      description: 'Implement quality control systems to reduce waste',
      impact: 'Medium',
      timeframe: '2-6 months',
      cost: 'Medium',
      icon: CheckCircle
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
          <div className="neo-button w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
            <Settings className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-primary-900 dark:text-primary-100 font-['Manrope'] mb-2">
            Operations Optimization Guide
          </h1>
          <p className="text-primary-700 dark:text-gray-400 font-['Manrope'] text-lg">
            Streamline operations for maximum efficiency and profitability
          </p>
        </motion.div>

        {/* Key Metrics Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="neo-card p-6 mb-8"
        >
          <h3 className="text-lg font-bold text-primary-800 mb-4 font-['Manrope']">
            Key Operational Metrics
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {Object.entries(operationalMetrics).map(([key, metric]) => (
              <button
                key={key}
                onClick={() => setSelectedMetric(key)}
                className={`neo-button p-4 text-left transition-all ${
                  selectedMetric === key
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                    : 'hover:shadow-md'
                }`}
              >
                <h4 className="font-semibold mb-1">{metric.title}</h4>
                <p className="text-sm opacity-80">{metric.description}</p>
              </button>
            ))}
          </div>

          {/* Metric Details */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-3">
              {operationalMetrics[selectedMetric as keyof typeof operationalMetrics].title}
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {operationalMetrics[selectedMetric as keyof typeof operationalMetrics].description}
            </p>
            
            <div className="bg-white dark:bg-gray-700 rounded-lg p-4 mb-4">
              <h5 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Formula:</h5>
              <code className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded text-sm">
                {operationalMetrics[selectedMetric as keyof typeof operationalMetrics].formula}
              </code>
            </div>

            <div>
              <h5 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Performance Benchmarks:</h5>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                {operationalMetrics[selectedMetric as keyof typeof operationalMetrics].benchmarks.map((benchmark, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg text-center ${
                      benchmark.color === 'green' ? 'bg-green-100 text-green-800' :
                      benchmark.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                      benchmark.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}
                  >
                    <div className="font-bold">{benchmark.range}</div>
                    <div className="text-sm">{benchmark.status}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Improvement Strategies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="neo-card p-6 mb-8"
        >
          <h3 className="text-lg font-bold text-primary-800 mb-6 font-['Manrope']">
            Operations Improvement Strategies
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {improvementStrategies.map((strategy, index) => {
              const Icon = strategy.icon;
              return (
                <motion.div
                  key={strategy.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="neo-button p-4 text-left hover:shadow-md transition-all"
                >
                  <div className="flex items-start space-x-3 mb-3">
                    <div className="neo-button w-10 h-10 flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 mb-1">{strategy.title}</h4>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">{strategy.description}</p>
                  
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center">
                      <div className={`font-medium ${
                        strategy.impact === 'High' ? 'text-green-600' :
                        strategy.impact === 'Medium' ? 'text-yellow-600' :
                        'text-gray-600'
                      }`}>
                        {strategy.impact}
                      </div>
                      <div className="text-gray-500">Impact</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-blue-600">{strategy.timeframe}</div>
                      <div className="text-gray-500">Time</div>
                    </div>
                    <div className="text-center">
                      <div className={`font-medium ${
                        strategy.cost === 'High' ? 'text-red-600' :
                        strategy.cost === 'Medium' ? 'text-yellow-600' :
                        'text-green-600'
                      }`}>
                        {strategy.cost}
                      </div>
                      <div className="text-gray-500">Cost</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Implementation Roadmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="neo-card p-6"
        >
          <h3 className="text-lg font-bold text-primary-800 mb-6 font-['Manrope']">
            Operations Optimization Roadmap
          </h3>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-2">Assessment Phase (Week 1-2)</h4>
                <p className="text-gray-600 mb-2">Conduct comprehensive operations audit and identify bottlenecks</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Map current processes and workflows</li>
                  <li>• Analyze cost structures and efficiency metrics</li>
                  <li>• Identify quick wins and major improvement areas</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-2">Quick Wins Implementation (Week 3-6)</h4>
                <p className="text-gray-600 mb-2">Execute low-cost, high-impact improvements</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Workflow optimization and process streamlining</li>
                  <li>• Employee training and skill development</li>
                  <li>• Vendor negotiation and cost reduction</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-2">Strategic Initiatives (Month 2-6)</h4>
                <p className="text-gray-600 mb-2">Implement technology solutions and major process changes</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Process automation and technology upgrades</li>
                  <li>• Quality management system implementation</li>
                  <li>• Performance monitoring and KPI tracking</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                4
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-2">Continuous Improvement (Ongoing)</h4>
                <p className="text-gray-600 mb-2">Monitor results and maintain optimization momentum</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Regular performance reviews and adjustments</li>
                  <li>• Employee feedback and suggestion programs</li>
                  <li>• Benchmarking against industry standards</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}