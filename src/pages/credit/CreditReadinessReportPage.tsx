import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, Award, FileText, CheckCircle2, ShieldCheck, Download, 
  BarChart3, Target, Calendar, AlertTriangle, ArrowRight 
} from 'lucide-react';

export default function CreditReadinessReportPage() {
  const navigate = useNavigate();
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('📄 Full Credit Readiness File downloaded successfully!');
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
            <span>{isExporting ? 'Exporting...' : 'Export Borrower Credit File'}</span>
          </button>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold text-primary-950 dark:text-white">Credit Readiness Report</h1>
          <p className="text-sm text-gray-500 max-w-lg mx-auto">
            Vetted borrower diagnostic summary showing leverage limits, compliance verification status, and checklist completions.
          </p>
        </div>

        {/* Readiness Details */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-md space-y-6">
          <div className="flex items-center space-x-4 border-b border-gray-50 dark:border-gray-700 pb-4">
            <div className="w-12 h-12 bg-primary-50 dark:bg-primary-950/40 text-primary-600 rounded-2xl flex items-center justify-center font-bold text-lg">
              82
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Overall Credit Readiness Score</h3>
              <p className="text-xs text-gray-400">Score Band: Bank-Ready (Score: 75 to 89)</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            <div className="space-y-3">
              <span className="font-bold text-gray-800 dark:text-gray-200 block">Credit Health Overview</span>
              <p>
                The borrower demonstrates stable operational turnover at a Peenya-cluster B2B facility. 
                Debt leverage is well contained, and incoming cash flows are split straight-through via active S.T.O.P rules.
              </p>
              <div className="p-3 bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/40 rounded-lg text-green-800 dark:text-green-400">
                <strong>Strong Points:</strong> Positive net cash surplus month-on-month; low OD credit utilization rate.
              </div>
            </div>
            <div className="space-y-3">
              <span className="font-bold text-gray-800 dark:text-gray-200 block">Credit Gaps & Action Requirements</span>
              <p>
                To achieve a Strong Readiness rating (90+), the borrower must submit audited financial balance sheets and renew Udyam registration tags.
              </p>
              <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-100 dark:border-yellow-900/40 rounded-lg text-yellow-800 dark:text-yellow-400">
                <strong>Corrective Actions:</strong> Submit audited reports within 15 days; consolidate short-term vendor lines.
              </div>
            </div>
          </div>
        </div>

        {/* Bank Compatibility Check */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
          <h3 className="text-md font-bold text-gray-900 dark:text-white border-b border-gray-50 dark:border-gray-700 pb-3 flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-primary-600" />
            <span>Bank & Underwriter Compatibility Check</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {[
              { check: 'GST Consistency Auditing', status: 'Verifying', desc: 'Cross-referencing invoice declarations with GSTR-3B filings.' },
              { check: 'repayment Capacity (Buffer)', status: 'Passed', desc: 'Net cash surplus covers monthly EMI obligations by 2.2x.' },
              { check: 'Financial Records Audit', status: 'Passed', desc: 'Bank statement uploads reconciled with ledger balances.' }
            ].map((item, i) => (
              <div key={i} className="p-4 bg-gray-50/50 dark:bg-gray-900/30 border border-gray-100 dark:border-gray-800 rounded-xl space-y-2">
                <div className="flex justify-between items-center font-semibold text-gray-800 dark:text-gray-200">
                  <span>{item.check}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.status === 'Passed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>{item.status}</span>
                </div>
                <p className="text-[10px] text-gray-400 leading-normal">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
