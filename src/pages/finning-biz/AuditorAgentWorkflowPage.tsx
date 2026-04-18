import React from 'react';
import FinningBizNav from '../../components/finning-biz/FinningBizNav';

export default function AuditorAgentWorkflowPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <FinningBizNav />
      <div className="flex-1 overflow-auto">
        
<div className="flex h-full min-h-screen flex-col">

<header className="flex items-center justify-between whitespace-nowrap border-b border-slate-200 dark:border-primary/20 bg-background-light dark:bg-background-dark px-6 py-3 sticky top-0 z-50">
<div className="flex items-center gap-8">
<div className="flex items-center gap-3 text-primary">
<div className="size-8 bg-primary rounded flex items-center justify-center text-white">
<span className="material-symbols-outlined">analytics</span>
</div>
<h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight">FinAudit AI</h2>
</div>
<nav className="hidden lg:flex items-center gap-6">
<a className="text-primary text-sm font-semibold leading-normal border-b-2 border-primary pb-1" href="#">Marketplace</a>
<a className="text-slate-600 dark:text-slate-300 text-sm font-medium leading-normal hover:text-primary transition-colors" href="#">Dashboard</a>
<a className="text-slate-600 dark:text-slate-300 text-sm font-medium leading-normal hover:text-primary transition-colors" href="#">Reports</a>
<a className="text-slate-600 dark:text-slate-300 text-sm font-medium leading-normal hover:text-primary transition-colors" href="#">Settings</a>
</nav>
</div>
<div className="flex flex-1 justify-end gap-4 items-center">
<label className="hidden md:flex flex-col min-w-40 !h-10 max-w-xs">
<div className="flex w-full flex-1 items-stretch rounded-xl h-full border border-slate-200 dark:border-primary/20 bg-white dark:bg-primary/5">
<div className="text-slate-400 dark:text-primary/60 flex items-center justify-center pl-4 rounded-l-xl">
<span className="material-symbols-outlined text-xl">search</span>
</div>
<input className="form-input flex w-full min-w-0 flex-1 rounded-xl text-slate-900 dark:text-white focus:outline-0 focus:ring-0 border-none bg-transparent h-full placeholder:text-slate-400 dark:placeholder:text-primary/40 px-4 pl-2 text-sm font-normal" placeholder="Search agents or domains..." />
</div>
</label>
<div className="flex gap-2">
<button className="flex items-center justify-center rounded-xl h-10 w-10 bg-slate-100 dark:bg-primary/10 text-slate-600 dark:text-primary hover:bg-primary/20 transition-all">
<span className="material-symbols-outlined text-xl">notifications</span>
</button>
<button className="flex items-center justify-center rounded-xl h-10 w-10 bg-slate-100 dark:bg-primary/10 text-slate-600 dark:text-primary hover:bg-primary/20 transition-all">
<span className="material-symbols-outlined text-xl">account_circle</span>
</button>
</div>
</div>
</header>
<div className="flex flex-1 overflow-hidden">
<main className="flex-1 overflow-y-auto px-6 py-8">
<div className="mb-10">
<div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6">
<div>
<h1 className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-tight">Agent Marketplace</h1>
<p className="text-slate-500 dark:text-slate-400 text-lg">Deploy specialized AI agents to optimize your financial performance.</p>
</div>
</div>
<div className="bg-gradient-to-r from-primary/10 to-transparent border border-primary/30 rounded-2xl p-6 relative overflow-hidden">
<div className="absolute top-0 right-0 p-4 opacity-10">
<span className="material-symbols-outlined text-8xl text-primary">psychology</span>
</div>
<div className="relative z-10">
<p className="text-slate-600 dark:text-slate-300 max-w-2xl mb-4">
                                Based on your Q3 balance sheet, we've identified a 14% drift in working capital. Activating the 
                                <span className="text-primary font-bold">Working Capital Diagnostic Agent</span> could unlock $240k in cash flow.
                            </p>
<button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-primary/20">
<span className="material-symbols-outlined text-lg">bolt</span>
                                Activate Recommended Agent
                            </button>
</div>
</div>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">


