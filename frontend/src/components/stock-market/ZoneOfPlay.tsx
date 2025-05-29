import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

export default function ZoneOfPlay() {
  const zones = [
    {
      name: 'Growth Zone',
      description: 'High potential for business expansion',
      status: 'Active',
      trend: 'up',
      percentage: 75,
      color: 'text-green-600'
    },
    {
      name: 'Stability Zone',
      description: 'Maintaining consistent performance',
      status: 'Stable',
      trend: 'neutral',
      percentage: 65,
      color: 'text-blue-600'
    },
    {
      name: 'Risk Zone',
      description: 'Areas requiring attention',
      status: 'Caution',
      trend: 'down',
      percentage: 45,
      color: 'text-red-600'
    }
  ];

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Zone of Play Analysis
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {zones.map((zone) => (
          <motion.div
            key={zone.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-900 dark:text-white">{zone.name}</h4>
              <div className={`flex items-center ${zone.color}`}>
                {zone.trend === 'up' && <TrendingUp className="w-5 h-5" />}
                {zone.trend === 'neutral' && <Activity className="w-5 h-5" />}
                {zone.trend === 'down' && <TrendingDown className="w-5 h-5" />}
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {zone.description}
            </p>
            <div className="mt-2">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400">Status</span>
                <span className={zone.color}>{zone.status}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${zone.color.replace('text', 'bg')}`}
                  style={{ width: `${zone.percentage}%` }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}