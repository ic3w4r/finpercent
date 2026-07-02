import { Routes, Route } from 'react-router-dom';
import PageTransition from './components/ui/PageTransition';
import SuperFeaturesPage from './pages/SuperFeaturesPage';

// Import all pages
import DashboardPage from './pages/DashboardPage';
import ExplorePage from './pages/ExplorePage';
import StatsPage from './pages/StatsPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import CompanyStatusPage from './pages/CompanyStatusPage';
import FinringPage from './pages/FinningUnifiedPage';
import DebtRepaymentPage from './pages/DebtRepaymentPage';
import DebtOCCPage from './pages/DebtOCCPage';
import DebtODPage from './pages/DebtODPage';
import DebtWCPage from './pages/DebtWCPage';
import InvestmentPoolingPage from './pages/InvestmentPoolingPage';
import AutomatedBankingPage from './pages/AutomatedBankingPage';
import StockMarketPage from './pages/StockMarketPage';
import KakeiboMethodPage from './pages/KakeiboMethodPage';
import NWSMethodGuidePage from './pages/NWSMethodGuidePage';
import STOPMethodGuidePage from './pages/STOPMethodGuidePage';
import KakeiboMethodGuidePage from './pages/KakeiboMethodGuidePage';
import MethodDetails from './components/details/MethodDetails';

// Import new pages
import FinningCircleGateway from './pages/finning-circle/FinningCircleGateway';
import GSTOnboarding from './pages/finning-circle/GSTOnboarding';
import ShowcaseBuilder from './pages/finning-circle/ShowcaseBuilder';
import SMEPassport from './pages/finning-circle/SMEPassport';
import WorkingCapitalDiagnostic from './pages/financial/WorkingCapitalDiagnostic';
import CreditReadyFile from './pages/credit/CreditReadyFile';
import FinningCircleWorkshops from './pages/finning-circle/FinningCircleWorkshops';
import FinningCircleDashboard from './pages/finning-circle/FinningCircleDashboard';
import FinningCircleLive from './pages/finning-circle/FinningCircleLive';
import FinningCircleProduct from './pages/finning-circle/FinningCircleProduct';
import FinningCircleDiscovery from './pages/finning-circle/FinningCircleDiscovery';
import FinningCircleTimeline from './pages/finning-circle/FinningCircleTimeline';
import FinningCircleVenue from './pages/finning-circle/FinningCircleVenue';
import FinningCircleMarketplace from './pages/finning-circle/FinningCircleMarketplace';

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
    <Routes>
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
        path="/debt/occ"
        element={
          <PageTransition>
            <DebtOCCPage />
          </PageTransition>
        }
      />
      <Route
        path="/debt/od"
        element={
          <PageTransition>
            <DebtODPage />
          </PageTransition>
        }
      />
      <Route
        path="/debt/wc"
        element={
          <PageTransition>
            <DebtWCPage />
          </PageTransition>
        }
      />
      <Route 
        path="/investment-pooling" 
        element={
          <PageTransition>
            <FinringPage />
          </PageTransition>
        } 
      />
      <Route
        path="/investment-pooling/asset"
        element={
          <PageTransition>
            <InvestmentPoolingPage initialTab="asset" />
          </PageTransition>
        }
      />
      <Route
        path="/investment-pooling/operations"
        element={
          <PageTransition>
            <InvestmentPoolingPage initialTab="operations" />
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
      {/* Finning Circle (TradeStream) Routes */}
      <Route 
        path="/finning-circle/gateway" 
        element={
          <PageTransition>
            <FinningCircleGateway />
          </PageTransition>
        } 
      />
      <Route 
        path="/finning-circle/onboard" 
        element={
          <PageTransition>
            <GSTOnboarding />
          </PageTransition>
        } 
      />
      <Route 
        path="/finning-circle/builder" 
        element={
          <PageTransition>
            <ShowcaseBuilder />
          </PageTransition>
        } 
      />
      <Route 
        path="/finning-circle/dashboard" 
        element={
          <PageTransition>
            <FinningCircleDashboard />
          </PageTransition>
        } 
      />
      <Route 
        path="/finning-circle/live" 
        element={
          <PageTransition>
            <FinningCircleLive />
          </PageTransition>
        } 
      />
      <Route 
        path="/finning-circle/product" 
        element={
          <PageTransition>
            <FinningCircleProduct />
          </PageTransition>
        } 
      />
      <Route 
        path="/finning-circle/discovery" 
        element={
          <PageTransition>
            <FinningCircleDiscovery />
          </PageTransition>
        } 
      />
      <Route 
        path="/finning-circle/timeline" 
        element={
          <PageTransition>
            <FinningCircleTimeline />
          </PageTransition>
        } 
      />
      <Route 
        path="/finning-circle/venue" 
        element={
          <PageTransition>
            <FinningCircleVenue />
          </PageTransition>
        } 
      />
      <Route 
        path="/finning-circle/workshops" 
        element={
          <PageTransition>
            <FinningCircleWorkshops />
          </PageTransition>
        } 
      />
      <Route 
        path="/finning-circle/passport" 
        element={
          <PageTransition>
            <SMEPassport />
          </PageTransition>
        } 
      />
      
      {/* Finpercent Core Additions */}
      <Route 
        path="/financial/diagnostic" 
        element={
          <PageTransition>
            <WorkingCapitalDiagnostic />
          </PageTransition>
        } 
      />
      <Route 
        path="/credit/ready-file" 
        element={
          <PageTransition>
            <CreditReadyFile />
          </PageTransition>
        } 
      />
      <Route 
        path="/finning-circle/marketplace" 
        element={
          <PageTransition>
            <FinningCircleMarketplace />
          </PageTransition>
        } 
      />
    </Routes>
  );
}