<div className="bg-white dark:bg-primary/5 border border-slate-200 dark:border-primary/10 rounded-2xl p-5 flex flex-col justify-between hover:border-primary/50 transition-colors group">
<div>
<div className="flex justify-between items-start mb-4">
<div className="p-2 rounded-lg bg-slate-100 dark:bg-primary/10 text-primary">
<span className="material-symbols-outlined">analytics</span>
</div>
<span className="text-[10px] font-bold px-2 py-1 rounded bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400 uppercase">Active</span>
</div>
<h3 className="font-bold text-slate-900 dark:text-white mb-2 leading-tight">Working Capital Diagnostic Agent</h3>
<p className="text-slate-500 dark:text-slate-400 text-xs mb-4">Identifies inefficiencies in receivables and payables cycles.</p>
</div>
<button className="w-full py-2 bg-slate-100 dark:bg-primary/10 text-slate-900 dark:text-white text-xs font-bold rounded-lg group-hover:bg-primary group-hover:text-white transition-all">Configure</button>
</div>

<div className="bg-white dark:bg-primary/5 border border-slate-200 dark:border-primary/10 rounded-2xl p-5 flex flex-col justify-between hover:border-primary/50 transition-colors group">
<div>
<div className="flex justify-between items-start mb-4">
<div className="p-2 rounded-lg bg-slate-100 dark:bg-primary/10 text-primary">
<span className="material-symbols-outlined">payments</span>
</div>
<span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-400 uppercase">Available</span>
</div>
<h3 className="font-bold text-slate-900 dark:text-white mb-2 leading-tight">Cash Flow Stress Test Agent</h3>
<p className="text-slate-500 dark:text-slate-400 text-xs mb-4">Simulates market volatility impacts on runway and cash reserves.</p>
</div>
<button className="w-full py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/90 transition-all">Activate</button>
</div>

<div className="bg-white dark:bg-primary/5 border border-slate-200 dark:border-primary/10 rounded-2xl p-5 flex flex-col justify-between hover:border-primary/50 transition-colors group">
<div>
<div className="flex justify-between items-start mb-4">
<div className="p-2 rounded-lg bg-slate-100 dark:bg-primary/10 text-primary">
<span className="material-symbols-outlined">account_balance</span>
</div>
<span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-400 uppercase">Available</span>
</div>
<h3 className="font-bold text-slate-900 dark:text-white mb-2 leading-tight">Loan Eligibility Agent</h3>
<p className="text-slate-500 dark:text-slate-400 text-xs mb-4">Evaluates creditworthiness against various banking standards.</p>
</div>
<button className="w-full py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/90 transition-all">Activate</button>
</div>

<div className="bg-white dark:bg-primary/5 border border-slate-200 dark:border-primary/10 rounded-2xl p-5 flex flex-col justify-between hover:border-primary/50 transition-colors group">
<div>
<div className="flex justify-between items-start mb-4">
<div className="p-2 rounded-lg bg-slate-100 dark:bg-primary/10 text-primary">
<span className="material-symbols-outlined">trending_down</span>
</div>
<span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-400 uppercase">Available</span>
</div>
<h3 className="font-bold text-slate-900 dark:text-white mb-2 leading-tight">Profit Leakage Detector Agent</h3>
<p className="text-slate-500 dark:text-slate-400 text-xs mb-4">Finds hidden costs and operational inefficiencies eating margins.</p>
</div>
<button className="w-full py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/90 transition-all">Activate</button>
</div>

<div className="bg-white dark:bg-primary/5 border border-slate-200 dark:border-primary/10 rounded-2xl p-5 flex flex-col justify-between hover:border-primary/50 transition-colors group">
<div>
<div className="flex justify-between items-start mb-4">
<div className="p-2 rounded-lg bg-slate-100 dark:bg-primary/10 text-primary">
<span className="material-symbols-outlined">precision_manufacturing</span>
</div>
<span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-400 uppercase">Available</span>
</div>
<h3 className="font-bold text-slate-900 dark:text-white mb-2 leading-tight">Capex Decision Intelligence</h3>
<p className="text-slate-500 dark:text-slate-400 text-xs mb-4">ROI analysis for large capital expenditure projects.</p>
</div>
<button className="w-full py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/90 transition-all">Activate</button>
</div>

