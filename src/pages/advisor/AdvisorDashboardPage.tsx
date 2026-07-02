import React from 'react';
import { useReadiness } from '../../contexts/ReadinessContext';
import { 
  Building2, Users, FileText, CheckCircle, AlertTriangle, 
  ChevronRight, Coins, RefreshCw, Eye, ShieldCheck, DollarSign
} from 'lucide-react';

export default function AdvisorDashboardPage() {
  const { 
    cohort, documents, triggerAdvisorVerify, score, addNotification
  } = useReadiness();

  // Simulated advisory clients list
  const clients = cohort.map(c => {
    if (c.name === 'Acme Corporation') {
      return { 
        ...c, 
        pendingGapsCount: documents.filter(d => d.status !== 'Complete').length,
        incompleteDocs: documents.filter(d => d.status !== 'Complete')
      };
    }
    return { 
      ...c, 
      pendingGapsCount: c.name === 'NeoPack Industries' ? 4 : c.name === 'AlphaTech Logistics' ? 2 : 5,
      incompleteDocs: c.name === 'NeoPack Industries' 
        ? [{ id: 'gst_return', name: 'GST Returns (GSTR-3B) May 2026', status: 'Missing' as const }, { id: 'financials', name: 'Audited Financial Statements (FY25)', status: 'Missing' as const }]
        : [{ id: 'financials', name: 'Audited Financial Statements (FY25)', status: 'Missing' as const }]
    };
  });

  // Calculate advisory revenue opportunity based on incomplete client files
  const calculateRevenueOpp = (clientName: string) => {
    if (clientName === 'Acme Corporation') {
      let revenue = 0;
      documents.forEach(d => {
        if (d.status !== 'Complete') {
          if (d.id === 'financials') revenue += 15000; // FY25 balance sheet preparation
          if (d.id === 'gst_return') revenue += 5000; // Tax return filing fee
          if (d.id === 'udyam') revenue += 2500; // Registration filing service
        }
      });
      return revenue;
    }
    return clientName === 'NeoPack Industries' ? 20000 : clientName === 'AlphaTech Logistics' ? 8500 : 25000;
  };

  const totalRevenuePotential = clients.reduce((sum, c) => sum + calculateRevenueOpp(c.name), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 p-6 pb-20 text-left">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-primary-950 dark:text-white">Advisor & Accountant Console</h1>
            <p className="text-sm text-gray-500 mt-1">Review MSME files, complete audits, and resolve checklist gaps for recurring billing</p>
          </div>
        </div>

        {/* Advisor Aggregate Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Assigned Clients', val: '4 Active', desc: 'Acme, NeoPack, AlphaTech, GreenPlast', color: 'text-gray-950 dark:text-white' },
            { label: 'Avg Client Readiness', val: '57/100', desc: 'Needs document preparation', color: 'text-primary-600' },
            { label: 'Revenue Opportunities', val: `₹${totalRevenuePotential.toLocaleString()}`, desc: 'From pending checklist tasks', color: 'text-[#346538]' },
            { label: 'Bank-Ready Clients', val: `${clients.filter(c => c.score >= 75).length} Files`, desc: 'Eligible for immediate loan applications', color: 'text-blue-600' }
          ].map((item, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-2">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 block">{item.label}</span>
              <span className={`text-xl font-bold block ${item.color}`}>{item.val}</span>
              <span className="text-[10px] text-gray-400 block">{item.desc}</span>
            </div>
          ))}
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Client Ledger */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
              <div className="border-b border-gray-50 dark:border-gray-700 pb-3">
                <h3 className="text-md font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                  <Users className="w-5 h-5 text-primary-600" />
                  <span>My Active Clients Portfolio</span>
                </h3>
              </div>

              <div className="divide-y divide-gray-50 dark:divide-gray-700/50">
                {clients.map((c, i) => (
                  <div key={i} className="py-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-bold text-sm text-gray-900 dark:text-white block">{c.name}</span>
                        <span className="text-[10px] text-gray-400 block mt-0.5">{c.district} • {c.cluster} • {c.sector}</span>
                      </div>
                      <div className="text-right">
                        <span className={`font-mono font-bold text-sm block ${
                          c.score >= 75 ? 'text-green-600' : c.score >= 60 ? 'text-yellow-600' : 'text-red-600'
                        }`}>{c.score}/100</span>
                        <span className="text-[9px] text-neutral-400 block font-semibold">{c.score >= 75 ? 'Bank-Ready' : c.score >= 60 ? 'Needs Correction' : 'High Risk'}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-xs text-neutral-600 dark:text-gray-400 bg-neutral-50/50 dark:bg-neutral-900/10 p-2.5 rounded border border-neutral-150 dark:border-gray-850">
                      <div>
                        <span className="font-semibold text-red-700 dark:text-red-400">{c.pendingGapsCount} document gaps</span> detected
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-[10px] text-neutral-400">Billable potential:</span>
                        <span className="font-bold text-[#346538]">₹{calculateRevenueOpp(c.name).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Verification Locker and Revenue Opportunity Tracker */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Document Verification Terminal */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
              <div className="border-b border-gray-50 dark:border-gray-700 pb-3 flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-[#346538]" />
                <h3 className="font-bold text-gray-900 dark:text-white text-md">Document Verification Panel</h3>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Review and audit client files to apply **Advisor Signatures**. This boosts the client's score confidence level by +5 points.
              </p>

              <div className="space-y-3">
                {documents.map((doc) => (
                  <div key={doc.id} className="p-3 bg-neutral-50/50 dark:bg-gray-900/20 border border-neutral-150 dark:border-gray-800 rounded text-xs space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-neutral-800 dark:text-gray-200 block truncate max-w-[180px]">{doc.name}</span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                        doc.status === 'Complete' ? 'bg-green-50 text-green-700' :
                        doc.status === 'Expired' ? 'bg-red-50 text-red-700' : 'bg-yellow-50 text-yellow-700'
                      }`}>{doc.status}</span>
                    </div>

                    {doc.status === 'Complete' ? (
                      doc.verifiedByAdvisor ? (
                        <div className="text-[10px] text-green-700 font-bold flex items-center space-x-1">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Audited & Verified</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => triggerAdvisorVerify(doc.id)}
                          className="w-full py-1.5 bg-[#346538] hover:bg-[#284f2c] text-white rounded text-[10px] font-bold transition flex items-center justify-center space-x-1"
                        >
                          <ShieldCheck className="w-3 h-3" />
                          <span>Audit & Sign File</span>
                        </button>
                      )
                    ) : (
                      <div className="text-[9px] text-neutral-400 italic">No file uploaded by owner yet.</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Advisory Services Checklist (Monetization opportunities) */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
              <div className="border-b border-gray-50 dark:border-gray-700 pb-3 flex items-center space-x-2">
                <Coins className="w-5 h-5 text-amber-600" />
                <h3 className="font-bold text-gray-900 dark:text-white text-md">Advisory Billable Services</h3>
              </div>
              
              <div className="space-y-3 text-xs">
                {[
                  { service: 'FY25 Audit & Balance Sheet Compilation', price: '₹15,000', client: 'Acme Corporation', gap: 'Missing Audited Financials' },
                  { service: 'GST filing prep (Form GSTR-3B)', price: '₹5,000', client: 'Acme Corporation', gap: 'Missing GST Returns' },
                  { service: 'Debt Consolidation Restructure Plan', price: '₹20,000', client: 'NeoPack Industries', gap: 'High EMI capacity warning' },
                  { service: 'Udyam Registration Renewal Service', price: '₹2,500', client: 'Acme Corporation', gap: 'Expired Udyam Certificate' }
                ].map((item, idx) => (
                  <div key={idx} className="p-2.5 bg-amber-50/30 border border-amber-200/50 rounded space-y-1">
                    <div className="flex justify-between font-bold">
                      <span className="text-gray-900 dark:text-white">{item.service}</span>
                      <span className="text-[#346538]">{item.price}</span>
                    </div>
                    <div className="text-[9px] text-neutral-450 dark:text-neutral-400 flex justify-between">
                      <span>Client: {item.client}</span>
                      <span className="text-red-700 font-semibold">{item.gap}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
