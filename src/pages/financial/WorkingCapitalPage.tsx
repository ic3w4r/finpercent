import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, ArrowUpRight, BarChart3, Clock, AlertTriangle, 
  ShieldCheck, Coins, RefreshCw, FileText, CheckCircle2, TrendingUp
} from 'lucide-react';

export default function WorkingCapitalPage() {
  const navigate = useNavigate();

  const receivables = [
    { customer: 'NeoPack Industries', amount: 350000, days: 42, status: 'Active' },
    { customer: 'AlphaTech Logistics', amount: 150000, days: 12, status: 'Active' },
    { customer: 'GreenPlast Polymers', amount: 480000, days: 58, status: 'Overdue' }
  ];

  const payables = [
    { vendor: 'CyberSys Machine Ops', amount: 220000, days: 30, status: 'Pending' },
    { vendor: 'Internal Revenue Service', amount: 280000, days: 15, status: 'Pending' }
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
          <h1 className="text-3xl font-extrabold text-primary-950 dark:text-white">Working Capital Intelligence</h1>
          <p className="text-sm text-gray-500 max-w-lg mx-auto">
            Audit inventory cash locks, receivables cycles, and supplier payables timing gaps.
          </p>
        </div>

        {/* Working Capital Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Receivables Outstanding', val: '₹9,80,000', desc: 'Average DSO: 42 Days', color: 'text-primary-600' },
            { label: 'Payables Outstanding', val: '₹5,00,000', desc: 'Average DPO: 30 Days', color: 'text-red-600' },
            { label: 'Inventory Cash Lock-in', val: '₹3,70,000', desc: 'DIO: 24 Days', color: 'text-yellow-600' },
            { label: 'Net Cash Conversion Cycle', val: '36 Days', desc: 'DSO + DIO - DPO', color: 'text-blue-600' }
          ].map((item, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-2">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 block">{item.label}</span>
              <span className={`text-xl font-bold block ${item.color}`}>{item.val}</span>
              <span className="text-[10px] text-gray-400 block">{item.desc}</span>
            </div>
          ))}
        </div>

        {/* Working Capital Gap & Credit estimate */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
          <h3 className="text-md font-bold text-gray-900 dark:text-white border-b border-gray-50 dark:border-gray-700 pb-3">
            Estimated Working Capital Funding Gap
          </h3>
          <div className="space-y-4 text-xs leading-relaxed text-gray-600 dark:text-gray-400">
            <p>
              Your business experiences a <strong>36-day cash conversion gap</strong>. This results in a calculated 
              working capital deficit of <strong>₹8,50,000</strong> during peak production cycles.
            </p>
            <div className="bg-primary-50 dark:bg-primary-950/20 border border-primary-100 dark:border-primary-900/40 p-4 rounded-xl space-y-2">
              <span className="font-bold text-primary-950 dark:text-primary-300 block">Suggested Credit Facility: Invoice Discounting / Bill Factoring</span>
              <p className="text-[10px] text-primary-800 dark:text-primary-400/80">
                Discounting NeoPack Industries purchase orders can unlock ₹3.5 Lakh immediate liquidity at an estimated rate of 12% p.a. 
                This bridges the working capital gap without adding long-term debt liabilities.
              </p>
            </div>
          </div>
        </div>

        {/* Lists of Receivables and Payables */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Receivables aging schedule */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
            <h3 className="text-md font-bold text-gray-900 dark:text-white border-b border-gray-50 dark:border-gray-700 pb-3 flex items-center space-x-2">
              <Clock className="w-5 h-5 text-primary-600" />
              <span>Receivables Aging Schedule</span>
            </h3>
            <div className="space-y-3">
              {receivables.map((rec, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 dark:border-gray-700/50 last:border-0 text-xs">
                  <div>
                    <span className="font-semibold text-gray-800 dark:text-gray-200 block">{rec.customer}</span>
                    <span className="text-[10px] text-gray-400 block">{rec.days} Days Outstanding</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold block">₹{rec.amount.toLocaleString()}</span>
                    <span className={`text-[10px] font-bold ${
                      rec.status === 'Active' ? 'text-green-600' : 'text-red-600'
                    }`}>{rec.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payables schedule */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
            <h3 className="text-md font-bold text-gray-900 dark:text-white border-b border-gray-50 dark:border-gray-700 pb-3 flex items-center space-x-2">
              <FileText className="w-5 h-5 text-red-600" />
              <span>Upcoming Supplier Payables</span>
            </h3>
            <div className="space-y-3">
              {payables.map((pay, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 dark:border-gray-700/50 last:border-0 text-xs">
                  <div>
                    <span className="font-semibold text-gray-800 dark:text-gray-200 block">{pay.vendor}</span>
                    <span className="text-[10px] text-gray-400 block">Due in {pay.days} Days</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold block">₹{pay.amount.toLocaleString()}</span>
                    <span className="text-[10px] font-bold text-yellow-600">{pay.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
