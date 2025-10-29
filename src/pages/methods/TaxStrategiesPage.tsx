import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calculator,
  DollarSign,
  TrendingDown,
  Shield,
  FileText,
  PiggyBank,
  Building,
  Users,
  Calendar,
  Target
} from 'lucide-react';

export default function TaxStrategiesPage() {
  const [annualIncome, setAnnualIncome] = useState(1200000);
  const [taxRegime, setTaxRegime] = useState<'old' | 'new'>('new');
  
  const calculateTax = () => {
    if (taxRegime === 'new') {
      // New tax regime calculation
      let tax = 0;
      if (annualIncome > 300000) tax += Math.min(annualIncome - 300000, 300000) * 0.05;
      if (annualIncome > 600000) tax += Math.min(annualIncome - 600000, 300000) * 0.10;
      if (annualIncome > 900000) tax += Math.min(annualIncome - 900000, 300000) * 0.15;
      if (annualIncome > 1200000) tax += Math.min(annualIncome - 1200000, 300000) * 0.20;
      if (annualIncome > 1500000) tax += (annualIncome - 1500000) * 0.30;
      return Math.max(0, tax);
    } else {
      // Old tax regime calculation (simplified)
      let tax = 0;
      if (annualIncome > 250000) tax += Math.min(annualIncome - 250000, 250000) * 0.05;
      if (annualIncome > 500000) tax += Math.min(annualIncome - 500000, 500000) * 0.20;
      if (annualIncome > 1000000) tax += (annualIncome - 1000000) * 0.30;
      return Math.max(0, tax - 150000); // Standard deduction
    }
  };

  const taxAmount = calculateTax();
  const effectiveRate = (taxAmount / annualIncome) * 100;
  const afterTaxIncome = annualIncome - taxAmount;

  const taxStrategies = [
    {
      title: 'Section 80C Investments',
      description: 'Invest up to ₹1.5L in ELSS, PPF, EPF, NSC, etc.',
      maxDeduction: 150000,
      category: 'Deduction',
      color: 'blue'
    },
    {
      title: 'Section 80D Health Insurance',
      description: 'Health insurance premiums for self and family',
      maxDeduction: 75000,
      category: 'Health',
      color: 'green'
    },
    {
      title: 'HRA Benefit',
      description: 'House Rent Allowance exemption',
      maxDeduction: 200000,
      category: 'Allowance',
      color: 'purple'
    },
    {
      title: 'Section 24B Home Loan',
      description: 'Home loan interest deduction',
      maxDeduction: 200000,
      category: 'Property',
      color: 'orange'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-beige-50 to-primary-100 p-6 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="neo-button w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gradient-to-r from-red-100 to-orange-100">
            <DollarSign className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-primary-900 dark:text-primary-100 font-['Manrope'] mb-2">
            Tax Optimization Strategies
          </h1>
          <p className="text-primary-700 dark:text-gray-400 font-['Manrope'] text-lg">
            Smart tax planning and legal deduction strategies
          </p>
        </motion.div>

        {/* Tax Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
        >
          {/* Calculator Input */}
          <div className="neo-card p-6">
            <h3 className="text-lg font-bold text-primary-800 mb-4 font-['Manrope'] flex items-center">
              <Calculator className="w-5 h-5 mr-2" />
              Tax Calculator
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Income: ₹{(annualIncome / 100000).toFixed(1)}L
                </label>
                <input
                  type="range"
                  min="300000"
                  max="5000000"
                  step="50000"
                  value={annualIncome}
                  onChange={(e) => setAnnualIncome(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-green"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Tax Regime
                </label>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setTaxRegime('new')}
                    className={`flex-1 neo-button py-3 transition-all ${
                      taxRegime === 'new' 
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
                        : 'hover:shadow-md'
                    }`}
                  >
                    New Regime
                  </button>
                  <button
                    onClick={() => setTaxRegime('old')}
                    className={`flex-1 neo-button py-3 transition-all ${
                      taxRegime === 'old' 
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
                        : 'hover:shadow-md'
                    }`}
                  >
                    Old Regime
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tax Breakdown */}
          <div className="neo-card p-6">
            <h3 className="text-lg font-bold text-primary-800 mb-4 font-['Manrope'] flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Tax Breakdown
            </h3>
            
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-green-700">Gross Income</span>
                  <span className="text-lg font-bold text-green-700">
                    ₹{(annualIncome / 100000).toFixed(1)}L
                  </span>
                </div>
              </div>

              <div className="bg-red-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-red-700">Tax Liability</span>
                  <span className="text-lg font-bold text-red-700">
                    ₹{(taxAmount / 100000).toFixed(1)}L
                  </span>
                </div>
                <div className="text-xs text-red-600">
                  Effective Rate: {effectiveRate.toFixed(1)}%
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-blue-700">After-Tax Income</span>
                  <span className="text-xl font-bold text-blue-700">
                    ₹{(afterTaxIncome / 100000).toFixed(1)}L
                  </span>
                </div>
                <div className="text-xs text-blue-600">
                  Take-home: {((afterTaxIncome / annualIncome) * 100).toFixed(1)}%
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-700 mb-2">Quick Tips</h4>
                <div className="text-sm text-yellow-600 space-y-1">
                  {taxRegime === 'new' && <p>✓ No deductions available, but lower rates</p>}
                  {taxRegime === 'old' && <p>✓ Use Section 80C, 80D deductions to save tax</p>}
                  <p>✓ Consider salary restructuring for tax efficiency</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tax Saving Strategies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="neo-card p-6 mb-8"
        >
          <h3 className="text-lg font-bold text-primary-800 mb-6 font-['Manrope']">
            Tax Saving Strategies
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {taxStrategies.map((strategy, index) => (
              <motion.div
                key={strategy.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className={`neo-button p-4 text-left hover:shadow-md transition-all border-l-4 ${ 
                  strategy.color === 'blue' ? 'border-blue-500' :
                  strategy.color === 'green' ? 'border-green-500' :
                  strategy.color === 'purple' ? 'border-purple-500' :
                  'border-orange-500'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-gray-800">{strategy.title}</h4>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    strategy.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                    strategy.color === 'green' ? 'bg-green-100 text-green-700' :
                    strategy.color === 'purple' ? 'bg-purple-100 text-purple-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {strategy.category}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{strategy.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Max Deduction</span>
                  <span className={`font-bold ${
                    strategy.color === 'blue' ? 'text-blue-600' :
                    strategy.color === 'green' ? 'text-green-600' :
                    strategy.color === 'purple' ? 'text-purple-600' :
                    'text-orange-600'
                  }`}>
                    ₹{(strategy.maxDeduction / 100000).toFixed(1)}L
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tax Planning Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="neo-card p-6"
        >
          <h3 className="text-lg font-bold text-primary-800 mb-6 font-['Manrope']">
            Tax Planning Calendar
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="neo-button w-16 h-16 mx-auto mb-3 bg-gradient-to-r from-green-100 to-green-200 flex items-center justify-center">
                <Calendar className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-bold text-green-700 mb-2">April - June</h4>
              <p className="text-sm text-gray-600">Plan investments and salary structure for new financial year</p>
            </div>
            
            <div className="text-center">
              <div className="neo-button w-16 h-16 mx-auto mb-3 bg-gradient-to-r from-blue-100 to-blue-200 flex items-center justify-center">
                <PiggyBank className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-bold text-blue-700 mb-2">July - December</h4>
              <p className="text-sm text-gray-600">Execute tax-saving investments and monitor progress</p>
            </div>
            
            <div className="text-center">
              <div className="neo-button w-16 h-16 mx-auto mb-3 bg-gradient-to-r from-red-100 to-red-200 flex items-center justify-center">
                <FileText className="w-8 h-8 text-red-600" />
              </div>
              <h4 className="font-bold text-red-700 mb-2">January - March</h4>
              <p className="text-sm text-gray-600">Complete pending investments and file ITR</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}