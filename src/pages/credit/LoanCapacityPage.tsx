import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, Calculator, ShieldCheck, AlertTriangle, ArrowRight, DollarSign, Building2, HelpCircle 
} from 'lucide-react';

export default function LoanCapacityPage() {
  const navigate = useNavigate();
  const [revenue, setRevenue] = useState(1200000);
  const [profitMargin, setProfitMargin] = useState(18); // 18%
  const [existingEMI, setExistingEMI] = useState(45000);

  const monthlyProfit = (revenue * profitMargin) / 100;
  const safeEMICapacity = Math.round(monthlyProfit * 0.40); // 40% safe ceiling
  const remainingEMICapacity = Math.max(0, safeEMICapacity - existingEMI);
  
  // Safe loan estimate: 60x the remaining capacity
  const estimatedSafeLoan = remainingEMICapacity * 60;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 p-6 pb-20">
      <div className="max-w-5xl mx-auto space-y-8">
        
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

        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold text-primary-950 dark:text-white">Loan Capacity Calculator</h1>
          <p className="text-sm text-gray-500 max-w-lg mx-auto">
            Evaluate your business safe debt limits based on operating cash margins and outstanding loan amortizations.
          </p>
        </div>

        {/* Input sliders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-6">
            <h3 className="text-md font-bold text-gray-900 dark:text-white border-b border-gray-50 dark:border-gray-700 pb-3 flex items-center">
              <Calculator className="w-5 h-5 mr-2 text-primary-600" />
              <span>Diagnostic Parameters</span>
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Monthly Revenue Inflows: ₹{revenue.toLocaleString()}
                </label>
                <input
                  type="range"
                  min="200000"
                  max="5000000"
                  step="50000"
                  value={revenue}
                  onChange={(e) => setRevenue(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-green"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  EBITDA Profit Margin: {profitMargin}%
                </label>
                <input
                  type="range"
                  min="5"
                  max="40"
                  step="1"
                  value={profitMargin}
                  onChange={(e) => setProfitMargin(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Existing Monthly EMI: ₹{existingEMI.toLocaleString()}
                </label>
                <input
                  type="range"
                  min="0"
                  max="200000"
                  step="5000"
                  value={existingEMI}
                  onChange={(e) => setExistingEMI(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-red"
                />
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="text-md font-bold text-gray-900 dark:text-white border-b border-gray-50 dark:border-gray-700 pb-3 flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-primary-600" />
                <span>Underwriting Assessment Results</span>
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Monthly Operating Profit (EBITDA)</span>
                  <span className="font-bold text-gray-950 dark:text-white">₹{monthlyProfit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Safe EMI Ceiling (40% EBITDA)</span>
                  <span className="font-bold text-gray-950 dark:text-white">₹{safeEMICapacity.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Remaining Safe EMI Room</span>
                  <span className="font-bold text-primary-600">₹{remainingEMICapacity.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-50 dark:border-gray-700">
                  <span className="font-bold text-gray-700 dark:text-gray-300">Estimated Safe Term Loan Capacity</span>
                  <span className="font-extrabold text-lg text-primary-600">₹{estimatedSafeLoan.toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => navigate('/credit/readiness-report')}
              className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl text-xs transition-all shadow-md flex items-center justify-center space-x-2"
            >
              <span>Add to Borrower Report</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
