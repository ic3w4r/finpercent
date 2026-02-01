import React, { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Share2, UserPlus, Info, Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface Reel {
    id: string;
    manufacturer: {
        name: string;
        avatar: string;
        isVerified: boolean;
    };
    product: {
        name: string;
        description: string;
        price: string;
    };
    videoUrl: string; // handling image placeholders for now as well
    thumbnail: string;
    likes: number;
    comments: number;
    shares: number;
}

const SAMPLE_REELS: Reel[] = [
    {
        id: '1',
        manufacturer: {
            name: 'EcoBuild Materials',
            avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100',
            isVerified: true
        },
        product: {
            name: 'Sustainable Concrete Blocks',
            description: 'Reducing carbon footprint with our new recycled aggregate blocks.',
            price: '$45/unit'
        },
        videoUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1080', // Placeholder image acting as video
        thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=300',
        likes: 1240,
        comments: 85,
        shares: 430
    },
    {
        id: '2',
        manufacturer: {
            name: 'Apex Machinery',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100',
            isVerified: true
        },
        product: {
            name: 'Hydraulic Press X200',
            description: 'Precision engineering for high-volume manufacturing lines.',
            price: '$12,500'
        },
        videoUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1080',
        thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=300',
        likes: 890,
        comments: 45,
        shares: 120
    },
    {
        id: '3',
        manufacturer: {
            name: 'Textile Futures',
            avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100',
            isVerified: false
        },
        product: {
            name: 'Smart Fabric Weave',
            description: 'Temperature regulating fabrics for industrial wear.',
            price: '$22/yard'
        },
        videoUrl: 'https://images.unsplash.com/photo-1617415392070-556cddc868f7?auto=format&fit=crop&q=80&w=1080',
        thumbnail: 'https://images.unsplash.com/photo-1617415392070-556cddc868f7?auto=format&fit=crop&q=80&w=300',
        likes: 2300,
        comments: 156,
        shares: 890
    }
];

export default function ManufacturerReels() {
    const [currentReelIndex, setCurrentReelIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);

    const handleScroll = () => {
        if (containerRef.current) {
            const { scrollTop, clientHeight } = containerRef.current;
            const index = Math.round(scrollTop / clientHeight);
            if (index !== currentReelIndex) {
                setCurrentReelIndex(index);
            }
        }
    };

    const togglePlay = () => setIsPlaying(!isPlaying);
    const toggleMute = () => setIsMuted(!isMuted);

    return (
        <div className="h-[calc(100vh-140px)] w-full flex justify-center bg-black rounded-xl overflow-hidden relative">
            <div
                ref={containerRef}
                className="h-full w-full max-w-md overflow-y-scroll snap-y snap-mandatory scrollbar-hide bg-gray-900"
                onScroll={handleScroll}
                style={{ scrollBehavior: 'smooth' }}
            >
                {SAMPLE_REELS.map((reel, index) => (
                    <div key={reel.id} className="h-full w-full snap-start relative bg-black flex items-center justify-center">
                        {/* "Video" Background - using image for mock, would be <video> tag in real implementation */}
                        <div className="absolute inset-0 w-full h-full">
                            <img
                                src={reel.videoUrl}
                                alt={reel.product.name}
                                className="w-full h-full object-cover opacity-80"
                                onClick={togglePlay}
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 pointer-events-none" />
                        </div>

                        {/* Play/Pause Overlay */}
                        {!isPlaying && currentReelIndex === index && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                                <div className="bg-black/40 p-4 rounded-full">
                                    <Play className="w-12 h-12 text-white fill-white" />
                                </div>
                            </div>
                        )}

                        {/* Sidebar Actions */}
                        <div className="absolute right-4 bottom-24 flex flex-col items-center space-y-6 z-20">
                            <div className="flex flex-col items-center space-y-1">
                                <button className="p-3 bg-gray-800/60 rounded-full hover:bg-gray-700/60 transition shadow-lg">
                                    <Heart className="w-8 h-8 text-white hover:text-red-500 transition" />
                                </button>
                                <span className="text-white text-xs font-semibold shadow-black drop-shadow-md">{reel.likes}</span>
                            </div>

                            <div className="flex flex-col items-center space-y-1">
                                <button className="p-3 bg-gray-800/60 rounded-full hover:bg-gray-700/60 transition shadow-lg">
                                    <MessageCircle className="w-8 h-8 text-white" />
                                </button>
                                <span className="text-white text-xs font-semibold shadow-black drop-shadow-md">{reel.comments}</span>
                            </div>

                            <div className="flex flex-col items-center space-y-1">
                                <button className="p-3 bg-gray-800/60 rounded-full hover:bg-gray-700/60 transition shadow-lg">
                                    <Share2 className="w-8 h-8 text-white" />
                                </button>
                                <span className="text-white text-xs font-semibold shadow-black drop-shadow-md">{reel.shares}</span>
                            </div>
                        </div>

                        {/* Bottom Info Section */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
                            <div className="flex items-center space-x-3 mb-4">
                                <img src={reel.manufacturer.avatar} alt={reel.manufacturer.name} className="w-12 h-12 rounded-full border-2 border-white" />
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2">
                                        <h3 className="font-bold text-lg text-white shadow-black drop-shadow-sm">{reel.manufacturer.name}</h3>
                                        {reel.manufacturer.isVerified && (
                                            <div className="bg-blue-500 rounded-full p-0.5" title="Verified Manufacturer">
                                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    <button className="text-xs bg-white text-black px-2 py-1 rounded font-bold mt-1 flex items-center w-fit hover:bg-gray-200 transition">
                                        <UserPlus className="w-3 h-3 mr-1" /> Follow
                                    </button>
                                </div>
                            </div>

                            <div className="mb-4">
                                <h4 className="font-bold text-xl mb-1">{reel.product.name}</h4>
                                <p className="text-gray-200 text-sm line-clamp-2">{reel.product.description}</p>
                                <div className="mt-2 flex items-center space-x-2">
                                    <span className="bg-green-600 px-2 py-1 rounded text-sm font-bold">{reel.product.price}</span>
                                    <button className="bg-blue-600/80 backdrop-blur-sm px-3 py-1 rounded text-sm font-semibold hover:bg-blue-600 transition flex items-center">
                                        <Info className="w-3 h-3 mr-1" /> Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Global Mute Toggle (Fixed position relative to container) */}
            {/* <div className="absolute top-4 right-4 z-30">
        <button onClick={toggleMute} className="p-2 bg-black/40 rounded-full hover:bg-black/60 text-white">
           {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
        </button>
      </div> */}
        </div>
    );
}
