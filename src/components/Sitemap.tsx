import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Home,
  Search,
  PieChart,
  Settings,
  User,
  Building2,
  CircleDollarSign,
  PiggyBank,
  Building,
  Wallet,
  BarChart2,
  TrendingUp,
  Target,
  LineChart,
  DollarSign,
  Star,
  BookOpen,
  Calculator
} from 'lucide-react';
import ViewModeToggle from './ViewModeToggle';

interface SitemapSection {
  title: string;
  links: {
    path: string;
    label: string;
    icon: React.ElementType;
    description: string;
    subItems?: {
      label: string;
      description: string;
      icon: React.ElementType;
    }[];
  }[];
}

const sitemapData: SitemapSection[] = [
  {
    title: 'Command Center',
    links: [
      {
        path: '/command-center',
        label: 'Command Every Rupee',
        icon: CircleDollarSign,
        description: 'Track, plan, and grow with surgical precision. Finpercent isn\'t just intuitive—it\'s empowered intelligence that works behind the scenes so you stay in front.'
      },
      {
        path: '/entrepreneur-tools',
        label: 'Built for Bold Entrepreneurs',
        icon: Building2,
        description: 'Finpercent was reengineered from the ground up to liberate small-scale businesses from financial clutter. It\'s not just tech—it\'s your growth co-pilot.'
      },
      {
        path: '/performance',
        label: 'Performance Without Compromise',
        icon: BarChart2,
        description: 'Every click, every dashboard, every insight—delivered at blazing speed with fortified security. It\'s financial clarity that never sleeps.'
      },
      {
        path: '/simplicity',
        label: 'Simplicity, Perfected',
        icon: Star,
        description: 'From the first tap, Finpercent feels natural. Minimal interface, fluid transitions, and intelligent automation that simplifies your entire financial workflow.'
      },
      {
        path: '/future-finance',
        label: 'Future-Focused Finance',
        icon: TrendingUp,
        description: 'Finpercent is your next-gen financial infrastructure—designed to adapt, built to scale, and powered to disrupt how small businesses thrive.'
      }
    ]
  },
  {
    title: 'Main Pages',
    links: [
      {
        path: '/',
        label: 'Home',
        icon: Home,
        description: 'Dashboard and overview of your financial status'
      },
      {
        path: '/explore',
        label: 'Explore',
        icon: Search,
        description: 'Discover financial tools and features'
      },
      {
        path: '/super-features',
        label: 'Super Features',
        icon: Star,
        description: 'Advanced financial management tools'
      }
    ]
  },
  {
    title: 'Financial Analysis',
    links: [
      {
        path: '/stats',
        label: 'Statistics',
        icon: PieChart,
        description: 'Detailed financial analytics and reports',
        subItems: [
          {
            label: 'S - Sales Tracking',
            description: 'Monitor and analyze sales performance metrics',
            icon: LineChart
          },
          {
            label: 'T - Target Setting',
            description: 'Define and adjust business objectives',
            icon: Target
          },
          {
            label: 'O - Optimization',
            description: 'Improve processes and efficiency',
            icon: BarChart2
          },
          {
            label: 'P - Performance Review',
            description: 'Evaluate and adjust strategies',
            icon: TrendingUp
          }
        ]
      },
      {
        path: '/stock-market',
        label: 'Stock Market',
        icon: TrendingUp,
        description: 'Real-time market analysis and trading',
        subItems: [
          {
            label: 'STOP Score',
            description: 'Business optimization scoring',
            icon: Target
          },
          {
            label: 'NWS Balance',
            description: 'Net worth and savings tracking',
            icon: DollarSign
          },
          {
            label: 'Growth Rate',
            description: 'Performance and growth metrics',
            icon: TrendingUp
          }
        ]
      }
    ]
  },
  {
    title: 'Business Tools',
    links: [
      {
        path: '/company-status',
        label: 'Company Status',
        icon: Building2,
        description: 'Monitor your business performance'
      },
      {
        path: '/finring',
        label: 'Finring',
        icon: CircleDollarSign,
        description: 'Financial ring analysis and planning'
      }
    ]
  },
  {
    title: 'Method Implementations',
    links: [
      {
        path: '/methods/stop',
        label: 'STOP Method',
        icon: Target,
        description: 'Strategic business optimization framework',
        subItems: [
          {
            label: 'S - Sales Tracking',
            description: 'Monitor and analyze sales performance',
            icon: LineChart
          },
          {
            label: 'T - Target Setting',
            description: 'Define and adjust business objectives',
            icon: Target
          },
          {
            label: 'O - Optimization',
            description: 'Improve processes and efficiency',
            icon: BarChart2
          },
          {
            label: 'P - Performance Review',
            description: 'Evaluate and adjust strategies',
            icon: TrendingUp
          }
        ]
      },
      {
        path: '/methods/nws',
        label: 'NWS Method',
        icon: DollarSign,
        description: 'Net worth and savings tracking system',
        subItems: [
          {
            label: 'N - Necessities',
            description: 'Essential expenses (50%)',
            icon: Wallet
          },
          {
            label: 'W - Wants',
            description: 'Discretionary spending (30%)',
            icon: PiggyBank
          },
          {
            label: 'S - Savings',
            description: 'Future investments (20%)',
            icon: DollarSign
          }
        ]
      },
      {
        path: '/methods/kakeibo',
        label: 'Kakeibo Method',
        icon: BookOpen,
        description: 'Japanese budgeting and financial awareness',
        subItems: [
          {
            label: 'Dashboard',
            description: 'Overview of your Kakeibo implementation',
            icon: PieChart
          },
          {
            label: 'Tracking',
            description: 'Monitor your spending categories',
            icon: Calculator
          }
        ]
      }
    ]
  },
  {
    title: 'Financial Management',
    links: [
      {
        path: '/debt-repayment',
        label: 'Debt Repayment',
        icon: PiggyBank,
        description: 'Manage and track debt repayment',
        subItems: [
          {
            label: 'N - Necessities',
            description: 'Essential expenses (50%)',
            icon: Wallet
          },
          {
            label: 'W - Wants',
            description: 'Discretionary spending (30%)',
            icon: PiggyBank
          },
          {
            label: 'S - Savings',
            description: 'Future investments (20%)',
            icon: DollarSign
          }
        ]
      },
      {
        path: '/investment-pooling',
        label: 'Investment Pooling',
        icon: Wallet,
        description: 'Pool and manage investments'
      },
      {
        path: '/automated-banking',
        label: 'Automated Banking',
        icon: Building,
        description: 'Automate your banking operations'
      }
    ]
  },
  {
    title: 'User Account',
    links: [
      {
        path: '/profile',
        label: 'Profile',
        icon: User,
        description: 'Manage your profile settings'
      },
      {
        path: '/settings',
        label: 'Settings',
        icon: Settings,
        description: 'Application preferences and configuration'
      },
      {
        path: '/sitemap',
        label: 'Sitemap',
        icon: BookOpen,
        description: 'Overview of all available pages and features'
      }
    ]
  }
];

