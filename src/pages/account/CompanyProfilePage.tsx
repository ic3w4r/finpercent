import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Building2, Save, FileText } from 'lucide-react';

export default function CompanyProfilePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: 'Acme Corporation',
    industry: 'Mechanical Manufacturing',
    udyam: 'UDYAM-KR-03-0029381',
    gstin: '29AAAAA1111A1Z1',
    turnover: '₹2.5 Crore',
    employees: '24'
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('🎉 Company Profile changes saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 p-6 pb-20">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate('/overview')}
            className="neo-button glass-action px-4 py-2 text-gray-600 dark:text-gray-400 hover:shadow-lg transition-all duration-300 flex items-center text-xs font-semibold"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            <span>Back to Command Center</span>
          </button>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold text-primary-950 dark:text-white">Company Profile</h1>
          <p className="text-sm text-gray-500 max-w-lg mx-auto">
            Manage your firm's registration metadata, industry classifications, and operating stats.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block font-semibold text-gray-700 dark:text-gray-300">Registered Business Name</label>
                <input 
                  type="text" 
                  value={formData.name} 
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-semibold text-gray-700 dark:text-gray-300">Industry / Sector</label>
                <input 
                  type="text" 
                  value={formData.industry} 
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-semibold text-gray-700 dark:text-gray-300">Udyam Registration Number</label>
                <input 
                  type="text" 
                  value={formData.udyam} 
                  onChange={(e) => setFormData({ ...formData, udyam: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-semibold text-gray-700 dark:text-gray-300">GSTIN Number</label>
                <input 
                  type="text" 
                  value={formData.gstin} 
                  onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-semibold text-gray-700 dark:text-gray-300">Annual Business Turnover</label>
                <input 
                  type="text" 
                  value={formData.turnover} 
                  className="w-full p-2.5 bg-gray-100 border border-gray-250 rounded-lg dark:bg-gray-900/50 dark:border-gray-800 dark:text-white/60"
                  disabled
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-semibold text-gray-700 dark:text-gray-300">Active Employee Count</label>
                <input 
                  type="text" 
                  value={formData.employees} 
                  onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-lg shadow-sm flex items-center justify-center space-x-2 transition-all self-start"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile Details</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
