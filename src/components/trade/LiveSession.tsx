import React, { useState } from 'react';
import { Users, Heart, Share2, ShoppingBag, MessageSquare, Mic, MicOff, Video, VideoOff, Settings, X, Gift } from 'lucide-react';
import DigitalHumanAI from './DigitalHumanAI';

const LIVE_PRODUCTS = [
    {
        id: 1,
        name: 'Industrial Generator 5000',
        price: '$4,200',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=200'
    },
    {
        id: 2,
        name: 'Backup Battery Unit',
        price: '$850',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=200'
    }
];

export default function LiveSession() {
    const [showAI, setShowAI] = useState(false);
    const [showProducts, setShowProducts] = useState(true);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
            {/* Main Video Feed Area */}
            <div className="lg:col-span-2 relative bg-black rounded-2xl overflow-hidden shadow-2xl">
                {/* Placeholder Live Video Background */}
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1600"
                        alt="Live Stream"
                        className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40"></div>
                </div>

                {/* Live Indicator & Viewer Count */}
                <div className="absolute top-6 left-6 flex items-center space-x-3 z-10">
                    <div className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-md animate-pulse">
                        LIVE
                    </div>
                    <div className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-md text-white text-sm flex items-center font-medium">
                        <Users className="w-4 h-4 mr-2" />
                        1.2k Viewers
                    </div>
                </div>

                {/* Presenter Info */}
                <div className="absolute top-6 right-6 flex items-center space-x-2 z-10">
                    <div className="flex items-center bg-black/40 backdrop-blur-md rounded-full pl-1 pr-4 py-1">
                        <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=50" className="w-8 h-8 rounded-full border-2 border-green-500 mr-2" alt="Host" />
                        <div className="text-left">
                            <div className="text-white text-xs font-bold">Apex Machinery</div>
                            <div className="text-gray-300 text-[10px]">Host</div>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowAI(!showAI)}
                        className={`p-2 rounded-full transition ${showAI ? 'bg-blue-600 text-white' : 'bg-white/20 text-white hover:bg-white/30'}`}
                        title="Toggle AI Assistant"
                    >
                        <MessageSquare className="w-5 h-5" />
                    </button>
                </div>

                {/* Bottom Engagement Controls */}
                <div className="absolute bottom-6 left-0 right-0 px-6 flex items-end justify-between z-20">
                    <div className="flex flex-col space-y-4 w-full max-w-xl">
                        {/* Live Comments Preview (Fade out) */}
                        <div className="space-y-2 mb-2 max-h-40 overflow-hidden masking-gradient">
                            <div className="flex items-center space-x-2 text-white/90 text-sm animate-fade-in-up">
                                <span className="font-bold text-yellow-400">User123:</span>
                                <span>Does this come with installation support?</span>
                            </div>
                            <div className="flex items-center space-x-2 text-white/90 text-sm animate-fade-in-up delay-75">
                                <span className="font-bold text-blue-400">BuildCorp:</span>
                                <span>Looking for bulk pricing.</span>
                            </div>
                            <div className="flex items-center space-x-2 text-white/90 text-sm animate-fade-in-up delay-150">
                                <span className="font-bold text-green-400">EcoTech:</span>
                                <span>Great presentation!</span>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2 w-full">
                            <input
                                type="text"
                                placeholder="Ask a question..."
                                className="flex-1 bg-black/40 text-white border border-white/20 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-400 backdrop-blur-sm"
                            />
                            <button className="p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition">
                                <Gift className="w-5 h-5" />
                            </button>
                            <button className="p-2 bg-pink-600 rounded-full text-white hover:bg-pink-700 transition">
                                <Heart className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sidebar: Products & Details */}
            <div className="hidden lg:flex flex-col space-y-4 overflow-y-auto">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="font-bold text-lg mb-4 flex items-center">
                        <ShoppingBag className="w-5 h-5 mr-2 text-blue-600" />
                        Featured Products
                    </h3>
                    <div className="space-y-4">
                        {LIVE_PRODUCTS.map(product => (
                            <div key={product.id} className="flex space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl hover:shadow-md transition cursor-pointer border border-transparent hover:border-blue-500">
                                <img src={product.image} alt={product.name} className="w-16 h-16 rounded-lg object-cover" />
                                <div className="flex-1">
                                    <h4 className="font-semibold text-sm line-clamp-2">{product.name}</h4>
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-green-600 font-bold">{product.price}</span>
                                        <button className="text-xs bg-black text-white px-2 py-1 rounded">Buy Now</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 flex-1">
                    <h3 className="font-bold text-lg mb-4">Live Chat</h3>
                    <div className="text-center text-gray-500 py-10">
                        <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-20" />
                        <p>Chat is integrated in the mobile view.</p>
                        <p className="text-xs">Use the overlay input to send messages.</p>
                    </div>
                </div>
            </div>

            {/* Floating AI Component */}
            <DigitalHumanAI isOpen={showAI} onClose={() => setShowAI(false)} />
        </div>
    );
}
