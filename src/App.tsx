import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';

// Primary Pages
import LandingPage from './pages/LandingPage';
import OverviewPage from './pages/OverviewPage';
import MSMEReadinessPage from './pages/MSMEReadinessPage';
import BusinessHealthPage from './pages/BusinessHealthPage';
import ActionPlanPage from './pages/ActionPlanPage';

// Financial Intelligence
import CashFlowPage from './pages/financial/CashFlowPage';
import DebtEMIPage from './pages/financial/DebtEMIPage';
import WorkingCapitalPage from './pages/financial/WorkingCapitalPage';
import ExpenseLeakagePage from './pages/financial/ExpenseLeakagePage';
import STOPMethodPage from './pages/financial/STOPMethodPage';

// Credit Readiness
import CreditReadinessReportPage from './pages/credit/CreditReadinessReportPage';
import DocumentChecklistPage from './pages/credit/DocumentChecklistPage';
import LoanCapacityPage from './pages/credit/LoanCapacityPage';
import RedFlagsPage from './pages/credit/RedFlagsPage';
import ImprovementPlanPage from './pages/credit/ImprovementPlanPage';

// Dashboards
import InstitutionDashboardPage from './pages/institution/InstitutionDashboardPage';
import BankOfficerPage from './pages/bank/BankOfficerPage';
import AICXOSuitePage from './pages/AICXOSuitePage';

// Network & Support
import WorkshopsPage from './pages/network/WorkshopsPage';
import TradeCentrePage from './pages/network/TradeCentrePage';
import SupportPage from './pages/SupportPage';

// Account & Settings
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import CompanyProfilePage from './pages/account/CompanyProfilePage';
import DataPermissionsPage from './pages/account/DataPermissionsPage';
import SecurityPage from './pages/account/SecurityPage';

// Advanced
import MarketSignalsPage from './pages/advanced/MarketSignalsPage';
import InvestmentPoolingPage from './pages/InvestmentPoolingPage';

// Finning Circle Pages
import FinningCircleDashboard from './pages/finning-circle/FinningCircleDashboard';
import FinningCircleLive from './pages/finning-circle/FinningCircleLive';
import FinningCircleProduct from './pages/finning-circle/FinningCircleProduct';
import FinningCircleDiscovery from './pages/finning-circle/FinningCircleDiscovery';
import FinningCircleTimeline from './pages/finning-circle/FinningCircleTimeline';
import FinningCircleVenue from './pages/finning-circle/FinningCircleVenue';

// AI Operations Officer Pages (Finning Biz)
import AgentAuthorizationHierarchyPage from './pages/finning-biz/AgentAuthorizationHierarchyPage';
import AIAgentMarketplacePage from './pages/finning-biz/AIAgentMarketplacePage';
import JointAgentFlowVisualizationPage from './pages/finning-biz/JointAgentFlowVisualizationPage';
import AuditorAgentWorkflowPage from './pages/finning-biz/AuditorAgentWorkflowPage';
import JointMultiAgentReportPage from './pages/finning-biz/JointMultiAgentReportPage';

// Contexts
import { OnboardingProvider } from './contexts/OnboardingContext';
import { DebtProvider } from './contexts/DebtContext';
import './App.css';

