import { useLocation } from 'react-router-dom';
import { useCurrency } from '../hooks/useCurrency';
import { useDebt } from '../contexts/DebtContext';
import { LineChart, Line, XAxis, ResponsiveContainer } from 'recharts';

export default function DebtOCCPage() {
  const { formatAmount } = useCurrency();
  const location = useLocation();

  const state = (location.state as any) || {};
  const debtCtx = useDebt();
  const occ = state.occ ?? debtCtx.occ;
  const rate = state.occRate ?? debtCtx.occRate;
  const credits = state.occCredits ?? debtCtx.occCredits;
  const debits = state.occDebits ?? debtCtx.occDebits;

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto neo-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-600">Debt • OCC</div>
          <div className="space-x-2">
            <button onClick={() => debtCtx.applySnowballTarget('occ')} className="neo-button glass-action px-3 py-1">Apply Snowball</button>
            <button onClick={() => debtCtx.applyAvalancheTarget('occ')} className="neo-button glass-action px-3 py-1">Apply Avalanche</button>
            <button onClick={() => debtCtx.applyVelocityTarget('occ')} className="neo-button glass-action px-3 py-1">Use WC Transfer</button>
          </div>
        </div>
        <h2 className="text-2xl font-bold">Open Cash Credit (OCC) Details</h2>
        <p className="text-sm text-gray-600 mt-2">Balance: {formatAmount(occ)} • Rate: {rate}% p.a.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="col-span-1 md:col-span-2 mb-4">
            <h4 className="font-medium mb-2">Recent short-term flow (sample)</h4>
            <div className="h-36">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={(() => {
                  const months = 6;
                  const totalCredits = credits.reduce((s: number, c: any) => s + c.amount, 0);
                  const totalDebits = debits.reduce((s: number, d: any) => s + d.amount, 0);
                  const values = [] as { date: string; value: number }[];
                  for (let i = 1; i <= months; i++) {
                    const v = Math.max(0, Math.round(occ - ((totalDebits - totalCredits) / months) * i));
                    values.push({ date: `${i}M`, value: v });
                  }
                  return values;
                })()}>
                  <XAxis dataKey="date" axisLine={false} tickLine={false} />
                  <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="p-4 bg-white/30 rounded-lg">
            <h4 className="font-medium">Credits (Inflows)</h4>
            <ul className="mt-3 space-y-2">
              {credits.map((c: any) => (
                <li key={c.id} className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{c.label}</div>
                    <div className="text-sm text-gray-500">{formatAmount(c.amount)}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button onClick={() => debtCtx.removeItem('occ', 'credit', c.id)} className="text-sm text-red-600">Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-white/30 rounded-lg">
            <h4 className="font-medium">Debits (Outflows)</h4>
            <ul className="mt-3 space-y-2">
              {debits.map((d: any) => (
                <li key={d.id} className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{d.label}</div>
                    <div className="text-sm text-gray-500">{formatAmount(d.amount)}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button onClick={() => debtCtx.removeItem('occ', 'debit', d.id)} className="text-sm text-red-600">Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 p-4 bg-primary-50 rounded-lg">
          <h4 className="font-medium">How OCC helps</h4>
          <p className="text-sm text-gray-600">OCC provides a flexible short-term credit line to bridge inventory and receivable timing mismatches. Use it to smooth supplier payments, but monitor rates and rollovers.</p>
        </div>
      </div>
    </div>
  );
}
