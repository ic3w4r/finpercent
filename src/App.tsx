import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import ErrorBoundary from './components/ui/ErrorBoundary';

// Primary Instant Pages
import LandingPage from './pages/LandingPage';
import OverviewPage from './pages/OverviewPage';
import MSMEReadinessPage from './pages/MSMEReadinessPage';
import BusinessHealthPage from './pages/BusinessHealthPage';
import ActionPlanPage from './pages/ActionPlanPage';

// Financial Intelligence (Lazy loaded for optimal bundle throughput)
const CashFlowPage = lazy(() => import('./pages/financial/CashFlowPage'));
const DebtEMIPage = lazy(() => import('./pages/financial/DebtEMIPage'));
const WorkingCapitalPage = lazy(() => import('./pages/financial/WorkingCapitalPage'));
const ExpenseLeakagePage = lazy(() => import('./pages/financial/ExpenseLeakagePage'));
const STOPMethodPage = lazy(() => import('./pages/financial/STOPMethodPage'));
const WorkingCapitalDiagnostic = lazy(() => import('./pages/financial/WorkingCapitalDiagnostic'));
const KakeiboMethodPage = lazy(() => import('./pages/KakeiboMethodPage'));
const KakeiboMethodGuidePage = lazy(() => import('./pages/KakeiboMethodGuidePage'));
const NWSMethodGuidePage = lazy(() => import('./pages/NWSMethodGuidePage'));
const STOPMethodGuidePage = lazy(() => import('./pages/STOPMethodGuidePage'));
const MethodDetails = lazy(() => import('./components/details/MethodDetails'));

// Credit Readiness
const CreditReadinessReportPage = lazy(() => import('./pages/credit/CreditReadinessReportPage'));
const DocumentChecklistPage = lazy(() => import('./pages/credit/DocumentChecklistPage'));
const LoanCapacityPage = lazy(() => import('./pages/credit/LoanCapacityPage'));
const RedFlagsPage = lazy(() => import('./pages/credit/RedFlagsPage'));
const ImprovementPlanPage = lazy(() => import('./pages/credit/ImprovementPlanPage'));
const CreditReadyFile = lazy(() => import('./pages/credit/CreditReadyFile'));

// Dashboards & Heavy Modules
const InstitutionDashboardPage = lazy(() => import('./pages/institution/InstitutionDashboardPage'));
const BankOfficerPage = lazy(() => import('./pages/bank/BankOfficerPage'));
const AdvisorDashboardPage = lazy(() => import('./pages/advisor/AdvisorDashboardPage'));
const ProviderDashboardPage = lazy(() => import('./pages/provider/ProviderDashboardPage'));
const AICXOSuitePage = lazy(() => import('./pages/AICXOSuitePage'));
const AIPromptSandboxPage = lazy(() => import('./pages/AIPromptSandboxPage'));
const AutomatedBankingPage = lazy(() => import('./pages/AutomatedBankingPage'));
const CustomERPNextModulePage = lazy(() => import('./pages/erp/CustomERPNextModulePage'));
const SuperFeaturesPage = lazy(() => import('./pages/SuperFeaturesPage'));
const StockMarketPage = lazy(() => import('./pages/StockMarketPage'));
const ExplorePage = lazy(() => import('./pages/ExplorePage'));
const StatsPage = lazy(() => import('./pages/StatsPage'));
const CompanyStatusPage = lazy(() => import('./pages/CompanyStatusPage'));

// Debt Management
const DebtRepaymentPage = lazy(() => import('./pages/DebtRepaymentPage'));
const DebtOCCPage = lazy(() => import('./pages/DebtOCCPage'));
const DebtODPage = lazy(() => import('./pages/DebtODPage'));
const DebtWCPage = lazy(() => import('./pages/DebtWCPage'));

// Capital Access & Pooling
const InvestmentPoolingPage = lazy(() => import('./pages/InvestmentPoolingPage'));

