
import FinningCircleNav from '../../components/finning-circle/FinningCircleNav';
import {
    GraduationCap, PlayCircle, Clock, BookOpen, Star,
    ChevronRight, Lock, Unlock, TrendingUp, MonitorPlay
} from 'lucide-react';

export default function FinningCircleWorkshops() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
            <FinningCircleNav />

            <div className="flex flex-1 overflow-hidden h-[calc(100vh-120px)]">

                {/* Sidebar */}
                <aside className="w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hidden lg:flex flex-col overflow-y-auto">
                    <div className="p-6">
                        <h2 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-6">Learning Hub</h2>

                        <div className="space-y-1">
                            <a href="#" className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-primary/10 text-primary font-bold text-sm">
                                <div className="flex items-center gap-3">
                                    <TrendingUp className="w-4 h-4" /> Go-to-Market
                                </div>
                                <span className="text-[10px] bg-white rounded px-1.5 py-0.5 shadow-sm">12</span>
                            </a>
                            <a href="#" className="flex items-center justify-between px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium text-sm transition-colors">
                                <div className="flex items-center gap-3">
                                    <Globe className="w-4 h-4" /> Global Exporting
                                </div>
                                <span className="text-[10px] bg-gray-200 dark:bg-gray-700 rounded px-1.5 py-0.5">8</span>
                            </a>
                            <a href="#" className="flex items-center justify-between px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium text-sm transition-colors">
                                <div className="flex items-center gap-3">
                                    <MonitorPlay className="w-4 h-4" /> Digital Marketing
                                </div>
                                <span className="text-[10px] bg-gray-200 dark:bg-gray-700 rounded px-1.5 py-0.5">24</span>
                            </a>
                        </div>
                    </div>

                    <div className="mt-auto p-6 border-t border-gray-200 dark:border-gray-800">
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
                            <p className="text-xs font-bold text-gray-500 mb-2 uppercase">Your Progress</p>
                            <div className="flex items-end gap-1 mb-2">
                                <span className="text-2xl font-black text-primary">4</span>
                                <span className="text-sm font-medium text-gray-500 pb-0.5">/ 10 modules</span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div className="w-[40%] h-full bg-primary rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-10 space-y-10">

                    <header>
                        <h1 className="text-3xl font-black tracking-tight mb-2 flex items-center gap-3">
                            <GraduationCap className="w-8 h-8 text-primary" />
                            SME Masterclass Workshops
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 max-w-2xl text-lg">
                            Practical, bite-sized workshops designed specifically to help manufacturing SMEs crack new markets and digitize their supply chains.
                        </p>
                    </header>

                    {/* Featured Workshop */}
                    <section>
                        <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-xl border border-gray-800 relative flex flex-col md:flex-row group cursor-pointer">
                            <div className="md:w-1/2 relative min-h-[300px]">
                                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80" alt="Video cover" />
                                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/0 md:from-transparent via-gray-900/50 to-gray-900"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-16 h-16 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-2xl group-hover:bg-primary transition-all group-hover:scale-110">
                                        <PlayCircle className="w-8 h-8 ml-1" />
                                    </div>
                                </div>
                            </div>

                            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative z-10 bg-gray-900">
                                <span className="bg-primary/20 text-primary text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded w-max mb-4 border border-primary/20">Featured Course</span>
                                <h2 className="text-2xl md:text-3xl font-black text-white mb-4 leading-tight group-hover:text-primary transition-colors">B2B Manufacturing: Scaling to $10M ARR</h2>
                                <p className="text-gray-400 mb-6 text-sm">Learn the exact CRM structures, outbound frameworks, and trade show strategies used by top industrial suppliers.</p>

                                <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-gray-300">
                                    <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-emerald-500" /> 45 mins</div>
                                    <div className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-emerald-500" /> 5 Modules</div>
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                        <Star className="w-4 h-4 text-yellow-500" />
                                        <span className="text-xs ml-1">(120)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Up Next / Playlist */}
                    <section>
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2 border-l-4 border-primary pl-3">Go-to-Market Series</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                            {/* Card 1 */}
                            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer flex flex-col group">
                                <div className="h-40 relative bg-gray-200 dark:bg-gray-800 overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" alt="thumb" />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <PlayCircle className="w-12 h-12 text-white" />
                                    </div>
                                    <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded">
                                        12:30
                                    </div>
                                </div>
                                <div className="p-5 flex-1 flex flex-col">
                                    <h4 className="font-bold mb-2 group-hover:text-primary transition-colors">1. Ideal Customer Profile for Manufacturers</h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">Stop selling to everyone. Learn to identify and target high-value B2B accounts.</p>
                                    <div className="mt-auto flex items-center justify-between text-xs font-bold text-gray-400">
                                        <span className="flex items-center gap-1 text-primary"><Unlock className="w-3 h-3" /> Unlocked</span>
                                        <span className="flex items-center gap-1">Module 1 <ChevronRight className="w-3 h-3" /></span>
                                    </div>
                                </div>
                            </div>

                            {/* Card 2 (Locked) */}
                            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-all flex flex-col opacity-60 grayscale hover:grayscale-0">
                                <div className="h-40 relative bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                    <Lock className="w-8 h-8 text-gray-400" />
                                </div>
                                <div className="p-5 flex-1 flex flex-col">
                                    <h4 className="font-bold mb-2 text-gray-600 dark:text-gray-300">2. Building a Trade Show Playbook</h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">Maximize ROI from expensive global exhibitions.</p>
                                    <div className="mt-auto flex items-center justify-between text-xs font-bold text-gray-400">
                                        <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> Locked</span>
                                        <span className="flex items-center gap-1">Module 2</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </section>

                </main>
            </div>
        </div>
    );
}

function Globe(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
            <path d="M2 12h20" />
        </svg>
    );
}
