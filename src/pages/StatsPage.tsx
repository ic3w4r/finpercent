import React from 'react';
import { BarChart3, PieChart, TrendingUp, DollarSign } from 'lucide-react';

const stats = [
  {
    title: 'Monthly Income',
    value: '$8,246',
    change: '+12.3%',
    icon: DollarSign
  },
  {
    title: 'Monthly Expenses',
    value: '$5,127',
    change: '-8.1%',
    icon: TrendingUp
  },
  {
    title: 'Savings Rate',
    value: '37.8%',
    change: '+4.2%',
    icon: PieChart
  },
  {
    title: 'Investment Returns',
    value: '21.5%',
    change: '+2.4%',
    icon: BarChart3
  }
];

export default function StatsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary-900 dark:text-primary-100">
          Financial Statistics
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Track your financial performance and metrics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const isPositive = stat.change.startsWith('+');
          return (
            <div key={stat.title} className="neo-card p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-primary-900 dark:text-primary-100">
                    {stat.value}
                  </p>
                </div>
                <div className="neo-button p-3 text-primary-600 dark:text-primary-400">
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <p className={`mt-4 text-sm ${
                isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
                {stat.change} from last month
              </p>
            </div>
          );
        })}
      </div>

      <div className="neo-card p-6">
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
      </div>
    </div>
  );
}
