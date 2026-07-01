import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Award, Calendar, CheckSquare, Clock, ShieldCheck, 
  HelpCircle, ChevronRight, CheckCircle2, ArrowRight
} from 'lucide-react';

export default function ActionPlanPage() {
  const navigate = useNavigate();
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  const toggleTask = (id: string) => {
    setCompletedTasks(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const tasks = {
    immediate: [
      { id: 'i-1', text: 'Renew expired Udyam MSME Registration Certificate', target: 'Immediate' },
      { id: 'i-2', text: 'Upload missing GST returns (GSTR-3B) for May 2026', target: 'Immediate' }
    ],
    day30: [
      { id: 'd-1', text: 'Consolidate active corporate outstanding loans in debt registry', target: 'Within 30 Days' },
      { id: 'd-2', text: 'Confirm vendor ledger balances with NeoPack Industries', target: 'Within 30 Days' },
      { id: 'd-3', text: 'Establish straight-through S.T.O.P automated banking rules', target: 'Within 30 Days' }
    ],
    day60: [
      { id: 'd-4', text: 'Reduce B2B average DSO (receivables lock) from 42 days to 35 days', target: 'Within 60 Days' },
      { id: 'd-5', text: 'Resolve Peenya cluster customer concentration warning (below 30%)', target: 'Within 60 Days' }
    ],
    day90: [
      { id: 'd-6', text: 'Submit bank-ready borrower dossier file to lender partner', target: 'Within 90 Days' },
      { id: 'd-7', text: 'Audit tax efficiency strategies for the upcoming assessment cycle', target: 'Within 90 Days' }
    ]
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
          
          <button
            onClick={() => navigate('/credit/readiness-report')}
            className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl shadow-md text-xs font-semibold flex items-center space-x-2 transition-all"
          >
            <span>View Credit Readiness</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold text-primary-950 dark:text-white">MSME Action & Improvement Plan</h1>
          <p className="text-sm text-gray-500 max-w-lg mx-auto">
            Your structured roadmap to improve business scorecards, clear documentation gaps, and achieve full bank funding readiness.
          </p>
        </div>

        {/* 30/60/90 Day Sections */}
        <div className="space-y-6">
          {[
            { title: 'Immediate Core Corrections', tasks: tasks.immediate, color: 'border-red-200 dark:border-red-900', badge: 'bg-red-100 text-red-700' },
            { title: '30-Day Stabilization Actions', tasks: tasks.day30, color: 'border-yellow-200 dark:border-yellow-900', badge: 'bg-yellow-100 text-yellow-700' },
            { title: '60-Day Optimization Goals', tasks: tasks.day60, color: 'border-blue-200 dark:border-blue-900', badge: 'bg-blue-100 text-blue-700' },
            { title: '90-Day Credit Launch Targets', tasks: tasks.day90, color: 'border-green-200 dark:border-green-900', badge: 'bg-green-100 text-green-700' }
          ].map((sect, i) => (
            <div key={i} className={`bg-white dark:bg-gray-800 p-6 rounded-2xl border ${sect.color} shadow-sm space-y-4`}>
              <div className="flex justify-between items-center pb-2 border-b border-gray-50 dark:border-gray-700">
                <h3 className="text-md font-bold text-gray-900 dark:text-white">{sect.title}</h3>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${sect.badge}`}>{sect.tasks.length} Actions</span>
              </div>
              <div className="space-y-3">
                {sect.tasks.map((task) => {
                  const isDone = completedTasks.includes(task.id);
                  return (
                    <div 
                      key={task.id} 
                      onClick={() => toggleTask(task.id)}
                      className={`p-3 border rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                        isDone 
                          ? 'bg-primary-50/50 border-primary-200 text-gray-400 dark:bg-primary-950/10 dark:border-primary-900' 
                          : 'bg-gray-50/50 border-gray-100 hover:border-primary-300 hover:bg-white dark:bg-gray-900/30 dark:border-gray-800'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                          isDone ? 'bg-primary-600 border-primary-600 text-white' : 'border-gray-300 bg-white dark:bg-gray-800'
                        }`}>
                          {isDone && <CheckCircle2 className="w-4 h-4" />}
                        </div>
                        <span className={`text-xs font-semibold ${isDone ? 'line-through' : 'text-gray-800 dark:text-gray-200'}`}>
                          {task.text}
                        </span>
                      </div>
                      <span className="text-[10px] text-gray-400 font-medium">{task.target}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
