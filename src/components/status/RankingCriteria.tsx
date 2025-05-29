import React from 'react';
import { Award, Check, AlertCircle } from 'lucide-react';

const criteria = [
  { name: 'Financial Stability', met: true, description: 'Consistent positive cash flow' },
  { name: 'Growth Rate', met: true, description: '15% YoY revenue growth' },
  { name: 'Market Position', met: true, description: 'Strong market presence' },
  { name: 'Operational Efficiency', met: false, description: 'Room for improvement in cost management' },
  { name: 'Innovation Score', met: false, description: 'Technology adoption needed' }
];

export default function RankingCriteria() {
  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Award className="w-6 h-6 text-gray-400" />
        <h2 className="text-xl font-bold">Silver Ranking Criteria</h2>
      </div>

      <div className="space-y-4">
        {criteria.map((criterion) => (
          <div key={criterion.name} className="flex items-start space-x-4 p-4 glass-card rounded-lg">
            <div className={`p-2 rounded-full ${
              criterion.met ? 'bg-primary-100' : 'bg-amber-100'
            }`}>
              {criterion.met ? (
                <Check className="w-5 h-5 text-primary-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-600" />
              )}
            </div>
            <div>
              <h3 className="font-medium">{criterion.name}</h3>
              <p className="text-sm text-gray-600">{criterion.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
