import React, { createContext, useContext, useState, useEffect } from 'react';

// Data Entity Types
export interface ReadinessPenalty {
  penalty_id: string;
  msme_id: string;
  penalty_type: string;
  linked_metric: string;
  penalty_points: number;
  severity: 'Medium' | 'High' | 'Critical';
  reason: string;
  correction_action: string;
  created_at: string;
  resolved_at: string | null;
  status: 'Active' | 'Resolved';
}

export interface ReadinessReward {
  reward_id: string;
  msme_id: string;
  action_id: string;
  reward_points: number;
  linked_metric: string;
  reason: string;
  created_at: string;
}

export interface ScoreHistory {
  score_history_id: string;
  msme_id: string;
  previous_score: number;
  new_score: number;
  change_reason: string;
  penalty_ids: string[];
  reward_ids: string[];
  generated_at: string;
}

export interface ActionPlanItem {
  action_id: string;
  msme_id: string;
  action_type: 'udyam' | 'gst' | 'debt' | 'stop' | 'dossier' | 'dso' | 'peenya' | 'tax' | 'confirm_ledger';
  priority: 'High' | 'Medium' | 'Low';
  expected_score_impact: number;
  due_date: string;
  assigned_to: 'Owner' | 'Accountant' | 'Advisor';
  completion_status: 'Pending' | 'Completed';
  evidence_required: boolean;
  evidence_url: string | null;
  text: string;
  overview: string;
  steps: string[];
  preparation: string[];
  actionLabel: string;
}

export interface DocItem {
  id: string;
  name: string;
  category: 'Registration' | 'Tax' | 'Bank' | 'Financial';
  status: 'Complete' | 'Missing' | 'Expired';
  expiry?: string;
  fileName?: string;
  verifiedByAdvisor?: boolean;
}

export interface ConsentItem {
  partnerId: string;
  partnerName: string;
  scopes: string[]; // 'score', 'summary', 'documents', 'credit_file', 'aggregate'
  active: boolean;
  expiryDaysRemaining: number;
}

export interface AuditLogItem {
  log_id: string;
  accessor_name: string;
  accessed_resource: string;
  action_type: string; // 'Read', 'Download', 'Consent Granted', 'Consent Revoked'
  timestamp: string;
}

export type SimulatedRole = 'msme_owner' | 'bank' | 'institution' | 'advisor' | 'provider';

interface MSMEProfile {
  name: string;
  district: string;
  cluster: string;
  sector: string;
  revenue: number;
  profitMargin: number;
  existingEMI: number;
  receivablesOverdueDays: number;
  concentrationShare: number; // NeoPack customer concentration %
}

interface ReadinessContextType {
  // Roles & Profile
  activeRole: SimulatedRole;
  setActiveRole: (role: SimulatedRole) => void;
  profile: MSMEProfile;
  setProfile: React.Dispatch<React.SetStateAction<MSMEProfile>>;
  
  // Real-Time Score Engine
  score: number;
  band: 'Strong Readiness' | 'Bank-Ready' | 'Needs Correction' | 'High Risk' | 'Not Ready';
  subscores: {
    cashFlow: number;
    debtPressure: number;
    documentReadiness: number;
    workingCapital: number;
    complianceConsistency: number;
    dataFreshness: number;
    actionCompletion: number;
  };
  penalties: ReadinessPenalty[];
  rewards: ReadinessReward[];
  scoreHistory: ScoreHistory[];
  
  // Lists
  documents: DocItem[];
  actions: ActionPlanItem[];
  consents: ConsentItem[];
  auditLogs: AuditLogItem[];
  
  // Core Operations
  uploadDocument: (docId: string, fileName: string) => void;
  resolveAction: (actionId: string, evidenceUrl?: string) => void;
  toggleConsent: (partnerId: string, scope?: string) => void;
  addAuditLog: (accessor: string, resource: string, action: string) => void;
  triggerAdvisorVerify: (docId: string) => void;
  updateDebtRegistry: (occ: number, od: number, wc: number) => void;
  simulateGSTOutdate: () => void;
  simulateBankStatementOutdate: () => void;
  simulateReceivablesOverdue: (overdue: boolean) => void;
  simulateHighEMI: (high: boolean) => void;
  simulateAddCohortMSME: (name: string, district: string, cluster: string, sector: string) => void;
  cohort: { name: string; district: string; cluster: string; sector: string; score: number; risk: 'Low' | 'Medium' | 'High' }[];
  completeMonthlyReview: () => void;
  reviewStreak: number;
  notifications: string[];
  clearNotifications: () => void;
  addNotification: (msg: string) => void;
}

const ReadinessContext = createContext<ReadinessContextType | undefined>(undefined);

