import React from 'react';
import { TrendingUp, Users, Target, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCurrency } from '../../hooks/useCurrency';

interface ProfileStatsProps {
  totalInvestment: number;
  investmentChange: number;
  activePools: number;
  pendingInvites: number;
}

export default function ProfileStats({ 
  totalInvestment, 
  investmentChange, 
  activePools, 
  pendingInvites 
}: ProfileStatsProps) {
  const { formatAmount } = useCurrency();

  const stats = [
    {
      title: 'Total Investment',
      value: formatAmount(totalInvestment),
      change: `${investmentChange >= 0 ? '+' : ''}${investmentChange}%`,
      changeLabel: 'this month',
      icon: TrendingUp,
      color: 'text-primary-600',
      changeColor: investmentChange >= 0 ? 'text-green-600' : 'text-red-600'
    },
    {
      title: 'Active Pools',
      value: activePools.toString(),
      change: `${pendingInvites}`,
      changeLabel: pendingInvites === 1 ? 'pending invite' : 'pending invites',
      icon: Users,
      color: 'text-blue-600',
      changeColor: 'text-blue-600'
    },
    {
      title: 'Portfolio Score',
      value: '8.7/10',
      change: '+0.3',
      changeLabel: 'this quarter',
      icon: Target,
      color: 'text-purple-600',
      changeColor: 'text-green-600'
    },
    {
      title: 'Member Since',
      value: 'Jan 2024',
      change: '8 months',
      changeLabel: 'experience',
      icon: Calendar,
      color: 'text-amber-600',
      changeColor: 'text-gray-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="neo-card p-6 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`neo-button glass-action p-3 ${stat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full bg-opacity-10 border border-current ${stat.color}`}>
                Active
              </span>
            </div>
            
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              {stat.title}
            </h3>
            
            <p className="text-2xl font-bold text-primary-900 dark:text-primary-100 mb-2">
              {stat.value}
            </p>
            
            <div className="flex items-center space-x-1">
              <span className={`text-sm font-medium ${stat.changeColor}`}>
                {stat.change}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {stat.changeLabel}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
