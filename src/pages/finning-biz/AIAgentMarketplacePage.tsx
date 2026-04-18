import React from 'react';
import FinningBizNav from '../../components/finning-biz/FinningBizNav';

export default function AIAgentMarketplacePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <FinningBizNav />
      <div className="flex-1 overflow-auto">
        

        <main className="flex h-[calc(100vh-65px)] overflow-hidden">
          <aside className="w-80 flex flex-col border-r border-primary/10 bg-white dark:bg-background-dark/50 overflow-y-auto">
            <div className="p-6 border-b border-primary/10">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">forum</span>
                Collaboration Feed
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider font-semibold">Multi-Agent Interactions</p>
            </div>
            <div className="flex-1 p-4 space-y-4">
              <div className="p-3 rounded-xl bg-primary/5 border-l-4 border-primary space-y-2">
                <div className="flex items-center gap-2">
                  <div className="size-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[14px] text-primary">security</span>
                  </div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase">Auditor Agent</span>
                  <span className="text-[10px] text-slate-400 ml-auto">2m ago</span>
                </div>
                <p className="text-xs leading-relaxed italic">"Flagged anomaly in Q3 Supply Chain overhead. Disbursement mismatch detected."</p>
                <div className="flex items-center gap-1 text-[10px] text-primary font-bold">
                  <span className="material-symbols-outlined text-[12px]">trending_up</span>
                  Forecasting Agent responded...
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-100 dark:bg-primary/5 border-l-4 border-slate-400 dark:border-primary/30 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="size-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[14px] text-blue-500">monitoring</span>
                  </div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase">Forecasting Agent</span>
                  <span className="text-[10px] text-slate-400 ml-auto">5m ago</span>
                </div>
                <p className="text-xs leading-relaxed italic">"Adjusted H2 projections based on Audit anomaly. Revenue forecast lowered by 2.4%."</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-100 dark:bg-primary/5 border-l-4 border-red-500 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="size-6 rounded-full bg-red-500/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[14px] text-red-500">warning</span>
                  </div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase">Profit Leakage Agent</span>
                  <span className="text-[10px] text-slate-400 ml-auto">12m ago</span>
                </div>
                <p className="text-xs leading-relaxed italic">"Identified 15% spike in unallocated printing costs. Recommendation: Renegotiate Q4 vendor contracts."</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-100 dark:bg-primary/5 border-l-4 border-green-500 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="size-6 rounded-full bg-green-500/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[14px] text-green-500">account_balance_wallet</span>
                  </div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase">Working Capital Agent</span>
                  <span className="text-[10px] text-slate-400 ml-auto">22m ago</span>
                </div>
                <p className="text-xs leading-relaxed italic">"Liquidity ratio optimal. Current Assets cover 1.8x immediate liabilities."</p>
              </div>
            </div>
            <div className="p-4 mt-auto">
              <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined">add_comment</span>
                Add Annotation
              </button>
            </div>
          </aside>

          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="p-8 pb-4 flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                  <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">Joint Report: Multi-Agent Synthesis</h1>
                  <p className="text-slate-500 dark:text-slate-400 text-base">Real-time collaborative financial flow analysis for the calendar industry fiscal year 2024.</p>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <div className="flex items-center -space-x-3">
                    <div className="size-10 rounded-full border-2 border-background-dark bg-primary flex items-center justify-center text-[10px] font-bold text-white ring-2 ring-primary/20" title="Auditor Agent">A</div>
                    <div className="size-10 rounded-full border-2 border-background-dark bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white ring-2 ring-blue-600/20" title="Forecasting Agent">F</div>
                    <div className="size-10 rounded-full border-2 border-background-dark bg-red-600 flex items-center justify-center text-[10px] font-bold text-white ring-2 ring-red-600/20" title="Leakage Agent">L</div>
                    <div className="size-10 rounded-full border-2 border-background-dark bg-green-600 flex items-center justify-center text-[10px] font-bold text-white ring-2 ring-green-600/20" title="Capital Agent">C</div>
                    <div className="size-10 rounded-full border-2 border-background-dark bg-slate-700 flex items-center justify-center text-[10px] font-bold text-white ring-2 ring-slate-700/20"> +2</div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">6 Active Collaborators</span>
                </div>
              </div>
              <div className="flex border-b border-primary/10 gap-8">
                <span className="flex items-center gap-2 border-b-2 border-primary text-primary pb-3 font-bold text-sm cursor-pointer">
                  <span className="material-symbols-outlined text-sm">flowchart</span> Sankey Flow
                </span>
                <span className="flex items-center gap-2 text-slate-500 dark:text-slate-400 pb-3 font-medium text-sm hover:text-primary cursor-pointer">
                  <span className="material-symbols-outlined text-sm">bar_chart</span> Revenue Breakdown
                </span>
                <span className="flex items-center gap-2 text-slate-500 dark:text-slate-400 pb-3 font-medium text-sm hover:text-primary cursor-pointer">
                  <span className="material-symbols-outlined text-sm">account_balance</span> Liability Analysis
                </span>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-8 pt-0 relative">
              <div className="min-h-[500px] w-full bg-white dark:bg-primary/5 rounded-2xl border border-primary/10 p-12 relative flex items-center justify-center overflow-hidden">
                <svg className="w-full h-full max-w-5xl" preserveAspectRatio="none" viewBox="0 0 1000 500">
                  <path d="M 0 100 Q 250 100 500 150 L 500 350 Q 250 400 0 400 Z" fill="url(#grad1)" fillOpacity="0.3"></path>
                  <path d="M 500 250 Q 750 250 1000 50 L 1000 150 Q 750 350 500 350 Z" fill="url(#grad2)" fillOpacity="0.2"></path>
                  <path d="M 500 150 Q 750 150 1000 300 L 1000 450 Q 750 300 500 250 Z" fill="url(#grad3)" fillOpacity="0.3"></path>
                  <defs>
                    <linearGradient id="grad1" x1="0%" x2="100%" y1="0%" y2="0%">
                      <stop offset="0%" style={{ stopColor: '#ec5b13', stopOpacity: '1' }}></stop>
                      <stop offset="100%" style={{ stopColor: '#ec5b13', stopOpacity: '0.5' }}></stop>
                    </linearGradient>
                    <linearGradient id="grad2" x1="0%" x2="100%" y1="0%" y2="0%">
                      <stop offset="0%" style={{ stopColor: '#ef4444', stopOpacity: '1' }}></stop>
                      <stop offset="100%" style={{ stopColor: '#ef4444', stopOpacity: '0.5' }}></stop>
                    </linearGradient>
                    <linearGradient id="grad3" x1="0%" x2="100%" y1="0%" y2="0%">
                      <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: '1' }}></stop>
                      <stop offset="100%" style={{ stopColor: '#10b981', stopOpacity: '0.5' }}></stop>
                    </linearGradient>
                  </defs>
                </svg>

                <div className="absolute inset-0 p-12 pointer-events-none">
                  <div className="h-full flex flex-col justify-between items-start text-xs font-bold uppercase tracking-widest text-slate-400">
                    <div>Source: Core Revenue ($4.2M)</div>
                    <div>Source: Partnerships ($0.8M)</div>
                  </div>
                </div>
                <div className="absolute inset-0 p-12 pointer-events-none flex justify-end">
                  <div className="h-full flex flex-col justify-between items-end text-xs font-bold uppercase tracking-widest text-slate-400">
                    <div className="text-red-500">Operating Expenses ($2.1M)</div>
                    <div className="text-green-500">Net Retained Earnings ($1.9M)</div>
                  </div>
                </div>

                <div className="absolute top-1/4 left-1/4 pointer-events-auto">
                  <div className="flex flex-col items-center">
                    <div className="bg-primary text-white p-3 rounded-xl shadow-xl border border-white/20 max-w-[200px] text-xs">
                      <div className="flex items-center gap-1 mb-1 opacity-80">
                        <span className="material-symbols-outlined text-[10px]">account_balance_wallet</span>
                        <span className="font-bold">Working Capital Agent</span>
                      </div>
                      Liquidity leak detected in raw material advance payments.
                    </div>
                    <div className="h-8 w-px bg-primary"></div>
                    <div className="size-2 bg-primary rounded-full"></div>
                  </div>
                </div>

                <div className="absolute bottom-1/3 right-1/4 pointer-events-auto">
                  <div className="flex flex-col items-center">
                    <div className="size-2 bg-red-500 rounded-full"></div>
                    <div className="h-8 w-px bg-red-500"></div>
                    <div className="bg-red-500 text-white p-3 rounded-xl shadow-xl border border-white/20 max-w-[200px] text-xs">
                      <div className="flex items-center gap-1 mb-1 opacity-80">
                        <span className="material-symbols-outlined text-[10px]">warning</span>
                        <span className="font-bold">Profit Leakage Agent</span>
                      </div>
                      12% spike in un-reconciled digital distribution fees.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-primary/10 bg-white/50 dark:bg-background-dark/30">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Composite Health</span>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-black text-slate-900 dark:text-white">84/100</span>
                    <span className="text-green-500 text-xs font-bold mb-1 flex items-center">
                      <span className="material-symbols-outlined text-sm">arrow_upward</span> 4%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 dark:bg-primary/10 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-[84%]"></div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Risk Level</span>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-black text-slate-900 dark:text-white">Moderate</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 dark:bg-primary/10 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 w-[45%]"></div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Burn Efficiency</span>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-black text-slate-900 dark:text-white">1.4x</span>
                    <span className="text-red-500 text-xs font-bold mb-1 flex items-center">
                      <span className="material-symbols-outlined text-sm">arrow_downward</span> 0.2
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 dark:bg-primary/10 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[70%]"></div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Growth Runway</span>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-black text-slate-900 dark:text-white">22 mo</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 dark:bg-primary/10 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-[90%]"></div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Multi-Agent Consensus</span>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="material-symbols-outlined text-green-500 text-xl">verified</span>
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200">High Trust</span>
                  </div>
                  <span className="text-[10px] text-slate-400 italic">Validated by 4/4 agents</span>
                </div>
              </div>
            </div>
          </div>
        </main>

      </div>
    </div>
  );
}
