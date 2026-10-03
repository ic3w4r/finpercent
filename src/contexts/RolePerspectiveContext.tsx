import React, { createContext, useContext, useState, useMemo } from 'react';
import { safeGetJSON, safeSetJSON } from '../utils/storage';

export type RolePerspective = 'owner' | 'cfo' | 'coo' | 'auditor' | 'subordinate';

export interface RoleConfig {
  id: RolePerspective;
  name: string;
  title: string;
  company: string;
  focusMetric: string;
  roleBadge: string;
  allowedActions: string[];
  description: string;
}

export interface DecisionAuditRecord {
  id: string;
  item: string;
  detail: string;
  type: string;
  owner: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'pending' | 'completed';
  signedBy?: string;
  signedRole?: string;
  signedAt?: string;
  hash?: string;
}

export interface ActiveSimulationScenario {
  creditDays: number;
  orderValue: number;
  supplierDays: number;
  title: string;
  description: string;
}

export const ROLE_DEFINITIONS: Record<RolePerspective, RoleConfig> = {
  owner: {
    id: 'owner',
    name: 'Aiswaran Ganapraj',
    title: 'Managing Director / Owner',
    company: 'Apex Engineering (FY 2025-26)',
    focusMetric: 'Working Capital & Growth Runway',
    roleBadge: 'Executive Authority',
    allowedActions: ['Full Approval', 'Capital Allocation', 'Strategic Override', 'Lender Review', 'Master Schema Edit'],
    description: 'Executive oversight, capital allocation authority, and cross-departmental approval rights.'
  },
  cfo: {
    id: 'cfo',
    name: 'Suresh Ramanathan',
    title: 'Chief Financial Officer',
    company: 'Apex Engineering (FY 2025-26)',
    focusMetric: 'DSO Aging, Treasury & Tax Covenant',
    roleBadge: 'Treasury & Audit',
    allowedActions: ['Payment Runs', 'Overdraft Optimization', 'GSTR-3B Signoff', 'Reconciliation', 'Credit Limit Override'],
    description: 'Double-entry general ledger, payment execution, tax reconciliation, and liquidity management.'
  },
  coo: {
    id: 'coo',
    name: 'Kavitha Sundaram',
    title: 'Chief Operating Officer',
    company: 'Apex Engineering (FY 2025-26)',
    focusMetric: 'Supplier Lead Times & Inventory Reorder',
    roleBadge: 'Operations & Procurement',
    allowedActions: ['PO Release', 'Factory Stock Reorder', 'Vendor Term Renegotiation', 'BOM Modification'],
    description: 'Manufacturing pipeline, stock valuation, supplier contracts, and Bill of Materials management.'
  },
  auditor: {
    id: 'auditor',
    name: 'CA Rajeshwari Iyer',
    title: 'Statutory Auditor & Tax Partner',
    company: 'Iyer & Associates LLP',
    focusMetric: 'Statutory Compliance & Bank Dossier',
    roleBadge: 'External Auditor',
    allowedActions: ['Audit Certification', 'GST Filing Validate', 'Notary Verify', 'Tax Lock'],
    description: 'Independent verification of journal entries, statutory tax match, and immutable audit trails.'
  },
  subordinate: {
    id: 'subordinate',
    name: 'Vikram Mehta',
    title: 'Senior Sales & Receivables Exec',
    company: 'Apex Engineering (FY 2025-26)',
    focusMetric: 'Debtor Follow-ups & Order Approvals',
    roleBadge: 'Sales Subordinate',
    allowedActions: ['Draft Invoice', 'Customer Dispute Log', 'Request Term Change', 'Create Quotation'],
    description: 'Front-line sales execution, customer order intake, and collection follow-up logging.'
  }
};

interface RolePerspectiveContextType {
  activeRole: RolePerspective;
  setActiveRole: (role: RolePerspective) => void;
  currentRoleConfig: RoleConfig;
  activeScenario: ActiveSimulationScenario;
  updateScenario: (partial: Partial<ActiveSimulationScenario>) => void;
  decisions: DecisionAuditRecord[];
  signDecision: (id: string) => void;
  isActionAuthorized: (actionName: string) => boolean;
}

