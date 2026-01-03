import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebt } from '../contexts/DebtContext';
import { ArrowRight, TrendingDown, BarChart3, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, ResponsiveContainer } from 'recharts';
import { useCurrency } from '../hooks/useCurrency';

// (removed unused base data) projections are generated from state below

// EMI Capacity Tool Types
type EmiCapacityResults = {
  survivalEmi: number;
  operatingEmi: number;
  stretchEmi: number;
  survivalLoan: number;
  operatingLoan: number;
  stretchLoan: number;
  behaviourScore: number;
  globalRiskColor: 'GREEN' | 'AMBER' | 'RED';
  avgAdjNetCash: number;
  volatility: number;
  wcNeedPerMonth: number;
  wcDeficit: number;
};

export default function DebtManagement() {
  const { formatAmount } = useCurrency();

  // Use persistent debt context for OCC / OD / WC and items
  const {
    occ, od, wc, occRate, odRate, wcRate,
    applySnowballTarget, applyAvalancheTarget, applyVelocityTarget
  } = useDebt();

  // EMI Capacity Tool state
  const [showEmiTool, setShowEmiTool] = useState(false);
  const [emiToolInputs, setEmiToolInputs] = useState({
    monthlyRevenue: 100000,
    monthlyFixed: 30000,
    p20Surplus: 15000,
    p50Surplus: 20000,
    p80Surplus: 25000,
    existingEmi: 5000,
    otherCommitments: 2000,
    interestRate: 16,
    tenureMonths: 60,
    gstOnTimeRatio: 0.7,
    chequeBounceCount: 2,
    monthsNegativeBalance: 3,
  });
  const [emiCapacityResults, setEmiCapacityResults] = useState<EmiCapacityResults | null>(null);

  // Helper to ensure non-negative
  const clamp = (v: number) => Math.max(0, Math.round(v));

  // Combined overview values
  const totalShortTerm = occ + od + wc;

  const navigate = useNavigate();

  // Repayment simulation handlers
  const applySnowball = () => {
    // delegate to context
    applySnowballTarget();
  };

  const applyAvalanche = () => {
    applyAvalancheTarget();
  };

  const applyVelocity = () => {
    applyVelocityTarget();
  };

  // EMI Capacity calculation
  const calculateEmiCapacity = () => {
    const n = (val: number) => (isNaN(val) ? 0 : val);

    // Basic inputs
    const monthlyRevenue = n(emiToolInputs.monthlyRevenue);
    const annualRevenue = monthlyRevenue * 12;
    const emiExisting = n(emiToolInputs.existingEmi);

    // Cashflow bands
    const p20_adj = n(emiToolInputs.p20Surplus);
    const p50_adj = n(emiToolInputs.p50Surplus);
    const p80_adj = n(emiToolInputs.p80Surplus);
    const avg_adj_net_cash = (p20_adj + p50_adj + p80_adj) / 3;

    // Volatility penalty
    const volatilityRaw = avg_adj_net_cash === 0 ? 0 : (p80_adj - p20_adj) / Math.max(avg_adj_net_cash, 1);
    const volatility = Math.max(0, Math.min(volatilityRaw, 1.5));

    let volFactor = 1;
    if (volatility < 0.3) volFactor = 1;
    else if (volatility <= 0.6) volFactor = 0.9;
    else volFactor = 0.75;

    // Apply volatility discount to surplus
    let cadsSafe = Math.max(0, (p20_adj - n(emiToolInputs.otherCommitments)) * volFactor);
    let cadsNormal = Math.max(0, (p50_adj - n(emiToolInputs.otherCommitments)) * volFactor);
    let cadsStretch = Math.max(0, (p80_adj - n(emiToolInputs.otherCommitments)) * volFactor);

    // Scale DSCR based on revenue size
    // For ₹10L revenue (~₹83K/month): use 1.5 DSCR (stricter)
    // For ₹1Cr+ revenue: use 1.3 DSCR (standard)
    const scaledDscr = annualRevenue < 1500000 ? 1.5 : annualRevenue < 5000000 ? 1.4 : 1.3;

    // Also apply revenue-based EMI caps: max EMI ≈ 2-3% of annual revenue per month
    const revenueBasedEmiCap = (annualRevenue * 0.025) / 12; // 2.5% of annual revenue
    const minimumEmiForSmallBiz = 1000; // For very small businesses

    // Calculate EMI capacity from CADS with DSCR
    const calcEmiNew = (cadsBand: number): number => {
      if (cadsBand <= 0) return 0;
      const totalEmiCapacity = cadsBand / scaledDscr;
      const newEmiCapacity = Math.max(0, totalEmiCapacity - emiExisting);
      return newEmiCapacity;
    };

    let emiSafeRaw = calcEmiNew(cadsSafe);
    let emiNormalRaw = calcEmiNew(cadsNormal);
    let emiStretchRaw = calcEmiNew(cadsStretch);

    // Cap EMI to revenue-based limits
    emiSafeRaw = Math.min(emiSafeRaw, revenueBasedEmiCap);
    emiNormalRaw = Math.min(emiNormalRaw, revenueBasedEmiCap * 1.2); // Stretch gets 20% more room
    emiStretchRaw = Math.min(emiStretchRaw, revenueBasedEmiCap * 1.5);

    // Apply 15% safety buffer for small businesses, 10% for larger
    const bufferPercent = annualRevenue < 1500000 ? 0.15 : 0.1;
    const emiSafeFinal = Math.max(0, emiSafeRaw * (1 - bufferPercent));
    const emiNormalFinal = Math.max(0, emiNormalRaw * (1 - bufferPercent));
    const emiStretchFinal = Math.max(0, emiStretchRaw * (1 - bufferPercent));

    // Round and apply minimum threshold
    const survivalEmi = emiSafeFinal < minimumEmiForSmallBiz ? 0 : Math.round(emiSafeFinal / 100) * 100; // Round to nearest ₹100
    const operatingEmi = emiNormalFinal < minimumEmiForSmallBiz ? 0 : Math.round(emiNormalFinal / 100) * 100;
    const stretchEmi = emiStretchFinal < minimumEmiForSmallBiz ? 0 : Math.round(emiStretchFinal / 100) * 100;

    const r = n(emiToolInputs.interestRate) / 100 / 12;
    const nMonths = n(emiToolInputs.tenureMonths);

    const loanFromEmi = (emi: number): number => {
      if (emi <= 0 || r <= 0 || nMonths <= 0) return 0;
      const pow = Math.pow(1 + r, nMonths);
      const principal = (emi * (pow - 1)) / (r * pow);
      return Math.round(principal);
    };

    const survivalLoan = loanFromEmi(survivalEmi);
    const operatingLoan = loanFromEmi(operatingEmi);
    const stretchLoan = loanFromEmi(stretchEmi);

    const gstScore = emiToolInputs.gstOnTimeRatio * 30;
    const chequeScore = emiToolInputs.chequeBounceCount === 0 ? 25 : emiToolInputs.chequeBounceCount <= 2 ? 20 : 10;
    const negBalScore = emiToolInputs.monthsNegativeBalance === 0 ? 20 : emiToolInputs.monthsNegativeBalance <= 3 ? 15 : 10;
    const behaviourScoreRaw = gstScore + chequeScore + negBalScore;
    const behaviourScore = Math.max(0, Math.min(100, Math.round(behaviourScoreRaw)));

    const baseEmi = operatingEmi > 0 ? operatingEmi : survivalEmi;
    const baseCads = operatingEmi > 0 ? cadsNormal : cadsSafe;
    const totalDebtService = emiExisting + baseEmi;
    const dscrBase = totalDebtService <= 0 ? 0 : baseCads / totalDebtService;
    const surplusAfterEmi = baseCads - baseEmi;
    const surplusRatio = monthlyRevenue <= 0 ? 0 : surplusAfterEmi / monthlyRevenue;

    let globalRiskColor: 'GREEN' | 'AMBER' | 'RED' = 'RED';
    if (dscrBase >= 1.5 && surplusRatio >= 0.5 && behaviourScore >= 70) {
      globalRiskColor = 'GREEN';
    } else if (dscrBase >= 1.2 && surplusRatio >= 0.2 && behaviourScore >= 50) {
      globalRiskColor = 'AMBER';
    }

    // Calculate WC need and deficit
    const wcNeedPerMonth = monthlyRevenue * 0.2; // Working capital typically 20% of revenue
    const wcDeficit = Math.max(0, wcNeedPerMonth - cadsNormal);

    const res: EmiCapacityResults = {
      survivalEmi,
      operatingEmi,
      stretchEmi,
      survivalLoan,
      operatingLoan,
      stretchLoan,
      behaviourScore,
      globalRiskColor,
      avgAdjNetCash: Math.round(avg_adj_net_cash),
      volatility: Number(volatility.toFixed(2)),
      wcNeedPerMonth: Math.round(wcNeedPerMonth),
      wcDeficit: Math.round(wcDeficit),
    };

    setEmiCapacityResults(res);
  };

  // Generate projected data for chart based on current balances and a chosen strategy
  const generateProjection = (method: 'none' | 'snowball' | 'avalanche' | 'velocity') => {
    const months = 6;
    let a = occ;
    let b = od;
    let c = wc;
    const monthly = [] as { date: string; value: number }[];

    for (let m = 1; m <= months; m++) {
      // interest add (simplified monthly)
      a = clamp(a + Math.round(a * (occRate / 100) / 12));
      b = clamp(b + Math.round(b * (odRate / 100) / 12));
      c = clamp(c + Math.round(c * (wcRate / 100) / 12));

      // repayment chunk depending on method
      if (method === 'snowball') {
        // pay small debts first
        const chunk = 2000;
        const smallest = Math.min(a, b, c);
        if (smallest === a) a = clamp(a - chunk);
        else if (smallest === b) b = clamp(b - chunk);
        else c = clamp(c - chunk);
      } else if (method === 'avalanche') {
        // pay highest rate first (b = od)
        const chunk = 2500;
        if (b > 0) b = clamp(b - chunk);
        else if (a > 0) a = clamp(a - chunk);
        else c = clamp(c - chunk);
      } else if (method === 'velocity') {
        // use working capital to accelerate payments
        const chunk = 1800;
        if (c > 0) {
          c = clamp(c - chunk);
          // transfer half to largest debt
          if (a > b) a = clamp(a - Math.round(chunk / 2));
          else b = clamp(b - Math.round(chunk / 2));
        }
      } else {
        // no method, small scheduled payments
        a = clamp(a - 800);
        b = clamp(b - 700);
        c = clamp(c - 400);
      }

      monthly.push({ date: `${m}M`, value: a + b + c });
    }

    return monthly;
  };

  const defaultProjection = useMemo(() => generateProjection('none'), [occ, od, wc]);
  const snowballProjection = useMemo(() => generateProjection('snowball'), [occ, od, wc]);
  const avalancheProjection = useMemo(() => generateProjection('avalanche'), [occ, od, wc]);
  const velocityProjection = useMemo(() => generateProjection('velocity'), [occ, od, wc]);

  // Which projection to show on chart
  const [projectionMethod, setProjectionMethod] = useState<'none' | 'snowball' | 'avalanche' | 'velocity'>('none');
  const dataForChart = useMemo(() => {
    if (projectionMethod === 'snowball') return snowballProjection;
    if (projectionMethod === 'avalanche') return avalancheProjection;
    if (projectionMethod === 'velocity') return velocityProjection;
    return defaultProjection;
  }, [projectionMethod, defaultProjection, snowballProjection, avalancheProjection, velocityProjection]);

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-xl p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">Total Debt</h2>
        <div className="flex items-baseline space-x-2 mt-2">
          <span className="text-3xl font-bold">{formatAmount(10000)}</span>
          <span className="text-sm text-primary-600">-8% Last 30 Days</span>
        </div>
      </div>
      {/* OCC / OD / Working Capital Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white/30 rounded-xl">
          <h4 className="font-medium">Open Cash Credit (OCC)</h4>
          <div className="text-2xl font-bold mt-2">{formatAmount(occ)}</div>
          <div className="text-sm text-gray-500">Rate: {occRate}% p.a.</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
            <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${Math.min(100, (occ / Math.max(1, totalShortTerm)) * 100)}%` }} />
          </div>
          <div className="mt-3 flex justify-end">
            <button
              onClick={() => navigate('/debt/occ')}
              className="neo-button glass-action px-3 py-1"
            >
              View details
            </button>
          </div>
        </div>

        <div className="p-4 bg-white/30 rounded-xl">
          <h4 className="font-medium">Overdraft (OD)</h4>
          <div className="text-2xl font-bold mt-2">{formatAmount(od)}</div>
          <div className="text-sm text-gray-500">Rate: {odRate}% p.a.</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
            <div className="bg-red-500 h-2 rounded-full" style={{ width: `${Math.min(100, (od / Math.max(1, totalShortTerm)) * 100)}%` }} />
          </div>
          <div className="mt-3 flex justify-end">
            <button
              onClick={() => navigate('/debt/od')}
              className="neo-button glass-action px-3 py-1"
            >
              View details
            </button>
          </div>
        </div>

        <div className="p-4 bg-white/30 rounded-xl">
          <h4 className="font-medium">Working Capital (WC Need)</h4>
          <div className="text-2xl font-bold mt-2">{formatAmount(wc)}</div>
          <div className="text-sm text-gray-500">Cost: {wcRate}% p.a.</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${Math.min(100, (wc / Math.max(1, totalShortTerm)) * 100)}%` }} />
          </div>
          <div className="mt-3 flex justify-end">
            <button
              onClick={() => navigate('/debt/wc')}
              className="neo-button glass-action px-3 py-1"
            >
              View details
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Debt Management Methods</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            onClick={applySnowball}
            className="flex items-center justify-between w-full p-4 glass-card rounded-xl hover:bg-white/40 transition-all"
            title="Apply Snowball simulation"
          >
            <div>
              <h4 className="font-medium">Snowball Method</h4>
              <p className="text-sm text-gray-600">Pay smallest debts first to gain momentum</p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400" />
          </button>

          <button
            onClick={applyAvalanche}
            className="flex items-center justify-between w-full p-4 glass-card rounded-xl hover:bg-white/40 transition-all"
            title="Apply Avalanche simulation"
          >
            <div>
              <h4 className="font-medium">Avalanche Method</h4>
              <p className="text-sm text-gray-600">Focus on highest interest rates to minimize cost</p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400" />
          </button>

          <button
            onClick={applyVelocity}
            className="flex items-center justify-between w-full p-4 glass-card rounded-xl hover:bg-white/40 transition-all"
            title="Apply Velocity Banking simulation"
          >
            <div>
              <h4 className="font-medium">Velocity Banking</h4>
              <p className="text-sm text-gray-600">Use WC buffers/lines to accelerate repayment</p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>
      {/* Projection Chart */}
      <div className="mt-6 p-4 bg-primary-50 rounded-xl">
        <h4 className="font-medium mb-3">Projected Short-Term Debt (6 months)</h4>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dataForChart}>
              <XAxis dataKey="date" axisLine={false} tickLine={false} />
              <Line type="monotone" dataKey="value" stroke="#4F46E5" strokeWidth={2} dot={{ r: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-2">
          <button onClick={() => setProjectionMethod('snowball')} className={`neo-button glass-action px-3 py-2 ${projectionMethod === 'snowball' ? 'ring-2 ring-offset-1 ring-amber-300' : ''}`}>Show Snowball</button>
          <button onClick={() => setProjectionMethod('avalanche')} className={`neo-button glass-action px-3 py-2 ${projectionMethod === 'avalanche' ? 'ring-2 ring-offset-1 ring-red-300' : ''}`}>Show Avalanche</button>
          <button onClick={() => setProjectionMethod('velocity')} className={`neo-button glass-action px-3 py-2 ${projectionMethod === 'velocity' ? 'ring-2 ring-offset-1 ring-blue-300' : ''}`}>Show Velocity</button>
        </div>

        <div className="flex items-start space-x-3 mt-4">
          <div className="p-2 bg-primary-100 rounded-full">
            <TrendingDown className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h4 className="font-medium">Actions & Guidance</h4>
            <p className="text-sm text-gray-600">Use the methods above to experiment with repayment approaches. Snowball builds momentum; Avalanche reduces interest cost; Velocity uses working capital lines carefully.</p>
          </div>
        </div>
      </div>

      {/* EMI Capacity Tool Section - Separate Card */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-6 h-6 text-primary-600" />
            <h3 className="text-lg font-bold text-gray-800">EMI Capacity Tool</h3>
          </div>
          <button
            onClick={() => {
              setShowEmiTool(!showEmiTool);
              if (!showEmiTool) calculateEmiCapacity();
            }}
            className="neo-button glass-action px-4 py-2 text-sm"
          >
            {showEmiTool ? 'Hide' : 'Analyze'}
          </button>
        </div>

        {showEmiTool && (
          <div className="mt-4 space-y-4">
            <p className="text-sm text-gray-600">Assess your EMI repayment capacity across three risk bands based on your cashflow and existing commitments.</p>

            {/* Quick input grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <EmiInputField
                label="Monthly Revenue (₹)"
                value={emiToolInputs.monthlyRevenue}
                onChange={(v) => setEmiToolInputs({ ...emiToolInputs, monthlyRevenue: v })}
              />
              <EmiInputField
                label="Monthly Fixed Costs (₹)"
                value={emiToolInputs.monthlyFixed}
                onChange={(v) => setEmiToolInputs({ ...emiToolInputs, monthlyFixed: v })}
              />
              <EmiInputField
                label="Existing EMI (₹)"
                value={emiToolInputs.existingEmi}
                onChange={(v) => setEmiToolInputs({ ...emiToolInputs, existingEmi: v })}
              />
              <EmiInputField
                label="Low Season Surplus (₹)"
                value={emiToolInputs.p20Surplus}
                onChange={(v) => setEmiToolInputs({ ...emiToolInputs, p20Surplus: v })}
              />
              <EmiInputField
                label="Median Surplus (₹)"
                value={emiToolInputs.p50Surplus}
                onChange={(v) => setEmiToolInputs({ ...emiToolInputs, p50Surplus: v })}
              />
              <EmiInputField
                label="High Season Surplus (₹)"
                value={emiToolInputs.p80Surplus}
                onChange={(v) => setEmiToolInputs({ ...emiToolInputs, p80Surplus: v })}
              />
            </div>

            <button
              onClick={calculateEmiCapacity}
              className="w-full neo-button glass-action px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-primary-800"
            >
              Calculate EMI Capacity
            </button>

            {/* Results display */}
            {emiCapacityResults && (
              <div className="mt-6 space-y-4">
                {/* Over-leveraged warning */}
                {emiCapacityResults.survivalEmi === 0 && emiCapacityResults.operatingEmi === 0 && emiCapacityResults.stretchEmi === 0 && (
                  <div className="p-4 bg-red-50 border-2 border-red-300 rounded-lg">
                    <div className="flex gap-3 items-start">
                      <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-red-800">Business Over-Leveraged</div>
                        <div className="text-sm text-red-700 mt-1">Your existing EMI commitments (₹{emiCapacityResults && emiToolInputs.existingEmi > 0 ? emiToolInputs.existingEmi.toLocaleString() : '0'}/month) exceed your repayment capacity. Consider:</div>
                        <ul className="text-sm text-red-700 mt-2 ml-4 list-disc">
                          <li>Restructuring/refinancing existing loans</li>
                          <li>Increasing business revenue to improve capacity</li>
                          <li>Consolidating high-interest debts at lower rates</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Risk badges */}
                <div className="grid grid-cols-4 gap-3">
                  <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                    <div className="text-xs font-medium text-gray-500">Debt Readiness</div>
                    <div
                      className={`text-sm font-bold mt-1 ${
                        emiCapacityResults.globalRiskColor === 'GREEN'
                          ? 'text-green-600'
                          : emiCapacityResults.globalRiskColor === 'AMBER'
                          ? 'text-amber-600'
                          : 'text-red-600'
                      }`}
                    >
                      {emiCapacityResults.globalRiskColor}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                    <div className="text-xs font-medium text-gray-500">Safe EMI</div>
                    <div className="text-sm font-bold mt-1 text-gray-800">
                      ₹{emiCapacityResults.survivalEmi.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                    <div className="text-xs font-medium text-gray-500">Max EMI</div>
                    <div className="text-sm font-bold mt-1 text-gray-800">
                      ₹{emiCapacityResults.operatingEmi.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                    <div className="text-xs font-medium text-gray-500">Behaviour Score</div>
                    <div className="text-sm font-bold mt-1 text-gray-800">
                      {emiCapacityResults.behaviourScore}/100
                    </div>
                  </div>
                </div>

                {/* EMI bands table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 px-2 font-semibold text-gray-700">Band</th>
                        <th className="text-left py-2 px-2 font-semibold text-gray-700">Monthly EMI</th>
                        <th className="text-left py-2 px-2 font-semibold text-gray-700">Loan Amount</th>
                        <th className="text-left py-2 px-2 font-semibold text-gray-700">Risk Level</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="py-2 px-2 text-gray-700">Survival</td>
                        <td className="py-2 px-2 text-gray-700">
                          ₹{emiCapacityResults.survivalEmi.toLocaleString()}
                        </td>
                        <td className="py-2 px-2 text-gray-700">
                          ₹{emiCapacityResults.survivalLoan > 0 ? emiCapacityResults.survivalLoan.toLocaleString() : '0'}
                        </td>
                        <td className="py-2 px-2 text-green-600 font-medium">Low</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-2 px-2 text-gray-700">Operating</td>
                        <td className="py-2 px-2 text-gray-700">
                          ₹{emiCapacityResults.operatingEmi.toLocaleString()}
                        </td>
                        <td className="py-2 px-2 text-gray-700">
                          ₹{emiCapacityResults.operatingLoan > 0 ? emiCapacityResults.operatingLoan.toLocaleString() : '0'}
                        </td>
                        <td className="py-2 px-2 text-amber-600 font-medium">Medium</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-2 text-gray-700">Stretch</td>
                        <td className="py-2 px-2 text-gray-700">
                          ₹{emiCapacityResults.stretchEmi.toLocaleString()}
                        </td>
                        <td className="py-2 px-2 text-gray-700">
                          ₹{emiCapacityResults.stretchLoan > 0 ? emiCapacityResults.stretchLoan.toLocaleString() : '0'}
                        </td>
                        <td className="py-2 px-2 text-red-600 font-medium">High</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Working capital warning */}
                {emiCapacityResults.wcDeficit > 0 && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-red-700">
                      <strong>Working Capital Alert:</strong> Your business needs ₹{emiCapacityResults.wcDeficit.toLocaleString()} in additional working capital. Stay in the Survival or Operating EMI band to protect liquidity.
                    </div>
                  </div>
                )}

                {/* Key metrics */}
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-sm text-blue-900 space-y-1">
                    <div><strong>Average cashflow:</strong> ₹{emiCapacityResults.avgAdjNetCash.toLocaleString()}/month</div>
                    <div><strong>Cashflow volatility:</strong> {emiCapacityResults.volatility} (Higher = more risky)</div>
                    <div><strong>Behaviour score:</strong> {emiCapacityResults.behaviourScore}/100 (Based on GST, cheques, withdrawals)</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

// Helper component for EMI tool inputs
const EmiInputField: React.FC<{ label: string; value: number; onChange: (v: number) => void }> = ({
  label,
  value,
  onChange,
}) => (
  <div>
    <label className="text-xs font-medium text-gray-600">{label}</label>
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(Number(e.target.value) || 0)}
      className="w-full mt-1 px-2 py-1 border border-gray-300 rounded-lg text-sm"
    />
  </div>
);
