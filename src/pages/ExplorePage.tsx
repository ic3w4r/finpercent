import React from 'react';
import { Building2, Coins, LineChart, Lightbulb, ArrowRight } from 'lucide-react';

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

export default function ExplorePage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold text-primary-900 dark:text-primary-100">
          Explore Features
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Discover powerful tools to manage your finances effectively
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div key={feature.title} className="neo-card p-6 space-y-4">
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
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insights.map((insight) => {
          const Icon = insight.icon;
          return (
            <div key={insight.title} className="neo-card p-6">
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
