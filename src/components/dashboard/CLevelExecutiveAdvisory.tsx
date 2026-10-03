import { useState } from 'react';
import {
  Lock, ArrowRight, Download,
  DollarSign, UserCheck, Scale, Cpu
} from 'lucide-react';
import { useRolePerspective } from '../../contexts/RolePerspectiveContext';

export interface CLevelExecutiveAdvisoryProps {
  onClose?: () => void;
  isModal?: boolean;
}

export default function CLevelExecutiveAdvisory({ onClose }: CLevelExecutiveAdvisoryProps) {
  const {
    currentRoleConfig,
    activeScenario,
    updateScenario,
    decisions,
    signDecision
  } = useRolePerspective();

  const [activeAdvisorTab, setActiveAdvisorTab] = useState<'war-room' | 'ceo' | 'cfo' | 'coo' | 'cpo' | 'ciso' | 'cto'>('war-room');
  const [boardDeckGenerated, setBoardDeckGenerated] = useState(false);
  const [appliedMitigation, setAppliedMitigation] = useState<string | null>(null);

  // Executive Decision Metrics
  const burnMultiple = 1.15;
  const netDollarRetention = 118;
  const grossMargin = 68.4;
  const cashConversionCycle = activeScenario.creditDays + 20 - activeScenario.supplierDays;

  // Scenario Presets
  const handleApplyScenarioPreset = (type: 'conservative' | 'base' | 'aggressive') => {
    if (type === 'conservative') {
      updateScenario({
        creditDays: 90,
        supplierDays: 15,
        orderValue: 3500000,
        title: 'Conservative Plan (90d Credit / 15d Supplier)',
        description: 'Buffers maximum liquidity with cautious debtor collection timeline.'
      });
    } else if (type === 'base') {
      updateScenario({
        creditDays: 75,
        supplierDays: 15,
        orderValue: 4000000,
        title: 'Base Plan: Zenith ₹40L Order',
        description: 'Standard 75-day customer credit with ₹15L NeoPack procurement.'
      });
    } else {
      updateScenario({
        creditDays: 45,
        supplierDays: 30,
        orderValue: 5500000,
        title: 'Aggressive Growth (45d Credit / 30d Supplier)',
        description: 'Optimized working capital cycle releasing ₹18L liquidity early.'
      });
    }
  };

  const handleApplyCfoMitigation = () => {
    setAppliedMitigation('cfo-hdfc-od');
    setTimeout(() => {
      alert('CFO Action Adopted: ₹15L HDFC Overdraft drawdown linked to JV-2026-0105.');
    }, 200);
  };

  const handleApplyCooReorder = () => {
    setAppliedMitigation('coo-reorder-rfq');
    setTimeout(() => {
      alert('COO Action Adopted: RFQ broadcast to 3 verified suppliers for 150 SKUs on Finning Circle.');
    }, 200);
  };

  return (
    <div className="bg-white dark:bg-[#181818] rounded-3xl border border-[#EAEAE7] dark:border-[#282828] shadow-sm overflow-hidden text-left">
      
      {/* HEADER: COMPACT, CRISP & BUTTON-DRIVEN */}
      <div className="p-5 border-b border-[#EAEAE7] dark:border-[#282828] bg-[#FBFBFA] dark:bg-[#151515]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-sm font-bold text-[#111111] dark:text-white">
                  C-Level Executive Advisory War Room
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 font-bold border border-emerald-500/20">
                  Active Governance
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1.5 px-3 py-1 bg-white dark:bg-[#202020] rounded-xl border border-[#E2E2DE] dark:border-[#333333] text-xs font-semibold">
              <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-[#777777]">Role:</span>
              <span className="font-bold text-[#111111] dark:text-white">{currentRoleConfig.name.split(' ')[0]}</span>
            </div>

            {onClose && (
              <button
                onClick={onClose}
                className="p-1 text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-lg transition"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* PILL NAVIGATION TABS */}
        <div className="flex items-center space-x-1.5 mt-4 overflow-x-auto scrollbar-none">
          {[
            { id: 'war-room', label: 'War Room' },
            { id: 'ceo', label: 'CEO Strategy' },
            { id: 'cfo', label: `CFO Treasury (${cashConversionCycle}d)` },
            { id: 'coo', label: 'COO Operations' },
            { id: 'cpo', label: 'CPO Portfolio' },
            { id: 'ciso', label: 'CISO Zero-Trust' },
            { id: 'cto', label: 'CTO Telemetry' }
          ].map(tab => {
            const isActive = activeAdvisorTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveAdvisorTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                  isActive
                    ? 'bg-[#111111] text-white dark:bg-white dark:text-[#111111] shadow-sm'
                    : 'text-[#666666] hover:text-[#111111] dark:hover:text-white bg-white dark:bg-[#202020] hover:bg-[#EBEBE8] border border-[#E2E2DE] dark:border-[#333333]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ADVISORY BODY */}
      <div className="p-6">

        {/* TAB 1: EXECUTIVE WAR ROOM (SYNTHESIS) */}
        {activeAdvisorTab === 'war-room' && (
          <div className="space-y-5">
            
            {/* 4 Metric Bento Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              
              {/* Card 1: Strategic Position Score */}
              <div className="p-3.5 rounded-2xl bg-[#F8F9FA] dark:bg-[#141414] border border-[#EAEAE7] dark:border-[#282828] space-y-1.5">
                <div className="flex justify-between items-center text-[10px] font-mono text-[#777777]">
                  <span>Strategic Health</span>
                  <span className="text-emerald-600 font-bold">88 / 100</span>
                </div>
                <div className="text-lg font-bold font-mono text-[#111111] dark:text-white">High Resilience</div>
                <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full w-[88%]" />
                </div>
              </div>

              {/* Card 2: Burn Multiple & Efficiency */}
              <div className="p-3.5 rounded-2xl bg-[#F8F9FA] dark:bg-[#141414] border border-[#EAEAE7] dark:border-[#282828] space-y-1.5">
                <div className="flex justify-between items-center text-[10px] font-mono text-[#777777]">
                  <span>Burn Multiple</span>
                  <span className="text-emerald-600 font-bold">&lt; 1.5x</span>
                </div>
                <div className="text-lg font-bold font-mono text-emerald-600">{burnMultiple}x</div>
                <div className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400">
                  NDR {netDollarRetention}% • GM {grossMargin}%
                </div>
              </div>

              {/* Card 3: Process Bottleneck Throughput */}
              <div className="p-3.5 rounded-2xl bg-[#F8F9FA] dark:bg-[#141414] border border-[#EAEAE7] dark:border-[#282828] space-y-1.5">
                <div className="flex justify-between items-center text-[10px] font-mono text-[#777777]">
                  <span>Working Capital Gap</span>
                  <span className="text-amber-600 font-bold">TOC</span>
                </div>
                <div className="text-lg font-bold font-mono text-amber-600">{activeScenario.creditDays - activeScenario.supplierDays}d Gap</div>
                <div className="text-[10px] font-mono text-amber-700 dark:text-amber-400">
                  HDFC OD Bridge Ready
                </div>
              </div>

              {/* Card 4: Cryptographic Governance */}
              <div className="p-3.5 rounded-2xl bg-[#F8F9FA] dark:bg-[#141414] border border-[#EAEAE7] dark:border-[#282828] space-y-1.5">
                <div className="flex justify-between items-center text-[10px] font-mono text-[#777777]">
                  <span>Zero-Trust Signatures</span>
                  <span className="text-purple-600 font-bold">SHA-256</span>
                </div>
                <div className="text-lg font-bold font-mono text-purple-600">{decisions.length} Tracked</div>
                <div className="text-[10px] font-mono text-purple-700 dark:text-purple-400">
                  Audit Lock: Active
                </div>
              </div>

            </div>

            {/* Strategic Scenario Selector */}
            <div className="p-4 rounded-2xl bg-[#FBFBFA] dark:bg-[#151515] border border-[#EAEAE7] dark:border-[#282828] space-y-3">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <span className="text-xs font-bold text-[#111111] dark:text-white">Active Simulation Scenario:</span>
                
                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => handleApplyScenarioPreset('conservative')}
                    className="px-2.5 py-1 bg-white dark:bg-[#202020] hover:bg-neutral-100 dark:hover:bg-[#282828] rounded-lg text-xs font-semibold border border-[#E2E2DE] dark:border-[#333333] transition"
                  >
                    Conservative (90d)
                  </button>
                  <button
                    onClick={() => handleApplyScenarioPreset('base')}
                    className="px-2.5 py-1 bg-[#111111] text-white dark:bg-white dark:text-[#111111] rounded-lg text-xs font-semibold transition"
                  >
                    Base (75d)
                  </button>
                  <button
                    onClick={() => handleApplyScenarioPreset('aggressive')}
                    className="px-2.5 py-1 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-semibold transition"
                  >
                    Aggressive (45d)
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-[#1A1A1A] border border-[#EAEAE7] dark:border-[#282828] flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="font-bold text-[#111111] dark:text-white">{activeScenario.title}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span>DSO: <strong className="text-amber-600">{activeScenario.creditDays}d</strong></span>
                  <span>DPO: <strong className="text-emerald-600">{activeScenario.supplierDays}d</strong></span>
                  <span>Value: <strong className="text-blue-600">₹{(activeScenario.orderValue / 100000).toFixed(0)}L</strong></span>
                </div>
              </div>
            </div>

            {/* Direct 1-Click Executive Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              
              {/* CFO Action Card */}
              <div className={`p-4 rounded-2xl bg-white dark:bg-[#1A1A1A] border flex items-center justify-between gap-3 transition ${appliedMitigation === 'cfo-hdfc-od' ? 'border-emerald-500 bg-emerald-500/5' : 'border-[#EAEAE7] dark:border-[#282828]'}`}>
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-bold text-[#111111] dark:text-white">CFO Liquidity Bridge</span>
                    {appliedMitigation === 'cfo-hdfc-od' && (
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-700 font-bold">Executed</span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#777777]">Bridge 45d gap on ₹40L order via ₹15L HDFC OD (JV-2026-0105).</p>
                </div>

                <button
                  onClick={handleApplyCfoMitigation}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1 whitespace-nowrap ${appliedMitigation === 'cfo-hdfc-od' ? 'bg-emerald-700 text-white' : 'bg-emerald-600 hover:bg-emerald-700 text-white'}`}
                >
                  <span>{appliedMitigation === 'cfo-hdfc-od' ? 'Active in Ledger' : 'Execute Bridge'}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* COO Action Card */}
              <div className={`p-4 rounded-2xl bg-white dark:bg-[#1A1A1A] border flex items-center justify-between gap-3 transition ${appliedMitigation === 'coo-reorder-rfq' ? 'border-blue-500 bg-blue-500/5' : 'border-[#EAEAE7] dark:border-[#282828]'}`}>
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <Cpu className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-bold text-[#111111] dark:text-white">COO Re-order Trigger</span>
                    {appliedMitigation === 'coo-reorder-rfq' && (
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-700 font-bold">Broadcast</span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#777777]">7 SKUs below safety stock (&lt; 150 units). Broadcast RFQ on Finning Circle.</p>
                </div>

                <button
                  onClick={handleApplyCooReorder}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1 whitespace-nowrap ${appliedMitigation === 'coo-reorder-rfq' ? 'bg-blue-600 text-white' : 'bg-[#111111] hover:bg-[#222222] dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-[#111111]'}`}
                >
                  <span>{appliedMitigation === 'coo-reorder-rfq' ? 'RFQ Pending Offers' : 'Trigger RFQ'}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: CEO STRATEGY */}
        {activeAdvisorTab === 'ceo' && (
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-[#F8F9FA] dark:bg-[#141414] border border-[#EAEAE7] dark:border-[#282828] flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-[#111111] dark:text-white">Board Governance & Strategic Package</h3>
                <p className="text-[11px] text-[#777777] mt-0.5">Consolidated three-statement model and executive alignment report.</p>
              </div>

              <button
                onClick={() => setBoardDeckGenerated(true)}
                className="px-3.5 py-1.5 bg-[#111111] hover:bg-[#222222] dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-[#111111] rounded-xl text-xs font-bold transition flex items-center space-x-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Generate Board Deck</span>
              </button>
            </div>

            {boardDeckGenerated && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-900 dark:text-emerald-200 font-medium">
                ✓ Board Package Q3 FY 25-26 generated with SHA-256 cryptographic seal.
              </div>
            )}

            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-white dark:bg-[#1A1A1A] border border-[#EAEAE7] dark:border-[#282828]">
                <span className="text-[#888888] text-[10px] uppercase block">North Star</span>
                <span className="font-bold text-sm text-[#111111] dark:text-white">High-Margin OEM Orders</span>
                <span className="text-[10px] text-emerald-600 block mt-1">Target: &gt; 60% Margin</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white dark:bg-[#1A1A1A] border border-[#EAEAE7] dark:border-[#282828]">
                <span className="text-[#888888] text-[10px] uppercase block">Reserves Floor</span>
                <span className="font-bold text-sm text-[#111111] dark:text-white">₹10.0L Minimum</span>
                <span className="text-[10px] text-emerald-600 block mt-1">Currently ₹12.45L</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white dark:bg-[#1A1A1A] border border-[#EAEAE7] dark:border-[#282828]">
                <span className="text-[#888888] text-[10px] uppercase block">Alignment</span>
                <span className="font-bold text-sm text-emerald-600">5 / 5 Roles</span>
                <span className="text-[10px] text-neutral-500 block mt-1">Full Consensus</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CFO TREASURY */}
        {activeAdvisorTab === 'cfo' && (
          <div className="space-y-4 text-xs font-mono">
            <div className="grid grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-[#F8F9FA] dark:bg-[#141414] border border-[#EAEAE7] dark:border-[#282828]">
                <span className="text-[10px] text-[#888888] block">DSO</span>
                <span className="text-base font-bold text-amber-600">{activeScenario.creditDays}d</span>
              </div>
              <div className="p-3 rounded-xl bg-[#F8F9FA] dark:bg-[#141414] border border-[#EAEAE7] dark:border-[#282828]">
                <span className="text-[10px] text-[#888888] block">DPO</span>
                <span className="text-base font-bold text-emerald-600">{activeScenario.supplierDays}d</span>
              </div>
              <div className="p-3 rounded-xl bg-[#F8F9FA] dark:bg-[#141414] border border-[#EAEAE7] dark:border-[#282828]">
                <span className="text-[10px] text-[#888888] block">DIO</span>
                <span className="text-base font-bold text-blue-600">20d</span>
              </div>
              <div className="p-3 rounded-xl bg-[#F8F9FA] dark:bg-[#141414] border border-[#EAEAE7] dark:border-[#282828]">
                <span className="text-[10px] text-[#888888] block">CCC</span>
                <span className="text-base font-bold text-purple-600">{cashConversionCycle}d</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-[#1A1A1A] border border-[#EAEAE7] dark:border-[#282828] flex justify-between items-center text-xs">
              <span className="font-bold text-[#111111] dark:text-white">Double-Entry Balance:</span>
              <span className="text-emerald-600 font-bold">Debit ₹82,71,186 == Credit ₹82,71,186</span>
            </div>
          </div>
        )}

        {/* TAB 4: COO OPERATIONS */}
        {activeAdvisorTab === 'coo' && (
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-5 gap-2">
              {[
                { lvl: 1, name: 'Ad hoc' },
                { lvl: 2, name: 'Defined' },
                { lvl: 3, name: 'Measured' },
                { lvl: 4, name: 'Managed (Active)' },
                { lvl: 5, name: 'Optimized' }
              ].map(m => (
                <div
                  key={m.lvl}
                  className={`p-2.5 rounded-xl border text-center font-mono ${
                    m.lvl === 4
                      ? 'bg-blue-500/10 border-blue-500/40 text-blue-900 dark:text-blue-200 font-bold'
                      : 'bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-400'
                  }`}
                >
                  <div className="text-[10px]">Level {m.lvl}</div>
                  <div className="text-xs mt-0.5">{m.name}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 font-mono">
              <div className="p-3 rounded-xl bg-[#F8F9FA] dark:bg-[#141414] border border-[#EAEAE7] dark:border-[#282828]">
                <span className="text-[10px] text-[#888888] block">Turnaround SLA</span>
                <span className="text-base font-bold text-emerald-600">18.4 Hours (&lt; 48h)</span>
              </div>
              <div className="p-3 rounded-xl bg-[#F8F9FA] dark:bg-[#141414] border border-[#EAEAE7] dark:border-[#282828]">
                <span className="text-[10px] text-[#888888] block">Incidents</span>
                <span className="text-base font-bold text-emerald-600">0 / Month</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: CPO PORTFOLIO */}
        {activeAdvisorTab === 'cpo' && (
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
              <div className="flex justify-between items-center">
                <span className="font-bold">Industrial Valves 4"</span>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-800 font-bold">Invest</span>
              </div>
              <p className="text-[11px] text-[#777777] mt-1">62.5% Margin • 100% capacity.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-blue-500/5 border border-blue-500/20">
              <div className="flex justify-between items-center">
                <span className="font-bold">Precision Seal Kits</span>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-800 font-bold">Maintain</span>
              </div>
              <p className="text-[11px] text-[#777777] mt-1">45% Margin • Bundle with valves.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <div className="flex justify-between items-center">
                <span className="font-bold">Casting Rods</span>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-600 font-bold">Harvest</span>
              </div>
              <p className="text-[11px] text-[#777777] mt-1">Transitioning inventory out.</p>
            </div>
          </div>
        )}

        {/* TAB 6: CISO ZERO-TRUST */}
        {activeAdvisorTab === 'ciso' && (
          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-3 gap-3 font-mono">
              <div className="p-3 rounded-xl bg-[#F8F9FA] dark:bg-[#141414] border border-[#EAEAE7] dark:border-[#282828]">
                <span className="text-[10px] text-[#888888] block">SLE</span>
                <span className="text-base font-bold text-[#111111] dark:text-white">₹0</span>
              </div>
              <div className="p-3 rounded-xl bg-[#F8F9FA] dark:bg-[#141414] border border-[#EAEAE7] dark:border-[#282828]">
                <span className="text-[10px] text-[#888888] block">Risk Coverage</span>
                <span className="text-base font-bold text-emerald-600">98.5%</span>
              </div>
              <div className="p-3 rounded-xl bg-[#F8F9FA] dark:bg-[#141414] border border-[#EAEAE7] dark:border-[#282828]">
                <span className="text-[10px] text-[#888888] block">MTTD</span>
                <span className="text-base font-bold text-blue-600">&lt; 15 Mins</span>
              </div>
            </div>

            <div className="space-y-1.5">
              {decisions.map(dec => (
                <div key={dec.id} className="p-2.5 rounded-xl bg-[#F8F9FA] dark:bg-[#141414] flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[#111111] dark:text-white">{dec.item}</span>
                    <span className="text-[10px] text-[#777777] font-mono block">Hash: {dec.hash || 'Unsigned'}</span>
                  </div>
                  {dec.status === 'pending' ? (
                    <button
                      onClick={() => signDecision(dec.id)}
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition flex items-center space-x-1"
                    >
                      <Lock className="w-3 h-3" />
                      <span>Sign</span>
                    </button>
                  ) : (
                    <span className="text-[10px] font-mono text-emerald-600 font-bold">✓ Signed</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: CTO TELEMETRY */}
        {activeAdvisorTab === 'cto' && (
          <div className="grid grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-[#F8F9FA] dark:bg-[#141414] border border-[#EAEAE7] dark:border-[#282828]">
              <span className="text-[10px] text-[#888888] block">Deploy Freq</span>
              <span className="text-base font-bold text-emerald-600">&gt; 3 / Day</span>
            </div>
            <div className="p-3 rounded-xl bg-[#F8F9FA] dark:bg-[#141414] border border-[#EAEAE7] dark:border-[#282828]">
              <span className="text-[10px] text-[#888888] block">Lead Time</span>
              <span className="text-base font-bold text-emerald-600">&lt; 4 Hours</span>
            </div>
            <div className="p-3 rounded-xl bg-[#F8F9FA] dark:bg-[#141414] border border-[#EAEAE7] dark:border-[#282828]">
              <span className="text-[10px] text-[#888888] block">MTTR</span>
              <span className="text-base font-bold text-emerald-600">&lt; 20 Mins</span>
            </div>
            <div className="p-3 rounded-xl bg-[#F8F9FA] dark:bg-[#141414] border border-[#EAEAE7] dark:border-[#282828]">
              <span className="text-[10px] text-[#888888] block">Failure Rate</span>
              <span className="text-base font-bold text-emerald-600">&lt; 1.2%</span>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
