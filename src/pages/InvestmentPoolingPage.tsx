import { useState, useEffect } from 'react';
import {
  ChevronLeft, Users, TrendingUp, FileText,
  Building2, Factory, PieChart, BarChart3, Calculator, Target,
  Shield, Eye, AlertTriangle, CheckCircle, ArrowRight, Coins,
  Banknote, TrendingDown, Zap
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

import AssetDossierStack from '../components/AssetDossierStack';

interface FinningPointPageProps {
  initialTab?: 'asset' | 'operations';
}

export default function FinningPointPage({ initialTab }: FinningPointPageProps) {
  const [activeTab, setActiveTab] = useState<'asset' | 'operations'>(initialTab ?? 'asset');
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.toLowerCase();
    if (path.includes('/capital-access-intelligence/asset') || path.endsWith('/asset')) {
      setActiveTab('asset');
    } else if (path.includes('/capital-access-intelligence/operations') || path.endsWith('/operations')) {
      setActiveTab('operations');
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-beige-50 to-primary-100 p-6 pb-20">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/overview" className="flex items-center text-primary-600 hover:text-primary-700">
            <ChevronLeft className="w-5 h-5" />
            <span className="ml-2">Back to Command Center</span>
          </Link>
          <h1 className="text-3xl font-bold text-primary-900 tracking-tight">Capital Access Intelligence</h1>
        </div>

        {/* Main Tabs */}
        <div className="flex justify-center mb-10">
          <div className="bg-white rounded-xl p-2 shadow-lg border border-primary-200 flex gap-2">
            <Link
              to="/capital-access-intelligence/asset"
              className={`neo-button glass-action px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'asset' ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg' : 'text-primary-600 hover:bg-primary-50'
              }`}
            >
              Asset Access Intelligence
            </Link>
            <Link
              to="/capital-access-intelligence/operations"
              className={`neo-button glass-action px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'operations' ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg' : 'text-primary-600 hover:bg-primary-50'
              }`}
            >
              Operations Access Intelligence
            </Link>
          </div>
        </div>

        {/* Asset Pooling Section */}
        {activeTab === 'asset' && (
          <div className="space-y-6">
            <div className="bg-white/30 dark:bg-gray-900/30 rounded-2xl border border-white/10 p-5 space-y-4">
              <div className="text-left">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Legal Dossiers & Collateral Assets</h3>
                <p className="text-xs text-gray-500 mt-0.5">CA digital signature challenge status on mutating properties</p>
              </div>
              <AssetDossierStack />
            </div>
          </div>
        )}

        {/* Operations Pooling Section */}
        {activeTab === 'operations' && (
          <div className="space-y-10">
            {/* Operations Overview */}
            <div className="glass-card rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <Zap className="w-8 h-8 text-orange-600" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Operations Pooling</h2>
                  <p className="text-orange-600 font-medium">Escrow-Managed Operational Funding with Risk Assessment</p>
                </div>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Operational Funding Structure</h3>
                  <p className="text-gray-600 mb-4">
                    Operations Gained Pooling provides companies with access to pooled funds for daily expenses, 
                    sudden raw material purchases, and operational needs. All funds are managed through secure escrow 
                    systems with comprehensive monitoring and allocation based on strict credibility criteria.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <Shield className="w-5 h-5 text-orange-600 mr-3" />
                      <span className="text-orange-800 font-medium">Escrow-Managed Funds</span>
                    </div>
                    <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg">
                      <Eye className="w-5 h-5 text-red-600 mr-3" />
                      <span className="text-red-800 font-medium">Continuous Monitoring & Allocation</span>
                    </div>
                    <div className="flex items-center p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
                      <Calculator className="w-5 h-5 text-indigo-600 mr-3" />
                      <span className="text-indigo-800 font-medium">S.T.O.P & Altman Z-Score Analysis</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-xl p-6 text-white">
                  <h4 className="text-xl font-bold mb-4">Operations Pool Metrics</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Total Operations Fund</span>
                      <span className="font-bold">$8.9M</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Active Companies</span>
                      <span className="font-bold">156</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Average Z-Score</span>
                      <span className="font-bold text-green-300">2.7</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Fund Utilization</span>
                      <span className="font-bold text-yellow-300">73%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Risk Assessment Methods */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="glass-card p-6 rounded-xl">
                  <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <BarChart3 className="w-6 h-6 text-primary-600 mr-3" />
                    S.T.O.P. Method Analysis
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                      <span className="font-medium text-green-800">Savings (25%)</span>
                      <span className="text-green-600">✓ Assessed</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                      <span className="font-medium text-blue-800">Taxes (30%)</span>
                      <span className="text-blue-600">✓ Verified</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-orange-50 rounded">
                      <span className="font-medium text-orange-800">Operations (35%)</span>
                      <span className="text-orange-600">✓ Monitored</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-purple-50 rounded">
                      <span className="font-medium text-purple-800">Profit (10%)</span>
                      <span className="text-purple-600">✓ Tracked</span>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-6 rounded-xl">
                  <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <TrendingDown className="w-6 h-6 text-red-600 mr-3" />
                    Altman Z-Score Assessment
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                      <span className="font-medium text-green-800">Safe Zone (Z &gt; 2.99)</span>
                      <span className="text-green-600">67 Companies</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                      <span className="font-medium text-yellow-800">Gray Zone (1.81-2.99)</span>
                      <span className="text-yellow-600">78 Companies</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                      <span className="font-medium text-red-800">Distress Zone (Z &lt; 1.81)</span>
                      <span className="text-red-600">11 Companies</span>
                    </div>
                    <div className="text-center pt-2">
                      <span className="text-sm text-gray-600">Average Score: <strong>2.7</strong></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Operational Categories */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="glass-card p-6 rounded-xl hover:shadow-lg transition-shadow">
                  <Factory className="w-8 h-8 text-blue-600 mb-4" />
                  <h4 className="font-bold text-gray-800 mb-2">Raw Materials</h4>
                  <p className="text-gray-600 text-sm mb-3">Sudden procurement needs and bulk material purchases</p>
                  <div className="text-sm text-blue-600 font-medium">Average: $125K/month</div>
                </div>
                <div className="glass-card p-6 rounded-xl hover:shadow-lg transition-shadow">
                  <Users className="w-8 h-8 text-green-600 mb-4" />
                  <h4 className="font-bold text-gray-800 mb-2">Daily Operations</h4>
                  <p className="text-gray-600 text-sm mb-3">Payroll, utilities, and routine operational expenses</p>
                  <div className="text-sm text-green-600 font-medium">Average: $89K/month</div>
                </div>
                <div className="glass-card p-6 rounded-xl hover:shadow-lg transition-shadow">
                  <AlertTriangle className="w-8 h-8 text-orange-600 mb-4" />
                  <h4 className="font-bold text-gray-800 mb-2">Emergency Funds</h4>
                  <p className="text-gray-600 text-sm mb-3">Unexpected operational challenges and crisis management</p>
                  <div className="text-sm text-orange-600 font-medium">Average: $67K/quarter</div>
                </div>
              </div>
            </div>

            {/* Escrow Process */}
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Escrow Management Process</h3>
              <div className="grid md:grid-cols-5 gap-4">
                {[
                  { step: 1, title: "Application", desc: "Company submits funding request with documentation", icon: FileText },
                  { step: 2, title: "Assessment", desc: "S.T.O.P method and Altman Z-score analysis", icon: Calculator },
                  { step: 3, title: "Approval", desc: "Credibility evaluation and fund allocation decision", icon: CheckCircle },
                  { step: 4, title: "Escrow", desc: "Funds held in secure escrow with monitoring", icon: Shield },
                  { step: 5, title: "Distribution", desc: "Monitored release based on predefined criteria", icon: ArrowRight }
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.step} className="text-center">
                      <div className="w-14 h-14 bg-gradient-to-br from-orange-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-bold text-gray-800 mb-2 text-sm">{item.title}</h4>
                      <p className="text-gray-600 text-xs">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="flex flex-col items-center mt-16">
          <div className="glass-card rounded-2xl p-8 w-full max-w-2xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to Start Accessing Capital?</h3>
            <p className="text-gray-600 mb-6">
              Join our advanced capital access intelligence platform with comprehensive risk assessment and professional underwriting checks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-2">
              <Link to="/capital-access-intelligence/asset" className="neo-button glass-action px-8 py-3 rounded-lg font-semibold bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg hover:from-primary-700 hover:to-primary-800 transition-all inline-block text-center">
                Start Asset Analysis
              </Link>
              <Link to="/capital-access-intelligence/operations" className="neo-button glass-action px-8 py-3 rounded-lg font-semibold bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg hover:from-orange-700 hover:to-red-700 transition-all inline-block text-center">
                Apply for Operations Capital
              </Link>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Need more information? <Link to="/support" className="text-primary-600 hover:text-primary-700 font-medium">Contact our credit specialists</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
