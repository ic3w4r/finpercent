import React from 'react';
import { ArrowRight, DollarSign } from 'lucide-react';
import { LineChart } from '../charts/LineChart';

const chartData = [
  { date: 'Month 1', value: 45000 },
  { date: 'Month 6', value: 38000 },
  { date: 'Month 12', value: 28000 },
  { date: 'Month 18', value: 15000 },
  { date: 'Month 24', value: 0 }
];

const debts = [
  {
    name: "Credit Card A",
    balance: 8000,
    rate: 22.99,
    payment: 350
  },
  {
    name: "Personal Loan",
    balance: 15000,
    rate: 15.5,
    payment: 450
  },
  {
    name: "Credit Card B",
    balance: 5000,
    rate: 19.99,
    payment: 200
  },
  {
    name: "Auto Loan",
    balance: 12000,
    rate: 6.99,
    payment: 300
  }
];

export default function AvalancheMethod() {
  return (
    <div className="space-y-6">
      <div className="glass-card p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4">Debt Avalanche Strategy</h2>
        <p className="text-gray-600 mb-6">
          Focus on paying off debts with the highest interest rates first while maintaining minimum payments on others.
        </p>

        <div className="h-64 mb-6">
          <LineChart data={chartData} />
        </div>

        <div className="space-y-4">
          {debts.sort((a, b) => b.rate - a.rate).map((debt, index) => (
            <div key={index} className="neo-card p-4 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary-50 rounded-full">
                    <DollarSign className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{debt.name}</h3>
                    <p className="text-sm text-gray-600">
                      {debt.rate}% APR
                    </p>
                  </div>
                </div>
                <span className="font-bold">${debt.balance.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Monthly Payment</span>
                <span className="font-medium">${debt.payment}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card p-6 rounded-xl">
        <h3 className="text-lg font-bold mb-4">Implementation Steps</h3>
        <div className="space-y-4">
          {[
            {
              title: "List and Sort Debts",
              description: "Order debts by interest rate, highest to lowest"
            },
            {
              title: "Minimum Payments",
              description: "Make minimum payments on all lower-interest debts"
            },
            {
              title: "Extra Payments",
              description: "Apply extra money to highest-interest debt"
            },
            {
              title: "Repeat Process",
              description: "Move to next highest interest debt when one is paid off"
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
