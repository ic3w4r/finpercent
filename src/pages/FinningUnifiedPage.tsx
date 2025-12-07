import { useState } from 'react';
import { ChevronLeft, Users, ThumbsUp, MessageSquare, Share2, Building2, Factory, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import InvestmentPools from '../components/InvestmentPools';

export default function FinningUnifiedPage() {
  const [activeTab, setActiveTab] = useState<'circle' | 'pool'>('circle');

  const posts = [
    {
      id: 1,
      author: { name: 'Priya Sharma', company: 'Tech Innovations Ltd', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100' },
      content: 'Just implemented the S.T.O.P method in our company. Seeing great results in financial management!',
      likes: 245,
      comments: 28,
      shares: 12
    },
    {
      id: 2,
      author: { name: 'Rahul Mehta', company: 'Growth Ventures', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100' },
      content: 'Hosting a workshop on effective budgeting strategies next week. Join us to learn more about financial planning!',
      likes: 189,
      comments: 42,
      shares: 15
    }
  ];

  const upcomingSessions = [
    { id: 1, title: 'Financial Planning Workshop', date: '2024-03-25', time: '14:00', host: 'Sarah Johnson', attendees: 156 },
    { id: 2, title: 'Investment Strategies Seminar', date: '2024-03-28', time: '15:30', host: 'Michael Chen', attendees: 203 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-beige-50 to-primary-100 p-6 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link to="/explore" className="text-primary-600 hover:text-primary-700 flex items-center">
              <ChevronLeft className="w-5 h-5 mr-2" /> Back
            </Link>
            <h1 className="text-3xl font-bold text-primary-900">Finning Hub</h1>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={() => setActiveTab('circle')} className={`neo-button glass-action px-4 py-2 rounded ${activeTab==='circle'?'ring-2 ring-offset-1':''}`}>Finning Circle</button>
            <button onClick={() => setActiveTab('pool')} className={`neo-button glass-action px-4 py-2 rounded ${activeTab==='pool'?'ring-2 ring-offset-1':''}`}>Finning Pool</button>
          </div>
        </div>

        {/* Tab content */}
        {activeTab === 'circle' && (
          <div className="space-y-6">
            <div className="neo-card p-6 bg-white/12 dark:bg-gray-800/20 backdrop-blur-sm border border-white/8 dark:border-gray-700/20 rounded-2xl">
              <h2 className="text-2xl font-bold">Finning Circle</h2>
              <p className="text-gray-600">Community-driven discussions, workshops and peer sessions for financial leaders.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="neo-card p-6">
                <h3 className="text-xl font-bold mb-4">Upcoming Sessions</h3>
                <div className="space-y-4">
                  {upcomingSessions.map((session) => (
                    <div key={session.id} className="neo-card p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{session.title}</h3>
                          <p className="text-sm text-gray-600">{session.date} at {session.time}</p>
                          <p className="text-sm text-primary-600">Hosted by {session.host}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{session.attendees}</span>
                        </div>
                      </div>
                      <button className="neo-button glass-action mt-4 w-full">Join Session</button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="neo-card p-6">
                <h3 className="text-xl font-bold mb-4">Community Posts</h3>
                <div className="space-y-4">
                  {posts.map((post) => (
                    <div key={post.id} className="glass-card p-4">
                      <div className="flex items-center space-x-4 mb-4">
                        <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-full" />
                        <div>
                          <h3 className="font-semibold">{post.author.name}</h3>
                          <p className="text-sm text-gray-600">{post.author.company}</p>
                        </div>
                      </div>
                      <p className="text-gray-800 mb-4">{post.content}</p>
                      <div className="flex justify-between border-t pt-4">
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-primary-600"><ThumbsUp className="w-5 h-5" /><span>{post.likes}</span></button>
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-primary-600"><MessageSquare className="w-5 h-5" /><span>{post.comments}</span></button>
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-primary-600"><Share2 className="w-5 h-5" /><span>{post.shares}</span></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pool' && (
          <div className="space-y-6">
            <div className="neo-card p-6 bg-white/12 dark:bg-gray-800/20 backdrop-blur-sm border border-white/8 dark:border-gray-700/20 rounded-2xl">
              <h2 className="text-2xl font-bold">Finning Pool</h2>
              <p className="text-gray-600">Pooling solutions for asset building and operational funding — join or create pools.</p>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-left">
                <h3 className="text-xl font-bold">Investment Pooling Platform</h3>
                <p className="text-gray-600">Advanced pooling solutions for asset building and operational funding with comprehensive risk assessment and monitoring systems.</p>
              </div>
              <div className="space-x-3">
                <Link to="/investment-pooling/asset" className="neo-button glass-action px-4 py-2 inline-block text-center">Start Asset Pooling</Link>
                <Link to="/investment-pooling/operations" className="neo-button glass-action px-4 py-2 inline-block text-center">Apply for Operations Fund</Link>
              </div>
            </div>

            {/* Reuse InvestmentPools component for the grid */}
            <InvestmentPools />

            <div className="grid md:grid-cols-3 gap-6">
              <div className="glass-card p-6 rounded-xl">
                <Building2 className="w-8 h-8 text-blue-600 mb-4" />
                <h4 className="font-bold text-gray-800 mb-2">Commercial Real Estate</h4>
                <p className="text-gray-600 text-sm mb-3">Office buildings, retail spaces, and commercial complexes</p>
                <div className="text-sm text-blue-600 font-medium">ROI: 15-22%</div>
              </div>
              <div className="glass-card p-6 rounded-xl">
                <Factory className="w-8 h-8 text-green-600 mb-4" />
                <h4 className="font-bold text-gray-800 mb-2">Industrial Assets</h4>
                <p className="text-gray-600 text-sm mb-3">Manufacturing facilities, warehouses, and logistics centers</p>
                <div className="text-sm text-green-600 font-medium">ROI: 12-18%</div>
              </div>
              <div className="glass-card p-6 rounded-xl">
                <Target className="w-8 h-8 text-purple-600 mb-4" />
                <h4 className="font-bold text-gray-800 mb-2">Development Land</h4>
                <p className="text-gray-600 text-sm mb-3">Strategic land acquisition for future development projects</p>
                <div className="text-sm text-purple-600 font-medium">ROI: 20-35%</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
