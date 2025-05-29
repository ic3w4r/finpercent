import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Navigation from './components/Navigation';
import DashboardPage from './pages/DashboardPage';
import ExplorePage from './pages/ExplorePage';
import StatsPage from './pages/StatsPage';
import ErrorPage from './pages/ErrorPage';
import SuperFeaturesPage from './pages/SuperFeaturesPage';
import KakeiboMethodPage from './pages/KakeiboMethodPage';
import STOPMethodGuidePage from './pages/STOPMethodGuidePage';
import DebtRepaymentPage from './pages/DebtRepaymentPage';
import AutomatedBankingPage from './pages/AutomatedBankingPage';
import StockMarketPage from './pages/StockMarketPage';
import InvestmentPoolingPage from './pages/InvestmentPoolingPage';
import FinringPage from './pages/FinringPage';
import SettingsPage from './pages/SettingsPage';
import CompanyStatusPage from './pages/CompanyStatusPage';
import KakeiboMethodGuidePage from './pages/KakeiboMethodGuidePage';
import NWSMethodGuidePage from './pages/NWSMethodGuidePage';
import ProfilePage from './pages/ProfilePage';
import MethodDetails from './components/details/MethodDetails';

class ErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="neo-card p-8">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <button 
              className="neo-button px-4 py-2"
              onClick={() => window.location.reload()}
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function AppContent() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex transition-colors duration-300">
      <Navigation />
      <main className="flex-grow min-h-screen md:ml-64">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 mb-16 md:mb-0">
          <Routes>
            {/* Main Pages */}
            <Route path="/" element={<DashboardPage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/stats" element={<StatsPage />} />
            
            {/* Feature Pages */}
            <Route path="/super-features" element={<SuperFeaturesPage />} />
            <Route path="/stock-market" element={<StockMarketPage />} />
            <Route path="/finring" element={<FinringPage />} />
            <Route path="/investment-pooling" element={<InvestmentPoolingPage />} />
            <Route path="/automated-banking" element={<AutomatedBankingPage />} />
            <Route path="/debt-repayment" element={<DebtRepaymentPage />} />
            
            {/* Method Pages */}
            <Route path="/methods/nws" element={<NWSMethodGuidePage />} />
            <Route path="/methods/kakeibo" element={<KakeiboMethodPage />} />
            <Route path="/methods/stop" element={<STOPMethodGuidePage />} />
            <Route path="/kakeibo" element={<KakeiboMethodGuidePage />} />
            
            {/* User Pages */}
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/company-status" element={<CompanyStatusPage />} />
            
            {/* Error Page */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <Router>
          <AppContent />
        </Router>
      </ErrorBoundary>
    </ThemeProvider>
  );
}