import React, { useEffect, useState } from 'react';
import { Award, TrendingUp, AlertCircle, ChevronLeft, Upload, Building2, Target, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/neomorphic.css';
import BadgeAnimation from '../components/status/BadgeAnimation';
import BalanceSheetAnalysis from '../components/status/BalanceSheetAnalysis';
import KPIBreakdown from '../components/status/KPIBreakdown';
import RankingCriteria from '../components/status/RankingCriteria';
import FileUploader from '../components/FileUploader';

export default function CompanyStatusPage() {
  const [showBadge, setShowBadge] = useState(false);
  const [showUploader, setShowUploader] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setShowBadge(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-beige-50 to-primary-100 p-6 pb-20">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="neo-button glass-action px-4 py-2 text-gray-600 dark:text-gray-400 hover:shadow-lg transition-all duration-300"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Back to Profile
        </motion.button>

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-8"
        >
          <div className="neo-button glass-action w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Building2 className="w-8 h-8 text-primary-600" />
          </div>
          <h1 className="text-3xl font-bold text-primary-900 dark:text-primary-100 mb-2">
            Company Status Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Monitor your company's financial health and performance metrics
          </p>
        </motion.div>

        {/* Badge Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <BadgeAnimation show={showBadge} ranking="Gold" companyName="Acme Corporation" />
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {[
            {
              title: 'Company Rating',
              value: 'Gold',
              change: '+2 levels',
              icon: Award,
              color: 'text-yellow-600',
              bgColor: 'bg-yellow-50 dark:bg-yellow-900/30'
            },
            {
              title: 'Performance Score',
              value: '92/100',
              change: '+8 points',
              icon: Target,  
              color: 'text-green-600',
              bgColor: 'bg-green-50 dark:bg-green-900/30'
            },
            {
              title: 'Market Position',
              value: 'Top 15%',
              change: '+5%',
              icon: BarChart3,
              color: 'text-blue-600',
              bgColor: 'bg-blue-50 dark:bg-blue-900/30'
            }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="neo-card p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`neo-button glass-action p-3 ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${stat.bgColor} ${stat.color} border border-current`}>
                    Excellent
                  </span>
                </div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  {stat.title}
                </h3>
                <p className="text-2xl font-bold text-primary-900 dark:text-primary-100 mb-1">
                  {stat.value}
                </p>
                <span className="text-sm font-medium text-green-600">
                  {stat.change}
                </span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Balance Sheet Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="neo-card p-8"
        >
          {!showUploader ? (
            <div className="text-center space-y-6">
              <div className="neo-button glass-action w-20 h-20 mx-auto flex items-center justify-center">
                <Upload className="w-10 h-10 text-primary-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-primary-900 dark:text-primary-100 mb-3">
                  Upload Latest Balance Sheet
                </h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Get better insights and personalized recommendations by uploading your latest balance sheet.
                  Our AI will analyze your financial data and provide detailed insights.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setShowUploader(true)}
                  className="neo-button glass-action px-8 py-3 text-primary-600 dark:text-primary-400 font-medium hover:shadow-lg transition-all duration-300"
                >
                  Upload Balance Sheet
                </button>
                <button className="neo-button glass-action px-8 py-3 text-gray-600 dark:text-gray-400 font-medium hover:shadow-lg transition-all duration-300">
                  View Sample Format
                </button>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-primary-900 dark:text-primary-100">
                  Upload Financial Documents
                </h2>
                <button
                  onClick={() => setShowUploader(false)}
                  className="neo-button glass-action px-4 py-2 text-gray-600 dark:text-gray-400"
                >
                  Cancel
                </button>
              </div>
              <FileUploader
                onFileUpload={(file) => {
                  console.log('Uploaded file:', file);
                  setShowUploader(false);
                }}
                acceptedFileTypes={['.pdf', '.xlsx', '.csv']}
                maxFileSize={10 * 1024 * 1024} // 10MB
              />
            </motion.div>
          )}
        </motion.div>

        {/* Analysis Sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <BalanceSheetAnalysis />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <KPIBreakdown />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <RankingCriteria />
        </motion.div>

        {/* Path to Gold Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="neo-card p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <AlertCircle className="w-6 h-6 text-primary-600" />
            <h2 className="text-xl font-bold text-primary-900 dark:text-primary-100">Path to Gold Ranking</h2>
          </div>
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              Your company is performing well and is close to achieving Gold ranking.
              Here are the key areas to focus on:
            </p>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-primary-600" />
                <span className="text-primary-900 dark:text-primary-100">Increase profit margin by 2.5%</span>
              </li>
              <li className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-primary-600" />
                <span className="text-primary-900 dark:text-primary-100">Maintain consistent growth for 2 more quarters</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
