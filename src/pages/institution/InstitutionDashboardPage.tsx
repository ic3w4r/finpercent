import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Building2, Users, AlertTriangle, Map, Award, ChevronRight, Download, Filter 
} from 'lucide-react';

export default function InstitutionDashboardPage() {
  const navigate = useNavigate();
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedCluster, setSelectedCluster] = useState('All');
  const [selectedSector, setSelectedSector] = useState('All');
  const [isExporting, setIsExporting] = useState(false);

  const portfolio = [
    { name: 'Acme Corporation', district: 'Bengaluru Urban', cluster: 'Peenya', sector: 'Manufacturing', score: 82, risk: 'Low' },
    { name: 'NeoPack Industries', district: 'Bengaluru Urban', cluster: 'Peenya', sector: 'Manufacturing', score: 58, risk: 'Medium' },
    { name: 'AlphaTech Logistics', district: 'Dharwad', cluster: 'Hubli Industrial', sector: 'Logistics', score: 71, risk: 'Low' },
    { name: 'GreenPlast Polymers', district: 'Bengaluru Rural', cluster: 'Bommasandra', sector: 'Chemicals', score: 38, risk: 'High' }
  ];

  const filteredPortfolio = portfolio.filter(p => {
    return (selectedDistrict === 'All' || p.district === selectedDistrict) &&
           (selectedCluster === 'All' || p.cluster === selectedCluster) &&
           (selectedSector === 'All' || p.sector === selectedSector);
  });

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('📄 Portfolio Summary Report downloaded successfully!');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 p-6 pb-20">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-primary-950 dark:text-white">MSME Institution Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">District, cluster, and program-level monitoring portal</p>
          </div>
          
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl shadow-md text-xs font-bold flex items-center space-x-2 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? 'Generating Report...' : 'Export Portfolio Report'}</span>
          </button>
        </div>

        {/* Portfolio Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Total MSMEs Onboarded', val: '450', desc: 'Active participants', color: 'text-gray-950 dark:text-white' },
            { label: 'Avg Readiness Score', val: '68/100', desc: 'Needs optimization', color: 'text-primary-600' },
            { label: 'High Risk (Stress) MSMEs', val: '32 Firms', desc: 'Immediate intervention needed', color: 'text-red-600' },
            { label: 'Active Clusters Monitored', val: '8 Districts', desc: 'Peenya, Bommasandra, Dharwad', color: 'text-blue-600' }
          ].map((item, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-2">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 block">{item.label}</span>
              <span className={`text-xl font-bold block ${item.color}`}>{item.val}</span>
              <span className="text-[10px] text-gray-400 block">{item.desc}</span>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-wrap gap-4 items-center">
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <Filter className="w-4 h-4" />
            <span className="font-bold">Filters:</span>
          </div>

          <div className="flex flex-wrap gap-3 text-xs">
            <select 
              value={selectedDistrict} 
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="neo-input py-1.5 px-3 border rounded-lg bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none"
            >
              <option value="All">All Districts</option>
              <option value="Bengaluru Urban">Bengaluru Urban</option>
              <option value="Bengaluru Rural">Bengaluru Rural</option>
              <option value="Dharwad">Dharwad</option>
            </select>

            <select 
              value={selectedCluster} 
              onChange={(e) => setSelectedCluster(e.target.value)}
              className="neo-input py-1.5 px-3 border rounded-lg bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none"
            >
              <option value="All">All Clusters</option>
              <option value="Peenya">Peenya</option>
              <option value="Bommasandra">Bommasandra</option>
              <option value="Hubli Industrial">Hubli Industrial</option>
            </select>

            <select 
              value={selectedSector} 
              onChange={(e) => setSelectedSector(e.target.value)}
              className="neo-input py-1.5 px-3 border rounded-lg bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none"
            >
              <option value="All">All Sectors</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Chemicals">Chemicals</option>
              <option value="Logistics">Logistics</option>
            </select>
          </div>
        </div>

        {/* Intervention priorities list */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
          <h3 className="text-md font-bold text-gray-900 dark:text-white border-b border-gray-50 dark:border-gray-700 pb-3 flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span>Intervention Priority List</span>
          </h3>
          <div className="divide-y divide-gray-50 dark:divide-gray-700/50">
            {filteredPortfolio.map((item, i) => (
              <div key={i} className="py-3 flex justify-between items-center text-xs">
                <div className="space-y-1">
                  <span className="font-bold text-gray-800 dark:text-gray-200 block">{item.name}</span>
                  <span className="text-[10px] text-gray-400 block">{item.district} • {item.cluster} • {item.sector}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <span className="font-extrabold text-gray-950 dark:text-white block">{item.score}/100</span>
                    <span className={`text-[9px] font-bold ${
                      item.risk === 'High' ? 'text-red-600' : item.risk === 'Medium' ? 'text-yellow-600' : 'text-green-600'
                    }`}>{item.risk} Risk</span>
                  </div>
                  <button 
                    onClick={() => navigate('/credit/readiness-report')}
                    className="p-1 text-gray-400 hover:text-primary-600 transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
