import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, HelpCircle, MessageSquare, Send, BookOpen, UserCheck } from 'lucide-react';

export default function SupportPage() {
  const navigate = useNavigate();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`✉️ Ticket Submitted!\nSubject: ${subject}\nOur support agents will respond via email within 2 hours.`);
    setSubject('');
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 p-6 pb-20">
      <div className="max-w-4xl mx-auto space-y-8">
        
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
          <h1 className="text-3xl font-extrabold text-primary-950 dark:text-white">Growth & Credit Support Helpdesk</h1>
          <p className="text-sm text-gray-500 max-w-lg mx-auto">
            Get help with financial reports, bank document locker compliance, or operational metrics audits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Support Ticket Form */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
            <h3 className="text-md font-bold text-gray-900 dark:text-white border-b border-gray-50 dark:border-gray-700 pb-3 flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-primary-600" />
              <span>Raise Support Ticket</span>
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="block font-semibold text-gray-700 dark:text-gray-300">Ticket Subject</label>
                <input 
                  type="text" 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Help uploading FY25 audited statements"
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-primary-500 focus:outline-none dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-semibold text-gray-700 dark:text-gray-300">Message Description</label>
                <textarea 
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Provide detailed description of documentation or credit verification issues..."
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-primary-500 focus:outline-none dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                  required
                />
              </div>

              <button 
                type="submit"
                className="w-full py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-lg shadow-sm flex items-center justify-center space-x-2 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Submit Ticket</span>
              </button>
            </form>
          </div>

          {/* Help resources */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
            <h3 className="text-md font-bold text-gray-900 dark:text-white border-b border-gray-50 dark:border-gray-700 pb-3 flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <span>Common Help Resources</span>
            </h3>
            
            <ul className="space-y-3.5 text-xs text-gray-600 dark:text-gray-400">
              <li className="p-3 bg-gray-50 dark:bg-gray-900/40 rounded-xl space-y-1">
                <strong className="text-gray-800 dark:text-gray-200">How to renew Udyam MSME tag?</strong>
                <p className="text-[10px] text-gray-500 leading-relaxed">
                  Go to the official Udyam portal, input your Aadhaar, and generate the updated OTP validated registration copy.
                </p>
              </li>
              <li className="p-3 bg-gray-50 dark:bg-gray-900/40 rounded-xl space-y-1">
                <strong className="text-gray-800 dark:text-gray-200">What is safe EMI capacity?</strong>
                <p className="text-[10px] text-gray-500 leading-relaxed">
                  Finpercent defaults safe EMI capacity thresholds at 45% of monthly operating EBITDA margin to prevent defaults.
                </p>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}
