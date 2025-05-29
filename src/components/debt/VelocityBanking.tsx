import React from 'react';
import { CreditCard, ArrowRight, PiggyBank } from 'lucide-react';
import { LineChart } from '../charts/LineChart';

const chartData = [
  { date: 'Month 1', value: 50000 },
  { date: 'Month 6', value: 45000 },
  { date: 'Month 12', value: 38000 },
  { date: 'Month 18', value: 29000 },
  { date: 'Month 24', value: 18000 }
];

export default function VelocityBanking() {
  return (
    <div className="space-y-6">
      <div className="glass-card p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4">Velocity Banking Strategy</h2>
        <p className="text-gray-600 mb-6">
          Use a line of credit to accelerate debt repayment by leveraging the difference between credit line and mortgage interest rates.
        </p>

        <div className="h-64 mb-6">
          <LineChart data={chartData} />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="neo-card p-4 rounded-xl">
            <div className="flex items-center space-x-3 mb-3">
              <CreditCard className="w-5 h-5 text-primary-600" />
              <h3 className="font-medium">Credit Line Details</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Available Credit</span>
                <span className="font-medium">$25,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Interest Rate</span>
                <span className="font-medium">8.99%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Due</span>
                <span className="font-medium">$350/month</span>
              </div>
            </div>
          </div>

          <div className="neo-card p-4 rounded-xl">
            <div className="flex items-center space-x-3 mb-3">
              <PiggyBank className="w-5 h-5 text-primary-600" />
              <h3 className="font-medium">Savings Projection</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Interest Saved</span>
                <span className="font-medium">$12,450</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time Saved</span>
                <span className="font-medium">5.2 years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Next Milestone</span>
                <span className="font-medium">3 months</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card p-6 rounded-xl">
        <h3 className="text-lg font-bold mb-4">Implementation Steps</h3>
        <div className="space-y-4">
          {[
            {
              title: "Setup Credit Line",
              description: "Apply for a HELOC or personal line of credit"
            },
            {
              title: "Transfer Strategy",
              description: "Move high-interest debt to lower-interest credit line"
            },
            {
              title: "Payment Optimization",
              description: "Maximize payments to reduce principal faster"
            },
            {
              title: "Monitor Progress",
              description: "Track interest savings and adjust strategy as needed"
            }
          ].map((step, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 neo-card rounded-xl">
              <div className="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="font-medium text-primary-600">{index + 1}</span>
              </div>
              <div className="flex-grow">
                <h4 className="font-medium">{step.title}</h4>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