export const ReadinessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Roles & Settings
  const [activeRole, setActiveRole] = useState<SimulatedRole>('msme_owner');
  const [reviewStreak, setReviewStreak] = useState(2);
  const [notifications, setNotifications] = useState<string[]>([
    "Your readiness score is 64/100 (Needs Correction). Renew expired Udyam certificate and upload missing GST return to unlock Bank-Ready status.",
    "Opportunity: Completing your GST upload and Udyam renewal moves your score from Needs Correction to Bank-Ready."
  ]);
  
  const [profile, setProfile] = useState<MSMEProfile>({
    name: 'Acme Corporation',
    district: 'Bengaluru Urban',
    cluster: 'Peenya',
    sector: 'Manufacturing',
    revenue: 1200000,
    profitMargin: 18,
    existingEMI: 45000,
    receivablesOverdueDays: 60,
    concentrationShare: 42 // 42% Peenya customer concentration (NeoPack Industries)
  });

  // 2. Documents Checklist Initial State
  const [documents, setDocuments] = useState<DocItem[]>([
    { id: 'udyam', name: 'Business Registration (Udyam)', category: 'Registration', status: 'Expired', expiry: '2026-05-15', fileName: 'udyam_cert_2022.pdf' },
    { id: 'gst_cert', name: 'GST Certificate (Form REG-06)', category: 'Registration', status: 'Complete', fileName: 'gst_reg_06.pdf' },
    { id: 'gst_return', name: 'GST Returns (GSTR-3B) May 2026', category: 'Tax', status: 'Missing' },
    { id: 'gst_r1', name: 'GST Returns (GSTR-1) Q4', category: 'Tax', status: 'Complete', fileName: 'gstr1_q4.pdf' },
    { id: 'bank_statement', name: 'Bank Statement (Latest 6 Months)', category: 'Bank', status: 'Complete', fileName: 'bank_statement_h1.pdf' },
    { id: 'financials', name: 'Audited Financial Statements (FY25)', category: 'Financial', status: 'Missing' },
    { id: 'itr', name: 'Income Tax Returns (ITR-6) FY24', category: 'Tax', status: 'Complete', fileName: 'itr_6_fy24.pdf' }
  ]);

  // 3. Action Plan Items Initial State
  const [actions, setActions] = useState<ActionPlanItem[]>([
    {
      action_id: 'i-1',
      msme_id: 'acme-1',
      action_type: 'udyam',
      priority: 'High',
      expected_score_impact: 10,
      due_date: 'Immediate',
      assigned_to: 'Owner',
      completion_status: 'Pending',
      evidence_required: true,
      evidence_url: null,
      text: 'Renew expired Udyam MSME Registration Certificate',
      overview: 'An expired Udyam certificate blocks access to interest rate concessions and priority sector lending benefits.',
      steps: [
        'Access the government Udyam registration portal',
        'Submit Aadhaar OTP of the promoter',
        'Verify previous year\'s ITR data',
        'Download updated certificate PDF'
      ],
      preparation: [
        'Aadhaar number of proprietor/partner',
        'GSTIN & PAN details',
        'Financial statements for FY25'
      ],
      actionLabel: 'Verify Udyam Certificate'
    },
    {
      action_id: 'i-2',
      msme_id: 'acme-1',
      action_type: 'gst',
      priority: 'High',
      expected_score_impact: 11,
      due_date: 'Immediate',
      assigned_to: 'Accountant',
      completion_status: 'Pending',
      evidence_required: true,
      evidence_url: null,
      text: 'Upload missing GST returns (GSTR-3B) for May 2026',
      overview: 'Late GST filings trigger automatic rating downgrades and prevent lenders from verifying real-time cash flow.',
      steps: [
        'File GSTR-3B return via GST Portal',
        'Download the filed GSTR-3B acknowledgment PDF',
        'Upload the PDF here for immediate parsing'
      ],
      preparation: [
        'GST portal login credentials',
        'Sales register for May 2026',
        'Input tax credit (ITC) reconciliation ledger'
      ],
      actionLabel: 'Upload GST Return'
    },
    {
      action_id: 'd-1',
      msme_id: 'acme-1',
      action_type: 'debt',
      priority: 'Medium',
      expected_score_impact: 5,
      due_date: 'Within 30 Days',
      assigned_to: 'Owner',
      completion_status: 'Pending',
      evidence_required: false,
      evidence_url: null,
      text: 'Consolidate active corporate outstanding loans in debt registry',
      overview: 'A unified debt registry helps calculate exact Debt Service Coverage Ratio (DSCR) and prevents over-leveraging flags.',
      steps: [
        'Review active credit facilities',
        'Update interest rates and limits in the Finpercent Debt ledger',
        'Verify OD/WC split ratios'
      ],
      preparation: [
        'Sanction letters for active loans',
        'Bank statements showing recent repayments',
        'Outstanding limit certificate'
      ],
      actionLabel: 'Go to Debt Ledger'
    },
    {
      action_id: 'd-2',
      msme_id: 'acme-1',
      action_type: 'confirm_ledger',
      priority: 'Medium',
      expected_score_impact: 3,
      due_date: 'Within 30 Days',
      assigned_to: 'Advisor',
      completion_status: 'Pending',
      evidence_required: true,
      evidence_url: null,
      text: 'Confirm vendor ledger balances with NeoPack Industries',
      overview: 'Reconciled accounts payable verify the validity of cash flow projections and prevent legal claims.',
      steps: [
        'Download NeoPack Industries ledger statement',
        'Match with internal purchase journal',
        'Submit confirmation signature'
      ],
      preparation: [
        'Vendor statement of accounts',
        'Purchase bills and debit notes',
        'Payment receipts'
      ],
      actionLabel: 'Verify Ledger Balance'
    },
    {
      action_id: 'd-3',
      msme_id: 'acme-1',
      action_type: 'stop',
      priority: 'Medium',
      expected_score_impact: 5,
      due_date: 'Within 30 Days',
      assigned_to: 'Owner',
      completion_status: 'Pending',
      evidence_required: false,
      evidence_url: null,
      text: 'Establish straight-through S.T.O.P automated banking rules',
      overview: 'Automatic allocation of revenue prevents cash diversion and secures debt-servicing capability.',
      steps: [
        'Set split ratios: Savings (20%), Taxes (15%), Operations (45%), Profit (20%)',
        'Link main settlement account to BaaS gateway',
        'Simulate straight-through split execution'
      ],
      preparation: [
        'Main corporate bank account details',
        'BaaS credentials',
        'Board resolution for auto-split mandate'
      ],
      actionLabel: 'Go to BaaS S.T.O.P Gateway'
    },
    {
      action_id: 'd-4',
      msme_id: 'acme-1',
      action_type: 'dso',
      priority: 'Medium',
      expected_score_impact: 6,
      due_date: 'Within 60 Days',
      assigned_to: 'Owner',
      completion_status: 'Pending',
      evidence_required: false,
      evidence_url: null,
      text: 'Reduce B2B average DSO (receivables lock) from 42 days to 35 days',
      overview: 'A lower Days Sales Outstanding (DSO) enhances working capital efficiency and shows operational strength.',
      steps: [
        'Analyze aging receivables report',
        'Trigger invoice reminders to late paying clients',
        'Configure early payment discounts'
      ],
      preparation: [
        'Aging receivables ledger',
        'Client contact list',
        'Discount threshold policy'
      ],
      actionLabel: 'Configure DSO Reminders'
    },
    {
      action_id: 'd-5',
      msme_id: 'acme-1',
      action_type: 'peenya',
      priority: 'Medium',
      expected_score_impact: 5,
      due_date: 'Within 60 Days',
      assigned_to: 'Owner',
      completion_status: 'Pending',
      evidence_required: true,
      evidence_url: null,
      text: 'Resolve Peenya cluster customer concentration warning (below 30%)',
      overview: 'Dependency on a single customer in Peenya cluster increases B2B risk and penalizes rating scorecards.',
      steps: [
        'Map out regional B2B client distribution',
        'Onboard at least two new buyer contracts outside the primary Peenya circle',
        'Submit diversified sales logs'
      ],
      preparation: [
        'Sales log showing customer shares',
        'Draft buyer contracts',
        'Regional trade registrations'
      ],
      actionLabel: 'Review Customer Distribution'
    },
    {
      action_id: 'd-6',
      msme_id: 'acme-1',
      action_type: 'dossier',
      priority: 'Low',
      expected_score_impact: 4,
      due_date: 'Within 90 Days',
      assigned_to: 'Owner',
      completion_status: 'Pending',
      evidence_required: true,
      evidence_url: null,
      text: 'Submit bank-ready borrower dossier file to lender partner',
      overview: 'A clean, compiled lender dossier accelerates loan dispatch time and reduces credit approval friction.',
      steps: [
        'Compile the verified financial, asset, and tax certificates',
        'Run dossier integrity check',
        'Share the secure download link with partner bank'
      ],
      preparation: [
        'Udyam certificate',
        'Audited balance sheet',
        'GST returns',
        'Promoter KYC docs'
      ],
      actionLabel: 'Compile Bank Dossier'
    },
    {
      action_id: 'd-7',
      msme_id: 'acme-1',
      action_type: 'tax',
      priority: 'Low',
      expected_score_impact: 3,
      due_date: 'Within 90 Days',
      assigned_to: 'Accountant',
      completion_status: 'Pending',
      evidence_required: false,
      evidence_url: null,
      text: 'Audit tax efficiency strategies for the upcoming assessment cycle',
      overview: 'Efficient tax reserves management prevents cash flow bottlenecks during quarterly advance tax payments.',
      steps: [
        'Estimate cumulative taxable income',
        'Review tax deductions under active schemes',
        'Set aside Tax reserves in the S.T.O.P Taxes pool'
      ],
      preparation: [
        'Quarterly P&L statement',
        'Advance tax payment receipts',
        'Depreciation schedules'
      ],
      actionLabel: 'Audit Tax Pools'
    }
  ]);

  // 4. Consents Initial State
  const [consents, setConsents] = useState<ConsentItem[]>([
    { partnerId: 'bank', partnerName: 'State Bank & NBFC Partners', scopes: ['score', 'summary', 'documents', 'credit_file'], active: true, expiryDaysRemaining: 30 },
    { partnerId: 'institution', partnerName: 'MSME Cluster Development Bureau', scopes: ['score', 'summary', 'aggregate'], active: true, expiryDaysRemaining: 30 },
    { partnerId: 'advisor', partnerName: 'Acme Advisory & Associates', scopes: ['documents', 'summary'], active: true, expiryDaysRemaining: 30 },
    { partnerId: 'provider', partnerName: 'Finpercent Platform campaigns', scopes: ['score', 'summary', 'aggregate'], active: true, expiryDaysRemaining: 30 }
  ]);

  // 5. Audit Log Initial State
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>([
    { log_id: 'l-1', accessor_name: 'State Bank (Underwriter)', accessed_resource: 'Credit Readiness Summary', action_type: 'Read', timestamp: '2026-07-01 10:24:11' },
    { log_id: 'l-2', accessor_name: 'MSME Cluster Development Bureau', accessed_resource: 'District Aggregate Statistics', action_type: 'Read', timestamp: '2026-06-30 15:45:00' },
    { log_id: 'l-3', accessor_name: 'Acme Advisory (Accountant)', accessed_resource: 'Document Locker: GSTR-1', action_type: 'Download', timestamp: '2026-07-01 14:10:02' }
  ]);

  // 6. Score History Initial State
  const [scoreHistory, setScoreHistory] = useState<ScoreHistory[]>([
    { score_history_id: 'sh-0', msme_id: 'acme-1', previous_score: 75, new_score: 64, change_reason: 'GST missing & Udyam expired triggers penalties', penalty_ids: ['p-1', 'p-2'], reward_ids: [], generated_at: '2026-06-25 09:00:00' }
  ]);

  // Cohort of MSMEs for Institution Dashboard
  const [cohort, setCohort] = useState([
    { name: 'Acme Corporation', district: 'Bengaluru Urban', cluster: 'Peenya', sector: 'Manufacturing', score: 64, risk: 'Medium' as const },
    { name: 'NeoPack Industries', district: 'Bengaluru Urban', cluster: 'Peenya', sector: 'Manufacturing', score: 58, risk: 'Medium' as const },
    { name: 'AlphaTech Logistics', district: 'Dharwad', cluster: 'Hubli Industrial', sector: 'Logistics', score: 71, risk: 'Low' as const },
    { name: 'GreenPlast Polymers', district: 'Bengaluru Rural', cluster: 'Bommasandra', sector: 'Chemicals', score: 38, risk: 'High' as const }
  ]);

  // 7. Dynamic Penalty and Reward Ledgers
  const [penalties, setPenalties] = useState<ReadinessPenalty[]>([
    { penalty_id: 'p_gst', msme_id: 'acme-1', penalty_type: 'Document Missing', linked_metric: 'complianceConsistency', penalty_points: -7, severity: 'High', reason: 'GST Returns (GSTR-3B) May 2026 is missing', correction_action: 'Upload GST GSTR-3B return', created_at: '2026-06-20', resolved_at: null, status: 'Active' },
    { penalty_id: 'p_financials', msme_id: 'acme-1', penalty_type: 'Document Missing', linked_metric: 'documentReadiness', penalty_points: -8, severity: 'High', reason: 'Audited Financial Statements (FY25) is missing', correction_action: 'Upload Audited Financials', created_at: '2026-06-20', resolved_at: null, status: 'Active' },
    { penalty_id: 'p_udyam', msme_id: 'acme-1', penalty_type: 'Document Expired', linked_metric: 'documentReadiness', penalty_points: -6, severity: 'High', reason: 'Udyam Registration Certificate is expired', correction_action: 'Renew Udyam Registration', created_at: '2026-05-15', resolved_at: null, status: 'Active' },
    { penalty_id: 'p_receivables', msme_id: 'acme-1', penalty_type: 'Working Capital Lock', linked_metric: 'workingCapital', penalty_points: -6, severity: 'High', reason: '₹8.4 Lakh is overdue beyond 60 days', correction_action: 'Collect overdue receivables', created_at: '2026-06-10', resolved_at: null, status: 'Active' },
    { penalty_id: 'p_action_overdue', msme_id: 'acme-1', penalty_type: 'Behavior Delay', linked_metric: 'actionCompletion', penalty_points: -4, severity: 'Medium', reason: 'High-priority actions are overdue', correction_action: 'Complete Udyam and GST tasks', created_at: '2026-06-22', resolved_at: null, status: 'Active' },
    { penalty_id: 'p_data_fresh', msme_id: 'acme-1', penalty_type: 'Data Staleness', linked_metric: 'dataFreshness', penalty_points: -5, severity: 'Medium', reason: 'Debt details not updated for 60 days', correction_action: 'Refresh registry profiles', created_at: '2026-06-01', resolved_at: null, status: 'Active' }
  ]);

  const [rewards, setRewards] = useState<ReadinessReward[]>([]);

  // 8. Calculations based on active lists
  const [score, setScore] = useState(64);
  const [band, setBand] = useState<'Strong Readiness' | 'Bank-Ready' | 'Needs Correction' | 'High Risk' | 'Not Ready'>('Needs Correction');
  const [subscores, setSubscores] = useState({
    cashFlow: 74,
    debtPressure: 78,
    documentReadiness: 56,
    workingCapital: 60,
    complianceConsistency: 65,
    dataFreshness: 60,
    actionCompletion: 50
  });

  // Calculate score dynamically whenever penalties or rewards change
  useEffect(() => {
    let base = 100;
    
    // Deduct active penalties
    const activePenaltiesPoints = penalties
      .filter(p => p.status === 'Active')
      .reduce((sum, p) => sum + p.penalty_points, 0);

    // Add earned rewards
    const activeRewardsPoints = rewards
      .reduce((sum, r) => sum + r.reward_points, 0);

    const calculatedScore = Math.max(0, Math.min(100, base + activePenaltiesPoints + activeRewardsPoints));
    setScore(calculatedScore);

    // Band Allocation
    if (calculatedScore >= 90) setBand('Strong Readiness');
    else if (calculatedScore >= 75) setBand('Bank-Ready');
    else if (calculatedScore >= 60) setBand('Needs Correction');
    else if (calculatedScore >= 40) setBand('High Risk');
    else setBand('Not Ready');

    // Update subscores depending on active penalties/rewards
    const hasUdyamPen = penalties.some(p => p.penalty_id === 'p_udyam' && p.status === 'Active');
    const hasGstPen = penalties.some(p => p.penalty_id === 'p_gst' && p.status === 'Active');
    const hasFinancialsPen = penalties.some(p => p.penalty_id === 'p_financials' && p.status === 'Active');
    const hasReceivablesPen = penalties.some(p => p.penalty_id === 'p_receivables' && p.status === 'Active');
    const hasActionPen = penalties.some(p => p.penalty_id === 'p_action_overdue' && p.status === 'Active');
    const hasFreshPen = penalties.some(p => p.penalty_id === 'p_data_fresh' && p.status === 'Active');
    const hasEMIPen = penalties.some(p => p.penalty_id === 'p_emi_capacity' && p.status === 'Active');

    setSubscores({
      cashFlow: hasEMIPen ? 58 : 84,
      debtPressure: hasEMIPen ? 48 : 78,
      documentReadiness: 100 - (hasUdyamPen ? 25 : 0) - (hasFinancialsPen ? 30 : 0),
      workingCapital: hasReceivablesPen ? 54 : 80,
      complianceConsistency: hasGstPen ? 55 : 85,
      dataFreshness: hasFreshPen ? 55 : 85,
      actionCompletion: hasActionPen ? 40 : 80
    });

    // Keep Acme score in cohort synced
    setCohort(prev => prev.map(c => c.name === 'Acme Corporation' ? { ...c, score: calculatedScore, risk: calculatedScore >= 75 ? 'Low' : calculatedScore >= 40 ? 'Medium' : 'High' } : c));
  }, [penalties, rewards]);

  const addNotification = (msg: string) => {
    setNotifications(prev => [msg, ...prev.slice(0, 4)]);
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  // Helper: Append Audit Logs
  const addAuditLog = (accessor: string, resource: string, action: string) => {
    const now = new Date();
    const pad = (n: number) => n < 10 ? '0' + n : n;
    const timeStr = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    
    setAuditLogs(prev => [
      {
        log_id: `l-${Math.random().toString(36).substr(2, 9)}`,
        accessor_name: accessor,
        accessed_resource: resource,
        action_type: action,
        timestamp: timeStr
      },
      ...prev
    ]);
  };

  // Uploading Document
  const uploadDocument = (docId: string, fileName: string) => {
    setDocuments(prev => prev.map(d => d.id === docId ? { ...d, status: 'Complete', fileName } : d));
    addAuditLog('Owner', `Document Locker: ${docId}`, 'Upload');

    if (docId === 'gst_return') {
      setPenalties(prev => prev.map(p => p.penalty_id === 'p_gst' ? { ...p, status: 'Resolved', resolved_at: '2026-07-01' } : p));
      setRewards(prev => {
        if (prev.some(r => r.action_id === 'upload_gst')) return prev;
        return [...prev, 
          { reward_id: 'r_gst', msme_id: 'acme-1', action_id: 'upload_gst', reward_points: 7, linked_metric: 'complianceConsistency', reason: 'GST GSTR-3B uploaded successfully', created_at: '2026-07-01' },
          { reward_id: 'r_gst_clear', msme_id: 'acme-1', action_id: 'clear_gst_doc', reward_points: 4, linked_metric: 'documentReadiness', reason: 'Cleared missing GSTR-3B return', created_at: '2026-07-01' }
        ];
      });
      setActions(prev => prev.map(a => a.action_type === 'gst' ? { ...a, completion_status: 'Completed' } : a));
      addNotification("🎉 GSTR-3B Uploaded! GST data missing penalty cleared. Score increased! (+11 points)");
    }

    if (docId === 'financials') {
      setPenalties(prev => prev.map(p => p.penalty_id === 'p_financials' ? { ...p, status: 'Resolved', resolved_at: '2026-07-01' } : p));
      setRewards(prev => {
        if (prev.some(r => r.action_id === 'upload_financials')) return prev;
        return [...prev, 
          { reward_id: 'r_fin', msme_id: 'acme-1', action_id: 'upload_financials', reward_points: 4, linked_metric: 'documentReadiness', reason: 'Audited Financial Statements uploaded', created_at: '2026-07-01' }
        ];
      });
      setActions(prev => prev.map(a => a.action_type === 'dossier' ? { ...a, completion_status: 'Completed' } : a));
      addNotification("🎉 Audited Financials Uploaded! Missing financials penalty resolved. (+12 points)");
    }

    setTimeout(() => {
      setDocuments(currDocs => {
        const hasHighOverdue = currDocs.some(d => (d.id === 'udyam' || d.id === 'gst_return') && d.status !== 'Complete');
        if (!hasHighOverdue) {
          setPenalties(prev => prev.map(p => p.penalty_id === 'p_action_overdue' ? { ...p, status: 'Resolved', resolved_at: '2026-07-01' } : p));
        }
        return currDocs;
      });
    }, 100);
  };

  // Resolving Action items
  const resolveAction = (actionId: string, evidenceUrl?: string) => {
    setActions(prev => prev.map(a => a.action_id === actionId ? { ...a, completion_status: 'Completed', evidence_url: evidenceUrl || 'simulated_evidence.pdf' } : a));
    
    const task = actions.find(a => a.action_id === actionId);
    if (!task) return;

    addAuditLog('Owner', `Action Item: ${task.text}`, 'Complete');

    setRewards(prev => [
      ...prev,
      { reward_id: `r_act_${actionId}`, msme_id: 'acme-1', action_id: `complete_${actionId}`, reward_points: 3, linked_metric: 'actionCompletion', reason: `Completed action: ${task.text}`, created_at: '2026-07-01' }
    ]);

    if (task.action_type === 'udyam') {
      setDocuments(prev => prev.map(d => d.id === 'udyam' ? { ...d, status: 'Complete', expiry: undefined } : d));
      setPenalties(prev => prev.map(p => p.penalty_id === 'p_udyam' ? { ...p, status: 'Resolved', resolved_at: '2026-07-01' } : p));
      setRewards(prev => [
        ...prev,
        { reward_id: 'r_udyam_clear', msme_id: 'acme-1', action_id: 'clear_udyam_doc', reward_points: 4, linked_metric: 'documentReadiness', reason: 'Cleared expired Udyam certificate', created_at: '2026-07-01' }
      ]);
      addNotification("🎉 Udyam Certificate Renewed! Expired document penalty resolved. (+13 points)");
    }

    if (task.action_type === 'confirm_ledger') {
      addNotification("🎉 Ledger Reconciled! Advisor completed confirmation task. (+3 points)");
    }

    if (task.action_type === 'dso') {
      setPenalties(prev => prev.map(p => p.penalty_id === 'p_receivables' ? { ...p, status: 'Resolved', resolved_at: '2026-07-01' } : p));
      setRewards(prev => [
        ...prev,
        { reward_id: 'r_dso', msme_id: 'acme-1', action_id: 'reduce_dso', reward_points: 6, linked_metric: 'workingCapital', reason: 'DSO reduced using automated reminders', created_at: '2026-07-01' }
      ]);
      addNotification("🎉 DSO Reminders Scheduled! Receivables overdue penalty resolved. (+15 points)");
    }

    setTimeout(() => {
      setActions(currentActions => {
        const highPending = currentActions.some(a => a.priority === 'High' && a.completion_status === 'Pending');
        if (!highPending) {
          setPenalties(prev => prev.map(p => p.penalty_id === 'p_action_overdue' ? { ...p, status: 'Resolved', resolved_at: '2026-07-01' } : p));
        }
        return currentActions;
      });
    }, 100);
  };

  // Toggle Sharing Consent
  const toggleConsent = (partnerId: string, scope?: string) => {
    setConsents(prev => prev.map(c => {
      if (c.partnerId === partnerId) {
        const nextState = !c.active;
        addAuditLog('Owner', `${c.partnerName} sharing configuration`, nextState ? 'Consent Granted' : 'Consent Revoked');
        return { ...c, active: nextState };
      }
      return c;
    }));
  };

  // Advisor Verify Client files
  const triggerAdvisorVerify = (docId: string) => {
    setDocuments(prev => prev.map(d => d.id === docId ? { ...d, verifiedByAdvisor: true } : d));
    addAuditLog('Advisor', `Verified document: ${docId}`, 'Verify');
    
    setRewards(prev => {
      if (prev.some(r => r.action_id === `advisor_verify_${docId}`)) return prev;
      return [
        ...prev,
        { reward_id: `r_adv_${docId}`, msme_id: 'acme-1', action_id: `advisor_verify_${docId}`, reward_points: 5, linked_metric: 'complianceConsistency', reason: `Advisor verified ${docId} compliance`, created_at: '2026-07-01' }
      ];
    });

    addNotification(`💼 Advisor verified document lockers for "${docId}"! Trust score boosted. (+5 points)`);
  };

  // Update Debt Registry
  const updateDebtRegistry = (occ: number, od: number, wc: number) => {
    addAuditLog('Owner', 'Debt registry records updated', 'Update');
    
    setPenalties(prev => prev.map(p => p.penalty_id === 'p_data_fresh' ? { ...p, status: 'Resolved', resolved_at: '2026-07-01' } : p));
    setRewards(prev => {
      if (prev.some(r => r.action_id === 'update_debt')) return prev;
      return [
        ...prev,
        { reward_id: 'r_debt', msme_id: 'acme-1', action_id: 'update_debt', reward_points: 5, linked_metric: 'dataFreshness', reason: 'Debt details updated in registry', created_at: '2026-07-01' }
      ];
    });

    setActions(prev => prev.map(a => a.action_type === 'debt' ? { ...a, completion_status: 'Completed' } : a));
    addNotification("🎉 Debt Registry Refreshed! Staleness penalty resolved. (+10 points)");
  };

  // Complete Monthly review streak
  const completeMonthlyReview = () => {
    setReviewStreak(prev => prev + 1);
    setRewards(prev => [
      ...prev,
      { reward_id: `r_streak_${Date.now()}`, msme_id: 'acme-1', action_id: 'monthly_review', reward_points: 2, linked_metric: 'actionCompletion', reason: 'Completed monthly readiness audit review', created_at: '2026-07-01' }
    ]);
    addNotification("🎉 Monthly Monitoring Review complete! Streak increased! (+2 points)");
  };

  // SIMULATORS FOR FLOATING CONTROL PANEL

  const simulateGSTOutdate = () => {
    setDocuments(prev => prev.map(d => d.id === 'gst_return' ? { ...d, status: 'Missing', fileName: undefined } : d));
    setPenalties(prev => prev.map(p => p.penalty_id === 'p_gst' ? { ...p, status: 'Active', resolved_at: null } : p));
    setRewards(prev => prev.filter(r => r.action_id !== 'upload_gst' && r.action_id !== 'clear_gst_doc'));
    setActions(prev => prev.map(a => a.action_type === 'gst' ? { ...a, completion_status: 'Pending' } : a));
    setPenalties(prev => prev.map(p => p.penalty_id === 'p_action_overdue' ? { ...p, status: 'Active', resolved_at: null } : p));
    addNotification("⚠️ Simulator: Injected missing GST data (GSTR-3B May 2026). Score penalty active (-7 pts).");
  };

  const simulateBankStatementOutdate = () => {
    setDocuments(prev => prev.map(d => d.id === 'bank_statement' ? { ...d, status: 'Expired', expiry: '2026-06-30' } : d));
    
    setPenalties(prev => {
      if (prev.some(p => p.penalty_id === 'p_bank_outdated')) return prev.map(p => p.penalty_id === 'p_bank_outdated' ? { ...p, status: 'Active' } : p);
      return [
        ...prev,
        { penalty_id: 'p_bank_outdated', msme_id: 'acme-1', penalty_type: 'Data Outdated', linked_metric: 'dataFreshness', penalty_points: -5, severity: 'Medium', reason: 'Bank Statement older than 90 days', correction_action: 'Upload latest bank statement', created_at: '2026-07-01', resolved_at: null, status: 'Active' }
      ];
    });
    setRewards(prev => prev.filter(r => r.action_id !== 'upload_bank'));
    addNotification("⚠️ Simulator: Injected outdated Bank Statement (>90 days). Score penalty active (-5 pts).");
  };

  const simulateReceivablesOverdue = (overdue: boolean) => {
    setProfile(prev => ({ ...prev, receivablesOverdueDays: overdue ? 65 : 30 }));
    setPenalties(prev => prev.map(p => p.penalty_id === 'p_receivables' ? { ...p, status: overdue ? 'Active' : 'Resolved', resolved_at: overdue ? null : '2026-07-01' } : p));
    
    if (overdue) {
      setRewards(prev => prev.filter(r => r.action_id !== 'reduce_dso'));
      setActions(prev => prev.map(a => a.action_type === 'dso' ? { ...a, completion_status: 'Pending' } : a));
      addNotification("⚠️ Simulator: Receivables aged beyond 60 days. Overdue penalty active (-6 pts).");
    } else {
      setRewards(prev => [
        ...prev,
        { reward_id: 'r_dso_sim', msme_id: 'acme-1', action_id: 'reduce_dso', reward_points: 6, linked_metric: 'workingCapital', reason: 'Receivables overdue resolved', created_at: '2026-07-01' }
      ]);
      setActions(prev => prev.map(a => a.action_type === 'dso' ? { ...a, completion_status: 'Completed' } : a));
      addNotification("🎉 Simulator: Overdue receivables cleared. Score restored! (+6 pts)");
    }
  };

  const simulateHighEMI = (high: boolean) => {
    setProfile(prev => ({ ...prev, existingEMI: high ? 80000 : 45000 }));
    
    if (high) {
      setPenalties(prev => {
        if (prev.some(p => p.penalty_id === 'p_emi_capacity')) return prev.map(p => p.penalty_id === 'p_emi_capacity' ? { ...p, status: 'Active' } : p);
        return [
          ...prev,
          { penalty_id: 'p_emi_capacity', msme_id: 'acme-1', penalty_type: 'Leverage Risk', linked_metric: 'debtPressure', penalty_points: -10, severity: 'Critical', reason: 'EMI exceeds safe capacity (exceeds 45% ceiling)', correction_action: 'Restructure outstanding debt limits', created_at: '2026-07-01', resolved_at: null, status: 'Active' }
        ];
      });
      addNotification("⚠️ Simulator: EMI debt obligation exceeds safe capacity ceiling. Critical penalty active (-10 pts).");
    } else {
      setPenalties(prev => prev.map(p => p.penalty_id === 'p_emi_capacity' ? { ...p, status: 'Resolved', resolved_at: '2026-07-01' } : p));
      addNotification("🎉 Simulator: EMI obligations returned to safe margins. Score restored! (+10 pts)");
    }
  };

  const simulateAddCohortMSME = (name: string, district: string, cluster: string, sector: string) => {
    setCohort(prev => [
      ...prev,
      { name, district, cluster, sector, score: 45, risk: 'Medium' }
    ]);
    addNotification(`🏢 Simulator: Onboarded new MSME "${name}" via QR Campaign! Initial score: 45.`);
  };

  return (
    <ReadinessContext.Provider value={{
      activeRole, setActiveRole,
      profile, setProfile,
      score, band, subscores,
      penalties, rewards, scoreHistory,
      documents, actions, consents, auditLogs,
      uploadDocument, resolveAction, toggleConsent, addAuditLog, triggerAdvisorVerify, updateDebtRegistry,
      simulateGSTOutdate, simulateBankStatementOutdate, simulateReceivablesOverdue, simulateHighEMI, simulateAddCohortMSME,
      cohort, completeMonthlyReview, reviewStreak,
      notifications, clearNotifications, addNotification
    }}>
      {children}
    </ReadinessContext.Provider>
  );
};

export const useReadiness = () => {
  const context = useContext(ReadinessContext);
  if (!context) throw new Error('useReadiness must be used within a ReadinessProvider');
  return context;
};

export default ReadinessContext;
