import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FinningCircleNav from '../../components/finning-circle/FinningCircleNav';
import {
  Play, Heart, MessageCircle, Bookmark, Share2, ShoppingCart, 
  Plus, CheckCircle2, ChevronDown, ChevronUp, Send, X, Volume2, Globe, VolumeX, Sparkles, AlertCircle
} from 'lucide-react';

interface Reel {
  id: number;
  companyName: string;
  category: string;
  location: string;
  description: string;
  image: string;
  likes: number;
  commentsCount: number;
  comments: { user: string; text: string; time: string }[];
  soundTrack: string;
  sticker: {
    type: 'live' | 'marketplace' | 'workshop' | 'venue';
    title: string;
    path: string;
  };
}

const REELS_DATA: Reel[] = [
  {
    id: 1,
    companyName: 'Apex Precision Fab',
    category: 'fabrication',
    location: 'Peenya Industrial Area, Bangalore',
    description: 'Watch our 4kW Fiber Laser Cutting machine slice through 12mm stainless steel sheets with micron accuracy. Dynamic nesting in progress! 🔩⚙️',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop',
    likes: 1248,
    commentsCount: 24,
    comments: [
      { user: 'Babu Lal', text: 'Can you cut 16mm MS plates?', time: '2h ago' },
      { user: 'Sanjay_Procurement', text: 'What is the bed size of the laser machine?', time: '4h ago' },
      { user: 'Rakesh Nair', text: 'Tolerances are impressive. Sent enquiry.', time: '1d ago' }
    ],
    soundTrack: 'Original Audio • Apex Fab',
    sticker: {
      type: 'live',
      title: '🔴 Join Live CNC Demo',
      path: '/finning-circle/live'
    }
  },
  {
    id: 2,
    companyName: 'EcoPack Global',
    category: 'packaging',
    location: 'Trichy Industrial Cluster, TN',
    description: 'Running our new automated bio-degradable wrapping machine. Speeds up to 45 packages per minute with zero plastic waste! 📦🌱',
    image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?q=80&w=2074&auto=format&fit=crop',
    likes: 934,
    commentsCount: 12,
    comments: [
      { user: 'GreenProcure', text: 'Do you supply customized printing wrappers?', time: '1h ago' },
      { user: 'Dev_Furniture', text: 'Is this moisture-resistant?', time: '3h ago' }
    ],
    soundTrack: 'GreenTech Pulse • EcoPack',
    sticker: {
      type: 'marketplace',
      title: '🛍️ View Specs & Pricing',
      path: '/finning-circle/product'
    }
  },
  {
    id: 3,
    companyName: 'Studio Woodkrafts',
    category: 'interiors',
    location: 'Pune MIDC, Maharashtra',
    description: 'CNC router edge-banding modular kitchen cabinets in ISI-grade marine plywood. Premium matte finish ready for assembly! 🛋️✨',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2070&auto=format&fit=crop',
    likes: 1542,
    commentsCount: 42,
    comments: [
      { user: 'Anjali_Home', text: 'Is Hettich hardware standard or optional?', time: '30m ago' },
      { user: 'BuilderCorp', text: 'Looking for bulk wardrobes supply in Mumbai.', time: '12h ago' }
    ],
    soundTrack: 'Deep Focus Woodcrafts',
    sticker: {
      type: 'workshop',
      title: '🎓 Register for Design Masterclass',
      path: '/finning-circle/workshops'
    }
  },
  {
    id: 4,
    companyName: 'Bharat AgriMachinery',
    category: 'machinery',
    location: 'Coimbatore Hub, Tamil Nadu',
    description: 'Stamping press line operating. 200-ton capacity metal sheet drawing for tractor hoods. High reliability, high force! 🚜⚡',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070&auto=format&fit=crop',
    likes: 812,
    commentsCount: 8,
    comments: [
      { user: 'AgriDealer', text: 'What is the daily stroke rate?', time: '2d ago' }
    ],
    soundTrack: 'Industrial Rhythm • Bharat Mach',
    sticker: {
      type: 'venue',
      title: '🏢 Meet Us at Singapore Expo',
      path: '/finning-circle/venue'
    }
  }
];