<div className="bg-white dark:bg-primary/5 border border-slate-200 dark:border-primary/10 rounded-2xl p-5 flex flex-col justify-between hover:border-primary/50 transition-colors group">
<div>
<div className="flex justify-between items-start mb-4">
<div className="p-2 rounded-lg bg-slate-100 dark:bg-primary/10 text-primary">
<span className="material-symbols-outlined">hub</span>
</div>
<span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-400 uppercase">Available</span>
</div>
<h3 className="font-bold text-slate-900 dark:text-white mb-2 leading-tight">Scenario Modeling Agent</h3>
<p className="text-slate-500 dark:text-slate-400 text-xs mb-4">Create complex financial 'what-if' scenarios instantly.</p>
</div>
<button className="w-full py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/90 transition-all">Activate</button>
</div>

<div className="bg-white dark:bg-primary/5 border border-slate-200 dark:border-primary/10 rounded-2xl p-5 flex flex-col justify-between hover:border-primary/50 transition-colors group">
<div>
<div className="flex justify-between items-start mb-4">
<div className="p-2 rounded-lg bg-slate-100 dark:bg-primary/10 text-primary">
<span className="material-symbols-outlined">inventory_2</span>
</div>
<span className="text-[10px] font-bold px-2 py-1 rounded bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400 uppercase">Active</span>
</div>
<h3 className="font-bold text-slate-900 dark:text-white mb-2 leading-tight">Inventory Efficiency Agent</h3>
<p className="text-slate-500 dark:text-slate-400 text-xs mb-4">Balances stock levels against sales demand and liquidity.</p>
</div>
<button className="w-full py-2 bg-slate-100 dark:bg-primary/10 text-slate-900 dark:text-white text-xs font-bold rounded-lg group-hover:bg-primary group-hover:text-white transition-all">Configure</button>
</div>

<div className="bg-white dark:bg-primary/5 border border-slate-200 dark:border-primary/10 rounded-2xl p-5 flex flex-col justify-between hover:border-primary/50 transition-colors group">
<div>
<div className="flex justify-between items-start mb-4">
<div className="p-2 rounded-lg bg-slate-100 dark:bg-primary/10 text-primary">
<span className="material-symbols-outlined">health_and_safety</span>
</div>
<span className="text-[10px] font-bold px-2 py-1 rounded bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400 uppercase">Active</span>
</div>
<h3 className="font-bold text-slate-900 dark:text-white mb-2 leading-tight">Business Health Score Agent</h3>
<p className="text-slate-500 dark:text-slate-400 text-xs mb-4">Aggregates all KPIs into a single vital health metric.</p>
</div>
<button className="w-full py-2 bg-slate-100 dark:bg-primary/10 text-slate-900 dark:text-white text-xs font-bold rounded-lg group-hover:bg-primary group-hover:text-white transition-all">Configure</button>
</div>

<div className="bg-white dark:bg-primary/5 border border-slate-200 dark:border-primary/10 rounded-2xl p-5 flex flex-col justify-between hover:border-primary/50 transition-colors group">
<div>
<div className="flex justify-between items-start mb-4">
<div className="p-2 rounded-lg bg-slate-100 dark:bg-primary/10 text-primary">
<span className="material-symbols-outlined">verified_user</span>
</div>
<span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-400 uppercase">Available</span>
</div>
<h3 className="font-bold text-slate-900 dark:text-white mb-2 leading-tight">Fraud &amp; Anomaly Detection</h3>
<p className="text-slate-500 dark:text-slate-400 text-xs mb-4">Real-time monitoring for irregular transaction patterns.</p>
</div>
<button className="w-full py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/90 transition-all">Activate</button>
</div>

<div className="bg-white dark:bg-primary/5 border border-slate-200 dark:border-primary/10 rounded-2xl p-5 flex flex-col justify-between hover:border-primary/50 transition-colors group">
<div>
<div className="flex justify-between items-start mb-4">
<div className="p-2 rounded-lg bg-slate-100 dark:bg-primary/10 text-primary">
<span className="material-symbols-outlined">monetization_on</span>
</div>
<span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-400 uppercase">Available</span>
</div>
<h3 className="font-bold text-slate-900 dark:text-white mb-2 leading-tight">Valuation Snapshot Agent</h3>
<p className="text-slate-500 dark:text-slate-400 text-xs mb-4">Dynamic company valuation based on current performance.</p>
</div>
<button className="w-full py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/90 transition-all">Activate</button>
</div>

