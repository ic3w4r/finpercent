// React import not required with new JSX transform
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
    <div className="neo-card space-y-6 p-6 rounded-xl bg-white/12 backdrop-blur-sm border border-white/8">
      <div>
        <h2 className="text-2xl font-bold text-primary-800">Join the pool</h2>
        <p className="text-gray-600 mt-1">Industries are coming together to get access to more funding</p>
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
        <button className="neo-button glass-action px-6 py-2 rounded-full text-primary-700 bg-white/6">
          Invite friends
        </button>
        <button className="neo-button glass-action px-6 py-2 rounded-full flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
          <span>Discover</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
