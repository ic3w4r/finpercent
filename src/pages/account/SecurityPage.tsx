import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Lock, FileText, Activity } from 'lucide-react';

export default function SecurityPage() {
  const navigate = useNavigate();

  const auditLogs = [
    { event: 'Credit Readiness Report generated', user: 'Admin (MSME Owner)', time: '2026-06-30 11:20', ip: '192.168.1.104' },
    { event: 'Bank statement file downloaded', user: 'State Bank Credit Officer', time: '2026-06-30 09:12', ip: '10.220.44.12' },
    { event: 'Udyam Registration document updated', user: 'Admin (MSME Owner)', time: '2026-06-29 16:45', ip: '192.168.1.104' }
  ];

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
          <h1 className="text-3xl font-extrabold text-primary-950 dark:text-white">Security & Audit Trails</h1>
          <p className="text-sm text-gray-500 max-w-lg mx-auto">
            Audit logs detailing reports generated, partner access instances, and document verification histories.
          </p>
        </div>

        {/* Security configuration */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
          <h3 className="text-md font-bold text-gray-900 dark:text-white border-b border-gray-50 dark:border-gray-700 pb-3 flex items-center space-x-2">
            <Lock className="w-5 h-5 text-primary-600" />
            <span>Cryptographic & Encryption Settings</span>
          </h3>
          <div className="space-y-3 text-xs leading-relaxed text-gray-600 dark:text-gray-400">
            <p>
              Your document locker utilizes AES-256 bank-grade encryption. Auditing links directly verify digital signatures of CA authorities.
            </p>
          </div>
        </div>

        {/* Audit Trails Logs */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
          <h3 className="text-md font-bold text-gray-900 dark:text-white border-b border-gray-50 dark:border-gray-700 pb-3 flex items-center space-x-2">
            <Activity className="w-5 h-5 text-blue-600" />
            <span>Access Audits Feed</span>
          </h3>
          <div className="space-y-3 text-xs">
            {auditLogs.map((log, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 dark:border-gray-700 last:border-0">
                <div>
                  <span className="font-semibold text-gray-800 dark:text-gray-200 block">{log.event}</span>
                  <span className="text-[10px] text-gray-400 block">{log.user} • IP: {log.ip}</span>
                </div>
                <span className="text-[10px] text-gray-400 font-medium">{log.time}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
