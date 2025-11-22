
import React, { useState } from 'react';
import { 
    Users, 
    MapPin, 
    Activity, 
    Clock, 
    Search, 
    ChevronRight, 
    Droplets, 
    AlertTriangle, 
    Briefcase,
    X,
    Fish,
    Scale,
    Camera,
    Pill,
    Thermometer,
    Utensils,
    Filter
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// --- MOCK DATA ---

const regionalStats = [
    { region: 'Bhimavaram', technicians: 12, farmers: 150, active: 8 },
    { region: 'Nellore', technicians: 8, farmers: 95, active: 5 },
    { region: 'Kakinada', technicians: 6, farmers: 70, active: 3 },
    { region: 'Guntur', technicians: 5, farmers: 45, active: 2 },
    { region: 'Ongole', technicians: 4, farmers: 30, active: 1 },
];

const technicians = [
    { 
        id: 'TECH-001', name: 'Ravi Kumar', region: 'Bhimavaram', 
        assignedFarmers: 25, status: 'On Field', lastActive: '10 mins ago',
        currentLocation: 'Kalla Mandal', phone: '+91 98765 43210',
        performance: 98 // Visit completion rate
    },
    { 
        id: 'TECH-002', name: 'Suresh Reddy', region: 'Nellore', 
        assignedFarmers: 18, status: 'Idle', lastActive: '1 hour ago',
        currentLocation: 'Nellore Office', phone: '+91 98765 12345',
        performance: 92
    },
    { 
        id: 'TECH-003', name: 'M. Krishna', region: 'Bhimavaram', 
        assignedFarmers: 22, status: 'On Field', lastActive: '5 mins ago',
        currentLocation: 'Undi Road', phone: '+91 98765 67890',
        performance: 95
    },
    { 
        id: 'TECH-004', name: 'P. Rao', region: 'Kakinada', 
        assignedFarmers: 15, status: 'Leave', lastActive: '2 days ago',
        currentLocation: 'N/A', phone: '+91 98765 11223',
        performance: 88
    },
    { 
        id: 'TECH-005', name: 'V. Naidu', region: 'Ongole', 
        assignedFarmers: 12, status: 'On Field', lastActive: 'Just now',
        currentLocation: 'Singarayakonda', phone: '+91 99887 77665',
        performance: 96
    }
];

const recentVisits = [
    {
        id: 'VIS-8821', technician: 'Ravi Kumar', farmer: 'Padmavathi Aqua', location: 'Bhimavaram',
        time: '10:30 AM', status: 'Completed',
        data: { pond: 'Pond A1', ph: 7.8, do: 5.2, feed: 'Normal', alert: false }
    },
    {
        id: 'VIS-8822', technician: 'V. Naidu', farmer: 'Sai Ram Prawns', location: 'Ongole',
        time: '10:15 AM', status: 'Completed',
        data: { pond: 'Pond B3', ph: 8.2, do: 3.8, feed: 'Low', alert: true } // Critical DO
    },
    {
        id: 'VIS-8823', technician: 'M. Krishna', farmer: 'Delta Farms', location: 'Bhimavaram',
        time: '09:45 AM', status: 'Completed',
        data: { pond: 'Pond C2', ph: 7.5, do: 5.5, feed: 'Normal', alert: false }
    },
    {
        id: 'VIS-8824', technician: 'Suresh Reddy', farmer: 'Venkata Sai', location: 'Nellore',
        time: '09:15 AM', status: 'In Progress',
        data: { pond: 'Pond A2', ph: 7.9, do: 4.8, feed: 'Normal', alert: false }
    },
];

// Detailed Data for Slide-over
const techDetailsMock: any = {
    'TECH-001': {
        farmers: [
            {
                name: 'Padmavathi Aqua',
                location: 'Kalla, Bhimavaram',
                totalPonds: 4,
                visitStatus: 'Visited Today',
                ponds: [
                    {
                        name: 'Pond A1',
                        area: '1.2 Ha',
                        seed: 'Vannamei CP',
                        shrimpSize: '18g (60 count)',
                        water: { ph: 7.8, do: 5.2, salinity: 15, temp: 29 },
                        feed: { type: 'Grower 2mm', fcr: 1.25, checkTray: 'Clean', consumed: '98%' },
                        medicine: 'Gut Probiotic (Morning)',
                        photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzn3imQP1UeTBQhZFd4l6E5O_lzGO831Y6DtgNTTEIlZHjPvlpRIVBWZWsqzLSDznJXoKwmNM661rG5Fh-6aX4Tlim3WV4ip6x6Sy81OeXvdfA9QxeXaPG-e8nwz5mJzOk0k6SYqGMVoZmT8MM9aJ49n5xvh86G0Y-ha1KSt4QlfzDsMs4pPasiSp6_z4dcLQX3xMAqREYc0UC6BEuKgC1g2YENUVkFqp85VGtSeFAwMZFQyGzTbHb0AvYPdSR3hHzeouMx_MWvjZq'
                    },
                    {
                        name: 'Pond A2',
                        area: '1.0 Ha',
                        seed: 'Vannamei CP',
                        shrimpSize: '15g (75 count)',
                        water: { ph: 8.1, do: 4.8, salinity: 14, temp: 29.5 },
                        feed: { type: 'Grower 1.8mm', fcr: 1.3, checkTray: 'Leftover 5%', consumed: '90%' },
                        medicine: 'None',
                        photo: null
                    }
                ]
            },
            {
                name: 'Sri Lakshmi Farms',
                location: 'Undi, Bhimavaram',
                totalPonds: 6,
                visitStatus: 'Pending',
                ponds: [] 
            }
        ]
    }
};

const TechnicianDashboard: React.FC = () => {
    const [filterRegion, setFilterRegion] = useState('All');
    const [selectedTechnicianId, setSelectedTechnicianId] = useState<string | null>(null);

    const selectedTechDetails = selectedTechnicianId ? techDetailsMock[selectedTechnicianId] : null;
    const selectedTechInfo = technicians.find(t => t.id === selectedTechnicianId);

    return (
        <div className="space-y-3 max-w-[1920px] mx-auto pb-6 relative">
            
            {/* Header & Controls */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-3 bg-white dark:bg-aqua-900/30 p-3 rounded-xl border border-gray-200 dark:border-aqua-800 backdrop-blur-sm shadow-sm">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Briefcase size={20} className="text-aqua-600 dark:text-aqua-400"/> Field Operations
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-[10px] mt-0.5">Live monitoring of technician activities.</p>
                </div>
                <div className="flex gap-2">
                    <div className="bg-gray-100 dark:bg-aqua-800/50 border border-gray-200 dark:border-aqua-700 rounded-lg p-1 flex items-center px-2 h-8">
                        <Filter size={12} className="text-gray-500 dark:text-gray-400 mr-2" />
                        <select 
                            className="bg-transparent text-gray-700 dark:text-white text-[10px] font-medium focus:outline-none appearance-none cursor-pointer"
                            value={filterRegion}
                            onChange={(e) => setFilterRegion(e.target.value)}
                        >
                            <option value="All">All Regions (AP)</option>
                            <option value="Bhimavaram">Bhimavaram</option>
                            <option value="Nellore">Nellore</option>
                            <option value="Kakinada">Kakinada</option>
                        </select>
                    </div>
                    <div className="relative h-8">
                        <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" size={12} />
                        <input 
                            type="text" 
                            placeholder="Search staff..." 
                            className="h-full bg-gray-100 dark:bg-aqua-800/50 border border-gray-200 dark:border-aqua-700 rounded-lg pl-7 pr-3 text-[10px] text-gray-900 dark:text-white focus:outline-none focus:border-aqua-500"
                        />
                    </div>
                    <button className="bg-aqua-500 hover:bg-aqua-400 text-white dark:text-aqua-950 px-3 rounded-lg text-[10px] font-bold transition-colors shadow-lg shadow-aqua-500/20 h-8">
                        + Assign
                    </button>
                </div>
            </div>

            {/* Compact KPI Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="bg-white dark:bg-aqua-900/40 border border-gray-200 dark:border-aqua-700/50 p-3 rounded-lg flex items-center gap-3 shadow-sm hover:border-aqua-500/30 transition-colors">
                    <div className="p-2 bg-blue-100 dark:bg-blue-500/10 rounded-lg text-blue-600 dark:text-blue-400 shrink-0">
                        <Users size={18}/>
                    </div>
                    <div>
                        <p className="text-[9px] text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider">Total Techs</p>
                        <div className="flex items-baseline gap-1.5">
                            <p className="text-lg font-bold text-gray-900 dark:text-white leading-none">35</p>
                            <span className="text-[9px] text-gray-500">5 Districts</span>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white dark:bg-aqua-900/40 border border-gray-200 dark:border-aqua-700/50 p-3 rounded-lg flex items-center gap-3 shadow-sm hover:border-aqua-500/30 transition-colors">
                    <div className="p-2 bg-green-100 dark:bg-green-500/10 rounded-lg text-green-600 dark:text-green-400 shrink-0">
                        <Activity size={18}/>
                    </div>
                    <div>
                        <p className="text-[9px] text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider">Active Visits</p>
                        <div className="flex items-baseline gap-1.5">
                            <p className="text-lg font-bold text-gray-900 dark:text-white leading-none">142</p>
                            <span className="text-[9px] text-green-500 font-medium">+12%</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-aqua-900/40 border border-gray-200 dark:border-aqua-700/50 p-3 rounded-lg flex items-center gap-3 shadow-sm hover:border-aqua-500/30 transition-colors">
                    <div className="p-2 bg-yellow-100 dark:bg-yellow-500/10 rounded-lg text-yellow-600 dark:text-yellow-400 shrink-0">
                        <MapPin size={18}/>
                    </div>
                    <div>
                        <p className="text-[9px] text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider">Coverage</p>
                        <div className="flex items-baseline gap-1.5">
                            <p className="text-lg font-bold text-gray-900 dark:text-white leading-none">1,250</p>
                            <span className="text-[9px] text-gray-500">Farmers</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-aqua-900/40 border border-gray-200 dark:border-aqua-700/50 p-3 rounded-lg flex items-center gap-3 shadow-sm hover:border-aqua-500/30 transition-colors">
                    <div className="p-2 bg-red-100 dark:bg-red-500/10 rounded-lg text-red-600 dark:text-red-400 shrink-0">
                        <AlertTriangle size={18}/>
                    </div>
                    <div>
                        <p className="text-[9px] text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider">Critical Alerts</p>
                        <div className="flex items-baseline gap-1.5">
                            <p className="text-lg font-bold text-gray-900 dark:text-white leading-none">5</p>
                            <span className="text-[9px] text-red-500 dark:text-red-400 font-medium">Action Req.</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                
                {/* Left Column: Distribution & Roster */}
                <div className="lg:col-span-2 space-y-3">
                    {/* Chart - Compact Height */}
                    <div className="bg-white dark:bg-aqua-900/40 border border-gray-200 dark:border-aqua-700/50 rounded-lg p-3 shadow-sm">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-xs font-bold text-gray-700 dark:text-gray-300">Staff Distribution</h3>
                            <span className="text-[9px] text-gray-500 bg-gray-100 dark:bg-aqua-900/50 px-1.5 py-0.5 rounded border border-gray-200 dark:border-transparent">By Region</span>
                        </div>
                        <div className="h-32 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={regionalStats} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }} barGap={2}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} strokeOpacity={0.2} />
                                    <XAxis type="number" stroke="#9ca3af" fontSize={9} tickLine={false} axisLine={false} />
                                    <YAxis dataKey="region" type="category" stroke="#9ca3af" fontSize={10} width={70} tickLine={false} axisLine={false} />
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', fontSize: '10px', padding: '4px 8px', color: '#fff' }}
                                        cursor={{fill: '#374151', opacity: 0.1}}
                                    />
                                    <Bar dataKey="technicians" name="Total" fill="#13c8ec" barSize={8} radius={[0, 2, 2, 0]} />
                                    <Bar dataKey="active" name="Active" fill="#10b981" barSize={8} radius={[0, 2, 2, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Roster Table - Dense */}
                    <div className="bg-white dark:bg-aqua-900/40 border border-gray-200 dark:border-aqua-700/50 rounded-lg overflow-hidden flex flex-col flex-1 min-h-[300px] shadow-sm">
                        <div className="p-3 border-b border-gray-200 dark:border-aqua-700/50 bg-gray-50 dark:bg-aqua-900/30">
                            <h3 className="text-xs font-bold text-gray-800 dark:text-white">Technician Roster</h3>
                        </div>
                        <div className="overflow-x-auto flex-1">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 dark:bg-aqua-800/40 text-gray-500 dark:text-gray-400 uppercase text-[9px]">
                                    <tr>
                                        <th className="px-3 py-2 font-semibold">Technician</th>
                                        <th className="px-3 py-2 font-semibold">Region</th>
                                        <th className="px-3 py-2 font-semibold text-center">Farmers</th>
                                        <th className="px-3 py-2 font-semibold">Status</th>
                                        <th className="px-3 py-2 font-semibold">Location</th>
                                        <th className="px-3 py-2 font-semibold text-right">View</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-aqua-800/30 text-gray-700 dark:text-gray-300">
                                    {technicians.map(tech => (
                                        <tr 
                                            key={tech.id} 
                                            onClick={() => setSelectedTechnicianId(tech.id)}
                                            className="hover:bg-gray-50 dark:hover:bg-aqua-800/30 transition-colors cursor-pointer group text-[10px]"
                                        >
                                            <td className="px-3 py-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-5 w-5 rounded bg-gray-200 dark:bg-aqua-800 flex items-center justify-center text-[9px] font-bold text-aqua-700 dark:text-aqua-400 group-hover:bg-aqua-500 group-hover:text-white dark:group-hover:text-aqua-950 transition-colors">
                                                        {tech.name.charAt(0)}
                                                    </div>
                                                    <span className="font-medium text-gray-900 dark:text-white">{tech.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-3 py-2">{tech.region}</td>
                                            <td className="px-3 py-2 text-center text-aqua-600 dark:text-aqua-400 font-bold">{tech.assignedFarmers}</td>
                                            <td className="px-3 py-2">
                                                <span className={`px-1.5 py-0.5 rounded text-[9px] font-medium ${
                                                    tech.status === 'On Field' ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400' : 
                                                    tech.status === 'Idle' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400' : 
                                                    'bg-gray-200 text-gray-600 dark:bg-gray-700/30 dark:text-gray-400'
                                                }`}>
                                                    {tech.status}
                                                </span>
                                            </td>
                                            <td className="px-3 py-2 text-gray-500 dark:text-gray-400">
                                                {tech.currentLocation}
                                                <span className="text-gray-400 dark:text-gray-600 ml-1">({tech.lastActive})</span>
                                            </td>
                                            <td className="px-3 py-2 text-right">
                                                <ChevronRight size={12} className="ml-auto text-gray-400 dark:text-gray-600 group-hover:text-aqua-500 dark:group-hover:text-white"/>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Column: Live Feed */}
                <div className="bg-white dark:bg-aqua-900/40 border border-gray-200 dark:border-aqua-700/50 rounded-lg p-3 flex flex-col h-full min-h-[400px] shadow-sm">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-xs font-bold text-gray-800 dark:text-white flex items-center gap-1.5">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            Live Field Feed
                        </h3>
                        <Clock size={12} className="text-gray-500"/>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                        {recentVisits.map(visit => (
                            <div key={visit.id} className="bg-gray-50 dark:bg-aqua-950/30 border border-gray-200 dark:border-aqua-800/50 p-2.5 rounded hover:border-aqua-500 dark:hover:border-aqua-700 transition-colors group shadow-sm">
                                <div className="flex justify-between items-center mb-1.5">
                                    <p className="text-[10px] font-bold text-aqua-600 dark:text-aqua-200">{visit.technician}</p>
                                    <span className="text-[9px] text-gray-500">{visit.time}</span>
                                </div>
                                
                                <div className="flex items-center gap-1 text-[9px] text-gray-500 dark:text-gray-400 mb-2">
                                    <MapPin size={10} className="shrink-0"/> 
                                    <span className="text-gray-700 dark:text-white">{visit.farmer}</span>
                                    <span>• {visit.location}</span>
                                </div>
                                
                                {/* Compact Data Chip */}
                                <div className={`grid grid-cols-3 gap-1 p-1.5 rounded bg-white dark:bg-aqua-900/50 border ${visit.data.alert ? 'border-red-200 dark:border-red-500/30' : 'border-gray-200 dark:border-aqua-800/50'}`}>
                                    <div className="text-center border-r border-gray-200 dark:border-aqua-800/50 last:border-0">
                                        <p className="text-[8px] text-gray-500">pH</p>
                                        <p className="text-[10px] text-gray-900 dark:text-white font-bold">{visit.data.ph}</p>
                                    </div>
                                    <div className="text-center border-r border-gray-200 dark:border-aqua-800/50 last:border-0">
                                        <p className="text-[8px] text-gray-500">DO</p>
                                        <p className={`text-[10px] font-bold ${visit.data.do < 4 ? 'text-red-500 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>{visit.data.do}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-[8px] text-gray-500">Feed</p>
                                        <p className="text-[10px] text-gray-900 dark:text-white">{visit.data.feed}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        
                        <div className="text-center pt-4 pb-2">
                            <p className="text-[9px] text-gray-500 animate-pulse">Syncing incoming data...</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- SLIDE-OVER: TECHNICIAN FIELD DATA --- */}
            <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${selectedTechnicianId ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                <div 
                    className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${selectedTechnicianId ? 'opacity-100' : 'opacity-0'}`} 
                    onClick={() => setSelectedTechnicianId(null)}
                />
                
                <div className={`absolute right-0 top-0 h-full w-full md:w-[550px] bg-white dark:bg-aqua-900 border-l border-gray-200 dark:border-aqua-700 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${selectedTechnicianId ? 'translate-x-0' : 'translate-x-full'}`}>
                    
                    {/* Slide-Over Header */}
                    <div className="p-4 border-b border-gray-200 dark:border-aqua-700 bg-gray-50 dark:bg-aqua-800 flex justify-between items-center shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded bg-white dark:bg-aqua-700 flex items-center justify-center font-bold text-aqua-600 dark:text-white border border-gray-200 dark:border-aqua-600 text-sm shadow-sm">
                                {selectedTechInfo?.name.charAt(0)}
                            </div>
                            <div>
                                <h2 className="text-base font-bold text-gray-900 dark:text-white leading-none">{selectedTechInfo?.name}</h2>
                                <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
                                    <MapPin size={10}/> {selectedTechInfo?.region} • {selectedTechInfo?.phone}
                                </p>
                            </div>
                        </div>
                        <button onClick={() => setSelectedTechnicianId(null)} className="p-1.5 hover:bg-gray-200 dark:hover:bg-aqua-700 rounded text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                            <X size={18} />
                        </button>
                    </div>

                    {/* Slide-Over Content */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-aqua-900/80">
                        {!selectedTechDetails ? (
                            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                                <Activity size={32} className="mb-3 opacity-30"/>
                                <p className="text-xs">No active field data available for this technician.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Assigned Farmers & Visits</h3>
                                    <span className="text-[10px] bg-white dark:bg-aqua-800 text-gray-600 dark:text-aqua-400 px-2 py-0.5 rounded border border-gray-200 dark:border-transparent">{selectedTechDetails.farmers.length} Farmers</span>
                                </div>
                                
                                {selectedTechDetails.farmers.map((farmer: any, idx: number) => (
                                    <div key={idx} className="bg-white dark:bg-aqua-950/40 border border-gray-200 dark:border-aqua-800 rounded-lg overflow-hidden shadow-sm">
                                        {/* Farmer Header */}
                                        <div className="p-3 bg-gray-100 dark:bg-aqua-900/60 flex justify-between items-center border-b border-gray-200 dark:border-aqua-800/50">
                                            <div>
                                                <h4 className="text-xs font-bold text-gray-900 dark:text-white">{farmer.name}</h4>
                                                <p className="text-[9px] text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-0.5">
                                                    <MapPin size={8}/> {farmer.location} • {farmer.totalPonds} Ponds
                                                </p>
                                            </div>
                                            <span className={`px-1.5 py-0.5 text-[9px] font-bold rounded border ${farmer.visitStatus === 'Visited Today' ? 'bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-500/20' : 'bg-gray-200 dark:bg-gray-700/30 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-700'}`}>
                                                {farmer.visitStatus}
                                            </span>
                                        </div>

                                        {/* Ponds Grid */}
                                        <div className="p-3 grid grid-cols-1 gap-3">
                                            {farmer.ponds.map((pond: any, pIdx: number) => (
                                                <div key={pIdx} className="bg-gray-50 dark:bg-aqua-900/30 border border-gray-200 dark:border-aqua-800/50 rounded p-2.5">
                                                    <div className="flex justify-between items-center mb-2 pb-1.5 border-b border-gray-200 dark:border-aqua-800/30">
                                                        <h5 className="text-[10px] font-bold text-aqua-700 dark:text-aqua-100 flex items-center gap-1.5">
                                                            <span className="w-1.5 h-1.5 bg-aqua-500 rounded-full"></span> {pond.name}
                                                        </h5>
                                                        <span className="text-[9px] text-gray-500">{pond.area}</span>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-2">
                                                        {/* Left: Metrics */}
                                                        <div className="space-y-1.5">
                                                            <div className="grid grid-cols-2 gap-1 text-[9px]">
                                                                <div className="bg-white dark:bg-aqua-950/80 p-1 rounded border border-gray-200 dark:border-aqua-800/30">
                                                                    <span className="text-gray-500 block flex items-center gap-1 text-[8px]"><Droplets size={8}/> pH</span>
                                                                    <span className="text-gray-900 dark:text-white font-bold">{pond.water.ph}</span>
                                                                </div>
                                                                <div className="bg-white dark:bg-aqua-950/80 p-1 rounded border border-gray-200 dark:border-aqua-800/30">
                                                                    <span className="text-gray-500 block flex items-center gap-1 text-[8px]"><Thermometer size={8}/> DO</span>
                                                                    <span className="text-gray-900 dark:text-white font-bold">{pond.water.do}</span>
                                                                </div>
                                                            </div>
                                                            <div className="bg-white dark:bg-aqua-950/80 p-1.5 rounded border border-gray-200 dark:border-aqua-800/30">
                                                                <p className="text-[8px] text-gray-500 mb-0.5 flex items-center gap-1"><Fish size={8}/> Bio</p>
                                                                <div className="flex justify-between text-[9px]">
                                                                    <span className="text-gray-400">Size: <b className="text-gray-800 dark:text-white">{pond.shrimpSize}</b></span>
                                                                </div>
                                                            </div>
                                                            <div className="bg-white dark:bg-aqua-950/80 p-1.5 rounded border border-gray-200 dark:border-aqua-800/30">
                                                                <p className="text-[8px] text-gray-500 mb-0.5 flex items-center gap-1"><Utensils size={8}/> Feed</p>
                                                                <div className="flex justify-between text-[9px]">
                                                                    <span className="text-gray-400">FCR: <b className="text-aqua-600 dark:text-aqua-400">{pond.feed.fcr}</b></span>
                                                                    <span className="text-gray-400">Tray: <b className={pond.feed.checkTray === 'Clean' ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}>{pond.feed.checkTray}</b></span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Right: Check Tray Photo */}
                                                        <div className="flex flex-col">
                                                            <p className="text-[8px] text-gray-500 mb-1 flex items-center gap-1"><Camera size={8}/> Tray Photo</p>
                                                            {pond.photo ? (
                                                                <div className="flex-1 rounded bg-black border border-gray-200 dark:border-aqua-800/50 relative overflow-hidden group cursor-pointer min-h-[80px]">
                                                                    <img src={pond.photo} alt="Tray" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors">
                                                                        <Search size={14} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div className="flex-1 rounded bg-gray-100 dark:bg-aqua-900/20 border border-gray-200 dark:border-aqua-800/50 border-dashed flex items-center justify-center text-gray-400 dark:text-gray-600 text-[9px] min-h-[80px]">
                                                                    No Photo
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            {farmer.ponds.length === 0 && (
                                                <p className="text-[10px] text-gray-500 italic text-center py-2">Data pending upload.</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TechnicianDashboard;
