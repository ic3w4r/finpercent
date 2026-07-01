import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, ArrowUpRight, TrendingUp, TrendingDown, Calendar, 
  AlertTriangle, DollarSign, Wallet, ShieldCheck, CheckCircle2, ArrowRight
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function CashFlowPage() {
  const navigate = useNavigate();

  const cashData = [
    { month: 'Jan', inflow: 1000000, outflow: 750000, net: 250000 },
    { month: 'Feb', inflow: 1200000, outflow: 800000, net: 400000 },
    { month: 'Mar', inflow: 1100000, outflow: 950000, net: 150000 },
    { month: 'Apr', inflow: 850000, outflow: 900000, net: -50000 }, // Stress
    { month: 'May', inflow: 1400000, outflow: 1000000, net: 400000 },
    { month: 'Jun', inflow: 1250000, outflow: 850000, net: 400000 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 p-6 pb-20">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate('/overview')}
            className="neo-button glass-action px-4 py-2 text-gray-600 dark:text-gray-400 hover:shadow-lg transition-all duration-300 flex items-center text-xs font-semibold"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            <span>Back to Command Center</span>
          </button>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold text-primary-950 dark:text-white">Cash Flow Intelligence</h1>
          <p className="text-sm text-gray-500 max-w-lg mx-auto">
            Detailed monitor of monthly invoice collections, operating disbursements, and liquid cash margins.
          </p>
        </div>

        {/* Top Cash Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Average Monthly Inflow', val: '₹11,33,333', desc: 'B2B Invoice Clearing', color: 'text-green-600' },
            { label: 'Average Monthly Outflow', val: '₹8,75,000', desc: 'Supplier & Fixed Costs', color: 'text-red-600' },
            { label: 'Net Cash Position (Avg)', val: '+₹2,58,333', desc: 'Positive Operating Cash', color: 'text-primary-600' },
            { label: 'Operating Buffer Days', val: '18 Days', desc: 'Liquidity Runway', color: 'text-blue-600' }
          ].map((item, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-2">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 block">{item.label}</span>
              <span className={`text-xl font-bold block ${item.color}`}>{item.val}</span>
              <span className="text-[10px] text-gray-400 block">{item.desc}</span>
            </div>
          ))}
        </div>

        {/* Cash Inflow/Outflow Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
          <h3 className="text-md font-bold text-gray-900 dark:text-white pb-3 border-b border-gray-50 dark:border-gray-700">
            Cash Inflow vs Outflow Trend
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cashData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="inflow" stroke="#10B981" fillOpacity={0.05} fill="#10B981" strokeWidth={2} name="Inflows" />
                <Area type="monotone" dataKey="outflow" stroke="#EF4444" fillOpacity={0.05} fill="#EF4444" strokeWidth={2} name="Outflows" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stress Months & Fixed cost burden */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Stress Months */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
            <h3 className="text-md font-bold text-gray-900 dark:text-white flex items-center space-x-2 text-red-600">
              <AlertTriangle className="w-5 h-5" />
              <span>Liquidity Stress Months</span>
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900 rounded-lg space-y-1">
                <div className="flex justify-between items-center font-bold text-red-700 dark:text-red-400">
                  <span>April 2026</span>
                  <span>Net: -₹50,000</span>
                </div>
                <p className="text-[10px] text-red-600 dark:text-red-400/80 leading-relaxed">
                  Cause: delayed B2B receivables from NeoPack Industries coincided with advance tax payouts. Net buffer dipped below 5 days.
                </p>
              </div>
              <p className="text-[11px] text-gray-500">
                Tip: Maintain a 15% revenue savings buffer (S.T.O.P allocation) to bridge seasonal invoice collection drops.
              </p>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
            <h3 className="text-md font-bold text-gray-900 dark:text-white flex items-center space-x-2 text-primary-600">
              <CheckCircle2 className="w-5 h-5" />
              <span>Cash Flow Recommendations</span>
            </h3>
            <ul className="space-y-3 text-xs leading-relaxed text-gray-600 dark:text-gray-400">
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-1.5 flex-shrink-0"></span>
                <span>Setup weekly invoice reminders to reduce average DSO from 42 days.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-1.5 flex-shrink-0"></span>
                <span>Transfer surplus profits automatically to a secondary yield ledger using BaaS webhook splits.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-1.5 flex-shrink-0"></span>
                <span>Re-negotiate supplier credit terms to 45 days matching the B2B client invoice schedules.</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}
