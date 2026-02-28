import React from 'react';
import FinningCircleNav from '../../components/finning-circle/FinningCircleNav';
import {
    Play, Volume2, Settings, Maximize, FileText,
    Building2, Info, Send, Camera, Eye
} from 'lucide-react';

export default function FinningCircleLive() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
            <FinningCircleNav />

            <main className="flex-1 flex flex-col overflow-y-auto">
                <div className="p-6 max-w-7xl mx-auto w-full">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
                        <span className="hover:underline cursor-pointer">Live Events</span>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-900 dark:text-gray-100 font-medium">EcoPack-200 Sustainable Demo</span>
                    </div>

                    <div className="flex flex-col xl:flex-row gap-6">
                        {/* Left: Video Section */}
                        <div className="flex-1 space-y-6">
                            {/* Video Player */}
                            <div className="relative rounded-xl overflow-hidden bg-black aspect-video shadow-2xl group border border-gray-800">
                                <div
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop')" }}
                                />

                                {/* Overlays */}
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <div className="bg-red-600 text-white px-3 py-1 rounded text-xs font-bold flex items-center gap-2 shadow-lg animate-pulse">
                                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                        LIVE
                                    </div>
                                    <div className="bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded text-xs font-medium flex items-center gap-2 border border-white/10">
                                        <Eye className="w-4 h-4" />
                                        1,248 Viewers
                                    </div>
                                </div>

                                {/* Player Controls */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                                    <button className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center shadow-2xl transform transition active:scale-95">
                                        <Play className="w-8 h-8 ml-1" />
                                    </button>
                                </div>

                                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-6 space-y-3">
                                    <div className="flex items-center gap-4">
                                        <div className="h-1 flex-1 rounded-full bg-white/20">
                                            <div className="h-full w-2/3 bg-primary rounded-full relative">
                                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg ring-4 ring-primary/20"></div>
                                            </div>
                                        </div>
                                        <span className="text-white text-xs font-medium">12:45 / 45:00</span>
                                    </div>
                                    <div className="flex items-center justify-between text-white">
                                        <div className="flex items-center gap-6">
                                            <Volume2 className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
                                            <Settings className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <Camera className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
                                            <Maximize className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Manufacturer Info Bar */}
                            <div className="bg-white dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-800 flex flex-wrap items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-lg bg-gray-100 dark:bg-gray-800 p-2 border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                                        <Building2 className="w-8 h-8 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">GreenTech Packaging Solutions</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">98% Positive Feedback • 12k Successful Shipments</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button className="px-5 py-2 rounded-lg border border-gray-300 dark:border-gray-700 font-semibold text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                        Follow
                                    </button>
                                    <button className="px-5 py-2 rounded-lg bg-primary/10 text-primary border border-primary/20 font-semibold text-sm hover:bg-primary/20 transition-colors">
                                        Contact Sales
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right: Sidebar Info & Chat */}
                        <div className="w-full xl:w-96 flex flex-col gap-6">

                            {/* Product Info Card */}
                            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-lg">
                                <div className="p-3 bg-primary/10 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                                    <span className="text-xs font-bold text-primary">FEATURED PRODUCT</span>
                                    <span className="text-[10px] bg-white dark:bg-gray-800 px-2 py-0.5 rounded text-gray-500 border border-gray-200 dark:border-gray-700 font-bold">New Release</span>
                                </div>
                                <div className="p-4 flex gap-4">
                                    <div className="w-24 h-24 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden shrink-0">
                                        <img alt="Product" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2070&auto=format&fit=crop" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-base">EcoPack-200 Series</h4>
                                        <p className="text-xs text-gray-500 mb-2">Automated Wrapping System</p>
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg font-bold text-primary">$4,250</span>
                                            <span className="text-[10px] text-gray-400">Unit Price</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 pb-4 space-y-2">
                                    <button className="w-full bg-primary text-white py-2 rounded-lg font-bold text-sm shadow-md hover:bg-primary/90">Request Quote</button>
                                    <button className="w-full border border-gray-200 dark:border-gray-700 py-2 rounded-lg font-semibold text-sm hover:bg-gray-50 dark:hover:bg-gray-800">View Specs</button>
                                </div>
                            </div>

                            {/* Chat Area */}
                            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 flex flex-col flex-1 min-h-[300px] xl:h-auto shadow-lg">
                                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800">
                                    <h4 className="font-bold text-sm flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div> Live Chat
                                    </h4>
                                </div>

                                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                    <div className="bg-primary/10 border-l-4 border-primary p-3 rounded-r-lg">
                                        <p className="text-[10px] font-bold text-primary uppercase mb-1">Pinned message</p>
                                        <p className="text-xs font-medium">Welcome! Ask any questions about the EcoPack-200.</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 flex-shrink-0" />
                                            <div>
                                                <div className="flex items-baseline gap-2">
                                                    <span className="font-bold text-xs">James Wilson</span>
                                                    <span className="text-[10px] text-gray-500">2:45 PM</span>
                                                </div>
                                                <p className="text-xs mt-1">What is the maximum cycle speed?</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
                                    <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg p-1 pr-2 border border-gray-200 dark:border-gray-700 focus-within:ring-2 focus-within:ring-primary">
                                        <input type="text" placeholder="Say something..." className="flex-1 bg-transparent border-none focus:ring-0 text-xs py-2 px-3" />
                                        <button className="bg-primary text-white p-1.5 rounded hover:bg-primary/90">
                                            <Send className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
