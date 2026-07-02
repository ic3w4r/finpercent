import React from 'react';
import { useReadiness } from '../../contexts/ReadinessContext';
import { 
  BarChart3, Users, FileText, AlertTriangle, ArrowRight, 
  TrendingUp, Coins, PhoneCall, CheckCircle, RefreshCw
} from 'lucide-react';

export default function ProviderDashboardPage() {
  const { cohort, documents, score } = useReadiness();

  // Simulated provider stats
  const providerStats = {
    totalOnboarded: 450,
    paidReportsGenerated: 124,
    incompleteReportsCount: 68,
    highRiskCount: 32,
    freeToPaidConversionRate: '27.5%',
    monitoringSubscribers: 88,
    revenuePotential: '₹4,85,000'
  };

  const followUpQueue = [
    { name: 'Acme Corporation', score, missingDocs: documents.filter(d => d.status !== 'Complete').map(d => d.name).join(', '), risk: score >= 75 ? 'Low' : score >= 40 ? 'Medium' : 'High' },
    { name: 'NeoPack Industries', score: 58, missingDocs: 'FY25 Audited financials, May 2026 GST returns', risk: 'Medium' },
    { name: 'GreenPlast Polymers', score: 38, missingDocs: 'ITR-6 tax return, Udyam certificate, FY25 Audited financials', risk: 'High' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 p-6 pb-20 text-left">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-primary-950 dark:text-white">Provider Campaign & Platform Console</h1>
            <p className="text-sm text-gray-500 mt-1">Monitor onboarding campaigns, track free-to-paid conversions, and follow up on incomplete files</p>
          </div>
        </div>

        {/* Aggregate Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'MSMEs Onboarded', val: `${providerStats.totalOnboarded} Firms`, desc: 'Across active campaigns', color: 'text-gray-950 dark:text-white' },
            { label: 'Conversion Rate (Free → Paid)', val: providerStats.freeToPaidConversionRate, desc: 'Target: 30% conversion', color: 'text-primary-600' },
            { label: 'Incomplete Reports Queue', val: `${providerStats.incompleteReportsCount} Files`, desc: 'Pending borrower documents', color: 'text-yellow-600' },
            { label: 'Platform Revenue Potential', val: providerStats.revenuePotential, desc: 'Paid reports + Monitoring setup', color: 'text-[#346538]' }
          ].map((item, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-2">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 block">{item.label}</span>
              <span className={`text-xl font-bold block ${item.color}`}>{item.val}</span>
              <span className="text-[10px] text-gray-400 block">{item.desc}</span>
            </div>
          ))}
        </div>

        {/* 2-Column Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Follow-up Queue */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
              <div className="border-b border-gray-50 dark:border-gray-700 pb-3 flex items-center space-x-2">
                <PhoneCall className="w-5 h-5 text-primary-600" />
                <h3 className="text-md font-bold text-gray-900 dark:text-white">Incomplete Files & Follow-Up Queue</h3>
              </div>

              <div className="divide-y divide-gray-50 dark:divide-gray-700/50">
                {followUpQueue.map((item, idx) => (
                  <div key={idx} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                    <div className="space-y-1">
                      <span className="font-bold text-gray-900 dark:text-white block">{item.name}</span>
                      <span className="text-[10px] text-neutral-450 dark:text-neutral-450 block max-w-md">
                        Gaps: {item.missingDocs || "None"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                      <div className="text-right">
                        <span className="font-bold block font-mono">{item.score}/100</span>
                        <span className={`text-[9px] font-bold ${
                          item.risk === 'High' ? 'text-red-650' : item.risk === 'Medium' ? 'text-yellow-650' : 'text-green-700'
                        }`}>{item.risk} Risk</span>
                      </div>
                      
                      <button 
                        onClick={() => alert(`📞 Call/SMS nudge triggered to proprietor of ${item.name} detailing missing files.`)}
                        className="px-2.5 py-1.5 bg-neutral-950 text-white hover:bg-neutral-850 dark:bg-primary-50 dark:text-black rounded text-[10px] font-bold transition-all"
                      >
                        Nudge Borrower
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Platform monetization metrics */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Campaign conversion funnel */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
              <div className="border-b border-gray-50 dark:border-gray-700 pb-3 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-[#346538]" />
                <h3 className="font-bold text-gray-900 dark:text-white text-md">Platform Conversion Funnel</h3>
              </div>

              <div className="space-y-3 text-xs font-semibold text-neutral-600 dark:text-neutral-400">
                {[
                  { stage: 'Quick Checks', count: '1,245', pct: '100%' },
                  { stage: 'Full Assessments', count: '450', pct: '36.1%' },
                  { stage: 'Paid Report Generation', count: '124', pct: '10.0%' },
                  { stage: 'Active Monitoring Sub', count: '88', pct: '7.1%' }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-900 dark:text-white font-bold">{item.stage}</span>
                      <span>{item.count} ({item.pct})</span>
                    </div>
                    <div className="w-full bg-neutral-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                      <div className="bg-primary-950 dark:bg-primary-50 h-full" style={{ width: item.pct }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Campaign Links and QR generator */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
              <div className="border-b border-gray-50 dark:border-gray-700 pb-3">
                <h3 className="font-bold text-gray-900 dark:text-white text-md">Provider Campaign Generator</h3>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Onboard new cohorts of MSMEs into specific district improvement projects.
              </p>

              <div className="bg-neutral-50/50 dark:bg-neutral-900/10 p-3 rounded border border-neutral-150 dark:border-gray-800 text-center space-y-2 text-xs">
                <div className="w-24 h-24 bg-white border border-neutral-200 rounded mx-auto flex items-center justify-center font-mono font-bold text-[9px]">
                  [QR SIMULATED]
                </div>
                <div className="font-bold text-[10px] text-neutral-800 dark:text-white font-mono">CAMP-2026-PEENYA-MFG</div>
                
                <button
                  onClick={() => {
                    const names = ['TechnoPrecision Tools', 'Narayana Machining', 'Basaveshwara Plastics', 'Hindustan Forge'];
                    const chosen = names[Math.floor(Math.random() * names.length)];
                    alert(`🔗 Onboarded "${chosen}" via simulated QR link to Peenya Cluster Campaign!`);
                  }}
                  className="w-full py-1.5 bg-primary-950 text-white dark:bg-primary-50 dark:text-black rounded text-[10px] font-bold"
                >
                  Generate Campaign QR Link
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
