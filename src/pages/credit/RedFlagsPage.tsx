import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ShieldAlert, AlertTriangle, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export default function RedFlagsPage() {
  const navigate = useNavigate();

  const audits = [
    { name: 'Debt-to-Cashflow Ratio Verification', status: 'Passed', desc: 'EMI/Cashflow stands at 28%, which is below the critical 45% ceiling.' },
    { name: 'GST Filing Regularity Check', status: 'Warning', desc: 'One late submission detected in the last quarter (GSTR-3B for Feb 2026).' },
    { name: 'Bank Cash Overdraft Overutilization', status: 'Passed', desc: 'Active OD limit utilized at 40% on average, avoiding limit locks.' },
    { name: 'B2B Customer Concentration Risk', status: 'Warning', desc: 'Turnover concentration from NeoPack Industries exceeds 30% threshold.' },
    { name: 'Repayment Delinquency Audits', status: 'Passed', desc: 'No recorded defaults or delayed EMI notifications in the last 12 months.' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 p-6 pb-20">
      <div className="max-w-4xl mx-auto space-y-8">
        
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
          <h1 className="text-3xl font-extrabold text-primary-950 dark:text-white">Credit Red Flags Auditing</h1>
          <p className="text-sm text-gray-500 max-w-lg mx-auto">
            Review critical warning markers checked by bank credit officers during underwriting.
          </p>
        </div>

        {/* Audit Checklist */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-6">
          <div className="border-b border-gray-50 dark:border-gray-700 pb-3 flex items-center space-x-2">
            <ShieldAlert className="w-5 h-5 text-red-600" />
            <h3 className="font-bold text-gray-900 dark:text-white text-md">AI Risk Parameters Checklist</h3>
          </div>
          
          <div className="space-y-4">
            {audits.map((item, i) => (
              <div key={i} className="p-4 bg-gray-50/50 dark:bg-gray-900/30 border border-gray-100 dark:border-gray-800 rounded-xl space-y-2 text-xs">
                <div className="flex justify-between items-center font-bold">
                  <span className="text-gray-800 dark:text-gray-200">{item.name}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[9px] ${
                    item.status === 'Passed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>{item.status}</span>
                </div>
                <p className="text-[10px] text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