export default function FinningCircleDiscovery() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isLiking, setIsLiking] = useState(false);
  const [likedList, setLikedList] = useState<number[]>([]);
  const [showComments, setShowComments] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [commentsList, setCommentsList] = useState<any[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);

  // Filter reels based on selection
  const filteredReels = activeFilter === 'all' 
    ? REELS_DATA 
    : REELS_DATA.filter(r => r.category === activeFilter);

  const currentReel = filteredReels[currentReelIndex] || REELS_DATA[0];

  // Simulated Wireframe Skeleton Loading Trigger
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1100);
    return () => clearTimeout(timer);
  }, [activeFilter, currentReelIndex]);

  // Video progress indicator simulation
  useEffect(() => {
    if (loading) return;
    setVideoProgress(0);
    const interval = setInterval(() => {
      setVideoProgress(prev => {
        if (prev >= 100) return 0; // loops
        return prev + 1.25;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [loading, currentReelIndex]);

  // Sync comments when current reel changes
  useEffect(() => {
    if (currentReel) {
      setCommentsList(currentReel.comments);
    }
  }, [currentReelIndex, activeFilter]);

  const handleNextReel = () => {
    if (currentReelIndex < filteredReels.length - 1) {
      setCurrentReelIndex(prev => prev + 1);
    } else {
      setCurrentReelIndex(0); // loop to start
    }
  };

  const handlePrevReel = () => {
    if (currentReelIndex > 0) {
      setCurrentReelIndex(prev => prev - 1);
    }
  };

  const handleLikeToggle = (reelId: number) => {
    if (likedList.includes(reelId)) {
      setLikedList(prev => prev.filter(id => id !== reelId));
    } else {
      setLikedList(prev => [...prev, reelId]);
      setIsLiking(true);
      setTimeout(() => setIsLiking(false), 800);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    const newComment = {
      user: 'You_GST_Owner',
      text: commentInput.trim(),
      time: 'Just now'
    };
    setCommentsList(prev => [newComment, ...prev]);
    setCommentInput('');
  };

  const handleCopyLink = () => {
    alert('📋 Shareable link copied to clipboard!');
    setShowShare(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 overflow-hidden text-left">
      <FinningCircleNav />

      {/* Main Container: Sidebar + Centered Reels Frame */}
      <div className="flex flex-1 overflow-hidden h-[calc(100vh-120px)] relative">
        
        {/* Left Sidebar - Industry Navigation */}
        <aside className="w-64 hidden lg:flex flex-col border-r border-gray-200 dark:border-gray-800 p-6 space-y-4 overflow-y-auto bg-white/40 backdrop-blur-sm">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono">B2B Trade categories</p>
          </div>
          <nav className="space-y-1.5 text-xs font-semibold">
            {[
              { id: 'all', label: '🌍 All Industries' },
              { id: 'fabrication', label: '🔩 Fabrication & Machining' },
              { id: 'packaging', label: '📦 Packaging & Wrapping' },
              { id: 'interiors', label: '🛋️ Modular Interiors' },
              { id: 'machinery', label: '🚜 Agricultural Machinery' }
            ].map(filter => (
              <button
                key={filter.id}
                onClick={() => {
                  setActiveFilter(filter.id);
                  setCurrentReelIndex(0);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                  activeFilter === filter.id
                    ? 'bg-primary text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </nav>

          <div className="pt-6 border-t border-gray-150 dark:border-gray-800">
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl space-y-2">
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider font-mono">
                ✓ TradeStream Live
              </span>
              <p className="text-[10px] text-gray-500 leading-relaxed">
                Browse short clips to check SME capabilities, machinery specs, and factory setups. Connect instantly via WhatsApp overlays.
              </p>
            </div>
          </div>
        </aside>

        {/* Center: Immersive Instagram-style Reels Frame */}
        <main className="flex-1 flex items-center justify-center bg-gray-100 dark:bg-gray-900/50 p-2 md:p-6 overflow-hidden relative">
          
          {/* MOBILE PHONE MOCKUP CONTAINER */}
          <div className="relative w-full max-w-[395px] h-[calc(100vh-170px)] max-h-[730px] rounded-[48px] border-[12px] border-gray-950 dark:border-gray-800 bg-black shadow-2xl flex flex-col overflow-hidden relative ring-4 ring-offset-4 ring-primary-950/15">
            
            {/* Phone Notch / Dynamic Island Mock */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-full z-40 flex items-center justify-center">
              <div className="w-3.5 h-3.5 bg-gray-900 rounded-full ml-auto mr-4 border border-gray-800"></div>
            </div>

            {/* Phone Status Bar Mock */}
            <div className="absolute top-1 inset-x-0 h-8 flex items-center justify-between px-8 text-white/90 text-[10px] font-semibold z-30 font-mono select-none">
              <span>2:45 PM</span>
              <div className="flex items-center gap-1">
                <span>5G</span>
                <div className="w-5 h-2.5 border border-white/80 rounded-sm p-0.5 flex items-center">
                  <div className="h-full w-4/5 bg-white rounded-2xs"></div>
                </div>
              </div>
            </div>

            {loading ? (
              // WIREFRAME SKELETON LOADING BUFFER
              <div className="absolute inset-0 bg-gray-900 flex flex-col justify-between p-6 pt-16 animate-pulse z-20">
                <div className="space-y-4">
                  {/* Category Pill Skeleton */}
                  <div className="h-6 w-1/3 bg-gray-800 rounded-full"></div>
                </div>

                {/* Center Circle Loading icon */}
                <div className="self-center w-14 h-14 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 animate-spin"></div>

                <div className="space-y-4">
                  {/* Info blocks skeleton */}
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-gray-800 rounded-full"></div>
                    <div className="space-y-2 flex-1">
                      <div className="h-3.5 w-1/2 bg-gray-800 rounded"></div>
                      <div className="h-3 w-1/3 bg-gray-800 rounded"></div>
                    </div>
                  </div>
                  <div className="h-3.5 w-full bg-gray-800 rounded"></div>
                  <div className="h-3.5 w-3/4 bg-gray-800 rounded"></div>
                  <div className="h-10 w-full bg-gray-850 rounded-xl mt-4"></div>
                </div>
              </div>
            ) : (
              // IMMERSIVE REELS PLAYER CONTENT
              <div className="absolute inset-0 flex flex-col justify-between text-white z-10 select-none">
                
                {/* Background Image / Simulated Video */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-all duration-300"
                  style={{ backgroundImage: `url('${currentReel.image}')` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/85"></div>
                </div>

                {/* Immersive Play/Pause & Mute controls */}
                <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/0 active:bg-black/15 transition-colors">
                  {isLiking && (
                    <div className="text-red-500 animate-ping absolute">
                      <Heart className="w-24 h-24 fill-current text-red-500" />
                    </div>
                  )}
                  <button 
                    onClick={() => setIsMuted(!isMuted)}
                    className="absolute top-16 right-4 p-2 bg-black/45 backdrop-blur-md border border-white/10 rounded-full hover:bg-black/60 transition"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>

                {/* Reels Header (Top Category Tag) */}
                <div className="relative z-10 pt-14 px-5 flex justify-between items-center">
                  <span className="text-[10px] font-bold bg-emerald-500 text-white px-3 py-1 rounded-full uppercase tracking-wider font-mono shadow-md">
                    {currentReel.category.toUpperCase()}
                  </span>
                  <div className="flex gap-2">
                    <button 
                      onClick={handlePrevReel} 
                      disabled={currentReelIndex === 0}
                      className="p-1 bg-black/45 backdrop-blur-md rounded-full border border-white/10 hover:bg-black/60 disabled:opacity-30"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={handleNextReel}
                      className="p-1 bg-black/45 backdrop-blur-md rounded-full border border-white/10 hover:bg-black/60"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* RIGHT FLOATING SIDEBAR (Interaction Icons) */}
                <div className="absolute right-3.5 bottom-36 flex flex-col items-center gap-5 z-20">
                  {/* Profile Plus Add icon */}
                  <div className="relative group cursor-pointer mb-2">
                    <div className="w-10 h-10 rounded-full border-2 border-emerald-500 bg-gray-800 flex items-center justify-center font-bold text-xs uppercase text-emerald-300">
                      {currentReel.companyName.substring(0,2)}
                    </div>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow">
                      <Plus className="w-3 h-3" />
                    </div>
                  </div>

                  {/* Liking */}
                  <button 
                    onClick={() => handleLikeToggle(currentReel.id)} 
                    className="flex flex-col items-center group focus:outline-none"
                  >
                    <div className={`p-2.5 bg-black/45 backdrop-blur-sm rounded-full border border-white/10 hover:bg-primary/20 transition-all ${
                      likedList.includes(currentReel.id) ? 'text-red-500 bg-red-500/10 border-red-500/20' : 'text-white'
                    }`}>
                      <Heart className={`w-5 h-5 ${likedList.includes(currentReel.id) ? 'fill-current' : ''}`} />
                    </div>
                    <span className="text-[10px] font-bold mt-1 shadow-sm">
                      {likedList.includes(currentReel.id) ? currentReel.likes + 1 : currentReel.likes}
                    </span>
                  </button>

                  {/* Comments Drawer Trigger */}
                  <button 
                    onClick={() => setShowComments(true)}
                    className="flex flex-col items-center group focus:outline-none"
                  >
                    <div className="p-2.5 bg-black/45 backdrop-blur-sm rounded-full border border-white/10 hover:bg-primary/20 transition-all text-white">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold mt-1 shadow-sm">{commentsList.length}</span>
                  </button>

                  {/* Share Trigger */}
                  <button 
                    onClick={() => setShowShare(true)}
                    className="flex flex-col items-center group focus:outline-none"
                  >
                    <div className="p-2.5 bg-black/45 backdrop-blur-sm rounded-full border border-white/10 hover:bg-primary/20 transition-all text-white">
                      <Share2 className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold mt-1 shadow-sm">Share</span>
                  </button>

                  {/* Bookmark Save */}
                  <button className="flex flex-col items-center group focus:outline-none">
                    <div className="p-2.5 bg-black/45 backdrop-blur-sm rounded-full border border-white/10 hover:bg-primary/20 transition-all text-white">
                      <Bookmark className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold mt-1 shadow-sm">Save</span>
                  </button>
                </div>

                {/* BOTTOM DETAILS PANEL */}
                <div className="relative z-10 p-5 space-y-4 bg-gradient-to-t from-black via-black/40 to-transparent pt-16">
                  
                  {/* Seller Bio / Verified Badge */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm tracking-wide text-white">{currentReel.companyName}</h3>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 fill-current" />
                      <span className="text-[8px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/35 px-1.5 py-0.5 rounded font-mono uppercase font-bold">
                        Passport Level 3
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-300 flex items-center gap-1">
                      <Globe className="w-3 h-3 text-emerald-400 shrink-0" /> {currentReel.location}
                    </p>
                  </div>

                  {/* Video Description */}
                  <p className="text-xs text-gray-200 leading-relaxed font-medium line-clamp-3">
                    {currentReel.description}
                  </p>

                  <p className="text-[9px] text-gray-400 font-mono tracking-wider font-semibold">
                    🎵 {currentReel.soundTrack}
                  </p>

                  {/* KEY ASPECT CROSS-PRODUCT STICKER OVERLAYS */}
                  <div className="pt-2">
                    <button
                      onClick={() => navigate(currentReel.sticker.path)}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-2xl flex items-center justify-center gap-2 text-xs shadow-lg transition-transform active:scale-95 border border-emerald-500"
                    >
                      <Sparkles className="w-4 h-4 animate-bounce" />
                      <span>{currentReel.sticker.title}</span>
                    </button>
                  </div>

                </div>

                {/* Auto Play Video looping progress bar */}
                <div className="absolute bottom-0 left-0 h-1 bg-emerald-500 transition-all duration-100 ease-linear z-30" style={{ width: `${videoProgress}%` }}></div>

              </div>
            )}

            {/* SLIDE-UP COMMENTS DRAWER */}
            {showComments && (
              <div className="absolute inset-x-0 bottom-0 h-3/5 bg-white dark:bg-gray-900 rounded-t-3xl p-5 text-gray-900 dark:text-white z-30 flex flex-col justify-between shadow-2xl border-t border-gray-250 dark:border-gray-800 animate-slideUp">
                <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3">
                  <h4 className="font-bold text-sm">Comments ({commentsList.length})</h4>
                  <button onClick={() => setShowComments(false)} className="p-1 text-gray-400 hover:text-gray-600">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Comments List */}
                <div className="flex-1 overflow-y-auto py-4 space-y-4 custom-scrollbar text-xs">
                  {commentsList.map((comm, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-850 flex items-center justify-center font-bold text-emerald-500 font-mono">
                        {comm.user.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold">{comm.user}</span>
                          <span className="text-[9px] text-gray-400 font-mono">{comm.time}</span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mt-0.5 leading-relaxed">{comm.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Comment Input */}
                <form onSubmit={handleAddComment} className="border-t border-gray-150 dark:border-gray-800 pt-3 flex gap-2">
                  <input
                    type="text"
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder="Ask Apex Precision Fab about cut speed..."
                    className="flex-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-xs"
                  />
                  <button type="submit" className="bg-primary text-white p-2.5 rounded-xl hover:bg-primary-600">
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

            {/* SHARE OVERLAY POPUP */}
            {showShare && (
              <div className="absolute inset-x-0 bottom-0 bg-white dark:bg-gray-900 rounded-t-3xl p-5 text-gray-900 dark:text-white z-30 space-y-4 shadow-2xl border-t border-gray-250 dark:border-gray-800 animate-slideUp">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-sm">Share Capability Proof</h4>
                  <button onClick={() => setShowShare(false)} className="p-1 text-gray-400 hover:text-gray-600">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center text-[10px] font-bold">
                  <button onClick={handleCopyLink} className="p-3 bg-gray-50 dark:bg-gray-850 rounded-xl flex flex-col items-center gap-2 hover:bg-emerald-500/10">
                    <span className="text-xl">🔗</span>
                    <span>Copy Link</span>
                  </button>
                  <button onClick={handleCopyLink} className="p-3 bg-gray-50 dark:bg-gray-850 rounded-xl flex flex-col items-center gap-2 hover:bg-emerald-500/10">
                    <span className="text-xl">💬</span>
                    <span>WhatsApp</span>
                  </button>
                  <button onClick={handleCopyLink} className="p-3 bg-gray-50 dark:bg-gray-850 rounded-xl flex flex-col items-center gap-2 hover:bg-emerald-500/10">
                    <span className="text-xl">✉️</span>
                    <span>Email Link</span>
                  </button>
                </div>
              </div>
            )}

          </div>

        </main>

      </div>
    </div>
  );
}
