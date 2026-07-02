import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Award, Calendar, CheckSquare, Clock, ShieldCheck, 
  HelpCircle, ChevronRight, CheckCircle2, ArrowRight, Sparkles,
  Upload, Check, Play, AlertCircle, FileText, Database, ShieldAlert,
  Send, RefreshCw, Layers, Sliders, Briefcase, FileSpreadsheet, Lock,
  FileUp, Link as LinkIcon, Compass, Volume2
} from 'lucide-react';

import { useReadiness } from '../contexts/ReadinessContext';

export default function ActionPlanPage() {
  const navigate = useNavigate();
  const { actions, resolveAction, uploadDocument } = useReadiness();
  const completedTasks = actions.filter(a => a.completion_status === 'Completed').map(a => a.action_id);
  const [selectedTaskId, setSelectedTaskId] = useState<string>('i-1');

  // Interactive Simulator States
  const [udyamInput, setUdyamInput] = useState('');
  const [isVerifyingUdyam, setIsVerifyingUdyam] = useState(false);

  const [gstFileName, setGstFileName] = useState('');
  const [isParsingGst, setIsParsingGst] = useState(false);
  const [gstData, setGstData] = useState<{ turnover: string; taxPaid: string } | null>(null);

  const [reconciliationReason, setReconciliationReason] = useState('');
  const [isReconciling, setIsReconciling] = useState(false);

  const [dsoReminderTone, setDsoReminderTone] = useState('Professional');
  const [isSavingDso, setIsSavingDso] = useState(false);

  const [peenyaNewBuyer, setPeenyaNewBuyer] = useState('');
  const [peenyaBuyers, setPeenyaBuyers] = useState<{ name: string; share: number }[]>([
    { name: 'Peenya Auto Parts Ltd', share: 42 },
    { name: 'Bailappa & Sons CNC', share: 28 },
    { name: 'Kirloskar Distributors', share: 18 },
    { name: 'Others', share: 12 }
  ]);
  const [peenyaSuccess, setPeenyaSuccess] = useState(false);

  const [dossierLogs, setDossierLogs] = useState<string[]>([]);
  const [isCompilingDossier, setIsCompilingDossier] = useState(false);

  const [taxSplit, setTaxSplit] = useState(15);
  const [isSavingTax, setIsSavingTax] = useState(false);

  // Copilot Autopilot Console States
  const [agentLogs, setAgentLogs] = useState<string[]>([]);
  const [isAgentRunning, setIsAgentRunning] = useState(false);

  const getCategory = (id: string) => {
    if (id.startsWith('i-')) return 'immediate';
    if (id === 'd-1' || id === 'd-2' || id === 'd-3') return 'day30';
    if (id === 'd-4' || id === 'd-5') return 'day60';
    return 'day90';
  };

  const activeTask = actions.map(a => ({ ...a, id: a.action_id, category: getCategory(a.action_id) })).find(t => t.id === selectedTaskId) || {
    id: 'i-1',
    action_id: 'i-1',
    text: 'Renew expired Udyam MSME Registration Certificate',
    priority: 'High',
    due_date: 'Immediate',
    completion_status: 'Pending',
    category: 'immediate',
    actionType: 'udyam',
    overview: '',
    steps: [],
    preparation: [],
    actionLabel: ''
  };

  const toggleTask = (id: string) => {
    if (id === 'i-2') {
      uploadDocument('gst_return', 'GSTR3B_MAY_2026_FILED.pdf');
    } else {
      resolveAction(id);
    }
  };

  const markTaskCompleted = (id: string) => {
    if (id === 'i-2') {
      uploadDocument('gst_return', 'GSTR3B_MAY_2026_FILED.pdf');
    } else {
      resolveAction(id);
    }
  };

  // 1. Udyam Verification
  const handleVerifyUdyam = () => {
    if (!udyamInput.trim()) return;
    setIsVerifyingUdyam(true);
    setTimeout(() => {
      setIsVerifyingUdyam(false);
      markTaskCompleted('i-1');
      setUdyamInput('');
    }, 1500);
  };

  // 2. GST Return Parsing
  const handleSimulateGstUpload = () => {
    setIsParsingGst(true);
    setGstFileName('GSTR3B_MAY_2026_FILED.pdf');
    setTimeout(() => {
      setIsParsingGst(false);
      setGstData({
        turnover: '₹48,50,000',
        taxPaid: '₹8,73,000'
      });
      markTaskCompleted('i-2');
    }, 2000);
  };

  // 3. Confirm Ledger Balance
  const handleConfirmLedger = () => {
    setIsReconciling(true);
    setTimeout(() => {
      setIsReconciling(false);
      markTaskCompleted('d-2');
      setReconciliationReason('');
    }, 1200);
  };

  // 4. Save DSO parameters
  const handleSaveDso = () => {
    setIsSavingDso(true);
    setTimeout(() => {
      setIsSavingDso(false);
      markTaskCompleted('d-4');
    }, 1000);
  };

  // 5. Peenya diversification
  const handleAddBuyer = () => {
    if (!peenyaNewBuyer.trim()) return;
    const newShare = 15;
    const updatedBuyers = peenyaBuyers.map(b => {
      if (b.name === 'Peenya Auto Parts Ltd') return { ...b, share: b.share - 10 };
      if (b.name === 'Others') return { ...b, share: b.share - 5 };
      return b;
    });
    setPeenyaBuyers([
      ...updatedBuyers,
      { name: peenyaNewBuyer, share: newShare }
    ]);
    setPeenyaNewBuyer('');
    setPeenyaSuccess(true);
    markTaskCompleted('d-5');
  };

  // 6. Compile Dossier
  const handleCompileDossier = () => {
    setIsCompilingDossier(true);
    setDossierLogs([]);
    const logs = [
      '🔍 Accessing promoter profile in Digilocker...',
      '📄 Retrieving certified GSTR-3B filings...',
      '📑 Compiling tax schedules and assets ledger...',
      '🔒 Signing document package via promoter DSC credentials...',
      '✅ Secured dossier compiled: FP-LEND-DOSSIER-2026.pdf'
    ];
    logs.forEach((log, index) => {
      setTimeout(() => {
        setDossierLogs(prev => [...prev, log]);
        if (index === logs.length - 1) {
          setIsCompilingDossier(false);
          markTaskCompleted('d-6');
        }
      }, (index + 1) * 800);
    });
  };

  // 7. Save Tax Allocation Split
  const handleSaveTaxSplit = () => {
    setIsSavingTax(true);
    setTimeout(() => {
      setIsSavingTax(false);
      markTaskCompleted('d-7');
    }, 1000);
  };

  // AI Autopilot Automation script
  const triggerAutopilot = () => {
    if (isAgentRunning) return;
    setIsAgentRunning(true);
    setAgentLogs([]);
    const steps = [
      `[AI STEWARD] Connecting to external database registry...`,
      `[AI STEWARD] Retrieving parameters and documents for task: ${activeTask.text}...`,
      `[AI STEWARD] Verifying certificate signatures & SHA-256 hashes...`,
      `[AI STEWARD] Applying straight-through configuration logic...`,
      `[AI STEWARD] SUCCESS: Mapped corporate improvement checklist record as COMPLETED.`
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setAgentLogs(prev => [...prev, step]);
        if (index === steps.length - 1) {
          setIsAgentRunning(false);
          markTaskCompleted(activeTask.id);
        }
      }, (index + 1) * 600);
    });
  };

  // Auto-switch default values if task changes
  useEffect(() => {
    setAgentLogs([]);
  }, [selectedTaskId]);

  return (
    <div className="min-h-screen bg-accent-100 text-primary-950 p-6 pb-20 dark:bg-accent-100 dark:text-primary-50">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Navigation & Header */}
        <div className="flex justify-between items-center border-b border-accent-200 pb-6">
          <button
            onClick={() => navigate('/overview')}
            className="px-4 py-2 text-xs font-semibold rounded border border-accent-200 bg-accent-50 text-neutral-800 hover:bg-neutral-250/50 transition-all flex items-center"
          >
            <ChevronLeft className="w-3.5 h-3.5 mr-1" />
            <span>Back to Command Center</span>
          </button>
          
          <button
            onClick={() => navigate('/credit/readiness-report')}
            className="px-4 py-2 text-xs font-semibold bg-primary-950 text-white dark:bg-primary-50 dark:text-black hover:bg-neutral-850 dark:hover:bg-neutral-200 rounded transition-all flex items-center space-x-1.5"
          >
            <span>View Credit Readiness</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="text-left space-y-2">
          <h1 className="text-4xl font-serif font-normal tracking-tight">MSME Action & Improvement Plan</h1>
          <p className="text-sm text-primary-500 max-w-2xl">
            Your structured roadmap to improve business scorecards, clear documentation gaps, and achieve full bank funding readiness.
          </p>
        </div>

        {/* 2-COLUMN BENTO LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Roadmap task lists */}
          <div className="lg:col-span-2 space-y-6 text-left">
            {[
              { title: 'Immediate Core Corrections', category: 'immediate', color: 'border-l-4 border-[#9F2F2D]', badge: 'bg-[#FDEBEC] text-[#9F2F2D] border-[#9F2F2D]/20' },
              { title: '30-Day Stabilization Actions', category: 'day30', color: 'border-l-4 border-[#956400]', badge: 'bg-[#FBF3DB] text-[#956400] border-[#956400]/20' },
              { title: '60-Day Optimization Goals', category: 'day60', color: 'border-l-4 border-[#1F6C9F]', badge: 'bg-[#E1F3FE] text-[#1F6C9F] border-[#1F6C9F]/20' },
              { title: '90-Day Credit Launch Targets', category: 'day90', color: 'border-l-4 border-[#346538]', badge: 'bg-[#EDF3EC] text-[#346538] border-[#346538]/20' }
            ].map((sect, idx) => {
              const sectTasks = actions.map(a => ({ ...a, id: a.action_id, category: getCategory(a.action_id), target: a.due_date })).filter(t => t.category === sect.category);
              return (
                <div key={idx} className="border border-accent-200 bg-accent-50 p-6 rounded-lg space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-accent-200">
                    <h3 className="text-base font-serif font-normal text-primary-950 dark:text-white">{sect.title}</h3>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold border ${sect.badge}`}>
                      {sectTasks.length} Actions
                    </span>
                  </div>
                  <div className="space-y-3">
                    {sectTasks.map((task) => {
                      const isDone = completedTasks.includes(task.id);
                      const isSelected = selectedTaskId === task.id;
                      return (
                        <div 
                          key={task.id} 
                          onClick={() => setSelectedTaskId(task.id)}
                          className={`p-4 border rounded transition-all cursor-pointer flex items-center justify-between ${
                            isSelected 
                              ? 'bg-neutral-200/40 border-primary-955 dark:border-primary-50 ring-1 ring-primary-955 dark:ring-primary-50' 
                              : isDone
                                ? 'bg-neutral-100/50 border-accent-200 opacity-60'
                                : 'bg-accent-50 border-accent-200 hover:border-neutral-400'
                          }`}
                        >
                          <div className="flex items-center space-x-3 pr-4 flex-1">
                            <div 
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleTask(task.id);
                              }}
                              className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                                isDone 
                                  ? 'bg-[#346538] border-[#346538] text-white' 
                                  : 'border-neutral-400 bg-accent-50 hover:border-neutral-600'
                              }`}
                            >
                              {isDone && <Check className="w-3 h-3" />}
                            </div>
                            <span className={`text-xs font-semibold ${isDone ? 'line-through text-primary-400' : 'text-primary-955 dark:text-white'}`}>
                              {task.text}
                            </span>
                          </div>
                          <span className="text-[9px] font-mono text-primary-400 shrink-0">{task.target}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT COLUMN: Copilot Panel */}
          <div className="lg:col-span-1 space-y-6 text-left">
            <div className="border border-accent-200 bg-accent-50 p-6 rounded-lg flex flex-col justify-between h-full space-y-6">
              
              {/* Header section */}
              <div>
                <div className="flex items-center space-x-2 text-primary-550 mb-1">
                  <Sparkles className="w-4 h-4 text-[#956400]" />
                  <span className="text-[10px] font-bold tracking-wider uppercase font-mono">AI Steward Assistive Copilot</span>
                </div>
                <h3 className="text-xl font-serif font-normal text-primary-955 dark:text-white mt-1 border-b border-accent-200 pb-3">
                  Task Execution
                </h3>
              </div>

              {/* Task Details */}
              <div className="space-y-4 flex-1">
                <div className="flex justify-between items-start gap-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-primary-955 dark:text-white font-mono">
                    {activeTask.text}
                  </h4>
                  <span className={`text-[9px] font-mono px-2 py-0.5 rounded border uppercase ${
                    activeTask.priority === 'High' ? 'bg-[#FDEBEC] text-[#9F2F2D] border-[#9F2F2D]/20' :
                    activeTask.priority === 'Medium' ? 'bg-[#FBF3DB] text-[#956400] border-[#956400]/20' :
                    'bg-[#E1F3FE] text-[#1F6C9F] border-[#1F6C9F]/20'
                  }`}>
                    {activeTask.priority} Priority
                  </span>
                </div>

                <p className="text-xs text-primary-500 leading-relaxed bg-[#FBFBFA]/50 p-3 rounded border border-accent-200 dark:bg-neutral-900/10">
                  {activeTask.overview}
                </p>

                {/* Steps */}
                <div className="space-y-2">
                  <div className="text-[10px] font-bold text-primary-400 font-mono tracking-wider">ACTION STEPS TO TAKE:</div>
                  <ol className="list-decimal list-inside space-y-1.5 text-xs text-primary-500">
                    {activeTask.steps.map((step, idx) => (
                      <li key={idx} className="leading-relaxed pl-1">{step}</li>
                    ))}
                  </ol>
                </div>

                {/* Preparations */}
                <div className="space-y-2">
                  <div className="text-[10px] font-bold text-primary-400 font-mono tracking-wider">REQUIRED FOR PREPARATION:</div>
                  <ul className="list-disc list-inside space-y-1.5 text-xs text-primary-500">
                    {activeTask.preparation.map((prep, idx) => (
                      <li key={idx} className="leading-relaxed pl-1">{prep}</li>
                    ))}
                  </ul>
                </div>

                {/* CONTEXTUAL MANUAL INTERACTIVE WIDGETS */}
                <div className="border-t border-accent-200 pt-4 mt-2">
                  <div className="text-[10px] font-bold text-primary-400 font-mono tracking-wider mb-2">ASSISTIVE MANUAL RESOLUTION:</div>
                  
                  {completedTasks.includes(activeTask.id) ? (
                    <div className="bg-[#EDF3EC] border border-[#346538]/20 p-4 rounded flex items-center space-x-2 text-[#346538] text-xs font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Task Completed & Verified</span>
                    </div>
                  ) : (
                    <div className="bg-accent-50 rounded border border-accent-200 p-4 space-y-3">
                      
                      {/* Udyam verification */}
                      {activeTask.actionType === 'udyam' && (
                        <div className="space-y-2">
                          <label className="block text-[10px] font-mono text-primary-400">ENTER UDYAM ID (UDYAM-XX-00-1234567)</label>
                          <div className="flex gap-2">
                            <input 
                              type="text" 
                              value={udyamInput} 
                              onChange={e => setUdyamInput(e.target.value)}
                              placeholder="UDYAM-KA-03-0091823"
                              className="w-full bg-accent-50 border border-accent-200 rounded p-1.5 text-xs font-mono focus:ring-1 focus:ring-neutral-400 focus:outline-none"
                            />
                            <button 
                              onClick={handleVerifyUdyam}
                              disabled={isVerifyingUdyam || !udyamInput.trim()}
                              className="px-3 py-1.5 bg-primary-950 text-white dark:bg-primary-50 dark:text-black rounded text-xs font-semibold hover:bg-neutral-850 transition disabled:opacity-50"
                            >
                              {isVerifyingUdyam ? 'Verifying...' : 'Verify'}
                            </button>
                          </div>
                        </div>
                      )}

                      {/* GST return uploader */}
                      {activeTask.actionType === 'gst' && (
                        <div className="space-y-2">
                          {gstData ? (
                            <div className="text-xs space-y-1.5 font-mono bg-accent-50 p-2 border border-accent-200 rounded">
                              <div className="text-[#346538] font-bold">✓ Parsed Successfully</div>
                              <div>Turnover: {gstData.turnover}</div>
                              <div>Tax Paid: {gstData.taxPaid}</div>
                            </div>
                          ) : (
                            <div 
                              onClick={handleSimulateGstUpload}
                              className="border-2 border-dashed border-accent-200 hover:border-neutral-400 cursor-pointer rounded p-6 text-center transition-all bg-accent-100/50"
                            >
                              <FileUp className="w-6 h-6 mx-auto mb-1.5 text-primary-400" />
                              <div className="text-xs font-bold text-primary-955 dark:text-white">
                                {isParsingGst ? 'Parsing GST return PDF...' : 'Click to Upload GSTR-3B PDF'}
                              </div>
                              <div className="text-[10px] text-primary-400 mt-0.5">Loads sample May 2026 data</div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Confirm ledger balance */}
                      {activeTask.actionType === 'confirm_ledger' && (
                        <div className="space-y-3 text-xs">
                          <div className="grid grid-cols-2 gap-2 font-mono bg-accent-100 p-2 rounded border border-accent-200">
                            <div>Internal Books:</div>
                            <div className="font-bold text-right">₹2,35,000</div>
                            <div>NeoPack Books:</div>
                            <div className="font-bold text-right text-red-600">₹2,50,000</div>
                            <div className="border-t border-accent-200 pt-1">Variance:</div>
                            <div className="border-t border-accent-200 pt-1 font-bold text-right text-[#9F2F2D]">₹15,000</div>
                          </div>
                          
                          <input 
                            type="text" 
                            value={reconciliationReason} 
                            onChange={e => setReconciliationReason(e.target.value)}
                            placeholder="Reason for variance (e.g. Invoice #872 in transit)"
                            className="w-full bg-accent-50 border border-accent-200 rounded p-1.5 focus:ring-1 focus:ring-neutral-400 focus:outline-none"
                          />

                          <button 
                            onClick={handleConfirmLedger}
                            disabled={isReconciling}
                            className="w-full py-2 bg-primary-950 text-white dark:bg-primary-50 dark:text-black rounded text-xs font-bold hover:bg-neutral-850 transition flex items-center justify-center space-x-1.5"
                          >
                            <CheckSquare className="w-3.5 h-3.5" />
                            <span>{isReconciling ? 'Signing...' : 'Sign & Confirm Reconciliation'}</span>
                          </button>
                        </div>
                      )}

                      {/* Debt consolidation, stop split */}
                      {(activeTask.actionType === 'debt' || activeTask.actionType === 'stop') && (
                        <div className="space-y-2">
                          <p className="text-[11px] text-primary-400">This action requires configuration in another dashboard view.</p>
                          <button 
                            onClick={() => activeTask.actionUrl && navigate(activeTask.actionUrl)}
                            className="w-full py-2 bg-accent-50 hover:bg-neutral-250/50 border border-accent-200 text-neutral-800 rounded text-xs font-semibold flex items-center justify-center space-x-1.5"
                          >
                            <LinkIcon className="w-3.5 h-3.5" />
                            <span>{activeTask.actionLabel}</span>
                          </button>
                        </div>
                      )}

                      {/* Receivables DSO */}
                      {activeTask.actionType === 'dso' && (
                        <div className="space-y-3">
                          <div>
                            <label className="block text-[9px] font-mono text-primary-400 mb-1">SELECT REMINDER ESCALATION TONE</label>
                            <select 
                              value={dsoReminderTone} 
                              onChange={e => setDsoReminderTone(e.target.value)}
                              className="w-full bg-accent-50 border border-accent-200 rounded p-1 text-xs focus:outline-none"
                            >
                              <option value="Professional">Professional (Soft Reminder)</option>
                              <option value="Firm">Firm (Due Date Notification)</option>
                              <option value="Escalation">Escalation (Late Fee Notice)</option>
                            </select>
                          </div>
                          
                          <div className="p-2.5 bg-accent-100 border border-accent-200 rounded font-mono text-[10px] text-primary-500">
                            <strong>Subject:</strong> [Action Required] Outstanding Invoice Reconciliation - Finpercent<br/>
                            <strong>Body:</strong> We kindly request prompt clearing of invoice #FP-482. Let us know if you require financing assistance.
                          </div>

                          <button 
                            onClick={handleSaveDso}
                            disabled={isSavingDso}
                            className="w-full py-2 bg-primary-950 text-white dark:bg-primary-50 dark:text-black rounded text-xs font-bold hover:bg-neutral-850 transition"
                          >
                            {isSavingDso ? 'Saving Parameters...' : 'Save & Trigger Reminders'}
                          </button>
                        </div>
                      )}

                      {/* Peenya Diversification */}
                      {activeTask.actionType === 'peenya' && (
                        <div className="space-y-3 text-xs">
                          <div className="space-y-1.5 font-mono text-[10px]">
                            <div className="font-bold mb-1">Current Buyer Concentrations:</div>
                            {peenyaBuyers.map(b => (
                              <div key={b.name} className="flex justify-between">
                                <span>• {b.name}</span>
                                <span className={b.share > 35 ? 'text-[#9F2F2D] font-bold' : ''}>{b.share}%</span>
                              </div>
                            ))}
                            <div className="text-[9px] text-[#9F2F2D] mt-1">Warning: Concentrated client exceeds 30% rating limit.</div>
                          </div>

                          <div className="flex gap-2">
                            <input 
                              type="text" 
                              value={peenyaNewBuyer} 
                              onChange={e => setPeenyaNewBuyer(e.target.value)}
                              placeholder="Add buyer (e.g. Tata Advanced)"
                              className="w-full bg-accent-50 border border-accent-200 rounded p-1.5 focus:ring-1 focus:ring-neutral-400 focus:outline-none"
                            />
                            <button 
                              onClick={handleAddBuyer}
                              disabled={!peenyaNewBuyer.trim()}
                              className="px-3 bg-primary-950 text-white dark:bg-primary-50 dark:text-black rounded text-xs font-semibold hover:bg-neutral-850 transition"
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Dossier compiler */}
                      {activeTask.actionType === 'dossier' && (
                        <div className="space-y-2">
                          <button 
                            onClick={handleCompileDossier}
                            disabled={isCompilingDossier}
                            className="w-full py-2 bg-primary-950 text-white dark:bg-primary-50 dark:text-black rounded text-xs font-bold hover:bg-neutral-850 transition flex items-center justify-center space-x-1.5"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>{isCompilingDossier ? 'Compiling Dossier...' : 'Compile Lender-Ready Dossier'}</span>
                          </button>

                          {dossierLogs.length > 0 && (
                            <div className="p-2.5 bg-black text-[#a8a7a3] font-mono text-[9px] rounded space-y-1 max-h-32 overflow-y-auto">
                              {dossierLogs.map((log, i) => (
                                <div key={i}>{log}</div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Tax Auditing */}
                      {activeTask.actionType === 'tax' && (
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <div className="flex justify-between text-[10px] font-mono text-primary-400">
                              <span>PROFIT REINVESTMENT RESERVES:</span>
                              <span className="font-bold">{taxSplit}%</span>
                            </div>
                            <input 
                              type="range" 
                              min="10" 
                              max="30" 
                              value={taxSplit} 
                              onChange={e => setTaxSplit(parseInt(e.target.value))}
                              className="w-full accent-primary-950" 
                            />
                          </div>

                          <button 
                            onClick={handleSaveTaxSplit}
                            disabled={isSavingTax}
                            className="w-full py-2 bg-primary-950 text-white dark:bg-primary-50 dark:text-black rounded text-xs font-bold hover:bg-neutral-850 transition"
                          >
                            {isSavingTax ? 'Applying splits...' : 'Approve Tax Reserve Rule'}
                          </button>
                        </div>
                      )}

                    </div>
                  )}
                </div>

                {/* CO-PILOT AUTOMATION TRIGGER */}
                {!completedTasks.includes(activeTask.id) && (
                  <div className="border-t border-accent-200 pt-4 space-y-3">
                    <div className="text-[10px] font-bold text-primary-400 font-mono tracking-wider">OR RESOLVE AUTOMATICALLY:</div>
                    <button
                      onClick={triggerAutopilot}
                      disabled={isAgentRunning}
                      className="w-full py-2 bg-[#EDF3EC] border border-[#346538]/20 hover:bg-[#e4ebd3] text-[#346538] rounded text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isAgentRunning ? 'animate-spin' : ''}`} />
                      <span>{isAgentRunning ? 'AI Steward executing...' : 'Auto-run with AI Steward'}</span>
                    </button>

                    {agentLogs.length > 0 && (
                      <div className="p-2.5 bg-black text-[#a8a7a3] font-mono text-[9px] rounded space-y-1 border border-accent-200">
                        {agentLogs.map((log, i) => (
                          <div key={i} className="leading-normal">{log}</div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
