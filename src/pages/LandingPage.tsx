import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Shield, Activity, FileText, CheckCircle2, TrendingUp, Users, 
  Map, FileSpreadsheet, Building2, HelpCircle, Briefcase, ChevronRight, Award
} from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 p-6 pb-20 overflow-x-hidden">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* SECTION 1: HERO */}
        <motion.div 
          className="text-center pt-10 pb-6 max-w-4xl mx-auto space-y-6"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <div className="inline-flex items-center space-x-2 bg-primary-100 dark:bg-primary-900/40 text-primary-800 dark:text-primary-300 px-4 py-1.5 rounded-full text-sm font-semibold border border-primary-200 dark:border-primary-800">
            <span className="w-2 h-2 bg-primary-500 rounded-full animate-ping"></span>
            <span>V1.0 Live: MSME Readiness Infrastructure</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-primary-950 dark:text-white tracking-tight leading-tight">
            Finpercent for MSMEs
          </h1>
          <p className="text-xl md:text-2xl text-primary-800 dark:text-gray-300 font-medium">
            Financial Readiness, Credit Intelligence, and Growth Support Platform
          </p>
          <p className="text-md md:text-lg text-primary-600 dark:text-gray-400 max-w-2xl mx-auto">
            Helping MSMEs become financially visible, bank-ready, and growth-ready.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button
              onClick={() => navigate('/msme-readiness')}
              className="px-8 py-4 bg-gradient-to-r from-primary-600 to-green-600 hover:from-primary-700 hover:to-green-700 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <span>Generate MSME Readiness Report</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate('/institution/portfolio')}
              className="px-8 py-4 bg-white dark:bg-gray-800 text-primary-900 dark:text-white font-semibold rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-md transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <span>View Institution Dashboard</span>
            </button>
          </div>
        </motion.div>

        {/* SECTION 2: MSME PROBLEMS */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-primary-950 dark:text-white">The MSME Capital Access Problem</h2>
            <p className="text-primary-600 dark:text-gray-400 mt-2">Critical challenges MSMEs face when seeking growth funding</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Limited Financial Visibility', desc: 'Fragmented accounting records and bank transactions make it hard for lenders to assess credit viability.' },
              { title: 'Weak Cash Flow Discipline', desc: 'Unmonitored inflow/outflow splits result in sudden liquidity crunches and late payment defaults.' },
              { title: 'Difficulty Accessing Formal Credit', desc: 'Lack of structured borrowers files means rejection at banks and heavy reliance on informal loans.' },
              { title: 'Incomplete Records', desc: 'Missing GST logs, outdated statements, and expired compliance certificates cause assessment delays.' },
              { title: 'Delayed Receivables', desc: 'Cash locked up in pending client payments with no structured working capital gap financing.' },
              { title: 'Low Growth Readiness', desc: 'Owners struggle to identify debt thresholds, safe EMI capacities, and operational efficiency leaks.' }
            ].map((prob, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-md hover:shadow-xl transition-all"
              >
                <div className="w-10 h-10 bg-red-100 dark:bg-red-950/30 text-red-600 dark:text-red-400 rounded-lg flex items-center justify-center font-bold mb-4">
                  0{i + 1}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{prob.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{prob.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* SECTION 3: WHAT FINPERCENT DOES (FLOW) */}
        <div className="bg-primary-950 text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.15),transparent)]"></div>
          <div className="relative z-10 space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-3xl font-bold">Unlocking Credit Readiness</h2>
              <p className="text-primary-300">How Finpercent converts scattered financial records into formal credit access</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              {[
                { step: 'Data Ingestion', label: 'Data', desc: 'Upload bank statements, GST, invoices, and debt schedules.' },
                { step: 'Financial Intelligence', label: 'Clarity', desc: 'Understand monthly cash cycles, EMI capacity, and gaps.' },
                { step: 'Credit Readiness', label: 'Readiness', desc: 'Receive scorecards, missing document warnings, and flags.' },
                { step: 'Access & Expansion', label: 'Growth', desc: 'Generate bank-ready reports and district monitoring views.' }
              ].map((flow, i) => (
                <div key={i} className="flex flex-col items-center text-center p-4 space-y-3">
                  <div className="w-12 h-12 bg-primary-800 text-primary-300 rounded-full flex items-center justify-center font-bold text-lg border border-primary-700 shadow-md">
                    {i + 1}
                  </div>
                  <div className="text-xs uppercase font-bold tracking-widest text-primary-400">{flow.label}</div>
                  <h3 className="text-lg font-semibold">{flow.step}</h3>
                  <p className="text-sm text-primary-200/80">{flow.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 4: DATA INPUTS */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-primary-950 dark:text-white">Seamless Data Integration</h2>
            <p className="text-primary-600 dark:text-gray-400 mt-2">We ingest data from multiple touchpoints without disruptive ERP migrations</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
            {[
              { icon: FileText, label: 'Bank Statements' },
              { icon: Activity, label: 'GST & Tax Filings' },
              { icon: FileSpreadsheet, label: 'Tally Exports' },
              { icon: Briefcase, label: 'Zoho / ERP Data' },
              { icon: Award, label: 'Invoices & Bills' },
              { icon: TrendingUp, label: 'Outstanding Loans' },
              { icon: Building2, label: 'Company Profile' }
            ].map((input, i) => {
              const Icon = input.icon;
              return (
                <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded-xl text-center border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center space-y-2 shadow-sm">
                  <div className="p-3 bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 rounded-lg">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{input.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 5: CORE CAPABILITIES */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-primary-950 dark:text-white">Core Capabilities</h2>
            <p className="text-primary-600 dark:text-gray-400 mt-2">Comprehensive credit diagnostics and decision support tools</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              { title: 'Readiness Report', desc: 'Instant 0-100 score on borrowing status, highlighting core compliance gaps.' },
              { title: 'Cash Flow & Debt View', desc: 'Calculates net surplus and safe borrowing limit to avoid default risk.' },
              { title: 'Working Capital IQ', desc: 'Visualizes lock-in days and calculates supplier vs. customer timing gaps.' },
              { title: 'Early Warning Flags', desc: 'Continuous monitor of risk parameters, predicting defaults before they occur.' },
              { title: 'Institution Dashboard', desc: 'Aggregated view by district, cluster, and sector for development officers.' }
            ].map((cap, i) => (
              <div key={i} className="bg-white dark:bg-gray-800/40 p-5 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-3">
                <h3 className="font-bold text-primary-900 dark:text-primary-400">{cap.title}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 6: DASHBOARD PREVIEW */}
        <div className="bg-white dark:bg-gray-800/80 p-8 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Interactive Readiness Diagnostics</h3>
              <p className="text-sm text-gray-500 mt-1">Real-time status simulation for a standard MSME (manufacturing firm)</p>
            </div>
            <button 
              onClick={() => navigate('/overview')}
              className="mt-4 md:mt-0 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-semibold flex items-center space-x-2 self-start"
            >
              <span>Access Command Center</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
            {[
              { label: 'Readiness Score', val: '82/100', color: 'text-green-600 dark:text-green-400', desc: 'Bank Ready' },
              { label: 'Cash Flow Health', val: 'Healthy', color: 'text-green-600 dark:text-green-400', desc: 'Stable Inflows' },
              { label: 'Debt Pressure', val: 'Moderate', color: 'text-yellow-600 dark:text-yellow-400', desc: 'DSR 28%' },
              { label: 'Doc Completeness', val: '92%', color: 'text-green-600 dark:text-green-400', desc: '11/12 Present' },
              { label: 'Risk Indicator', val: 'Low', color: 'text-green-600 dark:text-green-400', desc: 'No Stress Flags' },
              { label: 'Safe Loan Limit', val: '₹25 Lakh', color: 'text-blue-600 dark:text-blue-400', desc: 'Calculated Capacity' },
              { label: 'Repayment Cap', val: 'Strong', color: 'text-green-600 dark:text-green-400', desc: 'Buffer: 2.2x' }
            ].map((stat, i) => (
              <div key={i} className="p-4 bg-primary-50/50 dark:bg-gray-900/50 rounded-xl text-center border border-primary-100/50 dark:border-gray-800 space-y-1">
                <span className="text-xs text-gray-500 dark:text-gray-400 block font-medium">{stat.label}</span>
                <span className={`text-lg font-bold block ${stat.color}`}>{stat.val}</span>
                <span className="text-[10px] text-gray-400 block">{stat.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 7: USE CASES */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-primary-950 dark:text-white">Structured Use Cases</h2>
            <p className="text-primary-600 dark:text-gray-400 mt-2">Tailored credit structures mapped to business needs</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: 'Working Capital Loans', context: 'Receivables financing, bank overdraft alignment, trade cycles.' },
              { title: 'Term & Equipment Loans', context: 'Fixed asset acquisition, CAPEX estimation, repayment schedules.' },
              { title: 'MSME Support Programs', context: 'Cluster assistance monitoring, subsidized capital grants verification.' },
              { title: 'Bank-Readiness Bootcamps', context: 'Structured webinars, document consolidation workshops.' }
            ].map((use, i) => (
              <div key={i} className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-3">
                <h4 className="font-bold text-gray-900 dark:text-white">{use.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{use.context}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 8: WHO USES IT */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-primary-950 dark:text-white">Our User Ecosystem</h2>
            <p className="text-primary-600 dark:text-gray-400 mt-2">Supporting key stakeholders in the MSME credit lifecycle</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { type: 'MSME Owners', req: 'Understand cash flows, check loan eligibility limits, solve document gaps, and get clear action steps.' },
              { type: 'MSME Institution Officers', req: 'Monitor district clusters, filter risk bands, run reports, and target development funding.' },
              { type: 'Bank Credit Officers', req: 'Access bank-ready borrower files, review repayment metrics, and monitor warning alerts.' }
            ].map((user, i) => (
              <div key={i} className="p-6 bg-gradient-to-br from-white to-primary-50/20 dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-md space-y-3">
                <h4 className="text-lg font-bold text-primary-950 dark:text-white">{user.type}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{user.req}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 9: INSTITUTIONAL IMPACT */}
        <div className="bg-gradient-to-r from-primary-900 to-green-900 text-white rounded-3xl p-8 md:p-12 shadow-2xl space-y-6">
          <div className="max-w-2xl">
            <h3 className="text-2xl md:text-3xl font-bold">Measurable Institutional Impact</h3>
            <p className="text-primary-200 mt-2">Empowering district administrations, cluster networks, and lenders</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-4">
            {[
              { outcome: 'District Visibility', context: 'Granular ground-level financial monitoring across small businesses.' },
              { outcome: 'Higher Bank Readiness', context: 'Significant drop in raw documentation rejects at credit review.' },
              { outcome: 'Targeted Interventions', context: 'Direct assistance allocated specifically to high-stress entities.' },
              { outcome: 'MSME Resilience', context: 'Stronger liquidity buffers due to improved expense and EMI discipline.' }
            ].map((impact, i) => (
              <div key={i} className="space-y-1">
                <h4 className="font-bold text-lg text-primary-300">{impact.outcome}</h4>
                <p className="text-xs text-primary-100/80 leading-relaxed">{impact.context}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 10: TRUST & COMPLIANCE */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-lg gap-8">
          <div className="flex items-center space-x-4">
            <div className="p-4 bg-primary-100 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 rounded-2xl">
              <Shield className="w-10 h-10" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white">Bank-Grade Compliance & Consent</h4>
              <p className="text-sm text-gray-500 mt-1">We respect user sovereignty over data. Auditable data access control logs.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-xs font-semibold text-gray-600 dark:text-gray-400">
            <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700">Consent-Based Access</span>
            <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700">Audit Trails</span>
            <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700">Explainable Scoring</span>
          </div>
        </div>

      </div>
    </div>
  );
}