<div className="bg-white dark:bg-primary/5 border border-slate-200 dark:border-primary/10 rounded-2xl p-5 flex flex-col justify-between hover:border-primary/50 transition-colors group">
<div>
<div className="flex justify-between items-start mb-4">
<div className="p-2 rounded-lg bg-slate-100 dark:bg-primary/10 text-primary">
<span className="material-symbols-outlined">sell</span>
</div>
<span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-400 uppercase">Available</span>
</div>
<h3 className="font-bold text-slate-900 dark:text-white mb-2 leading-tight">Price Optimization Agent</h3>
<p className="text-slate-500 dark:text-slate-400 text-xs mb-4">Analyzes price elasticity to maximize gross margin.</p>
</div>
<button className="w-full py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/90 transition-all">Activate</button>
</div>

<div className="bg-white dark:bg-primary/5 border border-slate-200 dark:border-primary/10 rounded-2xl p-5 flex flex-col justify-between hover:border-primary/50 transition-colors group">
<div>
<div className="flex justify-between items-start mb-4">
<div className="p-2 rounded-lg bg-slate-100 dark:bg-primary/10 text-primary">
<span className="material-symbols-outlined">gavel</span>
</div>
<span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-400 uppercase">Available</span>
</div>
<h3 className="font-bold text-slate-900 dark:text-white mb-2 leading-tight">Compliance Risk Agent</h3>
<p className="text-slate-500 dark:text-slate-400 text-xs mb-4">Ensures reporting follows regional financial regulations.</p>
</div>
<button className="w-full py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/90 transition-all">Activate</button>
</div>

<div className="bg-white dark:bg-primary/5 border border-slate-200 dark:border-primary/10 rounded-2xl p-5 flex flex-col justify-between hover:border-primary/50 transition-colors group border-primary/50 ring-1 ring-primary/30">
<div>
<div className="flex justify-between items-start mb-4">
<div className="p-2 rounded-lg bg-primary/20 text-primary">
<span className="material-symbols-outlined filled-icon">savings</span>
</div>
<span className="text-[10px] font-bold px-2 py-1 rounded bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400 uppercase">Active</span>
</div>
<h3 className="font-bold text-slate-900 dark:text-white mb-2 leading-tight">Cash Is King Agent</h3>
<p className="text-slate-500 dark:text-slate-400 text-xs mb-4">Aggressive liquidity preservation strategies.</p>
</div>
<button className="w-full py-2 bg-primary text-white text-xs font-bold rounded-lg transition-all">Configure</button>
</div>

<div className="bg-white dark:bg-primary/5 border border-slate-200 dark:border-primary/10 rounded-2xl p-5 flex flex-col justify-between hover:border-primary/50 transition-colors group">
<div>
<div className="flex justify-between items-start mb-4">
<div className="p-2 rounded-lg bg-slate-100 dark:bg-primary/10 text-primary">
<span className="material-symbols-outlined">groups</span>
</div>
<span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-400 uppercase">Available</span>
</div>
<h3 className="font-bold text-slate-900 dark:text-white mb-2 leading-tight">Manager Impact Simulator</h3>
<p className="text-slate-500 dark:text-slate-400 text-xs mb-4">Predicts financial outcome of management style changes.</p>
</div>
<button className="w-full py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/90 transition-all">Activate</button>
</div>

<div className="bg-white dark:bg-primary/5 border border-slate-200 dark:border-primary/10 rounded-2xl p-5 flex flex-col justify-between hover:border-primary/50 transition-colors group">
<div>
<div className="flex justify-between items-start mb-4">
<div className="p-2 rounded-lg bg-slate-100 dark:bg-primary/10 text-primary">
<span className="material-symbols-outlined">rocket_launch</span>
</div>
<span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-400 uppercase">Available</span>
</div>
<h3 className="font-bold text-slate-900 dark:text-white mb-2 leading-tight">ROCE Maximizer Agent</h3>
<p className="text-slate-500 dark:text-slate-400 text-xs mb-4">Optimizing Return on Capital Employed via asset efficiency.</p>
</div>
<button className="w-full py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/90 transition-all">Activate</button>
</div>

<div className="bg-white dark:bg-primary/5 border border-slate-200 dark:border-primary/10 rounded-2xl p-5 flex flex-col justify-between hover:border-primary/50 transition-colors group">
<div>
<div className="flex justify-between items-start mb-4">
<div className="p-2 rounded-lg bg-slate-100 dark:bg-primary/10 text-primary">
<span className="material-symbols-outlined">balance</span>
</div>
<span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-400 uppercase">Available</span>
</div>
<h3 className="font-bold text-slate-900 dark:text-white mb-2 leading-tight">Break-even Intelligence</h3>
<p className="text-slate-500 dark:text-slate-400 text-xs mb-4">Dynamic calculation of break-even points across products.</p>
</div>
<button className="w-full py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/90 transition-all">Activate</button>
</div>

