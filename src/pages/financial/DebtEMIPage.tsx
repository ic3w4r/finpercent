import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, CreditCard, TrendingDown, ArrowRight, DollarSign, 
  Building2, PiggyBank, Award, AlertTriangle, ShieldCheck 
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/Tabs';
import DebtMethodGuide from '../../components/debt/DebtMethodGuide';
import VelocityBanking from '../../components/debt/VelocityBanking';
import AvalancheMethod from '../../components/debt/AvalancheMethod';
import SnowballMethod from '../../components/debt/SnowballMethod';
import { useDebt } from '../../contexts/DebtContext';

export default function DebtEMIPage() {
  const navigate = useNavigate();
  const debtCtx = useDebt();

  const [showGuide, setShowGuide] = useState(true);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const handleMethodSelect = (method: string) => {
    setSelectedMethod(method);
    setShowGuide(false);
  };

  const totalOutstanding = (debtCtx.occ + debtCtx.od + debtCtx.wc) * 100; // Mock Scale
  const monthlyEMI = 45000;
  const averageMonthlyCashflow = 160000;
  const emiToCashflowRatio = Math.round((monthlyEMI / averageMonthlyCashflow) * 100);
  const safeEMICapacity = 72000; // 45% ceiling

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
          <h1 className="text-3xl font-extrabold text-primary-950 dark:text-white">Debt & EMI Capacity</h1>
          <p className="text-sm text-gray-500 max-w-lg mx-auto">
            Review borrowing thresholds, EMI-to-cashflow ratios, and deploy repayment restructuring strategies.
          </p>
        </div>

        {/* Debt Capacity Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Outstanding Debt', val: `₹${totalOutstanding.toLocaleString()}`, desc: 'Active facilities', color: 'text-gray-950 dark:text-white' },
            { label: 'Monthly EMI Obligations', val: `₹${monthlyEMI.toLocaleString()}`, desc: 'Fixed repayments', color: 'text-red-600' },
            { label: 'EMI/Cashflow Pressure', val: `${emiToCashflowRatio}%`, desc: 'Target: Below 40%', color: 'text-yellow-600' },
            { label: 'Safe EMI Capacity', val: `₹${safeEMICapacity.toLocaleString()}`, desc: 'Remaining buffer: 2.2x', color: 'text-green-600' }
          ].map((item, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-2">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 block">{item.label}</span>
              <span className={`text-xl font-bold block ${item.color}`}>{item.val}</span>
              <span className="text-[10px] text-gray-400 block">{item.desc}</span>
            </div>
          ))}
        </div>

        {/* Debt Pressure & Restructuring Suggestions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
            <h3 className="text-md font-bold text-gray-900 dark:text-white border-b border-gray-50 dark:border-gray-700 pb-3 flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <span>Leverage Pressure Summary</span>
            </h3>
            <div className="space-y-3 text-xs leading-relaxed text-gray-600 dark:text-gray-400">
              <p>
                Your outstanding debt facility utilizes <strong>{emiToCashflowRatio}%</strong> of monthly operating inflows. 
                The current pressure band is <strong>Moderate</strong>.
              </p>
              <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-100 dark:border-yellow-900/40 p-3 rounded-lg text-yellow-800 dark:text-yellow-400">
                <strong>Alert:</strong> Running 3 parallel loans (1 OCC overdraft and 2 vendor lines) increases operational payment friction.
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
            <h3 className="text-md font-bold text-gray-900 dark:text-white border-b border-gray-50 dark:border-gray-700 pb-3 flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-primary-600" />
              <span>Lending Gaps & Advice</span>
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-600 dark:text-gray-400">
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-1.5 flex-shrink-0"></span>
                <span>Consolidate multiple high-rate vendor lines into a single low-rate working capital facility.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-1.5 flex-shrink-0"></span>
                <span>Restructure debt tenure from 12 months to 24 months to lower the monthly EMI burden by 30%.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Interactive Restructuring Strategies (Snowball, Avalanche, Velocity) */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-gray-50 dark:border-gray-700 pb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Active Debt Payoff Simulator</h3>
              <p className="text-xs text-gray-500 mt-0.5">Explore Snowball, Avalanche, or Velocity methods to reduce outstanding interest</p>
            </div>
            {!showGuide && (
              <button 
                onClick={() => setShowGuide(true)}
                className="text-xs font-bold text-primary-600"
              >
                Show Strategy Guide
              </button>
            )}
          </div>

          {showGuide ? (
            <DebtMethodGuide onMethodSelect={handleMethodSelect} />
          ) : (
            <Tabs defaultValue={selectedMethod || 'velocity'} className="space-y-6">
              <TabsList className="bg-gray-50 dark:bg-gray-900 p-1 rounded-xl flex space-x-2 border border-gray-100 dark:border-gray-800">
                <TabsTrigger 
                  value="velocity" 
                  className="flex-1 py-2 px-3 rounded-lg text-center transition-all text-xs font-semibold data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-white shadow-sm"
                >
                  Velocity Banking
                </TabsTrigger>
                <TabsTrigger 
                  value="avalanche" 
                  className="flex-1 py-2 px-3 rounded-lg text-center transition-all text-xs font-semibold data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-white shadow-sm"
                >
                  Avalanche Method
                </TabsTrigger>
                <TabsTrigger 
                  value="snowball" 
                  className="flex-1 py-2 px-3 rounded-lg text-center transition-all text-xs font-semibold data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-white shadow-sm"
                >
                  Snowball Method
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="velocity" className="mt-4">
                <VelocityBanking />
              </TabsContent>
              
              <TabsContent value="avalanche" className="mt-4">
                <AvalancheMethod />
              </TabsContent>
              
              <TabsContent value="snowball" className="mt-4">
                <SnowballMethod />
              </TabsContent>
            </Tabs>
          )}
        </div>

      </div>
    </div>
  );
}
