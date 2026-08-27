import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, Shield, FileText, Key, Users, CheckCircle2, AlertTriangle, 
  TrendingUp, Calendar, Lock, Upload, Download, RefreshCw, Plus, Trash2, 
  Eye, Edit, Coins, Scale, Search, Sparkles, UserCheck, Check, ArrowRight, Target,
  Info, FileSpreadsheet, Fingerprint, ShieldCheck, Activity, HelpCircle,
  Play, Send, Zap, Award, Film, MessageSquare, Video, History, GraduationCap,
  ChevronRight, Map, Cpu, X, Workflow, Sliders
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
  initialTab?: 'dashboard' | 'console' | 'cfo' | 'credit' | 'operations' | 'growth' | 'decision-engine';
}

export default function AICXOSuitePage({ initialTab }: AICXOSuitePageProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'console' | 'cfo' | 'credit' | 'operations' | 'growth' | 'decision-engine'>(initialTab ?? 'dashboard');

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
    } else if (path.endsWith('/decision-engine')) {
      setActiveTab('decision-engine');
    } else {
      setActiveTab('dashboard');
    }
  }, [location.pathname]);

  // Load Onboarding Storyteller Scenario if present
  useEffect(() => {
    let scenario = location.state as any;
    
    if (!scenario) {
      const stored = localStorage.getItem('onboarding_scenario');
      if (stored) {
        try {
          scenario = JSON.parse(stored);
        } catch (e) {
          console.error("Error parsing stored scenario:", e);
        }
      }
    }
    
    if (scenario) {
      if (scenario.odpGrowth !== undefined) setOdpGrowth(scenario.odpGrowth);
      if (scenario.odpLiquidity !== undefined) setOdpLiquidity(scenario.odpLiquidity);
      if (scenario.bizCashRunway !== undefined) setBizCashRunway(scenario.bizCashRunway);
      if (scenario.bizDso !== undefined) setBizDso(scenario.bizDso);
      if (scenario.bizDebtUtil !== undefined) setBizDebtUtil(scenario.bizDebtUtil);
      if (scenario.envInterestRate !== undefined) setEnvInterestRate(scenario.envInterestRate);
      
      localStorage.removeItem('onboarding_scenario');
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.state]);
  
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

  // --- Finpercent Decision Infrastructure (CGT-DBE & 30-Day Trial) States ---
  const [trialPhase, setTrialPhase] = useState<'setup' | 'shadow' | 'reveal' | 'assisted' | 'normal' | 'paid'>('assisted');
  
  // Owner Decision Profile (ODP)
  const [odpGrowth, setOdpGrowth] = useState(82);
  const [odpRisk, setOdpRisk] = useState(61);
  const [odpLiquidity, setOdpLiquidity] = useState(88);
  const [odpDebt, setOdpDebt] = useState(32);
  const [odpControl, setOdpControl] = useState(74);
  const [odpHorizon, setOdpHorizon] = useState(68);
  const [odpLoss, setOdpLoss] = useState(77);
  const [observedDecisionsCount, setObservedDecisionsCount] = useState(6);
  
  // Onboarding Scenario Answers
  const [scenario1, setScenario1] = useState<string | null>(null);
  const [scenario2, setScenario2] = useState<string | null>(null);
  const [selectedObjectives, setSelectedObjectives] = useState<string[]>(['working_capital', 'receivables', 'order_acceptance']);
  const [isBaselineVerified, setIsBaselineVerified] = useState(false);
  const [isDataTrustApproved, setIsDataTrustApproved] = useState(false);
  
  // Environment State
  const [envCreditRisk, setEnvCreditRisk] = useState('deteriorating');
  const [envInterestRate, setEnvInterestRate] = useState('rising');
  const [envMarketDemand, setEnvMarketDemand] = useState('stable');

  // Business State Metrics
  const [bizCashRunway, setBizCashRunway] = useState(42);
  const [bizDso, setBizDso] = useState(81);
  const [bizDebtUtil, setBizDebtUtil] = useState(78);
  const [bizMargin, setBizMargin] = useState(22);
  const [bizSupplierCredit, setBizSupplierCredit] = useState(45);
  
  // Execution Permissions
  const [permissionLevel, setPermissionLevel] = useState<0 | 1 | 2 | 3>(1); // 0=Shadow, 1=Recommend, 2=Prepare, 3=Execute within Policy
  
  // --- CGT-DBE Strategic Policy Engine Calculations ---
  // Positive Force: represents growth appetite, risk tolerance, and market demand
  const positiveForceScore = Math.round(
    (odpGrowth * 0.6) + 
    (odpRisk * 0.2) + 
    (envMarketDemand === 'stable' ? 20 : 5)
  );

  // Negative Pressure: representing cash runway, DSO, debt utilization, interest rates, credit risk
  const negativePressureScore = Math.round(
    ((100 - bizCashRunway) * 0.3) + 
    (bizDso * 0.3) + 
    (bizDebtUtil * 0.2) + 
    (envCreditRisk === 'deteriorating' ? 15 : 5) + 
    (envInterestRate === 'rising' ? 10 : 0)
  );

  // Raw Score: Positive Force Score - Negative Pressure Score
  const rawScore = positiveForceScore - negativePressureScore;

  // Raw Posture
  const rawPosture: 'BUILD' | 'STABILIZE' | 'DEFEND' = 
    rawScore >= 15 ? 'BUILD' : 
    rawScore >= -10 ? 'STABILIZE' : 'DEFEND';

  // Hard Safety Constraints Downgrade Check (triggerDowngraded / activeTriggers)
  const activeTriggers: string[] = [];
  if (bizCashRunway < 45) {
    activeTriggers.push('Low Cash Runway');
  }
  if (bizDebtUtil > 70) {
    activeTriggers.push('High Debt Utilization');
  }
  if (bizDso > 80) {
    activeTriggers.push('High DSO Days');
  }

  const triggerDowngraded = activeTriggers.length > 0;

  // calculatedPosture: If triggerDowngraded and rawPosture is 'BUILD', downgrade to 'STABILIZE'. Or if rawPosture is 'STABILIZE' and triggers are very severe, downgrade to 'DEFEND'.
  const calculatedPosture = triggerDowngraded 
    ? (rawPosture === 'BUILD' ? 'STABILIZE' : (rawPosture === 'STABILIZE' && bizCashRunway < 30 ? 'DEFEND' : rawPosture))
    : rawPosture;

  // Active Cases & Decisions Inbox
  const [selectedCaseId, setSelectedCaseId] = useState<string>('case-1');
  const [casesData, setCasesData] = useState([
    {
      id: 'case-1',
      title: 'Sales Order: ₹22,00,000 (NeoPack)',
      type: 'order',
      amount: 2200000,
      recAction: 'Accept conditionally: Require ≥15% advance payment (₹3.3L)',
      altAction: 'Option A: Accept normally (Risk: Cash shortage in 38 days). Option B: 15% Advance (Risk: Negligible).',
      rawPosture: 'BUILD',
      finalPosture: 'STABILIZE',
      trigger: 'DSO / Working Capital Pressure',
      confidence: 86,
      status: 'pending', // pending, accepted, modified, rejected
      ownerAction: '',
      outcome: 'Pending Outcome Verification',
      invoices: ['INV-2026-089: ₹12L (DSO 85 days)', 'INV-2026-092: ₹10L (DSO 78 days)'],
      whyTrace: 'Growth force is strong (+76/100) but Cash Runway is critically low (42 days) and Debt Utilization is high (78%). Initial score suggested BUILD, but working capital safety triggers capped posture at STABILIZE.',
      cashDeficitWithout: '₹4.8L deficit in 38 days',
      cashDeficitWith: 'No deficit (₹1.5L surplus)'
    },
    {
      id: 'case-2',
      title: 'Purchase Order: ₹8,40,000 (Materials)',
      type: 'purchase',
      amount: 840000,
      recAction: 'Delay procurement by 14 days or negotiate 60 days supplier credit',
      altAction: 'Option A: Purchase immediately (Deters runway to 28 days). Option B: Delay 14 days (Saves runway cash).',
      rawPosture: 'STABILIZE',
      finalPosture: 'DEFEND',
      trigger: 'Critical Liquidity Risk',
      confidence: 72,
      status: 'pending',
      ownerAction: '',
      outcome: 'Pending Outcome Verification',
      invoices: ['PO-2026-112: ₹8.4L raw polymer stock'],
      whyTrace: 'Free cash is ₹15L vs outstanding statutory payables of ₹9L. High inventory levels exist (1.8x turnover cycle). Liquidity constraint limits purchasing capability.',
      cashDeficitWithout: '₹6.1L deficit in 25 days',
      cashDeficitWith: '₹1.1L deficit'
    },
    {
      id: 'case-3',
      title: 'Overdue Invoice: ₹6,20,000 (AlphaTech)',
      type: 'receivables',
      amount: 620000,
      recAction: 'Prioritize collection immediately. Send automated demand letter.',
      altAction: 'Option A: Normal reminder. Option B: High-priority legal notice.',
      rawPosture: 'STABILIZE',
      finalPosture: 'STABILIZE',
      trigger: 'None',
      confidence: 94,
      status: 'pending',
      ownerAction: '',
      outcome: 'Pending Outcome Verification',
      invoices: ['INV-2026-044: ₹6.2L (92 days overdue)'],
      whyTrace: 'DSO increased from 72 to 81 days. Customer concentration risk is elevated. Improving collections is primary posture mandate.',
      cashDeficitWithout: '₹3.4L deficit',
      cashDeficitWith: 'Collections realized immediately'
    }
  ]);

  const [disagreementModalOpen, setDisagreementModalOpen] = useState(false);
  const [tempCaseId, setTempCaseId] = useState<string | null>(null);
  const [tempActionType, setTempActionType] = useState<'accept' | 'modify' | 'reject'>('accept');
  const [disagreementText, setDisagreementText] = useState('');
  const [selectedDisagreementReason, setSelectedDisagreementReason] = useState('Customer Relationship');

  const selectedCase = casesData.find(c => c.id === selectedCaseId) || casesData[0];

  const handleCaseAction = (id: string, action: 'accept' | 'modify' | 'reject') => {
    if (action === 'accept') {
      setCasesData(prev => prev.map(c => {
        if (c.id === id) {
          return { ...c, status: 'accepted' };
        }
        return c;
      }));
    } else {
      setTempCaseId(id);
      setTempActionType(action);
      setDisagreementText('');
      setDisagreementModalOpen(true);
    }
  };

  const handleDisagreementSubmit = () => {
    if (!tempCaseId) return;
    
    setCasesData(prev => prev.map(c => {
      if (c.id === tempCaseId) {
        return { 
          ...c, 
          status: tempActionType === 'modify' ? 'modified' : 'rejected' 
        };
      }
      return c;
    }));

    // Dynamic ODP adjustment to simulate learning
    setObservedDecisionsCount(prev => prev + 1);
    if (selectedDisagreementReason === 'Customer Relationship' || selectedDisagreementReason === 'Strategic Reason') {
      setOdpGrowth(prev => Math.min(100, prev + 4));
      setOdpRisk(prev => Math.min(100, prev + 3));
    } else if (selectedDisagreementReason === 'Risk Acceptable' || selectedDisagreementReason === 'Owner Intuition') {
      setOdpRisk(prev => Math.min(100, prev + 5));
      setOdpLiquidity(prev => Math.max(0, prev - 4));
    } else if (selectedDisagreementReason === 'Supplier Flexibility') {
      setOdpLiquidity(prev => Math.min(100, prev + 4));
    }

    setDisagreementModalOpen(false);
    setTempCaseId(null);
  };

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
            { id: 'decision-engine', label: 'Decision Engine (CGT-DBE)', icon: Sliders },
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

          {/* TAB 1.5: DECISION ENGINE (CGT-DBE & 30-DAY TRIAL) */}
          {activeTab === 'decision-engine' && (
            <motion.div
              key="decision-engine"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8 text-left text-neutral-900 dark:text-neutral-100"
            >
              {/* TRIAL STATE MACHINE STEPPER */}
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-neutral-200 dark:border-gray-800 shadow-sm">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
                  <div>
                    <h3 className="text-xl font-bold tracking-tight font-serif text-neutral-900 dark:text-white">30-Day Decision Proof Programme</h3>
                    <p className="text-xs text-neutral-500 mt-1">
                      Finpercent demonstrates decision relevance dynamically. Select a trial phase below to experience the system workflow.
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 bg-neutral-50 dark:bg-gray-800 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-gray-700 text-xs">
                    <span className="text-neutral-500 font-medium">Trial State:</span>
                    <span className="font-bold text-green-700 uppercase font-mono tracking-wider bg-[#EDF3EC] dark:bg-green-950/20 px-2 py-0.5 rounded">
                      {trialPhase}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
                  {[
                    { id: 'setup', label: '01. Setup', desc: 'Days 0-3: Data Linkage' },
                    { id: 'shadow', label: '02. Shadow', desc: 'Days 4-10: Background Log' },
                    { id: 'reveal', label: '03. Reveal', desc: 'Days 11-17: Reveal & Compare' },
                    { id: 'assisted', label: '04. Advise', desc: 'Days 18-24: Assisted Mode' },
                    { id: 'normal', label: '05. Act', desc: 'Days 25-30: Level 2 Prepare' },
                    { id: 'paid', label: '06. Report', desc: 'Day 30+: Evidence Report' }
                  ].map(step => (
                    <button
                      key={step.id}
                      onClick={() => setTrialPhase(step.id as any)}
                      className={`text-left p-3 rounded-lg border transition-all ${
                        trialPhase === step.id
                          ? 'bg-neutral-950 text-white border-neutral-950 dark:bg-neutral-50 dark:text-neutral-950 dark:border-neutral-50 shadow-md scale-102 font-semibold'
                          : 'bg-white dark:bg-gray-900 border-neutral-200 dark:border-gray-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50'
                      }`}
                    >
                      <div className="text-xs font-bold">{step.label}</div>
                      <div className="text-[10px] mt-1 opacity-90 leading-tight">{step.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* SETUP PHASE SCREEN */}
              {trialPhase === 'setup' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left columns: Onboarding flow & Checklist */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Visual reference schema */}
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-neutral-200 dark:border-gray-800">
                      <h4 className="text-sm font-bold text-neutral-850 dark:text-neutral-200 mb-4 uppercase tracking-wider font-mono">
                        Data Ingestion & Normalization Flowchart
                      </h4>
                      <p className="text-xs text-neutral-500 mb-6">
                        Systemic architecture mapping raw, fragmented SME data into the Canonical Business Data Model and the Decision Engine.
                      </p>
                      
                      {/* SVG Flowchart */}
                      <div className="w-full flex items-center justify-center p-4 bg-[#FBFBFA] dark:bg-gray-950 rounded-lg border border-[#EAEAEA] dark:border-gray-800">
                        <svg className="w-full max-w-2xl h-auto" viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="100%" height="100%" fill="none" />
                          <path d="M 0 30 L 600 30" stroke="#EAEAEA" strokeWidth="0.5" />
                          <path d="M 0 100 L 600 100" stroke="#EAEAEA" strokeWidth="0.5" />
                          <path d="M 0 170 L 600 170" stroke="#EAEAEA" strokeWidth="0.5" />
                          <path d="M 0 240 L 600 240" stroke="#EAEAEA" strokeWidth="0.5" />
                          
                          {/* Box 1: Sources */}
                          <rect x="15" y="60" width="115" height="180" rx="8" fill="#FFFFFF" stroke="#EAEAEA" strokeWidth="1.5" />
                          <text x="25" y="85" fill="#111111" fontSize="10" fontWeight="bold" fontFamily="monospace">DATA SOURCES</text>
                          <rect x="25" y="105" width="95" height="22" rx="4" fill="#EDF3EC" stroke="#346538" strokeWidth="0.5" />
                          <text x="33" y="119" fill="#346538" fontSize="9" fontWeight="bold" fontFamily="sans-serif">Tally ERP</text>
                          <rect x="25" y="137" width="95" height="22" rx="4" fill="#E1F3FE" stroke="#1F6C9F" strokeWidth="0.5" />
                          <text x="33" y="151" fill="#1F6C9F" fontSize="9" fontWeight="bold" fontFamily="sans-serif">Zoho Books</text>
                          <rect x="25" y="169" width="95" height="22" rx="4" fill="#FBF3DB" stroke="#956400" strokeWidth="0.5" />
                          <text x="33" y="183" fill="#956400" fontSize="9" fontWeight="bold" fontFamily="sans-serif">Bank Statements</text>
                          <rect x="25" y="201" width="95" height="22" rx="4" fill="#FDEBEC" stroke="#9F2F2D" strokeWidth="0.5" />
                          <text x="33" y="215" fill="#9F2F2D" fontSize="9" fontWeight="bold" fontFamily="sans-serif">GST Invoices</text>
                          
                          {/* Connecting lines */}
                          <path d="M 130 150 L 175 150" stroke="#111111" strokeWidth="1.5" strokeDasharray="3 3" />
                          <polygon points="175,150 167,146 167,154" fill="#111111" />
                          
                          {/* Box 2: Canonical Model */}
                          <rect x="180" y="85" width="130" height="130" rx="8" fill="#FFFFFF" stroke="#EAEAEA" strokeWidth="1.5" />
                          <text x="195" y="110" fill="#111111" fontSize="9" fontWeight="bold" fontFamily="monospace">CANONICAL MODEL</text>
                          <text x="195" y="132" fill="#787774" fontSize="8" fontFamily="monospace">entity_id: uuid</text>
                          <text x="195" y="147" fill="#787774" fontSize="8" fontFamily="monospace">source_ref: tally-22a</text>
                          <text x="195" y="162" fill="#787774" fontSize="8" fontFamily="monospace">amount: 2200000.0</text>
                          <text x="195" y="177" fill="#787774" fontSize="8" fontFamily="monospace">currency: INR</text>
                          <text x="195" y="192" fill="#787774" fontSize="8" fontFamily="monospace">confidence: 0.98</text>
                          
                          {/* Connecting lines */}
                          <path d="M 310 150 L 345 150" stroke="#111111" strokeWidth="1.5" />
                          <polygon points="345,150 337,146 337,154" fill="#111111" />

                          {/* Box 3: State Engine */}
                          <rect x="350" y="90" width="105" height="120" rx="8" fill="#FFFFFF" stroke="#EAEAEA" strokeWidth="1.5" />
                          <text x="360" y="112" fill="#111111" fontSize="9" fontWeight="bold" fontFamily="monospace">STATE ENGINE</text>
                          <rect x="358" y="127" width="89" height="18" rx="3" fill="#EDF3EC" />
                          <text x="364" y="139" fill="#346538" fontSize="8" fontWeight="bold">Liquidity: 65/100</text>
                          <rect x="358" y="150" width="89" height="18" rx="3" fill="#FDEBEC" />
                          <text x="364" y="162" fill="#9F2F2D" fontSize="8" fontWeight="bold">DSO: 81 Days (82)</text>
                          <rect x="358" y="173" width="89" height="18" rx="3" fill="#E1F3FE" />
                          <text x="364" y="185" fill="#1F6C9F" fontSize="8" fontWeight="bold">Debt Util: 78%</text>

                          {/* Connecting lines */}
                          <path d="M 455 150 L 495 150" stroke="#111111" strokeWidth="1.5" />
                          <polygon points="495,150 487,146 487,154" fill="#111111" />

                          {/* Box 4: CGT-DBE */}
                          <rect x="500" y="70" width="85" height="160" rx="8" fill="#111111" stroke="#111111" strokeWidth="1.5" />
                          <text x="512" y="95" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="monospace">CGT-DBE Engine</text>
                          <text x="512" y="115" fill="#787774" fontSize="8" fontFamily="monospace">Weights Trace</text>
                          <text x="512" y="130" fill="#EAEAEA" fontSize="8">Owner: Growth</text>
                          <text x="512" y="142" fill="#EAEAEA" fontSize="8">Safety constraints</text>
                          <rect x="506" y="165" width="73" height="22" rx="4" fill="#FDEBEC" />
                          <text x="512" y="179" fill="#9F2F2D" fontSize="9" fontWeight="bold">STABILIZE</text>
                          <text x="510" y="205" fill="#FFFFFF" fontSize="8" fontFamily="monospace">Confidence: 86%</text>
                        </svg>
                      </div>
                    </div>

                    {/* Objective Selection */}
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-neutral-200 dark:border-gray-800 text-left space-y-4">
                      <h4 className="font-bold text-neutral-900 dark:text-white">Trial Objective Selection</h4>
                      <p className="text-xs text-neutral-500">
                        Choose exactly three operational areas to configure and calibrate the CGT-DBE algorithms.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {[
                          { id: 'working_capital', label: 'Working Capital Gap', desc: 'Analyze raw stock & supplier terms' },
                          { id: 'receivables', label: 'Receivables DSO', desc: 'Identify payment default & age risk' },
                          { id: 'order_acceptance', label: 'Order Acceptance', desc: 'Assess margins vs cash lock-up on POs' },
                          { id: 'debt_reduction', label: 'Debt & OD reduction', desc: 'Rebalance high interest facilities' },
                          { id: 'capital_expenditure', label: 'CapEx Investment', desc: 'Simulate capacity expansion limits' }
                        ].map(prob => {
                          const isSelected = selectedObjectives.includes(prob.id);
                          return (
                            <button
                              key={prob.id}
                              onClick={() => {
                                if (isSelected) {
                                  setSelectedObjectives(prev => prev.filter(o => o !== prob.id));
                                } else {
                                  setSelectedObjectives(prev => [...prev, prob.id]);
                                }
                              }}
                              className={`p-4 rounded-lg border text-left transition-all ${
                                isSelected 
                                  ? 'bg-[#EDF3EC] border-[#346538]/30 text-[#346538] dark:bg-[#1a2d1e] dark:text-green-300'
                                  : 'bg-white dark:bg-gray-900 border-neutral-200 dark:border-gray-800 text-neutral-700 dark:text-neutral-300'
                              }`}
                            >
                              <div className="font-bold text-xs">{prob.label}</div>
                              <div className="text-[10px] text-neutral-500 mt-1.5 leading-tight">{prob.desc}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Connectors, Baseline confirmation & Gate 1 */}
                  <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-neutral-200 dark:border-gray-800 text-left space-y-4">
                      <h4 className="font-bold text-neutral-900 dark:text-white">Gate 1: Data Trust Verification</h4>
                      <p className="text-xs text-neutral-500">
                        Connect accounting linkages. Finpercent verifies coverage of required fields before launching shadow mode.
                      </p>
                      
                      <div className="space-y-2">
                        {[
                          { name: 'Tally Accounts Link', status: 'Connected', progress: '98% fields mapped', completed: true },
                          { name: 'Zoho Books Invoice Link', status: 'Connected', progress: '95% fields mapped', completed: true },
                          { name: 'Corporate Bank Account API', status: 'Syncing', progress: '88% fields mapped', completed: false },
                          { name: 'GST Filing Portal Access', status: 'Required', progress: 'Not Connected', completed: false }
                        ].map((conn, idx) => (
                          <div key={idx} className="p-3 bg-[#F7F6F3] dark:bg-gray-950 rounded-lg border border-neutral-200 dark:border-gray-800 flex justify-between items-center text-xs">
                            <div>
                              <div className="font-bold text-neutral-800 dark:text-neutral-200">{conn.name}</div>
                              <div className="text-[10px] text-neutral-550 mt-0.5">{conn.progress}</div>
                            </div>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded font-mono" style={
                              conn.completed 
                                ? { backgroundColor: '#EDF3EC', color: '#346538' } 
                                : { backgroundColor: '#FBF3DB', color: '#956400' }
                            }>
                              {conn.status}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="p-3 rounded-lg text-xs space-y-1.5" style={{ backgroundColor: '#E1F3FE', color: '#1F6C9F' }}>
                        <div className="font-bold flex justify-between">
                          <span>Data Trust Level:</span>
                          <span>97% Completeness</span>
                        </div>
                        <div className="w-full bg-white/40 h-1 rounded-full overflow-hidden">
                          <div className="bg-[#1F6C9F] h-full" style={{ width: '97%' }} />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-neutral-200 dark:border-gray-800 text-left space-y-4">
                      <h4 className="font-bold text-neutral-900 dark:text-white">Verify Business Baseline</h4>
                      <p className="text-xs text-neutral-500">
                        Confirm that the baseline financial representation matches your accounting records.
                      </p>
                      
                      <div className="p-3 bg-[#F7F6F3] dark:bg-gray-950 rounded-lg border border-neutral-200 dark:border-gray-800 text-xs space-y-2 font-mono">
                        <div className="flex justify-between border-b border-[#EAEAEA] dark:border-gray-800 pb-1.5">
                          <span>Baseline DSO:</span>
                          <span className="font-bold">72 Days</span>
                        </div>
                        <div className="flex justify-between border-b border-[#EAEAEA] dark:border-gray-800 pb-1.5">
                          <span>EBITDA Margin:</span>
                          <span className="font-bold">21%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Active Debt/OD:</span>
                          <span className="font-bold">₹41.5 Lakh</span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setIsBaselineVerified(true);
                          setIsDataTrustApproved(true);
                          setTrialPhase('shadow');
                        }}
                        className="w-full py-2 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 rounded text-xs font-bold transition-all text-center"
                      >
                        Verify Baseline & Start Shadow Mode
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* SHADOW REVEAL PHASE SCREEN */}
              {trialPhase === 'reveal' && (
                <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-neutral-200 dark:border-gray-800 text-left space-y-6">
                  <div>
                    <h4 className="text-lg font-bold text-neutral-900 dark:text-white font-serif">Shadow Mode Reveal Dashboard</h4>
                    <p className="text-xs text-neutral-500 mt-1">
                      Review how Finpercent's sealed background recommendations compare to your actual decisions and observed business outcomes.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      {
                        date: '04 Aug 2026',
                        event: '₹22 Lakh Sales Order (NeoPack)',
                        action: 'Accepted order normally without cash safeguards.',
                        rec: 'Require ≥15% advance payment (₹3.3L) to offset raw materials gap.',
                        outcome: 'Cash shortage occurred on Day 38; had to utilize high-interest OD facility.',
                        saving: '₹12,400 unnecessary interest paid (OD utilization)',
                        alert: 'loss'
                      },
                      {
                        date: '11 Aug 2026',
                        event: '₹8.4 Lakh procurement contract (PO-192)',
                        action: 'Issued PO for full quantity immediately.',
                        rec: 'Delay procurement by 14 days or negotiate 60 days supplier credit.',
                        outcome: 'Stock accumulated in Peenya warehouse; inventory turnover slowed by 1.8x.',
                        saving: '₹3 Lakh cash locked in slow-moving inventory for 42 days',
                        alert: 'warning'
                      },
                      {
                        date: '18 Aug 2026',
                        event: '₹6.2 Lakh Invoice Overdue (AlphaTech)',
                        action: 'Ignored payment delay to protect client relationship.',
                        rec: 'Prioritize collection immediately; send automated legal warning.',
                        outcome: 'Payment delayed to 92 days. Working capital DSO deteriorated.',
                        saving: '₹6.2 Lakh cash deficit remained unresolved during period',
                        alert: 'warning'
                      }
                    ].map((row, idx) => (
                      <div key={idx} className="p-5 bg-[#FBFBFA] dark:bg-gray-950 rounded-xl border border-[#EAEAEA] dark:border-gray-800 grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                        <div>
                          <div className="font-mono text-neutral-500">{row.date}</div>
                          <div className="font-bold text-neutral-900 dark:text-white mt-1">{row.event}</div>
                        </div>
                        <div>
                          <div className="text-neutral-500 uppercase tracking-wider text-[9px] font-bold font-mono">What Owner Did</div>
                          <p className="mt-1 text-neutral-800 dark:text-neutral-200">{row.action}</p>
                        </div>
                        <div>
                          <div className="text-neutral-550 uppercase tracking-wider text-[9px] font-bold font-mono">What Finpercent Sealed</div>
                          <p className="mt-1 text-[#346538] font-semibold">{row.rec}</p>
                        </div>
                        <div>
                          <div className="text-neutral-500 uppercase tracking-wider text-[9px] font-bold font-mono">Actual Outcome & Exposure</div>
                          <p className="mt-1 text-neutral-800 dark:text-neutral-200">{row.outcome}</p>
                          <div className="mt-2 p-2 rounded text-[10px] font-bold font-mono inline-block" style={
                            row.alert === 'loss' 
                              ? { backgroundColor: '#FDEBEC', color: '#9F2F2D' } 
                              : { backgroundColor: '#FBF3DB', color: '#956400' }
                          }>
                            {row.saving}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col md:flex-row justify-between items-center bg-[#EDF3EC] text-[#346538] dark:bg-[#1a2d1e] dark:text-green-300 p-5 rounded-xl border border-[#346538]/20 gap-4">
                    <div className="text-xs">
                      <span className="font-bold">Gate 2: Decision Relevance Confirmed.</span> Do you verify that background recommendations identify meaningful decision variables?
                    </div>
                    <button
                      onClick={() => setTrialPhase('assisted')}
                      className="px-5 py-2.5 bg-[#346538] text-white rounded text-xs font-bold hover:bg-[#284f2b] transition-all"
                    >
                      Verify Relevance & Enter Assisted Mode
                    </button>
                  </div>
                </div>
              )}

              {/* COCKPIT SCREEN: SHADOW, ASSISTED, AND NORMAL MODES */}
              {(trialPhase === 'shadow' || trialPhase === 'assisted' || trialPhase === 'normal') && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* Left Column: Owner Decision Profile (ODP) */}
                  <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-neutral-200 dark:border-gray-800 text-left space-y-4">
                      <h4 className="text-lg font-bold text-neutral-900 dark:text-white font-serif">Owner Decision Profile (ODP)</h4>
                      <p className="text-xs text-neutral-500">
                        Learned economic parameters optimized dynamically through decisions.
                      </p>

                      {/* ODP Sliders */}
                      <div className="space-y-3.5 pt-2">
                        {[
                          { label: 'Growth Appetite', value: odpGrowth, setValue: setOdpGrowth },
                          { label: 'Risk Tolerance', value: odpRisk, setValue: setOdpRisk },
                          { label: 'Liquidity Preference', value: odpLiquidity, setValue: setOdpLiquidity },
                          { label: 'Debt Tolerance', value: odpDebt, setValue: setOdpDebt },
                          { label: 'Control Preference', value: odpControl, setValue: setOdpControl },
                          { label: 'Time Horizon', value: odpHorizon, setValue: setOdpHorizon },
                          { label: 'Loss Sensitivity', value: odpLoss, setValue: setOdpLoss }
                        ].map((slider, idx) => (
                          <div key={idx} className="space-y-1">
                            <div className="flex justify-between text-xs font-bold text-neutral-700 dark:text-neutral-300">
                              <span>{slider.label}</span>
                              <span className="font-mono text-neutral-500">{slider.value}/100</span>
                            </div>
                            <input 
                              type="range" min="0" max="100" 
                              value={slider.value}
                              onChange={e => slider.setValue(parseInt(e.target.value))}
                              className="w-full accent-neutral-900 cursor-pointer" 
                            />
                          </div>
                        ))}
                      </div>

                      {/* Weights shift indicator */}
                      <div className="p-3 bg-[#F7F6F3] dark:bg-gray-950 rounded-lg border border-[#EAEAEA] dark:border-gray-800 text-xs space-y-1 font-mono">
                        <div className="flex justify-between font-bold text-neutral-800 dark:text-neutral-200">
                          <span>Profile Calculation Mode:</span>
                          <span>Learned Profile</span>
                        </div>
                        <div className="flex justify-between text-[10px] text-neutral-500">
                          <span>Observed Decisions: {observedDecisionsCount}</span>
                          <span>
                            {observedDecisionsCount < 5 ? '70% Declared / 30% Obs' : 
                             observedDecisionsCount <= 15 ? '50% Declared / 50% Obs' : '30% Declared / 70% Obs'}
                          </span>
                        </div>
                      </div>

                      {/* Scenario Onboarding Questions */}
                      <div className="space-y-4 pt-4 border-t border-[#EAEAEA] dark:border-gray-800">
                        <h5 className="text-xs font-bold uppercase tracking-wider font-mono text-neutral-800 dark:text-neutral-300">
                          Economic Scenario Calibration
                        </h5>
                        
                        <div className="space-y-3 bg-[#FBFBFA] dark:bg-gray-950 p-4 rounded-lg text-xs border border-[#EAEAEA] dark:border-gray-850">
                          <p className="font-bold text-neutral-800 dark:text-neutral-200 leading-tight">
                            Scenario 1: You have ₹30L available cash. How do you deploy it?
                          </p>
                          <div className="space-y-2 mt-2">
                            <label className="flex items-start space-x-2 cursor-pointer">
                              <input 
                                type="radio" 
                                name="sc1" 
                                checked={scenario1 === 'A'} 
                                onChange={() => {
                                  setScenario1('A');
                                  setOdpGrowth(55);
                                  setOdpLiquidity(92);
                                  setOdpRisk(40);
                                }}
                                className="accent-neutral-900 mt-0.5" 
                              />
                              <span>Option A: Retain ₹20L in cash reserve, invest ₹10L.</span>
                            </label>
                            <label className="flex items-start space-x-2 cursor-pointer">
                              <input 
                                type="radio" 
                                name="sc1" 
                                checked={scenario1 === 'B'} 
                                onChange={() => {
                                  setScenario1('B');
                                  setOdpGrowth(88);
                                  setOdpLiquidity(35);
                                  setOdpRisk(75);
                                }}
                                className="accent-neutral-900 mt-0.5" 
                              />
                              <span>Option B: Retain ₹5L in cash reserve, invest ₹25L.</span>
                            </label>
                          </div>
                        </div>

                        <div className="space-y-3 bg-[#FBFBFA] dark:bg-gray-950 p-4 rounded-lg text-xs border border-[#EAEAEA] dark:border-gray-850">
                          <p className="font-bold text-neutral-800 dark:text-neutral-200 leading-tight">
                            Scenario 2: A ₹1Cr B2B contract requires ₹35L short term borrowing.
                          </p>
                          <div className="space-y-2 mt-2">
                            <label className="flex items-start space-x-2 cursor-pointer">
                              <input 
                                type="radio" 
                                name="sc2" 
                                checked={scenario2 === 'A'} 
                                onChange={() => {
                                  setScenario2('A');
                                  setOdpGrowth(82);
                                  setOdpDebt(78);
                                  setOdpRisk(65);
                                }}
                                className="accent-neutral-900 mt-0.5" 
                              />
                              <span>Option A: Accept immediately, utilize overdraft facilities.</span>
                            </label>
                            <label className="flex items-start space-x-2 cursor-pointer">
                              <input 
                                type="radio" 
                                name="sc2" 
                                checked={scenario2 === 'B'} 
                                onChange={() => {
                                  setScenario2('B');
                                  setOdpGrowth(72);
                                  setOdpDebt(28);
                                  setOdpLiquidity(85);
                                }}
                                className="accent-neutral-900 mt-0.5" 
                              />
                              <span>Option B: Reject or negotiate 20% advance payment from buyer.</span>
                            </label>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Middle Column: Business State & CGT-DBEEngine */}
                  <div className="space-y-6">
                    {/* Business State Engine */}
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-neutral-200 dark:border-gray-800 text-left space-y-4">
                      <h4 className="text-lg font-bold text-neutral-900 dark:text-white font-serif">Business State variables</h4>
                      <p className="text-xs text-neutral-500">
                        Real-time normalised metrics computed from connected ERP schemas.
                      </p>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        {[
                          { name: 'Cash Runway', val: `${bizCashRunway} days`, press: '68/100', color: '#1F6C9F' },
                          { name: 'Receivables DSO', val: `${bizDso} days`, press: '82/100', color: '#9F2F2D' },
                          { name: 'Debt Utilization', val: `${bizDebtUtil}%`, press: '78/100', color: '#9F2F2D' },
                          { name: 'Gross Margin', val: `${bizMargin}%`, press: 'Healthy', color: '#346538' },
                          { name: 'Supplier Credit', val: `${bizSupplierCredit} days`, press: 'Moderate', color: '#956400' }
                        ].map((stat, idx) => (
                          <div key={idx} className="p-3 bg-[#FBFBFA] dark:bg-gray-950 rounded-lg border border-[#EAEAEA] dark:border-gray-850">
                            <span className="text-[10px] text-neutral-500 block uppercase font-mono">{stat.name}</span>
                            <div className="font-bold text-sm text-neutral-850 dark:text-neutral-200 mt-1">{stat.val}</div>
                            <div className="mt-1.5 flex justify-between items-center">
                              <span className="text-[9px] text-neutral-550">Normalized Pressure:</span>
                              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                                {stat.press}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Environmental State variables */}
                      <div className="pt-4 border-t border-[#EAEAEA] dark:border-gray-800 space-y-3">
                        <h5 className="text-xs font-bold uppercase tracking-wider font-mono text-neutral-800 dark:text-neutral-300">
                          Environmental context
                        </h5>
                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <span className="text-[9px] text-neutral-500 block uppercase font-mono">Buyer Risk</span>
                            <select 
                              value={envCreditRisk} 
                              onChange={e => setEnvCreditRisk(e.target.value)}
                              className="w-full bg-[#F7F6F3] dark:bg-gray-950 rounded p-1 text-[10px] font-bold mt-1"
                            >
                              <option value="stable">Stable</option>
                              <option value="deteriorating">Deteriorating</option>
                            </select>
                          </div>
                          <div>
                            <span className="text-[9px] text-neutral-500 block uppercase font-mono">Interest Rates</span>
                            <select 
                              value={envInterestRate} 
                              onChange={e => setEnvInterestRate(e.target.value)}
                              className="w-full bg-[#F7F6F3] dark:bg-gray-950 rounded p-1 text-[10px] font-bold mt-1"
                            >
                              <option value="stable">Stable</option>
                              <option value="rising">Rising</option>
                            </select>
                          </div>
                          <div>
                            <span className="text-[9px] text-neutral-500 block uppercase font-mono">Market Demand</span>
                            <select 
                              value={envMarketDemand} 
                              onChange={e => setEnvMarketDemand(e.target.value)}
                              className="w-full bg-[#F7F6F3] dark:bg-gray-950 rounded p-1 text-[10px] font-bold mt-1"
                            >
                              <option value="stable">Stable</option>
                              <option value="slowing">Slowing</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* CGT-DBE Strategic Policy Engine */}
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-neutral-200 dark:border-gray-800 text-left space-y-4">
                      <h4 className="text-lg font-bold text-neutral-900 dark:text-white font-serif">CGT-DBE Policy Engine</h4>
                      <p className="text-xs text-neutral-500">
                        Weights alignment: $W_i^* = W_i \times S_i \times O_i \times E_i$.
                      </p>

                      {/* Mathematical Weight Calculation visualization */}
                      <div className="p-3 bg-[#FBFBFA] dark:bg-gray-950 rounded-lg border border-[#EAEAEA] dark:border-gray-850 space-y-2 text-[10px] font-mono">
                        <div className="flex justify-between font-bold text-neutral-850 dark:text-neutral-200">
                          <span>Dimension Weighting:</span>
                          <span>Formula Trace</span>
                        </div>
                        <div className="flex justify-between text-neutral-500">
                          <span>Liquidity weight:</span>
                          <span>1.00 &times; 1.20 (Stage) &times; {((odpLiquidity)/100).toFixed(2)} (Owner) &times; {(envInterestRate==='rising'? 1.15:1.0).toFixed(2)} (Env) = {(1.2 * (odpLiquidity/100) * (envInterestRate==='rising'?1.15:1.0)).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-neutral-500">
                          <span>Growth weight:</span>
                          <span>1.00 &times; 1.10 (Stage) &times; {((odpGrowth)/100).toFixed(2)} (Owner) &times; 1.00 = {(1.1 * (odpGrowth/100)).toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Raw Posture output */}
                      <div className="p-3 bg-[#F7F6F3] dark:bg-gray-950 rounded-lg border border-neutral-200 dark:border-gray-800 text-xs space-y-2">
                        <div className="flex justify-between">
                          <span className="text-neutral-550">Positive Force Score:</span>
                          <span className="font-bold font-mono text-[#346538] flex items-center">+{positiveForceScore}</span>
                        </div>
                        <div className="flex justify-between border-b border-[#EAEAEA] dark:border-gray-800 pb-1.5">
                          <span className="text-neutral-550">Negative Pressure Score:</span>
                          <span className="font-bold font-mono text-[#9F2F2D] flex items-center">-{negativePressureScore}</span>
                        </div>
                        <div className="flex justify-between font-bold text-neutral-800 dark:text-neutral-200">
                          <span>Calculated Raw Score:</span>
                          <span className="font-mono">{(rawScore >= 0 ? '+' : '') + rawScore}</span>
                        </div>
                        <div className="flex justify-between text-[10px] text-neutral-550 italic">
                          <span>Calculated Raw Posture:</span>
                          <span className="font-bold">{rawPosture}</span>
                        </div>
                      </div>

                      {/* Hard Safety Constraints Downgrade Check */}
                      <div className="p-3.5 rounded-lg border text-xs space-y-2 text-left" style={
                        triggerDowngraded 
                          ? { backgroundColor: '#FDEBEC', borderColor: '#9F2F2D30', color: '#9F2F2D' }
                          : { backgroundColor: '#EDF3EC', borderColor: '#34653830', color: '#346538' }
                      }>
                        <div className="font-bold uppercase tracking-wider font-mono text-[10px]">
                          {triggerDowngraded ? '⚠️ Safety Constraints Activated' : '✓ Safety Constraints Clear'}
                        </div>
                        <p className="text-[10px] opacity-90 leading-relaxed">
                          {triggerDowngraded 
                            ? `Owner growth preference (${odpGrowth}) capped. Triggers active: ${activeTriggers.join(', ')}. Posture downgraded to STABILIZE.`
                            : 'Historical debt limits & receivable DSO ratios remain within safe bounds. Capping triggers idle.'}
                        </p>
                      </div>

                      {/* Posture Result */}
                      <div className="p-4 bg-neutral-900 text-white dark:bg-[#F7F6F3] dark:text-[#111111] rounded-xl flex justify-between items-center">
                        <div>
                          <div className="text-[10px] uppercase font-mono tracking-wider opacity-75">CGT-DBE Policy Posture</div>
                          <div className="text-2xl font-bold tracking-tight font-serif mt-1">{calculatedPosture}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] uppercase font-mono tracking-wider opacity-75">Reconciliation Score</div>
                          <div className="text-2xl font-bold font-mono mt-1">{(rawScore >= 0 ? '+' : '') + rawScore}</div>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Right Column: Decision Inbox & Action recommendation */}
                  <div className="space-y-6">
                    {/* Active Cases Inbox */}
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-neutral-200 dark:border-gray-800 text-left space-y-4">
                      <h4 className="text-lg font-bold text-neutral-900 dark:text-white font-serif">Decisions Inbox</h4>
                      <p className="text-xs text-neutral-500">
                        Operational events requiring strategic alignment.
                      </p>

                      {trialPhase === 'shadow' && (
                        <div className="p-3 rounded-lg text-xs text-[#956400] border border-[#FBF3DB]" style={{ backgroundColor: '#FBF3DB' }}>
                          <span className="font-bold">Pure Shadow Mode:</span> Recommendations are sealed in background and hidden from normal inbox.
                        </div>
                      )}

                      <div className="space-y-2">
                        {casesData.map(c => {
                          const isSelected = selectedCaseId === c.id;
                          return (
                            <button
                              key={c.id}
                              onClick={() => setSelectedCaseId(c.id)}
                              className={`w-full p-4 rounded-lg border text-left transition-all ${
                                isSelected 
                                  ? 'bg-[#111111] text-white border-[#111111] dark:bg-white dark:text-[#111111] dark:border-white shadow-md' 
                                  : 'bg-[#FBFBFA] dark:bg-gray-950 border-[#EAEAEA] dark:border-gray-800 text-neutral-700 dark:text-neutral-350 hover:bg-[#F7F6F3]'
                              }`}
                            >
                              <div className="flex justify-between items-center">
                                <span className="font-bold text-xs">{c.title}</span>
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded" style={
                                  c.status === 'accepted' ? { backgroundColor: '#EDF3EC', color: '#346538' } :
                                  c.status === 'modified' ? { backgroundColor: '#E1F3FE', color: '#1F6C9F' } :
                                  c.status === 'rejected' ? { backgroundColor: '#FDEBEC', color: '#9F2F2D' } :
                                  { backgroundColor: '#F7F6F3', color: '#787774' }
                                }>
                                  {c.status}
                                </span>
                              </div>
                              <div className={`text-[10px] mt-1.5 truncate ${isSelected ? 'opacity-80' : 'text-neutral-500'}`}>
                                Recommends: {c.recAction}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Decision Receipt Detail Panel */}
                    {selectedCaseId && (
                      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-neutral-200 dark:border-gray-800 text-left space-y-4">
                        <div className="border-b border-[#EAEAEA] dark:border-gray-800 pb-3 flex justify-between items-center">
                          <div>
                            <span className="text-[9px] uppercase font-mono tracking-wider text-neutral-500 block">Finpercent Decision Receipt</span>
                            <h4 className="font-bold text-xs text-neutral-850 dark:text-neutral-200 mt-0.5">{selectedCase.title}</h4>
                          </div>
                          <div className="text-right">
                            <span className="text-[8px] font-mono text-neutral-400 block">SHA-256 Seal Lock</span>
                            <span className="text-[9px] font-mono font-bold text-neutral-500">8a4c1f...</span>
                          </div>
                        </div>

                        {/* 5-layer proofs */}
                        <div className="space-y-3">
                          {/* 1. Data Proof */}
                          <div className="space-y-1">
                            <span className="text-[10px] uppercase font-mono text-neutral-500 block">36.1 Data Proof</span>
                            <div className="p-2.5 bg-[#FBFBFA] dark:bg-gray-950 border border-[#EAEAEA] dark:border-gray-850 rounded text-[11px] space-y-1 font-mono text-neutral-700 dark:text-neutral-300">
                              <div className="font-bold text-[10px] text-neutral-550 border-b border-[#EAEAEA] dark:border-gray-800 pb-1">Historical ledger entries:</div>
                              {selectedCase.invoices.map((inv, idx) => (
                                <div key={idx} className="flex justify-between">
                                  <span>{inv.split(':')[0]}</span>
                                  <span className="font-bold">{inv.split(':')[1]}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* 2. Logic Proof */}
                          <div className="space-y-1">
                            <span className="text-[10px] uppercase font-mono text-neutral-500 block">36.2 Logic Proof</span>
                            <p className="text-[11px] text-neutral-700 dark:text-neutral-300 leading-relaxed bg-[#FBFBFA] dark:bg-gray-950 p-2.5 rounded border border-[#EAEAEA] dark:border-gray-850">
                              {selectedCase.whyTrace}
                            </p>
                          </div>

                          {/* 3. Scenario Proof */}
                          <div className="space-y-1">
                            <span className="text-[10px] uppercase font-mono text-neutral-500 block">36.3 Scenario Proof</span>
                            <div className="p-2.5 bg-[#FBFBFA] dark:bg-gray-950 border border-[#EAEAEA] dark:border-gray-850 rounded text-[11px] space-y-2">
                              <div className="grid grid-cols-2 gap-2 text-center text-[10px] font-bold border-b border-[#EAEAEA] dark:border-gray-800 pb-1 text-neutral-550">
                                <div>Option A (Normal)</div>
                                <div>Option B (With Adv)</div>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-center font-mono font-bold text-neutral-700 dark:text-neutral-300">
                                <div className="text-[#9F2F2D]">{selectedCase.cashDeficitWithout}</div>
                                <div className="text-[#346538]">{selectedCase.cashDeficitWith}</div>
                              </div>
                            </div>
                          </div>

                          {/* 4. Outcome Proof */}
                          <div className="space-y-1">
                            <span className="text-[10px] uppercase font-mono text-neutral-500 block">36.4 Outcome Proof</span>
                            <div className="p-2 bg-[#FBFBFA] dark:bg-gray-950 rounded border border-[#EAEAEA] dark:border-gray-850 flex justify-between text-[11px] font-mono">
                              <span className="text-neutral-500">Seal verification:</span>
                              <span className="font-bold text-[#1F6C9F]">{selectedCase.outcome}</span>
                            </div>
                          </div>

                          {/* 5. Benchmark Proof */}
                          <div className="space-y-1">
                            <span className="text-[10px] uppercase font-mono text-neutral-500 block">36.5 Benchmark Proof</span>
                            <div className="p-2.5 bg-[#FBFBFA] dark:bg-gray-950 border border-[#EAEAEA] dark:border-gray-850 rounded text-[11px] leading-relaxed text-neutral-700 dark:text-neutral-300">
                              Calculated DSO ({bizDso} days) exceeds average cohort baseline of similar Peenya B2B manufacturing firms (55 days) by <strong>+26 days</strong>.
                            </div>
                          </div>
                        </div>

                        {/* Execution Permissions Control */}
                        <div className="pt-4 border-t border-[#EAEAEA] dark:border-gray-800 space-y-2">
                          <span className="text-[10px] uppercase font-mono text-neutral-500 block">38. Execution Permissions Level</span>
                          <div className="grid grid-cols-4 gap-1 text-[10px] font-bold text-center">
                            {[
                              { id: 0, label: 'L0 Shadow' },
                              { id: 1, label: 'L1 Recom' },
                              { id: 2, label: 'L2 Prep' },
                              { id: 3, label: 'L3 Auto' }
                            ].map(lvl => (
                              <button
                                key={lvl.id}
                                onClick={() => setPermissionLevel(lvl.id as any)}
                                className={`py-1.5 rounded transition ${
                                  permissionLevel === lvl.id 
                                    ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900' 
                                    : 'bg-[#F7F6F3] text-neutral-600 dark:bg-gray-950 dark:text-gray-400 border border-[#EAEAEA] dark:border-gray-800'
                                }`}
                              >
                                {lvl.label}
                              </button>
                            ))}
                          </div>
                          <p className="text-[9px] text-neutral-500 leading-tight">
                            {permissionLevel === 0 ? 'Watching and sealing decisions in background. Recommendations locked.' :
                             permissionLevel === 1 ? 'Finpercent recommends, owner executes manually.' :
                             permissionLevel === 2 ? 'Finpercent prepares drafts/collection letters, owner signs off.' :
                             'Policy parameters bound. Auto execution enabled on low risk transactions.'}
                          </p>
                        </div>

                        {/* Action buttons (Disabled in Shadow Mode) */}
                        {trialPhase !== 'shadow' && selectedCase.status === 'pending' && (
                          <div className="flex gap-2 pt-2">
                            <button
                              onClick={() => handleCaseAction(selectedCase.id, 'accept')}
                              className="flex-1 py-2 bg-[#346538] text-white hover:bg-[#284f2b] rounded text-xs font-bold transition-all text-center"
                            >
                              Accept Rec
                            </button>
                            <button
                              onClick={() => handleCaseAction(selectedCase.id, 'modify')}
                              className="py-2 px-3 bg-[#E1F3FE] text-[#1F6C9F] hover:bg-[#cbeaff] rounded text-xs font-bold transition-all text-center"
                            >
                              Modify
                            </button>
                            <button
                              onClick={() => handleCaseAction(selectedCase.id, 'reject')}
                              className="py-2 px-3 bg-[#FDEBEC] text-[#9F2F2D] hover:bg-[#fcdede] rounded text-xs font-bold transition-all text-center"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                </div>
              )}

              {/* Day-30 Evidence Report */}
              {trialPhase === 'paid' && (
                <div className="bg-white dark:bg-gray-900 p-8 rounded-xl border border-neutral-200 dark:border-gray-800 text-left max-w-4xl mx-auto space-y-6 shadow-md">
                  <div className="border-b border-[#EAEAEA] dark:border-gray-800 pb-4 text-center">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-[#1F6C9F]">54. Trial Evidence Report</span>
                    <h3 className="text-2xl font-bold font-serif text-neutral-900 dark:text-white mt-1">Finpercent 30-Day Decision Report</h3>
                    <p className="text-xs text-neutral-500 mt-1">Compiled audit trace for Peenya Smart Logistics LLC</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono text-center">
                    <div className="p-3 bg-[#F7F6F3] dark:bg-gray-950 rounded border border-[#EAEAEA] dark:border-gray-850">
                      <div className="text-neutral-500 uppercase tracking-wider text-[8px] font-bold">Events Analyzed</div>
                      <div className="text-xl font-bold text-neutral-900 dark:text-white mt-1">73</div>
                    </div>
                    <div className="p-3 bg-[#F7F6F3] dark:bg-gray-950 rounded border border-[#EAEAEA] dark:border-gray-850">
                      <div className="text-neutral-500 uppercase tracking-wider text-[8px] font-bold">Decisions Detected</div>
                      <div className="text-xl font-bold text-neutral-900 dark:text-white mt-1">21</div>
                    </div>
                    <div className="p-3 bg-[#F7F6F3] dark:bg-gray-950 rounded border border-[#EAEAEA] dark:border-gray-850">
                      <div className="text-neutral-500 uppercase tracking-wider text-[8px] font-bold">Shadow Recs</div>
                      <div className="text-xl font-bold text-neutral-900 dark:text-white mt-1">11</div>
                    </div>
                    <div className="p-3 bg-[#F7F6F3] dark:bg-gray-950 rounded border border-[#EAEAEA] dark:border-gray-850">
                      <div className="text-neutral-500 uppercase tracking-wider text-[8px] font-bold">Live Recs (Assisted)</div>
                      <div className="text-xl font-bold text-[#346538] mt-1">10</div>
                    </div>
                  </div>

                  {/* Summary of conversion parameters */}
                  <div className="space-y-4 pt-2">
                    <h4 className="font-bold text-sm text-neutral-850 dark:text-neutral-200 uppercase tracking-wider font-mono">
                      Decisions Outcome Attribution
                    </h4>
                    <div className="border border-[#EAEAEA] dark:border-gray-800 rounded-lg overflow-hidden text-xs">
                      <div className="grid grid-cols-4 gap-2 p-3 bg-[#FBFBFA] dark:bg-gray-950 border-b border-[#EAEAEA] dark:border-gray-800 font-bold text-neutral-550 uppercase tracking-wider text-[10px]">
                        <div>Decisions Type</div>
                        <div>Finpercent Rec</div>
                        <div>Owner Action</div>
                        <div>Observed Cash Result</div>
                      </div>
                      {[
                        { type: 'Working Capital', rec: 'Delay PO by 14 days', action: 'Accepted', result: '₹3L inventory cash saved' },
                        { type: 'Receivables Collection', rec: 'Send overdue warning', action: 'Modified', result: '₹6.2L collected in 7 days' },
                        { type: 'Order Acceptance', rec: 'Require 15% advance', action: 'Accepted', result: 'Raw materials gap covered' }
                      ].map((row, idx) => (
                        <div key={idx} className="grid grid-cols-4 gap-2 p-3 border-b border-[#EAEAEA] dark:border-gray-850 text-neutral-700 dark:text-neutral-300">
                          <div className="font-bold">{row.type}</div>
                          <div>{row.rec}</div>
                          <div>{row.action}</div>
                          <div className="font-bold text-[#346538]">{row.result}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Financial exposure identified */}
                  <div className="p-4 bg-[#EDF3EC] text-[#346538] dark:bg-[#1a2d1e] dark:text-green-300 rounded-xl border border-[#346538]/20 text-xs">
                    <div className="font-bold uppercase tracking-wider font-mono text-[10px]">Economic Value Summary</div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-3">
                      <div>
                        <span className="text-[10px] opacity-75">Cash Exposure Identified</span>
                        <div className="text-lg font-bold mt-0.5">₹8.2 Lakh</div>
                      </div>
                      <div>
                        <span className="text-[10px] opacity-75">Collections Realized</span>
                        <div className="text-lg font-bold mt-0.5">₹12.4 Lakh</div>
                      </div>
                      <div>
                        <span className="text-[10px] opacity-75">Inventory Savings</span>
                        <div className="text-lg font-bold mt-0.5">₹3.1 Lakh</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2 text-xs">
                    <h5 className="font-bold text-neutral-850 dark:text-neutral-200">Owner-Profile Learned Outcomes</h5>
                    <p className="text-neutral-600 dark:text-gray-400 leading-relaxed">
                      During the 30-day proof programme, Finpercent observed {observedDecisionsCount} overrides. Risk preference model adjusted debt tolerance downward by 8% and control preference upward by 5%, aligning future CGT-DBE policies more closely with your custom B2B relationship preferences.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-[#EAEAEA] dark:border-gray-800">
                    <button
                      onClick={() => setConsoleLogs(prev => [...prev, 'ℹ️ Downloading signed evidence report PDF...'])}
                      className="px-4 py-2 border border-neutral-200 dark:border-gray-700 hover:bg-[#F7F6F3] rounded text-xs font-bold transition-all text-center"
                    >
                      Export PDF Evidence Report
                    </button>
                    <button
                      onClick={() => {
                        setTrialPhase('assisted');
                        setConsoleLogs(prev => [...prev, '⚡ Conversion request received. Unlocking Level 3 auto-execute options under corporate policy directives.']);
                        alert('Program Upgrade Complete. Level 3 (Auto-Execute Within Policy) permissions are unlocked.');
                      }}
                      className="px-6 py-2 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 hover:bg-neutral-800 rounded text-xs font-bold transition-all text-center"
                    >
                      Complete Trial & Upgrade to Paid (Unlock Level 3 Auto)
                    </button>
                  </div>
                </div>
              )}

              {/* DISAGREEMENT CAPTURE MODAL */}
              {disagreementModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                  <div className="bg-white dark:bg-gray-900 max-w-md w-full rounded-xl overflow-hidden border border-neutral-200 dark:border-gray-850 shadow-2xl p-6 text-left space-y-4">
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white font-serif">Capture Override Context</h3>
                    <p className="text-xs text-neutral-500 leading-relaxed">
                      Finpercent treats disagreements as profile alignment data, not failures. Capturing this context recalibrates the Owner Profile.
                    </p>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[10px] font-bold text-neutral-500 uppercase mb-1">Override Reason</label>
                        <select 
                          value={selectedDisagreementReason}
                          onChange={e => setSelectedDisagreementReason(e.target.value)}
                          className="w-full bg-[#F7F6F3] dark:bg-gray-950 border border-[#EAEAEA] dark:border-gray-800 rounded p-2 text-xs font-bold"
                        >
                          <option>Customer Relationship</option>
                          <option>Information Missing</option>
                          <option>Supplier Flexibility</option>
                          <option>Risk Acceptable</option>
                          <option>Strategic Reason</option>
                          <option>Owner Intuition</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-neutral-500 uppercase mb-1">Additional Notes</label>
                        <textarea
                          rows={3}
                          value={disagreementText}
                          onChange={e => setDisagreementText(e.target.value)}
                          placeholder="Why was this recommendation modified/rejected? e.g., Suresh confirmed credit extension..."
                          className="w-full bg-white dark:bg-gray-950 border border-[#EAEAEA] dark:border-gray-800 rounded p-2 text-xs"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 justify-end pt-2">
                      <button
                        onClick={() => setDisagreementModalOpen(false)}
                        className="py-1.5 px-4 rounded border border-neutral-200 dark:border-gray-700 text-xs font-bold hover:bg-[#F7F6F3] transition"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleDisagreementSubmit}
                        className="py-1.5 px-4 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 hover:bg-neutral-800 rounded text-xs font-bold transition"
                      >
                        Submit Override
                      </button>
                    </div>
                  </div>
                </div>
              )}
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
