import React from 'react';
import { PencilLine, Clock, DollarSign } from 'lucide-react';

const steps = [
  { icon: <PencilLine className="w-5 h-5" />, text: "1. Add your goals" },
  { icon: <Clock className="w-5 h-5" />, text: "2. We'll recommend a plan" },
  { icon: <DollarSign className="w-5 h-5" />, text: "3. Build your future" }
];

const categories = [
  { title: 'Needs', image: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&q=80&w=300' },
  { title: 'Wants', image: 'https://images.unsplash.com/photo-1682686581580-d99b0230064e?auto=format&fit=crop&q=80&w=300' },
  { title: 'Savings', image: 'https://images.unsplash.com/photo-1579621970795-87facc2f976d?auto=format&fit=crop&q=80&w=300' }
];

export default function BudgetingMethod() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">How it works</h2>
        {steps.map((step, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="p-2 bg-primary-50 rounded-full">
              {step.icon}
            </div>
            <span className="text-gray-700">{step.text}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {categories.map((category) => (
          <div key={category.title} className="relative rounded-xl overflow-hidden">
            <img 
              src={category.image} 
              alt={category.title}
              className="w-full h-24 object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-end p-2">
              <span className="text-white text-sm font-medium">{category.title}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium">Budgeting Method</h3>
          <p className="text-sm text-gray-600">N.W.S</p>
        </div>
        <button className="text-primary-600 text-sm">Switch to Kakeibo</button>
      </div>
    </div>
  );
}
