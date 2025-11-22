
import React, { useState } from 'react';
import { 
    Factory, 
    FlaskConical, 
    Package, 
    AlertTriangle,
    Droplets,
    Wind,
    Layers,
    Settings
} from 'lucide-react';
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    RadarChart, 
    PolarGrid, 
    PolarAngleAxis, 
    PolarRadiusAxis, 
    Radar,
    Legend
} from 'recharts';

interface FeedPlantProps {
    initialTab?: 'overview' | 'production' | 'materials' | 'formulas' | 'qc';
}

const qualityData = [
  { subject: 'Protein', A: 120, B: 110, fullMark: 150 },
  { subject: 'Fat', A: 98, B: 130, fullMark: 150 },
  { subject: 'Moisture', A: 86, B: 130, fullMark: 150 },
  { subject: 'Fiber', A: 99, B: 100, fullMark: 150 },
  { subject: 'Ash', A: 85, B: 90, fullMark: 150 },
  { subject: 'Energy', A: 65, B: 85, fullMark: 150 },
];

const productionData = [
  { name: 'Batch A1', planned: 100, actual: 98 },
  { name: 'Batch A2', planned: 100, actual: 102 },
  { name: 'Batch B1', planned: 80, actual: 75 },
  { name: 'Batch B2', planned: 80, actual: 80 },
  { name: 'Batch C1', planned: 120, actual: 115 },
];

