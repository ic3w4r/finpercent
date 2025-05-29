import React from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { 
  Home as HomeIcon,
  User as UserIcon,
  Settings as CogIcon,
  Building2 as BuildingLibraryIcon,
  CircleDollarSign as CircleStackIcon,
  BarChart as ChartBarIcon,
  Sparkles as SparklesIcon,
  Map as MapIcon,
  BookOpen as BookOpenIcon,
  Wallet as WalletIcon,
  Target as TargetIcon
} from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navigationItems = [
    { name: 'Dashboard', href: '/', icon: HomeIcon },
    { name: 'Profile', href: '/profile', icon: UserIcon },
    { name: 'Super Features', href: '/super-features', icon: SparklesIcon },
    { name: 'Stock Market', href: '/stock-market', icon: ChartBarIcon },
    { name: 'Finring', href: '/finring', icon: CircleStackIcon },
    { name: 'NWS Method', href: '/methods/nws', icon: WalletIcon },
    { name: 'Kakeibo Method', href: '/methods/kakeibo', icon: BookOpenIcon },
    { name: 'STOP Method', href: '/methods/stop', icon: TargetIcon },
    { name: 'Settings', href: '/settings', icon: CogIcon },
    { name: 'Company Status', href: '/company-status', icon: BuildingLibraryIcon },
    { name: 'Sitemap', href: '/sitemap', icon: MapIcon },
  ];

  // Main navigation items for mobile bottom bar (first 6 items)
  const mainNavItems = navigationItems.slice(0, 6);

  return (
    <>
      {/* Desktop Side Navigation */}
      <nav className="hidden md:fixed md:inset-y-0 md:left-0 md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <div className="h-16 flex items-center justify-center border-b border-gray-200 dark:border-gray-700">
            <Link to="/" className="flex items-center logo-container">
              <img src="/logo.svg" alt="Finpercent Logo" className="h-10 w-auto dark:filter dark:brightness-150" />
            </Link>
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto">
            <div className="py-4 flex-1 space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 text-sm font-medium ${
                        isActive
                          ? 'text-primary-600 dark:text-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20'
                      }`
                    }
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    <span>{item.name}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed md:hidden bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50">
        <div className="grid grid-cols-6 h-16">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center text-xs font-medium ${
                    isActive
                      ? 'text-primary-600 dark:text-primary-500'
                      : 'text-gray-700 dark:text-gray-200'
                  }`
                }
              >
                <Icon className="h-5 w-5 mb-1" />
                <span className="truncate text-[10px]">{item.name}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Navigation;
