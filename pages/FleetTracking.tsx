
import React, { useState } from 'react';
import { 
    Truck, 
    MapPin, 
    Navigation, 
    Clock, 
    Fuel, 
    Thermometer, 
    AlertTriangle, 
    Phone, 
    User, 
    Package, 
    MoreVertical, 
    Battery, 
    Gauge,
    Search,
    Filter,
    Wrench,
    X
} from 'lucide-react';

// --- MOCK DATA ---
const vehicles = [
    {
        id: 'V-102',
        plate: 'AP 39 CX 9921',
        type: 'Refrigerated Truck',
        status: 'Moving',
        driver: 'Ramesh Kumar',
        phone: '+91 98765 43210',
        location: 'Bhimavaram Hwy, Km 45',
        coordinates: { top: '40%', left: '30%' }, // Simulating map position
        destination: 'Nellore Hub',
        eta: '2h 15m',
        speed: 65, // km/h
        fuel: 72, // %
        temp: 18.5, // Celsius (Ideal for Feed)
        cargo: [
            { id: 'ORD-8821', item: 'Grower Feed 2mm', qty: '200 Bags' },
            { id: 'ORD-8825', item: 'Probiotics', qty: '50 Boxes' }
        ],
        lastUpdate: 'Just now'
    },
    {
        id: 'V-105',
        plate: 'AP 37 TB 1102',
        type: 'Tanker (Seed)',
        status: 'Stopped',
        driver: 'S. Rao',
        phone: '+91 98765 11223',
        location: 'Kakinada Port - Loading',
        coordinates: { top: '25%', left: '60%' },
        destination: 'Coastal Farms',
        eta: '4h 30m',
        speed: 0,
        fuel: 45,
        temp: 24.0, // Water Temp
        oxygen: 95, // Oxygen level %
        cargo: [
            { id: 'ORD-8824', item: 'Vannamei Seed PL15', qty: '2 Million' }
        ],
        lastUpdate: '5 mins ago'
    },
    {
        id: 'V-201',
        plate: 'TS 09 UA 5541',
        type: 'Light Van',
        status: 'Idle',
        driver: 'Pending Assignment',
        phone: 'N/A',
        location: 'Vijayawada Warehouse',
        coordinates: { top: '65%', left: '45%' },
        destination: 'N/A',
        eta: 'N/A',
        speed: 0,
        fuel: 90,
        temp: 28.0,
        cargo: [],
        lastUpdate: '1 hour ago'
    },
    {
        id: 'V-108',
        plate: 'AP 16 JK 8833',
        type: 'Refrigerated Truck',
        status: 'Alert',
        driver: 'M. Ali',
        phone: '+91 99887 77665',
        location: 'Guntur Checkpost',
        coordinates: { top: '55%', left: '20%' },
        destination: 'Ongole Depot',
        eta: 'Delayed',
        speed: 0,
        fuel: 15, // Low Fuel Alert
        temp: 20.0,
        cargo: [
            { id: 'ORD-8812', item: 'Starter Feed', qty: '100 Bags' }
        ],
        lastUpdate: '10 mins ago'
    }
];