<div className="bg-white dark:bg-primary/5 border border-slate-200 dark:border-primary/10 rounded-2xl p-5 flex flex-col justify-between hover:border-primary/50 transition-colors group">
<div>
<div className="flex justify-between items-start mb-4">
<div className="p-2 rounded-lg bg-slate-100 dark:bg-primary/10 text-primary">
<span className="material-symbols-outlined">query_stats</span>
</div>
<span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-400 uppercase">Available</span>
</div>
<h3 className="font-bold text-slate-900 dark:text-white mb-2 leading-tight">Cost Behavior Analyzer</h3>
<p className="text-slate-500 dark:text-slate-400 text-xs mb-4">Classifies costs into fixed/variable for better scaling.</p>
</div>
<button className="w-full py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/90 transition-all">Activate</button>
</div>

<div className="bg-white dark:bg-primary/5 border border-slate-200 dark:border-primary/10 rounded-2xl p-5 flex flex-col justify-between hover:border-primary/50 transition-colors group">
<div>
<div className="flex justify-between items-start mb-4">
<div className="p-2 rounded-lg bg-slate-100 dark:bg-primary/10 text-primary">
<span className="material-symbols-outlined">psychology_alt</span>
</div>
<span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-400 uppercase">Available</span>
</div>
<h3 className="font-bold text-slate-900 dark:text-white mb-2 leading-tight">Working Capital Culture Agent</h3>
<p className="text-slate-500 dark:text-slate-400 text-xs mb-4">Tools to instill cash-flow awareness across teams.</p>
</div>
<button className="w-full py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/90 transition-all">Activate</button>
</div>

<div className="bg-white dark:bg-primary/5 border border-slate-200 dark:border-primary/10 rounded-2xl p-5 flex flex-col justify-between hover:border-primary/50 transition-colors group">
<div>
<div className="flex justify-between items-start mb-4">
<div className="p-2 rounded-lg bg-slate-100 dark:bg-primary/10 text-primary">
<span className="material-symbols-outlined">percent</span>
</div>
<span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-400 uppercase">Available</span>
</div>
<h3 className="font-bold text-slate-900 dark:text-white mb-2 leading-tight">Sales Discount Impact Agent</h3>
<p className="text-slate-500 dark:text-slate-400 text-xs mb-4">Calculates how discounts affect the bottom line long-term.</p>
</div>
<button className="w-full py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/90 transition-all">Activate</button>
</div>

<div className="bg-white dark:bg-primary/5 border border-slate-200 dark:border-primary/10 rounded-2xl p-5 flex flex-col justify-between hover:border-primary/50 transition-colors group">
<div>
<div className="flex justify-between items-start mb-4">
<div className="p-2 rounded-lg bg-slate-100 dark:bg-primary/10 text-primary">
<span className="material-symbols-outlined">emergency_home</span>
</div>
<span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-400 uppercase">Available</span>
</div>
<h3 className="font-bold text-slate-900 dark:text-white mb-2 leading-tight">Capital Structure Risk Agent</h3>
<p className="text-slate-500 dark:text-slate-400 text-xs mb-4">Monitoring debt-to-equity ratios and interest coverage.</p>
</div>
<button className="w-full py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/90 transition-all">Activate</button>
</div>

<div className="bg-white dark:bg-primary/5 border border-slate-200 dark:border-primary/10 rounded-2xl p-5 flex flex-col justify-between hover:border-primary/50 transition-colors group">
<div>
<div className="flex justify-between items-start mb-4">
<div className="p-2 rounded-lg bg-slate-100 dark:bg-primary/10 text-primary">
<span className="material-symbols-outlined">school</span>
</div>
<span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-400 uppercase">Available</span>
</div>
<h3 className="font-bold text-slate-900 dark:text-white mb-2 leading-tight">Employee Literacy Agent</h3>
<p className="text-slate-500 dark:text-slate-400 text-xs mb-4">Training modules for non-finance managers on profit impact.</p>
</div>
<button className="w-full py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/90 transition-all">Activate</button>
</div>

