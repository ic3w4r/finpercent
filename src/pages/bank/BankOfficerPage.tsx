import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, Award, FileText, CheckCircle2, ShieldCheck, Download, 
  AlertTriangle, TrendingUp, DollarSign, Building2, HelpCircle, EyeOff, ShieldAlert
} from 'lucide-react';
import { useReadiness } from '../../contexts/ReadinessContext';

export default function BankOfficerPage() {
  const navigate = useNavigate();
  const [isExporting, setIsExporting] = useState(false);
  const { score, band, documents, consents, penalties } = useReadiness();

  const bankConsent = consents.find(c => c.partnerId === 'bank');
  const isConsentGranted = bankConsent?.active;
  const scopes = bankConsent?.scopes || [];

  const hasGST = scopes.includes('GST_Returns');
  const hasFinancials = scopes.includes('Financial_Statements');
  const hasBankStatements = scopes.includes('Bank_Statements');

  const udyamDoc = documents.find(d => d.id === 'udyam');
  const gstDoc = documents.find(d => d.id === 'gst_return');
  const financialsDoc = documents.find(d => d.id === 'financials');
  const bankDoc = documents.find(d => d.id === 'bank_statement');

  const handleExport = () => {
    if (!isConsentGranted) {
      alert('❌ Export Denied: Owner consent not authorized.');
      return;
    }
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('📄 Bank Credit Appraisal File generated and downloaded!');
    }, 1500);
  };

  // If consent is NOT active, display the beautiful Consent Blurring / Block screen!
  if (!isConsentGranted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 p-6 pb-20 flex flex-col justify-center items-center text-left">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-3xl border border-red-100 dark:border-gray-700 shadow-2xl space-y-6 text-center">
          <div className="w-16 h-16 bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 rounded-full flex items-center justify-center mx-auto">
            <EyeOff className="w-8 h-8" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Profile Sharing Consent Required</h2>
            <p className="text-xs text-gray-500 leading-relaxed">
              Acme Corporation has locked lender visibility. Underwriting records, cash flow calculations, and verified dossiers are blurred.
            </p>
          </div>

          <div className="p-4 bg-yellow-50 dark:bg-yellow-950/10 rounded-xl text-[11px] text-yellow-800 dark:text-yellow-400 leading-relaxed text-left flex items-start space-x-2">
            <ShieldAlert className="w-4 h-4 shrink-0 text-yellow-600" />
            <span>To review this profile, request the borrower to grant active sharing consent for Bank Officer scope in their Credit Command Center.</span>
          </div>

          <button
            onClick={() => navigate('/overview')}
            className="w-full py-2.5 bg-primary-950 text-white rounded-xl font-bold text-xs hover:bg-neutral-800 transition"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 p-6 pb-20 text-left">
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
              <div className="w-12 h-12 bg-primary-50 dark:bg-primary-950/40 text-primary-600 rounded-2xl flex items-center justify-center font-bold text-lg font-mono">
                {score}
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Acme Corporation (Manufacturing)</h3>
                <p className="text-xs text-gray-400">Borrower Credit-Readiness Rating: {band}</p>
              </div>
            </div>
            <div className="text-xs md:text-right">
              <span className="text-gray-400 block font-semibold">Udyam Registration</span>
              <span className={`font-bold ${udyamDoc?.status === 'Complete' ? 'text-green-600' : 'text-red-500'}`}>
                {udyamDoc?.status === 'Complete' ? 'Verified & Complete' : 'Expired - Renewal Action Pending'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs leading-relaxed text-gray-600 dark:text-gray-400">
            {/* Repayment Capacity - requires Bank Statements consent */}
            <div className={`space-y-2 transition-all duration-300 ${!hasBankStatements ? 'blur-sm select-none pointer-events-none opacity-40' : ''}`}>
              <span className="font-bold text-gray-800 dark:text-gray-200 block">Repayment Capacity (Bank Statement Audit)</span>
              {hasBankStatements ? (
                <p>
                  Calculated monthly EBITDA of <strong>₹2.16 Lakh</strong> supports the existing EMI obligation of <strong>₹45k</strong> comfortably. 
                  DSCR stands at a stable <strong>2.2x</strong>.
                </p>
              ) : (
                <p className="text-[10px] text-gray-400">Bank Statement Scope not authorized in owner consent.</p>
              )}
            </div>

            {/* GST cash flow parameters - requires GST consent */}
            <div className={`space-y-2 transition-all duration-300 ${!hasGST ? 'blur-sm select-none pointer-events-none opacity-40' : ''}`}>
              <span className="font-bold text-gray-800 dark:text-gray-200 block">GST Cash Flow (GSTR-3B audit)</span>
              {hasGST ? (
                <p>
                  Net cash conversion cycle of <strong>36 days</strong> indicates a temporary gap of <strong>₹8.5 Lakh</strong>. 
                  GST filing status: <span className="font-semibold text-primary-950 dark:text-white">{gstDoc?.status === 'Complete' ? 'Filed' : 'Late/Missing'}</span>.
                </p>
              ) : (
                <p className="text-[10px] text-gray-400">GST Returns Scope not authorized in owner consent.</p>
              )}
            </div>

            {/* Financial Audits - requires Financials consent */}
            <div className={`space-y-2 transition-all duration-300 ${!hasFinancials ? 'blur-sm select-none pointer-events-none opacity-40' : ''}`}>
              <span className="font-bold text-gray-800 dark:text-gray-200 block">Financial Records Audit (Balance Sheet)</span>
              {hasFinancials ? (
                <div className="p-2.5 bg-primary-50 dark:bg-primary-950/20 border border-primary-100 dark:border-primary-900/40 rounded-lg text-primary-900 dark:text-primary-300 font-semibold">
                  Audited financials file: {financialsDoc?.status === 'Complete' ? 'Verified by advisor' : 'Missing upload'}. Recommend short-term facility of ₹15 Lakh.
                </div>
              ) : (
                <p className="text-[10px] text-gray-400">Financial Statements Scope not authorized in owner consent.</p>
              )}
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
              {documents.map((doc) => (
                <div key={doc.id} className="flex justify-between items-center py-2 border-b border-gray-50 dark:border-gray-700 last:border-0">
                  <div>
                    <span className="font-semibold text-gray-850 dark:text-gray-200 block">{doc.name}</span>
                    <span className="text-[10px] text-gray-400 block">{doc.category}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    doc.status === 'Complete' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>{doc.status === 'Complete' ? 'Reconciled' : 'Awaiting'}</span>
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
              {penalties.filter(p => p.status === 'Active').map((p) => (
                <div key={p.penalty_id} className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900 rounded-lg space-y-1">
                  <span className="font-bold text-red-700 dark:text-red-400 block">{p.reason}</span>
                  <p className="text-[10px] text-red-650 dark:text-red-400/80">
                    Deduction: {p.penalty_points} • Risk Category: {p.penalty_type}
                  </p>
                </div>
              ))}
              {penalties.filter(p => p.status === 'Active').length === 0 && (
                <div className="p-3 bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900 rounded-lg text-green-700 font-semibold">
                  No active warnings detected. Borrower profile is optimized.
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
