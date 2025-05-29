import React from 'react';
import { ArrowRight } from 'lucide-react';

const industries = [
  {
    name: 'Retail',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=300'
  },
  {
    name: 'Technology',
    image: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&q=80&w=300'
  },
  {
    name: 'Healthcare',
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=300'
  },
  {
    name: 'Real Estate',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=300'
  }
];

export default function InvestmentPools() {
  return (
    <div className="glass-container space-y-6 p-6 rounded-xl">
      <div>
        <h2 className="text-2xl font-bold text-gray-200">Join the pool</h2>
        <p className="text-gray-300 mt-1">Industries are coming together to get access to more funding</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {industries.map((industry) => (
          <div key={industry.name} className="relative rounded-xl overflow-hidden neomorphic-shadow">
            <img 
              src={industry.image} 
              alt={industry.name}
              className="w-full h-40 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
              <span className="text-white font-medium">{industry.name}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <button className="px-6 py-2 glass-button rounded-full text-gray-200">
          Invite friends
        </button>
        <button className="px-6 py-2 glass-button-primary rounded-full flex items-center space-x-2">
          <span>Discover</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
