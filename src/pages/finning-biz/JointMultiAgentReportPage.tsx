import React from 'react';
import FinningBizNav from '../../components/finning-biz/FinningBizNav';

export default function JointMultiAgentReportPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <FinningBizNav />
      <div className="flex-1 overflow-auto">
<main className="flex-1 bg-background-light dark:bg-[#0f160b] relative overflow-hidden flex flex-col">
<div className="p-8 pb-0">
<div className="flex justify-between items-start">
<div>
<h1 className="text-3xl font-black tracking-tight">Joint Agent Flow <span className="text-primary text-sm font-medium bg-primary/10 px-2 py-1 rounded ml-2">v2.4 Active</span></h1>
<p className="opacity-60 mt-1">Financial intelligence orchestration for the Calendar Fiscal Year 2024</p>
</div>
<div className="flex gap-3">
<button className="px-4 py-2 rounded-xl border border-primary/20 hover:bg-primary/5 transition-colors flex items-center gap-2">
<span className="material-symbols-outlined text-sm">download</span> Export
                        </button>
<button className="px-4 py-2 rounded-xl bg-primary/20 text-primary font-bold flex items-center gap-2 border border-primary/30">
<span className="material-symbols-outlined text-sm">refresh</span> Re-Sync
                        </button>
</div>
</div>

<div className="grid grid-cols-4 gap-4 mt-8">
<div className="bg-white dark:bg-background-dark p-4 rounded-xl border border-primary/10 shadow-sm">
<div className="flex justify-between items-start">
<span className="text-xs opacity-60">Global Assets</span>
<span className="text-primary material-symbols-outlined">trending_up</span>
</div>
<p className="text-2xl font-black mt-1">$4.2M</p>
<p className="text-xs text-primary font-bold">+5.2% vs last pulse</p>
</div>
<div className="bg-white dark:bg-background-dark p-4 rounded-xl border border-primary/10 shadow-sm">
<div className="flex justify-between items-start">
<span className="text-xs opacity-60">Active Agents</span>
<span className="text-primary material-symbols-outlined">hub</span>
</div>
<p className="text-2xl font-black mt-1">12</p>
<p className="text-xs opacity-40 font-bold">Stable flow</p>
</div>
<div className="bg-white dark:bg-background-dark p-4 rounded-xl border border-primary/10 shadow-sm">
<div className="flex justify-between items-start">
<span className="text-xs opacity-60">Anomalies Detected</span>
<span className="text-red-500 material-symbols-outlined">warning</span>
</div>
<p className="text-2xl font-black mt-1">0</p>
<p className="text-xs text-primary font-bold">All clear</p>
</div>
<div className="bg-white dark:bg-background-dark p-4 rounded-xl border border-primary/10 shadow-sm">
<div className="flex justify-between items-start">
<span className="text-xs opacity-60">System Latency</span>
<span className="text-primary material-symbols-outlined">bolt</span>
</div>
<p className="text-2xl font-black mt-1">14ms</p>
<p className="text-xs opacity-40 font-bold">Real-time active</p>
</div>
</div>
</div>

<div className="flex-1 relative p-8 overflow-auto">

<svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" style={{zIndex: '0'}}>

<path d="M50% 120 L30% 280" fill="none" stroke="#64d61a" strokeWidth="2"></path>
<path d="M50% 120 L50% 280" fill="none" stroke="#64d61a" strokeWidth="2"></path>
<path d="M50% 120 L70% 280" fill="none" stroke="#64d61a" strokeWidth="2"></path>

<path d="M30% 360 L20% 520" fill="none" stroke="#64d61a" strokeDasharray="8 4" strokeWidth="2"></path>
<path d="M30% 360 L40% 520" fill="none" stroke="#64d61a" strokeWidth="2"></path>
<path d="M50% 360 L50% 520" fill="none" stroke="#64d61a" strokeWidth="2"></path>
<path d="M70% 360 L60% 520" fill="none" stroke="#64d61a" strokeWidth="2"></path>
<path d="M70% 360 L80% 520" fill="none" stroke="#64d61a" strokeDasharray="8 4" strokeWidth="2"></path>
</svg>
<div className="relative z-10 flex flex-col items-center gap-24 py-10">

