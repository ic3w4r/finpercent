import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import DashboardPage from './pages/DashboardPage';
import ExplorePage from './pages/ExplorePage';
import StatsPage from './pages/StatsPage';
import SuperFeaturesPage from './pages/SuperFeaturesPage';
import StockMarketPage from './pages/StockMarketPage';
import InvestmentPoolingPage from './pages/InvestmentPoolingPage';
import SimulationToolPage from './pages/SimulationToolPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import CompanyStatusPage from './pages/CompanyStatusPage';
import STOPMethodPage from './pages/methods/STOPMethodPage';
import NWSMethodPage from './pages/methods/NWSMethodPage';
import KakeiboMethodPage from './pages/methods/KakeiboMethodPage';
import TaxStrategiesPage from './pages/methods/TaxStrategiesPage';
import OperationsGuidePage from './pages/methods/OperationsGuidePage';
import MethodDetails from './components/details/MethodDetails';
import { OnboardingProvider } from './contexts/OnboardingContext';
import './App.css';

function App() {
  return (
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
              <Route path="/investment-pooling" element={<InvestmentPoolingPage />} />
              <Route path="/simulation-tool" element={<SimulationToolPage />} />
              <Route path="/methods/stop" element={<STOPMethodPage />} />
              <Route path="/methods/nws" element={<NWSMethodPage />} />
              <Route path="/methods/kakeibo" element={<KakeiboMethodPage />} />
              <Route path="/methods/taxes" element={<TaxStrategiesPage />} />
              <Route path="/methods/operations" element={<OperationsGuidePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/company-status" element={<CompanyStatusPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </OnboardingProvider>
  );
}

export default App;