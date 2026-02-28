import { NavLink } from 'react-router-dom';
import {
    Building2,
    Video,
    Map,
    History,
    Box,
    Search,
    GraduationCap
} from 'lucide-react';

export default function FinningCircleNav() {
    const tabs = [
        { name: 'Dashboard', path: '/finning-circle/dashboard', icon: Map },
        { name: 'Live Streams', path: '/finning-circle/live', icon: Video },
        { name: 'Discovery', path: '/finning-circle/discovery', icon: Search },
        { name: 'Timeline', path: '/finning-circle/timeline', icon: History },
        { name: 'Products', path: '/finning-circle/product', icon: Box },
        { name: 'Venues', path: '/finning-circle/venue', icon: Building2 },
        { name: 'Workshops', path: '/finning-circle/workshops', icon: GraduationCap },
    ];

    return (
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center gap-2">
                        <div className="bg-primary/10 p-2 rounded-lg">
                            <Building2 className="w-6 h-6 text-primary" />
                        </div>
                        <span className="text-xl font-bold dark:text-white">Finning Circle</span>
                    </div>

                    <div className="hidden lg:block relative w-96">
                        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search trade events, products..."
                            className="w-full bg-gray-100 dark:bg-gray-800 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary"
                        />
                    </div>
                </div>
            </div>

            {/* Scrollable Tabs */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-100 dark:border-gray-800">
                <div className="flex space-x-1 overflow-x-auto custom-scrollbar -mb-px">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <NavLink
                                key={tab.name}
                                to={tab.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-2 whitespace-nowrap py-3 px-4 text-sm font-medium border-b-2 transition-colors ${isActive
                                        ? 'border-primary text-primary'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-700'
                                    }`
                                }
                            >
                                <Icon className="w-4 h-4" />
                                {tab.name}
                            </NavLink>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