const Sitemap: React.FC = () => {
  const [viewMode, setViewMode] = useState<'classic' | 'stockMarket'>('classic');

  const renderSitemapSection = (section: SitemapSection) => {
    return (
      <div key={section.title} className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-primary-900 dark:text-primary-100 tracking-tight">{section.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {section.links.map((link, index) => (
            <Link
              key={link.path}
              to={link.path}
              className="group relative overflow-hidden rounded-xl border border-primary-200 dark:border-primary-700 bg-white dark:bg-primary-900 shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02] block"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="p-6 relative">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-primary-100 dark:bg-primary-800 transform group-hover:scale-110 transition-transform duration-300">
                    {React.createElement(link.icon, {
                      className: "w-6 h-6 text-primary-600 dark:text-primary-400"
                    })}
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold text-xl text-primary-900 dark:text-primary-100 group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors duration-300">
                      {link.label}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {link.description}
                    </p>
                    {link.subItems && (
                      <div className="mt-4 space-y-3 pt-4 border-t border-primary-100 dark:border-primary-800">
                        {link.subItems.map((subItem) => (
                          <div key={subItem.label} className="flex items-center space-x-3 group/item">
                            <div className="p-2 rounded-lg bg-primary-50 dark:bg-primary-800/50 transform group-hover/item:scale-110 transition-transform duration-200">
                              {React.createElement(subItem.icon, {
                                className: "w-4 h-4 text-primary-500 dark:text-primary-400"
                              })}
                            </div>
                            <div>
                              <span className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover/item:text-primary-600 dark:group-hover/item:text-primary-400 transition-colors duration-200">
                                {subItem.label}
                              </span>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                {subItem.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  };

  const handleViewModeToggle = (mode: 'classic' | 'stockMarket') => {
    setViewMode(mode);
  };

  const filteredSitemapData = sitemapData.map(section => ({
    ...section,
    links: section.links.filter(link => {
      if (viewMode === 'classic') {
        return !link.path.includes('stock-market');
      }
      return true;
    })
  })).filter(section => section.links.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-primary-950 dark:via-primary-900 dark:to-primary-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-primary-900 dark:text-primary-100 tracking-tight">Sitemap</h1>
            <p className="mt-2 text-lg text-primary-600 dark:text-primary-400">Navigate through our comprehensive financial management platform</p>
          </div>
          <ViewModeToggle viewMode={viewMode} onToggle={setViewMode} />
        </div>

        <div className="space-y-16">
          {filteredSitemapData.map((section) => (
            <div key={section.title} className="space-y-8">
              <div className="border-b border-primary-200 dark:border-primary-800 pb-4">
                <h2 className="text-2xl font-bold text-primary-800 dark:text-primary-200 tracking-tight">
                  {section.title}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.links.map((link) => {
                  const Icon = link.icon;
                  return (
                    <div key={link.path} className="group">
                      <Link
                        to={link.path}
                        className="block h-full p-6 rounded-xl border border-primary-200 dark:border-primary-700 bg-white dark:bg-primary-900 shadow-sm hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02] relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative space-y-4">
                          <div className="flex items-start gap-4">
                            <div className="p-3 rounded-xl bg-primary-100 dark:bg-primary-800 text-primary-600 dark:text-primary-300 transform group-hover:scale-110 transition-transform duration-300">
                              <Icon className="w-6 h-6" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-xl text-primary-900 dark:text-primary-100 group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors duration-300">
                                {link.label}
                              </h3>
                              <p className="mt-2 text-sm text-primary-600 dark:text-primary-400 line-clamp-2">
                                {link.description}
                              </p>
                            </div>
                          </div>
                          {link.subItems && (
                            <div className="pt-4 mt-4 border-t border-primary-100 dark:border-primary-800 space-y-3">
                              {link.subItems.map((subItem) => {
                                const SubIcon = subItem.icon;
                                return (
                                  <div key={subItem.label} className="flex items-start gap-3 group/item">
                                    <div className="p-2 rounded-lg bg-primary-50 dark:bg-primary-800/50 transform group-hover/item:scale-110 transition-transform duration-200">
                                      <SubIcon className="w-4 h-4 text-primary-500 dark:text-primary-400" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="font-medium text-sm text-primary-800 dark:text-primary-200 group-hover/item:text-primary-600 dark:group-hover/item:text-primary-300 transition-colors duration-200">
                                        {subItem.label}
                                      </p>
                                      <p className="mt-0.5 text-xs text-primary-600 dark:text-primary-400 line-clamp-2">
                                        {subItem.description}
                                      </p>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}