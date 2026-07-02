import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, Briefcase, ChevronLeft, ArrowRight, ShieldCheck, 
  HelpCircle, AlertTriangle, Sparkles, DollarSign, Activity, Percent, ArrowUpRight
} from 'lucide-react';

export default function WorkingCapitalDiagnostic() {
  const navigate = useNavigate();

  // Input states (Values in INR Lakhs)
  const [pipelineValue, setPipelineValue] = useState(12.0);
  const [materialPct, setMaterialPct] = useState(40); // 40% of pipeline
  const [advancePct, setAdvancePct] = useState(25); // 25% advance received
  const [timelineDays, setTimelineDays] = useState(45);
  
  const [receivables, setReceivables] = useState(3.0);
  const [payables, setPayables] = useState(2.0);
  const [cashReserves, setCashReserves] = useState(1.5);
  const [existingDebt, setExistingDebt] = useState(0.8);

  // Diagnostic output states
  const [materialCost, setMaterialCost] = useState(0);
  const [advanceAmount, setAdvanceAmount] = useState(0);
  const [wcGap, setWcGap] = useState(0);
  const [safetyScore, setSafetyScore] = useState(0);
  const [safetyStatus, setSafetyStatus] = useState<'Safe' | 'Warning' | 'Critical'>('Warning');
  const [advRecommend, setAdvRecommend] = useState(30);

  useEffect(() => {
    // Calculators
    const cost = parseFloat((pipelineValue * (materialPct / 100)).toFixed(2));
    const advance = parseFloat((pipelineValue * (advancePct / 100)).toFixed(2));
    
    // Cash needed to start materials
    const cashDeficit = parseFloat((cost - advance).toFixed(2));
    
    // Total working capital gap including payables and receivables
    // Gap = Cost - Advance - Cash + Payables - Receivables
    const gap = parseFloat((cashDeficit - cashReserves + payables - receivables + existingDebt).toFixed(2));
    
    setMaterialCost(cost);
    setAdvanceAmount(advance);
    setWcGap(gap > 0 ? gap : 0);

    // Dynamic advance recommendation
    const recommendedAdvance = Math.max(materialPct - 5, 30);
    setAdvRecommend(recommendedAdvance);

    // Safety Score Calculation
    let score = 100;
    // Penalize if gap > cash
    if (gap > 0) {
      score -= (gap / cost) * 50;
    }
    // Penalize if timeline is short (liquidity pressure)
    if (timelineDays < 30) {
      score -= 15;
    }
    // Penalize for high payables
    if (payables > cashReserves * 2) {
      score -= 10;
    }
    
    const finalScore = Math.max(Math.min(Math.round(score), 100), 10);
    setSafetyScore(finalScore);

    if (finalScore >= 75) {
      setSafetyStatus('Safe');
    } else if (finalScore >= 50) {
      setSafetyStatus('Warning');
    } else {
      setSafetyStatus('Critical');
    }

  }, [pipelineValue, materialPct, advancePct, timelineDays, receivables, payables, cashReserves, existingDebt]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 p-6 pb-20 text-left">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Navigation */}
        <button
          onClick={() => navigate('/finning-circle/gateway')}
          className="neo-button glass-action px-4 py-2 text-gray-600 dark:text-gray-400 hover:shadow-lg transition-all duration-300 flex items-center text-xs font-semibold"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          <span>Back to Pathway</span>
        </button>

        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold text-primary-950 dark:text-white">Working-Capital Diagnostic</h1>
          <p className="text-sm text-gray-500 max-w-lg mx-auto">
            Convert your active TradeStream pipeline and cash cycles into an accurate working-capital assessment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Interactive Inputs (Lg-7) */}
          <div className="lg:col-span-7 bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-150 dark:border-gray-800 shadow-md space-y-6">
            <h3 className="font-bold text-base text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3">
              Demand & Operations Inputs
            </h3>

            {/* Pipeline Sliders */}
            <div className="space-y-5">
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-gray-700 dark:text-gray-300">Enquiry Pipeline Value</span>
                  <span className="text-primary">₹ {pipelineValue.toFixed(1)} Lakhs</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  step="0.5"
                  value={pipelineValue}
                  onChange={(e) => setPipelineValue(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-250 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-gray-700 dark:text-gray-300">Material Cost</span>
                    <span className="text-primary">{materialPct}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="80"
                    step="1"
                    value={materialPct}
                    onChange={(e) => setMaterialPct(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-250 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-gray-700 dark:text-gray-300">Client Advance</span>
                    <span className="text-primary">{advancePct}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="60"
                    step="1"
                    value={advancePct}
                    onChange={(e) => setAdvancePct(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-250 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-gray-700 dark:text-gray-300">Delivery Lead Time</span>
                  <span className="text-primary">{timelineDays} Days</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="180"
                  step="5"
                  value={timelineDays}
                  onChange={(e) => setTimelineDays(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-250 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

            </div>

            <h3 className="font-bold text-base text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3 pt-4">
              Balance Sheet & Liquidity Inputs
            </h3>

            {/* Financial Numerical Inputs */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="block font-bold text-gray-700 dark:text-gray-300">Receivables (Pending bills)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-gray-400">₹</span>
                  <input
                    type="number"
                    value={receivables}
                    onChange={(e) => setReceivables(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full bg-gray-55 dark:bg-gray-800 border rounded-xl pl-8 pr-4 py-2.5 font-bold"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block font-bold text-gray-700 dark:text-gray-300">Payables (Vendor bills)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-gray-400">₹</span>
                  <input
                    type="number"
                    value={payables}
                    onChange={(e) => setPayables(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full bg-gray-55 dark:bg-gray-800 border rounded-xl pl-8 pr-4 py-2.5 font-bold"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block font-bold text-gray-700 dark:text-gray-300">Cash Reserves</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-gray-400">₹</span>
                  <input
                    type="number"
                    value={cashReserves}
                    onChange={(e) => setCashReserves(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full bg-gray-55 dark:bg-gray-800 border rounded-xl pl-8 pr-4 py-2.5 font-bold"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block font-bold text-gray-700 dark:text-gray-300">Existing Monthly Debt/EMI</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-gray-400">₹</span>
                  <input
                    type="number"
                    value={existingDebt}
                    onChange={(e) => setExistingDebt(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full bg-gray-55 dark:bg-gray-800 border rounded-xl pl-8 pr-4 py-2.5 font-bold"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Diagnostic Results (Lg-5) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Safety Score Meter Card */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-150 dark:border-gray-800 shadow-md space-y-6">
              
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-base text-gray-900 dark:text-white">Order Safety Assessment</h3>
                  <p className="text-[10px] text-gray-400 font-mono">Fulfillment Risk rating</p>
                </div>
                <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${
                  safetyStatus === 'Safe' 
                    ? 'border-green-500 bg-green-500/10 text-green-700 dark:text-green-300' 
                    : safetyStatus === 'Warning'
                    ? 'border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-300'
                    : 'border-red-500 bg-red-500/10 text-red-700 dark:text-red-300'
                }`}>
                  {safetyStatus.toUpperCase()}
                </span>
              </div>

              {/* Progress Ring / Bar */}
              <div className="space-y-2">
                <div className="flex justify-between items-baseline text-xs font-bold text-gray-800 dark:text-gray-200">
                  <span>Safety Index</span>
                  <span className="text-lg">{safetyScore}/100</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-800 h-3 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-300 ${
                    safetyStatus === 'Safe' ? 'bg-green-500' : safetyStatus === 'Warning' ? 'bg-amber-500' : 'bg-red-500'
                  }`} style={{ width: `${safetyScore}%` }}></div>
                </div>
              </div>

              {/* Output values summary */}
              <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">Estimated Material Cost</span>
                  <span className="font-bold text-gray-950 dark:text-white">₹ {materialCost.toFixed(2)} Lakhs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">Client Advance Received</span>
                  <span className="font-bold text-gray-950 dark:text-white">₹ {advanceAmount.toFixed(2)} Lakhs</span>
                </div>
                <div className="flex justify-between border-t border-dashed pt-2 font-bold">
                  <span className="text-gray-800 dark:text-gray-200">Working-Capital Funding Gap</span>
                  <span className="text-red-650 dark:text-red-400">₹ {wcGap.toFixed(2)} Lakhs</span>
                </div>
              </div>

            </div>

            {/* Recommended Action Nudge Card */}
            <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-3xl p-6 space-y-4">
              <h4 className="font-bold text-sm text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-500" /> Actionable Recommendations
              </h4>

              <div className="space-y-3 text-xs leading-relaxed text-emerald-900 dark:text-emerald-400">
                <div className="flex gap-2">
                  <span className="shrink-0 font-bold">1.</span>
                  <p>
                    <strong>Increase Client Advance:</strong> Request at least <strong>{advRecommend}% advance</strong> from the buyer to cover raw material procurement (₹{materialCost.toFixed(1)}L) directly.
                  </p>
                </div>
                {wcGap > 0 && (
                  <div className="flex gap-2">
                    <span className="shrink-0 font-bold text-amber-500">2.</span>
                    <p>
                      <strong>Capital Deficit:</strong> A funding gap of <strong>₹{wcGap.toFixed(1)} Lakhs</strong> exists. We recommend generating a Credit-Ready File to secure short-term operational credit.
                    </p>
                  </div>
                )}
                {timelineDays < 30 && (
                  <div className="flex gap-2 text-amber-600 dark:text-amber-400 font-bold items-center">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>Warning: Tight delivery timeline increases liquidity default risks.</span>
                  </div>
                )}
              </div>
            </div>

            {/* Generate Credit File Link CTA */}
            {wcGap > 0 && (
              <button
                onClick={() => navigate('/credit/ready-file')}
                className="w-full py-4 bg-primary hover:bg-primary-650 text-white font-bold rounded-2xl text-xs shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-1.5"
              >
                <span>Generate Lender Credit-Ready File</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
