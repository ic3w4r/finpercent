import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, Activity, Wallet, ShieldAlert, ArrowUpRight, CheckCircle2, 
  ArrowRight, ShieldCheck, FileSpreadsheet, RefreshCw, AlertTriangle, 
  Calendar, FileText, TrendingUp, Info
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SankeyDiagram from '../components/charts/SankeyDiagram';

export default function OverviewPage() {
  const navigate = useNavigate();
  const [activeSegment, setActiveSegment] = useState<'manufacturing' | 'retail' | 'services'>('manufacturing');

  const topCards = [
    { 
      title: 'MSME Readiness Score', 
      value: '82/100', 
      desc: 'Bank-Ready Band', 
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-950/20',
      border: 'border-green-200 dark:border-green-900',
      path: '/msme-readiness'
    },
    { 
      title: 'Cash Flow Health', 
      value: 'Healthy', 
      desc: 'Stable Net Inflow', 
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-950/20',
      border: 'border-green-200 dark:border-green-900',
      path: '/financial/cash-flow'
    },
    { 
      title: 'Debt Pressure', 
      value: 'Moderate', 
      desc: 'EMI/Cashflow: 28%', 
      color: 'text-yellow-600 dark:text-yellow-400',
      bgColor: 'bg-yellow-50 dark:bg-yellow-950/20',
      border: 'border-yellow-200 dark:border-yellow-900',
      path: '/financial/debt-emi'
    },
    { 
      title: 'Document Completeness', 
      value: '92%', 
      desc: '11 of 12 Uploaded', 
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-950/20',
      border: 'border-green-200 dark:border-green-900',
      path: '/credit/document-checklist'
    },
    { 
      title: 'Risk Indicator', 
      value: 'Low Risk', 
      desc: '0 Critical Alerts', 
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-950/20',
      border: 'border-green-200 dark:border-green-900',
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
              {[
                { act: 'Upload Audited Balance Sheet (FY 2024-25)', days: 'Action plan: Day 15' },
                { act: 'Consolidate short-term OCC overdraft loan details', days: 'Action plan: Day 30' },
                { act: 'Verify vendor ledger linkages for GreenPlast Polymers', days: 'Action plan: Day 45' },
                { act: 'Reduce DSO to 35 days using automated reminders', days: 'Action plan: Day 60' },
                { act: 'Renew expired Udyam MSME Registration Certificate', days: 'Action plan: Immediate' }
              ].map((act, i) => (
                <li key={i} className="flex space-x-3 items-start">
                  <span className="w-5 h-5 rounded-full bg-primary-50 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300 font-bold flex items-center justify-center flex-shrink-0 text-[10px]">
                    {i + 1}
                  </span>
                  <div>
                    <span className="font-semibold text-gray-800 dark:text-gray-200 block">{act.act}</span>
                    <span className="text-[10px] text-gray-400 block mt-0.5">{act.days}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Missing Documents */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
            <h3 className="text-md font-bold text-gray-900 dark:text-white border-b border-gray-50 dark:border-gray-700 pb-3 flex items-center space-x-2">
              <FileText className="w-5 h-5 text-yellow-600" />
              <span>Pending Documents</span>
            </h3>
            <div className="space-y-3">
              {[
                { name: 'Udyam Registration Certificate', type: 'MSME Identity', status: 'Expired', action: 'Renew' },
                { name: 'Audited Financial Statements (Y2)', type: 'Financial Record', status: 'Missing', action: 'Upload' },
                { name: 'GST Filing GSTR-3B (May 2026)', type: 'Tax Record', status: 'Missing', action: 'Upload' }
              ].map((doc, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 dark:border-gray-700/40 last:border-0">
                  <div>
                    <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 block">{doc.name}</span>
                    <span className="text-[10px] text-gray-400 block">{doc.type}</span>
                  </div>
                  <button 
                    onClick={() => navigate('/credit/document-checklist')}
                    className="px-2.5 py-1 bg-yellow-50 hover:bg-yellow-100 dark:bg-yellow-950/20 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-900 rounded-md text-[10px] font-bold transition-all"
                  >
                    {doc.action}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Alerts & Early Warnings */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
            <h3 className="text-md font-bold text-gray-900 dark:text-white border-b border-gray-50 dark:border-gray-700 pb-3 flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <span>Risk & Alert Logs</span>
            </h3>
            <div className="space-y-3">
              {[
                { alert: 'DSO increased by 5 days in Peenya cluster', cat: 'Operations', risk: 'Low Alert' },
                { alert: 'Advance Tax payment due in 15 days', cat: 'Taxes', risk: 'Upcoming' },
                { alert: 'EMI/Cashflow ratio approaching 30% safe ceiling', cat: 'Debt', risk: 'Info' }
              ].map((log, i) => (
                <div key={i} className="flex items-start space-x-3 py-1 border-b border-gray-50 dark:border-gray-700/40 last:border-0">
                  <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <div>
                    <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 block leading-tight">{log.alert}</span>
                    <span className="text-[9px] text-gray-400 block mt-0.5">{log.cat} • {log.risk}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
