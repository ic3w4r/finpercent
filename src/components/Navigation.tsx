import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home as HomeIcon,
  Search as ExploreIcon,
  BarChart3 as StatsIcon,
  Star as SuperFeaturesIcon,
  TrendingUp as StockMarketIcon,
  Layers as InvestmentIcon,
  DollarSign as FinningIcon,
  User as ProfileIcon,
  Settings as SettingsIcon,
  Building2 as CompanyIcon,
  ChevronDown,
  ChevronRight,
  Zap,
  Menu,
  X
} from 'lucide-react';
// import ThemeToggle from './ThemeToggle';

interface NavigationProps {}

export default function Navigation({}: NavigationProps) {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState<string[]>(['super-features', 'stock-market']);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const isExpanded = (sectionId: string) => expandedSections.includes(sectionId);

  // Main navigation items that match the App.tsx routes
  const mainNavigationItems = [
    { name: 'Dashboard', href: '/', icon: HomeIcon },
    { name: 'Explore', href: '/explore', icon: ExploreIcon },
    { name: 'Stats', href: '/stats', icon: StatsIcon },
  ];

  const superFeaturesItems = [
    { name: 'Investment Pooling', href: '/investment-pooling', icon: InvestmentIcon },
    { name: 'Simulation Tool', href: '/simulation-tool', icon: Zap },
    // Add more super features here
  ];

  const stockMarketItems = [
    { name: 'Stock Market', href: '/stock-market', icon: StockMarketIcon },
    { name: 'S.T.O.P Method', href: '/methods/stop', icon: Target },
    { name: 'N.W.S Method', href: '/methods/nws', icon: PiggyBank },
    { name: 'Kakeibo Method', href: '/methods/kakeibo', icon: BookOpen },
  ];

  const accountItems = [
    { name: 'Profile', href: '/profile', icon: ProfileIcon },
    { name: 'Settings', href: '/settings', icon: SettingsIcon },
    { name: 'Company Status', href: '/company-status', icon: CompanyIcon },
  ];

  const isActiveLink = (href: string) => {
    return location.pathname === href;
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
          flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 group
          ${isChild ? 'ml-6' : ''}
          ${active 
            ? 'bg-gradient-to-r from-primary-500 to-green-500 text-white shadow-lg' 
            : 'text-gray-700 hover:bg-primary-100 hover:text-primary-900 dark:text-gray-300 dark:hover:bg-gray-700'
          }
        `}
      >
        <Icon className={`w-5 h-5 mr-3 transition-transform duration-200 ${active ? 'scale-110' : 'group-hover:scale-105'}`} />
        <span>{item.name}</span>
        {active && (
          <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />
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
          className="p-2 rounded-lg bg-white shadow-lg text-gray-700"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <nav className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-800 shadow-xl transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-green-500 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 text-white font-bold flex items-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full mr-1"></div>
                  <div className="text-lg">%</div>
                  <div className="w-1.5 h-1.5 bg-white rounded-full ml-1"></div>
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">FinPercent</h1>
                <p className="text-xs text-gray-500">Financial Dashboard</p>
              </div>
            </div>
            {/* <ThemeToggle /> */}
          </div>

          {/* Navigation */}
          <div className="flex-1 px-4 py-6 overflow-y-auto">
            <div className="space-y-6">
              {/* Main Section */}
              <div>
                <h3 className="px-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                  MAIN
                </h3>
                <div className="space-y-2">
                  {mainNavigationItems.map((item) => (
                    <NavLink key={item.name} item={item} />
                  ))}
                </div>
              </div>

              {/* Features Section */}
              <div>
                <h3 className="px-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                  FEATURES
                </h3>
                <div className="space-y-2">
                  {/* Super Features */}
                  <div>
                    <button
                      onClick={() => toggleSection('super-features')}
                      className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 hover:bg-primary-100 hover:text-primary-900 dark:text-gray-300 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
                    >
                      <div className="flex items-center">
                        <SuperFeaturesIcon className="w-5 h-5 mr-3" />
                        <span>Super Features</span>
                      </div>
                      {isExpanded('super-features') ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                    {isExpanded('super-features') && (
                      <div className="mt-2 space-y-1">
                        {superFeaturesItems.map((item) => (
                          <NavLink key={item.name} item={item} isChild />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Stock Market */}
                  <div>
                    <button
                      onClick={() => toggleSection('stock-market')}
                      className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 hover:bg-primary-100 hover:text-primary-900 dark:text-gray-300 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
                    >
                      <div className="flex items-center">
                        <StockMarketIcon className="w-5 h-5 mr-3" />
                        <span>Stock Market</span>
                      </div>
                      {isExpanded('stock-market') ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                    {isExpanded('stock-market') && (
                      <div className="mt-2 space-y-1">
                        {stockMarketItems.map((item) => (
                          <NavLink key={item.name} item={item} isChild />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Finning - Direct link */}
                  <NavLink item={{ name: 'Finning', href: '/finning', icon: FinningIcon }} />
                </div>
              </div>

              {/* Account Section */}
              <div>
                <h3 className="px-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                  ACCOUNT
                </h3>
                <div className="space-y-2">
                  {accountItems.map((item) => (
                    <NavLink key={item.name} item={item} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            {/* <ThemeToggle /> */}
            <div className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
              © 2024 FinPercent
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black bg-opacity-50"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Bottom Navigation for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-2">
        <div className="flex justify-around">
          {mainNavigationItems.slice(0, 4).map((item) => {
            const Icon = item.icon;
            const active = isActiveLink(item.href);
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                  active
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}