import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, Activity, Wallet, ShieldAlert, ArrowUpRight, CheckCircle2, 
  ArrowRight, ShieldCheck, FileSpreadsheet, RefreshCw, AlertTriangle, 
  Calendar, FileText, TrendingUp, Info
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SankeyDiagram from '../components/charts/SankeyDiagram';

import { useReadiness } from '../contexts/ReadinessContext';

export default function OverviewPage() {
  const navigate = useNavigate();
  const { score, band, subscores, documents, penalties, actions } = useReadiness();
  const [activeSegment, setActiveSegment] = useState<'manufacturing' | 'retail' | 'services'>('manufacturing');

  const docCompleteCount = documents.filter(d => d.status === 'Complete').length;
  const docPct = Math.round((docCompleteCount / documents.length) * 100);
  const activePenaltiesCount = penalties.filter(p => p.status === 'Active').length;
  const criticalPenaltiesCount = penalties.filter(p => p.status === 'Active' && p.severity === 'Critical').length;

  const topCards = [
    { 
      title: 'MSME Readiness Score', 
      value: `${score}/100`, 
      desc: `${band} Band`, 
      color: score >= 75 ? 'text-green-600 dark:text-green-400' : score >= 60 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-650 dark:text-red-400',
      bgColor: score >= 75 ? 'bg-green-50 dark:bg-green-950/20' : score >= 60 ? 'bg-yellow-50 dark:bg-yellow-950/20' : 'bg-red-50 dark:bg-red-950/20',
      border: score >= 75 ? 'border-green-200 dark:border-green-900' : score >= 60 ? 'border-yellow-200 dark:border-yellow-900' : 'border-red-200 dark:border-red-900',
      path: '/msme-readiness'
    },
    { 
      title: 'Cash Flow Health', 
      value: subscores.cashFlow >= 75 ? 'Healthy' : subscores.cashFlow >= 60 ? 'Moderate' : 'Stressed', 
      desc: subscores.cashFlow >= 75 ? 'Stable Net Inflow' : 'Buffer days warning', 
      color: subscores.cashFlow >= 75 ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400',
      bgColor: subscores.cashFlow >= 75 ? 'bg-green-50 dark:bg-green-950/20' : 'bg-yellow-50 dark:bg-yellow-950/20',
      border: subscores.cashFlow >= 75 ? 'border-green-200 dark:border-green-900' : 'border-yellow-200 dark:border-yellow-900',
      path: '/financial/cash-flow'
    },
    { 
      title: 'Debt Pressure', 
      value: subscores.debtPressure >= 75 ? 'Safe Limit' : subscores.debtPressure >= 60 ? 'Moderate' : 'Critical', 
      desc: `EMI/Cashflow: ${subscores.debtPressure >= 75 ? '28%' : '52%'}`, 
      color: subscores.debtPressure >= 75 ? 'text-green-600 dark:text-green-400' : subscores.debtPressure >= 60 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-650 dark:text-red-400',
      bgColor: subscores.debtPressure >= 75 ? 'bg-green-50 dark:bg-green-950/20' : subscores.debtPressure >= 60 ? 'bg-yellow-50 dark:bg-yellow-950/20' : 'bg-red-50 dark:bg-red-950/20',
      border: subscores.debtPressure >= 75 ? 'border-green-200 dark:border-green-900' : subscores.debtPressure >= 60 ? 'border-yellow-200 dark:border-yellow-900' : 'border-red-200 dark:border-red-900',
      path: '/financial/debt-emi'
    },
    { 
      title: 'Document Completeness', 
      value: `${docPct}%`, 
      desc: `${docCompleteCount} of ${documents.length} Verified`, 
      color: docPct >= 85 ? 'text-green-600 dark:text-green-400' : docPct >= 60 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-650 dark:text-red-400',
      bgColor: docPct >= 85 ? 'bg-green-50 dark:bg-green-950/20' : docPct >= 60 ? 'bg-yellow-50 dark:bg-yellow-950/20' : 'bg-red-50 dark:bg-red-950/20',
      border: docPct >= 85 ? 'border-green-200 dark:border-green-900' : docPct >= 60 ? 'border-yellow-200 dark:border-yellow-900' : 'border-red-200 dark:border-red-900',
      path: '/credit/document-checklist'
    },
    { 
      title: 'Risk & Alerts', 
      value: activePenaltiesCount === 0 ? 'Low Risk' : `${activePenaltiesCount} Warnings`, 
      desc: criticalPenaltiesCount > 0 ? `${criticalPenaltiesCount} Critical Alerts` : '0 Critical Alerts', 
      color: activePenaltiesCount === 0 ? 'text-green-600 dark:text-green-400' : activePenaltiesCount <= 2 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-650 dark:text-red-400',
      bgColor: activePenaltiesCount === 0 ? 'bg-green-50 dark:bg-green-950/20' : activePenaltiesCount <= 2 ? 'bg-yellow-50 dark:bg-yellow-950/20' : 'bg-red-50 dark:bg-red-950/20',
      border: activePenaltiesCount === 0 ? 'border-green-200 dark:border-green-900' : activePenaltiesCount <= 2 ? 'border-yellow-200 dark:border-yellow-900' : 'border-red-200 dark:border-red-900',
      path: '/credit/red-flags'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 p-6 pb-20">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-primary-950 dark:text-white">Command Center</h1>
            <p className="text-sm text-gray-500 mt-1">MSME Financial Health & Bank-Readiness Dashboard</p>
          </div>
          <div className="flex items-center space-x-3 text-xs font-semibold">
            <span className="text-gray-500">Classification Segment:</span>
            {['manufacturing', 'retail', 'services'].map((seg) => (
              <button
                key={seg}
                onClick={() => setActiveSegment(seg as any)}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  activeSegment === seg 
                    ? 'bg-primary-600 border-primary-600 text-white shadow-sm'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                {seg.charAt(0).toUpperCase() + seg.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Top Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {topCards.map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -3 }}
              onClick={() => navigate(card.path)}
              className={`p-5 rounded-2xl border ${card.bgColor} ${card.border} hover:shadow-lg cursor-pointer transition-all space-y-3`}
            >
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 block h-8 leading-tight">
                {card.title}
              </span>
              <div className="space-y-1">
                <span className={`text-2xl font-bold block ${card.color}`}>{card.value}</span>
                <span className="text-[10px] text-gray-400 block font-medium">{card.desc}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Middle Section: Cash flow flow diagram & Working capital gap */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Sankey Flow analysis */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-50 dark:border-gray-700 pb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Cohesive Cash Flow Splits</h3>
                <p className="text-xs text-gray-500 mt-0.5">Visualizing monthly revenue flows based on S.T.O.P allocations</p>
              </div>
              <button 
                onClick={() => navigate('/financial/stop-method')}
                className="text-xs font-bold text-primary-600 hover:text-primary-700 flex items-center space-x-1"
              >
                <span>Edit S.T.O.P Rules</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="overflow-x-auto flex justify-center py-2">
              <SankeyDiagram 
                data={{
                  nodes: [
                    { name: "Monthly Revenue", value: 1200000 },
                    { name: "Cash Inflows", value: 1200000 },
                    { name: "Savings (20%)", value: 240000 },
                    { name: "Taxes (15%)", value: 180000 },
                    { name: "Operations (45%)", value: 540000 },
                    { name: "Profit (20%)", value: 240000 }
                  ],
                  links: [
                    { source: 0, target: 1, value: 1200000 },
                    { source: 1, target: 2, value: 240000 },
                    { source: 1, target: 3, value: 180000 },
                    { source: 1, target: 4, value: 540000 },
                    { source: 1, target: 5, value: 240000 }
                  ]
                }}
                width={700}
                height={320}
              />
            </div>
          </div>

          {/* Debt Capacity & Working Capital Summary */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="border-b border-gray-50 dark:border-gray-700 pb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Credit Readiness Gaps</h3>
                <p className="text-xs text-gray-500 mt-0.5">Calculated parameters for lender reviews</p>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Recommended Loan Capacity', val: '₹25,00,000', context: 'Safe borrowing threshold' },
                  { label: 'Calculated Working Capital Gap', val: '₹8,50,000', context: 'Receivables mismatch' },
                  { label: 'Days Sales Outstanding (DSO)', val: '42 Days', context: 'Invoice aging lock-in' },
                  { label: 'Days Payable Outstanding (DPO)', val: '30 Days', context: 'Supplier pressure' }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-1.5 border-b border-gray-50 dark:border-gray-700/50 last:border-0">
                    <div>
                      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 block">{item.label}</span>
                      <span className="text-[10px] text-gray-400 block">{item.context}</span>
                    </div>
                    <span className="text-sm font-bold text-primary-950 dark:text-white">{item.val}</span>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => navigate('/credit/readiness-report')}
              className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-md transition-all text-xs flex items-center justify-center space-x-2"
            >
              <span>Full Borrowing Report</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Bottom Section: Top 5 actions, missing docs, alerts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Top 5 Recommended Actions */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
            <h3 className="text-md font-bold text-gray-900 dark:text-white border-b border-gray-50 dark:border-gray-700 pb-3 flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-primary-600" />
              <span>Top Actions Required</span>
            </h3>
            <ul className="space-y-3 text-xs">
              {actions.filter(a => a.completion_status === 'Pending').slice(0, 5).map((act, i) => (
                <li key={act.action_id} className="flex space-x-3 items-start cursor-pointer" onClick={() => navigate('/action-plan')}>
                  <span className="w-5 h-5 rounded-full bg-primary-50 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300 font-bold flex items-center justify-center flex-shrink-0 text-[10px]">
                    {i + 1}
                  </span>
                  <div>
                    <span className="font-semibold text-gray-800 dark:text-gray-200 block">{act.text}</span>
                    <span className="text-[10px] text-gray-400 block mt-0.5">{act.due_date} • {act.priority} Priority</span>
                  </div>
                </li>
              ))}
              {actions.filter(a => a.completion_status === 'Pending').length === 0 && (
                <div className="text-xs text-green-600 font-semibold p-2">🎉 All action plan items completed! Your score is optimized.</div>
              )}
            </ul>
          </div>

          {/* Missing Documents */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
            <h3 className="text-md font-bold text-gray-900 dark:text-white border-b border-gray-50 dark:border-gray-700 pb-3 flex items-center space-x-2">
              <FileText className="w-5 h-5 text-yellow-600" />
              <span>Pending Documents</span>
            </h3>
            <div className="space-y-3">
              {documents.filter(d => d.status !== 'Complete').slice(0, 3).map((doc) => (
                <div key={doc.id} className="flex justify-between items-center py-2 border-b border-gray-50 dark:border-gray-700/40 last:border-0">
                  <div>
                    <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 block">{doc.name}</span>
                    <span className="text-[10px] text-gray-400 block">{doc.category} • {doc.status}</span>
                  </div>
                  <button 
                    onClick={() => navigate('/credit/document-checklist')}
                    className="px-2.5 py-1 bg-yellow-50 hover:bg-yellow-100 dark:bg-yellow-950/20 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-900 rounded-md text-[10px] font-bold transition-all"
                  >
                    {doc.status === 'Expired' ? 'Renew' : 'Upload'}
                  </button>
                </div>
              ))}
              {documents.filter(d => d.status !== 'Complete').length === 0 && (
                <div className="text-xs text-green-600 font-semibold p-2">🎉 Document locker is fully complete and audited!</div>
              )}
            </div>
          </div>

          {/* Alerts & Early Warnings */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
            <h3 className="text-md font-bold text-gray-900 dark:text-white border-b border-gray-50 dark:border-gray-700 pb-3 flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <span>Risk & Alert Logs</span>
            </h3>
            <div className="space-y-3">
              {penalties.filter(p => p.status === 'Active').slice(0, 3).map((log) => (
                <div key={log.penalty_id} className="flex items-start space-x-3 py-1 border-b border-gray-50 dark:border-gray-700/40 last:border-0">
                  <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <div>
                    <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 block leading-tight">{log.reason}</span>
                    <span className="text-[9px] text-gray-400 block mt-0.5">{log.penalty_type} • Deduction: {log.penalty_points}</span>
                  </div>
                </div>
              ))}
              {penalties.filter(p => p.status === 'Active').length === 0 && (
                <div className="text-xs text-green-600 font-semibold p-2">🎉 No active risk flags or penalties. business profile is clean.</div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
