
import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Filter, CheckCircle, XCircle, User, ArrowLeft, Droplets, LandPlot, Search, MoreVertical, Tractor, Sprout, Thermometer, Activity, Scale, Pill, Waves, Fish } from 'lucide-react';
import { Farmer, Pond } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface Farmer360Props {
    initialView?: 'list' | 'approvals';
}

const mockPonds: Pond[] = [
    {
        id: 'P-001', name: 'Pond A-1', status: 'Active', size: 1.5,
        water: { ph: 7.8, do: 5.2, salinity: 15, temp: 28.5, ammonia: 0.01, turbidity: 35, lastUpdated: '20 mins ago' },
        stocking: { date: '2023-09-01', quantity: 250000, species: 'L. Vannamei', density: 166, survivalRateEst: 88, currentABW: 18.5, doc: 55 },
        feed: { dailyIntake: 320, feedType: 'Grower 2mm', fcr: 1.2, lastFed: '08:00 AM', history: [{day: 'Mon', amount: 300}, {day: 'Tue', amount: 310}, {day: 'Wed', amount: 305}, {day: 'Thu', amount: 320}, {day: 'Fri', amount: 315}] },
        health: [{ date: '2023-10-20', type: 'Probiotic', name: 'GutWell Pro', quantity: '2kg', reason: 'Routine gut health' }]
    },
    {
        id: 'P-002', name: 'Pond A-2', status: 'Active', size: 1.2,
        water: { ph: 8.1, do: 4.1, salinity: 14, temp: 29.0, ammonia: 0.05, turbidity: 40, lastUpdated: '15 mins ago' },
        stocking: { date: '2023-09-15', quantity: 200000, species: 'L. Vannamei', density: 160, survivalRateEst: 92, currentABW: 12.0, doc: 40 },
        feed: { dailyIntake: 180, feedType: 'Starter 1.5mm', fcr: 1.1, lastFed: '08:30 AM', history: [{day: 'Mon', amount: 170}, {day: 'Tue', amount: 175}, {day: 'Wed', amount: 180}, {day: 'Thu', amount: 180}, {day: 'Fri', amount: 185}] },
        health: []
    },
    {
        id: 'P-003', name: 'Pond B-1', status: 'Preparation', size: 1.0,
        water: { ph: 7.5, do: 6.0, salinity: 10, temp: 27.0, ammonia: 0, turbidity: 10, lastUpdated: '1 hour ago' },
        stocking: { date: '', quantity: 0, species: '', density: 0, survivalRateEst: 0, currentABW: 0, doc: 0 },
        feed: { dailyIntake: 0, feedType: 'N/A', fcr: 0, lastFed: 'N/A', history: [] },
        health: [{ date: '2023-10-24', type: 'Minerals', name: 'Lime', quantity: '50kg', reason: 'pH Balancing' }]
    }
];

const initialFarmers: Farmer[] = [
    {
        id: 'F001', name: 'Kamehameha Farms', location: 'North Shore, Oahu', region: 'Oahu',
        acres: 45, ponds: 12, technicianName: 'Mike Thompson', technicianPhone: '(808) 555-0199',
        status: 'Active', clv: '$125,840', cac: '$2,300', retention: '98%', avatar: 'https://picsum.photos/id/433/200', since: '5 Years', email: 'contact@kamehameha.com',
        pondsList: mockPonds
    },
    {
        id: 'F002', name: 'Big Island Aqua', location: 'Hilo, Hawaii', region: 'Hawaii',
        acres: 120, ponds: 28, technicianName: 'Sarah Lee', technicianPhone: '(808) 555-0244',
        status: 'Active', clv: '$210,500', cac: '$1,800', retention: '95%', avatar: 'https://picsum.photos/id/54/200', since: '3 Years', email: 'info@bigisland.com'
    },
    {
        id: 'F003', name: 'Maui Prawns Co.', location: 'Kahului, Maui', region: 'Maui',
        acres: 30, ponds: 8, technicianName: 'David Akana', technicianPhone: '(808) 555-0388',
        status: 'Inactive', clv: '$88,200', cac: '$1,500', retention: '92%', avatar: 'https://picsum.photos/id/64/200', since: '2 Years', email: 'sales@mauiprawns.com'
    },
    {
        id: 'F004', name: 'Kauai Shrimp', location: 'Lihue, Kauai', region: 'Kauai',
        acres: 65, ponds: 15, technicianName: 'Mike Thompson', technicianPhone: '(808) 555-0199',
        status: 'Pending', clv: '$0', cac: '$0', retention: 'N/A', avatar: 'https://picsum.photos/id/91/200', since: 'New', email: 'admin@kauaishrimp.com'
    },
];

