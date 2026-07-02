import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, ShieldCheck, ArrowRight, FileText, CheckCircle2, 
  AlertTriangle, ChevronLeft, Download, Share2, Eye, Printer, Copy, Lock, CreditCard, Sparkles
} from 'lucide-react';

export default function CreditReadyFile() {
  const navigate = useNavigate();
  const [isExporting, setIsExporting] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [shareLink, setShareLink] = useState('');

  // Mock Credit Profile Data
  const profile = {
    businessName: 'Apex Precision Fabrication Pvt Ltd',
    gstin: '33AAAAA1111A1Z1',
    founded: '2019',
    city: 'Trichy Industrial Cluster, Tamil Nadu',
    pipelineValue: '₹ 12.0 Lakhs',
    wcGap: '₹ 2.2 Lakhs',
    safeLoanEstimate: '₹ 3.5 Lakhs',
    creditScore: 82,
    grade: 'Grade A: Bank-Ready',
    gradeColor: 'text-green-600 dark:text-green-400 bg-green-500/10 border-green-500/20',
    activityViews: '1,428 views',
    activeEnquiries: '8 enquiries',
    conversionRate: '3.4%'
  };

  const documentChecklist = [
    { name: 'GSTIN Registry Registration', status: 'Verified', color: 'text-green-500' },
    { name: '12 Months Bank Statements (Digitized)', status: 'Complete', color: 'text-green-500' },
    { name: 'Latest GSTR-3B & GSTR-1 Logs', status: 'Complete', color: 'text-green-500' },
    { name: 'Director PAN & KYC Credentials', status: 'Complete', color: 'text-green-500' },
    { name: 'Outstanding Debt Repayment Schedule', status: 'Complete', color: 'text-green-500' },
    { name: 'MSME Udhyam Registration Certificate', status: 'Pending', color: 'text-amber-500' }
  ];

  const redFlags = [
    { name: 'GSTR Late Filing Penalties', status: '0 Active', severity: 'Low Risk', color: 'text-green-500' },
    { name: 'Check Bounce Instances (12m)', status: '0 Instances', severity: 'Low Risk', color: 'text-green-500' },
    { name: 'Overdraft Limit Excess Days', status: '2 Days Out', severity: 'Low Risk', color: 'text-green-500' }
  ];

  const handleExportPDF = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('📄 Lender-Ready Credit Dossier downloaded as PDF successfully!');
    }, 1500);
  };

  const handleGenerateShareLink = () => {
    const mockHash = Math.random().toString(36).substring(2, 9);
    setShareLink(`https://finpercent.com/share/credit_dossier_${mockHash}`);
    setShareModal(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    alert('📋 Encrypted lender link copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 p-6 pb-20 text-left">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Navigation & Header Actions */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate('/finning-circle/gateway')}
            className="neo-button glass-action px-4 py-2 text-gray-600 dark:text-gray-400 hover:shadow-lg transition-all duration-300 flex items-center text-xs font-semibold"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            <span>Back to Pathway</span>
          </button>

          {isUnlocked && (
            <div className="flex gap-2">
              <button
                onClick={handleExportPDF}
                disabled={isExporting}
                className="px-5 py-2.5 bg-gray-150 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white rounded-xl shadow-sm text-xs font-bold flex items-center space-x-2 transition"
              >
                <Printer className="w-4 h-4" />
                <span>{isExporting ? 'Exporting...' : 'Print / Export PDF'}</span>
              </button>
              <button
                onClick={handleGenerateShareLink}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md text-xs font-bold flex items-center space-x-2 transition"
              >
                <Share2 className="w-4 h-4" />
                <span>Share with Lenders</span>
              </button>
            </div>
          )}
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold text-primary-950 dark:text-white">SME Credit-Ready File</h1>
          <p className="text-sm text-gray-500 max-w-lg mx-auto">
            Ministry-aligned credit dossiers linking public TradeStream activity to verified financial indicators.
          </p>
        </div>

        {!isUnlocked ? (
          // PREMIUM LOCKSCREEN OVERLAY (PRD SUGGESTION: ₹2,999 - ₹9,999 purchase)
          <div className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-850 rounded-3xl p-8 shadow-xl max-w-2xl mx-auto space-y-6 text-center">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-2xl flex items-center justify-center mx-auto shadow animate-pulse">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Lender-Ready Credit Appraisal File</h2>
              <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
                Unlock your complete appraisal file. Finpercent package links GST details, TradeStream view counts, 
                working-capital gaps, and GSTR logs into a structured PDF ready for banker underwriting.
              </p>
            </div>

            {/* Price list and purchase button */}
            <div className="bg-emerald-500/5 p-5 rounded-2xl border border-emerald-500/10 text-xs text-left max-w-md mx-auto space-y-3">
              <div className="flex justify-between items-center font-bold text-emerald-800 dark:text-emerald-300">
                <span>Credit-Ready Dossier (Pro Export)</span>
                <span className="text-lg">₹ 2,999</span>
              </div>
              <div className="space-y-1.5 text-gray-600 dark:text-gray-400">
                <p>✓ <strong>Verified stamp:</strong> Certified GST Registry & PAN details.</p>
                <p>✓ <strong>Demand indicators:</strong> Verification of TradeStream activity logs.</p>
                <p>✓ <strong>Banker sharing:</strong> Copy secure share links for public banks.</p>
              </div>
            </div>

            <button
              onClick={() => setIsUnlocked(true)}
              className="w-full max-w-md py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-1.5 mx-auto"
            >
              <CreditCard className="w-4 h-4" />
              <span>Purchase & Unlock Credit File</span>
            </button>
          </div>
        ) : (
          // COMPREHENSIVE LENDER APPRAISAL DOSSIER SHEET (PAPER THEME)
          <div className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-xl max-w-4xl mx-auto space-y-8 animate-fadeIn font-sans relative">
            
            {/* Stamp Stamp overlay */}
            <div className="absolute top-8 right-8 border-4 border-emerald-500 text-emerald-500 rounded-xl px-4 py-2 font-mono font-bold text-xs uppercase transform rotate-12 opacity-80 select-none">
              VERIFIED APPRASIAL
            </div>

            {/* Paper Header */}
            <div className="border-b-2 border-gray-100 dark:border-gray-800 pb-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-primary-950 dark:bg-primary-50 rounded-2xl flex items-center justify-center text-white dark:text-black font-extrabold text-xl">
                %
              </div>
              <div>
                <h2 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white uppercase font-mono">Finpercent Business Intelligence Report</h2>
                <p className="text-[10px] text-gray-400 font-mono">Dossier ID: FP-CR-904-893 • MCA Registered SME Apprasial</p>
              </div>
            </div>

            {/* Scorecard grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
              <div className="p-4 bg-gray-50 dark:bg-gray-800/40 rounded-2xl border border-gray-150 dark:border-gray-700">
                <span className="text-[9px] text-gray-400 uppercase font-mono block">Credit Index Score</span>
                <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono mt-1 block">{profile.creditScore}</span>
                <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded border inline-block mt-2 ${profile.gradeColor}`}>
                  {profile.grade}
                </span>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800/40 rounded-2xl border border-gray-150 dark:border-gray-700">
                <span className="text-[9px] text-gray-400 uppercase font-mono block">Active Pipeline Value</span>
                <span className="text-lg font-black text-gray-900 dark:text-white mt-1 block">{profile.pipelineValue}</span>
                <span className="text-[9px] text-gray-400 mt-2 block">Verified TradeStream RFQs</span>
              </div>

              <div className="p-4 bg-gray-55 dark:bg-gray-800/40 rounded-2xl border border-gray-150 dark:border-gray-700">
                <span className="text-[9px] text-gray-400 uppercase font-mono block">Funding Gap Identified</span>
                <span className="text-lg font-black text-red-650 dark:text-red-400 mt-1 block">{profile.wcGap}</span>
                <span className="text-[9px] text-gray-400 mt-2 block">Required Working Capital</span>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800/40 rounded-2xl border border-gray-150 dark:border-gray-700">
                <span className="text-[9px] text-gray-400 uppercase font-mono block">Safe Borrowing Limit</span>
                <span className="text-lg font-black text-emerald-600 dark:text-emerald-400 mt-1 block">{profile.safeLoanEstimate}</span>
                <span className="text-[9px] text-gray-400 mt-2 block">Debt Capacity threshold</span>
              </div>
            </div>

            {/* Content: Legal + Demand + Gaps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs leading-relaxed">
              
              {/* Left Column */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider font-mono border-b pb-1 text-[10px]">
                    1. Legal Registry Identity
                  </h4>
                  <div className="space-y-1.5 font-semibold text-gray-700 dark:text-gray-300">
                    <p><span className="text-gray-400">Legal Entity:</span> {profile.businessName}</p>
                    <p><span className="text-gray-400">Government GSTIN:</span> {profile.gstin}</p>
                    <p><span className="text-gray-400">Physical Cluster:</span> {profile.city}</p>
                    <p><span className="text-gray-400">Incorporate Year:</span> {profile.founded}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider font-mono border-b pb-1 text-[10px]">
                    2. Marketplace Demand Signals
                  </h4>
                  <div className="space-y-1.5 font-semibold text-gray-700 dark:text-gray-300">
                    <p><span className="text-gray-400">Total Showcase Views:</span> {profile.activityViews}</p>
                    <p><span className="text-gray-400">Procurement Enquiries:</span> {profile.activeEnquiries}</p>
                    <p><span className="text-gray-400">RFQ Conversion Rate:</span> {profile.conversionRate}</p>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider font-mono border-b pb-1 text-[10px]">
                    3. Underwriting Checklist
                  </h4>
                  <div className="space-y-2 font-semibold">
                    {documentChecklist.map((doc, i) => (
                      <div key={i} className="flex justify-between">
                        <span className="text-gray-650 dark:text-gray-450">{doc.name}</span>
                        <span className={`font-bold flex items-center gap-1 ${doc.color}`}>
                          ✓ {doc.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Red Flag Audit Audit */}
            <div className="space-y-3">
              <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider font-mono border-b pb-1 text-[10px]">
                4. Red Flag Risk Audit
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold">
                {redFlags.map((flag, i) => (
                  <div key={i} className="p-3 bg-gray-50 dark:bg-gray-800/40 rounded-xl border flex justify-between items-center">
                    <div>
                      <span className="text-gray-500 block text-[9px] uppercase tracking-wider font-mono">{flag.name}</span>
                      <span className="text-gray-900 dark:text-white font-bold">{flag.status}</span>
                    </div>
                    <span className={`font-bold ${flag.color}`}>{flag.severity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer stamp and notice */}
            <div className="border-t pt-4 text-[10px] text-gray-450 dark:text-gray-500 leading-relaxed text-center font-mono">
              Notice: This appraisal dossier contains verified tax filings and GST records direct from source registry logs. 
              The business pipeline is checked against procurement logs on TradeStream. Financial data is shared only with recipient consent.
            </div>

          </div>
        )}

        {/* SHARE MODAL BOX */}
        {shareModal && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
            <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl p-6 text-xs text-left shadow-2xl border border-gray-250 dark:border-gray-800 space-y-5 animate-scaleUp">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-sm flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-emerald-500" /> Share Secure Dossier Link
                </h4>
                <button onClick={() => setShareModal(false)} className="p-1 text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-gray-500 leading-relaxed">
                Copy this secure, single-use tokenized link and share it with your bank manager or lender officer. 
                They can view your verified GST profile, TradeStream activity, and working-capital gap diagnostics.
              </p>

              <div className="flex bg-gray-50 dark:bg-gray-800 p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 items-center justify-between">
                <span className="font-mono text-emerald-650 dark:text-emerald-400 overflow-x-auto whitespace-nowrap scrollbar-none pr-3 flex-1 select-all">
                  {shareLink}
                </span>
                <button 
                  onClick={handleCopyLink}
                  className="p-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>

              <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 rounded-xl flex items-start gap-2">
                <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />
                <p className="text-[10px]">
                  <strong>Security Rule:</strong> This link is read-only and remains valid for 7 days. Financial statements are hidden until you grant explicit consent in your permissions center.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