<div className="bg-white dark:bg-primary/5 border border-slate-200 dark:border-primary/10 rounded-2xl p-5 flex flex-col justify-between hover:border-primary/50 transition-colors group">
<div>
<div className="flex justify-between items-start mb-4">
<div className="p-2 rounded-lg bg-slate-100 dark:bg-primary/10 text-primary">
<span className="material-symbols-outlined">fork_right</span>
</div>
<span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-400 uppercase">Available</span>
</div>
<h3 className="font-bold text-slate-900 dark:text-white mb-2 leading-tight">Decision Consequence Agent</h3>
<p className="text-slate-500 dark:text-slate-400 text-xs mb-4">Maps 2nd and 3rd order effects of strategic shifts.</p>
</div>
<button className="w-full py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/90 transition-all">Activate</button>
</div>
</div>
</main>

<aside className="w-80 border-l border-slate-200 dark:border-primary/20 bg-white dark:bg-primary/5 flex flex-col hidden xl:flex">
<div className="p-6 border-b border-slate-200 dark:border-primary/20">
<h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Active Agents</h2>
<p className="text-sm text-slate-500 dark:text-slate-400">Real-time optimization engine</p>
</div>
<div className="p-6">
<div className="bg-background-light dark:bg-background-dark rounded-2xl p-4 mb-6 text-center border border-slate-200 dark:border-primary/30">
<span className="text-xs uppercase font-bold text-slate-500 dark:text-primary/70 tracking-wider">Health Score</span>
<div className="text-4xl font-black text-slate-900 dark:text-white mt-1">84<span className="text-primary text-xl">.2</span></div>
<div className="flex items-center justify-center gap-1 text-green-500 text-sm mt-1">
<span className="material-symbols-outlined text-sm">trending_up</span>
<span>+4.2 pts this week</span>
</div>
</div>
<div className="space-y-4">
<div className="flex items-center gap-3">
<div className="size-2 rounded-full bg-green-500 animate-pulse"></div>
<div className="flex-1">
<p className="text-xs font-bold text-slate-900 dark:text-white">Business Health Score Agent</p>
<div className="w-full bg-slate-200 dark:bg-primary/10 h-1 mt-1 rounded-full overflow-hidden">
<div className="bg-primary h-full w-[85%]"></div>
</div>
</div>
<div className="text-[10px] text-primary font-bold">+12%</div>
</div>
<div className="flex items-center gap-3">
<div className="size-2 rounded-full bg-green-500"></div>
<div className="flex-1">
<p className="text-xs font-bold text-slate-900 dark:text-white">Inventory Efficiency</p>
<div className="w-full bg-slate-200 dark:bg-primary/10 h-1 mt-1 rounded-full overflow-hidden">
<div className="bg-primary h-full w-[62%]"></div>
</div>
</div>
<div className="text-[10px] text-primary font-bold">+$45k</div>
</div>
<div className="flex items-center gap-3">
<div className="size-2 rounded-full bg-green-500"></div>
<div className="flex-1">
<p className="text-xs font-bold text-slate-900 dark:text-white">Cash Is King</p>
<div className="w-full bg-slate-200 dark:bg-primary/10 h-1 mt-1 rounded-full overflow-hidden">
<div className="bg-primary h-full w-[41%]"></div>
</div>
</div>
<div className="text-[10px] text-primary font-bold">+2.1x</div>
</div>
<div className="flex items-center gap-3">
<div className="size-2 rounded-full bg-green-500"></div>
<div className="flex-1">
<p className="text-xs font-bold text-slate-900 dark:text-white">Working Capital Diag.</p>
<div className="w-full bg-slate-200 dark:bg-primary/10 h-1 mt-1 rounded-full overflow-hidden">
<div className="bg-primary h-full w-[94%]"></div>
</div>
</div>
<div className="text-[10px] text-primary font-bold">-2.1d</div>
</div>
</div>
</div>
<div className="mt-auto p-6">
<div className="bg-primary text-white rounded-xl p-4">
<p className="text-xs font-bold opacity-80 uppercase mb-2">System Impact</p>
<p className="text-sm font-medium">All active agents are operating within 98% efficiency thresholds.</p>
<button className="w-full mt-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-bold transition-all">View Audit Trail</button>
</div>
</div>
</aside>
</div>
</div>

      </div>
    </div>
  );
}