const RolePerspectiveContext = createContext<RolePerspectiveContextType | undefined>(undefined);

const STORAGE_KEY_ROLE = 'finpercent_active_role';
const STORAGE_KEY_SCENARIO = 'finpercent_active_scenario';
const STORAGE_KEY_DECISIONS = 'finpercent_decisions_log';

export const RolePerspectiveProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeRole, setActiveRoleState] = useState<RolePerspective>(() => {
    return safeGetJSON<RolePerspective>(STORAGE_KEY_ROLE, 'owner');
  });

  const [activeScenario, setActiveScenarioState] = useState<ActiveSimulationScenario>(() => {
    return safeGetJSON<ActiveSimulationScenario>(STORAGE_KEY_SCENARIO, {
      creditDays: 75,
      orderValue: 4000000,
      supplierDays: 15,
      title: 'Zenith Industries ₹40L Order',
      description: '75-day customer credit with ₹15L raw materials procurement from NeoPack.'
    });
  });

  const [decisions, setDecisionsState] = useState<DecisionAuditRecord[]>(() => {
    return safeGetJSON<DecisionAuditRecord[]>(STORAGE_KEY_DECISIONS, [
      {
        id: 'w-1',
        item: 'Approve invoice INV-10240, Zenith Industries',
        detail: 'Due in 4 days • ₹8,75,000',
        type: 'Approval',
        owner: 'Aiswaran G.',
        priority: 'High',
        status: 'pending'
      },
      {
        id: 'w-2',
        item: 'Payment run for 14 suppliers',
        detail: 'August 2026 • due tomorrow',
        type: 'Payment',
        owner: 'Finance team',
        priority: 'Medium',
        status: 'pending'
      },
      {
        id: 'w-3',
        item: 'Pull forward 2 collections to hold the covenant floor',
        detail: 'Projected release: ₹32,00,000',
        type: 'Alert',
        owner: 'Treasury AI',
        priority: 'High',
        status: 'pending'
      }
    ]);
  });

  const setActiveRole = (role: RolePerspective) => {
    setActiveRoleState(role);
    safeSetJSON(STORAGE_KEY_ROLE, role);
  };

  const updateScenario = (partial: Partial<ActiveSimulationScenario>) => {
    setActiveScenarioState(prev => {
      const updated = { ...prev, ...partial };
      safeSetJSON(STORAGE_KEY_SCENARIO, updated);
      return updated;
    });
  };

  const currentRoleConfig = useMemo(() => ROLE_DEFINITIONS[activeRole], [activeRole]);

  const isActionAuthorized = (actionName: string): boolean => {
    if (activeRole === 'owner') return true;
    return currentRoleConfig.allowedActions.some(
      allowed => allowed.toLowerCase().includes(actionName.toLowerCase())
    );
  };

  const signDecision = (id: string) => {
    const timestamp = new Date().toISOString();
    const mockHash = `0x${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`;

    setDecisionsState(prev => {
      const updated = prev.map(dec => {
        if (dec.id === id) {
          return {
            ...dec,
            status: 'completed' as const,
            signedBy: currentRoleConfig.name,
            signedRole: currentRoleConfig.title,
            signedAt: timestamp,
            hash: mockHash
          };
        }
        return dec;
      });
      safeSetJSON(STORAGE_KEY_DECISIONS, updated);
      return updated;
    });
  };

  return (
    <RolePerspectiveContext.Provider
      value={{
        activeRole,
        setActiveRole,
        currentRoleConfig,
        activeScenario,
        updateScenario,
        decisions,
        signDecision,
        isActionAuthorized
      }}
    >
      {children}
    </RolePerspectiveContext.Provider>
  );
};

export function useRolePerspective(): RolePerspectiveContextType {
  const context = useContext(RolePerspectiveContext);
  if (!context) {
    throw new Error('useRolePerspective must be used within a RolePerspectiveProvider');
  }
  return context;
}