const FeedPlant: React.FC<FeedPlantProps> = ({ initialTab = 'overview' }) => {
    const [activeTab, setActiveTab] = useState(initialTab);

    // Update local state if props change
    React.useEffect(() => {
        setActiveTab(initialTab);
    }, [initialTab]);

    const getTitle = () => {
        switch(activeTab) {
            case 'production': return 'Production Planning';
            case 'materials': return 'Raw Materials';
            case 'formulas': return 'Formulas & Types';
            case 'qc': return 'Quality Control';
            default: return 'Feed Plant Overview';
        }
    };

    return (
        <div className="space-y-4 max-w-[1920px] mx-auto pb-6">
            
            {/* Page Header & Status */}
            <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4 pb-1">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{getTitle()}</h2>
                    <p className="text-gray-500 dark:text-aqua-400 text-xs">Manage feed manufacturing operations.</p>
                </div>
                
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-aqua-900/50 rounded-full border border-gray-200 dark:border-aqua-700/30 shadow-sm">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-xs text-gray-600 dark:text-gray-300">Plant Status: <strong className="text-green-600 dark:text-green-400">Running</strong></span>
                </div>
            </div>

            {/* CONTENT AREA */}
            <div className="min-h-[500px]">
                
                {/* --- OVERVIEW TAB --- */}
                {activeTab === 'overview' && (
                    <div className="space-y-4">
                        {/* KPIs */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-white dark:bg-aqua-800/50 border border-gray-200 dark:border-aqua-700 p-4 rounded-xl shadow-sm">
                                <p className="text-gray-500 dark:text-gray-400 text-xs">Daily Production</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">42.5 Tons</p>
                                <div className="w-full bg-gray-200 dark:bg-aqua-900 h-1 rounded-full mt-2">
                                    <div className="bg-green-500 h-1 rounded-full" style={{ width: '85%' }}></div>
                                </div>
                                <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">85% of daily capacity</p>
                            </div>
                            <div className="bg-white dark:bg-aqua-800/50 border border-gray-200 dark:border-aqua-700 p-4 rounded-xl shadow-sm">
                                <p className="text-gray-500 dark:text-gray-400 text-xs">Active Batches</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">4 Running</p>
                                <p className="text-[10px] text-aqua-600 dark:text-aqua-400 mt-1">Next batch starts in 20m</p>
                            </div>
                            <div className="bg-white dark:bg-aqua-800/50 border border-gray-200 dark:border-aqua-700 p-4 rounded-xl shadow-sm">
                                <p className="text-gray-500 dark:text-gray-400 text-xs">Raw Material Stock</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">Healthy</p>
                                <p className="text-[10px] text-green-600 dark:text-green-500 mt-1">All key ingredients > 30%</p>
                            </div>
                            <div className="bg-white dark:bg-aqua-800/50 border border-gray-200 dark:border-aqua-700 p-4 rounded-xl shadow-sm">
                                <p className="text-gray-500 dark:text-gray-400 text-xs">Quality Pass Rate</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">98.2%</p>
                                <p className="text-[10px] text-red-500 dark:text-red-400 mt-1">2 Batches flagged for review</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            {/* Machine Status */}
                            <div className="lg:col-span-2 bg-white dark:bg-aqua-800/50 border border-gray-200 dark:border-aqua-700 rounded-xl p-4 shadow-sm">
                                <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-sm">Live Manufacturing Process</h3>
                                <div className="relative flex flex-col md:flex-row justify-between items-center gap-4 py-6 px-2 bg-gray-50 dark:bg-aqua-900/30 rounded-lg border border-gray-100 dark:border-transparent">
                                    {/* Connector Line */}
                                    <div className="hidden md:block absolute top-1/2 left-4 right-4 h-0.5 bg-gray-200 dark:bg-aqua-700 -z-10"></div>
                                    
                                    {[
                                        { name: 'Grinding', status: 'Active', icon: Settings },
                                        { name: 'Mixing', status: 'Active', icon: Droplets },
                                        { name: 'Pelletizing', status: 'Warning', icon: Layers },
                                        { name: 'Cooling', status: 'Active', icon: Wind },
                                        { name: 'Packing', status: 'Idle', icon: Package },
                                    ].map((step, i) => (
                                        <div key={i} className="flex flex-col items-center bg-white dark:bg-aqua-900 border border-gray-200 dark:border-aqua-700 p-3 rounded-lg w-28 z-10 shadow-sm">
                                            <div className={`p-2.5 rounded-full mb-1.5 ${step.status === 'Active' ? 'bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400' : step.status === 'Warning' ? 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-400'}`}>
                                                <step.icon size={16} />
                                            </div>
                                            <span className="font-bold text-xs text-gray-900 dark:text-white">{step.name}</span>
                                            <span className={`text-[10px] ${step.status === 'Active' ? 'text-green-600 dark:text-green-500' : step.status === 'Warning' ? 'text-yellow-600 dark:text-yellow-500' : 'text-gray-400 dark:text-gray-500'}`}>{step.status}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Alerts */}
                            <div className="bg-white dark:bg-aqua-800/50 border border-gray-200 dark:border-aqua-700 rounded-xl p-4 shadow-sm">
                                <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-sm">Recent Alerts</h3>
                                <div className="space-y-3">
                                    <div className="flex gap-2 items-start p-2.5 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/30 rounded-lg">
                                        <AlertTriangle className="text-red-500 shrink-0" size={16} />
                                        <div>
                                            <p className="text-xs font-bold text-gray-900 dark:text-white">Pelletizer Temp High</p>
                                            <p className="text-[10px] text-gray-500 dark:text-gray-400">Zone 2 overheating. Maintenance required.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 items-start p-2.5 bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-100 dark:border-yellow-500/30 rounded-lg">
                                        <Package className="text-yellow-600 dark:text-yellow-500 shrink-0" size={16} />
                                        <div>
                                            <p className="text-xs font-bold text-gray-900 dark:text-white">Low Stock: Fishmeal</p>
                                            <p className="text-[10px] text-gray-500 dark:text-gray-400">Below reorder level (15 tons).</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- PRODUCTION TAB --- */}
                {activeTab === 'production' && (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Weekly Production Schedule</h3>
                            <button className="bg-aqua-500 text-white dark:text-aqua-950 px-3 py-1.5 rounded-lg font-bold text-xs hover:bg-aqua-400 transition-colors shadow-sm">
                                + New Batch
                            </button>
                        </div>

                        <div className="bg-white dark:bg-aqua-800/50 border border-gray-200 dark:border-aqua-700 rounded-xl p-4 shadow-sm">
                             <div className="h-72 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={productionData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" strokeOpacity={0.2} />
                                        <XAxis dataKey="name" stroke="#9ca3af" fontSize={10} />
                                        <YAxis stroke="#9ca3af" fontSize={10} />
                                        <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff', fontSize: '12px' }} cursor={{fill: '#374151', opacity: 0.1}} />
                                        <Legend wrapperStyle={{fontSize: '12px'}}/>
                                        <Bar dataKey="planned" name="Planned (Tons)" fill="#4b5563" stroke="#13c8ec" strokeWidth={2} />
                                        <Bar dataKey="actual" name="Actual Output (Tons)" fill="#13c8ec" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="overflow-x-auto bg-white dark:bg-aqua-800/50 border border-gray-200 dark:border-aqua-700 rounded-xl shadow-sm">
                            <table className="w-full text-xs text-left">
                                <thead className="bg-gray-50 dark:bg-aqua-900/80 text-gray-500 dark:text-gray-400 uppercase text-[10px]">
                                    <tr>
                                        <th className="px-4 py-3">Batch ID</th>
                                        <th className="px-4 py-3">Product</th>
                                        <th className="px-4 py-3">Scheduled Time</th>
                                        <th className="px-4 py-3">Machine</th>
                                        <th className="px-4 py-3">Staff</th>
                                        <th className="px-4 py-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-aqua-700 text-gray-700 dark:text-gray-300">
                                    <tr className="hover:bg-gray-50 dark:hover:bg-aqua-700/30 transition-colors">
                                        <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">#B-2023-089</td>
                                        <td className="px-4 py-3">Starter Feed 1.5mm</td>
                                        <td className="px-4 py-3">Today, 08:00 AM</td>
                                        <td className="px-4 py-3">Line A</td>
                                        <td className="px-4 py-3">John D.</td>
                                        <td className="px-4 py-3"><span className="px-1.5 py-0.5 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded text-[10px]">In Progress</span></td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 dark:hover:bg-aqua-700/30 transition-colors">
                                        <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">#B-2023-090</td>
                                        <td className="px-4 py-3">Grower Feed 3mm</td>
                                        <td className="px-4 py-3">Today, 02:00 PM</td>
                                        <td className="px-4 py-3">Line A</td>
                                        <td className="px-4 py-3">Sarah M.</td>
                                        <td className="px-4 py-3"><span className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-500/20 text-gray-600 dark:text-gray-400 rounded text-[10px]">Scheduled</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* --- MATERIALS TAB --- */}
                {activeTab === 'materials' && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {['Maize', 'Soybean Meal', 'Fishmeal'].map((item, i) => (
                                <div key={i} className="bg-white dark:bg-aqua-800/50 border border-gray-200 dark:border-aqua-700 p-4 rounded-xl shadow-sm">
                                    <div className="flex justify-between mb-1.5">
                                        <span className="text-gray-900 dark:text-white font-bold text-sm">{item}</span>
                                        <span className="text-aqua-600 dark:text-aqua-400 text-xs">85 Tons</span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-aqua-900 h-1.5 rounded-full">
                                        <div className="bg-aqua-500 h-1.5 rounded-full" style={{ width: '60%' }}></div>
                                    </div>
                                    <div className="flex justify-between mt-2 text-[10px] text-gray-500 dark:text-gray-400">
                                        <span>Reorder: 20T</span>
                                        <span>Capacity: 150T</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white dark:bg-aqua-800/50 border border-gray-200 dark:border-aqua-700 rounded-xl p-4 shadow-sm">
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="font-bold text-gray-900 dark:text-white text-sm">Recent Goods Received Notes (GRN)</h3>
                                <button className="text-aqua-600 dark:text-aqua-400 text-xs hover:underline">View All History</button>
                            </div>
                            <table className="w-full text-xs text-left">
                                <thead className="bg-gray-50 dark:bg-aqua-900/80 text-gray-500 dark:text-gray-400 uppercase text-[10px]">
                                    <tr>
                                        <th className="px-4 py-3">GRN ID</th>
                                        <th className="px-4 py-3">Supplier</th>
                                        <th className="px-4 py-3">Material</th>
                                        <th className="px-4 py-3">Quantity</th>
                                        <th className="px-4 py-3">Quality Check</th>
                                        <th className="px-4 py-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-aqua-700 text-gray-700 dark:text-gray-300">
                                    <tr className="hover:bg-gray-50 dark:hover:bg-aqua-700/30 transition-colors">
                                        <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">#GRN-1023</td>
                                        <td className="px-4 py-3">AgroSupplies Co.</td>
                                        <td className="px-4 py-3">Rice Bran</td>
                                        <td className="px-4 py-3">20 Tons</td>
                                        <td className="px-4 py-3"><span className="text-green-600 dark:text-green-400">Passed (A)</span></td>
                                        <td className="px-4 py-3"><span className="px-1.5 py-0.5 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded text-[10px]">Stocked</span></td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 dark:hover:bg-aqua-700/30 transition-colors">
                                        <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">#GRN-1024</td>
                                        <td className="px-4 py-3">Ocean Proteins</td>
                                        <td className="px-4 py-3">Fish Oil</td>
                                        <td className="px-4 py-3">500 Liters</td>
                                        <td className="px-4 py-3"><span className="text-yellow-600 dark:text-yellow-400">Pending Lab</span></td>
                                        <td className="px-4 py-3"><span className="px-1.5 py-0.5 bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 rounded text-[10px]">Quarantine</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* --- FORMULAS TAB --- */}
                {activeTab === 'formulas' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                            { name: 'Starter Feed', type: 'Floating', protein: '32%', fat: '5%', cost: '$0.85/kg' },
                            { name: 'Grower Feed', type: 'Sinking', protein: '28%', fat: '4%', cost: '$0.72/kg' },
                            { name: 'Finisher Feed', type: 'Sinking', protein: '24%', fat: '6%', cost: '$0.68/kg' },
                        ].map((formula, i) => (
                            <div key={i} className="bg-white dark:bg-aqua-800/50 border border-gray-200 dark:border-aqua-700 p-4 rounded-xl hover:border-aqua-500 transition-colors cursor-pointer shadow-sm">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="p-2.5 bg-aqua-100 dark:bg-aqua-900 rounded-lg text-aqua-600 dark:text-aqua-500">
                                        <FlaskConical size={20} />
                                    </div>
                                    <span className="text-[10px] bg-aqua-100 text-aqua-700 dark:bg-aqua-500/20 dark:text-aqua-400 px-2 py-0.5 rounded uppercase">{formula.type}</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-0.5">{formula.name}</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">Est. Cost: {formula.cost}</p>
                                
                                <div className="space-y-1.5">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-gray-500 dark:text-gray-400">Crude Protein</span>
                                        <span className="text-gray-900 dark:text-white">{formula.protein}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-aqua-900 h-1 rounded-full">
                                        <div className="bg-blue-500 h-1 rounded-full" style={{ width: formula.protein }}></div>
                                    </div>
                                     <div className="flex justify-between text-xs">
                                        <span className="text-gray-500 dark:text-gray-400">Crude Fat</span>
                                        <span className="text-gray-900 dark:text-white">{formula.fat}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-aqua-900 h-1 rounded-full">
                                        <div className="bg-yellow-500 h-1 rounded-full" style={{ width: parseFloat(formula.fat) * 10 + '%' }}></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="border-2 border-dashed border-gray-300 dark:border-aqua-800 rounded-xl flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 hover:text-aqua-500 hover:border-aqua-500 transition-colors cursor-pointer min-h-[180px] bg-gray-50 dark:bg-transparent">
                            <div className="p-3 bg-white dark:bg-aqua-900/50 rounded-full mb-2 shadow-sm">
                                <FlaskConical size={20} />
                            </div>
                            <span className="font-medium text-xs">+ Create New Formula</span>
                        </div>
                    </div>
                )}

                {/* --- QC TAB --- */}
                {activeTab === 'qc' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="bg-white dark:bg-aqua-800/50 border border-gray-200 dark:border-aqua-700 rounded-xl p-4 shadow-sm">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-sm">Nutrient Analysis (Target vs Actual)</h3>
                             <div className="h-72 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={qualityData}>
                                        <PolarGrid stroke="#374151" strokeOpacity={0.2} />
                                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 10 }} />
                                        <PolarRadiusAxis angle={30} domain={[0, 150]} stroke="#374151" strokeOpacity={0.2} />
                                        <Radar name="Standard" dataKey="A" stroke="#13c8ec" fill="#13c8ec" fillOpacity={0.3} />
                                        <Radar name="Batch Sample" dataKey="B" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                                        <Legend wrapperStyle={{fontSize: '12px'}}/>
                                        <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff', fontSize: '12px' }} />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-aqua-800/50 border border-gray-200 dark:border-aqua-700 rounded-xl p-4 shadow-sm">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-sm">Lab Test Entry</h3>
                            <div className="space-y-3">
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-[10px] text-gray-500 dark:text-gray-400 mb-1">Batch ID</label>
                                        <input type="text" className="w-full bg-gray-50 dark:bg-aqua-900 border border-gray-300 dark:border-aqua-700 rounded px-2 py-1.5 text-gray-900 dark:text-white text-xs focus:border-aqua-500 focus:outline-none" placeholder="#B-..." />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] text-gray-500 dark:text-gray-400 mb-1">Sample Date</label>
                                        <input type="date" className="w-full bg-gray-50 dark:bg-aqua-900 border border-gray-300 dark:border-aqua-700 rounded px-2 py-1.5 text-gray-900 dark:text-white text-xs focus:border-aqua-500 focus:outline-none" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] text-gray-500 dark:text-gray-400 mb-1">Moisture %</label>
                                    <input type="range" className="w-full accent-aqua-500" min="0" max="20" />
                                </div>
                                <div>
                                    <label className="block text-[10px] text-gray-500 dark:text-gray-400 mb-1">Water Stability (Mins)</label>
                                    <input type="number" className="w-full bg-gray-50 dark:bg-aqua-900 border border-gray-300 dark:border-aqua-700 rounded px-2 py-1.5 text-gray-900 dark:text-white text-xs focus:border-aqua-500 focus:outline-none" placeholder="e.g., 120" />
                                </div>
                                <div className="flex gap-3 mt-2">
                                    <button className="flex-1 bg-green-600 hover:bg-green-500 text-white py-2 rounded text-xs font-bold shadow-lg shadow-green-500/20">Pass</button>
                                    <button className="flex-1 bg-red-600 hover:bg-red-500 text-white py-2 rounded text-xs font-bold">Reject</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default FeedPlant;