// Network & Support
const WorkshopsPage = lazy(() => import('./pages/network/WorkshopsPage'));
const SupportPage = lazy(() => import('./pages/SupportPage'));

// Account & Settings
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const CompanyProfilePage = lazy(() => import('./pages/account/CompanyProfilePage'));
const DataPermissionsPage = lazy(() => import('./pages/account/DataPermissionsPage'));
const SecurityPage = lazy(() => import('./pages/account/SecurityPage'));

// Advanced
const MarketSignalsPage = lazy(() => import('./pages/advanced/MarketSignalsPage'));

// Finning Circle Pages
const FinningCircleDashboard = lazy(() => import('./pages/finning-circle/FinningCircleDashboard'));
const FinningCircleLive = lazy(() => import('./pages/finning-circle/FinningCircleLive'));
const FinningCircleProduct = lazy(() => import('./pages/finning-circle/FinningCircleProduct'));
const FinningCircleDiscovery = lazy(() => import('./pages/finning-circle/FinningCircleDiscovery'));
const FinningCircleTimeline = lazy(() => import('./pages/finning-circle/FinningCircleTimeline'));
const FinningCircleVenue = lazy(() => import('./pages/finning-circle/FinningCircleVenue'));
const FinningCircleWorkshops = lazy(() => import('./pages/finning-circle/FinningCircleWorkshops'));
const FinningCircleGateway = lazy(() => import('./pages/finning-circle/FinningCircleGateway'));
const GSTOnboarding = lazy(() => import('./pages/finning-circle/GSTOnboarding'));
const ShowcaseBuilder = lazy(() => import('./pages/finning-circle/ShowcaseBuilder'));
const SMEPassport = lazy(() => import('./pages/finning-circle/SMEPassport'));
const FinningCircleMarketplace = lazy(() => import('./pages/finning-circle/FinningCircleMarketplace'));

// AI Operations Officer (Finning Biz)
const AgentAuthorizationHierarchyPage = lazy(() => import('./pages/finning-biz/AgentAuthorizationHierarchyPage'));
const AIAgentMarketplacePage = lazy(() => import('./pages/finning-biz/AIAgentMarketplacePage'));
const JointAgentFlowVisualizationPage = lazy(() => import('./pages/finning-biz/JointAgentFlowVisualizationPage'));
const AuditorAgentWorkflowPage = lazy(() => import('./pages/finning-biz/AuditorAgentWorkflowPage'));
const JointMultiAgentReportPage = lazy(() => import('./pages/finning-biz/JointMultiAgentReportPage'));

// Contexts
import { OnboardingProvider } from './contexts/OnboardingContext';
import { DebtProvider } from './contexts/DebtContext';
import { ReadinessProvider } from './contexts/ReadinessContext';
import { RolePerspectiveProvider } from './contexts/RolePerspectiveContext';
import { NavigationProvider, useNavigation } from './contexts/NavigationContext';

import './App.css';

const PageLoadingFallback = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 space-y-3">
    <div className="w-8 h-8 rounded-full border-2 border-neutral-200 dark:border-neutral-800 border-t-neutral-900 dark:border-t-white animate-spin" />
    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Loading module...</span>
  </div>
);

