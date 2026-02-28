import React from 'react';
import FinningCircleNav from '../../components/finning-circle/FinningCircleNav';
import {
    Building2, Star, CheckCircle2, BookmarkPlus, Share2,
    ArrowLeftRight, Mail, Package
} from 'lucide-react';

export default function FinningCircleProduct() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
            <FinningCircleNav />

            <main className="flex-1 overflow-y-auto max-w-7xl mx-auto w-full p-6 pb-32">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Left: Gallery */}
                    <div className="lg:w-1/2">
                        <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-900">
                            <img
                                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop"
                                alt="Product"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 left-4 flex gap-2">
                                <span className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">Eco-Certified</span>
                                <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white border border-white/10 text-xs font-bold rounded-full">In Stock</span>
                            </div>
                        </div>

                        {/* Thumbnails */}
                        <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                            <div className="w-20 h-20 rounded-lg border-2 border-primary overflow-hidden shrink-0 cursor-pointer">
                                <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover" alt="thumb" />
                            </div>
                            <div className="w-20 h-20 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden shrink-0 cursor-pointer opacity-70 hover:opacity-100">
                                <div className="w-full h-full bg-gray-200 dark:bg-gray-800"></div>
                            </div>
                            <div className="w-20 h-20 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden shrink-0 cursor-pointer opacity-70 hover:opacity-100">
                                <div className="w-full h-full bg-gray-200 dark:bg-gray-800"></div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Details */}
                    <div className="lg:w-1/2 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                            <h1 className="text-3xl font-extrabold tracking-tight">EcoPack-200 Series</h1>
                            <div className="flex gap-2">
                                <button className="p-2 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                                    <ArrowLeftRight className="w-5 h-5" />
                                </button>
                                <button className="p-2 border border-gray-200 dark:border-gray-800 rounded-lg text-primary hover:bg-primary/10">
                                    <BookmarkPlus className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <div className="mb-6">
                            <p className="text-2xl font-black text-primary">$4,250.00</p>
                            <p className="text-sm text-gray-500 font-medium">per unit (MOQ 50)</p>
                        </div>

                        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                            Industrial Grade Sustainable Packaging designed for long-range logistics. Built with high-density recycled HDPE to withstand extreme pressures while minimizing carbon footprint.
                        </p>

                        {/* Manufacturer Tag */}
                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 flex justify-between items-center mb-8 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 p-2 border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                                    <Building2 className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                                </div>
                                <div>
                                    <h3 className="font-bold flex items-center gap-1">
                                        Global Logistics Supplies
                                        <CheckCircle2 className="w-4 h-4 text-primary" />
                                    </h3>
                                    <div className="flex items-center gap-1 text-yellow-500 text-sm">
                                        <Star className="w-4 h-4 fill-current" />
                                        <span className="font-bold text-gray-900 dark:text-white">4.9</span>
                                        <span className="text-gray-500 ml-1">(1,240 Reviews)</span>
                                    </div>
                                </div>
                            </div>
                            <button className="text-primary text-sm font-bold hover:underline">View Profile</button>
                        </div>

                        {/* Tabs */}
                        <div className="border-b border-gray-200 dark:border-gray-800 flex gap-6 mb-6">
                            <button className="px-1 py-2 text-sm font-bold border-b-2 border-primary text-primary">Specifications</button>
                            <button className="px-1 py-2 text-sm font-bold text-gray-500 hover:text-gray-900 dark:hover:text-white">Description</button>
                            <button className="px-1 py-2 text-sm font-bold text-gray-500 hover:text-gray-900 dark:hover:text-white">Shipping</button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                                <p className="text-xs text-gray-500 mb-1">Material</p>
                                <p className="font-bold">Recycled HDPE</p>
                            </div>
                            <div className="p-4 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                                <p className="text-xs text-gray-500 mb-1">Dimensions</p>
                                <p className="font-bold">120cm x 80cm x 115cm</p>
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            {/* Sticky Bottom Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 lg:hidden z-50">
                <div className="flex gap-3 max-w-7xl mx-auto">
                    <button className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 rounded-xl font-bold">Sample</button>
                    <button className="flex-[2] bg-primary text-white py-3 rounded-xl font-bold">Request Quote</button>
                </div>
            </div>
        </div>
    );
}
