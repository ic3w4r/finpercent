import React, { useState } from 'react';
import { useReadiness, SimulatedRole } from '../../contexts/ReadinessContext';
import { useNavigate } from 'react-router-dom';
import { 
  Sliders, User, ShieldCheck, Users, Briefcase, Zap, 
  ChevronRight, ChevronLeft, AlertTriangle, CheckCircle, 
  Trash2, X, RefreshCw, Eye, ShieldAlert, Award
} from 'lucide-react';

export default function SimulationPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const {
    activeRole, setActiveRole,
    score, band, subscores,
    penalties, rewards, auditLogs,
    simulateGSTOutdate, simulateBankStatementOutdate, simulateReceivablesOverdue, simulateHighEMI,
    notifications, clearNotifications, addNotification
  } = useReadiness();

  const handleRoleChange = (role: SimulatedRole) => {
    setActiveRole(role);
    addNotification(`🔄 Switched role perspective to: ${role.replace('_', ' ').toUpperCase()}`);
    
    // Navigate automatically based on role
    if (role === 'msme_owner') navigate('/overview');
    else if (role === 'bank') navigate('/bank/borrower-summary');
    else if (role === 'institution') navigate('/institution/portfolio');
    else if (role === 'advisor') navigate('/advisor/dashboard');
    else if (role === 'provider') navigate('/provider/dashboard');
  };

  const activePenaltiesList = penalties.filter(p => p.status === 'Active');

  return (
    <div className="fixed top-20 right-0 z-50 flex items-start select-none">
      {/* Drawer Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary-950 text-white dark:bg-primary-50 dark:text-black py-3 px-2 rounded-l-xl shadow-2xl border-y border-l border-white/20 dark:border-black/20 flex flex-col items-center space-y-1 hover:pr-3 transition-all duration-300"
      >
        <Sliders className="w-4 h-4 animate-pulse" />
        <span className="text-[8px] font-mono font-bold uppercase tracking-wider writing-mode-vertical">
          {isOpen ? 'Close' : 'Simulate'}
        </span>
        {isOpen ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>

      {/* Drawer Panel */}
      <div className={`bg-[#F4F4F1] dark:bg-gray-950 border-l border-neutral-350 dark:border-gray-800 shadow-2xl h-[85vh] w-80 overflow-y-auto p-4 transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex items-center justify-between pb-3 border-b border-neutral-300 dark:border-gray-800">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-amber-600 animate-bounce" />
            <h3 className="font-serif text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
              Prototype Console
            </h3>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 1. Perspective Switcher */}
        <div className="space-y-2 mt-4">
          <label className="block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-wider">
            Active Role Perspective
          </label>
          <div className="grid grid-cols-1 gap-1.5 text-xs">
            {[
              { role: 'msme_owner', label: 'MSME Owner', icon: User, desc: 'Command Center & Locker' },
              { role: 'bank', label: 'Bank Underwriter', icon: ShieldCheck, desc: 'Consent Blurring & Warnings' },
              { role: 'advisor', label: 'Accountant/Advisor', icon: Briefcase, desc: 'Verify files & bill gaps' },
              { role: 'institution', label: 'Institution Officer', icon: Users, desc: 'Aggregates & Program QR' },
              { role: 'provider', label: 'Provider Manager', icon: Sliders, desc: 'Campaign Conversion' }
            ].map((r) => {
              const Icon = r.icon;
              const active = activeRole === r.role;
              return (
                <button
                  key={r.role}
                  onClick={() => handleRoleChange(r.role as SimulatedRole)}
                  className={`p-2 rounded border text-left flex items-start space-x-2.5 transition-all ${
                    active 
                      ? 'bg-primary-950 text-white border-primary-950 shadow-md dark:bg-primary-50 dark:text-black dark:border-primary-50' 
                      : 'bg-white hover:bg-neutral-100 border-neutral-300 text-neutral-800 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-300'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${active ? 'text-amber-400 dark:text-amber-600' : 'text-neutral-500'}`} />
                  <div>
                    <div className="font-bold text-[11px] leading-tight">{r.label}</div>
                    <div className={`text-[9px] mt-0.5 leading-none ${active ? 'text-neutral-350 dark:text-neutral-700' : 'text-neutral-400'}`}>
                      {r.desc}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Real-Time Score Engine Ticker */}
        <div className="space-y-3 mt-5 p-3 bg-white dark:bg-gray-900 rounded border border-neutral-300 dark:border-gray-800 text-xs">
          <div className="flex justify-between items-center pb-2 border-b border-neutral-200 dark:border-gray-800">
            <span className="font-mono text-[9px] font-bold text-gray-500 uppercase tracking-wider">Score Engine Calculations</span>
            <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
              score >= 90 ? 'bg-emerald-100 text-emerald-800' :
              score >= 75 ? 'bg-green-100 text-green-800' :
              score >= 60 ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {band}
            </span>
          </div>

          <div className="text-center py-2">
            <div className="text-3xl font-extrabold text-primary-950 dark:text-primary-400 font-mono">
              {score}<span className="text-xs text-neutral-400 font-normal">/100</span>
            </div>
            <p className="text-[10px] text-neutral-400 mt-0.5">Calculated in real-time</p>
          </div>

          {/* Subscores Grid */}
          <div className="grid grid-cols-2 gap-1.5 text-[9px] font-semibold text-neutral-600 dark:text-neutral-400 border-t border-neutral-100 dark:border-gray-800 pt-2">
            <div>Cash Flow: <span className="font-bold text-primary-950 dark:text-white">{subscores.cashFlow}</span></div>
            <div>Debt Capacity: <span className="font-bold text-primary-950 dark:text-white">{subscores.debtPressure}</span></div>
            <div>Docs Completeness: <span className="font-bold text-primary-950 dark:text-white">{subscores.documentReadiness}</span></div>
            <div>Working Cap: <span className="font-bold text-primary-950 dark:text-white">{subscores.workingCapital}</span></div>
            <div>Compliance: <span className="font-bold text-primary-950 dark:text-white">{subscores.complianceConsistency}</span></div>
            <div>Data Freshness: <span className="font-bold text-primary-950 dark:text-white">{subscores.dataFreshness}</span></div>
          </div>

          {/* Active Penalties */}
          <div className="border-t border-neutral-150 dark:border-gray-800 pt-2 space-y-1">
            <span className="text-[8px] font-mono font-bold text-red-650 dark:text-red-400 block uppercase">Active Penalties ({activePenaltiesList.length})</span>
            {activePenaltiesList.length === 0 ? (
              <div className="text-[10px] text-emerald-600 font-semibold">✓ No active penalties! Strong funding profile.</div>
            ) : (
              <div className="space-y-1 max-h-24 overflow-y-auto">
                {activePenaltiesList.map((p) => (
                  <div key={p.penalty_id} className="flex justify-between items-start text-[9px] leading-tight text-red-700 dark:text-red-400">
                    <span className="truncate pr-1">• {p.reason}</span>
                    <span className="font-bold shrink-0">{p.penalty_points}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Earned Rewards */}
          <div className="border-t border-neutral-150 dark:border-gray-800 pt-2 space-y-1">
            <span className="text-[8px] font-mono font-bold text-[#346538] block uppercase">Earned Rewards ({rewards.length})</span>
            {rewards.length === 0 ? (
              <div className="text-[10px] text-neutral-400">No active score gains yet. Complete actions to boost score.</div>
            ) : (
              <div className="space-y-1 max-h-24 overflow-y-auto">
                {rewards.map((r) => (
                  <div key={r.reward_id} className="flex justify-between items-start text-[9px] leading-tight text-[#346538] dark:text-green-400">
                    <span className="truncate pr-1">• {r.reason}</span>
                    <span className="font-bold shrink-0">+{r.reward_points}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 3. Event Injectors */}
        <div className="space-y-2 mt-5">
          <label className="block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-wider">
            Simulated Event Injectors
          </label>
          <div className="bg-white dark:bg-gray-900 border border-neutral-300 dark:border-gray-800 rounded p-3 space-y-2 text-xs text-neutral-800 dark:text-gray-300">
            
            {/* Expire GST */}
            <div className="flex justify-between items-center py-1 border-b border-neutral-100 dark:border-gray-800">
              <span className="text-[10px] font-semibold">Outdate/Remove GST data</span>
              <button
                onClick={simulateGSTOutdate}
                className="px-2 py-1 text-[9px] bg-red-100 hover:bg-red-200 text-red-800 border border-red-200 rounded font-bold transition"
              >
                Inject Penalty
              </button>
            </div>

            {/* Expire Bank Statement */}
            <div className="flex justify-between items-center py-1 border-b border-neutral-100 dark:border-gray-800">
              <span className="text-[10px] font-semibold">Outdate Bank Statement</span>
              <button
                onClick={simulateBankStatementOutdate}
                className="px-2 py-1 text-[9px] bg-red-100 hover:bg-red-200 text-red-800 border border-red-200 rounded font-bold transition"
              >
                Inject Penalty
              </button>
            </div>

            {/* Receivables toggle */}
            <div className="flex justify-between items-center py-1 border-b border-neutral-100 dark:border-gray-800">
              <span className="text-[10px] font-semibold">Receivables &gt; 60 Days</span>
              <div className="flex items-center space-x-1">
                <input 
                  type="checkbox"
                  defaultChecked={true}
                  onChange={(e) => simulateReceivablesOverdue(e.target.checked)}
                  className="w-3.5 h-3.5"
                />
              </div>
            </div>

            {/* High EMI toggle */}
            <div className="flex justify-between items-center py-1">
              <span className="text-[10px] font-semibold">EMI Above Safe capacity</span>
              <div className="flex items-center space-x-1">
                <input 
                  type="checkbox"
                  onChange={(e) => simulateHighEMI(e.target.checked)}
                  className="w-3.5 h-3.5"
                />
              </div>
            </div>

          </div>
        </div>

        {/* 4. Audit Log Ticker */}
        <div className="space-y-2 mt-5">
          <div className="flex justify-between items-center">
            <label className="block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-wider">
              Consent Access Audit Trail
            </label>
            <ShieldAlert className="w-3.5 h-3.5 text-neutral-400" />
          </div>
          <div className="bg-black text-[#a8a7a3] font-mono text-[9px] rounded p-2 border border-neutral-300 dark:border-gray-800 space-y-1.5 max-h-36 overflow-y-auto leading-normal">
            {auditLogs.map((log) => (
              <div key={log.log_id} className="border-b border-neutral-800 pb-1 last:border-0">
                <div className="flex justify-between text-[8px] text-amber-500">
                  <span>{log.accessor_name}</span>
                  <span>{log.timestamp.split(' ')[1]}</span>
                </div>
                <div>{log.action_type} - {log.accessed_resource}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Notifications Box */}
        {notifications.length > 0 && (
          <div className="space-y-2 mt-5">
            <div className="flex justify-between items-center">
              <label className="block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-wider">
                Behavioral Nudge Alerts
              </label>
              <button 
                onClick={clearNotifications}
                className="text-[9px] font-bold text-primary-950 hover:underline"
              >
                Clear
              </button>
            </div>
            <div className="space-y-1">
              {notifications.map((note, idx) => (
                <div key={idx} className="p-2 bg-yellow-50 text-yellow-900 border border-yellow-200 rounded text-[9px] font-semibold leading-relaxed flex items-start space-x-1 shadow-sm">
                  <AlertTriangle className="w-3 h-3 text-yellow-600 shrink-0 mt-0.5" />
                  <span>{note}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
