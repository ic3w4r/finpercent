import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layers, Sparkles, CheckCircle2, 
  ArrowLeft, ArrowRight, ChevronDown,
  Database, RefreshCw, ShieldCheck, 
  Users, UserCheck, Plus, Search,
  Lock, Activity, Download, 
  Code2, GitBranch,
  FileSpreadsheet, Sliders, ExternalLink,
  ArrowUpRight, AlertCircle, Check, Copy, Menu
} from 'lucide-react';

import { 
  useRolePerspective, 
  ROLE_DEFINITIONS, 
  RolePerspective 
} from '../../contexts/RolePerspectiveContext';
import { useNavigation } from '../../contexts/NavigationContext';

interface ERPDocTypeRecord {
  id: string;
  doctype: 'Sales Invoice' | 'Purchase Order' | 'Stock Entry' | 'Journal Entry' | 'Customer Master';
  docNumber: string;
  partyName: string;
  amount: number;
  date: string;
  status: 'Draft' | 'Submitted' | 'Paid' | 'Overdue' | 'Approved' | 'Audited';
  docstatus: 0 | 1 | 2; // ERPNext: 0=Draft, 1=Submitted, 2=Cancelled
  tags: string[];
  workflowState: string;
  details: Record<string, any>;
}

export default function CustomERPNextModulePage() {
  const navigate = useNavigate();
  const { 
    activeRole, 
    setActiveRole, 
    currentRoleConfig, 
    activeScenario,
    updateScenario,
    isActionAuthorized
  } = useRolePerspective();
  const { toggleSidebar, isSidebarOpen } = useNavigation();

  // Navigation & View Tabs
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [activeTab, setActiveTab] = useState<'storyteller' | 'doctypes' | 'ledger' | 'workflow' | 'schema'>('storyteller');

  // AI Storyteller State
  const [storyPrompt, setStoryPrompt] = useState(
    `Apex Engineering takes a new ₹${(activeScenario.orderValue / 100000).toFixed(0)}L OEM valve order from Zenith Industries (75d credit), requiring ₹15L PO from NeoPack (15d credit).`
  );
  const [isAnalyzingStory, setIsAnalyzingStory] = useState(false);
  const [adoptedStorySuccess, setAdoptedStorySuccess] = useState(false);
  const [activeStoryStage, setActiveStoryStage] = useState<number>(1);
  const [copiedVoucher, setCopiedVoucher] = useState<string | null>(null);

  // Filter & Search
  const [docSearch, setDocSearch] = useState('');
  const [selectedDocTypeFilter, setSelectedDocTypeFilter] = useState<string>('all');
  const [selectedRecord, setSelectedRecord] = useState<ERPDocTypeRecord | null>(null);

  // Custom Field Form Modal
  const [isFieldModalOpen, setIsFieldModalOpen] = useState(false);
  const [newFieldName, setNewFieldName] = useState('');
  const [newFieldType, setNewFieldType] = useState('Data');
  const [newFieldTargetDoc, setNewFieldTargetDoc] = useState('Sales Invoice');

  // Custom Fields Schema Registry
  const [customFieldsRegistry, setCustomFieldsRegistry] = useState([
    { id: 'cf-1', docType: 'Sales Invoice', label: 'Customer Risk Rating', fieldName: 'customer_risk_rating', fieldType: 'Select', options: 'Low, Medium, High, Covenant Breach', enabled: true },
    { id: 'cf-2', docType: 'Purchase Order', label: 'GST E-Way Bill Number', fieldName: 'gst_eway_bill_no', fieldType: 'Data', options: '', enabled: true },
    { id: 'cf-3', docType: 'Stock Entry', label: 'Batch QC Pass Rate (%)', fieldName: 'qc_pass_rate', fieldType: 'Percent', options: '', enabled: true },
    { id: 'cf-4', docType: 'Sales Invoice', label: 'Working Capital Line Allocation', fieldName: 'wc_line_allocation', fieldType: 'Currency', options: '', enabled: true }
  ]);

  // ERP Records Database
  const [erpRecords, setErpRecords] = useState<ERPDocTypeRecord[]>([
    {
      id: 'rec-1',
      doctype: 'Sales Invoice',
      docNumber: 'SINV-2026-0042',
      partyName: 'Zenith Industries Ltd',
      amount: 4000000,
      date: '2026-09-28',
      status: 'Submitted',
      docstatus: 1,
      tags: ['75d Credit', 'OEM Partner'],
      workflowState: 'Pending Collection',
      details: {
        customerGroup: 'OEM Tier 1',
        paymentTerms: '75 Days Net',
        dueDate: '2026-12-12',
        gstNumber: '27AABCS1429B1Z8',
        lineItems: [
          { item: 'Industrial High-Pressure Valve 4"', qty: 120, rate: 25000, amount: 3000000 },
          { item: 'Precision Gasket Seal Kit', qty: 250, rate: 4000, amount: 1000000 }
        ],
        taxAmount: 720000,
        linkedPO: 'PO-2026-0089'
      }
    },
    {
      id: 'rec-2',
      doctype: 'Purchase Order',
      docNumber: 'PO-2026-0089',
      partyName: 'NeoPack Polymers Pvt Ltd',
      amount: 1500000,
      date: '2026-09-27',
      status: 'Submitted',
      docstatus: 1,
      tags: ['Raw Material', '15d Credit'],
      workflowState: 'Pending Delivery',
      details: {
        supplierCategory: 'Grade A Resin & Polymer',
        paymentTerms: '15 Days Net',
        dueDate: '2026-10-12',
        gstNumber: '33AABCN5821F1ZX',
        lineItems: [
          { item: 'Polymer Compound Grade-9X', qty: 500, rate: 2000, amount: 1000000 },
          { item: 'Stainless Steel Flange 316', qty: 100, rate: 5000, amount: 500000 }
        ],
        taxAmount: 270000
      }
    },
    {
      id: 'rec-3',
      doctype: 'Sales Invoice',
      docNumber: 'SINV-2026-0038',
      partyName: 'Apex Foundry Works',
      amount: 1704000,
      date: '2026-08-15',
      status: 'Overdue',
      docstatus: 1,
      tags: ['Overdue > 45d'],
      workflowState: 'Legal Notice Drafted',
      details: {
        customerGroup: 'Domestic Engineering',
        paymentTerms: '30 Days Net',
        dueDate: '2026-09-14',
        daysOverdue: 44,
        gstNumber: '27AABCA9918K1ZZ',
        lineItems: [{ item: 'Casting Assembly Batch 4', qty: 40, rate: 42600, amount: 1704000 }]
      }
    },
    {
      id: 'rec-4',
      doctype: 'Journal Entry',
      docNumber: 'JV-2026-0105',
      partyName: 'HDFC Corporate Working Capital',
      amount: 1500000,
      date: '2026-09-28',
      status: 'Approved',
      docstatus: 1,
      tags: ['Overdraft', 'Treasury'],
      workflowState: 'Reconciled',
      details: {
        entryType: 'Bank Entry',
        debitAccount: 'HDFC Current A/c (102948)',
        creditAccount: 'HDFC Short-Term OD Line',
        remarks: 'Working capital drawdown to buffer Zenith PO production cycle.'
      }
    },
    {
      id: 'rec-5',
      doctype: 'Stock Entry',
      docNumber: 'STE-2026-0312',
      partyName: 'Main Plant Warehouse - Bay 4',
      amount: 850000,
      date: '2026-09-28',
      status: 'Submitted',
      docstatus: 1,
      tags: ['Batch 84', 'Production'],
      workflowState: 'Issued to Shopfloor',
      details: {
        purpose: 'Manufacture',
        workOrder: 'WO-2026-0044',
        sourceWarehouse: 'Raw Material Store',
        targetWarehouse: 'Work In Progress'
      }
    }
  ]);

  // Double Entry General Ledger
  const ledgerEntries = useMemo(() => [
    { id: 'le-1', date: '2026-09-28', voucher: 'SINV-2026-0042', account: 'Sundry Debtors - Zenith Industries', debit: 4000000, credit: 0 },
    { id: 'le-2', date: '2026-09-28', voucher: 'SINV-2026-0042', account: 'Sales Revenue - Industrial Valves', debit: 0, credit: 3389830 },
    { id: 'le-3', date: '2026-09-28', voucher: 'SINV-2026-0042', account: 'Output IGST (18%)', debit: 0, credit: 610170 },
    { id: 'le-4', date: '2026-09-27', voucher: 'PO-2026-0089', account: 'Raw Material Inventory - Polymers', debit: 1271186, credit: 0 },
    { id: 'le-5', date: '2026-09-27', voucher: 'PO-2026-0089', account: 'Input Tax Credit (IGST 18%)', debit: 228814, credit: 0 },
    { id: 'le-6', date: '2026-09-27', voucher: 'PO-2026-0089', account: 'Sundry Creditors - NeoPack Polymers', debit: 0, credit: 1500000 },
    { id: 'le-7', date: '2026-09-28', voucher: 'JV-2026-0105', account: 'HDFC Corporate Current A/c', debit: 1500000, credit: 0 },
    { id: 'le-8', date: '2026-09-28', voucher: 'JV-2026-0105', account: 'HDFC Working Capital Line Liability', debit: 0, credit: 1500000 }
  ], []);

  // Story parsing & adoption simulation
  const handleAdoptStory = () => {
    setIsAnalyzingStory(true);
    setActiveStoryStage(1);

    setTimeout(() => setActiveStoryStage(2), 500);
    setTimeout(() => setActiveStoryStage(3), 1000);
    setTimeout(() => setActiveStoryStage(4), 1500);

    setTimeout(() => {
      setIsAnalyzingStory(false);
      setAdoptedStorySuccess(true);
      
      const newInvoice: ERPDocTypeRecord = {
        id: `rec-${Date.now()}`,
        doctype: 'Sales Invoice',
        docNumber: `SINV-2026-00${Math.floor(Math.random() * 80 + 50)}`,
        partyName: 'Zenith Industries Ltd (Story Adopted)',
        amount: activeScenario.orderValue,
        date: new Date().toISOString().split('T')[0],
        status: 'Submitted',
        docstatus: 1,
        tags: [`${activeScenario.creditDays}d Credit`, 'AI Adopted'],
        workflowState: 'Pending CFO Authorization',
        details: {
          customerGroup: 'OEM Tier 1 Partner',
          paymentTerms: `${activeScenario.creditDays} Days Net`,
          gstNumber: '27AABCS1429B1Z8',
          lineItems: [
            { item: 'Industrial High-Pressure Valve 4"', qty: 120, rate: 25000, amount: 3000000 },
            { item: 'Precision Gasket Seal Kit', qty: 250, rate: 4000, amount: 1000000 }
          ],
          taxAmount: 720000
        }
      };

      setErpRecords(prev => [newInvoice, ...prev]);
    }, 2000);
  };

  const handleAddCustomField = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFieldName.trim()) return;
    const newField = {
      id: `cf-${Date.now()}`,
      docType: newFieldTargetDoc,
      label: newFieldName,
      fieldName: newFieldName.toLowerCase().replace(/\s+/g, '_'),
      fieldType: newFieldType,
      options: newFieldType === 'Select' ? 'Option A, Option B, Option C' : '',
      enabled: true
    };
    setCustomFieldsRegistry(prev => [...prev, newField]);
    setNewFieldName('');
    setIsFieldModalOpen(false);
  };

  const filteredRecords = useMemo(() => {
    return erpRecords.filter(rec => {
      const matchesType = selectedDocTypeFilter === 'all' || rec.doctype === selectedDocTypeFilter;
      const matchesSearch = docSearch === '' || 
        rec.partyName.toLowerCase().includes(docSearch.toLowerCase()) ||
        rec.docNumber.toLowerCase().includes(docSearch.toLowerCase()) ||
        rec.tags.some(t => t.toLowerCase().includes(docSearch.toLowerCase()));
      return matchesType && matchesSearch;
    });
  }, [erpRecords, selectedDocTypeFilter, docSearch]);

  const copyVoucherToClipboard = (voucher: string) => {
    navigator.clipboard.writeText(voucher);
    setCopiedVoucher(voucher);
    setTimeout(() => setCopiedVoucher(null), 1500);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5] dark:bg-[#121212] text-[#1E1E1E] dark:text-[#E6E6E6] font-sans antialiased pb-24 selection:bg-emerald-500/20">
      
      {/* HEADER: COMPACT, HIGH-END BREADCRUMB & ROLE SELECTOR */}
      <header className="sticky top-0 z-40 bg-[#FFFFFF]/95 dark:bg-[#161616]/95 backdrop-blur-md border-b border-[#EAEAE7] dark:border-[#262626] px-6 py-3">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4">
          
          {/* Left: Quick Menu Toggle + Back + Module Title */}
          <div className="flex items-center space-x-2.5">
            <button
              onClick={toggleSidebar}
              title={isSidebarOpen ? "Collapse Sidebar (⌘B)" : "Expand Sidebar (⌘B)"}
              className="p-1.5 rounded-xl hover:bg-[#F4F4F2] dark:hover:bg-[#202020] text-[#777777] hover:text-[#111111] dark:hover:text-white border border-transparent hover:border-[#E2E2DE] dark:border-[#333333] transition active:scale-95"
            >
              <Menu className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate('/overview')}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#F4F4F2] dark:bg-[#222222] hover:bg-[#EBEBE8] dark:hover:bg-[#2A2A2A] rounded-xl text-xs font-semibold transition border border-[#E2E2DE] dark:border-[#333333]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Overview</span>
            </button>

            <div className="h-4 w-px bg-neutral-300 dark:bg-neutral-700" />

            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <Database className="w-4 h-4" />
              </div>
              <div className="flex items-center space-x-2">
                <h1 className="text-sm font-bold text-[#111111] dark:text-white">ERPNext Bridge</h1>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold border border-blue-500/20">
                  v15 Core
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Right: Role Switcher & Primary Action */}
          <div className="flex items-center space-x-2.5">
            <div className="relative">
              <button
                onClick={() => setShowRoleMenu(!showRoleMenu)}
                className="flex items-center space-x-2 px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20 rounded-xl text-xs font-semibold transition"
              >
                <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-bold">{currentRoleConfig.name.split(' ')[0]}</span>
                <span className="text-[10px] font-mono opacity-70">({currentRoleConfig.roleBadge.split(' ')[0]})</span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>

              {showRoleMenu && (
                <div className="absolute top-full right-0 mt-1.5 w-72 bg-white dark:bg-[#1E1E1E] border border-[#E2E2DE] dark:border-[#333333] rounded-2xl shadow-xl p-1.5 z-50 text-xs divide-y divide-[#F0F0EE] dark:divide-[#282828]">
                  {Object.values(ROLE_DEFINITIONS).map(role => (
                    <button
                      key={role.id}
                      onClick={() => { setActiveRole(role.id); setShowRoleMenu(false); }}
                      className={`w-full text-left p-2.5 rounded-xl transition flex items-start space-x-2.5 ${
                        activeRole === role.id 
                          ? 'bg-emerald-500/10 text-emerald-900 dark:text-emerald-200 font-bold' 
                          : 'hover:bg-[#F4F4F2] dark:hover:bg-[#282828]'
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-xs">{role.name}</span>
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-neutral-200 dark:bg-neutral-800">
                            {role.roleBadge.split(' ')[0]}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#777777] truncate">{role.title}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setActiveTab('storyteller')}
              className="px-3.5 py-1.5 bg-[#111111] hover:bg-[#222222] dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-[#111111] rounded-xl text-xs font-bold transition flex items-center space-x-1.5 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600" />
              <span>Adopt Story</span>
            </button>
          </div>

        </div>
      </header>

      {/* SUB-HEADER TABS */}
      <div className="bg-white dark:bg-[#181818] border-b border-[#EAEAE7] dark:border-[#262626] px-6 py-2">
        <div className="max-w-[1600px] mx-auto flex items-center space-x-2 overflow-x-auto scrollbar-none">
          {[
            { id: 'storyteller', label: 'AI Storyteller Adoption', icon: Sparkles, badge: 'Live' },
            { id: 'doctypes', label: 'DocTypes & Transactions', icon: Layers, count: erpRecords.length },
            { id: 'ledger', label: 'Double-Entry General Ledger', icon: FileSpreadsheet, badge: 'Balanced' },
            { id: 'workflow', label: 'Workflow State Machine', icon: GitBranch },
            { id: 'schema', label: 'DocType Schema Studio', icon: Code2, count: customFieldsRegistry.length }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                  isActive 
                    ? 'bg-[#111111] text-white dark:bg-white dark:text-[#111111] shadow-sm' 
                    : 'text-[#666666] hover:text-[#111111] dark:hover:text-white hover:bg-[#F4F4F2] dark:hover:bg-[#222222]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/20 text-white dark:bg-black/20 dark:text-black' : 'bg-neutral-200 dark:bg-neutral-800'}`}>
                    {tab.count}
                  </span>
                )}
                {tab.badge && (
                  <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${isActive ? 'bg-emerald-500 text-white' : 'bg-emerald-500/10 text-emerald-600'}`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-[1600px] mx-auto px-6 pt-6">
        
        {/* TAB 1: AI STORYTELLER ADOPTION ENGINE */}
        {activeTab === 'storyteller' && (
          <div className="space-y-6">
            
            {/* Story Input Console */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#1A1A1A] border border-[#EAEAE7] dark:border-[#282828] shadow-sm space-y-4">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <h2 className="text-sm font-bold text-[#111111] dark:text-white">AI Onboarding Storyteller</h2>
                </div>
                <div className="flex items-center space-x-2 text-[10px] font-mono text-neutral-400">
                  <span>Natural Language ➔ DocType Schema & GL Post</span>
                </div>
              </div>

              {/* Textarea */}
              <div className="relative">
                <textarea
                  rows={3}
                  value={storyPrompt}
                  onChange={e => setStoryPrompt(e.target.value)}
                  placeholder="Enter business story, deal, or credit parameters..."
                  className="w-full bg-[#FBFBFA] dark:bg-[#141414] border border-[#E2E2DE] dark:border-[#333333] rounded-2xl p-3.5 text-xs font-mono focus:outline-none focus:border-emerald-600 focus:bg-white dark:focus:bg-[#181818] transition"
                />
              </div>

              {/* Quick Persona Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono uppercase text-[#888888]">Role Presets:</span>
                {[
                  { label: "Owner: ₹40L Order (75d Net)", text: "Apex Engineering takes a new ₹40L OEM industrial valve order from Zenith Industries with 75-day customer credit terms, requiring a ₹15L PO from NeoPack with 15-day supplier credit." },
                  { label: "CFO: Overdue Dunning + 18% Int", text: "Automate overdue receivables interest charges (18% p.a.) after 45 days for Apex Foundry and trigger RazorpayX bank reconciliation." },
                  { label: "COO: 150 Unit Auto-Reorder", text: "Set minimum reorder threshold at 150 units for Grade-A Steel Rods and auto-trigger RFQ to 3 verified suppliers on Finning Circle." },
                  { label: "Auditor: 2-Sided GSTN Match", text: "Run 2-sided audit trail verification between GSTN GSTR-2B input credit and ERP purchase invoice register." }
                ].map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => setStoryPrompt(preset.text)}
                    className="text-[11px] font-mono px-3 py-1.5 bg-[#F4F4F2] dark:bg-[#252525] hover:bg-emerald-500/10 hover:text-emerald-700 dark:hover:text-emerald-300 rounded-xl border border-[#E2E2DE] dark:border-[#333333] transition"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              {/* Action Trigger */}
              <div className="flex items-center justify-between pt-2 border-t border-[#F0F0EE] dark:border-[#282828]">
                <span className="text-[10px] font-mono text-[#888888]">REST Hook: Connected to Tally + HDFC Sync</span>
                
                <button
                  onClick={handleAdoptStory}
                  disabled={isAnalyzingStory || !storyPrompt.trim()}
                  className="px-5 py-2 bg-[#111111] hover:bg-[#222222] dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-[#111111] rounded-xl text-xs font-bold transition flex items-center space-x-2 shadow-sm disabled:opacity-50"
                >
                  {isAnalyzingStory ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                      <span>Adopting into ERPNext...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Execute Story Adoption</span>
                    </>
                  )}
                </button>
              </div>

              {/* Active Pipeline Stepper */}
              {isAnalyzingStory && (
                <div className="p-4 rounded-2xl bg-[#F8F9FA] dark:bg-[#141414] border border-[#EAEAE7] dark:border-[#282828]">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                    {[
                      { step: 1, label: "Semantic Parsing" },
                      { step: 2, label: "DocType Schema" },
                      { step: 3, label: "Workflow Gates" },
                      { step: 4, label: "Ledger Posting" }
                    ].map(st => (
                      <div 
                        key={st.step}
                        className={`p-2.5 rounded-xl border transition flex items-center space-x-2 ${
                          activeStoryStage >= st.step 
                            ? 'bg-white dark:bg-[#1F1F1F] border-emerald-500/40 text-emerald-900 dark:text-emerald-200 font-bold' 
                            : 'bg-neutral-100/50 dark:bg-neutral-900/50 border-neutral-200 dark:border-neutral-800 text-neutral-400'
                        }`}
                      >
                        {activeStoryStage > st.step ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        ) : activeStoryStage === st.step ? (
                          <RefreshCw className="w-3.5 h-3.5 text-emerald-600 animate-spin" />
                        ) : (
                          <span className="w-3.5 h-3.5 rounded-full border border-current text-[9px] flex items-center justify-center">{st.step}</span>
                        )}
                        <span className="text-[11px]">{st.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Success Banner */}
              {adoptedStorySuccess && !isAnalyzingStory && (
                <motion.div 
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-emerald-900 dark:text-emerald-200">
                      SINV-2026-0042 (₹40L) & PO-2026-0089 (₹15L) generated and posted to GL.
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setActiveTab('doctypes')}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition flex items-center space-x-1"
                    >
                      <span>Explore Records</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>
              )}

            </div>

            {/* Visual Bento Breakdown: Timeline, Cushion & RBAC */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Card 1: Interactive Timeline & Gap Bridge */}
              <div className="p-5 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-[#EAEAE7] dark:border-[#282828] shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-[#F0F0EE] dark:border-[#282828] pb-2.5">
                  <div className="flex items-center space-x-2">
                    <Activity className="w-4 h-4 text-emerald-600" />
                    <h3 className="text-xs font-bold text-[#111111] dark:text-white">Working Capital Timeline</h3>
                  </div>
                  <span className="text-[10px] font-mono text-amber-600 font-bold">45d Gap</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-[#F8F9FA] dark:bg-[#141414] border border-[#EAEAE7] dark:border-[#282828] space-y-2">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-[#777777]">Supplier PO (NeoPack):</span>
                      <span className="font-mono font-bold text-emerald-600">15 Days (₹15L)</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-[#777777]">Customer Invoice (Zenith):</span>
                      <span className="font-mono font-bold text-amber-600">75 Days (₹40L)</span>
                    </div>
                    <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-2 rounded-full overflow-hidden flex">
                      <div className="bg-emerald-500 h-full w-[20%]" title="Supplier Term (15d)" />
                      <div className="bg-amber-500 h-full w-[60%]" title="Working Capital Gap (45d)" />
                      <div className="bg-blue-500 h-full w-[20%]" title="Debtor Realization (75d)" />
                    </div>
                  </div>

                  <button
                    onClick={() => alert("CFO Liquidity Bridge Activated: ₹15L HDFC Overdraft drawdown linked to JV-2026-0105.")}
                    className="w-full py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5"
                  >
                    <Lock className="w-3 h-3" />
                    <span>Bridge 45d Gap via HDFC OD (JV-2026-0105)</span>
                  </button>
                </div>
              </div>

              {/* Card 2: Adopted Schema Summary */}
              <div className="p-5 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-[#EAEAE7] dark:border-[#282828] shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b border-[#F0F0EE] dark:border-[#282828] pb-2.5">
                  <div className="flex items-center space-x-2">
                    <Layers className="w-4 h-4 text-blue-600" />
                    <h3 className="text-xs font-bold text-[#111111] dark:text-white">Active DocType Schema</h3>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400">v15 Direct</span>
                </div>

                <div className="space-y-2 text-xs font-mono">
                  <div className="p-2.5 rounded-xl bg-[#F8F9FA] dark:bg-[#141414] flex justify-between items-center">
                    <span className="text-[#777777]">Sales Invoice:</span>
                    <span className="font-bold text-blue-600">SINV-2026-0042</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#F8F9FA] dark:bg-[#141414] flex justify-between items-center">
                    <span className="text-[#777777]">Purchase Order:</span>
                    <span className="font-bold text-purple-600">PO-2026-0089</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#F8F9FA] dark:bg-[#141414] flex justify-between items-center">
                    <span className="text-[#777777]">Gross Margin:</span>
                    <span className="font-bold text-emerald-600">62.5% (+₹25.0L)</span>
                  </div>
                </div>
              </div>

              {/* Card 3: Role Permission Matrix */}
              <div className="p-5 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-[#EAEAE7] dark:border-[#282828] shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b border-[#F0F0EE] dark:border-[#282828] pb-2.5">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-purple-600" />
                    <h3 className="text-xs font-bold text-[#111111] dark:text-white">Zero-Trust Role Gates</h3>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-600 font-bold">RBAC Enforced</span>
                </div>

                <div className="space-y-1.5 text-xs">
                  {Object.values(ROLE_DEFINITIONS).map(r => (
                    <div 
                      key={r.id} 
                      onClick={() => setActiveRole(r.id)}
                      className={`flex items-center justify-between p-2 rounded-xl cursor-pointer transition ${
                        activeRole === r.id 
                          ? 'bg-emerald-500/10 text-emerald-900 dark:text-emerald-200 font-bold border border-emerald-500/30' 
                          : 'bg-[#F8F9FA] dark:bg-[#141414] hover:bg-neutral-200/50'
                      }`}
                    >
                      <span className="text-[11px]">{r.name.split(' ')[0]} ({r.roleBadge.split(' ')[0]})</span>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white dark:bg-[#202020] text-[#666666]">
                        {r.allowedActions.length} Actions
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: DOCTYPES & TRANSACTIONS EXPLORER */}
        {activeTab === 'doctypes' && (
          <div className="space-y-4">
            
            {/* Filter Pills & Search */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-[#EAEAE7] dark:border-[#282828] flex flex-col md:flex-row items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-1.5">
                {['all', 'Sales Invoice', 'Purchase Order', 'Stock Entry', 'Journal Entry'].map(doc => (
                  <button
                    key={doc}
                    onClick={() => setSelectedDocTypeFilter(doc)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                      selectedDocTypeFilter === doc 
                        ? 'bg-[#111111] text-white dark:bg-white dark:text-[#111111]' 
                        : 'bg-[#F4F4F2] dark:bg-[#252525] text-[#555555] dark:text-[#AAAAAA] hover:bg-[#EAEAE8]'
                    }`}
                  >
                    {doc === 'all' ? 'All Records' : doc}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-64">
                <Search className="w-3.5 h-3.5 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={docSearch}
                  onChange={e => setDocSearch(e.target.value)}
                  placeholder="Filter records..."
                  className="w-full pl-8 pr-3 py-1.5 bg-[#F4F4F2] dark:bg-[#202020] border border-[#E2E2DE] dark:border-[#333333] rounded-xl text-xs focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            {/* Records Data Table */}
            <div className="rounded-2xl bg-white dark:bg-[#1A1A1A] border border-[#EAEAE7] dark:border-[#282828] overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8F9FA] dark:bg-[#141414] border-b border-[#EAEAE7] dark:border-[#282828] text-[#777777] font-mono text-[10px] uppercase">
                  <tr>
                    <th className="py-3 px-4">DocNumber</th>
                    <th className="py-3 px-4">DocType</th>
                    <th className="py-3 px-4">Party</th>
                    <th className="py-3 px-4 text-right">Amount (₹)</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0F0EE] dark:divide-[#282828]">
                  {filteredRecords.map(rec => (
                    <tr key={rec.id} className="hover:bg-[#FBFBFA] dark:hover:bg-[#202020] transition">
                      <td className="py-3 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">
                        {rec.docNumber}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-[11px] font-medium">
                          {rec.doctype}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-bold text-[#111111] dark:text-white">
                        {rec.partyName}
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-bold">
                        ₹{rec.amount.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono font-bold ${
                          rec.status === 'Submitted' ? 'bg-blue-500/10 text-blue-700 dark:text-blue-300' :
                          rec.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300' :
                          rec.status === 'Overdue' ? 'bg-red-500/10 text-red-700 dark:text-red-400' : 'bg-amber-500/10 text-amber-700'
                        }`}>
                          {rec.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => setSelectedRecord(rec)}
                          className="px-3 py-1 bg-[#F4F4F2] hover:bg-[#EAEAE8] dark:bg-[#252525] rounded-lg text-xs font-bold transition"
                        >
                          Inspect
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* TAB 3: DOUBLE-ENTRY GENERAL LEDGER */}
        {activeTab === 'ledger' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-[#EAEAE7] dark:border-[#282828] flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-[#111111] dark:text-white">Balanced General Ledger</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-bold">
                  Debit ₹82.71L == Credit ₹82.71L
                </span>
              </div>
              <button 
                onClick={() => alert("Audit trail exported with SHA-256 signatures.")}
                className="px-3 py-1.5 bg-[#F4F4F2] hover:bg-[#EAEAE8] dark:bg-[#252525] rounded-xl text-xs font-bold transition flex items-center space-x-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Journal</span>
              </button>
            </div>

            <div className="rounded-2xl bg-white dark:bg-[#1A1A1A] border border-[#EAEAE7] dark:border-[#282828] overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8F9FA] dark:bg-[#141414] border-b border-[#EAEAE7] dark:border-[#282828] text-[#777777] font-mono text-[10px] uppercase">
                  <tr>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Voucher</th>
                    <th className="py-3 px-4">Account Head</th>
                    <th className="py-3 px-4 text-right">Debit (₹)</th>
                    <th className="py-3 px-4 text-right">Credit (₹)</th>
                    <th className="py-3 px-4 text-center">Lock</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0F0EE] dark:divide-[#282828]">
                  {ledgerEntries.map(le => (
                    <tr key={le.id} className="hover:bg-[#FBFBFA] dark:hover:bg-[#202020] transition">
                      <td className="py-3 px-4 font-mono text-[11px] text-[#777777]">{le.date}</td>
                      <td className="py-3 px-4 font-mono font-bold text-blue-600">
                        <button 
                          onClick={() => copyVoucherToClipboard(le.voucher)}
                          className="hover:underline flex items-center space-x-1"
                        >
                          <span>{le.voucher}</span>
                          {copiedVoucher === le.voucher ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-neutral-400" />}
                        </button>
                      </td>
                      <td className="py-3 px-4 font-medium text-[#111111] dark:text-white">{le.account}</td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-emerald-700 dark:text-emerald-400">
                        {le.debit > 0 ? `₹${le.debit.toLocaleString('en-IN')}` : '-'}
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-blue-700 dark:text-blue-400">
                        {le.credit > 0 ? `₹${le.credit.toLocaleString('en-IN')}` : '-'}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 text-[10px] font-mono">
                          <Lock className="w-2.5 h-2.5" />
                          <span>SHA-256</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: WORKFLOW STATE MACHINE */}
        {activeTab === 'workflow' && (
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1A1A1A] border border-[#EAEAE7] dark:border-[#282828] shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#F0F0EE] dark:border-[#282828] pb-3">
              <div className="flex items-center space-x-2">
                <GitBranch className="w-4 h-4 text-emerald-600" />
                <h3 className="text-xs font-bold text-[#111111] dark:text-white">ERPNext Workflow State Machine</h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-600 font-bold">Zenith OEM Order Workflow</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {[
                { step: 1, state: 'Quotation & Scope', role: 'Sales Exec', action: 'Create Draft', status: 'Completed' },
                { step: 2, state: 'Margin & Credit Review', role: 'CFO', action: 'Verify 75d Covenant', status: 'Completed' },
                { step: 3, state: 'Executive Authorization', role: 'Owner (MD)', action: 'Sign-off ₹40L Order', status: 'Active' },
                { step: 4, state: 'Production & PO', role: 'COO', action: 'Release 120 SKUs', status: 'Pending' },
                { step: 5, state: 'Statutory GST Audit', role: 'Auditor', action: 'Verify 2-Sided Match', status: 'Pending' }
              ].map(wf => (
                <div 
                  key={wf.step}
                  className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 ${
                    wf.status === 'Completed' ? 'bg-emerald-500/5 border-emerald-500/30' :
                    wf.status === 'Active' ? 'bg-blue-500/10 border-blue-500/40 ring-2 ring-blue-500/20' :
                    'bg-neutral-100/40 dark:bg-neutral-900/40 border-neutral-200 dark:border-neutral-800'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                      <span className="font-bold">Step {wf.step}</span>
                      <span className={`px-1.5 py-0.5 rounded ${
                        wf.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300' :
                        wf.status === 'Active' ? 'bg-blue-500/20 text-blue-700 dark:text-blue-300 font-bold' :
                        'text-neutral-400'
                      }`}>{wf.status}</span>
                    </div>
                    <h4 className="text-xs font-bold text-[#111111] dark:text-white">{wf.state}</h4>
                    <p className="text-[11px] text-[#777777] mt-0.5">{wf.role}</p>
                  </div>

                  <button
                    onClick={() => alert(`Transition triggered: ${wf.action}`)}
                    className="w-full py-1.5 bg-white dark:bg-[#222222] hover:bg-neutral-100 dark:hover:bg-[#2A2A2A] border border-[#E2E2DE] dark:border-[#333333] rounded-lg text-[10px] font-mono font-bold transition"
                  >
                    {wf.action}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: SCHEMA STUDIO */}
        {activeTab === 'schema' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-[#EAEAE7] dark:border-[#282828] flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Code2 className="w-4 h-4 text-purple-600" />
                <span className="text-xs font-bold text-[#111111] dark:text-white">Custom DocType Schema Registry</span>
              </div>
              <button
                onClick={() => setIsFieldModalOpen(true)}
                className="px-3.5 py-1.5 bg-[#111111] hover:bg-[#222222] dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-[#111111] rounded-xl text-xs font-bold transition flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Field</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {customFieldsRegistry.map(cf => (
                <div key={cf.id} className="p-3.5 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-[#EAEAE7] dark:border-[#282828] flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-[#111111] dark:text-white">{cf.label}</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-purple-500/10 text-purple-700">
                        {cf.fieldType}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#777777] font-mono mt-0.5">
                      DocType: <strong className="text-blue-600">{cf.docType}</strong> • <code>{cf.fieldName}</code>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-emerald-600 font-bold">Active</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* RECORD INSPECTOR MODAL */}
      <AnimatePresence>
        {selectedRecord && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="max-w-lg w-full bg-white dark:bg-[#1A1A1A] border border-[#EAEAE7] dark:border-[#333333] rounded-3xl p-5 shadow-2xl space-y-4 text-left"
            >
              <div className="flex justify-between items-center border-b border-[#F0F0EE] dark:border-[#282828] pb-3">
                <div>
                  <span className="text-[10px] font-mono text-blue-600 uppercase font-bold">{selectedRecord.doctype}</span>
                  <h3 className="text-sm font-bold text-[#111111] dark:text-white">{selectedRecord.docNumber}</h3>
                </div>
                <button 
                  onClick={() => setSelectedRecord(null)}
                  className="text-xs font-bold text-gray-400 hover:text-black dark:hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-[#F8F9FA] dark:bg-[#141414]">
                  <div>
                    <span className="text-[#777777] text-[10px] uppercase">Party:</span>
                    <p className="font-bold">{selectedRecord.partyName}</p>
                  </div>
                  <div>
                    <span className="text-[#777777] text-[10px] uppercase">Amount:</span>
                    <p className="font-mono font-bold text-emerald-600">₹{selectedRecord.amount.toLocaleString('en-IN')}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-[#777777] uppercase">JSON Telemetry:</span>
                  <pre className="p-3 rounded-xl bg-[#111111] text-emerald-400 text-[10px] font-mono overflow-x-auto max-h-40">
                    {JSON.stringify(selectedRecord.details, null, 2)}
                  </pre>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#F0F0EE] dark:border-[#282828]">
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="px-4 py-1.5 border border-[#D5D5D0] dark:border-[#444444] rounded-xl text-xs font-bold"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    alert(`Voucher ${selectedRecord.docNumber} verified and signed.`);
                    setSelectedRecord(null);
                  }}
                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition"
                >
                  Authorize Docstatus
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CUSTOM FIELD MODAL */}
      <AnimatePresence>
        {isFieldModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="max-w-md w-full bg-white dark:bg-[#1A1A1A] border border-[#EAEAE7] dark:border-[#333333] rounded-3xl p-5 shadow-2xl space-y-4 text-left"
            >
              <div className="flex justify-between items-center border-b border-[#F0F0EE] dark:border-[#282828] pb-3">
                <h3 className="text-xs font-bold text-[#111111] dark:text-white">Add Custom DocType Field</h3>
                <button onClick={() => setIsFieldModalOpen(false)} className="text-xs font-bold text-gray-400">✕</button>
              </div>

              <form onSubmit={handleAddCustomField} className="space-y-3 text-xs">
                <div>
                  <label className="block text-[#777777] mb-1">Target DocType</label>
                  <select
                    value={newFieldTargetDoc}
                    onChange={e => setNewFieldTargetDoc(e.target.value)}
                    className="w-full bg-[#F4F4F2] dark:bg-[#222222] border border-[#E2E2DE] dark:border-[#333333] rounded-xl p-2 text-xs"
                  >
                    <option value="Sales Invoice">Sales Invoice</option>
                    <option value="Purchase Order">Purchase Order</option>
                    <option value="Stock Entry">Stock Entry</option>
                    <option value="Customer Master">Customer Master</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#777777] mb-1">Field Label</label>
                  <input
                    type="text"
                    required
                    value={newFieldName}
                    onChange={e => setNewFieldName(e.target.value)}
                    placeholder="e.g. Export License No..."
                    className="w-full bg-[#F4F4F2] dark:bg-[#222222] border border-[#E2E2DE] dark:border-[#333333] rounded-xl p-2 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[#777777] mb-1">Field Type</label>
                  <select
                    value={newFieldType}
                    onChange={e => setNewFieldType(e.target.value)}
                    className="w-full bg-[#F4F4F2] dark:bg-[#222222] border border-[#E2E2DE] dark:border-[#333333] rounded-xl p-2 text-xs"
                  >
                    <option value="Data">Data (Text)</option>
                    <option value="Currency">Currency (₹)</option>
                    <option value="Select">Select (Dropdown)</option>
                    <option value="Percent">Percent (%)</option>
                  </select>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-[#F0F0EE] dark:border-[#282828]">
                  <button
                    type="button"
                    onClick={() => setIsFieldModalOpen(false)}
                    className="px-3.5 py-1.5 border border-[#D5D5D0] dark:border-[#444444] rounded-xl text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-[#111111] hover:bg-[#222222] dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-[#111111] rounded-xl text-xs font-bold transition"
                  >
                    Save Field
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
