import React from 'react';
import { MapPin, Activity, AlertOctagon } from 'lucide-react';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface InventoryProps {
    category?: 'Feed' | 'Seed' | 'Medicine' | 'General';
}

const forecastData = [
  { name: 'Week 1', stock: 400, demand: 240 },
  { name: 'Week 2', stock: 300, demand: 139 },
  { name: 'Week 3', stock: 200, demand: 680 }, // Spike
  { name: 'Week 4', stock: 278, demand: 390 },
  { name: 'Week 5', stock: 189, demand: 480 },
];

const InventoryIntelligence: React.FC<InventoryProps> = ({ category = 'Feed' }) => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col">
          <h2 className="text-3xl font-bold text-white">{category} Inventory Intelligence</h2>
          <p className="text-aqua-400 text-sm">Real-time tracking for {category.toLowerCase()} stock and demand.</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-aqua-800/50 border border-aqua-700 p-6 rounded-xl">
            <p className="text-gray-400 text-sm">Total {category} Stock (Units)</p>
            <p className="text-3xl font-bold text-white mt-2">1,240</p>
            <p className="text-green-500 text-xs mt-1 flex items-center gap-1"><Activity size={12}/> +2.5%</p>
        </div>
        <div className="bg-aqua-800/50 border border-aqua-700 p-6 rounded-xl">
            <p className="text-gray-400 text-sm">Critical Warehouses</p>
            <p className="text-3xl font-bold text-white mt-2">3</p>
            <p className="text-orange-500 text-xs mt-1 flex items-center gap-1"><AlertOctagon size={12}/> +1 warehouse</p>
        </div>
         <div className="bg-aqua-800/50 border border-aqua-700 p-6 rounded-xl">
            <p className="text-gray-400 text-sm">Active Batches</p>
            <p className="text-3xl font-bold text-white mt-2">89</p>
            <p className="text-red-500 text-xs mt-1">-0.5%</p>
        </div>
         <div className="bg-aqua-800/50 border border-aqua-700 p-6 rounded-xl">
            <p className="text-gray-400 text-sm">QA Alerts</p>
            <p className="text-3xl font-bold text-white mt-2">5</p>
            <p className="text-red-500 text-xs mt-1">+3 alerts</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Table & Chart */}
        <div className="lg:col-span-2 space-y-6">
            <div className="bg-aqua-800/50 border border-aqua-700 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Demand Forecasting vs Stock</h3>
                <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={forecastData}>
                            <CartesianGrid stroke="#234248" strokeDasharray="3 3" />
                            <XAxis dataKey="name" stroke="#92c0c9" fontSize={12} />
                            <YAxis stroke="#92c0c9" fontSize={12} />
                            <Tooltip contentStyle={{ backgroundColor: '#152a2e', borderColor: '#234248' }} />
                            <Legend />
                            <Bar dataKey="stock" barSize={20} fill="#13c8ec" />
                            <Line type="monotone" dataKey="demand" stroke="#ff7300" strokeWidth={3} />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-aqua-800/50 border border-aqua-700 rounded-xl overflow-hidden">
                <div className="p-6 border-b border-aqua-700">
                    <h3 className="text-lg font-bold text-white">Real-time Stock Levels ({category})</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-aqua-900/50 text-gray-400 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-3">Warehouse</th>
                                <th className="px-6 py-3">Item Name</th>
                                <th className="px-6 py-3">Quantity</th>
                                <th className="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-aqua-700 text-gray-300">
                            <tr>
                                <td className="px-6 py-4">WH-01 (Delta)</td>
                                <td className="px-6 py-4">{category === 'Feed' ? 'Starter-1 Pellets' : category === 'Seed' ? 'Vannamei PL 10' : 'Probiotic Mix A'}</td>
                                <td className="px-6 py-4">250</td>
                                <td className="px-6 py-4"><span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">Healthy</span></td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4">WH-02 (Coastal)</td>
                                <td className="px-6 py-4">{category === 'Feed' ? 'Grower-2 Extruded' : category === 'Seed' ? 'Monodon PL 15' : 'Vitamin Premix'}</td>
                                <td className="px-6 py-4">85</td>
                                <td className="px-6 py-4"><span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full text-xs">Low Stock</span></td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4">WH-03 (Central)</td>
                                <td className="px-6 py-4">{category === 'Feed' ? 'Finisher Pellets' : category === 'Seed' ? 'Broodstock' : 'Antibiotic Free'}</td>
                                <td className="px-6 py-4">15</td>
                                <td className="px-6 py-4"><span className="bg-red-500/20 text-red-400 px-2 py-1 rounded-full text-xs">Critical</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        {/* Right Col: Map & QA */}
        <div className="space-y-6">
            <div className="bg-aqua-800/50 border border-aqua-700 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Warehouse Locations</h3>
                {/* Placeholder Map */}
                <div className="h-64 w-full rounded-lg overflow-hidden relative">
                    <img src="https://picsum.photos/id/10/400/300" alt="Map" className="w-full h-full object-cover opacity-60 hover:opacity-80 transition-opacity" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="bg-aqua-900/80 p-2 rounded-lg backdrop-blur-sm">
                            <MapPin className="text-aqua-500" />
                        </div>
                    </div>
                </div>
            </div>

             <div className="bg-aqua-800/50 border border-aqua-700 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Top Suppliers ({category})</h3>
                <ul className="space-y-4">
                    <li className="flex justify-between items-center">
                        <div>
                            <p className="text-white font-medium">Global {category}s Inc.</p>
                            <p className="text-xs text-gray-400">On-time: 98%</p>
                        </div>
                        <div className="text-right">
                            <p className="text-green-400 font-medium text-sm">Excellent</p>
                            <p className="text-xs text-gray-400">QA: 99.5%</p>
                        </div>
                    </li>
                    <li className="flex justify-between items-center">
                        <div>
                            <p className="text-white font-medium">Coastal Supplies</p>
                            <p className="text-xs text-gray-400">On-time: 88%</p>
                        </div>
                        <div className="text-right">
                            <p className="text-orange-400 font-medium text-sm">Needs Watch</p>
                            <p className="text-xs text-gray-400">QA: 96%</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryIntelligence;