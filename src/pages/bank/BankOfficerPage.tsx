import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, Award, FileText, CheckCircle2, ShieldCheck, Download, 
  AlertTriangle, TrendingUp, DollarSign, Building2, HelpCircle 
} from 'lucide-react';

export default function BankOfficerPage() {
  const navigate = useNavigate();
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('📄 Bank Credit Appraisal File generated and downloaded!');
    }, 1500);
  };

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
          
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl shadow-md text-xs font-bold flex items-center space-x-2 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? 'Exporting Credit File...' : 'Export Appraisal Dossier'}</span>
          </button>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold text-primary-950 dark:text-white">Bank Officer Underwriting Console</h1>
          <p className="text-sm text-gray-500 max-w-lg mx-auto">
            Review structured borrower financial data, credit metrics, and verify document locker compliance.
          </p>
        </div>

        {/* Borrower File Summary */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-md space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-50 dark:border-gray-700 pb-4 gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary-50 dark:bg-primary-950/40 text-primary-600 rounded-2xl flex items-center justify-center font-bold text-lg">
                82
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Acme Corporation (Manufacturing)</h3>
                <p className="text-xs text-gray-400">Borrower Credit-Readiness Rating: Bank-Ready</p>
              </div>
            </div>
            <div className="text-xs md:text-right">
              <span className="text-gray-400 block font-semibold">Udyam Registration</span>
              <span className="font-bold text-red-500">Expired - Renewal Action Pending</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs leading-relaxed text-gray-600 dark:text-gray-400">
            <div className="space-y-2">
              <span className="font-bold text-gray-800 dark:text-gray-200 block">Repayment Capacity</span>
              <p>
                Calculated monthly EBITDA of <strong>₹2.16 Lakh</strong> supports the existing EMI obligation of <strong>₹45k</strong> comfortably. 
                DSCR stands at a stable <strong>2.2x</strong>.
              </p>
            </div>
            <div className="space-y-2">
              <span className="font-bold text-gray-800 dark:text-gray-200 block">Working Capital Gap</span>
              <p>
                Net cash conversion cycle of <strong>36 days</strong> indicates a temporary gap of <strong>₹8.5 Lakh</strong>. 
                Suitable for short-term invoice discounting.
              </p>
            </div>
            <div className="space-y-2">
              <span className="font-bold text-gray-800 dark:text-gray-200 block">Recommended Next Step</span>
              <div className="p-2.5 bg-primary-50 dark:bg-primary-950/20 border border-primary-100 dark:border-primary-900/40 rounded-lg text-primary-900 dark:text-primary-300 font-semibold">
                Approve preliminary short-term invoice line of ₹15 Lakh contingent on GST return May upload.
              </div>
            </div>
          </div>
        </div>

        {/* Verification Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
            <h3 className="text-md font-bold text-gray-900 dark:text-white border-b border-gray-50 dark:border-gray-700 pb-3 flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-primary-600" />
              <span>Document Lock Reconciliations</span>
            </h3>
            <div className="space-y-3 text-xs">
              {[
                { name: 'Bank Statement (6M)', status: 'Reconciled', desc: 'Matched ledger transaction logs directly.' },
                { name: 'GST Certificate', status: 'Reconciled', desc: 'Active GST registration confirmed with tax portals.' },
                { name: 'ITR filings (Y1)', status: 'Reconciled', desc: 'Tax yields correspond with income summaries.' },
                { name: 'Audited Financials', status: 'Pending', desc: 'Awaiting FY25 auditor balance sheets submission.' }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 dark:border-gray-700 last:border-0">
                  <div>
                    <span className="font-semibold text-gray-850 dark:text-gray-200 block">{item.name}</span>
                    <span className="text-[10px] text-gray-400 block">{item.desc}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.status === 'Reconciled' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>{item.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
            <h3 className="text-md font-bold text-gray-900 dark:text-white border-b border-gray-50 dark:border-gray-700 pb-3 flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <span>Early Warning & Stress Audits</span>
            </h3>
            <div className="space-y-3 text-xs leading-relaxed text-gray-600 dark:text-gray-400">
              <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900 rounded-lg space-y-1">
                <span className="font-bold text-red-700 dark:text-red-400 block">Concentration warning</span>
                <p className="text-[10px] text-red-650 dark:text-red-400/80">
                  Over 30% of sales turnover flows from NeoPack Industries. Customer concentration defaults represent the principal credit risk.
                </p>
              </div>
              <p className="text-[11px] text-gray-500">
                Lender tip: Secure a customer escrow agreement over NeoPack receivables prior to credit disbursement.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
