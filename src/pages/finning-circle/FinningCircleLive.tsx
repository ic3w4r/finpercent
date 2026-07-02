import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FinningCircleNav from '../../components/finning-circle/FinningCircleNav';
import {
  Play, Volume2, Settings, Maximize, FileText, 
  Building2, Info, Send, Camera, Eye, ChevronLeft, ShieldCheck, ArrowRight, Sparkles, X, Plus, BookOpen, Download, User, Sliders
} from 'lucide-react';

interface BrochureItem {
  id: number;
  name: string;
  category: string;
  price: string;
  moq: string;
  specs: string[];
  active: boolean;
  readersCount: number;
}

export default function FinningCircleLive() {
  const navigate = useNavigate();
  const [role, setRole] = useState<'buyer' | 'streamer'>('buyer');
  const [showBrochure, setShowBrochure] = useState(false);
  const [selectedBrochureItem, setSelectedBrochureItem] = useState<BrochureItem | null>(null);
  const [chatMessage, setChatMessage] = useState('');
  const [chatLog, setChatLog] = useState([
    { user: 'Amit_Procurement', text: 'Can we schedule a physical visit next week?', time: '2:44 PM' },
    { user: 'Senthil Kumar', text: 'What is the power rating of this model?', time: '2:45 PM' }
  ]);

  // SME Brochure Data State
  const [brochureItems, setBrochureItems] = useState<BrochureItem[]>([
    { 
      id: 1, 
      name: 'EcoPack-200 Wrapping System', 
      category: 'Machinery', 
      price: '$4,250', 
      moq: '1 unit', 
      specs: ['Speed: 45 packs/min', 'Power: 2.2 kW', 'Material: Stainless Steel 304', 'Warranty: 2 Years'],
      active: true,
      readersCount: 14
    },
    { 
      id: 2, 
      name: 'Bio-Degradable Heavy Duty Box', 
      category: 'Packaging', 
      price: '$1.25', 
      moq: '500 units', 
      specs: ['Load Capacity: 25 kg', 'Material: Organic Cardboard', 'Recyclable: Yes', 'Custom Printing: Yes'],
      active: true,
      readersCount: 22
    },
    { 
      id: 3, 
      name: 'Reinforced Self-Adhesive Paper Tape', 
      category: 'Packaging', 
      price: '$3.50', 
      moq: '50 rolls', 
      specs: ['Width: 48mm', 'Length: 50m', 'Adhesive: Water-activated Starch', 'Tensile Strength: High'],
      active: false,
      readersCount: 0
    }
  ]);

  // Real-time Pushed Product Banner (Spotlight)
  const [spotlightItem, setSpotlightItem] = useState<BrochureItem | null>(brochureItems[0]);
  const [spotlightAlert, setSpotlightAlert] = useState<string | null>(null);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    setChatLog([...chatLog, { user: 'You_User', text: chatMessage.trim(), time: '2:46 PM' }]);
    setChatMessage('');
  };

  const handleToggleBrochureItem = (itemId: number) => {
    setBrochureItems(prev => prev.map(item => {
      if (item.id === itemId) {
        const nextActive = !item.active;
        if (nextActive) {
          // Push to spotlight
          setSpotlightItem(item);
        } else if (spotlightItem?.id === itemId) {
          setSpotlightItem(null);
        }
        return { ...item, active: nextActive, readersCount: nextActive ? Math.floor(Math.random() * 15) + 5 : 0 };
      }
      return item;
    }));
  };

  const handlePushDiscountAlert = (itemName: string) => {
    setSpotlightAlert(`📢 SME SPECIAL SPOTLIGHT: 10% Discount on ${itemName} for next 15 minutes!`);
    setTimeout(() => setSpotlightAlert(null), 8000);
  };

  const handleDownloadBrochure = (name: string) => {
    alert(`📄 Auto-generating PDF Corporate Brochure for "${name}"...\nSuccess: Brochure downloaded!`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 text-left">
      <FinningCircleNav />

      <main className="flex-1 flex flex-col overflow-y-auto">
        <div className="p-6 max-w-7xl mx-auto w-full space-y-6">
          
          {/* Header & Role Switcher */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-gray-550">
              <span className="hover:underline cursor-pointer" onClick={() => navigate('/finning-circle/gateway')}>Ecosystem Pathway</span>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 dark:text-gray-100 font-medium">EcoPack Sustainable Live Stream</span>
            </div>

            <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl border border-gray-250 dark:border-gray-700">
              <button
                onClick={() => setRole('buyer')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  role === 'buyer'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
                }`}
              >
                <User className="w-3.5 h-3.5" /> Buyer Mode (Viewer)
              </button>
              <button
                onClick={() => setRole('streamer')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  role === 'streamer'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" /> SME Host Mode (Streamer)
              </button>
            </div>
          </div>

          {/* Special Spotlight Alert Pushed by Streamer */}
          {spotlightAlert && (
            <div className="p-4 bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 rounded-2xl flex items-center gap-3 text-xs font-bold animate-pulse">
              <Sparkles className="w-5 h-5 text-amber-500 animate-bounce shrink-0" />
              <span>{spotlightAlert}</span>
            </div>
          )}

          {/* Main Layout Grid */}
          <div className="flex flex-col xl:flex-row gap-6 relative">
            
            {/* Left: Stream Video Window */}
            <div className="flex-1 space-y-6">
              
              <div className="relative rounded-3xl overflow-hidden bg-black aspect-video shadow-2xl group border border-gray-800">
                {/* Simulated live video */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop')" }}
                />

                {/* Stream Overlays */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <div className="bg-red-600 text-white px-3 py-1.5 rounded-full text-xs font-black flex items-center gap-2 shadow-lg animate-pulse">
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                    LIVE STREAM
                  </div>
                  <div className="bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 border border-white/10 shadow-sm">
                    <Eye className="w-4 h-4 text-emerald-400" />
                    1,248 Viewers
                  </div>
                </div>

                {role === 'streamer' && (
                  <div className="absolute top-4 right-4 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-emerald-300 px-3 py-1.5 rounded-full text-xs font-bold shadow">
                    Host Control Panel Active
                  </div>
                )}

                {/* Player Controls */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 z-10">
                  <button className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center shadow-2xl transition hover:scale-105">
                    <Play className="w-8 h-8 ml-1" />
                  </button>
                </div>

                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-6 space-y-3 z-10">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-6">
                      <Volume2 className="w-5 h-5 cursor-pointer hover:text-emerald-400" />
                      <Settings className="w-5 h-5 cursor-pointer hover:text-emerald-400" />
                    </div>
                    <div className="flex items-center gap-6">
                      <Camera className="w-5 h-5 cursor-pointer hover:text-emerald-400" />
                      <Maximize className="w-5 h-5 cursor-pointer hover:text-emerald-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Manufacturer profile summary bar */}
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-150 dark:border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center shrink-0">
                    <Building2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">Apex Precision Fab Ltd</h3>
                    <p className="text-xs text-gray-500">GSTIN Verified • Peenya Industrial Area, Bangalore</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {role === 'buyer' && (
                    <>
                      <button 
                        onClick={() => setShowBrochure(true)}
                        className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-md"
                      >
                        <BookOpen className="w-4 h-4" /> View Automated Brochure
                      </button>
                      <button className="px-6 py-3 rounded-2xl border border-gray-250 dark:border-gray-700 font-bold text-xs hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                        Follow Host
                      </button>
                    </>
                  )}
                </div>
              </div>

            </div>

            {/* Right: Live Chat or Streamer Admin control deck */}
            <div className="w-full xl:w-96 flex flex-col gap-6">
              
              {role === 'buyer' ? (
                // BUYER VIEW: SPOTLIGHT FEATURED PRODUCT + CHAT
                <>
                  {spotlightItem && (
                    <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-150 dark:border-gray-800 overflow-hidden shadow-md flex flex-col">
                      <div className="p-3 bg-emerald-500/10 border-b border-emerald-500/20 flex items-center justify-between text-xs font-bold text-emerald-700 dark:text-emerald-400 font-mono">
                        <span>LIVE PRODUCT SPOTLIGHT</span>
                        <span className="bg-white dark:bg-gray-800 px-2 py-0.5 rounded text-[9px] border font-bold">Featured Now</span>
                      </div>
                      
                      <div className="p-5 flex gap-4">
                        <div className="w-20 h-20 rounded-xl bg-gray-100 dark:bg-gray-800 border overflow-hidden shrink-0">
                          <img alt="Product" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2070&auto=format&fit=crop" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-bold text-sm text-gray-900 dark:text-white leading-tight">{spotlightItem.name}</h4>
                          <p className="text-[10px] text-gray-400 uppercase font-mono tracking-wider">{spotlightItem.category}</p>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">{spotlightItem.price}</span>
                            <span className="text-[9px] text-gray-400 font-semibold">MOQ: {spotlightItem.moq}</span>
                          </div>
                        </div>
                      </div>

                      <div className="px-5 pb-5 flex gap-2">
                        <button className="flex-1 bg-emerald-600 text-white py-2.5 rounded-xl font-bold text-xs shadow hover:bg-emerald-700 transition">Request RFQ Quote</button>
                        <button 
                          onClick={() => {
                            setSelectedBrochureItem(spotlightItem);
                            setShowBrochure(true);
                          }}
                          className="flex-1 border border-gray-250 dark:border-gray-700 py-2.5 rounded-xl font-bold text-xs hover:bg-gray-50 dark:hover:bg-gray-850 text-gray-700 dark:text-gray-300"
                        >
                          Specs sheets
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Chat Panel */}
                  <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-150 dark:border-gray-800 flex flex-col h-[320px] shadow-sm">
                    <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
                      <h4 className="font-bold text-xs flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span> Live Broadcast Chat
                      </h4>
                    </div>

                    <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
                      {chatLog.map((log, idx) => (
                        <div key={idx} className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center font-bold text-emerald-500 font-mono">
                            {log.user.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-baseline gap-1.5">
                              <span className="font-bold text-gray-800 dark:text-gray-200">{log.user}</span>
                              <span className="text-[8px] text-gray-400 font-mono">{log.time}</span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 mt-0.5 leading-relaxed">{log.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-850 flex gap-2 rounded-b-3xl">
                      <input
                        type="text"
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        placeholder="Say something to host..."
                        className="flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 text-xs"
                      />
                      <button type="submit" className="bg-primary text-white p-2 rounded-xl hover:bg-primary-650">
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                // SME HOST / STREAMER VIEW: CONTROL PANEL & BROCHURE MANAGER
                <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-150 dark:border-gray-800 p-6 shadow-md space-y-6">
                  <div>
                    <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
                      <Sliders className="w-5 h-5 text-emerald-500" />
                      <span>Brochure Control Deck</span>
                    </h3>
                    <p className="text-[10px] text-gray-500 mt-1">
                      Toggle active brochure items. Viewers can instantly browse checked catalog items in real-time.
                    </p>
                  </div>

                  {/* Brochure Items Checklist */}
                  <div className="space-y-4">
                    {brochureItems.map(item => (
                      <div key={item.id} className="p-4 bg-gray-55 dark:bg-gray-800/40 rounded-2xl border border-gray-150 dark:border-gray-850 space-y-3">
                        <div className="flex justify-between items-start">
                          <label className="flex items-start gap-3 cursor-pointer text-xs font-bold text-gray-800 dark:text-gray-250">
                            <input
                              type="checkbox"
                              checked={item.active}
                              onChange={() => handleToggleBrochureItem(item.id)}
                              className="rounded border-gray-300 dark:border-gray-700 text-emerald-600 focus:ring-emerald-500 mt-0.5"
                            />
                            <span>{item.name}</span>
                          </label>
                        </div>

                        <div className="flex justify-between items-center text-[10px] text-gray-400 font-mono">
                          <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded font-bold uppercase">
                            {item.category}
                          </span>
                          <span className="flex items-center gap-1 font-bold text-emerald-650 dark:text-emerald-400">
                            <Eye className="w-3.5 h-3.5" /> {item.readersCount} Viewers reading
                          </span>
                        </div>

                        {item.active && (
                          <button
                            onClick={() => handlePushDiscountAlert(item.name)}
                            className="w-full py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-[9px] font-bold shadow transition"
                          >
                            ⚡ Push 10% Discount Alert
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>

          {/* SLIDE-UP E-BROCHURE VIEW (FOR BUYER / VIEWER) */}
          {showBrochure && (
            <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] flex items-end justify-center">
              <div className="w-full max-w-4xl bg-white dark:bg-gray-900 rounded-t-[32px] p-6 text-xs text-left shadow-2xl border-t border-gray-200 dark:border-gray-800 max-h-[90vh] overflow-y-auto space-y-6">
                
                {/* Header */}
                <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-4">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-6 h-6 text-emerald-500" />
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">Apex Precision Fab E-Brochure</h3>
                      <p className="text-[10px] text-gray-400 font-mono">Real-time Catalog synced by Host</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setShowBrochure(false);
                      setSelectedBrochureItem(null);
                    }} 
                    className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Left Column: Menu list */}
                  <div className="space-y-3">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest font-mono block">BROCHURE INDEX</span>
                    <div className="space-y-1.5">
                      {brochureItems.filter(item => item.active).map(item => (
                        <button
                          key={item.id}
                          onClick={() => setSelectedBrochureItem(item)}
                          className={`w-full text-left p-3.5 rounded-2xl border font-bold transition ${
                            selectedBrochureItem?.id === item.id
                              ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                              : 'border-gray-150 bg-gray-55 text-gray-700 dark:text-gray-300 hover:bg-gray-100'
                          }`}
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Spec sheet details */}
                  <div className="md:col-span-2 bg-gray-55 dark:bg-gray-850 p-6 rounded-3xl border border-gray-150 dark:border-gray-800 space-y-6">
                    {selectedBrochureItem ? (
                      <div className="space-y-6">
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <h4 className="text-base font-bold text-gray-900 dark:text-white leading-tight">{selectedBrochureItem.name}</h4>
                            <span className="text-[9px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded uppercase font-mono tracking-wider inline-block mt-1">
                              {selectedBrochureItem.category}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400 block">{selectedBrochureItem.price}</span>
                            <span className="text-[10px] text-gray-400">MOQ: {selectedBrochureItem.moq}</span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest font-mono block">Technical specifications</span>
                          <div className="grid grid-cols-2 gap-3">
                            {selectedBrochureItem.specs.map((spec, i) => (
                              <div key={i} className="p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-150 dark:border-gray-700 font-semibold text-gray-800 dark:text-gray-200">
                                {spec}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Brochure actions */}
                        <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                          <button
                            onClick={() => handleDownloadBrochure(selectedBrochureItem.name)}
                            className="flex-1 py-3 px-6 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-md hover:bg-primary-650 transition"
                          >
                            <Download className="w-4 h-4" /> Download PDF Brochure
                          </button>
                          <button className="flex-1 py-3 px-6 bg-emerald-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-md hover:bg-emerald-700 transition">
                            💬 Message Procurement Agent
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-16 text-center text-gray-400 space-y-3">
                        <BookOpen className="w-12 h-12 text-gray-300 animate-pulse" />
                        <p className="font-semibold">Select a catalog index item on the left to read specifications.</p>
                      </div>
                    )}
                  </div>

                </div>

              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
