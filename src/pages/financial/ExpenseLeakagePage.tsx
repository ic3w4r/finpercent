import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, AlertCircle, AlertTriangle, ShieldCheck, ArrowDownRight, 
  Download, RefreshCw, BarChart3, TrendingUp, Percent
} from 'lucide-react';

export default function ExpenseLeakagePage() {
  const navigate = useNavigate();

  const leaks = [
    { title: 'Duplicate Vendor Invoice Detected', amount: '₹45,000', severity: 'Critical', desc: 'CNC lathe machine lease invoice INV-SAP-10499 duplicated with internal lease journal entry.' },
    { title: 'Off-Contract Freight Logistics', amount: '₹18,000', severity: 'High', desc: 'Freight cleared through uncontracted premium partner instead of standard logistics partner.' },
    { title: 'Unutilized SaaS Services Subscriptions', amount: '₹6,500', severity: 'Low', desc: 'Two seats in accounting workspace remain unassigned for over 60 days.' }
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
          <h1 className="text-3xl font-extrabold text-primary-950 dark:text-white">Expense Leakage Auditing</h1>
          <p className="text-sm text-gray-500 max-w-lg mx-auto">
            AI-based matching of journal ledgers, invoices, and bank statements to flag leaks and double entries.
          </p>
        </div>

        {/* Expense stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'Total Audited Expenditures', val: '₹12,40,000', desc: 'Current quarter', color: 'text-gray-950 dark:text-white' },
            { label: 'Identified Leakage Value', val: '₹69,500', desc: 'Savings potential: 5.6%', color: 'text-red-600' },
            { label: 'Audit Verification Rate', val: '98.5%', desc: 'AI confidence score', color: 'text-green-600' }
          ].map((item, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-2">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 block">{item.label}</span>
              <span className={`text-xl font-bold block ${item.color}`}>{item.val}</span>
              <span className="text-[10px] text-gray-400 block">{item.desc}</span>
            </div>
          ))}
        </div>

        {/* Leakage Audit Feed */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
          <h3 className="text-md font-bold text-gray-900 dark:text-white border-b border-gray-50 dark:border-gray-700 pb-3 flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span>AI Leakage Anomalies Feed</span>
          </h3>
          <div className="space-y-4">
            {leaks.map((leak, i) => (
              <div key={i} className="p-4 bg-gray-50/50 dark:bg-gray-900/30 border border-gray-100 dark:border-gray-800 rounded-xl space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold text-gray-800 dark:text-gray-200 block">{leak.title}</span>
                    <span className="text-[9px] text-gray-400 block">Severity: {leak.severity}</span>
                  </div>
                  <span className="text-xs font-extrabold text-red-600">{leak.amount}</span>
                </div>
                <p className="text-[10px] text-gray-500 leading-relaxed">{leak.desc}</p>
                <div className="pt-2 flex justify-end space-x-2">
                  <button className="px-3 py-1 bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-white rounded-md text-[10px] font-bold">
                    Dismiss
                  </button>
                  <button className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md text-[10px] font-bold">
                    Block Payment
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
