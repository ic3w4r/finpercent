import React, { useState, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Home as HomeIcon,
  BarChart3 as StatsIcon,
  Layers as InvestmentIcon,
  User as ProfileIcon,
  Settings as SettingsIcon,
  Building2 as CompanyIcon,
  ChevronDown,
  ChevronRight,
  Menu,
  Target,
  PiggyBank,
  Briefcase,
  Activity,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Users,
  ShieldCheck,
  Cpu,
  GraduationCap,
  HelpCircle,
  Lock,
  Video,
  Store,
  Workflow,
  Coins,
  Sliders,
  Search,
  Sparkles,
  PanelLeftClose
} from 'lucide-react';
import { useNavigation } from '../contexts/NavigationContext';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
  badge?: string;
  isHot?: boolean;
}

interface NavSection {
  id: string;
  title: string;
  items: NavItem[];
}

export default function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isSidebarOpen, toggleSidebar, closeSidebar, isMobile } = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  // Determine which section contains the current pathname to auto-expand it
  const currentSectionId = useMemo(() => {
    const path = location.pathname;
    if (path === '/overview' || path === '/' || path === '/business-erp' || path === '/msme-readiness' || path === '/business-health' || path === '/action-plan') {
      return 'overview';
    }
    if (path.startsWith('/financial') || path.startsWith('/methods') || path.startsWith('/kakeibo')) {
      return 'financial';
    }
    if (path.startsWith('/finning-circle')) {
      return 'ecosystem';
    }
    if (path.startsWith('/credit') || path.startsWith('/capital-access') || path.startsWith('/investment-pooling')) {
      return 'credit';
    }
    if (path.startsWith('/ai-cxo') || path.startsWith('/finning-biz')) {
      return 'ai-cxo';
    }
    if (path.startsWith('/institution') || path.startsWith('/bank') || path.startsWith('/advisor') || path.startsWith('/provider')) {
      return 'portals';
    }
    return 'account';
  }, [location.pathname]);

  const [expandedSections, setExpandedSections] = useState<string[]>([currentSectionId, 'overview']);

  const navSections: NavSection[] = useMemo(() => [
    {
      id: 'overview',
      title: 'Overview & ERP',
      items: [
        { name: 'Overview Command Center', href: '/overview', icon: HomeIcon, isHot: true },
        { name: 'Business ERP (ERPNext)', href: '/business-erp', icon: InvestmentIcon, badge: 'v15 Live' },
        { name: 'MSME Readiness Engine', href: '/msme-readiness', icon: StatsIcon },
        { name: 'Business Health Matrix', href: '/business-health', icon: CompanyIcon },
        { name: 'Execution Action Plan', href: '/action-plan', icon: Target },
      ]
    },
    {
      id: 'financial',
      title: 'Financial Intelligence',
      items: [
        { name: 'Cash Flow & Runway', href: '/financial/cash-flow', icon: Activity },
        { name: 'Debt & EMI Facility', href: '/financial/debt-emi', icon: PiggyBank },
        { name: 'Working Capital Health', href: '/financial/working-capital', icon: Briefcase },
        { name: 'Expense Leakage Diagnostic', href: '/financial/expense-leakage', icon: AlertTriangle },
        { name: 'S.T.O.P Method Allocations', href: '/financial/stop-method', icon: Target },
        { name: 'Kakeibo Method Ledger', href: '/methods/kakeibo/dashboard', icon: FileText },
      ]
    },
    {
      id: 'ecosystem',
      title: 'Ecosystem & TradeStream',
      items: [
        { name: 'TradeStream Marketplace', href: '/finning-circle/marketplace', icon: Store, badge: 'Live RFQs' },
        { name: 'GST Verify & Onboarding', href: '/finning-circle/onboard', icon: ShieldCheck },
        { name: 'Product Showcase Builder', href: '/finning-circle/builder', icon: Sliders },
        { name: 'Short-Video Feed & Reels', href: '/finning-circle/discovery', icon: Video },
        { name: 'Live Product Demonstrations', href: '/finning-circle/live', icon: Video },
        { name: 'Verified SME Passport', href: '/finning-circle/passport', icon: ShieldCheck },
        { name: 'Trade Expos & Venues', href: '/finning-circle/venue', icon: CompanyIcon },
        { name: 'Interactive Workshops', href: '/finning-circle/workshops', icon: GraduationCap },
      ]
    },
    {
      id: 'credit',
      title: 'Credit Readiness & Dossier',
      items: [
        { name: 'Credit Readiness Report', href: '/credit/readiness-report', icon: FileText },
        { name: 'Lender Document Checklist', href: '/credit/document-checklist', icon: CheckCircle2 },
        { name: 'Borrowing Capacity Analyzer', href: '/credit/loan-capacity', icon: PiggyBank },
        { name: 'Covenant Red Flags Audit', href: '/credit/red-flags', icon: AlertTriangle },
        { name: 'Asset Dossier Stack', href: '/capital-access-intelligence/asset', icon: InvestmentIcon },
        { name: 'Credit-Ready Notarized File', href: '/credit/ready-file', icon: FileText },
      ]
    },
    {
      id: 'ai-cxo',
      title: 'AI-CXO & Autonomous Agents',
      items: [
        { name: 'AI-CXO Cockpit', href: '/ai-cxo/dashboard', icon: Cpu, badge: 'AI Live' },
        { name: 'Decision Engine (CGT-DBE)', href: '/ai-cxo/decision-engine', icon: Sliders },
        { name: 'Interactive Copilot Console', href: '/ai-cxo/console', icon: Workflow },
        { name: 'AI CFO (Finning Box)', href: '/ai-cxo/cfo', icon: Coins },
        { name: 'AI Operations & Dossier', href: '/ai-cxo/operations', icon: CompanyIcon },
        { name: 'Joint Agent Workflow Hub', href: '/ai-cxo/operations-officer/flow', icon: Sparkles },
      ]
    },
    {
      id: 'portals',
      title: 'Institutional Portals',
      items: [
        { name: 'Bank & NBFC Console', href: '/bank/borrower-summary', icon: ShieldCheck },
        { name: 'Institutional Portfolio', href: '/institution/portfolio', icon: Users },
        { name: 'Auditor & CA Workspace', href: '/advisor/dashboard', icon: Briefcase },
        { name: 'Financial Health Stats', href: '/stats', icon: Activity },
      ]
    },
    {
      id: 'account',
      title: 'Account & Security',
      items: [
        { name: 'Company Profile', href: '/company-profile', icon: CompanyIcon },
        { name: 'User Profile & Roles', href: '/profile', icon: ProfileIcon },
        { name: 'Data Permissions', href: '/data-permissions', icon: Lock },
        { name: 'Security & Audit Trail', href: '/security', icon: ShieldCheck },
        { name: 'Support & Help Desk', href: '/support', icon: HelpCircle },
      ]
    }
  ], []);

  // Search filtering
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return navSections;
    const q = searchQuery.toLowerCase();
    return navSections.map(sec => ({
      ...sec,
      items: sec.items.filter(it => 
        it.name.toLowerCase().includes(q) || 
        it.href.toLowerCase().includes(q)
      )
    })).filter(sec => sec.items.length > 0);
  }, [searchQuery, navSections]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const isExpanded = (sectionId: string) => expandedSections.includes(sectionId);

  const isActiveLink = (href: string) => {
    if (href === '/overview' || href === '/') {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  // Hide the sidebar completely on the Landing Page (safe unconditional hook order)
  if (location.pathname === '/') {
    return null;
  }

  return (
    <>
      {/* FLOATING COLLAPSIBLE HAMBURGER BUTTON (VISIBLE WHEN SIDEBAR IS COLLAPSED) */}
      {!isSidebarOpen && (
        <div className="fixed top-3 left-3 z-50">
          <button
            onClick={toggleSidebar}
            title="Expand Navigation (⌘B)"
            className="flex items-center space-x-2 px-3 py-2 bg-white/95 dark:bg-[#1A1A1A]/95 text-[#111111] dark:text-white border border-[#E2E2DE] dark:border-[#333333] rounded-xl shadow-sm hover:bg-[#F4F4F2] dark:hover:bg-[#252525] backdrop-blur-md transition-all active:scale-95 group"
          >
            <Menu className="w-4 h-4 text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition" />
            <span className="text-xs font-bold font-serif hidden sm:inline">Menu</span>
            <kbd className="hidden sm:inline-block text-[9px] font-mono bg-[#F4F4F2] dark:bg-[#282828] border border-[#E2E2DE] dark:border-[#3A3A3A] px-1 py-0.5 rounded text-[#777777]">
              ⌘B
            </kbd>
          </button>
        </div>
      )}

      {/* Sidebar Container */}
      <nav className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-[#F7F6F3] dark:bg-[#141414] border-r border-[#EAEAE7] dark:border-[#262626] transition-transform duration-300 ease-in-out flex flex-col justify-between
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full overflow-hidden">

          {/* Top Header: Logo, Company Selector & Collapse Trigger */}
          <div className="p-4 border-b border-[#EAEAE7] dark:border-[#262626] bg-white dark:bg-[#181818]">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5 min-w-0">
                <div className="w-7 h-7 bg-[#111111] dark:bg-white text-white dark:text-[#111111] rounded-lg flex items-center justify-center font-serif font-black text-xs shrink-0">
                  %
                </div>
                <div className="min-w-0">
                  <div className="flex items-center space-x-1.5">
                    <h1 className="text-xs font-bold text-[#111111] dark:text-white tracking-tight truncate">Finpercent</h1>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  </div>
                  <p className="text-[10px] text-[#777777] font-mono truncate">Apex Engineering • FY 25-26</p>
                </div>
              </div>

              {/* Collapse Trigger Button */}
              <button
                onClick={toggleSidebar}
                title="Collapse Sidebar (⌘B or scroll sideways)"
                className="p-1.5 rounded-lg hover:bg-[#F4F4F2] dark:hover:bg-[#252525] text-[#777777] hover:text-[#111111] dark:hover:text-white transition"
              >
                <PanelLeftClose className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Search inside Sidebar */}
            <div className="mt-3 relative">
              <Search className="w-3.5 h-3.5 text-[#888888] absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Jump to screen..."
                className="w-full pl-8 pr-2.5 py-1.5 bg-[#F4F4F2] dark:bg-[#202020] border border-[#E2E2DE] dark:border-[#333333] rounded-lg text-[11px] focus:outline-none focus:border-emerald-600 transition placeholder:text-[#999999]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-[#888888] hover:text-[#111111]"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Navigation Items (Clean Accordion Scroll) */}
          <div className="flex-1 px-3 py-3 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-700">
            {filteredSections.map(section => {
              const expanded = isExpanded(section.id) || searchQuery.trim().length > 0;
              const hasActiveChild = section.items.some(it => isActiveLink(it.href));

              return (
                <div key={section.id} className="space-y-1">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider rounded-lg transition ${
                      hasActiveChild 
                        ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-500/5' 
                        : 'text-[#888888] hover:text-[#111111] dark:hover:text-white'
                    }`}
                  >
                    <span>{section.title}</span>
                    <span className="opacity-60">
                      {expanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                    </span>
                  </button>

                  {expanded && (
                    <div className="space-y-0.5 pl-1">
                      {section.items.map(item => {
                        const Icon = item.icon;
                        const active = isActiveLink(item.href);

                        return (
                          <Link
                            key={item.href}
                            to={item.href}
                            onClick={() => {
                              if (isMobile) closeSidebar();
                            }}
                            className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition ${
                              active
                                ? 'bg-[#111111] text-white dark:bg-white dark:text-[#111111] font-bold shadow-sm'
                                : 'text-[#444444] dark:text-[#CCCCCC] hover:bg-[#EBEBE8] dark:hover:bg-[#202020] hover:text-[#111111] dark:hover:text-white font-medium'
                            }`}
                          >
                            <div className="flex items-center space-x-2 min-w-0">
                              <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${active ? 'text-emerald-400 dark:text-emerald-600' : 'text-[#777777]'}`} />
                              <span className="truncate">{item.name}</span>
                            </div>

                            {item.badge && (
                              <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-semibold ${
                                active 
                                  ? 'bg-white/20 text-white dark:bg-black/20 dark:text-black' 
                                  : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                              }`}>
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Card: Trial & User Profile */}
          <div className="p-3 border-t border-[#EAEAE7] dark:border-[#262626] bg-white dark:bg-[#181818] space-y-2">
            
            {/* Trial Status Pill */}
            <div className="p-2.5 rounded-xl bg-[#F8F9FA] dark:bg-[#202020] border border-[#EAEAE7] dark:border-[#2E2E2E] flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-bold text-[#111111] dark:text-white">Trial: 60 days left</span>
                </div>
                <p className="text-[9px] text-[#777777] font-mono">Pro access, live sync</p>
              </div>
              <button 
                onClick={() => navigate('/settings')}
                className="px-2 py-1 rounded bg-[#111111] hover:bg-[#222222] dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-[#111111] text-[10px] font-bold transition"
              >
                See plans
              </button>
            </div>

            {/* Profile Row */}
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 flex items-center justify-center text-[10px] font-bold font-mono">
                  AG
                </div>
                <div className="min-w-0">
                  <span className="block text-[11px] font-bold text-[#111111] dark:text-white truncate">Aiswaran G.</span>
                  <span className="block text-[9px] text-[#888888] font-mono">Owner / Admin</span>
                </div>
              </div>
              <Link to="/settings" className="text-[#888888] hover:text-[#111111] dark:hover:text-white">
                <SettingsIcon className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

        </div>
      </nav>

      {/* Mobile/Floating Overlay */}
      {isSidebarOpen && isMobile && (
        <div
          className="fixed inset-0 z-30 bg-black/30 backdrop-blur-[2px] transition-opacity"
          onClick={closeSidebar}
        />
      )}
    </>
  );
}