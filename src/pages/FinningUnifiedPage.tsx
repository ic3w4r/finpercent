import { useState } from 'react';
import { ChevronLeft, Users, ThumbsUp, MessageSquare, Share2, Building2, Factory, Target, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import InvestmentPools from '../components/InvestmentPools';
import SankeyDiagram from '../components/charts/SankeyDiagram';

export default function FinningUnifiedPage() {
  const [activeTab, setActiveTab] = useState<'circle' | 'pool' | 'flowchart'>('circle');
  const [showFlowchart, setShowFlowchart] = useState(false);

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
            <button onClick={() => setActiveTab('flowchart')} className={`neo-button glass-action px-4 py-2 rounded ${activeTab==='flowchart'?'ring-2 ring-offset-1':''}`}>Journey Map</button>
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

        {activeTab === 'flowchart' && (
          <div className="space-y-6">
            <div className="neo-card p-6 bg-white/12 dark:bg-gray-800/20 backdrop-blur-sm border border-white/8 dark:border-gray-700/20 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Finning Journey Map</h2>
                  <p className="text-gray-600">Visual overview of your financial growth path through the Finning ecosystem</p>
                </div>
                <button
                  onClick={() => setShowFlowchart(!showFlowchart)}
                  className="neo-button glass-action px-4 py-2 flex items-center gap-2"
                >
                  {showFlowchart ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {showFlowchart ? 'Hide' : 'Show'} Flowchart
                </button>
              </div>
            </div>

            {showFlowchart && (
              <div className="space-y-6">
                {/* Interactive Sankey Diagram */}
                <SankeyDiagram 
                  data={{
                    nodes: [
                      { name: "User Entry", value: 1000 },
                      { name: "Finning Circle", value: 500 },
                      { name: "Finning Pool", value: 500 },
                      { name: "Workshops", value: 250 },
                      { name: "Community Posts", value: 250 },
                      { name: "Asset Pooling", value: 300 },
                      { name: "Operations Fund", value: 200 },
                      { name: "Financial Growth", value: 1000 }
                    ],
                    links: [
                      { source: 0, target: 1, value: 500 }, // User Entry → Finning Circle
                      { source: 0, target: 2, value: 500 }, // User Entry → Finning Pool
                      { source: 1, target: 3, value: 200 }, // Finning Circle → Workshops
                      { source: 1, target: 4, value: 300 }, // Finning Circle → Community Posts
                      { source: 2, target: 5, value: 300 }, // Finning Pool → Asset Pooling
                      { source: 2, target: 6, value: 200 }, // Finning Pool → Operations Fund
                      { source: 3, target: 7, value: 200 }, // Workshops → Financial Growth
                      { source: 4, target: 7, value: 300 }, // Community Posts → Financial Growth
                      { source: 5, target: 7, value: 300 }, // Asset Pooling → Financial Growth
                      { source: 6, target: 7, value: 200 }  // Operations Fund → Financial Growth
                    ]
                  }}
                  width={900}
                  height={500}
                />

                {/* Enhanced Navigation Guide */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="neo-card p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                    <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      Journey Stages
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                        <div>
                          <div className="font-semibold text-blue-800 dark:text-blue-200">Start</div>
                          <div className="text-sm text-blue-600 dark:text-blue-300">Join the Finning community</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                        <div>
                          <div className="font-semibold text-purple-800 dark:text-purple-200">Choose Path</div>
                          <div className="text-sm text-purple-600 dark:text-purple-300">Circle (learn) or Pool (invest)</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                        <div>
                          <div className="font-semibold text-green-800 dark:text-green-200">Engage</div>
                          <div className="text-sm text-green-600 dark:text-green-300">Participate in activities</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
                        <div>
                          <div className="font-semibold text-emerald-800 dark:text-emerald-200">Achieve</div>
                          <div className="text-sm text-emerald-600 dark:text-emerald-300">Reach financial growth</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="neo-card p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                    <h4 className="font-bold text-green-900 dark:text-green-100 mb-4 flex items-center">
                      <Building2 className="w-5 h-5 mr-2" />
                      Path Options
                    </h4>
                    <div className="space-y-4">
                      <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-green-200 dark:border-green-700">
                        <div className="flex items-center mb-2">
                          <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                          <span className="font-semibold text-purple-800 dark:text-purple-200">Finning Circle Path</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Focus on learning and community building</p>
                        <div className="flex flex-wrap gap-1">
                          <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded">Workshops</span>
                          <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded">Community Posts</span>
                        </div>
                      </div>
                      <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-green-200 dark:border-green-700">
                        <div className="flex items-center mb-2">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                          <span className="font-semibold text-yellow-800 dark:text-yellow-200">Finning Pool Path</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Focus on investment and business growth</p>
                        <div className="flex flex-wrap gap-1">
                          <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 text-xs rounded">Asset Pooling</span>
                          <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 text-xs rounded">Operations Fund</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interactive Features */}
                <div className="neo-card p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
                  <h4 className="font-bold text-indigo-900 dark:text-indigo-100 mb-4">Interactive Features</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                      <div className="text-2xl mb-2">🔍</div>
                      <div className="font-semibold text-indigo-800 dark:text-indigo-200">Hover Flows</div>
                      <div className="text-sm text-indigo-600 dark:text-indigo-300">See detailed values and connections</div>
                    </div>
                    <div className="text-center p-4 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                      <div className="text-2xl mb-2">📊</div>
                      <div className="font-semibold text-indigo-800 dark:text-indigo-200">Visual Analytics</div>
                      <div className="text-sm text-indigo-600 dark:text-indigo-300">Understand flow distribution</div>
                    </div>
                    <div className="text-center p-4 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                      <div className="text-2xl mb-2">🎯</div>
                      <div className="font-semibold text-indigo-800 dark:text-indigo-200">Path Guidance</div>
                      <div className="text-sm text-indigo-600 dark:text-indigo-300">Clear journey progression</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
