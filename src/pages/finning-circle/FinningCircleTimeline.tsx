
import FinningCircleNav from '../../components/finning-circle/FinningCircleNav';
import {
    Calendar, RefreshCw, ChevronLeft, ChevronRight,
    MapPin, Users, Rocket, Target, Users2
} from 'lucide-react';

export default function FinningCircleTimeline() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
            <FinningCircleNav />

            <div className="flex flex-1 overflow-hidden h-[calc(100vh-120px)]">
                {/* Sidebar */}
                <aside className="w-72 border-r border-gray-200 dark:border-gray-800 hidden lg:flex flex-col p-6 overflow-y-auto">
                    <div className="mb-8">
                        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Categories</h2>
                        <nav className="space-y-1">
                            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary text-white font-medium">
                                <Rocket className="w-5 h-5" /> Product Launches
                            </a>
                            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium">
                                <Target className="w-5 h-5" /> Business Workshops
                            </a>
                            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium">
                                <Users2 className="w-5 h-5" /> Networking
                            </a>
                        </nav>
                    </div>
                    <div className="mb-8">
                        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Quick Calendar</h2>
                        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs font-bold">October 2024</span>
                                <div className="flex gap-1">
                                    <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"><ChevronLeft className="w-4 h-4" /></button>
                                    <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"><ChevronRight className="w-4 h-4" /></button>
                                </div>
                            </div>
                            <div className="grid grid-cols-7 gap-y-2 text-center text-[10px] font-bold text-gray-400 mb-2">
                                <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                            </div>
                            <div className="grid grid-cols-7 gap-y-1 text-center text-xs font-medium">
                                <span className="p-1.5 text-gray-300 dark:text-gray-600">28</span>
                                <span className="p-1.5 text-gray-300 dark:text-gray-600">29</span>
                                <span className="p-1.5 text-gray-300 dark:text-gray-600">30</span>
                                <span className="p-1.5">1</span><span className="p-1.5">2</span><span className="p-1.5">3</span><span className="p-1.5">4</span>
                                <span className="p-1.5 bg-primary text-white rounded-full">5</span><span className="p-1.5">6</span><span className="p-1.5">7</span><span className="p-1.5">8</span><span className="p-1.5">9</span><span className="p-1.5">10</span><span className="p-1.5">11</span>
                                <span className="p-1.5">12</span><span className="p-1.5">13</span><span className="p-1.5">14</span><span className="p-1.5">15</span><span className="p-1.5">16</span><span className="p-1.5">17</span><span className="p-1.5">18</span>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Timeline main */}
                <main className="flex-1 overflow-y-auto w-full custom-scrollbar bg-gray-50 dark:bg-gray-900/50">
                    <div className="max-w-4xl mx-auto p-8 relative">
                        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
                            <div>
                                <h2 className="text-3xl font-black tracking-tight mb-2">SME Business Growth Timeline</h2>
                                <p className="text-gray-500 dark:text-gray-400 max-w-md">Chronological feed of manufacturing expos, business scaling workshops, and international trade demonstrations.</p>
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg text-sm font-semibold">
                                <RefreshCw className="w-4 h-4" /> Sync Calendar
                            </button>
                        </div>

                        <div className="space-y-12 relative before:absolute before:left-5 before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 dark:before:via-gray-800 before:to-transparent">

                            {/* Today Section */}
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white border-4 border-gray-50 dark:border-gray-950 shadow-lg shadow-primary/20 relative">
                                        <Calendar className="w-4 h-4" />
                                    </div>
                                    <h3 className="text-xl font-bold">Today, Oct 24</h3>
                                </div>

                                <div className="ml-5 pl-10 space-y-6">

                                    {/* Event Card */}
                                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/40 transition-all flex flex-col md:flex-row">
                                        <div className="md:w-64 h-48 md:h-auto overflow-hidden relative">
                                            <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop" alt="Workshop Cover" className="w-full h-full object-cover" />
                                            <span className="absolute top-3 left-3 px-2 py-1 bg-red-500 text-white text-[10px] font-black uppercase tracking-widest rounded-sm flex items-center gap-1 shadow-lg">
                                                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span> Live Now
                                            </span>
                                        </div>
                                        <div className="flex-1 p-6 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded">Live Stream</span>
                                                    <span className="text-xs text-gray-500 font-medium">10:00 AM - 12:30 PM</span>
                                                </div>
                                                <h4 className="text-lg font-bold mb-1 hover:text-primary transition-colors cursor-pointer">Sustainable Packaging Solutions for SMEs</h4>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">Expert session covering cost-effective biodegradable materials and automating your small-scale packaging line.</p>
                                                <div className="flex items-center gap-2 mb-6">
                                                    <div className="w-6 h-6 rounded-full bg-gray-300"></div>
                                                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Marcus Thorne • Sustainability Consultant</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                                    <Users className="w-4 h-4" /> +1.2k attending
                                                </div>
                                                <button className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow">Join Stream</button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* Tomorrow Section */}
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-500 border-4 border-gray-50 dark:border-gray-950">
                                        <Calendar className="w-4 h-4" />
                                    </div>
                                    <h3 className="text-xl font-bold">Tomorrow, Oct 25</h3>
                                </div>

                                <div className="ml-5 pl-10 space-y-6">
                                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/40 transition-all p-6">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">Exhibition</span>
                                            <span className="text-xs text-gray-500 font-medium">9:00 AM - 5:00 PM</span>
                                        </div>
                                        <h4 className="text-lg font-bold mb-1 hover:text-primary transition-colors cursor-pointer">Global Logistics Supplies Trade Show</h4>
                                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                                            <MapPin className="w-4 h-4" /> Convention Hall A
                                        </div>
                                        <button className="px-6 py-2 border-2 border-primary text-primary rounded-lg text-sm font-bold hover:bg-primary/10">Register Now</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
