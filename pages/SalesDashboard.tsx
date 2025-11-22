
import React from 'react';
import { TrendingUp, Users, MapPin, DollarSign } from 'lucide-react';

const SalesDashboard: React.FC = () => {
    return (
        <div className="space-y-4 max-w-[1920px] mx-auto pb-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Field Sales Dashboard</h2>
                <button className="bg-aqua-500 hover:bg-aqua-400 text-white dark:text-aqua-950 px-4 py-2 rounded-lg font-bold text-sm shadow-lg shadow-aqua-500/20 transition-all">
                    + New Lead
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-aqua-800/50 border border-gray-200 dark:border-aqua-700 p-4 rounded-xl shadow-sm">
                    <p className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase">Daily Target</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">$4,500</p>
                    <div className="w-full bg-gray-200 dark:bg-aqua-900 h-1.5 rounded-full mt-2">
                        <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">65% Achieved</p>
                </div>
                <div className="bg-white dark:bg-aqua-800/50 border border-gray-200 dark:border-aqua-700 p-4 rounded-xl shadow-sm">
                    <p className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase">Visits Completed</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">8 <span className="text-sm font-normal text-gray-500">/ 12</span></p>
                </div>
                <div className="bg-white dark:bg-aqua-800/50 border border-gray-200 dark:border-aqua-700 p-4 rounded-xl shadow-sm">
                    <p className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase">New Orders</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">5</p>
                </div>
            </div>

            <div className="bg-white dark:bg-aqua-800/30 border border-gray-200 dark:border-aqua-800 rounded-xl p-6 flex flex-col items-center justify-center text-center min-h-[300px] shadow-sm">
                <MapPin size={48} className="text-gray-300 dark:text-aqua-900 mb-4"/>
                <h3 className="text-gray-900 dark:text-white font-bold">Route Optimization</h3>
                <p className="text-gray-500 text-sm mt-1">Map view coming soon for sales territory management.</p>
            </div>
        </div>
    );
};

export default SalesDashboard;
