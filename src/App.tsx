import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import DashboardPage from './pages/DashboardPage';
import ExplorePage from './pages/ExplorePage';
import StatsPage from './pages/StatsPage';
import SuperFeaturesPage from './pages/SuperFeaturesPage';
import StockMarketPage from './pages/StockMarketPage';
import InvestmentPoolingPage from './pages/InvestmentPoolingPage';
import FinningUnifiedPage from './pages/FinningUnifiedPage';
import TradeCentrePage from './pages/TradeCentrePage';
import SimulationToolPage from './pages/SimulationToolPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import CompanyStatusPage from './pages/CompanyStatusPage';
import DebtOCCPage from './pages/DebtOCCPage';
import DebtODPage from './pages/DebtODPage';
import DebtWCPage from './pages/DebtWCPage';
import STOPMethodPage from './pages/methods/STOPMethodPage';
import NWSMethodPage from './pages/methods/NWSMethodPage';
import KakeiboMethodPage from './pages/methods/KakeiboMethodPage';
import TaxStrategiesPage from './pages/methods/TaxStrategiesPage';
import OperationsGuidePage from './pages/methods/OperationsGuidePage';
import FinningCircleDashboard from './pages/finning-circle/FinningCircleDashboard';
import FinningCircleLive from './pages/finning-circle/FinningCircleLive';
import FinningCircleProduct from './pages/finning-circle/FinningCircleProduct';
import FinningCircleDiscovery from './pages/finning-circle/FinningCircleDiscovery';
import FinningCircleTimeline from './pages/finning-circle/FinningCircleTimeline';
import FinningCircleVenue from './pages/finning-circle/FinningCircleVenue';
import FinningCircleWorkshops from './pages/finning-circle/FinningCircleWorkshops';

// Finning Biz Routes
import AgentAuthorizationHierarchyPage from './pages/finning-biz/AgentAuthorizationHierarchyPage';
import AIAgentMarketplacePage from './pages/finning-biz/AIAgentMarketplacePage';
import JointAgentFlowVisualizationPage from './pages/finning-biz/JointAgentFlowVisualizationPage';
import AuditorAgentWorkflowPage from './pages/finning-biz/AuditorAgentWorkflowPage';
import JointMultiAgentReportPage from './pages/finning-biz/JointMultiAgentReportPage';

import MethodDetails from './components/details/MethodDetails';
import { OnboardingProvider } from './contexts/OnboardingContext';
import { DebtProvider } from './contexts/DebtContext';
import './App.css';

function App() {
  return (
    <DebtProvider>
      <OnboardingProvider>
        <Router>
          <div className="flex min-h-screen bg-primary-50 dark:bg-gray-900">
            <Navigation />
            <main className="flex-1 md:ml-64">
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/explore" element={<ExplorePage />} />
                <Route path="/stats" element={<StatsPage />} />
                <Route path="/super-features" element={<SuperFeaturesPage />} />
                <Route path="/stock-market" element={<StockMarketPage />} />
                <Route path="/finning" element={<FinningUnifiedPage />} />
                <Route path="/investment-pooling" element={<Navigate to="/investment-pooling/asset" replace />} />
                <Route path="/investment-pooling/asset" element={<InvestmentPoolingPage initialTab="asset" />} />
                <Route path="/investment-pooling/operations" element={<InvestmentPoolingPage initialTab="operations" />} />
                <Route path="/trade-centre" element={<TradeCentrePage />} />
                <Route path="/simulation-tool" element={<SimulationToolPage />} />

                {/* Finning Circle Routes */}
                <Route path="/finning-circle" element={<Navigate to="/finning-circle/dashboard" replace />} />
                <Route path="/finning-circle/dashboard" element={<FinningCircleDashboard />} />
                <Route path="/finning-circle/live" element={<FinningCircleLive />} />
                <Route path="/finning-circle/product" element={<FinningCircleProduct />} />
                <Route path="/finning-circle/discovery" element={<FinningCircleDiscovery />} />
                <Route path="/finning-circle/timeline" element={<FinningCircleTimeline />} />
                <Route path="/finning-circle/venue" element={<FinningCircleVenue />} />
                <Route path="/finning-circle/workshops" element={<FinningCircleWorkshops />} />

                {/* Finning Biz Routes */}
                <Route path="/finning-biz" element={<Navigate to="/finning-biz/authorization" replace />} />
                <Route path="/finning-biz/authorization" element={<AgentAuthorizationHierarchyPage />} />
                <Route path="/finning-biz/marketplace" element={<AIAgentMarketplacePage />} />
                <Route path="/finning-biz/flow" element={<JointAgentFlowVisualizationPage />} />
                <Route path="/finning-biz/auditor" element={<AuditorAgentWorkflowPage />} />
                <Route path="/finning-biz/report" element={<JointMultiAgentReportPage />} />

                <Route path="/methods/stop" element={<STOPMethodPage />} />
                <Route path="/methods/nws" element={<NWSMethodPage />} />
                <Route path="/methods/kakeibo" element={<KakeiboMethodPage />} />
                <Route path="/methods/taxes" element={<TaxStrategiesPage />} />
                <Route path="/methods/operations" element={<OperationsGuidePage />} />
                <Route path="/methods/:method/:category" element={<MethodDetails />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/company-status" element={<CompanyStatusPage />} />
                <Route path="/debt/occ" element={<DebtOCCPage />} />
                <Route path="/debt/od" element={<DebtODPage />} />
                <Route path="/debt/wc" element={<DebtWCPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </Router>
      </OnboardingProvider>
    </DebtProvider>
  );
}

export default App;