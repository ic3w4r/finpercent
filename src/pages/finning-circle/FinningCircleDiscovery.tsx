
import FinningCircleNav from '../../components/finning-circle/FinningCircleNav';
import {
    Play, Heart, MessageCircle, Bookmark, Share2, ShoppingCart, Plus, CheckCircle2
} from 'lucide-react';

export default function FinningCircleDiscovery() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 overflow-hidden">
            <FinningCircleNav />

            <div className="flex flex-1 overflow-hidden h-[calc(100vh-120px)]">
                {/* Left Sidebar */}
                <aside className="w-64 hidden lg:flex flex-col border-r border-gray-200 dark:border-gray-800 p-4 space-y-2 overflow-y-auto">
                    <div className="mb-4 px-3">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Discovery</p>
                    </div>
                    <nav className="space-y-1">
                        <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary font-semibold">
                            Feed
                        </a>
                        <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium transition-colors">
                            Events
                        </a>
                        <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium transition-colors">
                            Live
                        </a>
                        <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium transition-colors">
                            Workshops
                        </a>
                    </nav>
                </aside>

                {/* Main Feed Area */}
                <main className="flex-1 flex justify-center bg-gray-100 dark:bg-gray-900/50 relative overflow-y-auto snap-y snap-mandatory h-full custom-scrollbar">
                    <div className="w-full max-w-lg mx-auto">

                        {/* Video Post 1 */}
                        <section className="snap-start relative w-full h-[calc(100vh-120px)] bg-black flex items-center justify-center overflow-hidden">
                            <div
                                className="absolute inset-0 bg-cover bg-center opacity-60 flex items-center justify-center"
                                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop')" }}
                            >
                                <div className="bg-primary/20 backdrop-blur-sm p-4 rounded-full">
                                    <Play className="w-12 h-12 text-white ml-1" />
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="absolute right-4 bottom-32 flex flex-col items-center gap-6 z-20">
                                <div className="flex flex-col items-center group cursor-pointer">
                                    <div className="p-3 bg-white/10 backdrop-blur-md rounded-full group-hover:bg-primary/20 transition-all text-white">
                                        <Heart className="w-8 h-8" />
                                    </div>
                                    <span className="text-white text-xs font-bold mt-1">12.4k</span>
                                </div>
                                <div className="flex flex-col items-center group cursor-pointer">
                                    <div className="p-3 bg-white/10 backdrop-blur-md rounded-full group-hover:bg-primary/20 transition-all text-white">
                                        <MessageCircle className="w-8 h-8" />
                                    </div>
                                    <span className="text-white text-xs font-bold mt-1">342</span>
                                </div>
                                <div className="flex flex-col items-center group cursor-pointer">
                                    <div className="p-3 bg-white/10 backdrop-blur-md rounded-full group-hover:bg-primary/20 transition-all text-white">
                                        <Bookmark className="w-8 h-8" />
                                    </div>
                                    <span className="text-white text-xs font-bold mt-1">1.2k</span>
                                </div>
                                <div className="flex flex-col items-center group cursor-pointer">
                                    <div className="p-3 bg-white/10 backdrop-blur-md rounded-full group-hover:bg-primary/20 transition-all text-white">
                                        <Share2 className="w-8 h-8" />
                                    </div>
                                    <span className="text-white text-xs font-bold mt-1">890</span>
                                </div>
                            </div>

                            {/* Bottom Info */}
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent p-6 pt-20 text-white z-10 flex flex-col gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-12 w-12 rounded-full border-2 border-white overflow-hidden shrink-0 bg-gray-800"></div>
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-1">
                                            <span className="font-bold text-lg">EcoPack Global</span>
                                            <CheckCircle2 className="w-4 h-4 text-primary fill-current" />
                                        </div>
                                        <p className="text-sm text-gray-300">Pioneering sustainable packaging for SMEs.</p>
                                    </div>
                                </div>
                                <p className="text-sm line-clamp-2 text-gray-200">
                                    Introducing our 100% compostable shipping solutions. Optimize your SME's supply chain...
                                </p>
                                <div className="flex items-center gap-4 mt-2">
                                    <button className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-transform shadow-lg shadow-primary/30">
                                        <ShoppingCart className="w-5 h-5" /> View Product
                                    </button>
                                    <div className="h-12 w-12 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
                                        <Plus className="w-6 h-6" />
                                    </div>
                                </div>
                                <div className="absolute bottom-0 left-0 h-1 bg-primary z-30 w-1/3"></div>
                            </div>
                        </section>

                    </div>
                </main>
            </div>
        </div>
    );
}
