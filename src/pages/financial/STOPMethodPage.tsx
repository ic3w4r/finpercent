import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  PiggyBank, Settings, TrendingUp, Calculator, Target, Wallet, FileText, ArrowRight, ChevronLeft
} from 'lucide-react';

export default function STOPMethodPage() {
  const navigate = useNavigate();
  const [monthlyRevenue, setMonthlyRevenue] = useState(1200000); // Set default to standard MSME
  
  // Calculate STOP breakdown
  const calculateSTOP = () => {
    const savingsPercentage = 20; 
    const taxesPercentage = 15;   
    const operationsPercentage = 45; 
    const profitPercentage = 20;  
    
    return {
      savings: (monthlyRevenue * savingsPercentage) / 100,
      taxes: (monthlyRevenue * taxesPercentage) / 100,
      operations: (monthlyRevenue * operationsPercentage) / 100,
      profit: (monthlyRevenue * profitPercentage) / 100,
      percentages: {
        savings: savingsPercentage,
        taxes: taxesPercentage,
        operations: operationsPercentage,
        profit: profitPercentage
      }
    };
  };

  const stopBreakdown = calculateSTOP();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 p-6 pb-20">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate('/overview')}
            className="neo-button glass-action px-4 py-2 text-gray-600 dark:text-gray-400 hover:shadow-lg transition-all duration-300 flex items-center text-xs font-semibold"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            <span>Back to Command Center</span>
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="neo-button w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gradient-to-r from-primary-100 to-green-100">
            <Target className="w-8 h-8 text-primary-600" />
          </div>
          <h1 className="text-3xl font-extrabold text-primary-950 dark:text-white mb-2">
            S.T.O.P Financial Discipline
          </h1>
          <p className="text-primary-700 dark:text-gray-400 font-medium">
            <strong>S</strong>avings, <strong>T</strong>axes, <strong>O</strong>perations, <strong>P</strong>rofit Allocation Method
          </p>
        </motion.div>

        {/* Method Overview */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-gray-950 dark:text-white">
            What is the S.T.O.P Method?
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            The S.T.O.P method is a corporate financial allocation framework that directs incoming revenue straight into isolated accounts. 
            By splitting invoice deposits immediately, a business ensures tax compliance, funds core operations, locks in profit, and builds reserves.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: 'Savings (20%)', icon: PiggyBank, desc: 'Operational emergency fund & future CAPEX buffer.', color: 'text-green-600 border-green-200 bg-green-50/50' },
              { label: 'Taxes (15%)', icon: FileText, desc: 'Corporate tax provisions, GST reserves, and audits.', color: 'text-red-600 border-red-200 bg-red-50/50' },
              { label: 'Operations (45%)', icon: Settings, desc: 'Working capital, direct supplier payables, raw materials.', color: 'text-blue-600 border-blue-200 bg-blue-50/50' },
              { label: 'Profit (20%)', icon: TrendingUp, desc: 'Unleveraged net surplus for owner distributions.', color: 'text-purple-600 border-purple-200 bg-purple-50/50' }
            ].map((box, i) => {
              const Icon = box.icon;
              return (
                <div key={i} className={`p-5 border rounded-2xl ${box.color} space-y-3`}>
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm">{box.label}</h3>
                  <p className="text-[11px] text-gray-500 leading-relaxed">{box.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-6">
            <h3 className="text-md font-bold text-gray-900 dark:text-white flex items-center">
              <Calculator className="w-5 h-5 mr-2 text-primary-600" />
              <span>S.T.O.P Allocation Calculator</span>
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Monthly Revenue: ₹{monthlyRevenue.toLocaleString()}
                </label>
                <input
                  type="range"
                  min="100000"
                  max="5000000"
                  step="50000"
                  value={monthlyRevenue}
                  onChange={(e) => setMonthlyRevenue(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-green"
                />
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl space-y-3 border border-gray-100 dark:border-gray-800">
                <h4 className="text-xs font-bold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-800 pb-2">Allocation Breakdown</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-green-700">Savings (20%)</span>
                    <span className="font-extrabold text-gray-800 dark:text-white">₹{stopBreakdown.savings.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-red-700">Taxes (15%)</span>
                    <span className="font-extrabold text-gray-800 dark:text-white">₹{stopBreakdown.taxes.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-blue-700">Operations (45%)</span>
                    <span className="font-extrabold text-gray-800 dark:text-white">₹{stopBreakdown.operations.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-purple-700">Profit (20%)</span>
                    <span className="font-extrabold text-gray-800 dark:text-white">₹{stopBreakdown.profit.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BaaS Linkage Info */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="text-md font-bold text-gray-900 dark:text-white border-b border-gray-50 dark:border-gray-700 pb-3 flex items-center space-x-2">
                <Wallet className="w-5 h-5 text-primary-600" />
                <span>BaaS Webhook Routing Integration</span>
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                When you integrate Finpercent BaaS with your business bank account, incoming customer collections are automatically split 
                straight-through according to these allocation rules.
              </p>
              <div className="p-3 bg-primary-50 dark:bg-primary-950/20 border border-primary-100 dark:border-primary-900/40 rounded-lg text-xs">
                <span className="font-bold text-primary-950 dark:text-primary-300 block">Cohesive State Status: Active</span>
                <span className="text-[10px] text-primary-700 dark:text-primary-400 block mt-0.5">
                  Your current corporate balance states are directly updated by splits simulated in the Automated Banking portal.
                </span>
              </div>
            </div>
            <button
              onClick={() => navigate('/automated-banking')}
              className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl text-xs transition-all shadow-md flex items-center justify-center space-x-2"
            >
              <span>Access Automated Banking portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