function AppContent() {
  const location = useLocation();
  const { isSidebarOpen } = useNavigation();
  const isLanding = location.pathname === '/';

  return (
    <div className="flex min-h-screen bg-primary-50 dark:bg-gray-900 text-[#111111] dark:text-gray-100">
      <Navigation />
      <main className={`flex-1 transition-all duration-300 ${isLanding ? '' : (isSidebarOpen ? 'md:ml-64' : 'ml-0')}`}>
        <ErrorBoundary>
          <Suspense fallback={<PageLoadingFallback />}>
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
              <Route path="/financial/diagnostic" element={<WorkingCapitalDiagnostic />} />

              {/* Method Guides & Breakdowns */}
              <Route path="/methods/nws" element={<NWSMethodGuidePage />} />
              <Route path="/methods/stop" element={<STOPMethodGuidePage />} />
              <Route path="/methods/kakeibo" element={<KakeiboMethodGuidePage />} />
              <Route path="/methods/kakeibo/dashboard" element={<KakeiboMethodPage />} />
              <Route path="/kakeibo" element={<KakeiboMethodPage />} />
              <Route path="/method/:method/:category" element={<MethodDetails />} />
              <Route path="/methods/:method/:category" element={<MethodDetails />} />
              <Route path="/methods/stop/savings" element={<MethodDetails />} />
              <Route path="/methods/stop/taxes" element={<MethodDetails />} />
              <Route path="/methods/stop/operations" element={<MethodDetails />} />
              <Route path="/methods/stop/profit" element={<MethodDetails />} />

              {/* Credit Readiness */}
              <Route path="/credit/readiness-report" element={<CreditReadinessReportPage />} />
              <Route path="/credit/document-checklist" element={<DocumentChecklistPage />} />
              <Route path="/credit/loan-capacity" element={<LoanCapacityPage />} />
              <Route path="/credit/red-flags" element={<RedFlagsPage />} />
              <Route path="/credit/improvement-plan" element={<ImprovementPlanPage />} />
              <Route path="/credit/ready-file" element={<CreditReadyFile />} />

              {/* Dashboards */}
              <Route path="/institution/portfolio" element={<InstitutionDashboardPage />} />
              <Route path="/bank/borrower-summary" element={<BankOfficerPage />} />
              <Route path="/advisor/dashboard" element={<AdvisorDashboardPage />} />
              <Route path="/provider/dashboard" element={<ProviderDashboardPage />} />
              <Route path="/super-features" element={<SuperFeaturesPage />} />
              <Route path="/stock-market" element={<StockMarketPage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/stats" element={<StatsPage />} />
              <Route path="/company-status" element={<CompanyStatusPage />} />

              {/* Debt Management */}
              <Route path="/debt-repayment" element={<DebtRepaymentPage />} />
              <Route path="/debt/occ" element={<DebtOCCPage />} />
              <Route path="/debt/od" element={<DebtODPage />} />
              <Route path="/debt/wc" element={<DebtWCPage />} />

              {/* AI-CXO Suite / Agent Copilot Routes */}
              <Route path="/ai-scenario-landing" element={<AIPromptSandboxPage />} />
              <Route path="/ai-cxo" element={<Navigate to="/ai-cxo/dashboard" replace />} />
              <Route path="/ai-cxo/dashboard" element={<AICXOSuitePage initialTab="dashboard" />} />
              <Route path="/ai-cxo/decision-engine" element={<AICXOSuitePage initialTab="decision-engine" />} />
              <Route path="/ai-cxo/console" element={<AICXOSuitePage initialTab="console" />} />
              <Route path="/ai-cxo/cfo" element={<AICXOSuitePage initialTab="cfo" />} />
              <Route path="/ai-cxo/credit" element={<AICXOSuitePage initialTab="credit" />} />
              <Route path="/ai-cxo/operations" element={<AICXOSuitePage initialTab="operations" />} />
              <Route path="/ai-cxo/growth" element={<AICXOSuitePage initialTab="growth" />} />
              <Route path="/automated-banking" element={<AutomatedBankingPage />} />
              <Route path="/business-erp" element={<CustomERPNextModulePage />} />
              <Route path="/erp-module" element={<CustomERPNextModulePage />} />
              <Route path="/erpnext" element={<CustomERPNextModulePage />} />

              {/* AI Operations Officer Sub-routes */}
              <Route path="/ai-cxo/operations-officer" element={<Navigate to="/ai-cxo/operations-officer/flow" replace />} />
              <Route path="/ai-cxo/operations-officer/authorization" element={<AgentAuthorizationHierarchyPage />} />
              <Route path="/ai-cxo/operations-officer/marketplace" element={<AIAgentMarketplacePage />} />
              <Route path="/ai-cxo/operations-officer/flow" element={<JointAgentFlowVisualizationPage />} />
              <Route path="/ai-cxo/operations-officer/auditor" element={<AuditorAgentWorkflowPage />} />
              <Route path="/ai-cxo/operations-officer/report" element={<JointMultiAgentReportPage />} />

              {/* Legacy Finning Biz redirects */}
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
              <Route path="/investment-pooling" element={<InvestmentPoolingPage initialTab="asset" />} />
              <Route path="/investment-pooling/asset" element={<InvestmentPoolingPage initialTab="asset" />} />
              <Route path="/investment-pooling/operations" element={<InvestmentPoolingPage initialTab="operations" />} />

              {/* Network & Support */}
              <Route path="/network/workshops" element={<WorkshopsPage />} />
              <Route path="/network/trade-centre" element={<Navigate to="/finning-circle/marketplace" replace />} />
              <Route path="/support" element={<SupportPage />} />

              {/* Finning Circle (TradeStream) */}
              <Route path="/finning-circle" element={<Navigate to="/finning-circle/gateway" replace />} />
              <Route path="/finning-circle/gateway" element={<FinningCircleGateway />} />
              <Route path="/finning-circle/onboard" element={<GSTOnboarding />} />
              <Route path="/finning-circle/builder" element={<ShowcaseBuilder />} />
              <Route path="/finning-circle/dashboard" element={<FinningCircleDashboard />} />
              <Route path="/finning-circle/live" element={<FinningCircleLive />} />
              <Route path="/finning-circle/product" element={<FinningCircleProduct />} />
              <Route path="/finning-circle/discovery" element={<FinningCircleDiscovery />} />
              <Route path="/finning-circle/timeline" element={<FinningCircleTimeline />} />
              <Route path="/finning-circle/venue" element={<FinningCircleVenue />} />
              <Route path="/finning-circle/workshops" element={<FinningCircleWorkshops />} />
              <Route path="/finning-circle/passport" element={<SMEPassport />} />
              <Route path="/finning-circle/marketplace" element={<FinningCircleMarketplace />} />

              {/* Legacy redirects for old network/msme-community paths */}
              <Route path="/network/msme-community" element={<Navigate to="/finning-circle/dashboard" replace />} />
              <Route path="/network/msme-community/dashboard" element={<Navigate to="/finning-circle/dashboard" replace />} />
              <Route path="/network/msme-community/live" element={<Navigate to="/finning-circle/live" replace />} />
              <Route path="/network/msme-community/product" element={<Navigate to="/finning-circle/product" replace />} />
              <Route path="/network/msme-community/discovery" element={<Navigate to="/finning-circle/discovery" replace />} />
              <Route path="/network/msme-community/timeline" element={<Navigate to="/finning-circle/timeline" replace />} />
              <Route path="/network/msme-community/venue" element={<Navigate to="/finning-circle/venue" replace />} />

              {/* Account Settings */}
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/company-profile" element={<CompanyProfilePage />} />
              <Route path="/data-permissions" element={<DataPermissionsPage />} />
              <Route path="/security" element={<SecurityPage />} />

              {/* Advanced */}
              <Route path="/advanced/market-signals" element={<MarketSignalsPage />} />

              {/* Fallbacks */}
              <Route path="*" element={<Navigate to="/overview" replace />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  );
}

function App() {
  return (
    <RolePerspectiveProvider>
      <ReadinessProvider>
        <DebtProvider>
          <OnboardingProvider>
            <NavigationProvider>
              <Router>
                <AppContent />
              </Router>
            </NavigationProvider>
          </OnboardingProvider>
        </DebtProvider>
      </ReadinessProvider>
    </RolePerspectiveProvider>
  );
}

export default App;