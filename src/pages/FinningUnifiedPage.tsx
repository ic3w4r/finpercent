import { useState } from 'react';
import { ChevronLeft, Building2, Factory, Target, Eye, EyeOff, X, Info, Map, Video, Search, History, GraduationCap, Cpu, Network, Camera, Activity, Bot, Zap, Database } from 'lucide-react';
import { Link } from 'react-router-dom';
import InvestmentPools from '../components/InvestmentPools';
import SankeyDiagram from '../components/charts/SankeyDiagram';

export default function FinningUnifiedPage() {
  const [activeTab, setActiveTab] = useState<'circle' | 'pool' | 'flowchart' | 'fbai'>('circle');
  const [showFlowchart, setShowFlowchart] = useState(false);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const nodeDescriptions = {
    "User Entry": {
      title: "👤 User Entry Point",
      description: "The starting point for all users joining the Finning ecosystem. This represents new members who are beginning their financial journey and seeking to connect with like-minded individuals and opportunities.",
      details: [
        "New user registration and onboarding",
        "Community introduction and orientation",
        "Initial assessment of financial goals",
        "Connection to relevant Finning paths"
      ]
    },
    "Finning Circle": {
      title: "⭕ Finning Circle",
      description: "A collaborative learning community where financial professionals, entrepreneurs, and enthusiasts gather to share knowledge, insights, and experiences. Focus on education and peer-to-peer learning.",
      details: [
        "Knowledge sharing and discussions",
        "Workshops and educational sessions",
        "Community-driven content creation",
        "Peer mentoring and support"
      ]
    },
    "Finning Pool": {
      title: "🏊 Finning Pool",
      description: "An investment and resource pooling platform where members can collectively invest in promising opportunities, share risks, and amplify returns through collaborative funding.",
      details: [
        "Collective investment opportunities",
        "Asset pooling and syndication",
        "Operations funding for businesses",
        "Shared risk and reward model"
      ]
    },
    "Workshops": {
      title: "🎓 Educational Workshops",
      description: "Structured learning sessions led by financial experts, covering topics from basic financial literacy to advanced investment strategies and business development.",
      details: [
        "Financial planning workshops",
        "Investment strategy sessions",
        "Business development training",
        "Industry-specific knowledge sharing"
      ]
    },
    "Community Posts": {
      title: "📝 Community Posts",
      description: "A dynamic feed of insights, success stories, market analysis, and discussions shared by community members. This creates a living knowledge base of financial wisdom.",
      details: [
        "Success stories and case studies",
        "Market insights and analysis",
        "Discussion threads and Q&A",
        "Real-time financial updates"
      ]
    },
    "Asset Pooling": {
      title: "📈 Asset Pooling",
      description: "A sophisticated investment mechanism where community members pool their resources to invest in high-potential opportunities, including real estate, startups, and business ventures.",
      details: [
        "Real estate investment pools",
        "Startup and business funding",
        "Collective asset management",
        "Diversified investment portfolios"
      ]
    },
    "Operations Fund": {
      title: "⚙️ Operations Fund",
      description: "A dedicated funding mechanism for operational needs of businesses and projects within the Finning ecosystem. Provides working capital and growth funding for established ventures.",
      details: [
        "Business working capital",
        "Operational expansion funding",
        "Project-specific financing",
        "Growth capital for established businesses"
      ]
    },
    "Financial Growth": {
      title: "💰 Financial Growth",
      description: "The ultimate destination representing sustainable financial success, wealth accumulation, and long-term prosperity achieved through active participation in the Finning ecosystem.",
      details: [
        "Wealth accumulation and preservation",
        "Sustainable financial independence",
        "Portfolio growth and diversification",
        "Legacy building and financial security"
      ]
    }
  };

  const handleNodeClick = (nodeName: string) => {
    setSelectedNode(nodeName);
  };



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
            <button onClick={() => setActiveTab('circle')} className={`neo-button glass-action px-4 py-2 rounded font-medium ${activeTab === 'circle' ? 'ring-2 ring-primary ring-offset-1 bg-primary/10' : ''}`}>Finning Circle</button>
            <button onClick={() => setActiveTab('pool')} className={`neo-button glass-action px-4 py-2 rounded font-medium ${activeTab === 'pool' ? 'ring-2 ring-primary ring-offset-1 bg-primary/10' : ''}`}>Finning Pool</button>
            <button onClick={() => setActiveTab('flowchart')} className={`neo-button glass-action px-4 py-2 rounded font-medium ${activeTab === 'flowchart' ? 'ring-2 ring-primary ring-offset-1 bg-primary/10' : ''}`}>Journey Map</button>
            <button onClick={() => setActiveTab('fbai')} className={`neo-button glass-action px-4 py-2 rounded font-bold bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 hover:from-green-600 hover:to-emerald-700 shadow-md ${activeTab === 'fbai' ? 'ring-2 ring-emerald-400 ring-offset-2' : ''}`}>
              <span className="flex items-center gap-1.5"><Cpu className="w-4 h-4" /> FBAI</span>
            </button>
            <Link to="/trade-centre" className="neo-button glass-action px-4 py-2 rounded flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 hover:from-blue-700 hover:to-purple-700 transition shadow-md">
              <span className="mr-1">🏪</span> Trade Centre
            </Link>
          </div>
        </div>

        {/* Tab content */}
        {activeTab === 'circle' && (
          <div className="space-y-6">
            <div className="neo-card p-6 bg-white/12 dark:bg-gray-800/20 backdrop-blur-sm border border-white/8 dark:border-gray-700/20 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">Finning Circle Hub</h2>
                <p className="text-gray-600">Explore global events, live streams, and manufacturing discovery feeds.</p>
              </div>
              <Link to="/finning-circle/dashboard" className="neo-button glass-action px-6 py-3 rounded-lg font-bold flex items-center justify-center bg-primary text-white border-0 hover:bg-primary-600 transition">
                Enter Circle Dashboard
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              <Link to="/finning-circle/dashboard" className="neo-card p-6 hover:ring-2 hover:ring-primary hover:ring-offset-2 transition-all group border-0 text-left block">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Map className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Trade Dashboard</h3>
                <p className="text-gray-600 text-sm">Global map view of active trade events, manufacturing hubs, and live pulse.</p>
              </Link>

              <Link to="/finning-circle/live" className="neo-card p-6 hover:ring-2 hover:ring-primary hover:ring-offset-2 transition-all group border-0 text-left block">
                <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Video className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Live Streams</h3>
                <p className="text-gray-600 text-sm">Join live product demonstrations, manufacturing floor tours, and real-time chat.</p>
              </Link>

              <Link to="/finning-circle/discovery" className="neo-card p-6 hover:ring-2 hover:ring-primary hover:ring-offset-2 transition-all group border-0 text-left block">
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Discovery Feed</h3>
                <p className="text-gray-600 text-sm">Scrollable video feed highlighting the latest in sustainable packaging and industrial tech.</p>
              </Link>

              <Link to="/finning-circle/timeline" className="neo-card p-6 hover:ring-2 hover:ring-primary hover:ring-offset-2 transition-all group border-0 text-left block">
                <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <History className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Events Timeline</h3>
                <p className="text-gray-600 text-sm">Chronological view of upcoming workshops, product launches, and expos.</p>
              </Link>

              <Link to="/finning-circle/venue" className="neo-card p-6 hover:ring-2 hover:ring-primary hover:ring-offset-2 transition-all group border-0 text-left block">
                <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Venue Profiles</h3>
                <p className="text-gray-600 text-sm">Detailed looks into major exhibition centers like Singapore EXPO and their SME benefits.</p>
              </Link>

              <Link to="/finning-circle/workshops" className="neo-card p-6 hover:ring-2 hover:ring-primary hover:ring-offset-2 transition-all group border-0 text-left block">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Masterclass Workshops</h3>
                <p className="text-gray-600 text-sm">Bite-sized learning modules on B2B manufacturing, global exporting, and digital marketing.</p>
              </Link>

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
                  onNodeClick={handleNodeClick}
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
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                      <div className="text-2xl mb-2">ℹ️</div>
                      <div className="font-semibold text-indigo-800 dark:text-indigo-200">Info Icons</div>
                      <div className="text-sm text-indigo-600 dark:text-indigo-300">Click for detailed descriptions</div>
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

            {/* Node Description Modal */}
            {selectedNode && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="neo-card bg-white dark:bg-gray-800 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                  <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {nodeDescriptions[selectedNode as keyof typeof nodeDescriptions]?.title}
                    </h3>
                    <button
                      onClick={() => setSelectedNode(null)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>

                  <div className="p-6">
                    <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                      {nodeDescriptions[selectedNode as keyof typeof nodeDescriptions]?.description}
                    </p>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900 dark:text-white flex items-center">
                        <Info className="w-4 h-4 mr-2 text-blue-500" />
                        Key Features:
                      </h4>
                      <ul className="space-y-2">
                        {nodeDescriptions[selectedNode as keyof typeof nodeDescriptions]?.details.map((detail, index) => (
                          <li key={index} className="flex items-start text-gray-700 dark:text-gray-300">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex justify-end p-6 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => setSelectedNode(null)}
                      className="neo-button glass-action px-6 py-2"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'fbai' && (
          <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
            <div className="neo-card p-8 bg-white/12 dark:bg-gray-800/20 backdrop-blur-md border border-white/8 dark:border-gray-700/20 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <Network className="w-48 h-48 text-primary" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl text-white shadow-lg shadow-green-500/20">
                    <Cpu className="w-8 h-8" />
                  </div>
                  <h2 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
                    FBAI <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600 font-bold">Advanced Intelligence</span>
                  </h2>
                </div>
                <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl leading-relaxed">
                  Finning Biz Advanced Intelligence bridges the gap between physical factory operations and high-level 
                  financial strategy. FBAI is an ecosystem where IoT motion tracking, Vision Intelligence, and ERP integration 
                  <strong className="text-green-600 dark:text-green-400"> boil down to understanding finance at the root level</strong>.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="neo-card p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 border border-blue-100 dark:border-blue-800/30 hover:shadow-xl transition-all group">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/30">
                  <Network className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">NATS ERP Integration</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Seamlessly connects legacy systems and cloud ERPs through the high-performance NATS decentralized nervous system. Infinite scalability with zero latency.
                </p>
              </div>

              <div className="neo-card p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/10 dark:to-teal-900/10 border border-emerald-100 dark:border-emerald-800/30 hover:shadow-xl transition-all group">
                <div className="w-12 h-12 bg-emerald-500 text-white rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-emerald-500/30">
                  <Camera className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Vision Intelligence</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Fuses CCTV infrastructure with deep-learning vision models. We monitor assembly lines, detect anomalies, and link physical bottlenecks to financial leaks.
                </p>
              </div>

              <div className="neo-card p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-fuchsia-50 dark:from-purple-900/10 dark:to-fuchsia-900/10 border border-purple-100 dark:border-purple-800/30 hover:shadow-xl transition-all group">
                <div className="w-12 h-12 bg-purple-500 text-white rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-purple-500/30">
                  <Activity className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">IoT Machine Tracking</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Sensors track the motion of raw materials, robotic arms, and final elements across the factory floor to optimize the exact energetic cost of production.
                </p>
              </div>

              <div className="neo-card p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/10 dark:to-amber-900/10 border border-orange-100 dark:border-orange-800/30 hover:shadow-xl transition-all group">
                <div className="w-12 h-12 bg-orange-500 text-white rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-orange-500/30">
                  <Bot className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Agentic Performance</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Systemic operations are automated effortlessly by Finpercent AI agents resulting in a zero-friction, highly elastic, and deeply unified business trajectory.
                </p>
              </div>
            </div>

            <div className="neo-card p-8 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 relative overflow-hidden">
              <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold uppercase tracking-widest mb-6 border border-green-200 dark:border-green-800/50">
                    <Zap className="w-3 h-3" /> System Integration
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-6">
                    How FBAI Elevates Your Business
                  </h3>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-black">1</div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Total Systemic Operations</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">By utilizing the NATS messaging protocol, disjointed factory systems, outdated ERPs, and new IoT sensor arrays now talk to each other in micro-seconds, managed continuously by Finpercent AI.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center font-black">2</div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Finance at the Root Level</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Instead of waiting for quarterly reports to understand operational costs, FBAI translates the real-time physical motion on your factory floor directly into live financial data, revealing exactly where profitability leaks occur.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black">3</div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Seamless Automation via Agents</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">The combination of real-time multi-modal data (Vision + IoT + ERP) enables our autonomous agents to execute complex systemic optimizations instantaneously, driving down costs without requiring human micro-management.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="aspect-square rounded-full border border-dashed border-gray-300 dark:border-gray-700 absolute -inset-8 animate-[spin_60s_linear_infinite]" />
                  <div className="aspect-square rounded-full border border-dashed border-primary/30 absolute -inset-4 animate-[spin_40s_linear_infinite_reverse]" />
                  
                  <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-6 border border-gray-200 dark:border-gray-700 shadow-2xl relative z-10 flex flex-col gap-4">
                    <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Live Operations Feed</span>
                      </div>
                      <Network className="w-5 h-5 text-gray-400" />
                    </div>
                    
                    <div className="space-y-3">
                      <div className="bg-gray-100 dark:bg-gray-800/50 rounded-xl p-3 flex items-center gap-4 border border-gray-200 dark:border-gray-700/50">
                        <Camera className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-bold text-gray-900 dark:text-white">CCTV: Sector 4 Assembly</span>
                            <span className="text-[10px] text-gray-500 font-mono">14ms ping</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 mt-1.5">
                            <div className="bg-emerald-500 h-1 rounded-full w-[95%]" />
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-100 dark:bg-gray-800/50 rounded-xl p-3 flex items-center gap-4 border border-gray-200 dark:border-gray-700/50">
                        <Activity className="w-6 h-6 text-purple-500 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-bold text-gray-900 dark:text-white">IoT: Arm Motion Tracking</span>
                            <span className="text-[10px] text-gray-500 font-mono">Synced</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 mt-1.5">
                            <div className="bg-purple-500 h-1 rounded-full w-[88%]" />
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-100 dark:bg-gray-800/50 rounded-xl p-3 flex items-center gap-4 border border-gray-200 dark:border-gray-700/50">
                        <Database className="w-6 h-6 text-blue-500 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-bold text-gray-900 dark:text-white">ERP: Legacy SAP Sync</span>
                            <span className="text-[10px] text-gray-500 font-mono">via NATS</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 mt-1.5">
                            <div className="bg-blue-500 h-1 rounded-full w-[100%]" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-2 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 rounded-xl flex items-start gap-3">
                      <Bot className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-green-800 dark:text-green-300">Agent Action Executed</p>
                        <p className="text-[10px] text-green-600 dark:text-green-400 font-medium leading-relaxed mt-1">Micro-stoppage detected via Vision AI. Re-routed supply flow to Conveyor B avoiding <strong className="text-green-700 dark:text-green-300">$14k</strong> bottleneck cost.</p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
