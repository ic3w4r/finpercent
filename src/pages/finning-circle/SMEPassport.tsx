import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, ShieldCheck, ArrowRight, Award, Compass, 
  ChevronLeft, Eye, EyeOff, CheckCircle2, AlertTriangle, HelpCircle, FileText, ArrowDownToLine, Share2
} from 'lucide-react';

export default function SMEPassport() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'private' | 'public'>('private');
  
  // Dynamic Score parameters
  const scoreBreakdowns = [
    { name: 'GST Identity Verification', points: 20, max: 20, status: 'Verified' },
    { name: 'Profile Completeness (70% done)', points: 15, max: 20, status: 'Verified' },
    { name: 'Capability Proof (Video Reel Uploaded)', points: 15, max: 20, status: 'Verified' },
    { name: 'Marketplace Active Rate', points: 10, max: 15, status: 'Verified' },
    { name: 'Buyer Enquiry Response Time (< 2 hrs)', points: 8, max: 10, status: 'Verified' },
    { name: 'Financial Diagnostics & Bank Consent', points: 0, max: 15, status: 'Pending' }
  ];

  const totalScore = scoreBreakdowns.reduce((acc, current) => acc + current.points, 0);

  // Badge progression ladder
  const badges = [
    { name: 'GST Verified', level: 1, desc: 'GSTIN credentials validated with GSTN Registry.', unlocked: true },
    { name: 'Profile Verified', level: 2, desc: 'Contact details, trade details, and location completed.', unlocked: true },
    { name: 'Capability Verified', level: 3, desc: 'Capabilities proven via product showcase video upload.', unlocked: true },
    { name: 'Market Active', level: 4, desc: 'Responded to at least 3 buyer enquiries and active view count.', unlocked: true },
    { name: 'Financial Trust', level: 5, desc: 'Uploaded bank statements and connected tax filings.', unlocked: false },
    { name: 'Credit Ready', level: 6, desc: 'Working capital gap assessed, Red Flag audits completed.', unlocked: false },
    { name: 'Growth Ready', level: 7, desc: 'Final credit dossier shared with approved lenders.', unlocked: false }
  ];

  const unlockedCount = badges.filter(b => b.unlocked).length;
  const progressPct = Math.round((unlockedCount / badges.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 p-6 pb-20 text-left">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Navigation & View Toggle */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <button
            onClick={() => navigate('/finning-circle/gateway')}
            className="neo-button glass-action px-4 py-2 text-gray-600 dark:text-gray-400 hover:shadow-lg transition-all duration-300 flex items-center text-xs font-semibold"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            <span>Back to Pathway</span>
          </button>

          <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl border border-gray-250 dark:border-gray-700">
            <button
              onClick={() => setViewMode('private')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'private'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
              }`}
            >
              <EyeOff className="w-3.5 h-3.5" /> Owner Dashboard (Private)
            </button>
            <button
              onClick={() => setViewMode('public')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'public'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5" /> Buyer View (Public Page)
            </button>
          </div>
        </div>

        {/* Dynamic Passport Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Passport Visa Card Grid */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* The Physical Passport Mock */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-950 to-teal-950 text-white p-8 border border-emerald-800 shadow-2xl space-y-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.15),transparent)]"></div>
              
              {/* Passport Header */}
              <div className="flex justify-between items-start border-b border-emerald-800/60 pb-6">
                <div>
                  <h2 className="text-2xl font-serif tracking-widest uppercase font-bold text-emerald-100">Verified SME Passport</h2>
                  <p className="text-[9px] uppercase tracking-widest text-emerald-450 font-mono mt-1">Republic of India • TradeStream Certified</p>
                </div>
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                  <Award className="w-8 h-8 text-emerald-400" />
                </div>
              </div>

              {/* Passport Body */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs leading-relaxed">
                {/* Photo Placeholder */}
                <div className="flex flex-col items-center p-3 border border-emerald-850 bg-emerald-900/35 rounded-2xl aspect-[3/4] justify-center text-center space-y-2">
                  <Building2 className="w-12 h-12 text-emerald-400" />
                  <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-250">Apex Fab</span>
                  <span className="text-[8px] bg-emerald-400/25 border border-emerald-400/30 text-emerald-300 px-2 py-0.5 rounded-full font-mono uppercase font-black">
                    GST-Active
                  </span>
                </div>

                {/* Details Sheet */}
                <div className="md:col-span-2 space-y-4 font-semibold text-emerald-100">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[9px] text-emerald-450 uppercase block font-mono">Business Registry Name</span>
                      <span className="text-sm font-extrabold text-white">Apex Fabrication Ltd</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-emerald-450 uppercase block font-mono">Passport Status</span>
                      <span className="text-sm text-green-400 font-extrabold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 fill-current text-green-500" /> Active (V1)
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] text-emerald-450 uppercase block font-mono">Registry Category</span>
                      <span className="text-xs">Fabrication & Machining</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-emerald-450 uppercase block font-mono">State Code</span>
                      <span className="text-xs font-mono">33 (Tamil Nadu)</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-emerald-450 uppercase block font-mono">Verified Badges</span>
                      <span className="text-xs font-mono text-emerald-350">{unlockedCount} of 7 Earned</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-emerald-450 uppercase block font-mono">Response Trust</span>
                      <span className="text-xs text-green-400 font-extrabold">98% (High Speed)</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-emerald-900/60 flex justify-between items-center text-[10px]">
                    <div className="flex flex-col">
                      <span className="text-[8px] text-emerald-450 uppercase font-mono">Issuing Authority</span>
                      <span className="font-extrabold text-white">Finpercent Verification Officer</span>
                    </div>
                    <div className="w-12 h-12 border-2 border-emerald-800 rounded flex items-center justify-center font-mono font-bold text-emerald-500 opacity-60">
                      STAMP
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Displaying view details */}
            {viewMode === 'private' ? (
              // PRIVATE OWNER DASHBOARD DETAILS
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-md space-y-6">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3">
                  Business Trust Score Breakdown
                </h3>
                
                <div className="space-y-4">
                  {scoreBreakdowns.map((score, i) => (
                    <div key={i} className="flex justify-between items-center text-xs">
                      <div className="space-y-0.5">
                        <p className="font-bold text-gray-800 dark:text-gray-200">{score.name}</p>
                        <p className="text-[10px] text-gray-400 font-mono">Status: {score.status}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-gray-900 dark:text-white">{score.points}</span>
                        <span className="text-gray-400"> / {score.max} pts</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-primary-950 text-white rounded-2xl p-5 border border-primary-850 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-bold">Total Trust Score: {totalScore}/100</h4>
                    <p className="text-[10px] text-primary-300 mt-1 leading-relaxed">
                      Your business profile score is ahead of 76% of fabrication manufacturers in Trichy. Connect financial records to unlock top bands.
                    </p>
                  </div>
                  <div className="w-14 h-14 rounded-full border-4 border-emerald-500 flex items-center justify-center font-bold text-lg text-emerald-400 shrink-0 font-mono">
                    {totalScore}%
                  </div>
                </div>

                {/* Direct CTA Nudge to diagnostic */}
                <div className="p-5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-300">Ready to unlock Financial Access?</h4>
                    <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-1 leading-relaxed">
                      Your TradeStream profile has active buyer enquiries. Run the Working-Capital Diagnostic to check safe borrowing limits.
                    </p>
                  </div>
                  <button
                    onClick={() => navigate('/financial/diagnostic')}
                    className="py-2.5 px-5 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary-600 transition flex items-center gap-1.5 shrink-0 shadow-md"
                  >
                    <span>Assess Working Capital</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              // PUBLIC BUYER CONFIDENCE DETAILS
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-md space-y-6">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3">
                  Buyer Trust Indicators
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-800/40 rounded-xl space-y-1.5">
                      <span className="font-bold text-gray-850 dark:text-gray-200 block">✓ GSTIN Registered Address</span>
                      <p className="text-gray-500 leading-relaxed">
                        The business physical address is cross-verified against the Ministry of Corporate Affairs (MCA) database and active GST logs.
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 dark:bg-gray-800/40 rounded-xl space-y-1.5">
                      <span className="font-bold text-gray-850 dark:text-gray-200 block">✓ Product Replay Proofs</span>
                      <p className="text-gray-500 leading-relaxed">
                        Watch recorded milling, bending, and packaging live demos uploaded by the factory manager as verifiable proof of technical capability.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-800/40 rounded-xl space-y-1.5">
                      <span className="font-bold text-gray-850 dark:text-gray-200 block">✓ WhatsApp Response Rate</span>
                      <p className="text-gray-500 leading-relaxed">
                        Average response speed to incoming RFQs is <strong>1 hr 45 mins</strong>. Verified as highly reliable.
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 dark:bg-gray-800/40 rounded-xl space-y-1.5">
                      <span className="font-bold text-gray-850 dark:text-gray-200 block">✓ Export Compliance Stamp</span>
                      <p className="text-gray-500 leading-relaxed">
                        Exporter registration certificates (IEC) are complete, allowing cross-border shipment options from Trichy cluster.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Right: Badge Progression Ladder */}
          <div className="bg-white dark:bg-gray-905 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-md space-y-6">
            <div className="space-y-2">
              <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-500" />
                <span>Verified Badge Ladder</span>
              </h3>
              
              <div className="w-full bg-gray-100 dark:bg-gray-800 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full transition-all duration-300" style={{ width: `${progressPct}%` }}></div>
              </div>
              <p className="text-[10px] text-gray-400 font-mono font-bold uppercase tracking-wider">{progressPct}% Path Complete</p>
            </div>

            {/* Vertically stacked badges list */}
            <div className="space-y-4">
              {badges.map((badge, i) => (
                <div key={i} className="flex gap-4 text-xs">
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 font-bold ${
                    badge.unlocked 
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' 
                      : 'border-gray-250 bg-gray-50 text-gray-400 dark:border-gray-700 dark:bg-gray-800/40'
                  }`}>
                    {badge.level}
                  </div>
                  <div className="space-y-0.5">
                    <h4 className={`font-bold ${badge.unlocked ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'}`}>
                      {badge.name}
                    </h4>
                    <p className="text-[10px] text-gray-500 leading-relaxed">{badge.desc}</p>
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
