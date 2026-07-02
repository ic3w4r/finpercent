import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ShieldCheck, HelpCircle } from 'lucide-react';

import { useReadiness } from '../../contexts/ReadinessContext';

export default function DataPermissionsPage() {
  const navigate = useNavigate();
  const { consents, toggleConsent } = useReadiness();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 p-6 pb-20 text-left">
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
          <h1 className="text-3xl font-extrabold text-primary-950 dark:text-white">Data Permissions & Consents</h1>
          <p className="text-sm text-gray-500 max-w-lg mx-auto">
            Manage explicit borrower-consented data sharing mandates with lending partners and cluster bureaus.
          </p>
        </div>

        {/* Consents list */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
          <h3 className="text-md font-bold text-gray-900 dark:text-white border-b border-gray-50 dark:border-gray-700 pb-3 flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-primary-600" />
            <span>Active Financial Data Access Mandates</span>
          </h3>

          <div className="space-y-4 text-xs">
            {consents.map((item) => (
              <div key={item.partnerId} className="p-4 bg-gray-50/50 dark:bg-gray-900/30 border border-gray-100 dark:border-gray-800 rounded-xl flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="font-bold text-gray-800 dark:text-gray-200 block">{item.partnerName}</span>
                  <span className="text-[10px] text-gray-400 block">Scopes: {item.scopes.join(', ')} • Expiry: {item.expiryDaysRemaining} days</span>
                </div>
                <button
                  onClick={() => toggleConsent(item.partnerId)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-all ${
                    item.active 
                      ? 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100' 
                      : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700'
                  }`}
                >
                  {item.active ? 'Revoke Consent' : 'Grant Consent'}
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
