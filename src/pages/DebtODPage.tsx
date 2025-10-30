import { useLocation } from 'react-router-dom';
import { useCurrency } from '../hooks/useCurrency';
import { useDebt } from '../contexts/DebtContext';
import { LineChart, Line, XAxis, ResponsiveContainer } from 'recharts';

export default function DebtODPage() {
  const { formatAmount } = useCurrency();
  const location = useLocation();
  const state = (location.state as any) || {};
  const debtCtx = useDebt();
  const od = state.od ?? debtCtx.od;
  const rate = state.odRate ?? debtCtx.odRate;
  const credits = state.odCredits ?? debtCtx.odCredits;
  const debits = state.odDebits ?? debtCtx.odDebits;

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto neo-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-600">Debt • OD</div>
          <div className="space-x-2">
            <button onClick={() => debtCtx.applySnowballTarget('od')} className="neo-button glass-action px-3 py-1">Apply Snowball</button>
            <button onClick={() => debtCtx.applyAvalancheTarget('od')} className="neo-button glass-action px-3 py-1">Apply Avalanche</button>
            <button onClick={() => debtCtx.applyVelocityTarget('od')} className="neo-button glass-action px-3 py-1">Use WC Transfer</button>
          </div>
        </div>
        <h2 className="text-2xl font-bold">Overdraft (OD) Details</h2>
        <p className="text-sm text-gray-600 mt-2">Balance: {formatAmount(od)} • Rate: {rate}% p.a.</p>

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
                    const v = Math.max(0, Math.round(od - ((totalDebits - totalCredits) / months) * i));
                    values.push({ date: `${i}M`, value: v });
                  }
                  return values;
                })()}>
                  <XAxis dataKey="date" axisLine={false} tickLine={false} />
                  <Line type="monotone" dataKey="value" stroke="#EF4444" strokeWidth={2} dot={false} />
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
                  <div>
                    <button onClick={() => debtCtx.removeItem('od', 'credit', c.id)} className="text-sm text-red-600">Delete</button>
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
                  <div>
                    <button onClick={() => debtCtx.removeItem('od', 'debit', d.id)} className="text-sm text-red-600">Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 p-4 bg-primary-50 rounded-lg">
          <h4 className="font-medium">How OD works</h4>
          <p className="text-sm text-gray-600">An overdraft is a short-term facility tied to your account. It's useful for short timing gaps but can be costly if left unchecked. Prioritise repaying the OD balance when rates spike.</p>
        </div>
      </div>
    </div>
  );
}