function AppContent() {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <div className="flex min-h-screen bg-primary-50 dark:bg-gray-900">
      <Navigation />
      <main className={`flex-1 transition-all duration-300 ${isLanding ? '' : 'md:ml-64'}`}>
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Command Center */}
          <Route path="/overview" element={<OverviewPage />} />
          <Route path="/msme-readiness" element={<MSMEReadinessPage />} />
          <Route path="/business-health" element={<BusinessHealthPage />} />
          <Route path="/action-plan" element={<ActionPlanPage />} />

          {/* Financial Intelligence */}
          <Route path="/financial/cash-flow" element={<CashFlowPage />} />
          <Route path="/financial/debt-emi" element={<DebtEMIPage />} />
          <Route path="/financial/working-capital" element={<WorkingCapitalPage />} />
          <Route path="/financial/expense-leakage" element={<ExpenseLeakagePage />} />
          <Route path="/financial/stop-method" element={<STOPMethodPage />} />

          {/* Credit Readiness */}
          <Route path="/credit/readiness-report" element={<CreditReadinessReportPage />} />
          <Route path="/credit/document-checklist" element={<DocumentChecklistPage />} />
          <Route path="/credit/loan-capacity" element={<LoanCapacityPage />} />
          <Route path="/credit/red-flags" element={<RedFlagsPage />} />
          <Route path="/credit/improvement-plan" element={<ImprovementPlanPage />} />

          {/* Dashboards */}
          <Route path="/institution/portfolio" element={<InstitutionDashboardPage />} />
          <Route path="/bank/borrower-summary" element={<BankOfficerPage />} />
          
          {/* AI-CXO Suite / Agent Copilot Routes */}
          <Route path="/ai-cxo" element={<Navigate to="/ai-cxo/dashboard" replace />} />
          <Route path="/ai-cxo/dashboard" element={<AICXOSuitePage initialTab="dashboard" />} />
          <Route path="/ai-cxo/console" element={<AICXOSuitePage initialTab="console" />} />
          <Route path="/ai-cxo/cfo" element={<AICXOSuitePage initialTab="cfo" />} />
          <Route path="/ai-cxo/credit" element={<AICXOSuitePage initialTab="credit" />} />
          <Route path="/ai-cxo/operations" element={<AICXOSuitePage initialTab="operations" />} />
          <Route path="/ai-cxo/growth" element={<AICXOSuitePage initialTab="growth" />} />

          {/* AI Operations Officer Sub-routes */}
          <Route path="/ai-cxo/operations-officer" element={<Navigate to="/ai-cxo/operations-officer/flow" replace />} />
          <Route path="/ai-cxo/operations-officer/authorization" element={<AgentAuthorizationHierarchyPage />} />
          <Route path="/ai-cxo/operations-officer/marketplace" element={<AIAgentMarketplacePage />} />
          <Route path="/ai-cxo/operations-officer/flow" element={<JointAgentFlowVisualizationPage />} />
          <Route path="/ai-cxo/operations-officer/auditor" element={<AuditorAgentWorkflowPage />} />
          <Route path="/ai-cxo/operations-officer/report" element={<JointMultiAgentReportPage />} />

          {/* Legacy redirects */}
          <Route path="/finning-biz" element={<Navigate to="/ai-cxo/operations-officer/flow" replace />} />
          <Route path="/finning-biz/authorization" element={<Navigate to="/ai-cxo/operations-officer/authorization" replace />} />
          <Route path="/finning-biz/marketplace" element={<Navigate to="/ai-cxo/operations-officer/marketplace" replace />} />
          <Route path="/finning-biz/flow" element={<Navigate to="/ai-cxo/operations-officer/flow" replace />} />
          <Route path="/finning-biz/auditor" element={<Navigate to="/ai-cxo/operations-officer/auditor" replace />} />
          <Route path="/finning-biz/report" element={<Navigate to="/ai-cxo/operations-officer/report" replace />} />

          {/* Capital Access Intelligence (Asset Dossier & Operations) */}
          <Route path="/capital-access-intelligence" element={<Navigate to="/capital-access-intelligence/asset" replace />} />
          <Route path="/capital-access-intelligence/asset" element={<InvestmentPoolingPage initialTab="asset" />} />
          <Route path="/capital-access-intelligence/operations" element={<InvestmentPoolingPage initialTab="operations" />} />

          {/* Network & Support */}
          <Route path="/network/workshops" element={<WorkshopsPage />} />
          <Route path="/network/trade-centre" element={<TradeCentrePage />} />
          <Route path="/support" element={<SupportPage />} />

          {/* MSME Community (Finning Circle rebranding) */}
          <Route path="/network/msme-community" element={<Navigate to="/network/msme-community/dashboard" replace />} />
          <Route path="/network/msme-community/dashboard" element={<FinningCircleDashboard />} />
          <Route path="/network/msme-community/live" element={<FinningCircleLive />} />
          <Route path="/network/msme-community/product" element={<FinningCircleProduct />} />
          <Route path="/network/msme-community/discovery" element={<FinningCircleDiscovery />} />
          <Route path="/network/msme-community/timeline" element={<FinningCircleTimeline />} />
          <Route path="/network/msme-community/venue" element={<FinningCircleVenue />} />

          {/* Account Settings */}
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/company-profile" element={<CompanyProfilePage />} />
          <Route path="/data-permissions" element={<DataPermissionsPage />} />
          <Route path="/security" element={<SecurityPage />} />

          {/* Advanced */}
          <Route path="/advanced/market-signals" element={<MarketSignalsPage />} />

          {/* Fallbacks */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <DebtProvider>
      <OnboardingProvider>
        <Router>
          <AppContent />
        </Router>
      </OnboardingProvider>
    </DebtProvider>
  );
}

export default App;