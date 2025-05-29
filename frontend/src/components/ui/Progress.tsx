import React from 'react';
import { Check } from 'lucide-react';

interface Step {
  title: string;
  description: string;
  icon: JSX.Element;
  status: string;
}

interface ProgressProps {
  steps: Step[];
  currentStep: number;
  completedSteps: number[];
}

export function Progress({ steps, currentStep, completedSteps }: ProgressProps) {
  return (
    <div className="w-full">
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div key={step.title} className="flex-1">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center 
                ${completedSteps.includes(index) ? 'bg-green-500' : 
                 currentStep === index ? 'bg-primary-600' : 'bg-gray-200'}`}>
                {completedSteps.includes(index) ? (
                  <Check className="w-6 h-6 text-white" />
                ) : (
                  step.icon
                )}
              </div>
              <div className="mt-2 text-center">
                <p className={`text-sm font-medium 
                  ${currentStep === index ? 'text-primary-600' : 'text-gray-500'}`}>
                  {step.title}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary-600 transition-all duration-500"
            style={{
              width: `${(currentStep / (steps.length - 1)) * 100}%`
            }}
          />
        </div>
      </div>
    </div>
  );
}
