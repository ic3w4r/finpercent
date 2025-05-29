import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Wallet, PiggyBank, ShoppingBag, Home, Car,
  Utensils, Plane, Gift, DollarSign, Building,
  Briefcase, TrendingUp, Coffee, Book, Zap, AlertCircle, RefreshCw, ArrowRight
} from 'lucide-react';
import { PieChart } from './charts/PieChart';
import { useNavigate } from 'react-router-dom';

interface NWSMethodProps {
  monthlyIncome: number;
}

interface DetailedBreakdown {
  name: string;
  percentage: number;
  description: string;
  amount: number;
}

interface SubCategory {
  name: string;
  percentage: number;
  description: string;
  icon: React.ReactNode;
  amount: number;
  details: DetailedBreakdown[];
}

interface NWSCategory {
  name: string;
  value: number;
  color: string;
  icon: React.ReactNode;
  description: string;
  amount: number;
  subCategories: SubCategory[];
}

export function NWSMethod({ monthlyIncome = 0 }: NWSMethodProps) {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const handleMethodSwitch = (method: 'nws' | 'kakeibo') => {
    if (method === 'kakeibo') {
      const confirmed = window.confirm('Would you like to switch to the Kakeibo method? This will take you to the Kakeibo page.');
      if (confirmed) {
        navigate('/kakeibo');
      }
    }
  };
  const calculateAmount = (total: number, percentage: number) => (total * percentage) / 100;
  const nwsCategories = [
    {
      name: 'Necessities',
      percentage: 50,
      amount: calculateAmount(monthlyIncome, 50),
      icon: <Wallet className="w-5 h-5" />,
      color: 'bg-blue-100 text-blue-800',
      description: 'Essential expenses and bills'
    },
    {
      name: 'Wants',
      percentage: 30,
      amount: calculateAmount(monthlyIncome, 30),
      icon: <PiggyBank className="w-5 h-5" />,
      color: 'bg-green-100 text-green-800',
      description: 'Discretionary spending'
    },
    {
      name: 'Savings',
      percentage: 20,
      amount: calculateAmount(monthlyIncome, 20),
      icon: <Briefcase className="w-5 h-5" />,
      color: 'bg-purple-100 text-purple-800',
      description: 'Future investments and emergency fund'
    }
  ];
  const kakeiboCategories = [
    {
      name: 'Needs',
      percentage: 50,
      amount: calculateAmount(monthlyIncome, 50),
      icon: <Wallet className="w-5 h-5" />,
      color: 'bg-indigo-100 text-indigo-800',
      description: 'Essential living expenses'
    },
    {
      name: 'Wants',
      percentage: 20,
      amount: calculateAmount(monthlyIncome, 20),
      icon: <Coffee className="w-5 h-5" />,
      color: 'bg-rose-100 text-rose-800',
      description: 'Entertainment and non-essential items'
    },
    {
      name: 'Culture',
      percentage: 20,
      amount: calculateAmount(monthlyIncome, 20),
      icon: <Book className="w-5 h-5" />,
      color: 'bg-amber-100 text-amber-800',
      description: 'Personal growth and education'
    },
    {
      name: 'Unexpected',
      percentage: 10,
      amount: calculateAmount(monthlyIncome, 10),
      icon: <Zap className="w-5 h-5" />,
      color: 'bg-cyan-100 text-cyan-800',
      description: 'Emergency fund and unexpected expenses'
    }
  ];
  const activeCategories = activeMethod === 'nws' ? nwsCategories : kakeiboCategories;
  const nwsBreakdown: NWSCategory[] = [
    {
      name: 'Necessities',
      value: 50,
      color: '#22c55e',
      icon: <Wallet className="w-5 h-5" />,
      description: 'Essential living expenses',
      amount: monthlyIncome * 0.5,
      subCategories: [
        {
          name: 'Housing',
          percentage: 30,
          description: '15% of total income - Rent/mortgage and utilities',
          icon: <Home className="w-4 h-4" />,
          amount: calculateAmount(monthlyIncome * 0.5, 30),
          details: [
            {
              name: 'Rent/Mortgage',
              percentage: 70,
              description: 'Monthly housing payment',
              amount: calculateAmount(calculateAmount(monthlyIncome * 0.5, 30), 70)
            },
            {
              name: 'Utilities',
              percentage: 30,
              description: 'Electricity, water, gas, etc.',
              amount: calculateAmount(calculateAmount(monthlyIncome * 0.5, 30), 30)
            }
          ]
        },
        {
          name: 'Transportation',
          percentage: 20,
          description: '10% of total income - Car payments, fuel, maintenance',
          icon: <Car className="w-4 h-4" />,
          amount: calculateAmount(monthlyIncome * 0.5, 20),
          details: [
            {
              name: 'Vehicle Expenses',
              percentage: 60,
              description: 'Car payment and insurance',
              amount: calculateAmount(calculateAmount(monthlyIncome * 0.5, 20), 60)
            },
            {
              name: 'Running Costs',
              percentage: 40,
              description: 'Fuel and maintenance',
              amount: calculateAmount(calculateAmount(monthlyIncome * 0.5, 20), 40)
            }
          ]
        },
        {
          name: 'Food & Groceries',
          percentage: 30,
          description: '15% of total income - Essential food and household items',
          icon: <Utensils className="w-4 h-4" />,
          amount: calculateAmount(monthlyIncome * 0.5, 30),
          details: [
            {
              name: 'Groceries',
              percentage: 80,
              description: 'Regular food and household items',
              amount: calculateAmount(calculateAmount(monthlyIncome * 0.5, 30), 80)
            },
            {
              name: 'Essentials',
              percentage: 20,
              description: 'Basic household supplies',
              amount: calculateAmount(calculateAmount(monthlyIncome * 0.5, 30), 20)
            }
          ]
        },
        {
          name: 'Insurance & Healthcare',
          percentage: 20,
          description: '10% of total income - Health, life, and property insurance',
          icon: <ShoppingBag className="w-4 h-4" />,
          amount: calculateAmount(monthlyIncome * 0.5, 20),
          details: [
            {
              name: 'Health Insurance',
              percentage: 60,
              description: 'Medical and dental coverage',
              amount: calculateAmount(calculateAmount(monthlyIncome * 0.5, 20), 60)
            },
            {
              name: 'Other Insurance',
              percentage: 40,
              description: 'Life and property insurance',
              amount: calculateAmount(calculateAmount(monthlyIncome * 0.5, 20), 40)
            }
          ]
        }
      ]
    },
    {
      name: 'Wants',
      value: 30,
      color: '#3b82f6',
      icon: <ShoppingBag className="w-5 h-5" />,
      description: 'Discretionary spending',
      amount: monthlyIncome * 0.3,
      subCategories: [
        {
          name: 'Entertainment',
          percentage: 30,
          description: '9% of total income - Recreation and leisure',
          icon: <Gift className="w-4 h-4" />,
          amount: calculateAmount(monthlyIncome * 0.3, 30),
          details: [
            {
              name: 'Activities',
              percentage: 70,
              description: 'Events and recreation',
              amount: calculateAmount(calculateAmount(monthlyIncome * 0.3, 30), 70)
            },
            {
              name: 'Subscriptions',
              percentage: 30,
              description: 'Streaming and memberships',
              amount: calculateAmount(calculateAmount(monthlyIncome * 0.3, 30), 30)
            }
          ]
        },
        {
          name: 'Travel',
          percentage: 25,
          description: '7.5% of total income - Vacations and trips',
          icon: <Plane className="w-4 h-4" />,
          amount: calculateAmount(monthlyIncome * 0.3, 25),
          details: [
            {
              name: 'Vacation Fund',
              percentage: 80,
              description: 'Travel and accommodation',
              amount: calculateAmount(calculateAmount(monthlyIncome * 0.3, 25), 80)
            },
            {
              name: 'Travel Insurance',
              percentage: 20,
              description: 'Insurance and emergencies',
              amount: calculateAmount(calculateAmount(monthlyIncome * 0.3, 25), 20)
            }
          ]
        },
        {
          name: 'Shopping',
          percentage: 25,
          description: '7.5% of total income - Non-essential purchases',
          icon: <ShoppingBag className="w-4 h-4" />,
          amount: calculateAmount(monthlyIncome * 0.3, 25),
          details: [
            {
              name: 'Clothing',
              percentage: 60,
              description: 'Apparel and accessories',
              amount: calculateAmount(calculateAmount(monthlyIncome * 0.3, 25), 60)
            },
            {
              name: 'Personal Items',
              percentage: 40,
              description: 'Non-essential personal items',
              amount: calculateAmount(calculateAmount(monthlyIncome * 0.3, 25), 40)
            }
          ]
        },
        {
          name: 'Dining Out',
          percentage: 20,
          description: '6% of total income - Restaurants and takeout',
          icon: <Utensils className="w-4 h-4" />,
          amount: calculateAmount(monthlyIncome * 0.3, 20),
          details: [
            {
              name: 'Restaurants',
              percentage: 70,
              description: 'Dining at restaurants',
              amount: calculateAmount(calculateAmount(monthlyIncome * 0.3, 20), 70)
            },
            {
              name: 'Takeout',
              percentage: 30,
              description: 'Food delivery and takeaway',
              amount: calculateAmount(calculateAmount(monthlyIncome * 0.3, 20), 30)
            }
          ]
        }
      ]
    },
    {
      name: 'Savings',
      value: 20,
      color: '#8b5cf6',
      icon: <PiggyBank className="w-5 h-5" />,
      description: 'Future financial security',
      amount: monthlyIncome * 0.2,
      subCategories: [
        {
          name: 'Emergency Fund',
          percentage: 30,
          description: '6% of total income - Rainy day savings',
          icon: <Wallet className="w-4 h-4" />,
          amount: calculateAmount(monthlyIncome * 0.2, 30),
          details: [
            {
              name: 'Liquid Savings',
              percentage: 80,
              description: 'Easily accessible emergency funds',
              amount: calculateAmount(calculateAmount(monthlyIncome * 0.2, 30), 80)
            },
            {
              name: 'Buffer',
              percentage: 20,
              description: 'Additional emergency buffer',
              amount: calculateAmount(calculateAmount(monthlyIncome * 0.2, 30), 20)
            }
          ]
        },
        {
          name: 'Investments',
          percentage: 40,
          description: '8% of total income - Stocks, bonds, mutual funds',
          icon: <TrendingUp className="w-4 h-4" />,
          amount: calculateAmount(monthlyIncome * 0.2, 40),
          details: [
            {
              name: 'Market Investments',
              percentage: 70,
              description: 'Stocks and mutual funds',
              amount: calculateAmount(calculateAmount(monthlyIncome * 0.2, 40), 70)
            },
            {
              name: 'Fixed Income',
              percentage: 30,
              description: 'Bonds and stable investments',
              amount: calculateAmount(calculateAmount(monthlyIncome * 0.2, 40), 30)
            }
          ]
        },
        {
          name: 'Retirement',
          percentage: 20,
          description: '4% of total income - Long-term retirement savings',
          icon: <Building className="w-4 h-4" />,
          amount: calculateAmount(monthlyIncome * 0.2, 20),
          details: [
            {
              name: 'Retirement Account',
              percentage: 80,
              description: 'Regular retirement contributions',
              amount: calculateAmount(calculateAmount(monthlyIncome * 0.2, 20), 80)
            },
            {
              name: 'Additional Savings',
              percentage: 20,
              description: 'Extra retirement savings',
              amount: calculateAmount(calculateAmount(monthlyIncome * 0.2, 20), 20)
            }
          ]
        },
        {
          name: 'Goals',
          percentage: 10,
          description: '2% of total income - Specific financial goals',
          icon: <Briefcase className="w-4 h-4" />,
          amount: calculateAmount(monthlyIncome * 0.2, 10),
          details: [
            {
              name: 'Short-term Goals',
              percentage: 60,
              description: 'Near-term financial objectives',
              amount: calculateAmount(calculateAmount(monthlyIncome * 0.2, 10), 60)
            },
            {
              name: 'Long-term Goals',
              percentage: 40,
              description: 'Future financial aspirations',
              amount: calculateAmount(calculateAmount(monthlyIncome * 0.2, 10), 40)
            }
          ]
        }
      ]
    }
  ];
  const kakeiboBreakdown = [
    {
      name: 'Needs',
      value: 50,
      color: '#818cf8',
      icon: <Wallet className="w-5 h-5" />,
      description: 'Essential living expenses',
      amount: monthlyIncome * 0.5,
      subCategories: [
        {
          name: 'Housing',
          percentage: 40,
          description: 'Rent/mortgage, utilities, maintenance',
          icon: <Home className="w-4 h-4" />,
          amount: calculateAmount(monthlyIncome * 0.5, 40),
          details: [
            {
              name: 'Fixed Housing Costs',
              percentage: 70,
              description: 'Rent/mortgage and property taxes',
              amount: calculateAmount(calculateAmount(monthlyIncome * 0.5, 40), 70)
            },
            {
              name: 'Variable Housing Costs',
              percentage: 30,
              description: 'Utilities and maintenance',
              amount: calculateAmount(calculateAmount(monthlyIncome * 0.5, 40), 30)
            }
          ]
        },
        {
          name: 'Daily Necessities',
          percentage: 30,
          description: 'Food, groceries, and essential items',
          icon: <ShoppingBag className="w-4 h-4" />,
          amount: calculateAmount(monthlyIncome * 0.5, 30),
          details: [
            {
              name: 'Groceries',
              percentage: 60,
              description: 'Food and household essentials',
              amount: calculateAmount(calculateAmount(monthlyIncome * 0.5, 30), 60)
            },
            {
              name: 'Health & Hygiene',
              percentage: 40,
              description: 'Personal care and health items',
              amount: calculateAmount(calculateAmount(monthlyIncome * 0.5, 30), 40)
            }
          ]
        }
      ]
    },
    // ... Add similar detailed breakdowns for Wants, Culture, and Unexpected categories ...
  ];
  const renderDetailedBreakdown = (details: DetailedBreakdown[], color: string) => (
    <div className="mt-4 ml-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 space-y-3">
      <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
        Detailed Breakdown
      </h5>
      {details.map((detail) => (
        <div key={detail.name} className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {detail.name}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium" style={{ color }}>
                {detail.percentage}%
              </span>
              <span className="text-sm text-gray-500">
                (${detail.amount.toLocaleString()})
              </span>
            </div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
            <div
              className="h-1.5 rounded-full"
              style={{ width: `${detail.percentage}%`, backgroundColor: color }}
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {detail.description}
          </p>
        </div>
      ))}
    </div>
  );
  const handleCategoryClick = (method: string, categoryName: string) => {
    navigate(`/method/${method}/${categoryName.toLowerCase()}`);
  };
  const renderSubCategories = (category: NWSCategory) => (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
    >
      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
        Category Breakdown
      </h4>
      <div className="grid grid-cols-1 gap-4">
        {category.subCategories.map((sub) => (
          <div 
            key={sub.name}
            onClick={() => handleCategoryClick(activeMethod, sub.name)}
            className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg" style={{ backgroundColor: `${category.color}20` }}>
                  {sub.icon}
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white">
                    {sub.name}
                  </h5>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {sub.percentage}% - ${sub.amount.toLocaleString()}
                  </p>
                </div>
              </div>
              <button
                className="px-3 py-1 text-sm rounded-full bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                View Details
              </button>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all duration-300"
                style={{ width: `${sub.percentage}%`, backgroundColor: category.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
  return (
    <div className="space-y-6">
      {/* Method Toggle Switch */}
      <div className="flex items-center space-x-4 bg-gray-100 dark:bg-gray-800 rounded-lg p-1 mb-6">
        <button
          onClick={() => handleMethodSwitch('nws')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
            activeMethod === 'nws'
              ? 'bg-white dark:bg-gray-700 shadow-sm'
              : 'hover:bg-white/50 dark:hover:bg-gray-700/50'
          }`}
        >
          <Wallet className="w-5 h-5" />
          <span>NWS Method</span>
        </button>
        <button
          onClick={() => handleMethodSwitch('kakeibo')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
            activeMethod === 'kakeibo'
              ? 'bg-white dark:bg-gray-700 shadow-sm'
              : 'hover:bg-white/50 dark:hover:bg-gray-700/50'
          }`}
        >
          <Book className="w-5 h-5" />
          <span>Kakeibo Method</span>
        </button>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Financial Planning Methods
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Monthly Income: ${monthlyIncome.toLocaleString()}
          </p>
        </div>
        
        {/* Method Toggle Switch */}
        <div className="flex items-center space-x-4 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          <button
            onClick={() => handleMethodSwitch('nws')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              activeMethod === 'nws'
                ? 'bg-white dark:bg-gray-700 shadow-sm'
                : 'hover:bg-white/50 dark:hover:bg-gray-700/50'
            }`}
          >
            <Wallet className="w-5 h-5" />
            <span>NWS Method</span>
          </button>
          <button
            onClick={() => handleMethodSwitch('kakeibo')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              activeMethod === 'kakeibo'
                ? 'bg-white dark:bg-gray-700 shadow-sm'
                : 'hover:bg-white/50 dark:hover:bg-gray-700/50'
            }`}
          >
            <Book className="w-5 h-5" />
            <span>Kakeibo Method</span>
          </button>
        </div>
      </div>

      {/* Method Description */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
            {activeMethod === 'nws' ? (
              <Wallet className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            ) : (
              <Book className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {activeMethod === 'nws' ? 'NWS (50/30/20) Method' : 'Kakeibo Method'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {activeMethod === 'nws' 
                ? 'A simple budgeting rule that allocates your income into three main categories.'
                : 'A Japanese budgeting method that helps you understand your spending habits and save more effectively.'}
            </p>
          </div>
        </div>
      </div>

      {/* NWS Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {activeCategories.map((category) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
            onClick={() => handleCategoryClick(activeMethod, category.name)}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
                {category.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {category.name}
              </h3>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-gray-600 dark:text-gray-400">Allocation</span>
                  <span className="text-2xl font-bold text-primary-600">
                    {category.percentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-primary-500"
                    style={{ width: `${category.percentage}%` }}
                  />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-gray-600 dark:text-gray-400">Amount</span>
                <span className="text-xl font-semibold text-gray-900 dark:text-white">
                  ${category.amount.toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-gray-500">
                {category.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Kakeibo CTA */}
      {activeMethod === 'kakeibo' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Try the Kakeibo Method
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Experience a mindful approach to budgeting with detailed category breakdowns and monthly reflections.
              </p>
            </div>
            <button
              onClick={() => navigate('/kakeibo')}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}