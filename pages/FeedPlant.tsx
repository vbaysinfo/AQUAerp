import React, { useState } from 'react';
import { 
    Factory, 
    FlaskConical, 
    Package, 
    AlertTriangle,
    Droplets,
    Wind,
    Layers,
    ClipboardList,
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
        <div className="space-y-6 max-w-7xl mx-auto">
            
            {/* Page Header & Status */}
            <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4 pb-2">
                <div>
                    <h2 className="text-3xl font-bold text-white">{getTitle()}</h2>
                    <p className="text-aqua-400 text-sm">Manage feed manufacturing operations.</p>
                </div>
                
                <div className="flex items-center gap-2 px-4 py-2 bg-aqua-900/50 rounded-full border border-aqua-700/30">
                    <span className="flex h-3 w-3 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-sm text-gray-300">Plant Status: <strong className="text-green-400">Running</strong></span>
                </div>
            </div>

            {/* CONTENT AREA */}
            <div className="min-h-[500px]">
                
                {/* --- OVERVIEW TAB --- */}
                {activeTab === 'overview' && (
                    <div className="space-y-6">
                        {/* KPIs */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-aqua-800/50 border border-aqua-700 p-6 rounded-xl">
                                <p className="text-gray-400 text-sm">Daily Production</p>
                                <p className="text-3xl font-bold text-white mt-2">42.5 Tons</p>
                                <div className="w-full bg-aqua-900 h-1.5 rounded-full mt-3">
                                    <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                                </div>
                                <p className="text-xs text-gray-400 mt-1">85% of daily capacity</p>
                            </div>
                            <div className="bg-aqua-800/50 border border-aqua-700 p-6 rounded-xl">
                                <p className="text-gray-400 text-sm">Active Batches</p>
                                <p className="text-3xl font-bold text-white mt-2">4 Running</p>
                                <p className="text-xs text-aqua-400 mt-1">Next batch starts in 20m</p>
                            </div>
                            <div className="bg-aqua-800/50 border border-aqua-700 p-6 rounded-xl">
                                <p className="text-gray-400 text-sm">Raw Material Stock</p>
                                <p className="text-3xl font-bold text-white mt-2">Healthy</p>
                                <p className="text-xs text-green-500 mt-1">All key ingredients > 30%</p>
                            </div>
                            <div className="bg-aqua-800/50 border border-aqua-700 p-6 rounded-xl">
                                <p className="text-gray-400 text-sm">Quality Pass Rate</p>
                                <p className="text-3xl font-bold text-white mt-2">98.2%</p>
                                <p className="text-xs text-red-400 mt-1">2 Batches flagged for review</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Machine Status */}
                            <div className="lg:col-span-2 bg-aqua-800/50 border border-aqua-700 rounded-xl p-6">
                                <h3 className="font-bold text-white mb-4">Live Manufacturing Process</h3>
                                <div className="relative flex flex-col md:flex-row justify-between items-center gap-6 py-8 px-4 bg-aqua-900/30 rounded-lg">
                                    {/* Connector Line */}
                                    <div className="hidden md:block absolute top-1/2 left-4 right-4 h-1 bg-aqua-700 -z-10"></div>
                                    
                                    {[
                                        { name: 'Grinding', status: 'Active', icon: Settings },
                                        { name: 'Mixing', status: 'Active', icon: Droplets },
                                        { name: 'Pelletizing', status: 'Warning', icon: Layers },
                                        { name: 'Cooling', status: 'Active', icon: Wind },
                                        { name: 'Packing', status: 'Idle', icon: Package },
                                    ].map((step, i) => (
                                        <div key={i} className="flex flex-col items-center bg-aqua-900 border border-aqua-700 p-4 rounded-lg w-32 z-10">
                                            <div className={`p-3 rounded-full mb-2 ${step.status === 'Active' ? 'bg-green-500/20 text-green-400' : step.status === 'Warning' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-700 text-gray-400'}`}>
                                                <step.icon size={20} />
                                            </div>
                                            <span className="font-bold text-sm text-white">{step.name}</span>
                                            <span className={`text-xs ${step.status === 'Active' ? 'text-green-500' : step.status === 'Warning' ? 'text-yellow-500' : 'text-gray-500'}`}>{step.status}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Alerts */}
                            <div className="bg-aqua-800/50 border border-aqua-700 rounded-xl p-6">
                                <h3 className="font-bold text-white mb-4">Recent Alerts</h3>
                                <div className="space-y-4">
                                    <div className="flex gap-3 items-start p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                                        <AlertTriangle className="text-red-500 shrink-0" size={20} />
                                        <div>
                                            <p className="text-sm font-bold text-white">Pelletizer Temp High</p>
                                            <p className="text-xs text-gray-400">Zone 2 overheating. Maintenance required.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 items-start p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                                        <Package className="text-yellow-500 shrink-0" size={20} />
                                        <div>
                                            <p className="text-sm font-bold text-white">Low Stock: Fishmeal</p>
                                            <p className="text-xs text-gray-400">Below reorder level (15 tons).</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- PRODUCTION TAB --- */}
                {activeTab === 'production' && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-bold text-white">Weekly Production Schedule</h3>
                            <button className="bg-aqua-500 text-aqua-950 px-4 py-2 rounded-lg font-bold text-sm hover:bg-aqua-400 transition-colors">
                                + New Batch
                            </button>
                        </div>

                        <div className="bg-aqua-800/50 border border-aqua-700 rounded-xl p-6">
                             <div className="h-80 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={productionData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#234248" />
                                        <XAxis dataKey="name" stroke="#92c0c9" fontSize={12} />
                                        <YAxis stroke="#92c0c9" fontSize={12} />
                                        <Tooltip contentStyle={{ backgroundColor: '#152a2e', borderColor: '#234248', color: '#fff' }} cursor={{fill: '#234248'}} />
                                        <Legend />
                                        <Bar dataKey="planned" name="Planned (Tons)" fill="#234248" stroke="#13c8ec" strokeWidth={2} />
                                        <Bar dataKey="actual" name="Actual Output (Tons)" fill="#13c8ec" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="overflow-x-auto bg-aqua-800/50 border border-aqua-700 rounded-xl">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-aqua-900/80 text-gray-400 uppercase text-xs">
                                    <tr>
                                        <th className="px-6 py-4">Batch ID</th>
                                        <th className="px-6 py-4">Product</th>
                                        <th className="px-6 py-4">Scheduled Time</th>
                                        <th className="px-6 py-4">Machine</th>
                                        <th className="px-6 py-4">Staff</th>
                                        <th className="px-6 py-4">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-aqua-700 text-gray-300">
                                    <tr className="hover:bg-aqua-700/30">
                                        <td className="px-6 py-4 font-medium text-white">#B-2023-089</td>
                                        <td className="px-6 py-4">Starter Feed 1.5mm</td>
                                        <td className="px-6 py-4">Today, 08:00 AM</td>
                                        <td className="px-6 py-4">Line A</td>
                                        <td className="px-6 py-4">John D.</td>
                                        <td className="px-6 py-4"><span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">In Progress</span></td>
                                    </tr>
                                    <tr className="hover:bg-aqua-700/30">
                                        <td className="px-6 py-4 font-medium text-white">#B-2023-090</td>
                                        <td className="px-6 py-4">Grower Feed 3mm</td>
                                        <td className="px-6 py-4">Today, 02:00 PM</td>
                                        <td className="px-6 py-4">Line A</td>
                                        <td className="px-6 py-4">Sarah M.</td>
                                        <td className="px-6 py-4"><span className="px-2 py-1 bg-gray-500/20 text-gray-400 rounded text-xs">Scheduled</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* --- MATERIALS TAB --- */}
                {activeTab === 'materials' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {['Maize', 'Soybean Meal', 'Fishmeal'].map((item, i) => (
                                <div key={i} className="bg-aqua-800/50 border border-aqua-700 p-6 rounded-xl">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-white font-bold">{item}</span>
                                        <span className="text-aqua-400 text-sm">85 Tons</span>
                                    </div>
                                    <div className="w-full bg-aqua-900 h-2 rounded-full">
                                        <div className="bg-aqua-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                                    </div>
                                    <div className="flex justify-between mt-2 text-xs text-gray-400">
                                        <span>Reorder: 20T</span>
                                        <span>Capacity: 150T</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-aqua-800/50 border border-aqua-700 rounded-xl p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-white">Recent Goods Received Notes (GRN)</h3>
                                <button className="text-aqua-400 text-sm hover:underline">View All History</button>
                            </div>
                            <table className="w-full text-sm text-left">
                                <thead className="bg-aqua-900/80 text-gray-400 uppercase text-xs">
                                    <tr>
                                        <th className="px-6 py-4">GRN ID</th>
                                        <th className="px-6 py-4">Supplier</th>
                                        <th className="px-6 py-4">Material</th>
                                        <th className="px-6 py-4">Quantity</th>
                                        <th className="px-6 py-4">Quality Check</th>
                                        <th className="px-6 py-4">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-aqua-700 text-gray-300">
                                    <tr className="hover:bg-aqua-700/30">
                                        <td className="px-6 py-4 text-white">#GRN-1023</td>
                                        <td className="px-6 py-4">AgroSupplies Co.</td>
                                        <td className="px-6 py-4">Rice Bran</td>
                                        <td className="px-6 py-4">20 Tons</td>
                                        <td className="px-6 py-4"><span className="text-green-400">Passed (A)</span></td>
                                        <td className="px-6 py-4"><span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">Stocked</span></td>
                                    </tr>
                                    <tr className="hover:bg-aqua-700/30">
                                        <td className="px-6 py-4 text-white">#GRN-1024</td>
                                        <td className="px-6 py-4">Ocean Proteins</td>
                                        <td className="px-6 py-4">Fish Oil</td>
                                        <td className="px-6 py-4">500 Liters</td>
                                        <td className="px-6 py-4"><span className="text-yellow-400">Pending Lab</span></td>
                                        <td className="px-6 py-4"><span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs">Quarantine</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* --- FORMULAS TAB --- */}
                {activeTab === 'formulas' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { name: 'Starter Feed', type: 'Floating', protein: '32%', fat: '5%', cost: '$0.85/kg' },
                            { name: 'Grower Feed', type: 'Sinking', protein: '28%', fat: '4%', cost: '$0.72/kg' },
                            { name: 'Finisher Feed', type: 'Sinking', protein: '24%', fat: '6%', cost: '$0.68/kg' },
                        ].map((formula, i) => (
                            <div key={i} className="bg-aqua-800/50 border border-aqua-700 p-6 rounded-xl hover:border-aqua-500 transition-colors cursor-pointer">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-aqua-900 rounded-lg text-aqua-500">
                                        <FlaskConical size={24} />
                                    </div>
                                    <span className="text-xs bg-aqua-500/20 text-aqua-400 px-2 py-1 rounded uppercase">{formula.type}</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-1">{formula.name}</h3>
                                <p className="text-sm text-gray-400 mb-4">Est. Cost: {formula.cost}</p>
                                
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Crude Protein</span>
                                        <span className="text-white">{formula.protein}</span>
                                    </div>
                                    <div className="w-full bg-aqua-900 h-1.5 rounded-full">
                                        <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: formula.protein }}></div>
                                    </div>
                                     <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Crude Fat</span>
                                        <span className="text-white">{formula.fat}</span>
                                    </div>
                                    <div className="w-full bg-aqua-900 h-1.5 rounded-full">
                                        <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: parseFloat(formula.fat) * 10 + '%' }}></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="border-2 border-dashed border-aqua-800 rounded-xl flex flex-col items-center justify-center text-gray-500 hover:text-aqua-500 hover:border-aqua-500 transition-colors cursor-pointer min-h-[200px]">
                            <div className="p-4 bg-aqua-900/50 rounded-full mb-2">
                                <FlaskConical size={24} />
                            </div>
                            <span className="font-medium">+ Create New Formula</span>
                        </div>
                    </div>
                )}

                {/* --- QC TAB --- */}
                {activeTab === 'qc' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-aqua-800/50 border border-aqua-700 rounded-xl p-6">
                            <h3 className="font-bold text-white mb-4">Nutrient Analysis (Target vs Actual)</h3>
                             <div className="h-80 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={qualityData}>
                                        <PolarGrid stroke="#234248" />
                                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#92c0c9', fontSize: 12 }} />
                                        <PolarRadiusAxis angle={30} domain={[0, 150]} stroke="#234248" />
                                        <Radar name="Standard" dataKey="A" stroke="#13c8ec" fill="#13c8ec" fillOpacity={0.3} />
                                        <Radar name="Batch Sample" dataKey="B" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                                        <Legend />
                                        <Tooltip contentStyle={{ backgroundColor: '#152a2e', borderColor: '#234248', color: '#fff' }} />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="bg-aqua-800/50 border border-aqua-700 rounded-xl p-6">
                            <h3 className="font-bold text-white mb-4">Lab Test Entry</h3>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs text-gray-400 mb-1">Batch ID</label>
                                        <input type="text" className="w-full bg-aqua-900 border border-aqua-700 rounded px-3 py-2 text-white text-sm" placeholder="#B-..." />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-400 mb-1">Sample Date</label>
                                        <input type="date" className="w-full bg-aqua-900 border border-aqua-700 rounded px-3 py-2 text-white text-sm" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-400 mb-1">Moisture %</label>
                                    <input type="range" className="w-full accent-aqua-500" min="0" max="20" />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-400 mb-1">Water Stability (Mins)</label>
                                    <input type="number" className="w-full bg-aqua-900 border border-aqua-700 rounded px-3 py-2 text-white text-sm" placeholder="e.g., 120" />
                                </div>
                                <div className="flex gap-3 mt-4">
                                    <button className="flex-1 bg-green-600 hover:bg-green-500 text-white py-2 rounded text-sm font-bold">Pass</button>
                                    <button className="flex-1 bg-red-600 hover:bg-red-500 text-white py-2 rounded text-sm font-bold">Reject</button>
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