const FleetTracking: React.FC = () => {
    const [viewMode, setViewMode] = useState<'live' | 'list'>('live');
    const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);

    const selectedVehicle = vehicles.find(v => v.id === selectedVehicleId) || null;

    const activeCount = vehicles.filter(v => v.status === 'Moving').length;
    const alertCount = vehicles.filter(v => v.status === 'Alert').length;

    return (
        <div className="flex flex-col h-full space-y-4 max-w-[1920px] mx-auto">
            
            {/* Header - Compact */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-4 shrink-0">
                <div>
                    <h2 className="text-2xl font-black text-white tracking-tight">Fleet & Logistics</h2>
                    <p className="text-aqua-400 text-xs mt-1">Real-time vehicle tracking and delivery monitoring.</p>
                </div>
                
                {/* Top Stats - Compact */}
                <div className="flex gap-3">
                    <div className="bg-aqua-800/50 border border-aqua-700 px-3 py-2 rounded-lg flex items-center gap-3">
                        <div className="p-1.5 bg-blue-500/20 text-blue-400 rounded-md"><Truck size={16}/></div>
                        <div>
                            <p className="text-[10px] text-gray-400 uppercase font-bold">Total Fleet</p>
                            <p className="text-base font-bold text-white">{vehicles.length}</p>
                        </div>
                    </div>
                    <div className="bg-aqua-800/50 border border-aqua-700 px-3 py-2 rounded-lg flex items-center gap-3">
                        <div className="p-1.5 bg-green-500/20 text-green-400 rounded-md"><Navigation size={16}/></div>
                        <div>
                            <p className="text-[10px] text-gray-400 uppercase font-bold">Active</p>
                            <p className="text-base font-bold text-white">{activeCount}</p>
                        </div>
                    </div>
                    <div className="bg-aqua-800/50 border border-aqua-700 px-3 py-2 rounded-lg flex items-center gap-3">
                        <div className="p-1.5 bg-red-500/20 text-red-400 rounded-md"><AlertTriangle size={16}/></div>
                        <div>
                            <p className="text-[10px] text-gray-400 uppercase font-bold">Alerts</p>
                            <p className="text-base font-bold text-white">{alertCount}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Controls - Integrated and Compact */}
            <div className="flex justify-between items-center bg-aqua-800/30 p-1.5 rounded-lg border border-aqua-800 shrink-0">
                <div className="flex gap-1">
                    <button 
                        onClick={() => setViewMode('live')}
                        className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-2 transition-all ${viewMode === 'live' ? 'bg-aqua-500 text-aqua-950 shadow-sm' : 'text-gray-400 hover:text-white hover:bg-aqua-800/50'}`}
                    >
                        <MapPin size={14}/> Live Map
                    </button>
                    <button 
                        onClick={() => setViewMode('list')}
                        className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-2 transition-all ${viewMode === 'list' ? 'bg-aqua-500 text-aqua-950 shadow-sm' : 'text-gray-400 hover:text-white hover:bg-aqua-800/50'}`}
                    >
                        <Truck size={14}/> Fleet List
                    </button>
                </div>
                <div className="relative w-64">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-aqua-400" size={14}/>
                    <input type="text" placeholder="Search Vehicle..." className="w-full bg-aqua-900/50 border border-aqua-700 rounded-md pl-8 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-aqua-500 transition-colors"/>
                </div>
            </div>

            {/* MAIN CONTENT AREA - Reduced gaps */}
            <div className="flex-1 min-h-0 flex gap-4 overflow-hidden relative">
                
                {/* LEFT/MAIN VIEW */}
                <div className={`flex-1 bg-aqua-900/30 border border-aqua-800 rounded-xl overflow-hidden relative flex flex-col ${viewMode === 'list' ? 'p-0' : ''}`}>
                    
                    {viewMode === 'live' ? (
                        <>
                            {/* Simulated Map Background */}
                            <div className="absolute inset-0 bg-[#0f172a]">
                                {/* Map Image Placeholder */}
                                <img 
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHYkC51guqB3IqcwTExu6eSnqHapGHvb5bVoOCcgXCx1rsMIFfIHZ9mFoP5oKohceJ8_L465Fq8N1-0N_fpIYMSS7aFEfU0-u0qmOrvsuRS-s0SLheT8dsfZn4qIuWAG0OwpO3JLPRFaIsb3CYYVPzM-hSeO1BHgjsO6Qp79665KG66nZ0vWkJc7triZxG1C0VhERCWfkaFunLmnYokBnaQE8ZjOJCy5awGCxxMRAJUL-1UlBBt57wNZ2Hk8XHpIiq-cMwkJjt-GJt" 
                                    className="w-full h-full object-cover opacity-40 grayscale"
                                    alt="Map"
                                />
                                
                                {/* Vehicle Markers */}
                                {vehicles.map(vehicle => (
                                    <div 
                                        key={vehicle.id}
                                        onClick={() => setSelectedVehicleId(vehicle.id)}
                                        className="absolute cursor-pointer group transition-all duration-500"
                                        style={{ top: vehicle.coordinates.top, left: vehicle.coordinates.left }}
                                    >
                                        <div className="relative">
                                            {/* Ripple Effect for Active Vehicles */}
                                            {vehicle.status === 'Moving' && (
                                                <span className="absolute -inset-3 rounded-full bg-aqua-500 opacity-20 animate-ping"></span>
                                            )}
                                            
                                            {/* Marker Pin */}
                                            <div className={`h-8 w-8 rounded-full border-2 shadow-xl flex items-center justify-center transform transition-transform group-hover:scale-110 
                                                ${selectedVehicleId === vehicle.id ? 'bg-white border-aqua-500 text-aqua-900 z-20 scale-110' : 
                                                  vehicle.status === 'Alert' ? 'bg-red-900 border-red-500 text-red-500' : 
                                                  'bg-aqua-900 border-aqua-500 text-aqua-500'}`}
                                            >
                                                <Truck size={14} className="fill-current" />
                                            </div>

                                            {/* Hover/Static Label */}
                                            <div className={`absolute top-10 left-1/2 -translate-x-1/2 bg-aqua-950/90 border border-aqua-700 px-2 py-1 rounded-md whitespace-nowrap z-10 backdrop-blur-sm
                                                ${selectedVehicleId === vehicle.id ? 'block' : 'hidden group-hover:block'}`}>
                                                <p className="text-[10px] font-bold text-white">{vehicle.plate}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Map Legend / Controls Overlay - Compact */}
                            <div className="absolute bottom-4 left-4 bg-aqua-900/90 backdrop-blur p-3 rounded-lg border border-aqua-700 shadow-lg">
                                <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-2">Legend</h4>
                                <div className="space-y-1.5">
                                    <div className="flex items-center gap-2 text-[10px] text-gray-300"><span className="w-2 h-2 rounded-full bg-aqua-500"></span> Moving</div>
                                    <div className="flex items-center gap-2 text-[10px] text-gray-300"><span className="w-2 h-2 rounded-full bg-aqua-900 border border-aqua-500"></span> Idle</div>
                                    <div className="flex items-center gap-2 text-[10px] text-gray-300"><span className="w-2 h-2 rounded-full bg-red-500"></span> Alert</div>
                                </div>
                            </div>
                        </>
                    ) : (
                        /* LIST VIEW TABLE - Thinner rows */
                        <div className="overflow-auto h-full custom-scrollbar">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-aqua-800/80 text-gray-400 uppercase text-[10px] sticky top-0 z-10 backdrop-blur-sm">
                                    <tr>
                                        <th className="px-4 py-3 font-bold tracking-wider">Vehicle Info</th>
                                        <th className="px-4 py-3 font-bold tracking-wider">Status</th>
                                        <th className="px-4 py-3 font-bold tracking-wider">Driver</th>
                                        <th className="px-4 py-3 font-bold tracking-wider">Location</th>
                                        <th className="px-4 py-3 font-bold tracking-wider">Stats</th>
                                        <th className="px-4 py-3 font-bold tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-aqua-800/50 text-gray-300">
                                    {vehicles.map(v => (
                                        <tr key={v.id} className="hover:bg-aqua-800/30 transition-colors group">
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-8 w-8 rounded-lg bg-aqua-800 flex items-center justify-center text-aqua-400">
                                                        <Truck size={16}/>
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-white text-xs">{v.plate}</p>
                                                        <p className="text-[10px] text-gray-500">{v.type}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                                                    v.status === 'Moving' ? 'bg-green-500/10 text-green-400 border-green-500/30' :
                                                    v.status === 'Alert' ? 'bg-red-500/10 text-red-400 border-red-500/30' :
                                                    'bg-gray-500/10 text-gray-400 border-gray-500/30'
                                                }`}>
                                                    {v.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <p className="text-white text-xs">{v.driver}</p>
                                                <p className="text-[10px] text-gray-500">{v.phone}</p>
                                            </td>
                                            <td className="px-4 py-3">
                                                <p className="text-white text-xs truncate max-w-[120px]">{v.location}</p>
                                                <p className="text-[10px] text-gray-500">Dest: {v.destination}</p>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex gap-3">
                                                    <div className="text-center">
                                                        <p className="text-[10px] text-gray-500">Fuel</p>
                                                        <p className={`font-bold text-xs ${v.fuel < 20 ? 'text-red-500' : 'text-white'}`}>{v.fuel}%</p>
                                                    </div>
                                                    <div className="text-center">
                                                        <p className="text-[10px] text-gray-500">Temp</p>
                                                        <p className="text-white text-xs font-bold">{v.temp}°</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <button onClick={() => { setViewMode('live'); setSelectedVehicleId(v.id); }} className="text-aqua-400 hover:text-white bg-aqua-900/50 hover:bg-aqua-800 px-2 py-1 rounded text-[10px] font-bold border border-aqua-700 uppercase tracking-wide">
                                                    Track
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* RIGHT: DETAILS PANEL (Compact & Tighter) */}
                <div className={`w-[380px] flex-col gap-4 transition-all duration-300 ${selectedVehicleId ? 'flex translate-x-0' : 'hidden translate-x-full lg:flex lg:translate-x-0 lg:w-72 xl:w-80'}`}>
                    
                    {selectedVehicle ? (
                        /* ACTIVE VEHICLE DETAIL CARD */
                        <div className="bg-aqua-800/20 border border-aqua-700 rounded-xl overflow-hidden flex flex-col h-full backdrop-blur-sm">
                            {/* Card Header - Compact */}
                            <div className="p-4 bg-aqua-800/80 border-b border-aqua-700 relative">
                                <button onClick={() => setSelectedVehicleId(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={18}/></button>
                                <div className="flex items-center gap-3">
                                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center shadow-lg border ${selectedVehicle.status === 'Alert' ? 'bg-red-500 border-red-400' : 'bg-aqua-500 border-white'}`}>
                                        <Truck size={24} className="text-aqua-950"/>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-white leading-none">{selectedVehicle.plate}</h3>
                                        <p className="text-aqua-200 text-xs font-medium mt-1">{selectedVehicle.type}</p>
                                    </div>
                                </div>
                                <p className="text-[10px] text-gray-400 mt-3 flex items-center gap-1"><Clock size={10}/> Updated: {selectedVehicle.lastUpdate}</p>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                                {/* Driver Section - Compact */}
                                <div className="bg-aqua-900/40 p-3 rounded-lg border border-aqua-800">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-500 uppercase mb-0.5">Driver</p>
                                            <p className="text-white font-bold text-sm">{selectedVehicle.driver}</p>
                                            <p className="text-xs text-gray-400">{selectedVehicle.phone}</p>
                                        </div>
                                        <button className="bg-green-600 hover:bg-green-500 text-white p-1.5 rounded-full shadow-lg shadow-green-500/20">
                                            <Phone size={14} />
                                        </button>
                                    </div>
                                </div>

                                {/* Telemetry Grid - Compact */}
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="bg-aqua-900/40 p-2.5 rounded-lg border border-aqua-800 flex flex-col items-center justify-center text-center">
                                        <Gauge size={16} className="text-blue-400 mb-1"/>
                                        <p className="text-[10px] text-gray-500">Speed</p>
                                        <p className="text-base font-bold text-white">{selectedVehicle.speed} <span className="text-[10px] font-normal">km/h</span></p>
                                    </div>
                                    <div className="bg-aqua-900/40 p-2.5 rounded-lg border border-aqua-800 flex flex-col items-center justify-center text-center">
                                        <Fuel size={16} className={selectedVehicle.fuel < 20 ? "text-red-500" : "text-yellow-500 mb-1"}/>
                                        <p className="text-[10px] text-gray-500">Fuel</p>
                                        <p className={`text-base font-bold ${selectedVehicle.fuel < 20 ? "text-red-500" : "text-white"}`}>{selectedVehicle.fuel}%</p>
                                    </div>
                                    <div className="bg-aqua-900/40 p-2.5 rounded-lg border border-aqua-800 flex flex-col items-center justify-center text-center">
                                        <Thermometer size={16} className="text-orange-400 mb-1"/>
                                        <p className="text-[10px] text-gray-500">Temp</p>
                                        <p className="text-base font-bold text-white">{selectedVehicle.temp}°C</p>
                                    </div>
                                    <div className="bg-aqua-900/40 p-2.5 rounded-lg border border-aqua-800 flex flex-col items-center justify-center text-center">
                                        <Battery size={16} className="text-green-400 mb-1"/>
                                        <p className="text-[10px] text-gray-500">Battery</p>
                                        <p className="text-base font-bold text-white">Good</p>
                                    </div>
                                </div>

                                {/* Trip Info - Compact */}
                                <div className="bg-aqua-900/40 p-3 rounded-lg border border-aqua-800 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-0.5 h-full bg-aqua-500"></div>
                                    <h4 className="text-[10px] font-bold text-gray-500 uppercase mb-3 flex items-center gap-2"><Navigation size={12}/> Trip Details</h4>
                                    <div className="flex gap-3 items-start">
                                        <div className="flex flex-col items-center gap-0.5 mt-1">
                                            <div className="w-2.5 h-2.5 rounded-full bg-gray-500"></div>
                                            <div className="w-px h-6 bg-gray-700"></div>
                                            <div className="w-2.5 h-2.5 rounded-full bg-aqua-500 shadow-[0_0_8px_rgba(19,200,236,0.6)]"></div>
                                        </div>
                                        <div className="flex-1 space-y-3">
                                            <div>
                                                <p className="text-[10px] text-gray-400">Current Location</p>
                                                <p className="text-white text-xs font-medium truncate">{selectedVehicle.location}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-gray-400">Destination</p>
                                                <p className="text-white text-xs font-medium truncate">{selectedVehicle.destination}</p>
                                                <p className="text-[10px] text-aqua-400 mt-0.5">ETA: {selectedVehicle.eta}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Manifest / Cargo - Compact */}
                                <div>
                                    <h4 className="text-[10px] font-bold text-gray-500 uppercase mb-2 flex items-center gap-2"><Package size={12}/> Cargo Manifest</h4>
                                    <div className="bg-aqua-900/40 rounded-lg border border-aqua-800 overflow-hidden">
                                        {selectedVehicle.cargo.length > 0 ? selectedVehicle.cargo.map((item, i) => (
                                            <div key={i} className="p-2.5 border-b border-aqua-800/50 last:border-0 flex justify-between items-center hover:bg-aqua-800/20">
                                                <div>
                                                    <p className="text-xs font-bold text-white">{item.item}</p>
                                                    <p className="text-[10px] text-gray-500">Order: {item.id}</p>
                                                </div>
                                                <span className="text-[10px] bg-aqua-800 text-aqua-400 px-1.5 py-0.5 rounded">{item.qty}</span>
                                            </div>
                                        )) : (
                                            <div className="p-3 text-center text-gray-500 text-xs italic">Vehicle Empty / Returning</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* EMPTY STATE / DEFAULT PANEL */
                        <div className="bg-aqua-800/10 border border-aqua-800 border-dashed rounded-xl h-full flex flex-col items-center justify-center p-6 text-center text-gray-500">
                            <div className="bg-aqua-900 p-3 rounded-full mb-3">
                                <Truck size={24} className="text-aqua-700"/>
                            </div>
                            <p className="text-base font-bold text-gray-400">No Vehicle Selected</p>
                            <p className="text-xs mt-1 max-w-[200px]">Click on a map marker or list item to view live telemetry and cargo details.</p>
                            
                            <div className="mt-6 w-full">
                                <h4 className="text-[10px] font-bold text-gray-500 uppercase mb-2 text-left">Fleet Overview</h4>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs p-2 bg-aqua-900/40 rounded-md">
                                        <span className="text-gray-400">Maintenance</span>
                                        <span className="text-yellow-500 font-bold">2 Due</span>
                                    </div>
                                    <div className="flex justify-between text-xs p-2 bg-aqua-900/40 rounded-md">
                                        <span className="text-gray-400">Drivers Active</span>
                                        <span className="text-green-500 font-bold">4 Online</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default FleetTracking;
