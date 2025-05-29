import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft,
  PiggyBank, 
  Receipt, 
  Building2, 
  TrendingUp
} from 'lucide-react';

export default function KakeiboMethodPage() {
  const implementationGuide = [
    {
      letter: 'S',
      title: 'Savings (25%)',
      description: 'Company savings and emergency fund',
      icon: <PiggyBank className="w-5 h-5 text-green-600" />,
      color: 'bg-green-100 text-green-800',
      items: [
        'Emergency Fund: 40% - 10% of total revenue - Business contingency reserve',
        'Investment Reserve: 40% - 10% of total revenue - Future business expansion',
        'Asset Acquisition: 20% - 5% of total revenue - Equipment and infrastructure'
      ]
    },
    {
      letter: 'T',
      title: 'Taxes (30%)',
      description: 'Tax obligations and provisions',
      icon: <Receipt className="w-5 h-5 text-red-600" />,
      color: 'bg-red-100 text-red-800',
      items: [
        'Income Tax: 50% - 15% of total revenue - Corporate income tax provision',
        'VAT/Sales Tax: 33% - 10% of total revenue - Value added and sales tax',
        'Other Taxes: 17% - 5% of total revenue - Local and miscellaneous taxes'
      ]
    },
    {
      letter: 'O',
      title: 'Operations (35%)',
      description: 'Day-to-day business operations',
      icon: <Building2 className="w-5 h-5 text-blue-600" />,
      color: 'bg-blue-100 text-blue-800',
      items: [
        'Staff & Payroll: 45% - 15.75% of total revenue - Employee salaries and benefits',
        'Production Costs: 30% - 10.5% of total revenue - Manufacturing and service delivery',
        'Operating Expenses: 25% - 8.75% of total revenue - Utilities, rent, and supplies'
      ]
    },
    {
      letter: 'P',
      title: 'Profit (10%)',
      description: 'Net profit and reinvestment',
      icon: <TrendingUp className="w-5 h-5 text-purple-600" />,
      color: 'bg-purple-100 text-purple-800',
      items: [
        'Shareholder Distribution: 40% - 4% of total revenue - Dividend payments',
        'Business Growth: 40% - 4% of total revenue - Reinvestment in business',
        'Innovation Fund: 20% - 2% of total revenue - R&D and new initiatives'
      ]
    }
  ];
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Navigation */}
      <div className="mb-8">
        <Link 
          to="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>
      </div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          S.T.O.P Method Implementation Guide
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Strategic business financial management framework
        </p>
      </div>
      {/* Implementation Guide */}
      <div className="space-y-6">
        {implementationGuide.map((section) => (
          <motion.div 
            key={section.letter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className={`w-12 h-12 rounded-full ${section.color} bg-opacity-20 flex items-center justify-center`}>
                {section.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {section.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {section.description}
                </p>
              </div>
            </div>
            <div className="space-y-3 ml-16">
              {section.items.map((item, index) => (
                <div 
                  key={index}
                  className="text-sm text-gray-700 dark:text-gray-300 flex items-start space-x-2"
                >
                  <span className="text-gray-400 mt-1">•</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}