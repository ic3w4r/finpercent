import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home as HomeIcon,
  BarChart3 as StatsIcon,
  TrendingUp as StockMarketIcon,
  Layers as InvestmentIcon,
  User as ProfileIcon,
  Settings as SettingsIcon,
  Building2 as CompanyIcon,
  ChevronDown,
  ChevronRight,
  Zap,
  Menu,
  X,
  Target,
  PiggyBank,
  Globe,
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
  Sliders
} from 'lucide-react';

export default function Navigation() {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState<string[]>([
    'command-center',
    'finning-circle',
    'financial-intel',
    'credit-readiness',
    'capital-access',
    'ai-cxo-suite',
    'network-support',
    'partner-portals',
    'account'
  ]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Hide the sidebar completely on the Landing Page
  if (location.pathname === '/') {
    return null;
  }

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const isExpanded = (sectionId: string) => expandedSections.includes(sectionId);

  const commandCenterItems = [
    { name: 'Overview', href: '/overview', icon: HomeIcon },
    { name: 'MSME Readiness', href: '/msme-readiness', icon: StatsIcon },
    { name: 'Business Health', href: '/business-health', icon: CompanyIcon },
    { name: 'Action Plan', href: '/action-plan', icon: Target },
  ];

  const finningCircleItems = [
    { name: 'Ecosystem Pathway', href: '/finning-circle/gateway', icon: Target },
    { name: 'GST Verify & Onboard', href: '/finning-circle/onboard', icon: ShieldCheck },
    { name: 'Product Showcase Builder', href: '/finning-circle/builder', icon: Sliders },
    { name: 'TradeStream Marketplace', href: '/finning-circle/marketplace', icon: Store },
    { name: 'Trade Dashboard', href: '/finning-circle/dashboard', icon: Globe },
    { name: 'Short-Video Feed', href: '/finning-circle/discovery', icon: Video },
    { name: 'Live Product Demos', href: '/finning-circle/live', icon: Video },
    { name: 'Workshops', href: '/finning-circle/workshops', icon: GraduationCap },
    { name: 'Trade Venues & Expos', href: '/finning-circle/venue', icon: CompanyIcon },
    { name: 'Verified SME Passport', href: '/finning-circle/passport', icon: ShieldCheck },
  ];

  const financialIntelligenceItems = [
    { name: 'Cash Flow', href: '/financial/cash-flow', icon: Activity },
    { name: 'Debt & EMI', href: '/financial/debt-emi', icon: PiggyBank },
    { name: 'Working Capital', href: '/financial/working-capital', icon: Briefcase },
    { name: 'Working-Capital Diagnostic', href: '/financial/diagnostic', icon: Sliders },
    { name: 'Expense Leakage', href: '/financial/expense-leakage', icon: AlertTriangle },
    { name: 'STOP Method', href: '/financial/stop-method', icon: Target },
  ];

  const creditReadinessItems = [
    { name: 'Readiness Report', href: '/credit/readiness-report', icon: FileText },
    { name: 'Document Checklist', href: '/credit/document-checklist', icon: CheckCircle2 },
    { name: 'Loan Capacity', href: '/credit/loan-capacity', icon: PiggyBank },
    { name: 'Red Flags', href: '/credit/red-flags', icon: AlertTriangle },
    { name: 'Improvement Plan', href: '/credit/improvement-plan', icon: Target },
    { name: 'Credit-Ready File', href: '/credit/ready-file', icon: FileText },
  ];

  const capitalAccessItems = [
    { name: 'Asset Dossier Stack', href: '/capital-access-intelligence/asset', icon: InvestmentIcon },
    { name: 'Operations Capital', href: '/capital-access-intelligence/operations', icon: Zap },
  ];

  const aiCxoSuiteItems = [
    { name: 'AI-CXO Cockpit (Overview)', href: '/ai-cxo/dashboard', icon: Cpu },
    { name: 'Interactive Console', href: '/ai-cxo/console', icon: Workflow },
    { name: 'AI CFO (Finning Box)', href: '/ai-cxo/cfo', icon: Coins },
    { name: 'AI Credit Officer', href: '/ai-cxo/credit', icon: Target },
    { name: 'AI Operations (Dossier)', href: '/ai-cxo/operations', icon: CompanyIcon },
    { name: 'AI Growth (CMO & Comm)', href: '/ai-cxo/growth', icon: StockMarketIcon },
  ];

  const partnerPortalItems = [
    { name: 'Institution Dashboard', href: '/institution/portfolio', icon: Users },
    { name: 'Bank & NBFC Console', href: '/bank/borrower-summary', icon: ShieldCheck },
    { name: 'Advisor Portal', href: '/advisor/dashboard', icon: Briefcase },
    { name: 'Provider Console', href: '/provider/dashboard', icon: Sliders },
  ];

  const networkSupportItems = [
    { name: 'Support', href: '/support', icon: HelpCircle },
  ];

  const accountSettingsItems = [
    { name: 'Profile', href: '/profile', icon: ProfileIcon },
    { name: 'Settings', href: '/settings', icon: SettingsIcon },
    { name: 'Company Profile', href: '/company-profile', icon: CompanyIcon },
    { name: 'Data Permissions', href: '/data-permissions', icon: Lock },
    { name: 'Security Audit', href: '/security', icon: ShieldCheck },
  ];

  const isActiveLink = (href: string) => {
    if (href === '/overview' || href === '/') {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  const NavLink = ({
    item,
    isChild = false
  }: {
    item: { name: string; href: string; icon: React.ComponentType<any> };
    isChild?: boolean;
  }) => {
    const Icon = item.icon;
    const active = isActiveLink(item.href);

    return (
      <Link
        to={item.href}
        onClick={() => setIsMobileMenuOpen(false)}
        className={`
          flex items-center px-4 py-2 text-xs font-medium rounded transition-all duration-200 group
          ${isChild ? 'ml-4' : ''}
          ${active
            ? 'bg-primary-950 text-white dark:bg-primary-50 dark:text-black font-semibold'
            : 'text-neutral-700 hover:bg-neutral-200/50 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800/50'
          }
        `}
      >
        <Icon className="w-4 h-4 mr-2.5" />
        <span>{item.name}</span>
        {active && (
          <div className="ml-auto w-1.5 h-1.5 bg-white dark:bg-black rounded-full" />
        )}
      </Link>
    );
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded bg-accent-50 text-neutral-700 border border-accent-200"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar */}
      <nav className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-accent-50 border-r border-accent-200 transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          
          {/* Branding Header */}
          <div className="flex items-center space-x-3 p-5 border-b border-accent-200">
            <div className="w-8 h-8 bg-primary-950 dark:bg-primary-50 rounded flex items-center justify-center">
              <div className="text-white dark:text-black font-black text-sm">%</div>
            </div>
            <div>
              <h1 className="text-sm font-serif font-normal text-primary-950 dark:text-white tracking-tight">Finpercent</h1>
              <p className="text-[9px] text-primary-400 font-bold uppercase tracking-wider font-mono">MSME Readistructure</p>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 px-3 py-4 overflow-y-auto space-y-4">
            
            {/* Group 1: Command Center */}
            <div>
              <button
                onClick={() => toggleSection('command-center')}
                className="w-full flex items-center justify-between px-3 py-1.5 text-[9px] font-bold text-primary-450 dark:text-primary-400 uppercase tracking-wider hover:text-primary-600 font-mono"
              >
                <span>Command Center</span>
                {isExpanded('command-center') ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
              </button>
              {isExpanded('command-center') && (
                <div className="mt-1.5 space-y-1">
                  {commandCenterItems.map(item => (
                    <NavLink key={item.name} item={item} />
                  ))}
                </div>
              )}
            </div>

            {/* Group: Finning Circle (TradeStream) */}
            <div>
              <button
                onClick={() => toggleSection('finning-circle')}
                className="w-full flex items-center justify-between px-3 py-1.5 text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider hover:text-emerald-700 font-mono"
              >
                <span>Finning Circle (TradeStream)</span>
                {isExpanded('finning-circle') ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
              </button>
              {isExpanded('finning-circle') && (
                <div className="mt-1.5 space-y-1">
                  {finningCircleItems.map(item => (
                    <NavLink key={item.name} item={item} />
                  ))}
                </div>
              )}
            </div>

            {/* Group 2: Financial Intelligence */}
            <div>
              <button
                onClick={() => toggleSection('financial-intel')}
                className="w-full flex items-center justify-between px-3 py-1.5 text-[9px] font-bold text-primary-455 dark:text-primary-400 uppercase tracking-wider hover:text-primary-600 font-mono"
              >
                <span>Financial Intelligence</span>
                {isExpanded('financial-intel') ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
              </button>
              {isExpanded('financial-intel') && (
                <div className="mt-1.5 space-y-1">
                  {financialIntelligenceItems.map(item => (
                    <NavLink key={item.name} item={item} />
                  ))}
                </div>
              )}
            </div>

            {/* Group 3: Credit Readiness */}
            <div>
              <button
                onClick={() => toggleSection('credit-readiness')}
                className="w-full flex items-center justify-between px-3 py-1.5 text-[9px] font-bold text-primary-460 dark:text-primary-400 uppercase tracking-wider hover:text-primary-600 font-mono"
              >
                <span>Credit Readiness</span>
                {isExpanded('credit-readiness') ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
              </button>
              {isExpanded('credit-readiness') && (
                <div className="mt-1.5 space-y-1">
                  {creditReadinessItems.map(item => (
                    <NavLink key={item.name} item={item} />
                  ))}
                </div>
              )}
            </div>

            {/* Group 4: Capital Access Intelligence */}
            <div>
              <button
                onClick={() => toggleSection('capital-access')}
                className="w-full flex items-center justify-between px-3 py-1.5 text-[9px] font-bold text-primary-465 dark:text-primary-400 uppercase tracking-wider hover:text-primary-600 font-mono"
              >
                <span>Capital Access IQ</span>
                {isExpanded('capital-access') ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
              </button>
              {isExpanded('capital-access') && (
                <div className="mt-1.5 space-y-1">
                  {capitalAccessItems.map(item => (
                    <NavLink key={item.name} item={item} />
                  ))}
                </div>
              )}
            </div>

            {/* Group 5: AI-CXO Suite */}
            <div>
              <button
                onClick={() => toggleSection('ai-cxo-suite')}
                className="w-full flex items-center justify-between px-3 py-1.5 text-[9px] font-bold text-primary-470 dark:text-primary-400 uppercase tracking-wider hover:text-primary-600 font-mono"
              >
                <span>AI-CXO Suite</span>
                {isExpanded('ai-cxo-suite') ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
              </button>
              {isExpanded('ai-cxo-suite') && (
                <div className="mt-1.5 space-y-1">
                  {aiCxoSuiteItems.map(item => (
                    <NavLink key={item.name} item={item} />
                  ))}
                </div>
              )}
            </div>

            {/* Group 6: Network and Support */}
            <div>
              <button
                onClick={() => toggleSection('network-support')}
                className="w-full flex items-center justify-between px-3 py-1.5 text-[9px] font-bold text-primary-475 dark:text-primary-400 uppercase tracking-wider hover:text-primary-600 font-mono"
              >
                <span>Network & Support</span>
                {isExpanded('network-support') ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
              </button>
              {isExpanded('network-support') && (
                <div className="mt-1.5 space-y-1">
                  {networkSupportItems.map(item => (
                    <NavLink key={item.name} item={item} />
                  ))}
                </div>
              )}
            </div>

            {/* Group 7: Lender & Institutional Portals */}
            <div>
              <button
                onClick={() => toggleSection('partner-portals')}
                className="w-full flex items-center justify-between px-3 py-1.5 text-[9px] font-bold text-primary-480 dark:text-primary-400 uppercase tracking-wider hover:text-primary-600 font-mono"
              >
                <span>Partner Portals</span>
                {isExpanded('partner-portals') ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
              </button>
              {isExpanded('partner-portals') && (
                <div className="mt-1.5 space-y-1">
                  {partnerPortalItems.map(item => (
                    <NavLink key={item.name} item={item} />
                  ))}
                </div>
              )}
            </div>

            {/* Group 8: Account Settings */}
            <div>
              <button
                onClick={() => toggleSection('account')}
                className="w-full flex items-center justify-between px-3 py-1.5 text-[9px] font-bold text-primary-485 dark:text-primary-400 uppercase tracking-wider hover:text-primary-600 font-mono"
              >
                <span>Account settings</span>
                {isExpanded('account') ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
              </button>
              {isExpanded('account') && (
                <div className="mt-1.5 space-y-1">
                  {accountSettingsItems.map(item => (
                    <NavLink key={item.name} item={item} />
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Footer */}
          <div className="p-4 border-t border-accent-200 bg-accent-50 text-center text-[9px] text-primary-400 font-bold uppercase tracking-wider font-mono">
            Finpercent © 2026
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/10 backdrop-blur-[2px]"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}