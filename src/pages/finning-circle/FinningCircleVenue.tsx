
import FinningCircleNav from '../../components/finning-circle/FinningCircleNav';
import {
    Building2, MapPin, CheckCircle2, Star, Calendar,
    Users, Expand, Box, Mail, Phone, ExternalLink, ShieldCheck
} from 'lucide-react';

export default function FinningCircleVenue() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
            <FinningCircleNav />

            <main className="flex-1 overflow-y-auto w-full custom-scrollbar relative">
                <div className="max-w-6xl mx-auto w-full p-4 lg:p-8 space-y-8 relative z-10 pb-32">

                    {/* Hero Profile */}
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
                        <div className="h-48 md:h-64 bg-gray-200 dark:bg-gray-800 relative">
                            <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop" alt="Singapore Expo Cover" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 flex items-end gap-6">
                                <div className="w-24 h-24 rounded-2xl bg-white dark:bg-gray-900 border-4 border-white dark:border-gray-900 shadow-xl overflow-hidden hidden md:block">
                                    <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                                        <Building2 className="w-10 h-10 text-primary" />
                                    </div>
                                </div>
                                <div className="text-white pb-2">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h1 className="text-3xl font-black">Singapore EXPO</h1>
                                        <CheckCircle2 className="w-6 h-6 text-primary" />
                                    </div>
                                    <p className="flex items-center gap-2 text-sm font-medium text-gray-300">
                                        <MapPin className="w-4 h-4" /> 1 Expo Drive, Singapore 486150
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 md:pl-36 bg-white dark:bg-gray-900 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-200 dark:border-gray-800">
                            <div className="flex gap-6">
                                <div className="text-center">
                                    <p className="text-2xl font-black tracking-tighter">123k</p>
                                    <p className="text-[10px] font-bold text-gray-500 uppercase">sqm space</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-black tracking-tighter">10</p>
                                    <p className="text-[10px] font-bold text-gray-500 uppercase">Exhibition Halls</p>
                                </div>
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-1 text-2xl font-black tracking-tighter">
                                        4.9<Star className="w-4 h-4 fill-primary text-primary" />
                                    </div>
                                    <p className="text-[10px] font-bold text-gray-500 uppercase">650 Reviews</p>
                                </div>
                            </div>
                            <div className="flex gap-3 w-full md:w-auto">
                                <button className="flex-1 md:flex-none px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 hover:scale-105 transition-all">Book Space</button>
                                <button className="flex-1 md:flex-none px-6 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg text-sm font-bold hover:bg-gray-200 flex items-center justify-center gap-2"><ExternalLink className="w-4 h-4" /> Visit Website</button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Left Column: About & Amenities */}
                        <div className="lg:col-span-2 space-y-8">

                            <section className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Building2 className="w-5 h-5 text-primary" /> Venue Overview</h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm mb-6">
                                    Singapore EXPO is the country's largest purpose-built meetings, incentives, conventions and exhibitions (MICE) venue. With interconnected halls, seamless Wi-Fi, and built-in hybrid event broadcasting capabilities, it stands as the premier hub for global trade in Southeast Asia.
                                </p>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 text-center">
                                        <Expand className="w-6 h-6 mx-auto mb-2 text-primary" />
                                        <p className="text-xs font-bold text-gray-500 uppercase">Total Area</p>
                                        <p className="font-bold text-sm">123,000 sqm</p>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 text-center">
                                        <Box className="w-6 h-6 mx-auto mb-2 text-primary" />
                                        <p className="text-xs font-bold text-gray-500 uppercase">Halls</p>
                                        <p className="font-bold text-sm">10 Interconnected</p>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 text-center">
                                        <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
                                        <p className="text-xs font-bold text-gray-500 uppercase">Capacity</p>
                                        <p className="font-bold text-sm">19,000 pax</p>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 text-center">
                                        <ShieldCheck className="w-6 h-6 mx-auto mb-2 text-primary" />
                                        <p className="text-xs font-bold text-gray-500 uppercase">Certification</p>
                                        <p className="font-bold text-sm">SG SafeEvent</p>
                                    </div>
                                </div>
                            </section>

                            {/* Event Listings */}
                            <section>
                                <div className="flex justify-between items-end mb-6">
                                    <h3 className="text-xl font-bold flex items-center gap-2"><Calendar className="w-5 h-5 text-primary" /> Upcoming Events Here</h3>
                                    <a href="#" className="text-sm font-bold text-primary hover:underline">View All</a>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row gap-6 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="w-full sm:w-48 h-32 rounded-lg bg-gray-100 dark:bg-gray-800 overflow-hidden shrink-0 relative">
                                            <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover" alt="Event" />
                                            <div className="absolute top-2 left-2 bg-white/90 backdrop-blur text-gray-900 rounded-md px-2 py-1 text-center shadow-md">
                                                <p className="text-[10px] font-bold uppercase leading-none">Nov</p>
                                                <p className="text-lg font-black leading-none">12</p>
                                            </div>
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex gap-2 mb-2">
                                                    <span className="text-[10px] uppercase font-black tracking-wider text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-0.5 rounded">Tech</span>
                                                    <span className="text-[10px] uppercase font-black tracking-wider text-gray-600 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">Hall 1-3</span>
                                                </div>
                                                <h4 className="text-lg font-bold mb-1 hover:text-primary cursor-pointer">Fintech Festival Asia</h4>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">The largest gathering of financial technology leaders, exploring web3, AI, and digital banking infrastructure.</p>
                                            </div>
                                            <div className="flex gap-3">
                                                <button className="px-4 py-2 bg-primary/10 text-primary rounded text-xs font-bold hover:bg-primary/20 transition-colors">Register</button>
                                                <button className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded text-xs font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Floor Plan</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                        </div>

                        {/* Right Column: Contact & SME Support */}
                        <div className="space-y-6">

                            {/* Contact Card */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
                                <h3 className="font-bold mb-6 text-sm flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> Location & Contact</h3>

                                <div className="w-full h-32 bg-gray-100 dark:bg-gray-800 rounded-xl mb-6 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-[url('https://placeholder.pics/svg/300')] bg-cover opacity-50 mix-blend-multiply dark:mix-blend-screen"></div>
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]">
                                        <MapPin className="w-8 h-8 fill-current" />
                                    </div>
                                </div>

                                <div className="space-y-4 text-sm font-medium">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                                        <p className="text-gray-600 dark:text-gray-300">1 Expo Drive,<br />Singapore 486150</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                                        <p className="text-gray-600 dark:text-gray-300">+65 6403 2160</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                                        <p className="text-primary hover:underline cursor-pointer">sales@singaporeexpo.com.sg</p>
                                    </div>
                                </div>
                            </div>

                            {/* SME Services */}
                            <div className="bg-primary text-white rounded-2xl p-6 shadow-lg shadow-primary/20 relative overflow-hidden border border-primary/20">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-10 translate-x-10"></div>
                                <h3 className="font-bold mb-2 flex items-center gap-2 relative z-10">SME Support Pack</h3>
                                <p className="text-sm text-emerald-50 mb-6 relative z-10 leading-relaxed">
                                    Looking to exhibit? We offer discounted booth spaces, subsidized build-outs, and marketing support exclusively for verified SMEs.
                                </p>
                                <button className="w-full bg-white text-primary font-bold py-3 rounded-xl shadow-md hover:bg-gray-50 relative z-10">
                                    Apply for SME Grant
                                </button>
                            </div>

                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}
