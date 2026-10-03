import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, ArrowRight, ArrowUpRight,
  Sliders, ChevronDown, 
  Send, Clock, BarChart2,
  Activity, Search, UserCheck, CheckSquare, Maximize2, LayoutGrid, Scale,
  Lock, Check, Menu, Layers
} from 'lucide-react';
import SankeyDiagram from '../components/charts/SankeyDiagram';
import CLevelExecutiveAdvisory from '../components/dashboard/CLevelExecutiveAdvisory';

import { 
  useRolePerspective, 
  ROLE_DEFINITIONS 
} from '../contexts/RolePerspectiveContext';
import { useNavigation } from '../contexts/NavigationContext';

export default function OverviewPage() {
  const navigate = useNavigate();
  const { 
    activeRole, 
    setActiveRole, 
    currentRoleConfig, 
    activeScenario, 
    updateScenario 
  } = useRolePerspective();
  const { toggleSidebar, isSidebarOpen } = useNavigation();

  // Core Global View States
  const [timeframe, setTimeframe] = useState<'today' | '30d' | 'fy'>('fy');
  const [selectedFiscalYear, setSelectedFiscalYear] = useState('FY 2025-26');
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showFiscalMenu, setShowFiscalMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Primary Workspace View Focus
  const [workspaceFocus, setWorkspaceFocus] = useState<'overview' | 'advisory' | 'capital' | 'work' | 'all'>('overview');

  // Right Side Panel Tab Focus
  const [rightPanelTab, setRightPanelTab] = useState<'chat' | 'insights' | 'sync'>('chat');

  // Right Chat Assistant states
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'user',
      text: "What's my cash position next month?"
    },
    {
      sender: 'ai',
      text: "₹1.42 Cr projected (Inflows: ₹62.2L • Payables: ₹1.12L • Safe Runway: 52d)."
    }
  ]);
  const [chatInput, setChatInput] = useState('');

  // Working Capital Parameters
  const creditDays = activeScenario.creditDays;
  const orderValue = activeScenario.orderValue;
  const supplierDays = activeScenario.supplierDays;

  const setCreditDays = (val: number) => updateScenario({ creditDays: val });
  const setSupplierDays = (val: number) => updateScenario({ supplierDays: val });
  const setOrderValue = (val: number) => updateScenario({ orderValue: val });

  // Financial Flow Filters
  const [flowCategory, setFlowCategory] = useState('All categories');

  // Actionable Work List
  const [workItems, setWorkItems] = useState([
    {
      id: 'w-1',
      item: 'Approve invoice INV-10240, Zenith Industries',
      detail: '₹8,75,000 • Due in 4 days',
      type: 'Approval',
      owner: 'Aiswaran G.',
      priority: 'High',
      status: 'pending'
    },
    {
      id: 'w-2',
      item: 'Payment run for 14 suppliers',
      detail: '₹14,50,000 • Due tomorrow',
      type: 'Payment',
      owner: 'Finance team',
      priority: 'Medium',
      status: 'pending'
    },
    {
      id: 'w-3',
      item: 'Pull forward 2 collections (hold covenant floor)',
      detail: '₹32,00,000 release',
      type: 'Alert',
      owner: 'Treasury AI',
      priority: 'High',
      status: 'pending'
    }
  ]);

  // Executive Attention Items (Action-oriented)
  const attentionItems = [
    {
      id: 'a-1',
      title: '23 invoices overdue past 30 days',
      desc: '₹1,70,40,000 • 34% of ledger',
      actionLabel: 'Inspect Aging',
      severity: 'high',
      action: () => setWorkspaceFocus('capital')
    },
    {
      id: 'a-2',
      title: 'Working Capital 45-day Gap',
      desc: 'NeoPack 15d PO vs Zenith 75d Invoice',
      actionLabel: 'Bridge Gap (OD)',
      severity: 'critical',
      action: () => {
        alert('CFO Liquidity Bridge Executed: ₹15L HDFC OD line activated (JV-2026-0105).');
      }
    },
    {
      id: 'a-3',
      title: '3 authorizations pending sign-off',
      desc: 'POs, Invoices & Payment Run (₹51.75L)',
      actionLabel: 'Sign Queue',
      severity: 'medium',
      action: () => setWorkspaceFocus('work')
    }
  ];

  // Dynamic calculations based on working capital levers
  const estimatedCashDay60 = useMemo(() => {
    const base = 12.4; // Lakhs
    const delayPenalty = (creditDays - 45) * 0.12;
    const supplierGain = (30 - supplierDays) * 0.08;
    return Math.max(2.5, +(base - delayPenalty - supplierGain).toFixed(1));
  }, [creditDays, supplierDays]);

  const projectedRunway = useMemo(() => {
    const baseRunway = 52;
    const delta = Math.round((creditDays - 55) * 0.4 + (supplierDays - 15) * 0.3);
    return Math.max(18, baseRunway - delta);
  }, [creditDays, supplierDays]);

  // Dynamic Sankey Flow Data
  const sankeyData = useMemo(() => {
    const totalSales = 24500000;
    const receivablesLocked = Math.round(totalSales * (creditDays / 120));
    const activeInflow = totalSales - receivablesLocked;
    const debtInflow = 15000000;
    const totalPool = activeInflow + debtInflow;

    const opex = Math.round(totalPool * 0.48);
    const taxes = Math.round(totalPool * 0.12);
    const debtService = Math.round(totalPool * 0.18);
    const retainedReserves = totalPool - opex - taxes - debtService;

    return {
      nodes: [
        { name: "Gross Sales Revenue", value: totalSales },
        { name: "External Credit / OD", value: debtInflow },
        { name: "Operational Capital Pool", value: totalPool },
        { name: "Operations (Opex)", value: opex },
        { name: "Statutory & Taxes", value: taxes },
        { name: "Debt Service & Interest", value: debtService },
        { name: "Liquid Reserves Buffer", value: retainedReserves },
        { name: "Receivables Locked (DSO)", value: receivablesLocked }
      ],
      links: [
        { source: 0, target: 2, value: activeInflow },
        { source: 0, target: 7, value: receivablesLocked },
        { source: 1, target: 2, value: debtInflow },
        { source: 2, target: 3, value: opex },
        { source: 2, target: 4, value: taxes },
        { source: 2, target: 5, value: debtService },
        { source: 2, target: 6, value: retainedReserves }
      ]
    };
  }, [creditDays]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput('');

    setTimeout(() => {
      let aiReply = "Telemetry shows working capital cushion adequate. Estimated break-even on day 42.";
      if (userMsg.toLowerCase().includes('delay') || userMsg.toLowerCase().includes('customer')) {
        aiReply = "Zenith and NeoPack account for 62% of overdue balances > 45d. Dunning step-2 queued.";
      } else if (userMsg.toLowerCase().includes('order') || userMsg.toLowerCase().includes('40l')) {
        aiReply = "₹40L OEM order verified with ₹12L invoice discounting or 21-day supplier term renegotiation.";
      }
      setChatMessages(prev => [...prev, { sender: 'ai', text: aiReply }]);
    }, 400);
  };

  const handleWorkAction = (id: string) => {
    setWorkItems(prev => prev.map(w => w.id === id ? { ...w, status: 'completed' } : w));
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5] dark:bg-[#121212] text-[#1E1E1E] dark:text-[#E6E6E6] font-sans antialiased pb-24 selection:bg-emerald-500/20">
      
      {/* TOP COMMAND BAR: COMPACT, CRISP & BUTTON-DRIVEN */}
      <header className="sticky top-0 z-40 bg-[#FFFFFF]/95 dark:bg-[#161616]/95 backdrop-blur-md border-b border-[#EAEAE7] dark:border-[#262626] px-6 py-3">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4">
          
          {/* Left: Hamburger & Entity Badge & Sync Indicator */}
          <div className="flex items-center space-x-2.5">
            <button
              onClick={toggleSidebar}
              title={isSidebarOpen ? "Collapse Sidebar (⌘B)" : "Expand Sidebar (⌘B)"}
              className="p-1.5 rounded-xl hover:bg-[#F4F4F2] dark:hover:bg-[#202020] text-[#777777] hover:text-[#111111] dark:hover:text-white border border-transparent hover:border-[#E2E2DE] dark:hover:border-[#333333] transition active:scale-95"
            >
              <Menu className="w-4 h-4" />
            </button>

            <div className="relative">
              <button 
                onClick={() => setShowFiscalMenu(!showFiscalMenu)}
                className="flex items-center space-x-2 px-3 py-1.5 bg-[#F4F4F2] dark:bg-[#202020] hover:bg-[#EBEBE8] dark:hover:bg-[#2A2A2A] rounded-xl border border-[#E2E2DE] dark:border-[#333333] transition text-xs font-semibold"
              >
                <Building2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="font-bold">Apex Engineering</span>
                <span className="text-[#888888] font-mono text-[10px]">{selectedFiscalYear}</span>
                <ChevronDown className="w-3 h-3 text-[#888888]" />
              </button>

              {showFiscalMenu && (
                <div className="absolute top-full left-0 mt-1 w-44 bg-white dark:bg-[#1E1E1E] border border-[#E2E2DE] dark:border-[#333333] rounded-xl shadow-xl p-1 z-50 text-xs">
                  {['FY 2025-26', 'FY 2024-25', 'FY 2023-24'].map(fy => (
                    <button
                      key={fy}
                      onClick={() => { setSelectedFiscalYear(fy); setShowFiscalMenu(false); }}
                      className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-[#F4F4F2] dark:hover:bg-[#282828] font-medium"
                    >
                      {fy}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Tally + HDFC Sync</span>
            </div>
          </div>

          {/* Center: Search & Navigation */}
          <div className="w-full max-w-sm relative hidden md:block">
            <Search className="w-3.5 h-3.5 text-[#999999] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search ledger, vouchers, or ask AI..."
              className="w-full pl-9 pr-10 py-1.5 bg-[#F4F4F2] dark:bg-[#202020] border border-[#E2E2DE] dark:border-[#333333] rounded-xl text-xs focus:bg-white dark:focus:bg-[#181818] focus:border-neutral-900 dark:focus:border-neutral-300 focus:outline-none transition placeholder:text-[#999999]"
            />
            <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] font-mono bg-white dark:bg-[#181818] border border-[#E2E2DE] dark:border-[#333333] px-1.5 py-0.5 rounded text-[#888888]">
              ⌘K
            </kbd>
          </div>

          {/* Right: Role Switcher & Direct Module Jump Buttons */}
          <div className="flex items-center space-x-2">
            
            {/* Perspective Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowRoleMenu(!showRoleMenu)}
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 rounded-xl text-xs font-semibold transition"
              >
                <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-bold">{currentRoleConfig.name.split(' ')[0]}</span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>

              {showRoleMenu && (
                <div className="absolute top-full right-0 mt-1 w-64 bg-white dark:bg-[#1E1E1E] border border-[#E2E2DE] dark:border-[#333333] rounded-2xl shadow-xl p-1.5 z-50 text-xs divide-y divide-[#F0F0EE] dark:divide-[#282828]">
                  {Object.values(ROLE_DEFINITIONS).map(role => (
                    <button
                      key={role.id}
                      onClick={() => { setActiveRole(role.id); setShowRoleMenu(false); }}
                      className={`w-full text-left p-2.5 rounded-xl transition flex items-start space-x-2 ${
                        activeRole === role.id 
                          ? 'bg-emerald-500/10 text-emerald-900 dark:text-emerald-200 font-bold' 
                          : 'hover:bg-[#F4F4F2] dark:hover:bg-[#282828]'
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-xs">{role.name}</span>
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-neutral-200 dark:bg-neutral-800">
                            {role.roleBadge.split(' ')[0]}
                          </span>
                        </div>
                        <p className="text-[10px] text-[#777777] truncate">{role.title}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* C-Level Advisory Toggle */}
            <button
              onClick={() => setWorkspaceFocus(workspaceFocus === 'advisory' ? 'overview' : 'advisory')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 shadow-sm ${
                workspaceFocus === 'advisory'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Advisory War Room</span>
            </button>

            {/* ERPNext Direct Bridge */}
            <button
              onClick={() => navigate('/business-erp')}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center space-x-1.5 shadow-sm"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>ERPNext</span>
            </button>
          </div>

        </div>
      </header>

      {/* FOCUS MODE BAR: CLEAN PILL BUTTONS */}
      <div className="bg-white dark:bg-[#181818] border-b border-[#EAEAE7] dark:border-[#262626] px-6 py-2.5">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between overflow-x-auto scrollbar-none">
          <div className="flex items-center space-x-1.5 min-w-max">
            {[
              { id: 'overview', label: 'Executive Overview', icon: LayoutGrid },
              { id: 'advisory', label: 'C-Level Advisory Board', icon: Scale, badge: 'Live Review' },
              { id: 'capital', label: 'Capital & Working Capital Studio', icon: BarChart2 },
              { id: 'work', label: 'Operations & Work Queue', icon: CheckSquare, count: workItems.filter(w => w.status === 'pending').length },
              { id: 'all', label: 'Full Panorama', icon: Maximize2 }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = workspaceFocus === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setWorkspaceFocus(tab.id as any)}
                  className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                    isActive 
                      ? 'bg-[#111111] text-white dark:bg-white dark:text-[#111111] shadow-sm' 
                      : 'text-[#666666] hover:text-[#111111] dark:hover:text-white hover:bg-[#F4F4F2] dark:hover:bg-[#252525]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/20 text-white dark:bg-black/20 dark:text-black' : 'bg-red-500/15 text-red-700 dark:text-red-400 font-bold'}`}>
                      {tab.count}
                    </span>
                  )}
                  {tab.badge && (
                    <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${isActive ? 'bg-emerald-500 text-white' : 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 font-bold'}`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center space-x-1.5 bg-[#F4F4F2] dark:bg-[#222222] p-1 rounded-xl border border-[#E2E2DE] dark:border-[#333333]">
            {(['today', '30d', 'fy'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-2.5 py-0.5 rounded-lg text-[10px] font-semibold uppercase font-mono transition ${
                  timeframe === t 
                    ? 'bg-white dark:bg-[#111111] text-[#111111] dark:text-white shadow-sm' 
                    : 'text-[#777777] hover:text-[#111111]'
                }`}
              >
                {t === 'today' ? 'Today' : t === '30d' ? '30d' : 'FY 25-26'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN VIEWPORT */}
      <main className="max-w-[1600px] mx-auto px-6 pt-5 space-y-6">

        {/* C-LEVEL ADVISORY WAR ROOM VIEW */}
        {workspaceFocus === 'advisory' && (
          <CLevelExecutiveAdvisory />
        )}

        {/* EXECUTIVE KPI PULSE BAR (Visible in overview and full panorama) */}
        {(workspaceFocus === 'overview' || workspaceFocus === 'all') && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            
            {/* KPI 1: Cash in Bank */}
            <div 
              onClick={() => setWorkspaceFocus('capital')}
              className="p-4 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-[#EAEAE7] dark:border-[#282828] hover:border-emerald-500/50 cursor-pointer transition shadow-sm group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-[#777777]">Cash in Bank</span>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-700 font-bold">+6.0%</span>
              </div>
              <div className="text-lg font-bold font-mono text-[#111111] dark:text-white mt-1">₹1,24,50,000</div>
              <div className="text-[10px] font-mono text-[#888888] mt-0.5 flex justify-between">
                <span>Runway: {projectedRunway}d</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition text-emerald-600" />
              </div>
            </div>

            {/* KPI 2: Receivables (DSO) */}
            <div 
              onClick={() => setWorkspaceFocus('capital')}
              className="p-4 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-[#EAEAE7] dark:border-[#282828] hover:border-amber-500/50 cursor-pointer transition shadow-sm group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-[#777777]">Receivables</span>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-red-500/10 text-red-700 font-bold">23 Overdue</span>
              </div>
              <div className="text-lg font-bold font-mono text-[#111111] dark:text-white mt-1">₹2,38,70,000</div>
              <div className="text-[10px] font-mono text-[#888888] mt-0.5 flex justify-between">
                <span>DSO: {creditDays}d</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition text-amber-600" />
              </div>
            </div>

            {/* KPI 3: Payables */}
            <div 
              onClick={() => setWorkspaceFocus('work')}
              className="p-4 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-[#EAEAE7] dark:border-[#282828] hover:border-blue-500/50 cursor-pointer transition shadow-sm group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-[#777777]">Payables</span>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-700 font-bold">14 Due</span>
              </div>
              <div className="text-lg font-bold font-mono text-[#111111] dark:text-white mt-1">₹1,12,30,000</div>
              <div className="text-[10px] font-mono text-[#888888] mt-0.5 flex justify-between">
                <span>Cycle: {supplierDays}d</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition text-blue-600" />
              </div>
            </div>

            {/* KPI 4: Net Cash Flow */}
            <div 
              onClick={() => setWorkspaceFocus('capital')}
              className="p-4 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-[#EAEAE7] dark:border-[#282828] hover:border-emerald-500/50 cursor-pointer transition shadow-sm group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-[#777777]">Net Cash Flow</span>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-700 font-bold">+12.4%</span>
              </div>
              <div className="text-lg font-bold font-mono text-emerald-700 dark:text-emerald-400 mt-1">₹68,40,000</div>
              <div className="text-[10px] font-mono text-[#888888] mt-0.5 flex justify-between">
                <span>Free Cash: ₹42.8L</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition text-emerald-600" />
              </div>
            </div>

            {/* KPI 5: Health & Covenant */}
            <div 
              onClick={() => setWorkspaceFocus('advisory')}
              className="p-4 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-[#EAEAE7] dark:border-[#282828] hover:border-purple-500/50 cursor-pointer transition shadow-sm group col-span-2 md:col-span-1"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-[#777777]">Health Score</span>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-700 font-bold">Compliant</span>
              </div>
              <div className="text-lg font-bold font-mono text-[#111111] dark:text-white mt-1">76 / 100</div>
              <div className="text-[10px] font-mono text-[#888888] mt-0.5 flex justify-between">
                <span>B+ Prime Band</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition text-purple-600" />
              </div>
            </div>

          </div>
        )}

        {/* ROW 2: RECONCILED FINANCIAL FLOW SANKEY + COPILOT */}
        {(workspaceFocus === 'overview' || workspaceFocus === 'all') && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Financial Flow Sankey (8 Cols) */}
            <div className="lg:col-span-8 space-y-4">
              
              <div className="p-5 rounded-3xl bg-white dark:bg-[#1A1A1A] border border-[#EAEAE7] dark:border-[#282828] shadow-sm space-y-4">
                
                {/* Header Controls */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[#F0F0EE] dark:border-[#282828] pb-3">
                  <div className="flex items-center space-x-2">
                    <Activity className="w-4 h-4 text-emerald-600" />
                    <h2 className="text-sm font-bold text-[#111111] dark:text-white">Reconciled Financial Flow</h2>
                  </div>

                  <div className="flex items-center space-x-2">
                    <select
                      value={flowCategory}
                      onChange={e => setFlowCategory(e.target.value)}
                      className="px-2.5 py-1 bg-[#F4F4F2] dark:bg-[#252525] border border-[#E2E2DE] dark:border-[#333333] rounded-xl text-xs font-semibold focus:outline-none"
                    >
                      <option value="All categories">All Categories</option>
                      <option value="Operating Only">Operating Only</option>
                      <option value="Treasury & OD">Treasury & OD</option>
                    </select>

                    <button
                      onClick={() => setWorkspaceFocus('capital')}
                      className="px-3 py-1 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs font-bold transition flex items-center space-x-1"
                    >
                      <Sliders className="w-3 h-3" />
                      <span>Capital Levers</span>
                    </button>
                  </div>
                </div>

                {/* Sankey Component */}
                <div className="w-full h-80 relative overflow-hidden rounded-2xl bg-[#FAFAFA] dark:bg-[#141414] p-3 border border-[#F0F0EE] dark:border-[#252525]">
                  <SankeyDiagram data={sankeyData} />
                </div>

                {/* Interactive Direct Action Levers */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  {attentionItems.map(item => (
                    <div 
                      key={item.id}
                      className="p-3 rounded-2xl bg-[#F8F9FA] dark:bg-[#141414] border border-[#EAEAE7] dark:border-[#282828] flex flex-col justify-between space-y-2"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[10px] font-mono">
                          <span className="font-bold text-[#111111] dark:text-white truncate">{item.title}</span>
                          <span className={`w-2 h-2 rounded-full ${item.severity === 'critical' ? 'bg-red-500' : item.severity === 'high' ? 'bg-amber-500' : 'bg-blue-500'}`} />
                        </div>
                        <p className="text-[11px] text-[#777777] mt-0.5">{item.desc}</p>
                      </div>

                      <button
                        onClick={item.action}
                        className="w-full py-1.5 bg-white dark:bg-[#202020] hover:bg-neutral-100 dark:hover:bg-[#282828] border border-[#E2E2DE] dark:border-[#333333] rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1 text-[#111111] dark:text-white"
                      >
                        <span>{item.actionLabel}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>

              </div>

            </div>

            {/* Right Column: Intelligence Copilot & Action Panel (4 Cols) */}
            <div className="lg:col-span-4 space-y-4">
              
              <div className="p-5 rounded-3xl bg-white dark:bg-[#1A1A1A] border border-[#EAEAE7] dark:border-[#282828] shadow-sm space-y-4">
                
                {/* Right Panel Tabs */}
                <div className="flex items-center justify-between border-b border-[#F0F0EE] dark:border-[#282828] pb-2.5">
                  <div className="flex items-center space-x-1 bg-[#F4F4F2] dark:bg-[#222222] p-1 rounded-xl">
                    <button
                      onClick={() => setRightPanelTab('chat')}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                        rightPanelTab === 'chat' 
                          ? 'bg-white dark:bg-[#111111] text-[#111111] dark:text-white shadow-sm' 
                          : 'text-[#777777]'
                      }`}
                    >
                      Copilot
                    </button>
                    <button
                      onClick={() => setRightPanelTab('insights')}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                        rightPanelTab === 'insights' 
                          ? 'bg-white dark:bg-[#111111] text-[#111111] dark:text-white shadow-sm' 
                          : 'text-[#777777]'
                      }`}
                    >
                      Insights
                    </button>
                  </div>

                  <span className="text-[10px] font-mono text-emerald-600 font-bold">SHA-256 Validated</span>
                </div>

                {/* Copilot Chat */}
                {rightPanelTab === 'chat' && (
                  <div className="space-y-3">
                    <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                      {chatMessages.map((msg, idx) => (
                        <div 
                          key={idx} 
                          className={`p-3 rounded-2xl text-xs ${
                            msg.sender === 'user' 
                              ? 'bg-[#111111] text-white ml-6' 
                              : 'bg-[#F8F9FA] dark:bg-[#151515] text-[#111111] dark:text-[#E0E0E0] border border-[#EAEAE7] dark:border-[#282828] mr-4'
                          }`}
                        >
                          {msg.text}
                        </div>
                      ))}
                    </div>

                    <form onSubmit={handleSendMessage} className="relative">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={e => setChatInput(e.target.value)}
                        placeholder="Ask Copilot..."
                        className="w-full pl-3 pr-9 py-2 bg-[#F4F4F2] dark:bg-[#202020] border border-[#E2E2DE] dark:border-[#333333] rounded-xl text-xs focus:outline-none focus:border-emerald-600"
                      />
                      <button
                        type="submit"
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-emerald-600 text-white rounded-lg"
                      >
                        <Send className="w-3 h-3" />
                      </button>
                    </form>
                  </div>
                )}

                {/* Quick Insights List */}
                {rightPanelTab === 'insights' && (
                  <div className="space-y-2 text-xs">
                    <div className="p-3 rounded-2xl bg-[#F8F9FA] dark:bg-[#141414] border border-[#EAEAE7] dark:border-[#282828] space-y-1">
                      <span className="text-[10px] font-mono text-emerald-600 font-bold uppercase">Working Capital</span>
                      <p className="font-medium text-[#111111] dark:text-white">DSO at {creditDays}d creates a 45d gap with supplier terms.</p>
                      <button 
                        onClick={() => navigate('/business-erp')}
                        className="text-[10px] font-bold text-blue-600 flex items-center space-x-1 pt-1"
                      >
                        <span>Open in ERPNext</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="p-3 rounded-2xl bg-[#F8F9FA] dark:bg-[#141414] border border-[#EAEAE7] dark:border-[#282828] space-y-1">
                      <span className="text-[10px] font-mono text-purple-600 font-bold uppercase">GST 3B Filing</span>
                      <p className="font-medium text-[#111111] dark:text-white">GSTR-2B input tax credit matched (₹2,28,814).</p>
                    </div>
                  </div>
                )}

              </div>

            </div>

          </div>
        )}

        {/* CAPITAL & WORKING CAPITAL STUDIO */}
        {(workspaceFocus === 'capital' || workspaceFocus === 'all') && (
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1A1A1A] border border-[#EAEAE7] dark:border-[#282828] shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[#F0F0EE] dark:border-[#282828] pb-3">
              <div>
                <h3 className="text-sm font-bold text-[#111111] dark:text-white flex items-center space-x-2">
                  <Sliders className="w-4 h-4 text-emerald-600" />
                  <span>Working Capital & Liquidity Levers</span>
                </h3>
                <p className="text-xs text-[#777777]">Calibrate customer credit terms, procurement cycles, and order capacity.</p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => { setCreditDays(75); setSupplierDays(15); setOrderValue(4000000); }}
                  className="px-3 py-1 bg-[#F4F4F2] dark:bg-[#252525] rounded-xl text-xs font-semibold"
                >
                  Reset Defaults
                </button>
                <button
                  onClick={() => setWorkspaceFocus('advisory')}
                  className="px-3 py-1 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center space-x-1"
                >
                  <span>C-Level Board Review</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Slider 1: Customer Credit Days */}
              <div className="p-4 rounded-2xl bg-[#F8F9FA] dark:bg-[#141414] border border-[#EAEAE7] dark:border-[#282828] space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-[#111111] dark:text-white">Customer Credit Term (DSO)</span>
                  <span className="font-mono font-bold text-amber-600">{creditDays} Days</span>
                </div>
                <input
                  type="range"
                  min={30}
                  max={120}
                  step={5}
                  value={creditDays}
                  onChange={e => setCreditDays(Number(e.target.value))}
                  className="w-full accent-amber-600"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#888888]">
                  <span>30 Days (Fast)</span>
                  <span>120 Days (Slow)</span>
                </div>
              </div>

              {/* Slider 2: Supplier Payment Days */}
              <div className="p-4 rounded-2xl bg-[#F8F9FA] dark:bg-[#141414] border border-[#EAEAE7] dark:border-[#282828] space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-[#111111] dark:text-white">Supplier Payment Term (DPO)</span>
                  <span className="font-mono font-bold text-emerald-600">{supplierDays} Days</span>
                </div>
                <input
                  type="range"
                  min={7}
                  max={60}
                  step={1}
                  value={supplierDays}
                  onChange={e => setSupplierDays(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#888888]">
                  <span>7 Days (Cash)</span>
                  <span>60 Days (Extended)</span>
                </div>
              </div>

              {/* Slider 3: OEM Order Pipeline */}
              <div className="p-4 rounded-2xl bg-[#F8F9FA] dark:bg-[#141414] border border-[#EAEAE7] dark:border-[#282828] space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-[#111111] dark:text-white">New OEM Order Value</span>
                  <span className="font-mono font-bold text-blue-600">₹{(orderValue / 100000).toFixed(0)} Lakhs</span>
                </div>
                <input
                  type="range"
                  min={1000000}
                  max={10000000}
                  step={500000}
                  value={orderValue}
                  onChange={e => setOrderValue(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#888888]">
                  <span>₹10L</span>
                  <span>₹1.0 Cr</span>
                </div>
              </div>

            </div>

            {/* Projected Liquidity Outlook */}
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-300 uppercase font-bold">Projected Liquidity Outlook</span>
                <div className="text-sm font-bold text-emerald-900 dark:text-emerald-100">
                  Estimated Day-60 Cash Cushion: ₹{estimatedCashDay60} Lakhs • Safe Runway: {projectedRunway} Days
                </div>
              </div>

              <button
                onClick={() => navigate('/business-erp')}
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center space-x-1"
              >
                <span>Open in ERPNext Module</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        )}

        {/* OPERATIONS & WORK QUEUE VIEW */}
        {(workspaceFocus === 'work' || workspaceFocus === 'all') && (
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1A1A1A] border border-[#EAEAE7] dark:border-[#282828] shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#F0F0EE] dark:border-[#282828] pb-3">
              <div className="flex items-center space-x-2">
                <CheckSquare className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-[#111111] dark:text-white">Active Operational Work Queue</h3>
              </div>
              <span className="text-[10px] font-mono text-neutral-400">Zero-Trust Cryptographic Action Queue</span>
            </div>

            <div className="space-y-2">
              {workItems.map(item => (
                <div 
                  key={item.id} 
                  className="p-3.5 rounded-2xl bg-[#F8F9FA] dark:bg-[#141414] border border-[#EAEAE7] dark:border-[#282828] flex items-center justify-between gap-4 text-xs"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-xl ${item.status === 'completed' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-neutral-200 dark:bg-neutral-800'}`}>
                      {item.status === 'completed' ? <Check className="w-4 h-4" /> : <Clock className="w-4 h-4 text-neutral-500" />}
                    </div>
                    <div>
                      <div className="font-bold text-[#111111] dark:text-white">{item.item}</div>
                      <div className="text-[10px] text-[#777777] font-mono">{item.detail} • Owner: {item.owner}</div>
                    </div>
                  </div>

                  <div>
                    {item.status === 'completed' ? (
                      <span className="text-[10px] font-mono text-emerald-600 font-bold">Executed</span>
                    ) : (
                      <button
                        onClick={() => handleWorkAction(item.id)}
                        className="px-3.5 py-1.5 bg-[#111111] hover:bg-[#222222] dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-[#111111] rounded-xl text-xs font-bold transition flex items-center space-x-1"
                      >
                        <Lock className="w-3 h-3" />
                        <span>Sign & Authorize</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

    </div>
  );
}
