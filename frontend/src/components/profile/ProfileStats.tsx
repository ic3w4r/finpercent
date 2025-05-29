import React from 'react';
import { TrendingUp, Users } from 'lucide-react';
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

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="glass-card rounded-xl p-4">
        <div className="flex items-center space-x-2 mb-2">
          <TrendingUp className="w-5 h-5 text-primary-600" />
          <h3 className="text-sm text-gray-600">Total Investment</h3>
        </div>
        <p className="text-2xl font-bold">{formatAmount(totalInvestment)}</p>
        <span className={`text-xs ${investmentChange >= 0 ? 'text-primary-600' : 'text-red-500'}`}>
          {investmentChange >= 0 ? '+' : ''}{investmentChange}% this month
        </span>
      </div>
      <div className="glass-card rounded-xl p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Users className="w-5 h-5 text-primary-600" />
          <h3 className="text-sm text-gray-600">Active Pools</h3>
        </div>
        <p className="text-2xl font-bold">{activePools}</p>
        <span className="text-xs text-primary-600">
          {pendingInvites} pending {pendingInvites === 1 ? 'invite' : 'invites'}
        </span>
      </div>
    </div>
  );
}