const Farmer360: React.FC<Farmer360Props> = ({ initialView = 'list' }) => {
    const [view, setView] = useState<'list' | 'details' | 'approvals'>(initialView);
    const [farmers, setFarmers] = useState<Farmer[]>(initialFarmers);
    const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null);
    const [filterRegion, setFilterRegion] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState<string>('');
    
    // New State for Pond Selection in Details View
    const [activePondId, setActivePondId] = useState<string | null>(null);

    useEffect(() => {
        setView(initialView);
    }, [initialView]);

    const regions = ['All', ...Array.from(new Set(farmers.map(f => f.region)))];

    const filteredFarmers = farmers.filter(f => {
        const regionMatch = filterRegion === 'All' || f.region === filterRegion;
        const statusMatch = view === 'approvals' ? f.status === 'Pending' : f.status !== 'Pending';
        const searchMatch = f.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            f.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            f.location.toLowerCase().includes(searchQuery.toLowerCase());
        return regionMatch && statusMatch && searchMatch;
    });

    // Summary Stats
    const totalFarmersCount = filteredFarmers.length;
    const totalAcres = filteredFarmers.reduce((acc, curr) => acc + curr.acres, 0);
    const activeCount = filteredFarmers.filter(f => f.status === 'Active').length;

    const handleApprove = (id: string) => {
        setFarmers(prev => prev.map(f => f.id === id ? { ...f, status: 'Active' } : f));
        alert(`Farmer ${id} approved successfully!`);
    };

    const handleViewDetails = (farmer: Farmer) => {
        setSelectedFarmer(farmer);
        // Default to first pond if available
        if (farmer.pondsList && farmer.pondsList.length > 0) {
            setActivePondId(farmer.pondsList[0].id);
        }
        setView('details');
    };

    // Helper to get active pond object
    const getActivePond = () => {
        return selectedFarmer?.pondsList?.find(p => p.id === activePondId);
    }

    return (
        <div className="space-y-4 max-w-[1920px] mx-auto pb-6">
            {/* Header & Breadcrumbs */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-aqua-400 font-medium">
                    <span className="cursor-pointer hover:text-gray-900 dark:hover:text-white" onClick={() => setView('list')}>Farmers</span> 
                    <span className="text-gray-400 dark:text-gray-600">/</span>
                    {view === 'details' && <span className="cursor-pointer hover:text-gray-900 dark:hover:text-white" onClick={() => setView('list')}>List</span>}
                    {view === 'details' && <span className="text-gray-400 dark:text-gray-600">/</span>}
                    <span className="text-gray-900 dark:text-white font-semibold">
                        {view === 'list' ? 'Directory' : view === 'approvals' ? 'Approvals' : selectedFarmer?.name}
                    </span>
                </div>

                {/* Page Title Block */}
                <div className="flex flex-wrap justify-between items-end gap-4">
                    <div>
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                            {view === 'approvals' ? 'Pending Registrations' : 'Farmer Directory'}
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">
                            {view === 'approvals' 
                                ? 'Review and approve new mobile app registrations.' 
                                : 'Manage farmer profiles, view land details, and monitor technician assignments.'}
                        </p>
                    </div>
                    
                    {view === 'list' && (
                        <div className="flex gap-3">
                            <div className="bg-white dark:bg-aqua-900/50 border border-gray-200 dark:border-aqua-700/50 rounded-lg px-3 py-1.5 shadow-sm">
                                <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-semibold">Total Farmers</p>
                                <p className="text-lg font-bold text-gray-900 dark:text-white">{totalFarmersCount}</p>
                            </div>
                            <div className="bg-white dark:bg-aqua-900/50 border border-gray-200 dark:border-aqua-700/50 rounded-lg px-3 py-1.5 shadow-sm">
                                <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-semibold">Total Acres</p>
                                <p className="text-lg font-bold text-aqua-600 dark:text-aqua-400">{totalAcres}</p>
                            </div>
                             <div className="bg-white dark:bg-aqua-900/50 border border-gray-200 dark:border-aqua-700/50 rounded-lg px-3 py-1.5 hidden sm:block shadow-sm">
                                <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-semibold">Active</p>
                                <p className="text-lg font-bold text-green-600 dark:text-green-500">{activeCount}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* LIST VIEW or APPROVAL VIEW */}
            {(view === 'list' || view === 'approvals') && (
                <div className="space-y-4">
                    {/* Control Bar */}
                    <div className="flex flex-col md:flex-row gap-3 justify-between items-center bg-white dark:bg-aqua-800/30 p-2 rounded-xl border border-gray-200 dark:border-aqua-800 backdrop-blur-sm shadow-sm">
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-aqua-400" size={14} />
                            <input 
                                type="text" 
                                placeholder="Search by Name, ID, or Location..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-gray-50 dark:bg-aqua-900 border border-gray-200 dark:border-aqua-700 rounded-lg pl-9 pr-4 py-2 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-aqua-500 focus:ring-1 focus:ring-aqua-500 placeholder:text-gray-400 transition-all"
                            />
                        </div>
                        
                        <div className="flex items-center gap-2 w-full md:w-auto">
                             <span className="text-xs text-gray-500 dark:text-gray-400 hidden md:inline">Filter by Location:</span>
                             <div className="relative flex-1 md:w-40">
                                <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-aqua-400" />
                                <select 
                                    value={filterRegion} 
                                    onChange={(e) => setFilterRegion(e.target.value)}
                                    className="w-full appearance-none bg-gray-50 dark:bg-aqua-900 border border-gray-200 dark:border-aqua-700 rounded-lg pl-9 pr-8 py-2 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-aqua-500 cursor-pointer"
                                >
                                    {regions.map(r => <option key={r} value={r}>{r}</option>)}
                                </select>
                             </div>
                        </div>
                    </div>

                    {/* Farmers Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                        {filteredFarmers.length === 0 ? (
                            <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-500 border-2 border-dashed border-gray-200 dark:border-aqua-800 rounded-xl">
                                <User size={32} className="mb-3 opacity-50" />
                                <p className="text-base font-medium">No farmers found</p>
                                <p className="text-xs">Try adjusting your search or filter criteria.</p>
                            </div>
                        ) : filteredFarmers.map(farmer => (
                            <div key={farmer.id} className="group relative bg-white dark:bg-aqua-800/40 border border-gray-200 dark:border-aqua-700/60 p-4 rounded-xl hover:border-aqua-500 dark:hover:border-aqua-500/50 hover:shadow-lg dark:hover:shadow-aqua-500/10 transition-all duration-300 flex flex-col shadow-sm">
                                {/* Card Header */}
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <div className="h-12 w-12 rounded-full bg-cover bg-center border-2 border-gray-100 dark:border-aqua-700 group-hover:border-aqua-500 transition-colors" style={{ backgroundImage: `url(${farmer.avatar})` }}></div>
                                            <span className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white dark:border-aqua-900 ${farmer.status === 'Active' ? 'bg-green-500' : farmer.status === 'Inactive' ? 'bg-gray-500' : 'bg-yellow-500'}`}></span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 dark:text-white text-base leading-tight group-hover:text-aqua-600 dark:group-hover:text-aqua-400 transition-colors">{farmer.name}</h3>
                                            <p className="text-[10px] text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1"><MapPin size={10} className="text-aqua-500"/> {farmer.location}</p>
                                        </div>
                                    </div>
                                    <button className="text-gray-400 hover:text-gray-900 dark:hover:text-white p-1"><MoreVertical size={16}/></button>
                                </div>

                                {/* Metrics */}
                                <div className="grid grid-cols-2 gap-2 mb-3">
                                    <div className="bg-gray-50 dark:bg-aqua-900/60 p-2 rounded-lg border border-gray-100 dark:border-aqua-800">
                                        <div className="flex items-center gap-1.5 mb-1 text-gray-500 dark:text-gray-400 text-[10px] uppercase font-bold tracking-wider">
                                            <LandPlot size={10} /> Acres
                                        </div>
                                        <p className="text-gray-900 dark:text-white font-bold text-sm">{farmer.acres}</p>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-aqua-900/60 p-2 rounded-lg border border-gray-100 dark:border-aqua-800">
                                        <div className="flex items-center gap-1.5 mb-1 text-gray-500 dark:text-gray-400 text-[10px] uppercase font-bold tracking-wider">
                                            <Droplets size={10} /> Ponds
                                        </div>
                                        <p className="text-gray-900 dark:text-white font-bold text-sm">{farmer.ponds}</p>
                                    </div>
                                </div>

                                {/* Technician Info */}
                                <div className="bg-gray-50 dark:bg-aqua-900/30 rounded-lg p-2 mb-3 flex items-center gap-2 border border-gray-100 dark:border-aqua-800/50">
                                     <div className="bg-white dark:bg-aqua-800 p-1.5 rounded-full border border-gray-200 dark:border-aqua-700">
                                        <User size={12} className="text-aqua-600 dark:text-aqua-400" />
                                     </div>
                                     <div className="overflow-hidden">
                                        <p className="text-[10px] text-gray-500 uppercase font-semibold">Assigned Technician</p>
                                        <p className="text-xs text-gray-800 dark:text-gray-200 truncate">{farmer.technicianName}</p>
                                     </div>
                                </div>

                                {/* Actions */}
                                <div className="mt-auto pt-3 border-t border-gray-100 dark:border-aqua-800/50 flex gap-2">
                                    {view === 'list' ? (
                                        <button 
                                            onClick={() => handleViewDetails(farmer)}
                                            className="w-full py-2 bg-aqua-500 hover:bg-aqua-400 text-white dark:text-aqua-950 font-bold rounded-lg transition-all shadow-lg shadow-aqua-500/10 text-xs"
                                        >
                                            View Profile
                                        </button>
                                    ) : (
                                        <>
                                            <button 
                                                onClick={() => handleApprove(farmer.id)}
                                                className="flex-1 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors text-xs font-bold flex items-center justify-center gap-1 shadow-lg shadow-green-500/20"
                                            >
                                                <CheckCircle size={14} /> Approve
                                            </button>
                                            <button className="flex-1 py-2 bg-red-50 dark:bg-red-900/50 hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-lg transition-colors text-xs font-bold flex items-center justify-center gap-1">
                                                <XCircle size={14} /> Reject
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* DETAILS VIEW */}
            {view === 'details' && selectedFarmer && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <button onClick={() => setView('list')} className="group flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-aqua-600 dark:hover:text-aqua-400 transition-colors mb-2">
                        <div className="p-1 bg-white dark:bg-aqua-900 rounded-full group-hover:bg-gray-100 dark:group-hover:bg-aqua-800 shadow-sm"><ArrowLeft size={14} /></div>
                        <span className="text-xs font-medium">Back to Directory</span>
                    </button>

                    {/* Large Profile Header */}
                    <div className="relative overflow-hidden bg-white dark:bg-gradient-to-br dark:from-aqua-800 dark:to-aqua-900 border border-gray-200 dark:border-aqua-700 rounded-2xl p-5 shadow-lg dark:shadow-2xl">
                        <div className="relative z-10 flex flex-col md:flex-row gap-6 items-center md:items-start">
                            <div className="h-32 w-32 rounded-full bg-cover bg-center ring-4 ring-gray-100 dark:ring-aqua-900/50 shadow-xl" style={{ backgroundImage: `url(${selectedFarmer.avatar})` }}></div>
                            
                            <div className="flex-1 text-center md:text-left space-y-1.5">
                                <div className="flex flex-col md:flex-row items-center gap-3">
                                    <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">{selectedFarmer.name}</h2>
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${selectedFarmer.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-500 dark:text-green-950' : 'bg-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-200'}`}>
                                        {selectedFarmer.status}
                                    </span>
                                </div>
                                <p className="text-gray-600 dark:text-aqua-200 text-sm font-medium flex items-center justify-center md:justify-start gap-1">
                                    <MapPin size={14} /> {selectedFarmer.location}
                                </p>
                                <div className="flex flex-wrap gap-2 mt-2 justify-center md:justify-start">
                                    <span className="flex items-center gap-1.5 text-xs text-gray-700 dark:text-white bg-gray-100 dark:bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm font-medium">
                                        <LandPlot size={12} className="text-aqua-600 dark:text-aqua-300"/> {selectedFarmer.acres} Acres
                                    </span>
                                    <span className="flex items-center gap-1.5 text-xs text-gray-700 dark:text-white bg-gray-100 dark:bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm font-medium">
                                        <Droplets size={12} className="text-aqua-600 dark:text-aqua-300"/> {selectedFarmer.ponds} Ponds
                                    </span>
                                </div>
                            </div>

                             <div className="bg-gray-50 dark:bg-black/30 p-4 rounded-xl border border-gray-200 dark:border-white/10 backdrop-blur-sm w-full md:w-auto min-w-[240px]">
                                <h4 className="text-[10px] font-bold text-gray-500 dark:text-aqua-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <User size={12}/> Assigned Technician
                                </h4>
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-white font-bold text-xs">MT</div>
                                    <div>
                                        <p className="text-gray-900 dark:text-white font-bold text-sm">{selectedFarmer.technicianName}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-300">{selectedFarmer.technicianPhone}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                     {/* --- NEW POND INTELLIGENCE SECTION --- */}
                     <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2"><Waves size={20} className="text-aqua-600 dark:text-aqua-400"/> Pond Intelligence</h3>
                            <button className="text-xs text-aqua-600 dark:text-aqua-400 hover:underline">View All Ponds</button>
                        </div>

                        {/* Pond Selection Tabs */}
                        <div className="flex gap-3 overflow-x-auto pb-2">
                            {selectedFarmer.pondsList ? selectedFarmer.pondsList.map((pond) => (
                                <button
                                    key={pond.id}
                                    onClick={() => setActivePondId(pond.id)}
                                    className={`flex-shrink-0 px-3 py-2.5 rounded-xl border transition-all ${
                                        activePondId === pond.id 
                                        ? 'bg-white dark:bg-aqua-500 text-aqua-700 dark:text-aqua-950 border-aqua-500 font-bold shadow-md ring-1 ring-aqua-500 dark:ring-0' 
                                        : 'bg-gray-50 dark:bg-aqua-800/50 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-aqua-700 hover:bg-white dark:hover:bg-aqua-800 hover:text-gray-800 dark:hover:text-white'
                                    }`}
                                >
                                    <div className="flex items-center gap-2 text-sm">
                                        <span>{pond.name}</span>
                                        <span className={`w-1.5 h-1.5 rounded-full ${pond.status === 'Active' ? 'bg-green-600' : 'bg-yellow-600'}`}></span>
                                    </div>
                                    <div className="text-[10px] mt-0.5 opacity-75 font-normal">{pond.status} • {pond.size} Ha</div>
                                </button>
                            )) : (
                                <div className="text-gray-500 italic p-4 text-sm">No detailed pond data available.</div>
                            )}
                        </div>

                        {/* Selected Pond Dashboard */}
                        {getActivePond() && (
                            <div className="bg-white dark:bg-aqua-900/40 border border-gray-200 dark:border-aqua-700 rounded-2xl p-5 md:p-6 animate-in fade-in zoom-in-95 duration-300 shadow-sm">
                                
                                {/* 1. Stocking & Growth Header */}
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                                    <div className="col-span-2 flex flex-col justify-between">
                                        <div>
                                            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-0.5">{getActivePond()?.name} Overview</h4>
                                            <p className="text-gray-500 dark:text-aqua-400 text-xs mb-4">Species: {getActivePond()?.stocking.species}</p>
                                        </div>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                             <div className="bg-gray-50 dark:bg-aqua-900/80 p-3 rounded-xl border border-gray-200 dark:border-aqua-800">
                                                <p className="text-[10px] text-gray-500 uppercase font-bold">DOC</p>
                                                <p className="text-xl font-bold text-gray-900 dark:text-white">{getActivePond()?.stocking.doc} <span className="text-[10px] font-normal text-gray-400">days</span></p>
                                            </div>
                                            <div className="bg-gray-50 dark:bg-aqua-900/80 p-3 rounded-xl border border-gray-200 dark:border-aqua-800">
                                                <p className="text-[10px] text-gray-500 uppercase font-bold">Stocking</p>
                                                <p className="text-xl font-bold text-gray-900 dark:text-white">{(getActivePond()?.stocking.quantity || 0) / 1000}k</p>
                                                <p className="text-[10px] text-gray-500 dark:text-gray-400">{getActivePond()?.stocking.date}</p>
                                            </div>
                                            <div className="bg-gray-50 dark:bg-aqua-900/80 p-3 rounded-xl border border-gray-200 dark:border-aqua-800">
                                                <p className="text-[10px] text-gray-500 uppercase font-bold">ABW</p>
                                                <p className="text-xl font-bold text-gray-900 dark:text-white">{getActivePond()?.stocking.currentABW} <span className="text-[10px] font-normal text-gray-400">g</span></p>
                                            </div>
                                             <div className="bg-gray-50 dark:bg-aqua-900/80 p-3 rounded-xl border border-gray-200 dark:border-aqua-800">
                                                <p className="text-[10px] text-gray-500 uppercase font-bold">Survival</p>
                                                <p className="text-xl font-bold text-green-600 dark:text-green-400">{getActivePond()?.stocking.survivalRateEst}%</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Feed Chart Mini */}
                                    <div className="bg-gray-50 dark:bg-aqua-900/60 rounded-xl p-3 border border-gray-200 dark:border-aqua-800">
                                        <div className="flex justify-between items-center mb-2">
                                            <h5 className="text-xs font-bold text-gray-700 dark:text-gray-300">Feeding (Last 5 Days)</h5>
                                            <span className="text-[10px] bg-aqua-100 text-aqua-700 dark:bg-aqua-500/20 dark:text-aqua-400 px-1.5 py-0.5 rounded">FCR: {getActivePond()?.feed.fcr}</span>
                                        </div>
                                        <div className="h-28">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <AreaChart data={getActivePond()?.feed.history}>
                                                    <defs>
                                                        <linearGradient id="colorFeed" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="5%" stopColor="#13c8ec" stopOpacity={0.3}/>
                                                            <stop offset="95%" stopColor="#13c8ec" stopOpacity={0}/>
                                                        </linearGradient>
                                                    </defs>
                                                    <Tooltip contentStyle={{ backgroundColor: '#152a2e', borderColor: '#234248', fontSize: '10px' }} />
                                                    <Area type="monotone" dataKey="amount" stroke="#13c8ec" fillOpacity={1} fill="url(#colorFeed)" />
                                                </AreaChart>
                                            </ResponsiveContainer>
                                        </div>
                                        <div className="flex justify-between text-[10px] text-gray-500 dark:text-gray-400 mt-2 border-t border-gray-200 dark:border-aqua-800 pt-1">
                                            <span>Today's Intake: <strong className="text-gray-900 dark:text-white">{getActivePond()?.feed.dailyIntake} kg</strong></span>
                                            <span>Type: {getActivePond()?.feed.feedType}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* 2. Water Quality Grid */}
                                <h5 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-3 flex items-center gap-2"><Activity size={14}/> Water Parameters</h5>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
                                    <div className="bg-gray-50 dark:bg-aqua-900 p-3 rounded-xl border border-gray-200 dark:border-aqua-800 text-center">
                                        <p className="text-[10px] text-gray-500 mb-1">pH Level</p>
                                        <p className="text-lg font-bold text-gray-900 dark:text-white">{getActivePond()?.water.ph}</p>
                                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 mt-0.5"></span>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-aqua-900 p-3 rounded-xl border border-gray-200 dark:border-aqua-800 text-center">
                                        <p className="text-[10px] text-gray-500 mb-1">Dissolved O2</p>
                                        <p className={`text-lg font-bold ${(getActivePond()?.water.do || 0) < 5 ? 'text-red-500 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>{getActivePond()?.water.do} <span className="text-[10px]">mg/L</span></p>
                                        <span className={`inline-block w-1.5 h-1.5 rounded-full ${(getActivePond()?.water.do || 0) < 5 ? 'bg-red-500' : 'bg-green-500'} mt-0.5`}></span>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-aqua-900 p-3 rounded-xl border border-gray-200 dark:border-aqua-800 text-center">
                                        <p className="text-[10px] text-gray-500 mb-1">Temperature</p>
                                        <p className="text-lg font-bold text-gray-900 dark:text-white">{getActivePond()?.water.temp}°C</p>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-aqua-900 p-3 rounded-xl border border-gray-200 dark:border-aqua-800 text-center">
                                        <p className="text-[10px] text-gray-500 mb-1">Salinity</p>
                                        <p className="text-lg font-bold text-gray-900 dark:text-white">{getActivePond()?.water.salinity} <span className="text-[10px]">ppt</span></p>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-aqua-900 p-3 rounded-xl border border-gray-200 dark:border-aqua-800 text-center">
                                        <p className="text-[10px] text-gray-500 mb-1">Ammonia</p>
                                        <p className="text-lg font-bold text-gray-900 dark:text-white">{getActivePond()?.water.ammonia}</p>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-aqua-900 p-3 rounded-xl border border-gray-200 dark:border-aqua-800 text-center">
                                        <p className="text-[10px] text-gray-500 mb-1">Turbidity</p>
                                        <p className="text-lg font-bold text-gray-900 dark:text-white">{getActivePond()?.water.turbidity} <span className="text-[10px]">NTU</span></p>
                                    </div>
                                </div>

                                {/* 3. Medicine & Health Log */}
                                <div className="bg-gray-50 dark:bg-aqua-800/30 rounded-xl p-3 border border-gray-200 dark:border-aqua-800">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Pill size={14} className="text-aqua-600 dark:text-aqua-400"/>
                                        <h5 className="text-xs font-bold text-gray-900 dark:text-white">Recent Health & Medicine Log</h5>
                                    </div>
                                    {getActivePond()?.health && getActivePond()!.health.length > 0 ? (
                                        <div className="flex flex-col gap-2">
                                            {getActivePond()?.health.map((log, idx) => (
                                                <div key={idx} className="flex justify-between items-center bg-white dark:bg-aqua-900/50 p-2 rounded-lg text-xs border border-gray-100 dark:border-transparent">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[10px] text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-aqua-800 px-1.5 py-0.5 rounded">{log.date}</span>
                                                        <span className="font-medium text-gray-900 dark:text-white">{log.name} ({log.quantity})</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[10px] text-gray-500 dark:text-gray-400">{log.reason}</span>
                                                        <span className="text-[10px] bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 px-1.5 py-0.5 rounded-full">{log.type}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-xs text-gray-500 italic">No recent medicine applications.</p>
                                    )}
                                </div>
                            </div>
                        )}
                     </div>
                     {/* --- END POND INTELLIGENCE --- */}

                    {/* Farm Map Section (Moved below detailed stats) */}
                    <div className="bg-white dark:bg-aqua-800/40 border border-gray-200 dark:border-aqua-700 p-4 rounded-xl shadow-sm">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Geospatial Farm View</h3>
                        </div>
                        <div className="relative w-full h-[400px] bg-gray-100 dark:bg-aqua-900 rounded-lg overflow-hidden border border-gray-200 dark:border-aqua-700 shadow-inner group">
                             {/* Placeholder Map Image */}
                            <img 
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHYkC51guqB3IqcwTExu6eSnqHapGHvb5bVoOCcgXCx1rsMIFfIHZ9mFoP5oKohceJ8_L465Fq8N1-0N_fpIYMSS7aFEfU0-u0qmOrvsuRS-s0SLheT8dsfZn4qIuWAG0OwpO3JLPRFaIsb3CYYVPzM-hSeO1BHgjsO6Qp79665KG66nZ0vWkJc7triZxG1C0VhERCWfkaFunLmnYokBnaQE8ZjOJCy5awGCxxMRAJUL-1UlBBt57wNZ2Hk8XHpIiq-cMwkJjt-GJt" 
                                className="w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-opacity duration-700 grayscale dark:grayscale-0"
                                alt="Farm Satellite Map"
                            />
                            
                            {/* Interactive SVG Overlay for Fields */}
                            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 500" preserveAspectRatio="none">
                                {/* Field 1: Large Active Pond */}
                                <path d="M 100 150 L 300 120 L 320 280 L 120 300 Z" 
                                    fill="rgba(34, 197, 94, 0.2)" 
                                    stroke="#22c55e" 
                                    strokeWidth="2" 
                                    className="cursor-pointer hover:fill-green-500/40 transition-all duration-300"
                                    onClick={() => setActivePondId('P-001')}
                                />
                                <g transform="translate(210, 210)">
                                    <circle r="3" fill="#22c55e" stroke="white" strokeWidth="1.5" />
                                    <rect x="-25" y="-20" width="50" height="16" rx="3" fill="rgba(0,0,0,0.7)" />
                                    <text x="0" y="-9" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">Pond A-1</text>
                                </g>

                                {/* Field 2: Active Pond */}
                                <path d="M 330 120 L 500 120 L 480 220 L 340 220 Z" 
                                    fill="rgba(34, 197, 94, 0.2)" 
                                    stroke="#22c55e" 
                                    strokeWidth="2" 
                                    className="cursor-pointer hover:fill-green-500/40 transition-all duration-300"
                                    onClick={() => setActivePondId('P-002')}
                                />
                                <g transform="translate(410, 170)">
                                    <circle r="3" fill="#22c55e" stroke="white" strokeWidth="1.5" />
                                    <rect x="-25" y="-20" width="50" height="16" rx="3" fill="rgba(0,0,0,0.7)" />
                                    <text x="0" y="-9" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">Pond A-2</text>
                                </g>

                                {/* Field 3: Maintenance Pond */}
                                <path d="M 340 240 L 480 240 L 500 350 L 320 330 Z" 
                                    fill="rgba(234, 179, 8, 0.2)" 
                                    stroke="#eab308" 
                                    strokeWidth="2" 
                                    strokeDasharray="5,5"
                                    className="cursor-pointer hover:fill-yellow-500/40 transition-all duration-300"
                                    onClick={() => setActivePondId('P-003')}
                                />
                                <g transform="translate(410, 295)">
                                    <circle r="3" fill="#eab308" stroke="white" strokeWidth="1.5" />
                                    <rect x="-30" y="-20" width="60" height="16" rx="3" fill="rgba(0,0,0,0.7)" />
                                    <text x="0" y="-9" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">Maint. B-1</text>
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Farmer360;
