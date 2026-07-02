import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ShieldCheck, Download, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useReadiness } from '../../contexts/ReadinessContext';

export default function CreditReadinessReportPage() {
  const navigate = useNavigate();
  const { score, band, documents, consents, toggleConsent } = useReadiness();
  const [isExporting, setIsExporting] = useState(false);

  const docCompleteCount = documents.filter(d => d.status === 'Complete').length;
  const docPct = Math.round((docCompleteCount / documents.length) * 100);

  // Status Level Allocation
  let reportLevel = 'Not Ready';
  let reportStatusLabel = 'Level 4: Not Ready';
  let reportDesc = 'This report is missing core details and is not suitable for lender sharing.';
  let showLock = true;

  if (score >= 75 && docPct >= 85) {
    reportLevel = 'Bank-Ready Report';
    reportStatusLabel = 'Level 1: Bank-Ready Report';
    reportDesc = 'Your report is fully verified, complete, and optimized for lender underwriting.';
    showLock = false;
  } else if (score >= 60) {
    reportLevel = 'Usable with Gaps';
    reportStatusLabel = 'Level 2: Usable with Gaps';
    reportDesc = 'Your report has sufficient data for preliminary review but contains compliance gaps.';
    showLock = false; // Usable with gaps is allowed to be shared, but clearly marked
  } else if (score >= 40) {
    reportLevel = 'Internal Improvement Report';
    reportStatusLabel = 'Level 3: Internal Improvement Report';
    reportDesc = 'Your report contains multiple missing parameters and is restricted to internal diagnostics.';
    showLock = true;
  }

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert(`📄 ${score >= 75 ? 'Bank-Ready appraisal file' : 'Internal improvement diagnostics file'} downloaded successfully!`);
    }, 1500);
  };

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
            <span>{isExporting ? 'Exporting...' : score >= 75 ? 'Export Bank-Ready Dossier' : 'Export Internal Diagnostics'}</span>
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
            <div className="w-12 h-12 bg-primary-50 dark:bg-primary-950/40 text-primary-600 rounded-2xl flex items-center justify-center font-bold text-lg font-mono">
              {score}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{reportStatusLabel}</h3>
              <p className="text-xs text-gray-400">Score Band: {band} (Current Score: {score}/100)</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            <div className="space-y-3">
              <span className="font-bold text-gray-800 dark:text-gray-200 block">Credit Health Overview</span>
              <p>
                The borrower demonstrates operational activity in a Peenya-based B2B manufacturing hub. 
                Incoming cash flows are allocated straight-through via S.T.O.P allocations. Debt leverage pressure is currently rated moderate.
              </p>
              {score >= 75 ? (
                <div className="p-3 bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/40 rounded-lg text-green-800 dark:text-green-400 font-semibold">
                  <strong>Verification Status:</strong> Strong data confidence. Ready for bank submission.
                </div>
              ) : (
                <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/40 rounded-lg text-red-800 dark:text-red-400 font-semibold">
                  <strong>Gaps Detected:</strong> Report labeled "{reportLevel}". Outdated or missing filing parameters trigger penalty flags.
                </div>
              )}
            </div>
            <div className="space-y-3">
              <span className="font-bold text-gray-800 dark:text-gray-200 block">Credit Gaps & Action Requirements</span>
              <p>
                Review outstanding checklist requirements. Uploading financial ledgers and renewing expired registrations resolves penalties, restoring points to the overall scorecard.
              </p>
              <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-100 dark:border-yellow-900/40 rounded-lg text-yellow-800 dark:text-yellow-400">
                <strong>Top Priority:</strong> Complete missing documents list to unlock Bank-Ready Report status.
              </div>
            </div>
          </div>
        </div>

        {/* Lender Sharing & Consent Authorization */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
          <h3 className="text-md font-bold text-gray-900 dark:text-white border-b border-gray-50 dark:border-gray-700 pb-3 flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-primary-600" />
            <span>Lender Sharing & Consent Authorization</span>
          </h3>

          {showLock ? (
            <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900 rounded-xl space-y-3">
              <div className="flex items-center space-x-2 text-yellow-800 dark:text-yellow-400 font-bold text-xs">
                <AlertTriangle className="w-4 h-4 animate-bounce" />
                <span>Bank-Ready Report Locked (Score: {score}/100)</span>
              </div>
              <p className="text-xs text-yellow-700 dark:text-yellow-400/80 leading-relaxed">
                Your readiness score is below the 75-point bank threshold or documents are incomplete (Completeness: {docPct}%). To unlock full Bank-Ready status, resolve the following checklist items:
              </p>
              <ul className="list-disc list-inside text-[11px] text-yellow-800 dark:text-yellow-400/90 space-y-1 pl-1 font-mono">
                {documents.filter(d => d.status !== 'Complete').map(d => (
                  <li key={d.id}>{d.name} ({d.status})</li>
                ))}
              </ul>
              <div className="text-[10px] text-gray-400 italic mt-1">
                Note: You can still export this internally as a "{reportLevel}" report.
              </div>
            </div>
          ) : (
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-xl">
                <div className="flex items-center space-x-2 text-green-800 dark:text-green-400 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Unlocked: Lender Appraisal Sharing Authorized ({reportLevel})</span>
                </div>
                <p className="text-[11px] text-green-700 dark:text-green-400/80 mt-1">
                  {reportDesc} You can share this report with State Bank & NBFC partners.
                </p>
              </div>

              {/* Consent Toggles */}
              <div className="space-y-3 pt-2">
                <span className="font-bold text-gray-800 dark:text-gray-200 block">Configure Sharing Consent</span>
                {consents.filter(c => c.partnerId === 'bank').map((c) => (
                  <div key={c.partnerId} className="flex justify-between items-center p-3 bg-gray-50/50 dark:bg-gray-900/30 border border-gray-150 dark:border-gray-800 rounded-lg">
                    <div>
                      <span className="font-bold block">{c.partnerName}</span>
                      <span className="text-[10px] text-gray-400 block mt-0.5">Scope: {c.scopes.join(', ')} • Expiry: {c.expiryDaysRemaining} days</span>
                    </div>
                    <button
                      onClick={() => toggleConsent(c.partnerId)}
                      className={`px-3 py-1.5 rounded text-[10px] font-bold border transition-all ${
                        c.active 
                          ? 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100' 
                          : 'bg-gray-50 border-gray-200 text-gray-400'
                      }`}
                    >
                      {c.active ? 'Revoke Bank Share' : 'Enable Bank Share'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
