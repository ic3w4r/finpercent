import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, Shield, FileText, Key, Users, CheckCircle2, AlertTriangle, 
  TrendingUp, Calendar, Lock, Upload, Download, RefreshCw, Plus, Trash2, 
  Eye, Edit, Coins, Scale, Search, Sparkles, UserCheck, Check, ArrowRight, Target,
  Info, FileSpreadsheet, Fingerprint, ShieldCheck, Activity, HelpCircle,
  Play, Send, Zap, Award, Film, MessageSquare, Video, History, GraduationCap,
  ChevronRight, Map, Cpu, X, Workflow
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SankeyDiagram from '../components/charts/SankeyDiagram';
import AssetDossierStack from '../components/AssetDossierStack';
import InvestmentPools from '../components/InvestmentPools';

// --- Types ---
interface AgentTask {
  id: string;
  name: string;
  status: 'Idle' | 'Running' | 'Success' | 'Failed';
  department: 'CFO' | 'COO' | 'CLO' | 'CMO';
  assignedAgent: string;
  progress: number;
}

interface AICXOSuitePageProps {
  initialTab?: 'dashboard' | 'cfo' | 'credit' | 'operations' | 'growth';
}

export default function AICXOSuitePage({ initialTab }: AICXOSuitePageProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'console' | 'cfo' | 'credit' | 'operations' | 'growth'>(initialTab ?? 'dashboard');

  useEffect(() => {
    const path = location.pathname.toLowerCase();
    if (path.endsWith('/cfo')) {
      setActiveTab('cfo');
    } else if (path.endsWith('/credit')) {
      setActiveTab('credit');
    } else if (path.endsWith('/operations')) {
      setActiveTab('operations');
    } else if (path.endsWith('/growth')) {
      setActiveTab('growth');
    } else if (path.endsWith('/console')) {
      setActiveTab('console');
    } else {
      setActiveTab('dashboard');
    }
  }, [location.pathname]);
  
  // Executive AI Command Console states
  const [commandInput, setCommandInput] = useState('');
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    '🤖 AI CXO Steward Online. System diagnostic: All modules running.',
    '💼 CFO: Balance sheet compiled. Ready for audit.',
    '⚖️ CLO: Vault integrity checked. Survey No. 142/3A is secure.'
  ]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [currentStep, setCurrentStep] = useState<string>('');
  
  // CA Digital signature challenge states
  const [showCaSignModal, setShowCaSignModal] = useState(false);
  const [caSignStatus, setCaSignStatus] = useState<'idle' | 'plugged' | 'authorized' | 'completed'>('idle');
  const [selectedCAKey, setSelectedCAKey] = useState('dsc-india-suresh-449');

  // Short form video generator states
  const [videoTopic, setVideoTopic] = useState('Sustainable Industrial Tech');
  const [videoHookType, setVideoHookType] = useState('Stat-driven');
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [generatedScript, setGeneratedScript] = useState<any>(null);

  // Mock ERP agent tasks
  const [agentTasks, setAgentTasks] = useState<AgentTask[]>([
    { id: 't-1', name: 'Real-time Tax Audit', status: 'Idle', department: 'CFO', assignedAgent: 'TaxAgent-X', progress: 0 },
    { id: 't-2', name: 'Peenya Land Survey Validation', status: 'Idle', department: 'CLO', assignedAgent: 'SurveyorAgent-2', progress: 0 },
    { id: 't-3', name: 'Short-Form Content Batching', status: 'Idle', department: 'CMO', assignedAgent: 'CreatorAgent-5', progress: 0 },
    { id: 't-4', name: 'Multi-Agent Auth Alignment', status: 'Idle', department: 'COO', assignedAgent: 'AuditorAgent-4', progress: 0 }
  ]);

  // --- Vendor OPEX Credit Mandate States ---
  const [opexRole, setOpexRole] = useState<'provider' | 'receiver'>('provider');
  const [opexVendors, setOpexVendors] = useState([
    { id: 'v-1', name: 'NeoPack Industries (Packaging)', poAmount: 2000000, fundedAmount: 1200000, status: 'Verified Linkage', yieldRate: '17.5%' },
    { id: 'v-2', name: 'AlphaTech Logistics (Freight)', poAmount: 1500000, fundedAmount: 500000, status: 'Verification Pending', yieldRate: '18.0%' },
    { id: 'v-3', name: 'GreenPlast Polymers (Materials)', poAmount: 3000000, fundedAmount: 0, status: 'Not Started', yieldRate: '16.5%' }
  ]);

  const [proofsVerified, setProofsVerified] = useState({
    relationship: false,
    order: false,
    necessity: false,
    useOfFunds: false,
    repayment: false
  });
  const [isCheckingProofs, setIsCheckingProofs] = useState(false);
  const [benchmarkYield, setBenchmarkYield] = useState(12.0);
  const [creditPremium, setCreditPremium] = useState(2.0);
  const [agencyFee, setAgencyFee] = useState(1.5);
  const [riskReserve, setRiskReserve] = useState(1.5);
  const [opsCost, setOpsCost] = useState(0.5);
  
  const [selectedVendor, setSelectedVendor] = useState('NeoPack Industries (Packaging)');
  const [opexAmount, setOpexAmount] = useState(1000000);
  const [selectedUseCase, setSelectedUseCase] = useState('Raw Material Purchase');
  const [allocationAlert, setAllocationAlert] = useState<{ type: 'success' | 'error' | '', message: string }>({ type: '', message: '' });
  const [activeSchematicStep, setActiveSchematicStep] = useState(0);

  const handleRunProofAudit = () => {
    setIsCheckingProofs(true);
    setProofsVerified({ relationship: false, order: false, necessity: false, useOfFunds: false, repayment: false });
    
    const runAuditSteps = async () => {
      await new Promise(r => setTimeout(r, 600));
      setProofsVerified(prev => ({ ...prev, relationship: true }));
      await new Promise(r => setTimeout(r, 600));
      setProofsVerified(prev => ({ ...prev, order: true }));
      await new Promise(r => setTimeout(r, 600));
      setProofsVerified(prev => ({ ...prev, necessity: true }));
      await new Promise(r => setTimeout(r, 600));
      setProofsVerified(prev => ({ ...prev, useOfFunds: true }));
      await new Promise(r => setTimeout(r, 600));
      setProofsVerified(prev => ({ ...prev, repayment: true }));
      setIsCheckingProofs(false);
      
      // Update selected vendor status to 'Verified Linkage' in the registry
      setOpexVendors(prev => prev.map(v => 
        v.name.includes(selectedVendor) || selectedVendor.includes(v.name)
          ? { ...v, status: 'Verified Linkage' }
          : v
      ));
    };
    runAuditSteps();
  };

  const handleAllocateOPEX = () => {
    const disallowedList = ['Personal Use', 'Old Unrelated Debt', 'Speculative Expansion', 'Cash Withdrawal', 'Owner Drawings'];
    if (disallowedList.includes(selectedUseCase)) {
      setAllocationAlert({
        type: 'error',
        message: `🚨 ACTION BLOCKED: Use Case "${selectedUseCase}" is restricted! OPEX credit must strictly link to trade necessity.`
      });
      setConsoleLogs(prev => [
        ...prev,
        `❌ [SECURITY ALERT]: Blocked allocation of ₹${opexAmount.toLocaleString()} to ${selectedVendor} for restricted use: ${selectedUseCase}.`
      ]);
    } else {
      setAllocationAlert({
        type: 'success',
        message: `✅ APPROVED: ₹${opexAmount.toLocaleString()} linked and allocated to ${selectedVendor} for ${selectedUseCase}.`
      });
      setConsoleLogs(prev => [
        ...prev,
        `💸 [ALLOCATE SUCCESS]: Disbursed ₹${opexAmount.toLocaleString()} to ${selectedVendor} for ${selectedUseCase}. Linkage verified.`
      ]);

      // Update fundedAmount in opexVendors
      setOpexVendors(prev => prev.map(v => 
        v.name.includes(selectedVendor) || selectedVendor.includes(v.name)
          ? { ...v, fundedAmount: v.fundedAmount + opexAmount, status: 'Verified Linkage' }
          : v
      ));
    }
  };

  // Handle Command Submission
  const handleSendCommand = (text?: string) => {
    const cmd = text || commandInput;
    if (!cmd.trim()) return;

    setIsExecuting(true);
    setCommandInput('');
    setConsoleLogs(prev => [...prev, `> User: "${cmd}"`]);

    const runConsoleWorkflow = async () => {
      setCurrentStep('Initializing AI CXO Executive Suite...');
      setConsoleLogs(prev => [...prev, '⚡ Initializing AI CXO Executive Suite...']);
      await new Promise(r => setTimeout(r, 800));

      setCurrentStep('Spawning specialized COO Sub-Agents...');
      setConsoleLogs(prev => [...prev, '🤖 Spawning COO Sub-Agents: AuditorAgent-4 & SurveyorAgent-2.']);
      await new Promise(r => setTimeout(r, 1000));

      setCurrentStep('Analyzing CFO financial ledgers...');
      setConsoleLogs(prev => [...prev, '💼 CFO: Analyzing bank cash balances & outstanding OCC debts.']);
      await new Promise(r => setTimeout(r, 1000));

      setCurrentStep('Checking CLO legal records & mutation databases...');
      setConsoleLogs(prev => [...prev, '⚖️ CLO: Querying Patta register & survey number histories.']);
      await new Promise(r => setTimeout(r, 1000));

      setCurrentStep('Drafting CMO short-form video hooks...');
      setConsoleLogs(prev => [...prev, '📢 CMO: Formatting viral script structure for LinkedIn & TikTok.']);
      await new Promise(r => setTimeout(r, 1000));

      setCurrentStep('Success! Task completed.');
      setConsoleLogs(prev => [
        ...prev, 
        '✅ SUCCESS: Execution pipeline complete. System aligned under AI CXO operations control.',
        'ℹ️ Recommending CA Digital Signature sign-off for pending mutations.'
      ]);
      setIsExecuting(false);
      setCurrentStep('');

      // Auto open CA sign modal if deed/audit mentioned
      if (cmd.toLowerCase().includes('audit') || cmd.toLowerCase().includes('legal') || cmd.toLowerCase().includes('sign')) {
        setShowCaSignModal(true);
      }

      // Auto open video generator if marketing or video mentioned
      if (cmd.toLowerCase().includes('video') || cmd.toLowerCase().includes('marketing') || cmd.toLowerCase().includes('content')) {
        setActiveTab('growth');
      }
    };

    runConsoleWorkflow();
  };

  // Generate video script simulation
  const handleGenerateVideo = () => {
    setIsGeneratingVideo(true);
    setTimeout(() => {
      setGeneratedScript({
        topic: videoTopic,
        hook: videoHookType === 'Stat-driven' 
          ? "Stat Hook: 87% of packaging waste in industrial supply chains is fully recyclable, yet only 12% gets recovered. Here is how AI changes it." 
          : "Controversial Hook: Stop wasting money on traditional shipping pallets. The smart circular economy is here, and it is AI-stewarded.",
        visuals: "Visual: Dynamic transition from raw cardboard waste to sleek, QR-coded, reusable smart boxes monitored by a live dashboard.",
        audio: "Audio (AI Host): 'The future of B2B logistics isn't manual auditing. It's automated, transparent, and high-yield.'",
        cta: "CTA: Tap link to view our Investment Pool ROI figures.",
        metrics: {
          estCtr: "4.8%",
          reach: "45K - 60K views",
          score: "94/100 (High Virality)"
        }
      });
      setIsGeneratingVideo(false);
    }, 1500);
  };

  // CA token simulation steps
  const handlePlugToken = () => {
    setCaSignStatus('plugged');
    setTimeout(() => {
      setCaSignStatus('authorized');
    }, 1200);
  };

  const handleSignTransaction = () => {
    setCaSignStatus('completed');
    setTimeout(() => {
      setShowCaSignModal(false);
      setCaSignStatus('idle');
      setConsoleLogs(prev => [...prev, '🔑 CA Digital Sign-Off Success. Token authentication verified on secure vault ledger.']);
    }, 1500);
  };

  // Trigger agent tasks
  const triggerAgentTask = (taskId: string) => {
    setAgentTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'Running', progress: 10 } : t));
    
    // Simulate progress
    const interval = setInterval(() => {
      setAgentTasks(prev => {
        const task = prev.find(t => t.id === taskId);
        if (!task || task.status !== 'Running') {
          clearInterval(interval);
          return prev;
        }
        if (task.progress >= 100) {
          clearInterval(interval);
          return prev.map(t => t.id === taskId ? { ...t, status: 'Success', progress: 100 } : t);
        }
        return prev.map(t => t.id === taskId ? { ...t, progress: Math.min(100, t.progress + 20) } : t);
      });
    }, 600);
  };

  return (
    <div className="min-h-screen bg-accent-100 text-primary-950 p-6 pb-20 dark:bg-accent-100 dark:text-primary-50">
      <div className="max-w-7xl mx-auto">
        
        {/* EXECUTIVE HEADER */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4 border-b border-accent-200 pb-6">
          <div>
            <div className="flex items-center space-x-2 text-primary-550 dark:text-primary-400 mb-1">
              <Cpu className="w-5 h-5" />
              <span className="text-[10px] font-bold tracking-wider uppercase font-mono">AI CXS Executive Suite</span>
            </div>
            <h1 className="text-4xl font-serif font-normal text-primary-950 dark:text-white tracking-tight">
              AI CXO Operations Cockpit
            </h1>
            <p className="text-sm text-primary-500 mt-1">
              Unified enterprise intelligence directing CFO, COO, CLO, and CMO assets.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            {/* Luminous System Status Indicators */}
            <div className="bg-[#EDF3EC] dark:bg-[#1a2d1e] px-4 py-2 rounded border border-[#346538]/20 flex items-center space-x-2">
              <span className="relative flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#346538]"></span>
              </span>
              <div className="text-left">
                <div className="text-[9px] text-[#346538]/80 font-mono uppercase tracking-wider">AI Steward Mode</div>
                <div className="text-[10px] font-bold text-[#346538]">ACTIVE - STEWARDING</div>
              </div>
            </div>

            <div className="bg-[#E1F3FE] dark:bg-[#132735] px-4 py-2 rounded border border-[#1F6C9F]/20 flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#1F6C9F]" />
              <div className="text-left">
                <div className="text-[9px] text-[#1F6C9F]/80 font-mono uppercase tracking-wider">Vault Integrity</div>
                <div className="text-[10px] font-bold text-[#1F6C9F]">VERIFIED SECURE</div>
              </div>
            </div>

            <button 
              onClick={() => setShowCaSignModal(true)}
              className="bg-[#FDEBEC] dark:bg-[#351817] px-4 py-2 rounded border border-[#9F2F2D]/20 flex items-center space-x-2 hover:bg-[#fcdede] active:scale-[0.98] transition-all"
            >
              <Fingerprint className="w-4 h-4 text-[#9F2F2D]" />
              <div className="text-left">
                <div className="text-[9px] text-[#9F2F2D]/85 font-mono uppercase tracking-wider">CA Validation</div>
                <div className="text-[10px] font-bold text-[#9F2F2D]">SIGN-OFF REQUIRED</div>
              </div>
            </button>
          </div>
        </div>

        {/* TAB NAVIGATION */}
        <div className="flex space-x-2 overflow-x-auto pb-4 mb-6">
          {[
            { id: 'dashboard', label: 'Steward Overview', icon: Cpu },
            { id: 'console', label: 'Interactive Console', icon: Workflow },
            { id: 'cfo', label: 'AI CFO', icon: Coins },
            { id: 'credit', label: 'AI Credit Officer', icon: Target },
            { id: 'operations', label: 'AI Operations Officer', icon: Building2 },
            { id: 'growth', label: 'AI Growth Officer', icon: TrendingUp }
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded text-xs font-semibold border transition-all ${
                  active 
                    ? 'bg-primary-950 text-white border-primary-950 dark:bg-primary-50 dark:text-black dark:border-primary-50' 
                    : 'bg-accent-50 border-accent-200 text-neutral-700 hover:bg-neutral-250/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB CONTENTS */}
        <AnimatePresence mode="wait">
          
          {/* TAB 1: STEWARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Mission Header */}
              <div className="neo-card p-8 bg-gradient-to-br from-primary-950 via-gray-900 to-green-950 text-white rounded-3xl border border-white/10 text-left relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-500/10 rounded-full blur-3xl"></div>
                
                <div className="relative z-10 max-w-3xl space-y-4">
                  <div className="inline-flex items-center space-x-2 bg-primary-500/20 text-primary-300 px-3.5 py-1 rounded-full text-xs font-semibold border border-primary-500/30">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI-CXO Goal & Mission Directive</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">The Executive Steward Co-Pilot</h2>
                  <p className="text-sm md:text-md text-gray-300 leading-relaxed font-medium">
                    Bridge scattered accounting ledgers, physical collateral deeds, risk checkers, and growth channels into a unified, bank-ready infrastructure.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-3">
                    <button onClick={() => setActiveTab('console')} className="px-5 py-2.5 bg-gradient-to-r from-primary-600 to-green-600 hover:from-primary-700 hover:to-green-700 text-white text-xs font-bold rounded-xl shadow-lg transition">
                      Launch Interactive Console CLI
                    </button>
                    <a href="#how-it-works" className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/20 transition">
                      Read Process Details
                    </a>
                  </div>
                </div>
              </div>

              {/* Goal Description and Strategy Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-3">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">Why the AI-CXO Stack Exists</h3>
                  <p className="text-xs text-gray-650 dark:text-gray-400 leading-relaxed">
                    Most MSMEs struggle to maintain dedicated chief executive roles. Financial bookkeeping, creditworthiness optimization, real estate title deeds validation, and digital marketing content generation are typically scattered or neglected.
                  </p>
                  <p className="text-xs text-gray-655 dark:text-gray-400 leading-relaxed">
                    The AI-CXO Co-Pilot acts as your virtual management suite. By combining isolated micro-agents into a unified, secure stack, it automates executive operations, analyzes risks before underwriters see them, and schedules marketing tasks automatically.
                  </p>
                </div>

                <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-3">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">The Underwriting & Verification Loop</h3>
                  <div className="space-y-3">
                    {[
                      { step: '01', title: 'Data Feed Processing', desc: 'Ingests Bank Statements, Invoices, and GST filings continuously.' },
                      { step: '02', title: 'Stress & Risk Auditing', desc: 'CFO checks interest coverages; Credit evaluates safe EMI boundaries.' },
                      { step: '03', title: 'DSC Cryptographic Lock', desc: 'Validates property mutations and registers title deeds with DSC keys.' },
                      { step: '04', title: 'Credit Dossier Dispatch', desc: 'Compiles certified, tamper-proof audit sheets ready for lenders.' }
                    ].map(item => (
                      <div key={item.step} className="flex items-start space-x-3">
                        <span className="text-xs font-extrabold text-primary-600 bg-primary-50 dark:bg-primary-950/40 px-2 py-0.5 rounded">{item.step}</span>
                        <div>
                          <h4 className="text-xs font-bold text-gray-800 dark:text-gray-200">{item.title}</h4>
                          <p className="text-[10px] text-gray-500">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Deep-Dive Agent Stack Details */}
              <div className="space-y-4 text-left">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white" id="how-it-works">Detailed Steward Agent Capabilities</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  
                  <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-3 hover:shadow-lg transition">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <Coins className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-sm text-gray-900 dark:text-white">AI CFO</h4>
                    <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed">
                      Coordinates cash split allocation rules (Savings, Taxes, Operations, Profit) via the **Finning Box (BaaS Terminal)**. Simulates loan amortization schedules and identifies EBITDA leakage.
                    </p>
                    <button onClick={() => setActiveTab('cfo')} className="text-xs font-bold text-blue-600 hover:underline flex items-center">
                      Configure CFO <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                    </button>
                  </div>

                  <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-3 hover:shadow-lg transition">
                    <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-950/30 flex items-center justify-center text-green-600 dark:text-green-400">
                      <Target className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-sm text-gray-900 dark:text-white">AI Credit Officer</h4>
                    <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed">
                      Conducts readiness audits against banking guidelines. Standardizes credit files, flags balance sheet anomalies, and verifies compliance document checklists.
                    </p>
                    <button onClick={() => setActiveTab('credit')} className="text-xs font-bold text-green-600 hover:underline flex items-center">
                      Configure Credit <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                    </button>
                  </div>

                  <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-3 hover:shadow-lg transition">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-sm text-gray-900 dark:text-white">AI Operations</h4>
                    <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed">
                      Maintains the **Finpercent Asset Dossier Stack**. Runs optical character recognition (OCR) scans on property deeds and automatically audits SRO mutation updates.
                    </p>
                    <button onClick={() => setActiveTab('operations')} className="text-xs font-bold text-purple-600 hover:underline flex items-center">
                      Configure Operations <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                    </button>
                  </div>

                  <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-3 hover:shadow-lg transition">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-sm text-gray-900 dark:text-white">AI Growth</h4>
                    <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed">
                      Empowers short-form marketing script virality metrics via the CMO Studio. Schedules B2B trade center showcases and monitors the **Finning Circle** forum timeline.
                    </p>
                    <button onClick={() => setActiveTab('growth')} className="text-xs font-bold text-orange-600 hover:underline flex items-center">
                      Configure Growth <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                    </button>
                  </div>

                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: INTERACTIVE CONSOLE */}
          {activeTab === 'console' && (
            <motion.div
              key="console"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Central Agent Console Panel */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* AI Executive Steward Command Panel */}
                <div className="lg:col-span-2 neo-card p-6 rounded-2xl bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border border-white/10 flex flex-col justify-between min-h-[400px]">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Sparkles className="text-yellow-500 w-5 h-5" />
                        <h2 className="text-xl font-bold">AI Executive Steward</h2>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-primary-100 text-primary-700 font-bold dark:bg-primary-950/40 dark:text-primary-300">
                        Online
                      </span>
                    </div>

                    {/* Console Logs Display */}
                    <div className="bg-gray-900 text-green-400 font-mono text-sm rounded-xl p-4 h-60 overflow-y-auto space-y-2 border border-gray-800 text-left">
                      {consoleLogs.map((log, i) => (
                        <div key={i} className="leading-relaxed whitespace-pre-wrap">{log}</div>
                      ))}
                      {isExecuting && (
                        <div className="flex items-center space-x-2 text-yellow-400 animate-pulse">
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>{currentStep}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Suggestion Chips */}
                  <div className="mt-4 text-left">
                    <div className="text-xs font-bold text-gray-500 mb-2">QUICK OPERATIONS PROMPTS:</div>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'Audit golden heights villa legal deeds',
                        'Generate cmo packaging marketing script',
                        'Review outstanding corporate occ bank debt',
                        'Deploy sub-agents for survey validation'
                      ].map(chip => (
                        <button
                          key={chip}
                          onClick={() => handleSendCommand(chip)}
                          disabled={isExecuting}
                          className="text-xs bg-white/60 dark:bg-gray-700/60 hover:bg-white text-gray-800 dark:text-gray-200 px-3 py-1.5 rounded-lg border border-gray-300/40 transition"
                        >
                          "{chip}"
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Input Box */}
                  <div className="mt-4 flex items-center space-x-2">
                    <input
                      type="text"
                      value={commandInput}
                      onChange={e => setCommandInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleSendCommand()}
                      placeholder="Issue command to the Artificial Intelligence Steward..."
                      disabled={isExecuting}
                      className="input-neo flex-1 px-4 py-3 rounded-xl border-0 focus:ring-2 focus:ring-green-500"
                    />
                    <button
                      onClick={() => handleSendCommand()}
                      disabled={isExecuting}
                      className="neo-button glass-action p-3 rounded-xl bg-green-600 text-white hover:bg-green-700"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* ERP Agent Tasks & Automation Status */}
                <div className="neo-card p-6 rounded-2xl bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border border-white/10 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-bold mb-4 flex items-center">
                      <Cpu className="w-5 h-5 mr-2 text-primary-600" />
                      Active ERP Agents
                    </h2>
                    <div className="space-y-4">
                      {agentTasks.map(task => (
                        <div key={task.id} className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-gray-200/50 dark:border-gray-700/30 text-left">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <div className="font-bold text-sm text-gray-900 dark:text-white">{task.name}</div>
                              <div className="text-xs text-gray-500">Agent: {task.assignedAgent}</div>
                            </div>
                            <span className={`text-xs px-2 py-0.5 rounded font-bold ${
                              task.status === 'Running' ? 'bg-yellow-100 text-yellow-800 animate-pulse' :
                              task.status === 'Success' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {task.status}
                            </span>
                          </div>

                          {task.status === 'Running' && (
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-2">
                              <div 
                                className="bg-green-500 h-1.5 rounded-full transition-all duration-300" 
                                style={{ width: `${task.progress}%` }}
                              ></div>
                            </div>
                          )}

                          {task.status === 'Idle' && (
                            <button
                              onClick={() => triggerAgentTask(task.id)}
                              className="w-full text-center py-1 mt-2 bg-primary-100 hover:bg-primary-200 text-primary-800 dark:bg-primary-950/40 dark:text-primary-300 text-xs font-bold rounded-lg transition"
                            >
                              Dispatch Agent
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 rounded-xl flex items-center space-x-2 text-left">
                    <Award className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-xs text-green-800 dark:text-green-300">
                      All agent processes secure. Blockchain records match vault index.
                    </span>
                  </div>

                </div>

              </div>

            </motion.div>
          )}

          {/* TAB 2: CFO OFFICE */}
          {activeTab === 'cfo' && (
            <motion.div
              key="cfo"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="neo-card p-6 bg-white/12 dark:bg-gray-800/20 backdrop-blur-sm border border-white/8 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4 text-left">
                <div>
                  <h2 className="text-2xl font-bold">AI CFO (Finning Box)</h2>
                  <p className="text-gray-600 dark:text-gray-400">Directing automated ledger splits, net worth surplus validations, and cash flow constraints.</p>
                </div>
                <div className="flex space-x-2">
                  <Link to="/automated-banking" className="neo-button glass-action px-4 py-2 text-sm bg-gradient-to-r from-blue-600 to-green-600 text-white">Finning Box (BaaS Terminal)</Link>
                  <Link to="/advanced/market-signals" className="neo-button glass-action px-4 py-2 text-sm">Market Signals</Link>
                </div>
              </div>

              {/* Sankey Flow and Debt Widget */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Financial flow analysis */}
                <div className="lg:col-span-2">
                  <SankeyDiagram
                    data={{
                      nodes: [
                        { name: "Products Sales", value: 1200000 },
                        { name: "Consulting Services", value: 800000 },
                        { name: "Total Revenue", value: 2000000 },
                        { name: "Production Costs", value: 440000 },
                        { name: "Service Overheads", value: 320000 },
                        { name: "Operations ERP", value: 450000 },
                        { name: "Marketing Content", value: 200000 },
                        { name: "Legal Vault Audit", value: 350000 },
                        { name: "Tax Reserve", value: 40000 },
                        { name: "Net Profit", value: 280000 }
                      ],
                      links: [
                        { source: 0, target: 2, value: 1200000 },
                        { source: 1, target: 2, value: 800000 },
                        { source: 2, target: 3, value: 440000 },
                        { source: 2, target: 4, value: 320000 },
                        { source: 2, target: 5, value: 450000 },
                        { source: 2, target: 6, value: 200000 },
                        { source: 2, target: 7, value: 350000 },
                        { source: 2, target: 8, value: 40000 },
                        { source: 2, target: 9, value: 280000 }
                      ]
                    }}
                    width={800}
                    height={400}
                  />
                </div>

                {/* Debt OCC/OD/WC Ledger Summary */}
                <div className="neo-card p-6 bg-white/40 dark:bg-gray-800/40 border border-white/10 rounded-2xl flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center text-left">
                      <Scale className="w-5 h-5 mr-2 text-blue-500" />
                      Debt Ledger Optimization
                    </h3>
                    <div className="space-y-4">
                      {[
                        { title: 'OCC (Open Cash Credit)', amount: '₹14,50,000', rate: '8.4%', status: 'Within Limits', color: 'text-green-600' },
                        { title: 'OD (Overdraft limit)', amount: '₹5,00,005', rate: '9.2%', status: 'Unused', color: 'text-blue-600' },
                        { title: 'WC (Working Capital)', amount: '₹22,00,000', rate: '7.8%', status: 'Active Loan', color: 'text-indigo-600' }
                      ].map(debt => (
                        <div key={debt.title} className="p-3 bg-white/60 dark:bg-gray-850 rounded-xl border border-gray-200/50 text-left">
                          <div className="font-bold text-sm text-gray-900 dark:text-white">{debt.title}</div>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-lg font-extrabold">{debt.amount}</span>
                            <span className={`text-xs font-bold px-2 py-0.5 rounded bg-gray-100 ${debt.color}`}>
                              Int: {debt.rate}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">Status: {debt.status}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 space-y-2">
                    <Link to="/debt/occ" className="w-full neo-button glass-action py-2 inline-block text-center text-xs font-bold">OCC Limit Simulator</Link>
                    <Link to="/debt/wc" className="w-full neo-button glass-action py-2 inline-block text-center text-xs font-bold bg-primary text-white border-0 hover:bg-primary-600">Rebalance Working Capital</Link>
                  </div>
                </div>

              </div>

              {/* Pool display */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 text-left">
                  <InvestmentPools />
                </div>
                <div className="glass-card p-6 rounded-2xl flex flex-col justify-between text-left">
                  <div>
                    <h3 className="text-lg font-bold mb-2">Pool Operations Fund</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Submit operational funding pools or join B2B manufacturing syndications under smart-contract logic.
                    </p>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Active Pools:</span>
                        <span className="font-bold">12 Pools</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Total Value Pooled:</span>
                        <span className="font-bold">₹1.8 Crore</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Target ROI range:</span>
                        <span className="font-bold text-green-600">12% - 28%</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex gap-2">
                    <Link to="/capital-access-intelligence/asset" className="flex-1 neo-button glass-action text-xs py-2 text-center">Asset Intelligence</Link>
                    <Link to="/capital-access-intelligence/operations" className="flex-1 neo-button glass-action text-xs py-2 text-center bg-blue-600 text-white border-0 hover:bg-blue-700">Apply for Capital</Link>
                  </div>
                </div>
              </div>

              {/* Finpercent Vendor OPEX Credit Mandate Section */}
              <div className="neo-card p-8 bg-white/30 dark:bg-gray-800/30 backdrop-blur-md border border-white/10 rounded-2xl space-y-6 text-left">
                <div className="border-b border-primary-200/50 pb-4 dark:border-gray-700/50 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                  <div>
                    <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                      <Scale className="w-5 h-5" />
                      <span className="text-xs font-bold uppercase tracking-wider">Verified OPEX Credit Mandate</span>
                    </div>
                    <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mt-1">
                      Finpercent Vendor OPEX Credit Mandate
                    </h3>
                    <p className="text-xs text-gray-500">
                      Operating-expenditure funding for supply-chain continuity with 100% Linkage proof compliance.
                    </p>
                  </div>
                  
                  {/* Role Selector Toggle */}
                  <div className="flex bg-gray-100/80 dark:bg-gray-800 p-1.5 rounded-xl border border-gray-250 dark:border-gray-750">
                    <button
                      onClick={() => {
                        setOpexRole('provider');
                        setAllocationAlert({ type: '', message: '' });
                      }}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                        opexRole === 'provider'
                          ? 'bg-gradient-to-r from-green-600 to-primary-600 text-white shadow'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      🏢 Main Company (Provider View)
                    </button>
                    <button
                      onClick={() => {
                        setOpexRole('receiver');
                        setAllocationAlert({ type: '', message: '' });
                      }}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                        opexRole === 'receiver'
                          ? 'bg-gradient-to-r from-green-600 to-primary-600 text-white shadow'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      🚜 MSME Vendor (Receiver View)
                    </button>
                  </div>
                </div>

                {/* ROLE BRANCH 1: PROVIDER VIEW */}
                {opexRole === 'provider' && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Panel 1: Active Vendor Allocations List */}
                    <div className="lg:col-span-2 glass-card p-6 rounded-2xl flex flex-col justify-between border border-primary-300/20 text-left">
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                          <Users className="w-5 h-5 mr-2 text-green-500" />
                          Active Vendor Allocations Overview
                        </h4>
                        <p className="text-xs text-gray-500 mb-4">
                          Review current order allocations, outstanding OPEX gap loans, and automated linkage audit compliance.
                        </p>
                        
                        <div className="space-y-4">
                          {opexVendors.map(vendor => (
                            <div key={vendor.id} className="p-4 bg-white/60 dark:bg-gray-850 rounded-xl border border-gray-200/50 flex flex-col md:flex-row justify-between md:items-center gap-4">
                              <div>
                                <div className="font-bold text-sm text-gray-900 dark:text-white">{vendor.name}</div>
                                <div className="text-xs text-gray-550 mt-0.5">
                                  PO Amount: <span className="font-bold text-gray-700 dark:text-gray-300">₹{vendor.poAmount.toLocaleString()}</span>
                                </div>
                              </div>
                              
                              <div className="text-left md:text-right">
                                <div className="text-xs text-gray-550">Allocated OPEX Loan</div>
                                <div className="font-extrabold text-base text-primary-750 dark:text-primary-400">
                                  ₹{vendor.fundedAmount.toLocaleString()}
                                </div>
                              </div>

                              <div className="flex flex-col items-start md:items-end gap-1">
                                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded ${
                                  vendor.status === 'Verified Linkage' ? 'bg-green-100 text-green-800 dark:bg-green-950/20 dark:text-green-300' :
                                  vendor.status === 'Verification Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950/20 dark:text-yellow-300' : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {vendor.status}
                                </span>
                                <span className="text-[10px] text-gray-500">Spread Yield: {vendor.yieldRate}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-6 flex justify-end space-x-2">
                        <button 
                          onClick={() => setConsoleLogs(prev => [...prev, 'ℹ️ [MONITOR]: Active scan triggered for all vendor GST filings.'])}
                          className="neo-button glass-action text-xs px-4 py-2"
                        >
                          Sync SRO & GST Registry
                        </button>
                        <button 
                          onClick={() => setConsoleLogs(prev => [...prev, '⚡ [INTELLIGENCE]: AI matched PO forecasts with GST invoices. No discrepancies found.'])}
                          className="neo-button glass-action text-xs px-4 py-2 bg-gradient-to-r from-green-600 to-primary-600 text-white border-0 hover:from-green-700 hover:to-primary-700 font-bold"
                        >
                          AI Match GST Invoices
                        </button>
                      </div>
                    </div>

                    {/* Panel 2: Yield Logic Settings */}
                    <div className="glass-card p-6 rounded-2xl flex flex-col justify-between border border-primary-300/20">
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                          <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
                          Yield Spread Settings
                        </h4>
                        <p className="text-xs text-gray-500 mb-4">Set baseline capital rates and credit premiums.</p>
                        
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-xs font-bold text-gray-550 mb-1">
                              <span>Market Benchmark Yield</span>
                              <span>{benchmarkYield}%</span>
                            </div>
                            <input 
                              type="range" min="5" max="25" step="0.5" 
                              value={benchmarkYield} 
                              onChange={e => setBenchmarkYield(parseFloat(e.target.value))}
                              className="w-full accent-green-600 cursor-pointer" 
                            />
                          </div>

                          <div>
                            <div className="flex justify-between text-xs font-bold text-gray-550 mb-1">
                              <span>OPEX Credit Premium (Spread)</span>
                              <span>{creditPremium}%</span>
                            </div>
                            <input 
                              type="range" min="0.5" max="8" step="0.1" 
                              value={creditPremium} 
                              onChange={e => setCreditPremium(parseFloat(e.target.value))}
                              className="w-full accent-blue-600 cursor-pointer" 
                            />
                          </div>

                          <div className="grid grid-cols-3 gap-2">
                            <div>
                              <span className="text-[10px] text-gray-500 block mb-1">Agency Fee</span>
                              <input 
                                type="number" step="0.1" value={agencyFee} 
                                onChange={e => setAgencyFee(parseFloat(e.target.value) || 0)}
                                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded p-1 text-xs font-bold" 
                              />
                            </div>
                            <div>
                              <span className="text-[10px] text-gray-500 block mb-1">Risk Reserve</span>
                              <input 
                                type="number" step="0.1" value={riskReserve} 
                                onChange={e => setRiskReserve(parseFloat(e.target.value) || 0)}
                                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded p-1 text-xs font-bold" 
                              />
                            </div>
                            <div>
                              <span className="text-[10px] text-gray-500 block mb-1">Ops Cost</span>
                              <input 
                                type="number" step="0.1" value={opsCost} 
                                onChange={e => setOpsCost(parseFloat(e.target.value) || 0)}
                                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded p-1 text-xs font-bold" 
                              />
                            </div>
                          </div>
                        </div>

                        {/* Yield Results Box */}
                        <div className="mt-4 p-3 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-800/50 rounded-xl space-y-2 text-xs">
                          <div className="flex justify-between font-bold">
                            <span>Target Investor Return:</span>
                            <span className="text-blue-600 dark:text-blue-400">
                              {(benchmarkYield + creditPremium).toFixed(1)}% (Annualized)
                            </span>
                          </div>
                          <div className="flex justify-between font-bold border-t border-blue-200/50 pt-2 dark:border-blue-800/55">
                            <span>Required Vendor Yield:</span>
                            <span className="text-green-600 dark:text-green-400">
                              {(benchmarkYield + creditPremium + agencyFee + riskReserve + opsCost).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-[10px] text-gray-500 text-center mt-2">
                        Target returns adjust dynamically with vendor risk profile.
                      </div>
                    </div>
                  </div>
                )}

                {/* ROLE BRANCH 2: RECEIVER (MSME VENDOR) VIEW */}
                {opexRole === 'receiver' && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    
                    {/* Panel 1: Select PO & Submit Proofs */}
                    <div className="glass-card p-6 rounded-2xl flex flex-col justify-between border border-primary-300/20 text-left">
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                          <FileText className="w-5 h-5 mr-2 text-indigo-500" />
                          Select Active PO & Link Proofs
                        </h4>
                        <p className="text-xs text-gray-500 mb-4">Link active PO and trigger 5-layer linkage validation.</p>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Select Order Contract</label>
                            <select 
                              value={selectedVendor}
                              onChange={e => setSelectedVendor(e.target.value)}
                              className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl p-2 text-xs font-bold"
                            >
                              {opexVendors.map(v => (
                                <option key={v.id} value={v.name}>{v.name} (PO: ₹{v.poAmount.toLocaleString()})</option>
                              ))}
                            </select>
                          </div>

                          {/* Audit proofs status */}
                          <div className="space-y-2">
                            {[
                              { key: 'relationship', label: '1. Relationship Proof', desc: 'Vendor linked to company, past invoices verified.' },
                              { key: 'order', label: '2. Order Proof', desc: 'PO & delivery schedule verified.' },
                              { key: 'necessity', label: '3. OPEX Necessity Proof', desc: 'Quotes, cost sheet & labor sheet verified.' },
                              { key: 'useOfFunds', label: '4. Use-of-Funds Proof', desc: 'Escrow release criteria locked.' },
                              { key: 'repayment', label: '5. Repayment Proof', desc: 'TReDS escrow invoice registered.' }
                            ].map(proof => (
                              <div 
                                key={proof.key} 
                                className={`p-2 rounded-lg border transition ${
                                  proofsVerified[proof.key as keyof typeof proofsVerified] 
                                    ? 'bg-green-100/40 border-green-300 dark:bg-green-950/20 dark:border-green-800' 
                                    : 'bg-gray-50/50 border-gray-200/50 dark:bg-gray-900/30 dark:border-gray-800'
                                }`}
                              >
                                <div className="flex items-center justify-between text-[11px] font-bold">
                                  <span>{proof.label}</span>
                                  {proofsVerified[proof.key as keyof typeof proofsVerified] ? (
                                    <Check className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                                  ) : (
                                    <div className="w-3.5 h-3.5 rounded-full border border-gray-350 dark:border-gray-600 animate-pulse"></div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={handleRunProofAudit}
                        disabled={isCheckingProofs}
                        className="w-full mt-4 py-2.5 bg-green-600 text-white font-bold rounded-xl text-xs hover:bg-green-700 disabled:opacity-50 transition"
                      >
                        {isCheckingProofs ? 'Auditing Invoices & PO Links...' : 'Verify Linkage Proofs (Run Audit)'}
                      </button>
                    </div>

                    {/* Panel 2: Payout request console */}
                    <div className="glass-card p-6 rounded-2xl flex flex-col justify-between border border-primary-300/20 text-left">
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                          <Coins className="w-5 h-5 mr-2 text-yellow-500" />
                          Request Payout Disbursement
                        </h4>
                        <p className="text-xs text-gray-500 mb-4">Request disbursement of approved OPEX funds linked to PO proofs.</p>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Disbursement Amount (₹)</label>
                            <input 
                              type="number" value={opexAmount}
                              onChange={e => setOpexAmount(parseInt(e.target.value) || 0)}
                              className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl p-2 text-xs font-bold"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Select Expenditure Usecase</label>
                            <select 
                              value={selectedUseCase}
                              onChange={e => setSelectedUseCase(e.target.value)}
                              className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl p-2 text-xs font-bold"
                            >
                              <optgroup label="ALLOWED USE CASES">
                                <option>Raw Material Purchase</option>
                                <option>Labor & Wages</option>
                                <option>Logistics & Dispatch</option>
                                <option>Machine Operation Expenses</option>
                                <option>GST / Working Capital Gap</option>
                              </optgroup>
                              <optgroup label="PROHIBITED USE CASES">
                                <option>Personal Use</option>
                                <option>Old Unrelated Debt</option>
                                <option>Speculative Expansion</option>
                                <option>Cash Withdrawal</option>
                                <option>Owner Drawings</option>
                              </optgroup>
                            </select>
                          </div>

                          {/* Guardrail warnings */}
                          {allocationAlert.type && (
                            <div className={`p-3 rounded-xl text-xs border ${
                              allocationAlert.type === 'error' 
                                ? 'bg-red-50 text-red-800 border-red-200 dark:bg-red-950/20 dark:text-red-300 dark:border-red-800' 
                                : 'bg-green-50 text-green-800 border-green-200 dark:bg-green-950/20 dark:text-green-300 dark:border-green-800'
                            }`}>
                              <div className="flex items-start space-x-2">
                                {allocationAlert.type === 'error' ? (
                                  <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                                ) : (
                                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                )}
                                <span>{allocationAlert.message}</span>
                              </div>
                            </div>
                          )}

                          <div className="p-3 bg-purple-50 dark:bg-purple-950/20 border border-purple-200/50 dark:border-purple-800/50 rounded-xl text-xs space-y-1">
                            <div className="flex justify-between font-bold text-purple-700 dark:text-purple-300">
                              <span>Interest spread Premium:</span>
                              <span>{(benchmarkYield + creditPremium + agencyFee + riskReserve + opsCost).toFixed(1)}%</span>
                            </div>
                            <div className="text-[10px] text-gray-500">Includes investor target return + Finpercent agency fee</div>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={handleAllocateOPEX}
                        className="w-full mt-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl text-xs hover:from-purple-700 hover:to-indigo-700 transition"
                      >
                        Request OPEX Disbursement Payout
                      </button>
                    </div>
                  </div>
                )}

                {/* Section 4: End-To-End Schematic flow */}
                <div className="p-5 bg-gray-50/50 dark:bg-gray-900/30 rounded-2xl border border-gray-200/50">
                  <h4 className="font-bold text-sm text-gray-800 dark:text-gray-200 mb-4 text-center">
                    Finpercent Vendor OPEX Credit Cycle Schematic
                  </h4>
                  
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold">
                    {[
                      { step: 1, label: 'Capital Allocation', desc: 'Main Company/Investor allocates OPEX gap funds.' },
                      { step: 2, label: 'Linkage Engine', desc: 'Checks relationship, necessity & PO proofs.' },
                      { step: 3, label: 'Verified Vendor', desc: 'Receives verified operating funds directly.' },
                      { step: 4, label: 'Supply Event', desc: 'Executed raw materials, labor, logs.' },
                      { step: 5, label: 'Escrow Repayment', desc: 'Payment flows back with credit spread return.' }
                    ].map((item, index) => (
                      <div 
                        key={item.step} 
                        onClick={() => setActiveSchematicStep(index)}
                        className={`flex-1 text-center p-3 rounded-xl border cursor-pointer transition ${
                          activeSchematicStep === index 
                            ? 'bg-gradient-to-br from-primary-500 to-green-600 text-white border-transparent shadow-lg scale-105' 
                            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                        }`}
                      >
                        <div className="flex items-center justify-center space-x-2">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                            activeSchematicStep === index ? 'bg-white text-green-600 font-bold' : 'bg-gray-100 dark:bg-gray-700 text-gray-500'
                          }`}>
                            {item.step}
                          </div>
                          <span className="font-bold text-[11px]">{item.label}</span>
                        </div>
                        <p className={`text-[10px] mt-1 ${activeSchematicStep === index ? 'text-green-50' : 'text-gray-550'}`}>
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 3: AI CREDIT OFFICER */}
          {activeTab === 'credit' && (
            <motion.div
              key="credit"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="neo-card p-6 bg-white/12 dark:bg-gray-800/20 backdrop-blur-sm border border-white/8 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4 text-left">
                <div>
                  <h2 className="text-2xl font-bold">AI Credit Officer</h2>
                  <p className="text-gray-600 dark:text-gray-400">Assess formal loan readiness, verify safe EMI capacity limits, and complete borrowing dossiers.</p>
                </div>
                <div className="flex space-x-2">
                  <Link to="/credit/readiness-report" className="neo-button glass-action px-4 py-2 text-sm bg-gradient-to-r from-green-600 to-emerald-600 text-white">Full Credit Report</Link>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card p-6 rounded-2xl text-left space-y-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Borrower Analysis Parameters</h3>
                  <ul className="space-y-3 text-xs">
                    <li className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800">
                      <span className="text-gray-500">Debt-service Coverage Ratio</span>
                      <span className="font-bold text-green-600">2.2x (Stable)</span>
                    </li>
                    <li className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800">
                      <span className="text-gray-500">Outstanding Overdraft Utilization</span>
                      <span className="font-bold text-gray-900 dark:text-white">40% Average</span>
                    </li>
                    <li className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800">
                      <span className="text-gray-500">GST Compliance Filing Regularity</span>
                      <span className="font-bold text-yellow-600">92% Consistency</span>
                    </li>
                  </ul>
                </div>
                <div className="glass-card p-6 rounded-2xl text-left space-y-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Loan Limit Diagnostics</h3>
                  <div className="p-4 bg-primary-50 dark:bg-primary-950/20 rounded-xl space-y-2 border border-primary-100/50">
                    <span className="font-bold text-xs text-primary-950 dark:text-primary-300 block">Calculated Borrowing Capacity</span>
                    <p className="text-[11px] text-primary-800 dark:text-primary-400">
                      Based on audited EBITDA margins, your safe term borrowing limit stands at <strong>₹25,00,000</strong>.
                    </p>
                  </div>
                  <button onClick={() => navigate('/credit/loan-capacity')} className="w-full py-2 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-650 border border-gray-200 dark:border-gray-600 text-xs font-semibold rounded-lg">
                    Access Loan Calculator
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: AI OPERATIONS OFFICER */}
          {activeTab === 'operations' && (
            <motion.div
              key="operations"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="neo-card p-6 bg-white/12 dark:bg-gray-800/20 backdrop-blur-sm border border-white/8 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4 text-left">
                <div>
                  <h2 className="text-2xl font-bold">AI Operations (Asset Dossier)</h2>
                  <p className="text-gray-600 dark:text-gray-400">Orchestrate multi-agent flows, audit working capital (DSO/DPO), and verify the registered property mutation stack.</p>
                </div>
                <div className="flex space-x-2">
                  <Link to="/ai-cxo/operations-officer/flow" className="neo-button glass-action px-4 py-2 text-sm bg-gradient-to-r from-green-600 to-emerald-600 text-white">Visualize Flows</Link>
                  <Link to="/ai-cxo/operations-officer/marketplace" className="neo-button glass-action px-4 py-2 text-sm bg-white dark:bg-gray-800">Agent Marketplace</Link>
                  <button
                    onClick={() => setShowCaSignModal(true)}
                    className="neo-button glass-action px-4 py-2 text-sm bg-purple-600 text-white border-0 hover:bg-purple-700 flex items-center space-x-2 rounded-xl"
                  >
                    <Fingerprint className="w-4 h-4" />
                    <span>CA Sign-Off</span>
                  </button>
                </div>
              </div>

              {/* Collateral Dossier Stack */}
              <div className="bg-white/30 dark:bg-gray-900/30 rounded-2xl border border-white/10 p-5 space-y-4">
                <div className="text-left">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Legal Dossiers & Collateral Assets</h3>
                  <p className="text-xs text-gray-500 mt-0.5">CA digital signature challenge status on mutating properties</p>
                </div>
                <AssetDossierStack />
              </div>

              {/* Agent Authorization Hierarchy and Auditor Logs */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Authorization hierarchy diagram/list */}
                <div className="glass-card p-6 rounded-2xl text-left">
                  <h3 className="text-xl font-bold mb-4">Agent Authorization Hierarchy</h3>
                  <p className="text-xs text-gray-500 mb-6">Visual mapping of agent command permissions, execution paths, and signing weights.</p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-green-500/10 rounded-xl border border-green-500/30">
                      <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">CEO</div>
                      <div className="text-left flex-1">
                        <div className="font-bold text-sm">AI CXO Steward (Root Owner)</div>
                        <div className="text-xs text-gray-500">Signing Weight: 100% | Full Execution</div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>

                    <div className="ml-6 flex items-center space-x-3 p-3 bg-blue-500/10 rounded-xl border border-blue-500/30">
                      <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">CFO</div>
                      <div className="text-left flex-1">
                        <div className="font-bold text-sm">TaxAgent-X (Financial Steward)</div>
                        <div className="text-xs text-gray-500">Allowed: Bank balances, tax filings, OCC rebalancing</div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>

                    <div className="ml-12 flex items-center space-x-3 p-3 bg-purple-500/10 rounded-xl border border-purple-500/30">
                      <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold">CLO</div>
                      <div className="text-left flex-1">
                        <div className="font-bold text-sm">SurveyorAgent-2 (Property Validator)</div>
                        <div className="text-xs text-gray-500">Allowed: SRO querying, Patta checks, land reports</div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>

                    <div className="ml-18 flex items-center space-x-3 p-3 bg-yellow-500/10 rounded-xl border border-yellow-500/30">
                      <div className="w-8 h-8 rounded-full bg-yellow-500 text-white flex items-center justify-center font-bold">AUD</div>
                      <div className="text-left flex-1">
                        <div className="font-bold text-sm">AuditorAgent-4 (Operations Inspector)</div>
                        <div className="text-xs text-gray-500">Allowed: Hash matching, tamper alarms, log validation</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <Link to="/ai-cxo/operations-officer/authorization" className="neo-button glass-action text-xs px-4 py-2">Manage Signing Weights</Link>
                  </div>
                </div>

                {/* Auditor Workflow Console */}
                <div className="glass-card p-6 rounded-2xl flex flex-col justify-between text-left">
                  <div>
                    <h3 className="text-xl font-bold mb-4">Auditor Agent Workflow Logs</h3>
                    <p className="text-xs text-gray-500 mb-4">Real-time alerts, process verifications, and compliance logs.</p>
                    
                    <div className="space-y-3 bg-gray-950 font-mono text-xs text-green-400 p-4 rounded-xl h-64 overflow-y-auto border border-gray-800 text-left">
                      <div>[09:12] [SYSTEM] AuditorAgent-4 initialized workflow check.</div>
                      <div>[09:13] [HASH-CHECK] Matching SHA-256 local registry with vault ledger...</div>
                      <div>[09:13] [HASH-CHECK] Golden Heights Villa deed.pdf matches: SUCCESS.</div>
                      <div>[09:14] [COMPLIANCE] GST filings matches CA ledgers. Compliance rating: 100%.</div>
                      <div>[09:15] [WARNING] Electricity account (EB) mutation pending for Peenya Warehouse.</div>
                      <div>[09:16] [MONITOR] Watching next block height for digital validation...</div>
                    </div>
                  </div>
                  <div className="mt-6 flex gap-2">
                    <Link to="/ai-cxo/operations-officer/auditor" className="flex-1 neo-button glass-action text-xs py-2 text-center bg-blue-600 text-white border-0 hover:bg-blue-700">Open Full Audit Console</Link>
                    <Link to="/ai-cxo/operations-officer/report" className="flex-1 neo-button glass-action text-xs py-2 text-center">Export Multi-Agent Report</Link>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 5: AI GROWTH OFFICER */}
          {activeTab === 'growth' && (
            <motion.div
              key="growth"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="neo-card p-6 bg-white/12 dark:bg-gray-800/20 backdrop-blur-sm border border-white/8 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4 text-left">
                <div>
                  <h2 className="text-2xl font-bold">AI Growth (CMO & Community)</h2>
                  <p className="text-gray-600 dark:text-gray-400">Generate B2B marketing content, simulate buyer engagement metrics, and discover scheduled trade expos.</p>
                </div>
                <div className="flex space-x-2">
                  <Link to="/network/msme-community/dashboard" className="neo-button glass-action px-4 py-2 text-sm bg-gradient-to-r from-blue-600 to-green-600 text-white">Finning Circle Dashboard</Link>
                  <Link to="/network/msme-community/timeline" className="neo-button glass-action px-4 py-2 text-sm bg-white dark:bg-gray-800">Expos Timeline</Link>
                  <Link to="/network/msme-community/live" className="neo-button glass-action px-4 py-2 text-sm bg-red-600 text-white border-0 hover:bg-red-700">Live Streams</Link>
                </div>
              </div>

              {/* Short form content generator & Expo list */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Short-Form Video Generator */}
                <div className="lg:col-span-2 glass-card p-6 rounded-2xl flex flex-col justify-between text-left">
                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center">
                      <Film className="w-5 h-5 mr-2 text-purple-600 animate-bounce" />
                      AI Real Short-Form Content Generator
                    </h3>
                    <p className="text-xs text-gray-500 mb-6">Generate vertical marketing video hooks, scripts, and visuals focused on B2B manufacturing and sustainable technology.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-650 uppercase mb-2">Video Topic</label>
                        <select 
                          value={videoTopic}
                          onChange={e => setVideoTopic(e.target.value)}
                          className="w-full bg-white dark:bg-gray-800 rounded-xl p-2 border border-gray-300 dark:border-gray-700 text-sm"
                        >
                          <option>Sustainable Industrial Tech</option>
                          <option>Global Exporting for SMEs</option>
                          <option>AI-driven Asset Auditing</option>
                          <option>B2B Smart Circular Economy</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-650 uppercase mb-2">Hook Angle</label>
                        <select
                          value={videoHookType}
                          onChange={e => setVideoHookType(e.target.value)}
                          className="w-full bg-white dark:bg-gray-800 rounded-xl p-2 border border-gray-300 dark:border-gray-700 text-sm"
                        >
                          <option>Stat-driven</option>
                          <option>Controversial statement</option>
                          <option>Problem/Solution</option>
                          <option>Direct Question</option>
                        </select>
                      </div>
                    </div>

                    <button
                      onClick={handleGenerateVideo}
                      disabled={isGeneratingVideo}
                      className="w-full py-3 neo-button glass-action bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 hover:from-purple-700 hover:to-pink-700 rounded-xl font-bold flex items-center justify-center space-x-2 transition"
                    >
                      {isGeneratingVideo ? (
                        <>
                          <RefreshCw className="w-5 h-5 animate-spin" />
                          <span>Rendering Script & Caption Ideas...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5" />
                          <span>Generate Short-Form Script</span>
                        </>
                      )}
                    </button>

                    {/* Output script */}
                    {generatedScript && (
                      <div className="mt-6 p-4 bg-white/70 dark:bg-gray-900/60 rounded-2xl border border-purple-200/50 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-extrabold text-purple-700 dark:text-purple-400 bg-purple-100 dark:bg-purple-950/40 px-2.5 py-1 rounded-full uppercase">Generated Script</span>
                          <div className="flex space-x-2 text-xs text-gray-500">
                            <span>Score: <span className="text-green-600 font-bold">{generatedScript.metrics.score}</span></span>
                            <span>•</span>
                            <span>Est. Reach: <span className="text-blue-600 font-bold">{generatedScript.metrics.reach}</span></span>
                          </div>
                        </div>
                        <div className="text-sm italic font-medium text-gray-800 dark:text-gray-200 border-l-2 border-purple-500 pl-3">
                          "{generatedScript.hook}"
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          <strong>Visual:</strong> {generatedScript.visuals}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          <strong>Audio:</strong> {generatedScript.audio}
                        </div>
                        <div className="text-xs text-purple-600 dark:text-purple-400 font-semibold">
                          <strong>CTA:</strong> {generatedScript.cta}
                        </div>
                      </div>
                    )}

                  </div>
                </div>

                {/* Expos and Exhibition Venue Profiles */}
                <div className="glass-card p-6 rounded-2xl flex flex-col justify-between text-left">
                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center">
                      <Map className="w-5 h-5 mr-2 text-indigo-500" />
                      Global Trade Expos
                    </h3>
                    <p className="text-xs text-gray-500 mb-4">Discover venue profiles and scheduled expos for manufacturing SMEs.</p>
                    
                    <div className="space-y-3">
                      {[
                        { title: 'Singapore EXPO', event: 'Asia Pack & Tech Expo 2026', date: 'Jul 15, 2026', benefits: 'SME Export Grants available' },
                        { title: 'Changi Exhibition Centre', event: 'Global Circular Logistics Forum', date: 'Sep 22, 2026', benefits: 'Free logistics matchings' },
                        { title: 'Kuala Lumpur Convention', event: 'B2B Smart Manufacturing Summit', date: 'Oct 05, 2026', benefits: 'Customs tax discounts' }
                      ].map(venue => (
                        <div key={venue.title} className="p-3 bg-white/50 dark:bg-gray-800/40 rounded-xl border border-gray-200/50 text-left">
                          <div className="font-bold text-sm text-gray-900 dark:text-white">{venue.title}</div>
                          <div className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mt-1">{venue.event}</div>
                          <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
                            <span>Date: {venue.date}</span>
                            <span className="bg-green-100 text-green-800 dark:bg-green-950/20 dark:text-green-300 px-1.5 py-0.5 rounded text-[10px] font-bold">
                              {venue.benefits}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Link to="/network/msme-community/venue" className="flex-1 neo-button glass-action text-xs py-2 text-center">Venue Profiles</Link>
                    <Link to="/network/workshops" className="flex-1 neo-button glass-action text-xs py-2 text-center bg-indigo-600 text-white border-0 hover:bg-indigo-700">Masterclasses</Link>
                  </div>
                </div>

              </div>

            </motion.div>
          )}

        </AnimatePresence>

      </div>

      {/* CHARTERED ACCOUNTANT SIGN-OFF MODAL */}
      {showCaSignModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="neo-card bg-white dark:bg-gray-905 max-w-lg w-full rounded-2xl overflow-hidden shadow-2xl border border-purple-200/40">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center space-x-2">
                <Fingerprint className="w-6 h-6 text-purple-600" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Chartered Accountant Sign-Off
                </h3>
              </div>
              <button
                onClick={() => setShowCaSignModal(false)}
                className="p-2 hover:bg-gray-150 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 text-left space-y-6">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                To approve mutations and finalize corporate deed validation, a Chartered Accountant or authorized legal representative must authenticate with their registered DSC/FIDO2 hardware key token.
              </p>

              <div className="p-4 bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-xl space-y-2">
                <div className="flex justify-between text-xs font-bold text-purple-800 dark:text-purple-300">
                  <span>Assessing Property:</span>
                  <span>Golden Heights Villa (FP-PROP-421)</span>
                </div>
                <div className="flex justify-between text-xs text-purple-700 dark:text-purple-400">
                  <span>Mutation type:</span>
                  <span>Patta Registration & Tax File Alignment</span>
                </div>
                <div className="flex justify-between text-xs text-purple-700 dark:text-purple-400">
                  <span>Authorized Representative:</span>
                  <span>Suresh Kumar (CA Registry No. 8912)</span>
                </div>
              </div>

              {/* Challenge Status Flow */}
              <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-6 text-center space-y-4">
                
                {caSignStatus === 'idle' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                      <Key className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white">Plug CA Hardware Token</div>
                      <div className="text-xs text-gray-500 mt-1">Insert FIDO2 Yubikey or DSC USB Token to continue.</div>
                    </div>
                    <button 
                      onClick={handlePlugToken}
                      className="neo-button glass-action px-6 py-2 bg-purple-600 text-white border-0 hover:bg-purple-700 font-bold rounded-xl"
                    >
                      Simulate Plugging USB Key Token
                    </button>
                  </div>
                )}

                {caSignStatus === 'plugged' && (
                  <div className="space-y-4">
                    <RefreshCw className="w-10 h-10 text-purple-600 animate-spin mx-auto" />
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white">Reading Key ID...</div>
                      <div className="text-xs text-gray-500 mt-1">Establishing secure SSL handshake connection.</div>
                    </div>
                  </div>
                )}

                {caSignStatus === 'authorized' && (
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto animate-pulse">
                      <UserCheck className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white">Handshake Validated</div>
                      <div className="text-xs text-gray-500 mt-1">Token ID: dsc-india-suresh-449. Registered owner: Suresh Kumar.</div>
                    </div>
                    <div className="flex gap-3 justify-center">
                      <button
                        onClick={handleSignTransaction}
                        className="neo-button glass-action px-6 py-2 bg-green-600 text-white border-0 hover:bg-green-700 font-bold rounded-xl"
                      >
                        Sign & Validate Mutation Deeds
                      </button>
                      <button
                        onClick={() => setCaSignStatus('idle')}
                        className="neo-button glass-action px-4 py-2 rounded-xl"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                )}

                {caSignStatus === 'completed' && (
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                      <Check className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="font-bold text-green-600">CA Validation Complete</div>
                      <div className="text-xs text-gray-500 mt-1">Transaction encrypted with key certificate. Vault integrity locked.</div>
                    </div>
                  </div>
                )}

              </div>

            </div>

            {/* Modal Footer */}
            <div className="flex justify-end p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/40">
              <button
                onClick={() => setShowCaSignModal(false)}
                className="neo-button glass-action px-6 py-2 rounded-xl"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
