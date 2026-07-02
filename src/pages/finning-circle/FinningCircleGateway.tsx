import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, ShieldCheck, ArrowRight, Video, FileText, 
  GraduationCap, Briefcase, Cpu, HelpCircle, ArrowUpRight, Award, Compass, Play
} from 'lucide-react';

export default function FinningCircleGateway() {
  const navigate = useNavigate();

  // Mock progress state to reflect user journey
  const steps = [
    {
      number: '01',
      title: 'GST Verify & Onboard',
      subtitle: 'Layer 1: Visibility Primary',
      desc: 'Verify business credentials via GSTIN to auto-generate a verified profile and unlock the GST Badge.',
      status: 'Completed',
      color: 'border-green-500 bg-green-500/10 text-green-700 dark:text-green-300',
      actionText: 'Manage Profile',
      path: '/finning-circle/onboard'
    },
    {
      number: '02',
      title: 'Showcase Builder',
      subtitle: 'Layer 1: Visibility Secondary',
      desc: 'Publish products, upload short demonstration videos, and schedule live product showcases.',
      status: 'In Progress',
      color: 'border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-300',
      actionText: 'Build Catalogue',
      path: '/finning-circle/builder'
    },
    {
      number: '03',
      title: 'Verified SME Passport',
      subtitle: 'Layer 2: Credibility Bridge',
      desc: 'Accumulate trust badges, capability proof certificates, and calculate public Business Trust Scores.',
      status: 'Ready',
      color: 'border-blue-500 bg-blue-500/10 text-blue-700 dark:text-blue-300',
      actionText: 'View Passport',
      path: '/finning-circle/passport'
    },
    {
      number: '04',
      title: 'Market Discovery & Feeds',
      subtitle: 'Layer 1: Live Activity',
      desc: 'Browse short product reels, watch live streaming manufacturing tours, and connect with workshops.',
      status: 'Ready',
      color: 'border-blue-500 bg-blue-500/10 text-blue-700 dark:text-blue-300',
      actionText: 'Launch Feed',
      path: '/finning-circle/discovery'
    },
    {
      number: '05',
      title: 'Working-Capital Diagnostic',
      subtitle: 'Layer 4: Financial Core',
      desc: 'Convert demand signal pipelines and client enquiries into exact operational capital gap diagnostics.',
      status: 'Locked',
      color: 'border-gray-300 bg-gray-100 text-gray-500 dark:border-gray-700 dark:bg-gray-800/40 dark:text-gray-400',
      actionText: 'Unlock Tool',
      path: '/financial/diagnostic'
    },
    {
      number: '06',
      title: 'Credit-Ready File',
      subtitle: 'Layer 4: Access Core',
      desc: 'Assemble statements, tax filings, and diagnostics into a lender-ready dossier file with shareable links.',
      status: 'Locked',
      color: 'border-gray-300 bg-gray-100 text-gray-500 dark:border-gray-700 dark:bg-gray-800/40 dark:text-gray-400',
      actionText: 'Unlock File',
      path: '/credit/ready-file'
    },
    {
      number: '07',
      title: 'AI-CXO Advisory',
      subtitle: 'Layer 6: AI6 Automation',
      desc: 'Activate role-based business co-pilots (AI CFO, CMO, CRO, COO) once active data flows are established.',
      status: 'Locked',
      color: 'border-gray-300 bg-gray-100 text-gray-500 dark:border-gray-700 dark:bg-gray-800/40 dark:text-gray-400',
      actionText: 'Unlock AI6',
      path: '/ai-cxo/dashboard'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 p-6 pb-20 text-left">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Banner/Header */}
        <div className="relative rounded-3xl overflow-hidden bg-primary-950 text-white p-8 md:p-12 shadow-2xl border border-primary-800">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.18),transparent)]"></div>
          
          <div className="relative z-10 max-w-4xl space-y-6">
            <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider">
              <Compass className="w-4 h-4 animate-spin text-emerald-400" />
              <span>Ecosystem Gateway & Pathway Router</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-serif font-light tracking-tight leading-tight">
              Get Seen. Get Trusted. <br />
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-green-400">Become Finance-Ready.</span>
            </h1>
            
            <p className="text-sm md:text-base text-primary-200/90 max-w-2xl leading-relaxed">
              Finpercent TradeStream onboard businesses through a visibility-first product layer (Finning Circle). 
              We then convert this activity into public credibility badges, trust scores, working-capital diagnostics, 
              and lender-ready files (Finpercent Core).
            </p>

            {/* Strategic Pathway Visualization */}
            <div className="pt-6 border-t border-white/10 mt-8">
              <p className="text-[10px] font-bold tracking-widest text-primary-300 uppercase mb-4">Strategic Sequence</p>
              <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm font-semibold">
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1.5 rounded">1. Get Seen (Reels Feed)</span>
                <ArrowRight className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1.5 rounded">2. Get Trusted (Passport)</span>
                <ArrowRight className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1.5 rounded">3. Get Enquiries</span>
                <ArrowRight className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="bg-primary-900 border border-primary-850 px-3 py-1.5 rounded text-primary-400">4. Diagnostic Ready</span>
                <ArrowRight className="w-4 h-4 text-primary-600 shrink-0" />
                <span className="bg-primary-900 border border-primary-850 px-3 py-1.5 rounded text-primary-400">5. Unlock AI6 CFO</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Workflow Tracker */}
        <div className="space-y-6">
          <div className="flex justify-between items-baseline">
            <h2 className="text-2xl font-bold text-primary-950 dark:text-white">MSME Progression Path</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">Complete visibility layers to unlock financial access features</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => {
              const isLocked = step.status === 'Locked';
              const isCompleted = step.status === 'Completed';
              return (
                <div 
                  key={i}
                  className={`bg-white dark:bg-gray-800 rounded-2xl border p-6 flex flex-col justify-between h-[280px] shadow-sm relative transition-all duration-200 ${
                    isLocked 
                      ? 'border-gray-200/60 dark:border-gray-800 opacity-60' 
                      : 'border-emerald-500/20 hover:border-emerald-500/50 hover:shadow-lg'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-black text-emerald-600/35 font-mono">{step.number}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${step.color}`}>
                        {step.status}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-base text-gray-900 dark:text-white">{step.title}</h3>
                      <p className="text-[10px] text-emerald-650 dark:text-emerald-400 font-bold uppercase tracking-wider font-mono mt-0.5">
                        {step.subtitle}
                      </p>
                    </div>

                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3">
                      {step.desc}
                    </p>
                  </div>

                  <button
                    onClick={() => navigate(step.path)}
                    disabled={isLocked}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors mt-4 ${
                      isCompleted 
                        ? 'bg-green-600 hover:bg-green-700 text-white shadow-sm'
                        : isLocked
                        ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed border border-gray-250 dark:border-gray-700'
                        : 'bg-primary-600 hover:bg-primary-750 text-white shadow-sm'
                    }`}
                  >
                    <span>{step.actionText}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Callouts Section: Core Principle */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl p-6 border border-emerald-100 dark:border-emerald-900/30 flex gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0 shadow-md">
              💡
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-1">Visibility Creates Confidence</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                Showcasing fabrication work, interior setup processes, and packaging demos builds viewer confidence.
              </p>
            </div>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl p-6 border border-emerald-100 dark:border-emerald-900/30 flex gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-650 text-white flex items-center justify-center font-bold shrink-0 shadow-md">
              🤝
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-1">Confidence Creates Trust</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                Trust is solidified through GST verification and progressive verified capability passports (SME Passport).
              </p>
            </div>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl p-6 border border-emerald-100 dark:border-emerald-900/30 flex gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold shrink-0 shadow-md">
              📈
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-1">Trust Creates Readiness</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                Activity turns into pipeline calculations, working-capital diagnostics, lender-ready files, and AI CFO tools.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
