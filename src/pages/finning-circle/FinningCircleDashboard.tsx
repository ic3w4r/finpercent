import React from 'react';
import FinningCircleNav from '../../components/finning-circle/FinningCircleNav';
import {
    Building2, Leaf, Tractor, Truck, Search,
    MapPin, BookmarkPlus, ChevronRight, ChevronLeft
} from 'lucide-react';

export default function FinningCircleDashboard() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
            <FinningCircleNav />

            <div className="flex flex-1 overflow-hidden h-[calc(100vh-120px)]">
                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
                    {/* Map Preview Placeholder */}
                    <div className="relative w-full h-[400px] rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-xl group bg-[#0a0f1a]">
                        {/* Embedded Map background */}
                        <div className="absolute inset-0 opacity-50 bg-[url('https://placeholder.pics/svg/300')] bg-cover bg-center mix-blend-screen" />

                        {/* Live Data Overlays */}
                        <div className="absolute top-4 left-4">
                            <div className="bg-gray-900/80 backdrop-blur-md p-3 rounded-lg border border-gray-700 text-white flex items-center gap-3">
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase font-bold text-gray-400">Live Trade Pulse</span>
                                    <span className="text-sm font-semibold">1,248 Active Events</span>
                                </div>
                            </div>
                        </div>

                        {/* Location pulses */}
                        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-primary rounded-full animate-pulse shadow-[0_0_15px_#72df48]"></div>
                        <div className="absolute top-1/3 left-1/2 w-3 h-3 bg-primary rounded-full animate-pulse shadow-[0_0_15px_#72df48] delay-75"></div>
                        <div className="absolute top-1/2 left-3/4 w-3 h-3 bg-primary rounded-full animate-pulse shadow-[0_0_15px_#72df48] delay-150"></div>
                    </div>

                    {/* Filters */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
                        <button className="px-4 py-2 bg-primary text-white rounded-full text-xs font-semibold whitespace-nowrap">All Industries</button>
                        <button className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full text-xs font-semibold hover:border-primary whitespace-nowrap transition-colors flex items-center gap-2">
                            <Building2 className="w-4 h-4" /> Manufacturing
                        </button>
                        <button className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full text-xs font-semibold hover:border-primary whitespace-nowrap transition-colors flex items-center gap-2">
                            <Leaf className="w-4 h-4" /> Green Tech
                        </button>
                        <button className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full text-xs font-semibold hover:border-primary whitespace-nowrap transition-colors flex items-center gap-2">
                            <Tractor className="w-4 h-4" /> Agrotech
                        </button>
                        <button className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full text-xs font-semibold hover:border-primary whitespace-nowrap transition-colors flex items-center gap-2">
                            <Truck className="w-4 h-4" /> Logistics
                        </button>
                    </div>

                    {/* Event Feed */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-bold border-l-2 border-primary pl-4">Upcoming Global Events</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Event 1 */}
                            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 hover:border-primary/50 group">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center shrink-0">
                                        <span className="text-[10px] font-bold text-gray-500">OCT</span>
                                        <span className="text-lg font-bold text-primary">12</span>
                                    </div>
                                    <div className="flex-1">
                                        <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded uppercase mb-1 inline-block">Manufacturing</span>
                                        <h3 className="text-base font-bold group-hover:text-primary transition-colors">Global Manufacturing Expo</h3>
                                        <p className="text-sm text-gray-500 flex items-center gap-1 mb-4">
                                            <MapPin className="w-4 h-4" /> Berlin, Germany
                                        </p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">Connect with over 500+ industrial leads and discover the latest in automation.</p>
                                        <div className="flex gap-2">
                                            <button className="flex-1 bg-primary text-white py-2 rounded-lg text-xs font-bold hover:bg-primary/90">Register</button>
                                            <button className="flex-1 bg-gray-100 dark:bg-gray-800 py-2 rounded-lg text-xs font-bold hover:bg-gray-200 dark:hover:bg-gray-700">Details</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Event 2 */}
                            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 hover:border-primary/50 group">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center shrink-0">
                                        <span className="text-[10px] font-bold text-gray-500">OCT</span>
                                        <span className="text-lg font-bold text-primary">15</span>
                                    </div>
                                    <div className="flex-1">
                                        <span className="text-[10px] font-bold text-cyan-500 bg-cyan-500/10 px-2 py-0.5 rounded uppercase mb-1 inline-block">Green Tech</span>
                                        <h3 className="text-base font-bold group-hover:text-primary transition-colors">Sustainable Tech Summit</h3>
                                        <p className="text-sm text-gray-500 flex items-center gap-1 mb-4">
                                            <MapPin className="w-4 h-4" /> Singapore
                                        </p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">The premier event for sustainable innovation in Asia. Focus on carbon-neutral logistics.</p>
                                        <div className="flex gap-2">
                                            <button className="flex-1 bg-primary text-white py-2 rounded-lg text-xs font-bold hover:bg-primary/90">Register</button>
                                            <button className="flex-1 bg-gray-100 dark:bg-gray-800 py-2 rounded-lg text-xs font-bold hover:bg-gray-200 dark:hover:bg-gray-700">Details</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </main>

                {/* Right Sidebar */}
                <aside className="w-80 border-l border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/30 overflow-y-auto hidden xl:block">
                    <div className="p-6">
                        <h2 className="text-sm font-bold mb-4 flex items-center gap-2">
                            📅 Event Calendar
                        </h2>

                        {/* Mini Calendar Mock */}
                        <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-xs font-bold">October 2024</span>
                                <div className="flex gap-1">
                                    <ChevronLeft className="w-4 h-4 cursor-pointer text-gray-500" />
                                    <ChevronRight className="w-4 h-4 cursor-pointer text-gray-500" />
                                </div>
                            </div>
                            <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-gray-400 mb-2">
                                <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
                            </div>
                            <div className="grid grid-cols-7 gap-1 text-center text-xs">
                                {/* Simplified days */}
                                <div className="p-1 text-gray-300">29</div>
                                <div className="p-1 text-gray-300">30</div>
                                <div className="p-1 hover:bg-gray-100 rounded cursor-pointer">1</div>
                                <div className="p-1 hover:bg-gray-100 rounded cursor-pointer">2</div>
                                <div className="p-1 hover:bg-gray-100 rounded cursor-pointer text-primary font-bold">3</div>
                                <div className="p-1 hover:bg-gray-100 rounded cursor-pointer">4</div>
                                <div className="p-1 hover:bg-gray-100 rounded cursor-pointer">5</div>

                                <div className="p-1 hover:bg-gray-100 rounded cursor-pointer">6</div>
                                <div className="p-1 hover:bg-gray-100 rounded cursor-pointer">7</div>
                                <div className="p-1 hover:bg-gray-100 rounded cursor-pointer">8</div>
                                <div className="p-1 hover:bg-gray-100 rounded cursor-pointer">9</div>
                                <div className="p-1 hover:bg-gray-100 rounded cursor-pointer">10</div>
                                <div className="p-1 hover:bg-gray-100 rounded cursor-pointer">11</div>
                                <div className="p-1 bg-primary text-white rounded font-bold">12</div>

                                <div className="p-1 hover:bg-gray-100 rounded cursor-pointer">13</div>
                                <div className="p-1 hover:bg-gray-100 rounded cursor-pointer">14</div>
                                <div className="p-1 bg-primary/20 text-primary rounded font-bold cursor-pointer">15</div>
                                <div className="p-1 hover:bg-gray-100 rounded cursor-pointer">16</div>
                                <div className="p-1 hover:bg-gray-100 rounded cursor-pointer">17</div>
                                <div className="p-1 hover:bg-gray-100 rounded cursor-pointer">18</div>
                                <div className="p-1 hover:bg-gray-100 rounded cursor-pointer">19</div>
                            </div>
                        </div>

                        {/* Trending Now */}
                        <h2 className="text-sm font-bold mt-8 mb-4">📈 Trending Industries</h2>
                        <div className="space-y-3">
                            <div className="p-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
                                <p className="text-[10px] font-bold text-primary uppercase">Industry Shift</p>
                                <h4 className="text-xs font-bold">Hydrogen Energy Hubs</h4>
                                <p className="text-[10px] text-emerald-500 font-semibold mt-1">+24% Event Interest</p>
                            </div>
                            <div className="p-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
                                <p className="text-[10px] font-bold text-orange-500 uppercase">Hot Topic</p>
                                <h4 className="text-xs font-bold">Web3 Supply Chain</h4>
                                <p className="text-[10px] text-emerald-500 font-semibold mt-1">1.2k Views/hr</p>
                            </div>
                        </div>

                    </div>
                </aside>
            </div>
        </div>
    );
}
