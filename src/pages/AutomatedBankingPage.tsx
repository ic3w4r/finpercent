import React, { useState } from 'react';
import { CreditCard, Check, Settings, TrendingUp, Shield, RefreshCw, ChevronLeft, Banknote } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Progress } from '../components/ui/Progress';

const steps = [
  {
    title: 'Account Connection',
    description: 'Securely connect your bank accounts and credit cards',
    icon: <CreditCard className="w-6 h-6 text-primary-600" />,
    status: 'pending'
  },
  {
    title: 'N.W.S Setup',
    description: 'Configure Needs, Wants, Savings percentages',
    icon: <Settings className="w-6 h-6 text-primary-600" />,
    status: 'pending'
  },
  {
    title: 'S.T.O.P Configuration',
    description: 'Set up Spending, Tracking, Optimization, Protection thresholds',
    icon: <Shield className="w-6 h-6 text-primary-600" />,
    status: 'pending'
  },
  {
    title: 'Automation Rules',
    description: 'Create rules for recurring transactions and savings',
    icon: <RefreshCw className="w-6 h-6 text-primary-600" />,
    status: 'pending'
  },
  {
    title: 'Review & Confirm',
    description: 'Finalize your automated banking setup',
    icon: <Check className="w-6 h-6 text-primary-600" />,
    status: 'pending'
  }
];

export default function AutomatedBankingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleStepComplete = (stepIndex: number) => {
    setCompletedSteps([...completedSteps, stepIndex]);
    setCurrentStep(stepIndex + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-beige-50 to-primary-100 p-6 pb-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Automated Banking Setup</h1>
        <p className="text-lg text-gray-600 mb-8">
          Configure your automated banking using N.W.S and S.T.O.P methods
        </p>

        {/* Back Button */}
        <Link 
          to="/explore"
          className="flex items-center text-primary-600 hover:text-primary-700 mb-8"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="ml-2">Back to Explore</span>
        </Link>

        <div className="glass-card rounded-2xl p-6">
          <Progress steps={steps} currentStep={currentStep} completedSteps={completedSteps} />

          <div className="mt-8 space-y-6">
            {steps.map((step, index) => (
              <div key={step.title} className={`${index !== currentStep ? 'hidden' : ''}`}>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex-shrink-0">
                    {step.icon}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">{step.title}</h2>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>

                {/* Step-specific content */}
                {index === 0 && (
                  <div className="mt-4">
                    <h3 className="font-semibold text-gray-800 mb-2">Connect Your Accounts</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <button className="glass-card p-4 rounded-xl hover:bg-white/40 transition-colors">
                        <div className="flex items-center space-x-3">
                          <CreditCard className="w-8 h-8 text-primary-600" />
                          <span className="text-gray-800">Chase Bank</span>
                        </div>
                      </button>
                      <button className="glass-card p-4 rounded-xl hover:bg-white/40 transition-colors">
                        <div className="flex items-center space-x-3">
                          <Banknote className="w-8 h-8 text-primary-600" />
                          <span className="text-gray-800">Wells Fargo</span>
                        </div>
                      </button>
                    </div>
                  </div>
                )}

                {index === 1 && (
                  <div className="mt-4">
                    <h3 className="font-semibold text-gray-800 mb-2">Set Your N.W.S Percentages</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="glass-card p-4 rounded-xl">
                        <h4 className="text-gray-800 font-medium mb-2">Needs</h4>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          className="w-full"
                        />
                      </div>
                      <div className="glass-card p-4 rounded-xl">
                        <h4 className="text-gray-800 font-medium mb-2">Wants</h4>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          className="w-full"
                        />
                      </div>
                      <div className="glass-card p-4 rounded-xl">
                        <h4 className="text-gray-800 font-medium mb-2">Savings</h4>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {index === 2 && (
                  <div className="mt-4">
                    <h3 className="font-semibold text-gray-800 mb-2">Configure S.T.O.P Thresholds</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="glass-card p-4 rounded-xl">
                        <h4 className="text-gray-800 font-medium mb-2">Spending Limit</h4>
                        <input
                          type="number"
                          placeholder="Enter amount"
                          className="w-full p-2 rounded-lg"
                        />
                      </div>
                      <div className="glass-card p-4 rounded-xl">
                        <h4 className="text-gray-800 font-medium mb-2">Tracking Frequency</h4>
                        <select className="w-full p-2 rounded-lg">
                          <option>Daily</option>
                          <option>Weekly</option>
                          <option>Monthly</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6">
                  <button
                    onClick={() => handleStepComplete(index)}
                    className="w-full md:w-auto px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    {index === steps.length - 1 ? 'Complete Setup' : 'Next Step'}
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
