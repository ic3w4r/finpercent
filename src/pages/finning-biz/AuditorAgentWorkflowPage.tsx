import React from 'react';
import FinningBizNav from '../../components/finning-biz/FinningBizNav';

export default function AuditorAgentWorkflowPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <FinningBizNav />
      <div className="flex-1 overflow-auto">
        

        <main className="flex-1 overflow-y-auto h-[calc(100vh-64px)] p-6 lg:px-10">
          <nav className="flex items-center gap-2 text-sm font-medium mb-6">
            <span className="text-slate-500 hover:text-primary transition-colors cursor-pointer">Dashboard</span>
            <span className="material-symbols-outlined text-slate-400 text-sm">chevron_right</span>
            <span className="text-slate-900 dark:text-slate-100">Auditor Agent Workflow</span>
          </nav>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Auditor Agent Workflow</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="flex size-2 rounded-full bg-green-500"></span>
                <p className="text-slate-600 dark:text-primary font-medium">Active - Scanning Q3 Expenses</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-primary/20 text-slate-700 dark:text-white font-bold rounded-xl hover:bg-primary/30 transition-all">
                <span className="material-symbols-outlined">pause</span>
                Pause Agent
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:brightness-110 transition-all">
                <span className="material-symbols-outlined">settings_suggest</span>
                Optimize
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white dark:bg-primary/5 border border-slate-200 dark:border-primary/20 p-5 rounded-xl">
              <p className="text-slate-500 dark:text-primary/60 text-sm font-semibold mb-1 uppercase tracking-tighter">Accuracy</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-900 dark:text-white">99.8%</span>
                <span className="text-green-500 text-sm font-medium">+0.2%</span>
              </div>
            </div>
            <div className="bg-white dark:bg-primary/5 border border-slate-200 dark:border-primary/20 p-5 rounded-xl">
              <p className="text-slate-500 dark:text-primary/60 text-sm font-semibold mb-1 uppercase tracking-tighter">Speed</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-900 dark:text-white">2.4k</span>
                <span className="text-slate-400 dark:text-slate-400 text-xs">docs/min</span>
                <span className="text-green-500 text-sm font-medium">+15%</span>
              </div>
            </div>
            <div className="bg-white dark:bg-primary/5 border border-slate-200 dark:border-primary/20 p-5 rounded-xl">
              <p className="text-slate-500 dark:text-primary/60 text-sm font-semibold mb-1 uppercase tracking-tighter">Total Scanned</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-900 dark:text-white">142,890</span>
              </div>
            </div>
            <div className="bg-white dark:bg-primary/5 border border-slate-200 dark:border-primary/20 p-5 rounded-xl">
              <p className="text-slate-500 dark:text-primary/60 text-sm font-semibold mb-1 uppercase tracking-tighter">Flags Raised</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-900 dark:text-white">12</span>
                <span className="text-primary text-sm font-medium">Critical</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-1 bg-white dark:bg-primary/5 border border-slate-200 dark:border-primary/20 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">database</span>
                Data Flow
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-primary/10 border border-slate-100 dark:border-primary/5">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">account_tree</span>
                    <div>
                      <p className="text-sm font-bold">Balance Sheet</p>
                      <p className="text-xs text-slate-500">Live connection active</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-green-500 animate-pulse">check_circle</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-primary/10 border border-slate-100 dark:border-primary/5">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">upload_file</span>
                    <div>
                      <p className="text-sm font-bold">Unforeseen Uploads</p>
                      <p className="text-xs text-slate-500">Scanning 4 new files</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-primary animate-spin">sync</span>
                </div>
              </div>
              <div className="mt-6 p-4 rounded-xl border-2 border-dashed border-slate-200 dark:border-primary/20 flex flex-col items-center justify-center text-center">
                <span className="material-symbols-outlined text-slate-400 mb-2">add_circle</span>
                <p className="text-xs font-medium text-slate-500">Connect New Source</p>
              </div>
            </div>

            <div className="lg:col-span-2 bg-white dark:bg-primary/5 border border-slate-200 dark:border-primary/20 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">account_tree</span>
                Current Pipeline
              </h3>
              <div className="relative flex items-center justify-between w-full">
                <div className="absolute h-1 bg-slate-200 dark:bg-primary/20 w-full top-5 z-0"></div>
                <div className="absolute h-1 bg-primary w-[66%] top-5 z-0"></div>

                <div className="relative z-10 flex flex-col items-center gap-2 w-1/4">
                  <div className="size-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
                    <span className="material-symbols-outlined">done</span>
                  </div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Data Ingestion</p>
                </div>

                <div className="relative z-10 flex flex-col items-center gap-2 w-1/4">
                  <div className="size-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
                    <span className="material-symbols-outlined">done</span>
                  </div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Schema Mapping</p>
                </div>

                <div className="relative z-10 flex flex-col items-center gap-2 w-1/4">
                  <div className="size-10 rounded-full bg-background-light dark:bg-background-dark border-4 border-primary text-primary flex items-center justify-center animate-pulse">
                    <span className="material-symbols-outlined">search_check</span>
                  </div>
                  <p className="text-xs font-bold text-primary">Anomaly Detection</p>
                </div>

                <div className="relative z-10 flex flex-col items-center gap-2 w-1/4">
                  <div className="size-10 rounded-full bg-slate-200 dark:bg-primary/20 text-slate-400 dark:text-primary/40 flex items-center justify-center">
                    <span className="material-symbols-outlined">assessment</span>
                  </div>
                  <p className="text-xs font-bold text-slate-400 dark:text-primary/40">Report Generation</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-primary/5 border border-slate-200 dark:border-primary/20 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-slate-200 dark:border-primary/10 flex justify-between items-center">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">warning</span>
                  Items Requiring Review
                </h3>
                <span className="px-2 py-1 rounded bg-primary/10 text-primary text-[10px] font-black uppercase">High Priority</span>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-primary/5 hover:bg-slate-100 dark:hover:bg-primary/10 transition-colors border border-slate-100 dark:border-primary/10">
                  <div className="size-10 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined">error</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="text-sm font-bold">Double-Entry Detected</p>
                      <span className="text-sm font-bold">$12,450.00</span>
                    </div>
                    <p className="text-xs text-slate-500">Vendor X Payments - Duplicate ID #VN892</p>
                  </div>
                  <button className="text-primary hover:bg-primary hover:text-white rounded-lg p-1 transition-all">
                    <span className="material-symbols-outlined">keyboard_arrow_right</span>
                  </button>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-primary/5 hover:bg-slate-100 dark:hover:bg-primary/10 transition-colors border border-slate-100 dark:border-primary/10">
                  <div className="size-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined">difference</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="text-sm font-bold">Balance Mismatch</p>
                      <span className="text-sm font-bold">$402.15</span>
                    </div>
                    <p className="text-xs text-slate-500">Entry #402 vs Invoice #88 Reconciliation</p>
                  </div>
                  <button className="text-primary hover:bg-primary hover:text-white rounded-lg p-1 transition-all">
                    <span className="material-symbols-outlined">keyboard_arrow_right</span>
                  </button>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-primary/5 hover:bg-slate-100 dark:hover:bg-primary/10 transition-colors border border-slate-100 dark:border-primary/10">
                  <div className="size-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined">policy</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="text-sm font-bold">Policy Exception</p>
                      <span className="text-sm font-bold">$1,200.00</span>
                    </div>
                    <p className="text-xs text-slate-500">Travel Expense - Missing Approval Chain</p>
                  </div>
                  <button className="text-primary hover:bg-primary hover:text-white rounded-lg p-1 transition-all">
                    <span className="material-symbols-outlined">keyboard_arrow_right</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 dark:bg-black rounded-xl border border-slate-800 dark:border-primary/30 flex flex-col terminal-glow">
              <div className="px-4 py-3 bg-slate-800 dark:bg-primary/10 border-b border-slate-700 dark:border-primary/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-green-500 text-sm">terminal</span>
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Live Activity Log</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="size-2.5 rounded-full bg-slate-600"></div>
                  <div className="size-2.5 rounded-full bg-slate-600"></div>
                  <div className="size-2.5 rounded-full bg-slate-600"></div>
                </div>
              </div>
              <div className="p-5 font-mono text-xs overflow-y-auto max-h-[400px] scrollbar-hide space-y-2">
                <div className="flex gap-3">
                  <span className="text-slate-500">[14:22:01]</span>
                  <span className="text-primary">AUDIT_CORE:</span>
                  <span className="text-slate-300">Flagging potential double-entry in Vendor X payments</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-slate-500">[14:21:58]</span>
                  <span className="text-primary">CROSS_REF:</span>
                  <span className="text-slate-300">Cross-referencing Balance Sheet entry #402 with Invoice #88</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-slate-500">[14:21:55]</span>
                  <span className="text-green-500">VALIDATE:</span>
                  <span className="text-slate-300">Entity "Cloud Infrastructure" verified via TaxID lookup</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-slate-500">[14:21:50]</span>
                  <span className="text-blue-400">INPUT_PROC:</span>
                  <span className="text-slate-300">New document batch detected in 'Unforeseen Uploads'</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-slate-500">[14:21:44]</span>
                  <span className="text-primary">AUDIT_CORE:</span>
                  <span className="text-slate-300">Scanning ledger segments 880-910 for continuity errors</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-slate-500">[14:21:40]</span>
                  <span className="text-slate-500">SYSTEM:</span>
                  <span className="text-slate-400 italic">Memory allocation optimized for high-volume doc processing</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-slate-500">[14:21:35]</span>
                  <span className="text-green-500">VALIDATE:</span>
                  <span className="text-slate-300">Reconciliation complete for Q2 Close documents</span>
                </div>
                <div className="flex gap-3 animate-pulse">
                  <span className="text-slate-400">_</span>
                </div>
              </div>
            </div>
          </div>
        </main>

      </div>
    </div>
  );
}
