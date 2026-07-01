import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
    Users, 
    Store, 
    Workflow, 
    ShieldCheck, 
    FileText 
} from 'lucide-react';

export default function FinningBizNav() {
    const location = useLocation();

    const navItems = [
        { path: '/ai-cxo/operations-officer/authorization', label: 'Authorization', icon: Users },
        { path: '/ai-cxo/operations-officer/marketplace', label: 'Marketplace', icon: Store },
        { path: '/ai-cxo/operations-officer/flow', label: 'Flow Visualization', icon: Workflow },
        { path: '/ai-cxo/operations-officer/auditor', label: 'Auditor Workflow', icon: ShieldCheck },
        { path: '/ai-cxo/operations-officer/report', label: 'Multi-Agent Report', icon: FileText },
    ];

    return (
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="flex space-x-8 overflow-x-auto custom-scrollbar" aria-label="Tabs">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={`
                                    whitespace-nowrap flex items-center py-4 px-1 border-b-2 font-medium text-sm
                                    ${isActive
                                        ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-700'
                                    }
                                `}
                            >
                                <Icon className={`mr-2 h-5 w-5 ${isActive ? 'text-primary-500 dark:text-primary-400' : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-500'}`} aria-hidden="true" />
                                {item.label}
                            </NavLink>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
}
