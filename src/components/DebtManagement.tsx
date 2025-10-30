import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebt } from '../contexts/DebtContext';
import { ArrowRight, TrendingDown } from 'lucide-react';
import { LineChart, Line, XAxis, ResponsiveContainer } from 'recharts';
import { useCurrency } from '../hooks/useCurrency';

// (removed unused base data) projections are generated from state below

export default function DebtManagement() {
  const { formatAmount } = useCurrency();

  // Use persistent debt context for OCC / OD / WC and items
  const {
    occ, od, wc, occRate, odRate, wcRate,
    applySnowballTarget, applyAvalancheTarget, applyVelocityTarget
  } = useDebt();

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
    </div>
  );
}
