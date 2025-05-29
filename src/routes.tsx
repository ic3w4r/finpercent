import { Routes, Route } from 'react-router-dom';
import PageTransition from './components/ui/PageTransition';
import SuperFeaturesPage from './pages/SuperFeaturesPage';
import ErrorPage from './pages/ErrorPage';

// Import all pages
import DashboardPage from './pages/DashboardPage';
import ExplorePage from './pages/ExplorePage';
import StatsPage from './pages/StatsPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import CompanyStatusPage from './pages/CompanyStatusPage';
import FinringPage from './pages/FinringPage';
import DebtRepaymentPage from './pages/DebtRepaymentPage';
import InvestmentPoolingPage from './pages/InvestmentPoolingPage';
import AutomatedBankingPage from './pages/AutomatedBankingPage';
import StockMarketPage from './pages/StockMarketPage';
import KakeiboMethodPage from './pages/KakeiboMethodPage';
import NWSMethodGuidePage from './pages/NWSMethodGuidePage';
import STOPMethodGuidePage from './pages/STOPMethodGuidePage';
import KakeiboMethodGuidePage from './pages/KakeiboMethodGuidePage';
import MethodDetails from './components/details/MethodDetails';

interface AppRoutesProps {
  viewMode: 'classic' | 'stockMarket';
}

export default function AppRoutes({ viewMode }: AppRoutesProps) {
  if (viewMode === 'stockMarket') {
    return (
      <PageTransition>
        <StockMarketPage />
      </PageTransition>
    );
  }

  return (
    <Routes errorElement={<ErrorPage />}>
      <Route 
        path="/" 
        element={
          <PageTransition>
            <DashboardPage />
          </PageTransition>
        } 
      />
      <Route 
        path="/stock-market" 
        element={
          <PageTransition>
            <StockMarketPage />
          </PageTransition>
        } 
      />
      <Route 
        path="/explore" 
        element={
          <PageTransition>
            <ExplorePage />
          </PageTransition>
        } 
      />
      <Route 
        path="/stats" 
        element={
          <PageTransition>
            <StatsPage />
          </PageTransition>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <PageTransition>
            <ProfilePage />
          </PageTransition>
        } 
      />
      <Route 
        path="/settings" 
        element={
          <PageTransition>
            <SettingsPage />
          </PageTransition>
        } 
      />
      <Route 
        path="/company-status" 
        element={
          <PageTransition>
            <CompanyStatusPage />
          </PageTransition>
        } 
      />
      <Route 
        path="/finring" 
        element={
          <PageTransition>
            <FinringPage />
          </PageTransition>
        } 
      />
      <Route 
        path="/debt-repayment" 
        element={
          <PageTransition>
            <DebtRepaymentPage />
          </PageTransition>
        } 
      />
      <Route 
        path="/investment-pooling" 
        element={
          <PageTransition>
            <InvestmentPoolingPage />
          </PageTransition>
        } 
      />
      <Route 
        path="/automated-banking" 
        element={
          <PageTransition>
            <AutomatedBankingPage />
          </PageTransition>
        } 
      />
      <Route 
        path="/super-features" 
        element={
          <PageTransition>
            <SuperFeaturesPage />
          </PageTransition>
        } 
      />
      <Route 
        path="/methods/nws" 
        element={
          <PageTransition>
            <NWSMethodGuidePage />
          </PageTransition>
        } 
      />
      <Route 
        path="/methods/stop" 
        element={
          <PageTransition>
            <STOPMethodGuidePage />
          </PageTransition>
        } 
      />
      <Route 
        path="/method/:method/:category" 
        element={
          <PageTransition>
            <MethodDetails />
          </PageTransition>
        } 
      />
      <Route 
        path="/methods/kakeibo" 
        element={
          <PageTransition>
            <KakeiboMethodGuidePage />
          </PageTransition>
        } 
      />
      <Route 
        path="/methods/kakeibo/dashboard" 
        element={
          <PageTransition>
            <KakeiboMethodPage />
          </PageTransition>
        } 
      />
    </Routes>
  );
}