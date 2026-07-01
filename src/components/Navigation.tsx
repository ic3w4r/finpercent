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
  Coins
} from 'lucide-react';

export default function Navigation() {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState<string[]>([
    'command-center',
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

  const financialIntelligenceItems = [
    { name: 'Cash Flow', href: '/financial/cash-flow', icon: Activity },
    { name: 'Debt & EMI', href: '/financial/debt-emi', icon: PiggyBank },
    { name: 'Working Capital', href: '/financial/working-capital', icon: Briefcase },
    { name: 'Expense Leakage', href: '/financial/expense-leakage', icon: AlertTriangle },
    { name: 'STOP Method', href: '/financial/stop-method', icon: Target },
  ];

  const creditReadinessItems = [
    { name: 'Readiness Report', href: '/credit/readiness-report', icon: FileText },
    { name: 'Document Checklist', href: '/credit/document-checklist', icon: CheckCircle2 },
    { name: 'Loan Capacity', href: '/credit/loan-capacity', icon: PiggyBank },
    { name: 'Red Flags', href: '/credit/red-flags', icon: AlertTriangle },
    { name: 'Improvement Plan', href: '/credit/improvement-plan', icon: Target },
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
  ];

  const networkSupportItems = [
    { name: 'Workshops', href: '/network/workshops', icon: GraduationCap },
    { name: 'Trade Centre', href: '/network/trade-centre', icon: Zap },
    { name: 'MSME Community', href: '/network/msme-community', icon: Globe },
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
          flex items-center px-4 py-2 text-xs font-semibold rounded-xl transition-all duration-200 group
          ${isChild ? 'ml-4' : ''}
          ${active
            ? 'bg-gradient-to-r from-primary-600 to-green-600 text-white shadow-md'
            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800'
          }
        `}
      >
        <Icon className={`w-4 h-4 mr-2.5 transition-transform duration-200 ${active ? 'scale-110' : 'group-hover:scale-105'}`} />
        <span>{item.name}</span>
        {active && (
          <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
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
          className="p-2 rounded-lg bg-white dark:bg-gray-850 shadow-lg text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-gray-800"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar */}
      <nav className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 shadow-xl transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          
          {/* Branding Header */}
          <div className="flex items-center space-x-3 p-5 border-b border-gray-100 dark:border-gray-800">
            <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-green-600 rounded-xl flex items-center justify-center shadow-md">
              <div className="text-white font-black text-sm">%</div>
            </div>
            <div>
              <h1 className="text-md font-black text-primary-950 dark:text-white tracking-tight">Finpercent</h1>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">MSME Readistructure</p>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 px-3 py-4 overflow-y-auto space-y-4">
            
            {/* Group 1: Command Center */}
            <div>
              <button
                onClick={() => toggleSection('command-center')}
                className="w-full flex items-center justify-between px-3 py-1.5 text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-wider hover:text-gray-600 dark:hover:text-gray-300"
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

            {/* Group 2: Financial Intelligence */}
            <div>
              <button
                onClick={() => toggleSection('financial-intel')}
                className="w-full flex items-center justify-between px-3 py-1.5 text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-wider hover:text-gray-600 dark:hover:text-gray-300"
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
                className="w-full flex items-center justify-between px-3 py-1.5 text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-wider hover:text-gray-600 dark:hover:text-gray-300"
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
                className="w-full flex items-center justify-between px-3 py-1.5 text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-wider hover:text-gray-600 dark:hover:text-gray-300"
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
                className="w-full flex items-center justify-between px-3 py-1.5 text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-wider hover:text-gray-600 dark:hover:text-gray-300"
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
                className="w-full flex items-center justify-between px-3 py-1.5 text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-wider hover:text-gray-600 dark:hover:text-gray-300"
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
                className="w-full flex items-center justify-between px-3 py-1.5 text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-wider hover:text-gray-600 dark:hover:text-gray-300"
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
                className="w-full flex items-center justify-between px-3 py-1.5 text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-wider hover:text-gray-600 dark:hover:text-gray-300"
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
          <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/40 text-center text-[10px] text-gray-400 font-bold uppercase tracking-wider">
            Finpercent © 2026
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/40 backdrop-blur-xs"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}