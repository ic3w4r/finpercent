import React from 'react';
import FinningBizNav from '../../components/finning-biz/FinningBizNav';

export default function AgentAuthorizationHierarchyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <FinningBizNav />
      <div className="flex-1 overflow-auto">
        
        <main className="p-6 max-w-[1440px] mx-auto w-full flex flex-col gap-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-4">
            <div>
              <p className="text-primary font-bold uppercase tracking-widest text-xs mb-1">Authorization Engine</p>
              <h1 className="text-4xl font-black tracking-tight dark:text-white">Agent Authorization Hierarchy</h1>
              <p className="text-slate-500 dark:text-slate-400 mt-2">Managing autonomous financial decisions across multi-tier validation layers.</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-primary/20 hover:bg-primary/5 transition-all font-semibold text-sm">
                <span className="material-symbols-outlined text-lg">history</span> Audit Logs
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-background-dark font-bold text-sm hover:brightness-110 transition-all">
                <span className="material-symbols-outlined text-lg">add</span> New Request
              </button>
            </div>
          </div>

          <section className="w-full">
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold border border-primary/30 tracking-tighter uppercase">Tier 3</span>
              <h2 className="text-2xl font-bold dark:text-white flex items-center gap-2">
                Super Agent (Orchestrator)
                <span className="material-symbols-outlined text-primary">verified</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white dark:bg-primary/5 border border-primary/10 rounded-xl p-6 node-active">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-lg">Final Authorization Queue</h3>
                  <div className="flex gap-2">
                    <span className="flex items-center gap-1 text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                      <span className="size-2 bg-yellow-500 rounded-full"></span> 12 Pending
                    </span>
                    <span className="flex items-center gap-1 text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                      <span className="size-2 bg-primary rounded-full"></span> 42 Authorized
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-primary/10 group hover:border-primary/40 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/20 rounded-lg text-primary">
                        <span className="material-symbols-outlined">payments</span>
                      </div>
                      <div>
                        <p className="font-bold">CapEx Approval: Q4 Data Center Expansion</p>
                        <p className="text-xs text-slate-500">Source: Investment Agent • $1,250,000.00</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-500 hover:text-red-500 transition-colors uppercase">Reject</button>
                      <button className="px-4 py-2 bg-primary/20 text-primary hover:bg-primary text-xs font-bold rounded-lg hover:text-background-dark transition-all uppercase tracking-wide">Authorize</button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-primary/10 group hover:border-primary/40 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-500/20 rounded-lg text-blue-500">
                        <span className="material-symbols-outlined">inventory_2</span>
                      </div>
                      <div>
                        <p className="font-bold">Supplier Settlement: TechCore Logistics</p>
                        <p className="text-xs text-slate-500">Source: Working Capital Agent • $84,200.00</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-500 hover:text-red-500 transition-colors uppercase">Reject</button>
                      <button className="px-4 py-2 bg-primary/20 text-primary hover:bg-primary text-xs font-bold rounded-lg hover:text-background-dark transition-all uppercase tracking-wide">Authorize</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary text-background-dark rounded-xl p-6 flex flex-col justify-between">
                <div>
                  <h3 className="font-black text-xl mb-4">Orchestrator Health</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1 uppercase tracking-tighter">
                        <span>Decision Autonomy</span>
                        <span>88%</span>
                      </div>
                      <div className="h-2 w-full bg-background-dark/20 rounded-full overflow-hidden">
                        <div className="h-full bg-background-dark w-[88%]"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1 uppercase tracking-tighter">
                        <span>Validation Accuracy</span>
                        <span>99.9%</span>
                      </div>
                      <div className="h-2 w-full bg-background-dark/20 rounded-full overflow-hidden">
                        <div className="h-full bg-background-dark w-[99%]"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-6 border-t border-background-dark/10">
                  <p className="text-xs font-medium leading-tight opacity-80">Autonomous decision threshold is currently set to $50k. Human review required for high-risk assets.</p>
                </div>
              </div>
            </div>
          </section>

          <div className="flex flex-col items-center py-4">
            <div className="w-px h-12 bg-gradient-to-b from-primary/40 to-transparent"></div>
          </div>

          <section className="w-full">
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold border border-primary/30 tracking-tighter uppercase">Tier 2</span>
              <h2 className="text-2xl font-bold dark:text-white flex items-center gap-2">
                Verification Layer (Supervisors)
                <span className="material-symbols-outlined text-slate-400">shield_with_heart</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-primary/10 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="size-8 rounded-full bg-yellow-500/20 text-yellow-500 flex items-center justify-center">
                    <span className="material-symbols-outlined text-lg">pending_actions</span>
                  </div>
                  <h4 className="font-bold">Pending Review</h4>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-sm mb-2 border-l-4 border-yellow-500">
                  <p className="font-semibold">Request #AR-992</p>
                  <p className="text-slate-500 text-xs mt-1">Accounts Receivable variance found.</p>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-sm border-l-4 border-yellow-500 opacity-60">
                  <p className="font-semibold">Request #OP-114</p>
                  <p className="text-slate-500 text-xs mt-1">Travel expense limit threshold.</p>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-primary/10 rounded-xl p-5 ring-2 ring-primary/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="size-8 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-lg">check_circle</span>
                  </div>
                  <h4 className="font-bold">Validated</h4>
                </div>
                <div className="p-3 bg-primary/5 rounded-lg text-sm mb-2 border border-primary/20 flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Request #TAX-88</p>
                    <p className="text-slate-500 text-xs">Moving to Super Agent...</p>
                  </div>
                  <span className="material-symbols-outlined text-primary text-sm">trending_up</span>
                </div>
                <div className="p-3 bg-primary/5 rounded-lg text-sm mb-2 border border-primary/20 flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Request #INV-02</p>
                    <p className="text-slate-500 text-xs">Staged for Final Sign-off</p>
                  </div>
                  <span className="material-symbols-outlined text-primary text-sm">trending_up</span>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-primary/10 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="size-8 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center">
                    <span className="material-symbols-outlined text-lg">flag</span>
                  </div>
                  <h4 className="font-bold">Flagged</h4>
                </div>
                <div className="p-3 bg-red-500/5 rounded-lg text-sm border border-red-500/20">
                  <p className="font-semibold text-red-600 dark:text-red-400">Suspicious Pattern #AN-09</p>
                  <p className="text-slate-500 text-xs mt-1">Detected duplicate vendor entry in Operating Expenses.</p>
                  <button className="mt-2 text-xs font-bold underline">Review Data Evidence</button>
                </div>
              </div>
            </div>
          </section>

          <div className="relative h-16 w-full flex justify-center">
            <div className="absolute w-full h-px top-1/2 -translate-y-1/2 bg-primary/10"></div>
            <div className="absolute left-1/4 h-full w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent"></div>
            <div className="absolute right-1/4 h-full w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent"></div>
          </div>

          <section className="w-full">
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold border border-primary/30 tracking-tighter uppercase">Tier 1</span>
              <h2 className="text-2xl font-bold dark:text-white flex items-center gap-2">
                Specialized Agents (Executors)
                <span className="material-symbols-outlined text-slate-400">memory</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-primary/5 border border-primary/10 rounded-xl overflow-hidden hover:scale-[1.02] transition-transform">
                <div className="p-5 border-b border-primary/10 flex items-center gap-3">
                  <div className="size-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined">account_balance_wallet</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm">Working Capital Agent</p>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Status: Processing</p>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Target Asset</span>
                    <span className="text-sm font-semibold">Accounts Receivable</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-2/3"></div>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-bold">
                    <span className="text-primary">SCANNING LEDGER</span>
                    <span className="text-slate-500">67% Complete</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-primary/5 border border-primary/10 rounded-xl overflow-hidden hover:scale-[1.02] transition-transform">
                <div className="p-5 border-b border-primary/10 flex items-center gap-3">
                  <div className="size-10 bg-red-500/10 text-red-500 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined">emergency</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm">Profit Leakage Agent</p>
                    <p className="text-[10px] uppercase font-bold text-red-500 tracking-wider">Status: Alert</p>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Target Asset</span>
                    <span className="text-sm font-semibold">Operating Expenses</span>
                  </div>
                  <div className="flex gap-1 py-1">
                    <div className="h-1 flex-1 bg-red-500 rounded-full"></div>
                    <div className="h-1 flex-1 bg-red-500 rounded-full"></div>
                    <div className="h-1 flex-1 bg-red-500 rounded-full"></div>
                    <div className="h-1 flex-1 bg-slate-800 rounded-full"></div>
                    <div className="h-1 flex-1 bg-slate-800 rounded-full"></div>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-bold">
                    <span className="text-red-500">ANOMALY DETECTED</span>
                    <button className="text-primary hover:underline">REPAIR</button>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-primary/5 border border-primary/10 rounded-xl overflow-hidden hover:scale-[1.02] transition-transform opacity-80">
                <div className="p-5 border-b border-primary/10 flex items-center gap-3">
                  <div className="size-10 bg-blue-500/10 text-blue-500 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined">description</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm">Tax Compliance Agent</p>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Status: Idle</p>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Target Asset</span>
                    <span className="text-sm font-semibold">Deferred Tax Assets</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full"></div>
                  <div className="flex justify-between items-center text-[10px] font-bold">
                    <span className="text-slate-400">AWAITING TRIGGER</span>
                    <button className="text-primary hover:underline">RUN NOW</button>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-primary/5 border border-primary/10 rounded-xl overflow-hidden hover:scale-[1.02] transition-transform">
                <div className="p-5 border-b border-primary/10 flex items-center gap-3">
                  <div className="size-10 bg-purple-500/10 text-purple-500 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined">monitoring</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm">Forecasting Agent</p>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Status: Computing</p>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Target Asset</span>
                    <span className="text-sm font-semibold">Cash Equivalents</span>
                  </div>
                  <div className="flex gap-1 h-8 items-end">
                    <div className="w-2 bg-primary/20 h-1/2 rounded-t-sm"></div>
                    <div className="w-2 bg-primary/40 h-2/3 rounded-t-sm"></div>
                    <div className="w-2 bg-primary/60 h-3/4 rounded-t-sm"></div>
                    <div className="w-2 bg-primary h-full rounded-t-sm"></div>
                    <div className="w-2 bg-primary/80 h-4/5 rounded-t-sm"></div>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-bold">
                    <span className="text-purple-400">PROJECTIONS SYNCING</span>
                    <span className="text-slate-500">92%</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <footer className="mt-8 bg-white dark:bg-background-dark border border-slate-200 dark:border-primary/5 rounded-2xl p-6 flex flex-wrap gap-8 justify-center">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Current Scope:</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
              <span className="size-2 rounded-full bg-primary"></span> Accounts Receivable
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
              <span className="size-2 rounded-full bg-primary"></span> Operating Expenses
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
              <span className="size-2 rounded-full bg-slate-500"></span> Inventory
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
              <span className="size-2 rounded-full bg-slate-500"></span> Fixed Assets
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
              <span className="size-2 rounded-full bg-slate-500"></span> Long-term Debt
            </div>
          </footer>
        </main>

      </div>
    </div>
  );
}