<div className="w-64 bg-white dark:bg-background-dark border-4 border-primary p-6 rounded-2xl shadow-2xl flex flex-col items-center">
<div className="size-12 bg-primary rounded-full flex items-center justify-center text-background-dark mb-3">
<span className="material-symbols-outlined font-bold">account_balance</span>
</div>
<h3 className="font-bold text-lg">Balance Sheet</h3>
<p className="text-xs opacity-50 uppercase tracking-tighter">Data Origin Point</p>
<div className="mt-4 px-3 py-1 bg-primary/10 rounded-full flex items-center gap-2">
<span className="block size-2 bg-primary rounded-full animate-pulse"></span>
<span className="text-[10px] font-bold">STREAMING DATA</span>
</div>
</div>

<div className="flex justify-center gap-20 w-full">

<div className="w-56 bg-white dark:bg-background-dark border border-primary/30 p-5 rounded-2xl shadow-xl hover:scale-105 transition-transform group">
<div className="flex justify-between items-start mb-4">
<div className="size-10 bg-primary/20 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background-dark transition-colors">
<span className="material-symbols-outlined">policy</span>
</div>
<span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full font-bold">AUDITOR</span>
</div>
<h4 className="font-bold">Fiscal Auditor Agent</h4>
<p className="text-[10px] opacity-60 mt-2">Checking compliance across 14 fiscal periods.</p>
<div className="mt-4 flex flex-col gap-1">
<div className="flex justify-between text-[10px] mb-1">
<span>Scanning...</span>
<span className="text-primary">82%</span>
</div>
<div className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
<div className="h-full bg-primary w-[82%] animate-pulse"></div>
</div>
</div>
</div>

<div className="w-56 bg-white dark:bg-background-dark border-2 border-primary p-5 rounded-2xl shadow-xl hover:scale-105 transition-transform group">
<div className="flex justify-between items-start mb-4">
<div className="size-10 bg-primary rounded-lg flex items-center justify-center text-background-dark">
<span className="material-symbols-outlined">monitoring</span>
</div>
<span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full font-bold">LEAKAGE</span>
</div>
<h4 className="font-bold">Profit Leakage Bot</h4>
<p className="text-[10px] opacity-60 mt-2">Analyzing expense anomalies and redundant spend.</p>
<div className="mt-4 flex flex-col gap-1">
<div className="flex justify-between text-[10px] mb-1 font-bold text-primary">
<span>Potential Found</span>
<span>$12,402</span>
</div>
<div className="w-full h-1 bg-primary/20 rounded-full overflow-hidden">
<div className="h-full bg-primary w-full animate-pulse"></div>
</div>
</div>
</div>

<div className="w-56 bg-white dark:bg-background-dark border border-primary/30 p-5 rounded-2xl shadow-xl hover:scale-105 transition-transform group">
<div className="flex justify-between items-start mb-4">
<div className="size-10 bg-primary/20 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background-dark transition-colors">
<span className="material-symbols-outlined">payments</span>
</div>
<span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full font-bold">CAPITAL</span>
</div>
<h4 className="font-bold">Working Capital</h4>
<p className="text-[10px] opacity-60 mt-2">Optimizing liquidity flow for upcoming quarter.</p>
<div className="mt-4 flex flex-col gap-1">
<div className="flex justify-between text-[10px] mb-1">
<span>Stability Index</span>
<span className="text-primary">High</span>
</div>
<div className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
<div className="h-full bg-primary w-[94%]"></div>
</div>
</div>
</div>
</div>

