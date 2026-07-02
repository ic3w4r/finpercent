import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Database, 
  Sparkles, 
  Cpu, 
  Server, 
  Wallet, 
  Activity, 
  CheckCircle2, 
  Coins, 
  Lock, 
  RefreshCw, 
  FileText, 
  Check, 
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle,
  Building,
  TrendingUp,
  PieChart,
  Home
} from 'lucide-react';

interface MappedPayable {
  id: string;
  vendor: string;
  category: 'Savings' | 'Taxes' | 'Operations' | 'Profit';
  amount: number;
  dueDate: string;
  erpId: string;
  status: 'Pending' | 'Processing' | 'Settled';
  description: string;
}

export default function AutomatedBankingPage() {
  const navigate = useNavigate();

  // S.T.O.P Balances State (Corporate Ledgers)
  const [stopBalances, setStopBalances] = useState({
    savings: 2400000,
    taxes: 1800000,
    operations: 5400000,
    profit: 2400000
  });

  // N.W.S (Net Worth Surplus) Personal Balances State
  const [nwsBalances, setNwsBalances] = useState({
    realEstate: 500000,
    equities: 300000,
    debtReduction: 200000
  });

  // Kakeibo Personal Balances State
  const [kakeiboBalances, setKakeiboBalances] = useState({
    survival: 350000,
    optional: 250000,
    culture: 200000,
    extra: 200000
  });

  // Mapped ERP Payables List
  const [payables, setPayables] = useState<MappedPayable[]>([
    { id: 'p-1', vendor: 'NeoPack Industries', category: 'Operations', amount: 350000, dueDate: '2026-07-02', erpId: 'INV-SAP-10492', status: 'Pending', description: 'Raw Material (BOM) Supply' },
    { id: 'p-2', vendor: 'AlphaTech Logistics', category: 'Operations', amount: 150000, dueDate: '2026-06-30', erpId: 'INV-SAP-10493', status: 'Pending', description: 'Freight & Dispatch Clearing' },
    { id: 'p-3', vendor: 'Internal Revenue Service', category: 'Taxes', amount: 280000, dueDate: '2026-07-15', erpId: 'TAX-ORC-9921', status: 'Pending', description: 'Quarterly Advance Tax Filing' },
    { id: 'p-4', vendor: 'GreenPlast R&D Labs', category: 'Savings', amount: 400000, dueDate: '2026-07-10', erpId: 'INV-SAP-10495', status: 'Pending', description: 'Lab Equipment Amortization' },
    { id: 'p-5', vendor: 'Founding Partners Pool', category: 'Profit', amount: 600000, dueDate: '2026-06-29', erpId: 'DIV-NET-802', status: 'Pending', description: 'Bi-Annual Shareholder Payout' },
    { id: 'p-6', vendor: 'CyberSys Machine Ops', category: 'Operations', amount: 220000, dueDate: '2026-07-05', erpId: 'INV-SAP-10499', status: 'Pending', description: 'CNC Lathe Machinery Lease' }
  ]);

  // Simulation parameters
  const [simulateAmount, setSimulateAmount] = useState(1000000);
  const [secondaryMethod, setSecondaryMethod] = useState<'nws' | 'kakeibo'>('nws');
  
  const [selectedBills, setSelectedBills] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSplittingRevenue, setIsSplittingRevenue] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'idle' | 'sync' | 'clearing' | 'complete'>('idle');
  
  const [baasLogs, setBaasLogs] = useState<string[]>([
    '🟢 [SYSTEM ONLINE]: Automated Banking BaaS terminal ready.',
    '📋 [ERP STATUS]: Mapped 6 outstanding ERP accounts payable.'
  ]);

  const handleSelectBill = (id: string) => {
    if (selectedBills.includes(id)) {
      setSelectedBills(prev => prev.filter(b => b !== id));
    } else {
      setSelectedBills(prev => [...prev, id]);
    }
  };

  const handleSelectAll = () => {
    const pendingIds = payables.filter(p => p.status === 'Pending').map(p => p.id);
    if (selectedBills.length === pendingIds.length) {
      setSelectedBills([]);
    } else {
      setSelectedBills(pendingIds);
    }
  };

  // 1. Simulates Incoming Invoice Revenue Split
  const handleSimulateRevenueSplit = async () => {
    if (simulateAmount <= 0) return;
    setIsSplittingRevenue(true);
    setPaymentStep('sync');
    setBaasLogs(prev => [
      ...prev,
      `📥 [INCOMING INVOICE]: Simulating customer invoice payment received: ₹${simulateAmount.toLocaleString()}`,
      `⚙️ [S.T.O.P RULES]: Directing straight-through split of ₹${simulateAmount.toLocaleString()}...`
    ]);

    await new Promise(r => setTimeout(r, 1200));
    setPaymentStep('clearing');

    const sShare = simulateAmount * 0.20;
    const tShare = simulateAmount * 0.15;
    const oShare = simulateAmount * 0.45;
    const pShare = simulateAmount * 0.20;

    setStopBalances(prev => ({
      savings: prev.savings + sShare,
      taxes: prev.taxes + tShare,
      operations: prev.operations + oShare,
      profit: prev.profit + pShare
    }));

    setBaasLogs(prev => [
      ...prev,
      `📊 [S.T.O.P ACCREDITED]: Mapped to S.T.O.P pools:`,
      `   🟢 Savings (+20%): +₹${sShare.toLocaleString()}`,
      `   🔴 Taxes (+15%): +₹${tShare.toLocaleString()}`,
      `   🔵 Operations (+45%): +₹${oShare.toLocaleString()}`,
      `   🟣 Profit (+20%): +₹${pShare.toLocaleString()}`
    ]);

    await new Promise(r => setTimeout(r, 1500));
    setPaymentStep('complete');

    if (secondaryMethod === 'nws') {
      const reShare = pShare * 0.50;
      const eqShare = pShare * 0.30;
      const drShare = pShare * 0.20;

      setNwsBalances(prev => ({
        realEstate: prev.realEstate + reShare,
        equities: prev.equities + eqShare,
        debtReduction: prev.debtReduction + drShare
      }));

      setBaasLogs(prev => [
        ...prev,
        `📡 [N.W.S CASCADING]: Auto-routed Profit pool (₹${pShare.toLocaleString()}) to N.W.S wallets:`,
        `   🏘️ Real Estate (50%): +₹${reShare.toLocaleString()}`,
        `   📈 Liquid Equities (30%): +₹${eqShare.toLocaleString()}`,
        `   🛡️ Debt Reduction (20%): +₹${drShare.toLocaleString()}`,
        `✨ [SUCCESS]: Straight-through revenue splits finalized. Webhook sync complete.`
      ]);
    } else {
      const svShare = pShare * 0.35;
      const opShare = pShare * 0.25;
      const clShare = pShare * 0.20;
      const exShare = pShare * 0.20;

      setKakeiboBalances(prev => ({
        survival: prev.survival + svShare,
        optional: prev.optional + opShare,
        culture: prev.culture + clShare,
        extra: prev.extra + exShare
      }));

      setBaasLogs(prev => [
        ...prev,
        `📡 [KAKEIBO CASCADING]: Auto-routed Profit pool (₹${pShare.toLocaleString()}) to Kakeibo wallets:`,
        `   🍜 Survival (35%): +₹${svShare.toLocaleString()}`,
        `   🛍️ Optional (25%): +₹${opShare.toLocaleString()}`,
        `   🎭 Culture (20%): +₹${clShare.toLocaleString()}`,
        `   🚨 Extra (20%): +₹${exShare.toLocaleString()}`,
        `✨ [SUCCESS]: Straight-through revenue splits finalized. Webhook sync complete.`
      ]);
    }

    setIsSplittingRevenue(false);
  };

  // 2. Executes Accounts Payable Settlement
  const executeBaaSPayout = async () => {
    if (selectedBills.length === 0) return;

    setIsProcessing(true);
    setPaymentStep('sync');
    setBaasLogs(prev => [
      ...prev,
      `🔄 [STEP 1]: Syncing ${selectedBills.length} payment mandates with ERP transaction logs...`
    ]);

    await new Promise(r => setTimeout(r, 1200));
    setPaymentStep('clearing');
    
    const selectedPayables = payables.filter(p => selectedBills.includes(p.id));
    const deductions = { savings: 0, taxes: 0, operations: 0, profit: 0 };
    selectedPayables.forEach(p => {
      const cat = p.category.toLowerCase() as keyof typeof deductions;
      deductions[cat] += p.amount;
    });

    setBaasLogs(prev => [
      ...prev,
      `🏦 [STEP 2]: Direct BaaS transit clearing initiated...`,
      `💸 Deducting from Pools: Operations: ₹${deductions.operations.toLocaleString()} | Taxes: ₹${deductions.taxes.toLocaleString()} | Savings: ₹${deductions.savings.toLocaleString()} | Profit: ₹${deductions.profit.toLocaleString()}`
    ]);

    await new Promise(r => setTimeout(r, 1550));
    setPaymentStep('complete');

    setStopBalances(prev => ({
      savings: Math.max(0, prev.savings - deductions.savings),
      taxes: Math.max(0, prev.taxes - deductions.taxes),
      operations: Math.max(0, prev.operations - deductions.operations),
      profit: Math.max(0, prev.profit - deductions.profit)
    }));

    setPayables(prev => prev.map(p => 
      selectedBills.includes(p.id) ? { ...p, status: 'Settled' } : p
    ));

    setBaasLogs(prev => [
      ...prev,
      `✅ [STEP 3]: BaaS payout API response - 200 OK. Clearing verified.`,
      `📡 [WEBHOOK]: Reconciled invoice references in ERP backend: ${selectedPayables.map(p => p.erpId).join(', ')}.`
    ]);

    setSelectedBills([]);
    setIsProcessing(false);
  };

  const handleSyncERP = () => {
    setPayables(prev => prev.map(p => ({ ...p, status: 'Pending' })));
    setStopBalances({
      savings: 2400000,
      taxes: 1800000,
      operations: 5400000,
      profit: 2400000
    });
    setNwsBalances({
      realEstate: 500000,
      equities: 300000,
      debtReduction: 200000
    });
    setKakeiboBalances({
      survival: 350000,
      optional: 250000,
      culture: 200000,
      extra: 200000
    });
    setSelectedBills([]);
    setPaymentStep('idle');
    setBaasLogs(prev => [
      ...prev,
      '🔄 [ERP RESET]: Resynced with SAP/Oracle. Mapped outstanding payables.'
    ]);
  };

  return (
    <div className="min-h-screen bg-accent-100 text-primary-950 p-6 pb-20 dark:bg-accent-100 dark:text-primary-50">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation & Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-accent-200 pb-6">
          <div className="text-left">
            <Link to="/ai-cxo" className="inline-flex items-center text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-2 hover:underline">
              <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to AI CXO Cockpit
            </Link>
            <div className="flex items-center space-x-2 text-primary-550 dark:text-primary-400 mb-1">
              <Zap className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
              <span className="text-[10px] font-bold tracking-wider uppercase font-mono">BaaS Banking Gateway</span>
            </div>
            <h1 className="text-3xl font-serif font-normal tracking-tight">
              Automated Banking (S.T.O.P Console)
            </h1>
            <p className="text-sm text-primary-500 mt-1">
              Direct settlement of ERP Accounts Payable mapped to Savings, Taxes, Operations, and Profit pools.
            </p>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={handleSyncERP}
              className="px-4 py-2 text-xs font-bold border border-accent-200 bg-accent-50 rounded text-neutral-800 hover:bg-neutral-250/50 transition-all flex items-center space-x-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Resync ERP Data</span>
            </button>
            <div className="bg-[#EDF3EC] border border-[#346538]/20 px-4 py-2 rounded flex items-center space-x-2 text-[#346538] font-bold text-xs">
              <span className="relative flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#346538]"></span>
              </span>
              <span>BaaS API CONNECTED</span>
            </div>
          </div>
        </div>

        {/* SECTION 1: S.T.O.P BALANCE POOLS (CORPORATE) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 text-left">
          {[
            { key: 'savings', label: 'S - Savings Pool (20%)', amount: stopBalances.savings, color: 'border-l-4 border-[#346538]', desc: 'Reserve cash and investment growth.' },
            { key: 'taxes', label: 'T - Taxes Pool (15%)', amount: stopBalances.taxes, color: 'border-l-4 border-[#9F2F2D]', desc: 'GST, custom duties, and corporate tax reserves.' },
            { key: 'operations', label: 'O - Operations Pool (45%)', amount: stopBalances.operations, color: 'border-l-4 border-[#1F6C9F]', desc: 'Wages, raw materials, logistics, and rent.' },
            { key: 'profit', label: 'P - Profit Pool (20%)', amount: stopBalances.profit, color: 'border-l-4 border-[#956400]', desc: 'Dividends, capital reinvestment, and rewards.' }
          ].map(pool => (
            <div key={pool.key} className={`border border-accent-200 bg-accent-50 p-5 rounded-lg flex flex-col justify-between ${pool.color} shadow-sm`}>
              <div>
                <span className="text-[10px] font-bold text-primary-400 uppercase tracking-wider block font-mono">{pool.label}</span>
                <div className="text-2xl font-serif font-normal mt-2 text-primary-950 dark:text-white">
                  ₹{pool.amount.toLocaleString()}
                </div>
              </div>
              <p className="text-[11px] text-primary-500 mt-3 leading-relaxed">{pool.desc}</p>
            </div>
          ))}
        </div>

        {/* MAIN PANEL GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">

          {/* LEFT COLUMN: REVENUE SIMULATOR & PAYABLES LIST */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* 1. REVENUE AUTO-SPLIT SIMULATOR */}
            <div className="border border-accent-200 bg-accent-50 p-6 rounded-lg">
              <div className="border-b border-accent-200 pb-3 mb-4">
                <h3 className="text-lg font-serif font-normal text-primary-950 dark:text-white flex items-center">
                  <Sparkles className="w-4 h-4 mr-2 text-[#956400]" />
                  Incoming Revenue S.T.O.P & Reinvestment Splitter
                </h3>
                <p className="text-xs text-primary-500">Simulate incoming invoice payments and auto-route profit allocations in real-time.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[9px] font-bold text-primary-400 uppercase mb-1 font-mono">Incoming Payment Amount (₹)</label>
                      <input 
                        type="number" 
                        value={simulateAmount}
                        onChange={e => setSimulateAmount(parseInt(e.target.value) || 0)}
                        className="w-full bg-accent-50 border border-accent-200 rounded p-2 text-xs font-bold focus:ring-1 focus:ring-neutral-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] font-bold text-primary-400 uppercase mb-1.5 font-mono">Profit Reinvestment Framework</label>
                      <div className="flex bg-neutral-200/50 p-1 rounded border border-accent-200">
                        <button
                          type="button"
                          onClick={() => setSecondaryMethod('nws')}
                          className={`flex-1 py-1.5 text-xs font-bold rounded transition ${
                            secondaryMethod === 'nws' 
                              ? 'bg-primary-950 text-white dark:bg-primary-50 dark:text-black font-semibold' 
                              : 'text-neutral-700 hover:bg-neutral-250/50'
                          }`}
                        >
                          🏘️ N.W.S Method
                        </button>
                        <button
                          type="button"
                          onClick={() => setSecondaryMethod('kakeibo')}
                          className={`flex-1 py-1.5 text-xs font-bold rounded transition ${
                            secondaryMethod === 'kakeibo' 
                              ? 'bg-primary-950 text-white dark:bg-primary-50 dark:text-black font-semibold' 
                              : 'text-neutral-700 hover:bg-neutral-250/50'
                          }`}
                        >
                          🍜 Kakeibo Method
                        </button>
                      </div>
                      <span className="text-[10px] text-primary-500 mt-1 block">
                        {secondaryMethod === 'nws' 
                          ? 'Wealth Split: 50% Real Estate, 30% Equities, 20% Debt reserves.' 
                          : 'Mindful Budget Split: 35% Needs, 25% Wants, 20% Culture, 20% Emergency.'}
                      </span>
                    </div>

                    <button
                      onClick={handleSimulateRevenueSplit}
                      disabled={isSplittingRevenue || simulateAmount <= 0}
                      className="w-full py-3 bg-primary-950 text-white hover:bg-neutral-850 dark:bg-primary-50 dark:text-black font-bold rounded text-xs transition disabled:opacity-50"
                    >
                      {isSplittingRevenue ? 'Processing Splits...' : 'Execute Straight-Through Revenue Split'}
                    </button>
                  </div>
                </div>

                {/* VISUAL CASCADING SCHEMATIC FLOW */}
                <div className="p-4 bg-accent-50 border border-accent-200 rounded-lg flex flex-col justify-between">
                  <div className="text-[10px] font-bold text-primary-400 mb-2 text-center uppercase tracking-wider font-mono">
                    Automated Split Routing Flow
                  </div>
                  
                  <div className="space-y-3 relative text-[11px]">
                    <div className="p-2 bg-[#FBF3DB] border border-[#956400]/20 text-[#956400] rounded text-center font-bold">
                      Incoming: ₹{simulateAmount.toLocaleString()}
                    </div>
                    
                    <div className="flex justify-center text-neutral-400">
                      <ArrowRight className="w-4 h-4 transform rotate-90" />
                    </div>

                    <div className="grid grid-cols-4 gap-1 text-center font-bold text-[9px] font-mono">
                      <div className="p-1 bg-[#EDF3EC] text-[#346538] rounded border border-[#346538]/20">S (20%)</div>
                      <div className="p-1 bg-[#FDEBEC] text-[#9F2F2D] rounded border border-[#9F2F2D]/20">T (15%)</div>
                      <div className="p-1 bg-[#E1F3FE] text-[#1F6C9F] rounded border border-[#1F6C9F]/20">O (45%)</div>
                      <div className="p-1 bg-[#FBF3DB] text-[#956400] rounded border border-[#956400]/20">P (20%)</div>
                    </div>

                    <div className="flex justify-center text-neutral-400">
                      <ArrowRight className="w-4 h-4 transform rotate-90" />
                    </div>

                    <div className="p-2 bg-[#E1F3FE] border border-[#1F6C9F]/20 text-[#1F6C9F] rounded text-center font-bold">
                      Profit Cascaded Split via {secondaryMethod.toUpperCase()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. ERP IMPORTED PAYABLES TABLE */}
            <div className="glass-card p-6 rounded-2xl border border-primary-200/40 dark:border-gray-800">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                    <Database className="w-5 h-5 mr-2 text-indigo-500" />
                    ERP Imported Accounts Payable
                  </h3>
                  <p className="text-xs text-gray-500">Select pending payables to clear using the S.T.O.P banking gateway.</p>
                </div>
                <button
                  onClick={handleSelectAll}
                  className="text-xs font-bold text-primary-600 dark:text-primary-400 hover:underline"
                >
                  {selectedBills.length === payables.filter(p => p.status === 'Pending').length ? 'Deselect All' : 'Select All Pending'}
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-800 text-gray-500 text-left font-bold uppercase tracking-wider">
                      <th className="py-2.5 px-2">Select</th>
                      <th className="py-2.5 px-2">Vendor / Mapped Pool</th>
                      <th className="py-2.5 px-2">ERP Ref</th>
                      <th className="py-2.5 px-2">Due Date</th>
                      <th className="py-2.5 px-2 text-right">Amount</th>
                      <th className="py-2.5 px-2 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-150 dark:divide-gray-855">
                    {payables.map(payable => {
                      const isPending = payable.status === 'Pending';
                      const isSelected = selectedBills.includes(payable.id);
                      return (
                        <tr 
                          key={payable.id}
                          className={`hover:bg-primary-50/30 dark:hover:bg-gray-850/30 transition ${
                            isSelected ? 'bg-primary-50/40 dark:bg-primary-950/10' : ''
                          }`}
                        >
                          <td className="py-3 px-2">
                            <input 
                              type="checkbox"
                              checked={isSelected}
                              disabled={!isPending || isProcessing}
                              onChange={() => handleSelectBill(payable.id)}
                              className="accent-primary-600 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                            />
                          </td>
                          <td className="py-3 px-2">
                            <div className="font-bold text-gray-900 dark:text-white">{payable.vendor}</div>
                            <div className="text-[10px] text-gray-500 mt-0.5 flex items-center space-x-1">
                              <span className={`w-2 h-2 rounded-full ${
                                payable.category === 'Operations' ? 'bg-blue-500' :
                                payable.category === 'Taxes' ? 'bg-red-500' :
                                payable.category === 'Savings' ? 'bg-green-500' : 'bg-purple-500'
                              }`}></span>
                              <span>{payable.category} Pool &bull; {payable.description}</span>
                            </div>
                          </td>
                          <td className="py-3 px-2 font-mono text-gray-600 dark:text-gray-400">{payable.erpId}</td>
                          <td className="py-3 px-2 text-gray-550">{payable.dueDate}</td>
                          <td className="py-3 px-2 text-right font-bold text-gray-900 dark:text-white">
                            ₹{payable.amount.toLocaleString()}
                          </td>
                          <td className="py-3 px-2 text-right">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              payable.status === 'Settled' ? 'bg-green-100 text-green-800 dark:bg-green-950/20 dark:text-green-300' :
                              payable.status === 'Processing' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950/20 dark:text-yellow-300' :
                              'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-350'
                            }`}>
                              {payable.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 p-4 bg-accent-50 border border-accent-200 rounded-lg flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-sm">
                  <span className="text-primary-500">Selected Payables: </span>
                  <span className="font-extrabold text-neutral-800 dark:text-neutral-200">{selectedBills.length} Bills</span>
                  <span className="mx-2 text-neutral-300">|</span>
                  <span className="text-primary-500">Total Amount: </span>
                  <span className="font-extrabold text-primary-950 dark:text-white">
                    ₹{payables.filter(p => selectedBills.includes(p.id)).reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={executeBaaSPayout}
                  disabled={selectedBills.length === 0 || isProcessing}
                  className="bg-primary-950 hover:bg-neutral-850 dark:bg-primary-50 dark:text-black text-white font-bold px-6 py-2.5 rounded text-xs flex items-center space-x-2 transition-all disabled:opacity-50 border-0"
                >
                  <span>Execute Instant BaaS Pay (S.T.O.P Settlement)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: SECONDARY WALLETS & BAAS LOGS */}
          <div className="space-y-6">
            
            {/* PERSONAL REINVESTMENT BALANCES */}
            <div className="glass-card p-6 rounded-2xl border border-primary-200/40 dark:border-gray-800 text-left">
              <div className="flex items-center space-x-2 text-purple-650 dark:text-purple-400 mb-3">
                <Wallet className="w-5 h-5" />
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Personal Savings & Reinvestment Ledgers
                </h3>
              </div>
              <p className="text-xs text-gray-500 mb-4">
                Cascaded balances generated from S.T.O.P Profit allocations.
              </p>

              {secondaryMethod === 'nws' ? (
                <div className="space-y-3">
                  <div className="p-3 bg-green-50/50 border border-green-200/50 dark:bg-green-950/10 dark:border-green-800 rounded-xl">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-green-700 dark:text-green-300 flex items-center">
                        <Home className="w-4 h-4 mr-1.5" /> Real Estate (50%)
                      </span>
                      <span className="font-extrabold text-gray-900 dark:text-white">₹{nwsBalances.realEstate.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50/50 border border-blue-200/50 dark:bg-blue-950/10 dark:border-blue-800 rounded-xl">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-blue-700 dark:text-blue-300 flex items-center">
                        <TrendingUp className="w-4 h-4 mr-1.5" /> Liquid Equities (30%)
                      </span>
                      <span className="font-extrabold text-gray-900 dark:text-white">₹{nwsBalances.equities.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="p-3 bg-purple-50/50 border border-purple-200/50 dark:bg-purple-950/10 dark:border-purple-800 rounded-xl">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-purple-700 dark:text-purple-300 flex items-center">
                        <ShieldCheck className="w-4 h-4 mr-1.5" /> Debt Reduction (20%)
                      </span>
                      <span className="font-extrabold text-gray-900 dark:text-white">₹{nwsBalances.debtReduction.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {[
                    { label: 'Survival (Needs - 35%)', amount: kakeiboBalances.survival, color: 'bg-red-50/50 border-red-200/50 dark:bg-red-950/10 dark:border-red-800 text-red-700 dark:text-red-300' },
                    { label: 'Optional (Wants - 25%)', amount: kakeiboBalances.optional, color: 'bg-yellow-50/50 border-yellow-200/50 dark:bg-yellow-950/10 dark:border-yellow-800 text-yellow-700 dark:text-yellow-300' },
                    { label: 'Culture (Growth - 20%)', amount: kakeiboBalances.culture, color: 'bg-indigo-50/50 border-indigo-200/50 dark:bg-indigo-950/10 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300' },
                    { label: 'Extra (Emergency - 20%)', amount: kakeiboBalances.extra, color: 'bg-gray-50 border-gray-200 dark:bg-gray-900/50 dark:border-gray-800 text-gray-700 dark:text-gray-300' }
                  ].map(kb => (
                    <div key={kb.label} className={`p-2.5 border rounded-xl ${kb.color}`}>
                      <div className="flex justify-between items-center text-xs font-bold">
                        <span>{kb.label}</span>
                        <span className="text-gray-900 dark:text-white">₹{kb.amount.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* BaaS API timeline */}
            <div className="glass-card p-6 rounded-2xl border border-primary-200/40 dark:border-gray-800">
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Server className="w-4 h-4 mr-2 text-green-500" />
                BaaS API Payment Gate
              </h3>

              <div className="space-y-4">
                {[
                  { step: 'sync', title: '1. ERP Payables Sync', desc: 'Syncing matching invoices & amounts.' },
                  { step: 'clearing', title: '2. S.T.O.P Transit Routing', desc: 'Clearing through mapped virtual pools.' },
                  { step: 'complete', title: '3. Instant Clearing API', desc: 'Executing BaaS payout and returning status receipt.' }
                ].map((item) => {
                  let stepStatus: 'upcoming' | 'active' | 'completed' = 'upcoming';
                  if (paymentStep === 'idle') stepStatus = 'upcoming';
                  else if (paymentStep === 'sync') {
                    if (item.step === 'sync') stepStatus = 'active';
                    else stepStatus = 'upcoming';
                  } else if (paymentStep === 'clearing') {
                    if (item.step === 'sync') stepStatus = 'completed';
                    else if (item.step === 'clearing') stepStatus = 'active';
                    else stepStatus = 'upcoming';
                  } else if (paymentStep === 'complete') {
                    stepStatus = 'completed';
                  }

                  return (
                    <div key={item.step} className="flex items-start space-x-3 text-xs">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] mt-0.5 border ${
                        stepStatus === 'completed' ? 'bg-green-600 text-white border-transparent' :
                        stepStatus === 'active' ? 'bg-blue-600 text-white border-transparent animate-pulse' :
                        'bg-gray-100 text-gray-500 border-gray-300 dark:bg-gray-800 dark:border-gray-700'
                      }`}>
                        {stepStatus === 'completed' ? <Check className="w-3 h-3" /> : (item.step === 'sync' ? '1' : item.step === 'clearing' ? '2' : '3')}
                      </div>
                      <div className="text-left">
                        <div className={`font-bold ${stepStatus === 'active' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-800 dark:text-gray-200'}`}>
                          {item.title}
                        </div>
                        <div className="text-[10px] text-gray-500 mt-0.5">{item.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* BaaS Console Output Logs */}
            <div className="glass-card p-6 rounded-2xl border border-primary-200/40 dark:border-gray-800 flex flex-col min-h-[300px]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">BaaS Settlement logs</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                  REAL-TIME API FEED
                </span>
              </div>

              <div className="flex-1 bg-gray-900 text-green-400 font-mono text-xs rounded-xl p-3 space-y-2 border border-gray-800 h-64 overflow-y-auto text-left leading-relaxed">
                {baasLogs.map((log, i) => (
                  <div key={i} className="whitespace-pre-wrap">{log}</div>
                ))}
                {(isProcessing || isSplittingRevenue) && (
                  <div className="flex items-center space-x-1.5 text-yellow-400 animate-pulse mt-2">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Processing Straight-Through clearing...</span>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
