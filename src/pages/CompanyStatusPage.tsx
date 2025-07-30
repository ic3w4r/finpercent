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
      <div className="max-w-4xl mx-auto space-y-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back to Profile</span>
        </button>

        <div className="text-center mb-8">
          <BadgeAnimation show={showBadge} ranking="Gold" companyName="Acme Corporation" />
        </div>

        {/* Balance Sheet Upload Section - Moved here */}
        <div className="glass-card rounded-xl p-6">
          {!showUploader ? (
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center">
                <Upload className="w-12 h-12 text-primary-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Upload Latest Balance Sheet
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
                Get better insights and personalized recommendations by uploading your latest balance sheet.
                Our AI will analyze your financial data and provide detailed insights.
              </p>
              <button
                onClick={() => setShowUploader(true)}
                className="neo-button px-6 py-3 text-primary-600 dark:text-primary-400 font-medium hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
              >
                Upload Balance Sheet for Better Insights
              </button>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Balance Sheet Upload
                </h2>
                <button
                  onClick={() => setShowUploader(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
              <FileUploader />
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <BalanceSheetAnalysis />
          <KPIBreakdown />
        </div>

        <RankingCriteria />

        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <AlertCircle className="w-6 h-6 text-primary-600" />
            <h2 className="text-xl font-bold">Path to Gold Ranking</h2>
          </div>
          <div className="space-y-4">
            <p className="text-gray-600">
              Your company is performing well and is close to achieving Gold ranking.
              Here are the key areas to focus on:
            </p>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-primary-600" />
                <span>Increase profit margin by 2.5%</span>
              </li>
              <li className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-primary-600" />
                <span>Maintain consistent growth for 2 more quarters</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