<div className="grid grid-cols-5 gap-6 w-full max-w-6xl">
<div className="flex flex-col items-center text-center">
<div className="size-12 rounded-full bg-slate-800 flex items-center justify-center mb-3">
<span className="material-symbols-outlined text-primary">lightbulb</span>
</div>
<p className="text-[10px] font-bold uppercase">Quarterly Pivot</p>
</div>
<div className="flex flex-col items-center text-center">
<div className="size-12 rounded-full border border-primary/30 flex items-center justify-center mb-3">
<span className="material-symbols-outlined text-primary/50">verified</span>
</div>
<p className="text-[10px] font-bold uppercase opacity-50">Tax Audit Ready</p>
</div>
<div className="flex flex-col items-center text-center">
<div className="size-12 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center mb-3">
<span className="material-symbols-outlined text-primary font-bold">rocket_launch</span>
</div>
<p className="text-[10px] font-bold uppercase text-primary">Optimize Now</p>
</div>
<div className="flex flex-col items-center text-center">
<div className="size-12 rounded-full border border-primary/30 flex items-center justify-center mb-3">
<span className="material-symbols-outlined text-primary/50">description</span>
</div>
<p className="text-[10px] font-bold uppercase opacity-50">Draft Report</p>
</div>
<div className="flex flex-col items-center text-center">
<div className="size-12 rounded-full bg-slate-800 flex items-center justify-center mb-3">
<span className="material-symbols-outlined text-primary">mail</span>
</div>
<p className="text-[10px] font-bold uppercase">Alert Execs</p>
</div>
</div>
</div>
</div>
</main>

<aside className="w-80 border-l border-primary/10 bg-white dark:bg-background-dark p-0 flex flex-col">
<div className="p-6 border-b border-primary/10">
<h3 className="font-bold flex items-center gap-2">
<span className="material-symbols-outlined text-primary">chat</span> Collaboration Feed
                </h3>
</div>
<div className="flex-1 overflow-y-auto p-6 space-y-6">

<div className="flex gap-3">
<div className="size-8 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-background-dark flex-shrink-0">SYS</div>
<div>
<div className="bg-primary/5 p-3 rounded-xl rounded-tl-none border border-primary/10">
<p className="text-xs font-bold mb-1 text-primary">System Automation</p>
<p className="text-xs">Identified a $4k overlap in recurring software subscriptions for Q3.</p>
</div>
<span className="text-[10px] opacity-40 mt-1 inline-block">2 mins ago</span>
</div>
</div>

<div className="flex gap-3">
<div className="size-8 rounded-full bg-slate-200 overflow-hidden flex-shrink-0" data-alt="Female team member profile headshot">
<img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjV1714aKl9t_ZJyUv020qlQGmqGSjIwILNX-V0PuiF56GA0aPnL0JvY1R2pb-DYfsNxGwamADSVHGQbgB1kwbE6DF4oi3BtK-acZ0cWuNVhdUkEMnDR3Opr0p4RWgz89QZZyGKyo7YU8FxqnSwfBu8BOVZKBPmkq3IG_HXcvGSaK9mwX3lr-w7Yg1TKWJxzeMKc2OvNQsP4sNSSYfGEzjVYRlixQibaEjKtFFbUA27iVhF752TOp9ld91UWbuam4YMaYkgYArmaoy" />
</div>
<div>
<div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-xl rounded-tl-none border border-transparent">
<p className="text-xs font-bold mb-1">Sarah Chen (CFO)</p>
<p className="text-xs">@LeakageBot, can you cross-reference this with the marketing budget?</p>
</div>
<span className="text-[10px] opacity-40 mt-1 inline-block">10 mins ago</span>
</div>
</div>

<div className="flex gap-3">
<div className="size-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
<span className="material-symbols-outlined text-primary text-sm">smart_toy</span>
</div>
<div>
<div className="bg-primary/5 p-3 rounded-xl rounded-tl-none border border-primary/10">
<p className="text-xs font-bold mb-1 text-primary">Leakage Bot</p>
<p className="text-xs">Sarah, analysis complete. Overlap is verified. 4.2% reduction in spend possible if merged.</p>
</div>
<span className="text-[10px] opacity-40 mt-1 inline-block">Just now</span>
</div>
</div>
</div>
<div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-primary/10">
<div className="relative">
<input className="w-full bg-white dark:bg-background-dark border-primary/20 rounded-xl pr-10 text-xs py-3 focus:ring-primary focus:border-primary" placeholder="Type a message or command..." type="text" />
<button className="absolute right-3 top-1/2 -translate-y-1/2 text-primary">
<span className="material-symbols-outlined">send</span>
</button>
</div>
</div>
</aside>
</div>
    </div>
  );
}
