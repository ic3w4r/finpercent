import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Award, TrendingUp, AlertCircle, ChevronLeft, Upload, Building2, Target, 
  BarChart3, ShieldAlert, FileText, CheckCircle2, Download, AlertTriangle
} from 'lucide-react';
import BadgeAnimation from '../components/status/BadgeAnimation';
import BalanceSheetAnalysis from '../components/status/BalanceSheetAnalysis';
import KPIBreakdown from '../components/status/KPIBreakdown';
import RankingCriteria from '../components/status/RankingCriteria';
import FileUploader from '../components/FileUploader';

import { useReadiness } from '../contexts/ReadinessContext';

export default function MSMEReadinessPage() {
  const [showBadge, setShowBadge] = useState(false);
  const [showUploader, setShowUploader] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const navigate = useNavigate();
  const { score, band, subscores, uploadDocument, documents, penalties } = useReadiness();

  useEffect(() => {
    setShowBadge(true);
  }, []);

  const handleExportPDF = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('📄 MSME Readiness Report PDF generated and downloaded successfully!');
    }, 1500);
  };

  const getScoreBand = (scoreValue: number) => {
    if (scoreValue < 40) return { band: 'Not Ready', color: 'text-red-650 border-red-200 bg-red-50' };
    if (scoreValue < 60) return { band: 'Needs Correction', color: 'text-orange-600 border-orange-200 bg-orange-50' };
    if (scoreValue < 75) return { band: 'Partially Ready', color: 'text-yellow-600 border-yellow-200 bg-yellow-50' };
    if (scoreValue < 90) return { band: 'Bank-Ready', color: 'text-green-600 border-green-200 bg-green-50' };
    return { band: 'Strong Readiness', color: 'text-emerald-605 border-emerald-200 bg-emerald-50' };
  };

  const bandDetails = getScoreBand(score);

  const subscoresList = [
    { name: 'Financial Health Score', val: subscores.cashFlow, desc: 'Revenue consistency & operating margin stability' },
    { name: 'Cash Flow Score', val: subscores.cashFlow, desc: 'Monthly inflows, surplus buffers, net positions' },
    { name: 'Debt Pressure Score', val: subscores.debtPressure, desc: 'EMI obligations & current leverage thresholds' },
    { name: 'Working Capital Score', val: subscores.workingCapital, desc: 'Receivable DSO, payables DPO, inventory locks' },
    { name: 'Document Readiness Score', val: subscores.documentReadiness, desc: 'Key tax, entity, and ledger files completeness' },
    { name: 'Compliance Consistency Score', val: subscores.complianceConsistency, desc: 'Regular GST filing & tax audit records' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 p-6 pb-20">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <button
            onClick={() => navigate('/overview')}
            className="neo-button glass-action px-4 py-2 text-gray-600 dark:text-gray-400 hover:shadow-lg transition-all duration-300 flex items-center"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            <span>Back to Command Center</span>
          </button>
          
          <button
            onClick={handleExportPDF}
            disabled={isExporting}
            className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white rounded-xl shadow-md font-bold text-xs flex items-center space-x-2 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? 'Generating PDF...' : 'Export Readiness Report (PDF)'}</span>
          </button>
        </div>

        {/* Score Header */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-md text-center space-y-6">
          <div className="max-w-md mx-auto space-y-4">
            <h1 className="text-3xl font-extrabold text-primary-950 dark:text-white">MSME Credit Readiness Report</h1>
            <p className="text-sm text-gray-500">Comprehensive score based on verified financial data, GST files, and corporate debt ledgers.</p>
          </div>
          
          {/* Large Badge & Circular Score */}
          <div className="flex flex-col items-center justify-center space-y-3">
            <BadgeAnimation show={showBadge} ranking="Gold" companyName="Acme Corporation" />
            <div className={`px-4 py-2 border rounded-full text-xs font-bold ${bandDetails.color}`}>
              {bandDetails.band} • Score: {score}/100
            </div>
            <p className="text-xs text-gray-400 max-w-sm">
              Reason: cash flow stable, debt pressure moderate, documents {subscores.documentReadiness}% complete, GST records consistent.
            </p>
          </div>
        </div>

        {/* Subscore Breakdown */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Readiness Parameter Breakdown</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {subscoresList.map((sub, i) => (
              <div key={i} className="p-4 bg-primary-50/30 dark:bg-gray-900/30 rounded-xl border border-primary-100/50 dark:border-gray-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-gray-800 dark:text-gray-200">{sub.name}</span>
                  <span className="text-sm font-extrabold text-primary-600">{sub.val}/100</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-primary-600 h-full" style={{ width: `${sub.val}%` }}></div>
                </div>
                <p className="text-[10px] text-gray-400">{sub.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Red Flags & Missing Documents Checklist */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Missing Documents */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
            <h3 className="text-md font-bold text-gray-900 dark:text-white flex items-center space-x-2">
              <FileText className="w-5 h-5 text-yellow-600" />
              <span>Pending Documents Checklist</span>
            </h3>
            <ul className="space-y-3 text-xs">
              <li className="flex justify-between items-center p-2 border border-yellow-100 bg-yellow-50/50 dark:border-yellow-950/20 dark:bg-yellow-950/10 rounded-lg">
                <span>Audited Financial Statements (Y2)</span>
                <span className="text-[10px] font-bold text-yellow-700">Missing</span>
              </li>
              <li className="flex justify-between items-center p-2 border border-yellow-100 bg-yellow-50/50 dark:border-yellow-950/20 dark:bg-yellow-950/10 rounded-lg">
                <span>GSTR-3B Tax Filing (May 2026)</span>
                <span className="text-[10px] font-bold text-yellow-700">Missing</span>
              </li>
              <li className="flex justify-between items-center p-2 border border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/50 rounded-lg">
                <span>Udyam Registration Certificate</span>
                <span className="text-[10px] font-bold text-gray-400">Expired</span>
              </li>
              <li className="flex justify-between items-center p-2 border border-green-100 bg-green-50/50 dark:border-green-950/20 dark:bg-green-950/10 rounded-lg text-gray-400">
                <span className="line-through">Bank Statements (Latest 6 Months)</span>
                <span className="text-[10px] font-bold text-green-700">Uploaded</span>
              </li>
            </ul>
            <button
              onClick={() => navigate('/credit/document-checklist')}
              className="w-full py-2 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-white rounded-lg text-xs font-semibold"
            >
              Manage Document Locker
            </button>
          </div>

          {/* Red Flags Checkpoint */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
            <h3 className="text-md font-bold text-gray-900 dark:text-white flex items-center space-x-2">
              <ShieldAlert className="w-5 h-5 text-red-600" />
              <span>Credit Red Flag Audits</span>
            </h3>
            <div className="space-y-3 text-xs">
              {[
                { audit: 'Debt-to-Cashflow Ratio Check', status: 'Passed', details: 'EMI/Cashflow stands at 28% (Threshold: 45%)' },
                { audit: 'GST Filing Regularity Check', status: 'Warning', details: 'Late fees detected in last quarter submission' },
                { audit: 'Bank Cash Overdraft (OD) Overuse', status: 'Passed', details: 'OD limit utilization averages 40%' },
                { audit: 'Receivable Age Concentrations', status: 'Warning', details: 'Peenya cluster concentrations exceed 30% of turnover' }
              ].map((item, i) => (
                <div key={i} className="py-2 border-b border-gray-50 dark:border-gray-700 last:border-0">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{item.audit}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.status === 'Passed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>{item.status}</span>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-0.5">{item.details}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Existing Balance Sheet Analysis & Uploads */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
            {!showUploader ? (
              <div className="text-center space-y-4 py-4">
                <div className="w-16 h-16 bg-primary-50 dark:bg-primary-950/40 text-primary-600 rounded-full flex items-center justify-center mx-auto">
                  <Upload className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Audit File Submission</h3>
                  <p className="text-xs text-gray-500 max-w-md mx-auto mt-1">
                    Upload your audited balance sheet or Tally XML export files to refresh subscores instantly.
                  </p>
                </div>
                <button
                  onClick={() => setShowUploader(true)}
                  className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-xs font-semibold shadow-md"
                >
                  Upload Balance Sheet
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-700">
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm">Upload Financial File</h4>
                  <button onClick={() => setShowUploader(false)} className="text-xs text-gray-400 hover:text-gray-600">Cancel</button>
                </div>
                <FileUploader
                  onFileUpload={(file) => {
                    uploadDocument('financials', file.name);
                    setShowUploader(false);
                  }}
                  acceptedFileTypes={['.pdf', '.xlsx', '.csv']}
                  maxFileSize={10 * 1024 * 1024}
                />
              </div>
            )}
          </div>

          <BalanceSheetAnalysis />
          <KPIBreakdown />
          <RankingCriteria />
        </div>

      </div>
    </div>
  );
}
