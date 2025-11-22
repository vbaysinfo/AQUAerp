
import React, { useState } from 'react';
import { 
    Wifi, 
    WifiOff, 
    Search, 
    Activity, 
    Cpu, 
    Zap, 
    Link as LinkIcon, 
    Save, 
    X, 
    AlertCircle,
    ArrowRight,
    Signal
} from 'lucide-react';
import { Farmer, Pond } from '../types';

// --- MOCK DATA ---
const mockPondsWithIoT: Pond[] = [
    {
        id: 'P-001', name: 'Pond A-1', status: 'Active', size: 1.5,
        water: { ph: 7.8, do: 5.2, salinity: 15, temp: 28.5, ammonia: 0.01, turbidity: 35, lastUpdated: '20 mins ago' },
        stocking: { date: '2023-09-01', quantity: 250000, species: 'L. Vannamei', density: 166, survivalRateEst: 88, currentABW: 18.5, doc: 55 },
        feed: { dailyIntake: 320, feedType: 'Grower 2mm', fcr: 1.2, lastFed: '08:00 AM', history: [] },
        health: [],
        iotDevice: {
            deviceId: 'DEV-AQ-8821',
            type: 'Smart Buoy',
            status: 'Online',
            lastSync: 'Just now',
            firmware: 'v2.1.0',
            signalStrength: 'Excellent'
        }
    },
    {
        id: 'P-002', name: 'Pond A-2', status: 'Active', size: 1.2,
        water: { ph: 0, do: 0, salinity: 0, temp: 0, ammonia: 0, turbidity: 0, lastUpdated: 'N/A' },
        stocking: { date: '2023-09-15', quantity: 200000, species: 'L. Vannamei', density: 160, survivalRateEst: 92, currentABW: 12.0, doc: 40 },
        feed: { dailyIntake: 180, feedType: 'Starter 1.5mm', fcr: 1.1, lastFed: '08:30 AM', history: [] },
        health: []
    },
    {
        id: 'P-003', name: 'Pond B-1', status: 'Preparation', size: 1.0,
        water: { ph: 0, do: 0, salinity: 0, temp: 0, ammonia: 0, turbidity: 0, lastUpdated: 'N/A' },
        stocking: { date: '', quantity: 0, species: '', density: 0, survivalRateEst: 0, currentABW: 0, doc: 0 },
        feed: { dailyIntake: 0, feedType: 'N/A', fcr: 0, lastFed: 'N/A', history: [] },
        health: [],
        iotDevice: {
            deviceId: 'DEV-AQ-1102',
            type: 'Auto-Feeder',
            status: 'Offline',
            lastSync: '2 days ago',
            firmware: 'v1.8.5',
            signalStrength: 'Weak'
        }
    }
];

const mockFarmers: Farmer[] = [
    {
        id: 'F001', name: 'Kamehameha Farms', location: 'North Shore, Oahu', region: 'Oahu',
        acres: 45, ponds: 12, technicianName: 'Mike Thompson', technicianPhone: '(808) 555-0199',
        status: 'Active', clv: '$125,840', cac: '$2,300', retention: '98%', avatar: 'https://picsum.photos/id/433/200', since: '5 Years', email: 'contact@kamehameha.com',
        pondsList: mockPondsWithIoT
    },
    {
        id: 'F002', name: 'Big Island Aqua', location: 'Hilo, Hawaii', region: 'Hawaii',
        acres: 120, ponds: 28, technicianName: 'Sarah Lee', technicianPhone: '(808) 555-0244',
        status: 'Active', clv: '$210,500', cac: '$1,800', retention: '95%', avatar: 'https://picsum.photos/id/54/200', since: '3 Years', email: 'info@bigisland.com',
        pondsList: []
    }
];

const IoTConnections: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(mockFarmers[0]);
    const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
    const [targetPond, setTargetPond] = useState<Pond | null>(null);
    
    // Form State
    const [deviceForm, setDeviceForm] = useState({
        deviceId: '',
        type: 'Smart Buoy',
        macAddress: '',
        installDate: new Date().toISOString().split('T')[0]
    });

    const handleConnectClick = (pond: Pond) => {
        setTargetPond(pond);
        // Reset form or pre-fill if editing
        setDeviceForm({
            deviceId: pond.iotDevice?.deviceId || '',
            type: pond.iotDevice?.type || 'Smart Buoy',
            macAddress: '',
            installDate: new Date().toISOString().split('T')[0]
        });
        setIsConnectModalOpen(true);
    };

    const handleDisconnect = (pond: Pond) => {
        if (window.confirm(`Are you sure you want to disconnect device ${pond.iotDevice?.deviceId}?`)) {
            // In a real app, update state/backend here
            alert(`Device disconnected from ${pond.name}`);
        }
    };

    const handleSaveConnection = () => {
        if (!deviceForm.deviceId) {
            alert("Please enter a Device ID");
            return;
        }
        // In a real app, update state/backend here
        alert(`Device ${deviceForm.deviceId} connected to ${targetPond?.name}`);
        setIsConnectModalOpen(false);
    };

    return (
        <div className="flex flex-col h-full max-w-[1920px] mx-auto space-y-4 pb-6 relative">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-4 shrink-0">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Cpu size={24} className="text-aqua-600 dark:text-aqua-400"/> IoT Device Manager
                    </h2>
                    <p className="text-gray-500 dark:text-aqua-400 text-xs mt-1">Manage connections for smart buoys, feeders, and aerators.</p>
                </div>
            </div>

            {/* Content Grid */}
            <div className="flex flex-col lg:flex-row gap-6 h-full min-h-0">
                
                {/* Left: Farmer Selector */}
                <div className="lg:w-80 bg-white dark:bg-aqua-900/30 border border-gray-200 dark:border-aqua-800 rounded-xl flex flex-col overflow-hidden shrink-0 shadow-sm">
                    <div className="p-4 border-b border-gray-200 dark:border-aqua-800 bg-gray-50 dark:bg-aqua-900/50">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={14} />
                            <input 
                                type="text" 
                                placeholder="Find Farmer..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white dark:bg-aqua-800 border border-gray-300 dark:border-aqua-700 rounded-lg pl-9 pr-3 py-2 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-aqua-500"
                            />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
                        {mockFarmers.map(farmer => (
                            <div 
                                key={farmer.id}
                                onClick={() => setSelectedFarmer(farmer)}
                                className={`p-3 rounded-lg cursor-pointer transition-colors flex items-center gap-3 border ${
                                    selectedFarmer?.id === farmer.id 
                                    ? 'bg-aqua-50 dark:bg-aqua-800 border-aqua-500 shadow-sm' 
                                    : 'bg-transparent border-transparent hover:bg-gray-100 dark:hover:bg-aqua-800/30 hover:border-gray-200 dark:hover:border-aqua-800'
                                }`}
                            >
                                <img src={farmer.avatar} alt="" className="h-8 w-8 rounded-full object-cover" />
                                <div className="overflow-hidden">
                                    <p className={`text-sm font-bold truncate ${selectedFarmer?.id === farmer.id ? 'text-aqua-700 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>{farmer.name}</p>
                                    <p className="text-[10px] text-gray-500">{farmer.ponds} Ponds • {farmer.region}</p>
                                </div>
                                <ArrowRight size={14} className={`ml-auto transition-opacity ${selectedFarmer?.id === farmer.id ? 'text-aqua-500 dark:text-aqua-400 opacity-100' : 'opacity-0'}`} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Pond Grid */}
                <div className="flex-1 overflow-y-auto">
                    {selectedFarmer ? (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between bg-white dark:bg-aqua-800/30 p-3 rounded-xl border border-gray-200 dark:border-aqua-800 shadow-sm">
                                <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    {selectedFarmer.name} 
                                    <span className="text-gray-500 font-normal text-xs">({selectedFarmer.id})</span>
                                </h3>
                                <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-400">
                                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500"></div> Online</span>
                                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-600"></div> Disconnected</span>
                                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500"></div> Offline</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                                {selectedFarmer.pondsList?.map(pond => {
                                    const isConnected = !!pond.iotDevice;
                                    const isOnline = pond.iotDevice?.status === 'Online';
                                    
                                    return (
                                        <div key={pond.id} className={`relative rounded-xl border transition-all overflow-hidden flex flex-col shadow-sm ${
                                            isConnected 
                                                ? 'bg-white dark:bg-aqua-900/40 border-gray-200 dark:border-aqua-700' 
                                                : 'bg-gray-50 dark:bg-aqua-900/20 border-gray-200 dark:border-aqua-800/50 border-dashed'
                                        }`}>
                                            {/* Status Bar */}
                                            <div className={`h-1 w-full ${
                                                !isConnected ? 'bg-gray-300 dark:bg-gray-700' : isOnline ? 'bg-green-500' : 'bg-red-500'
                                            }`}></div>

                                            <div className="p-4 flex-1">
                                                <div className="flex justify-between items-start mb-3">
                                                    <div>
                                                        <h4 className="font-bold text-gray-900 dark:text-white text-sm">{pond.name}</h4>
                                                        <p className="text-[10px] text-gray-500 dark:text-gray-400">{pond.size} Hectares</p>
                                                    </div>
                                                    {isConnected ? (
                                                        <div className={`p-1.5 rounded-lg ${isOnline ? 'bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400' : 'bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400'}`}>
                                                            {isOnline ? <Wifi size={16} /> : <WifiOff size={16} />}
                                                        </div>
                                                    ) : (
                                                        <div className="p-1.5 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-500">
                                                            <LinkIcon size={16} />
                                                        </div>
                                                    )}
                                                </div>

                                                {isConnected ? (
                                                    <div className="space-y-3">
                                                        <div className="bg-gray-50 dark:bg-aqua-950/50 p-2.5 rounded-lg border border-gray-200 dark:border-aqua-800/50">
                                                            <div className="flex justify-between items-center mb-1">
                                                                <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold">{pond.iotDevice?.type}</span>
                                                                <span className="text-[10px] text-aqua-600 dark:text-aqua-400">{pond.iotDevice?.deviceId}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2 text-xs text-gray-900 dark:text-white font-medium">
                                                                <Signal size={12} className={isOnline ? 'text-green-500' : 'text-red-500'} />
                                                                {pond.iotDevice?.signalStrength} Signal
                                                            </div>
                                                        </div>
                                                        
                                                        {/* Live Data Preview */}
                                                        <div className="grid grid-cols-3 gap-2">
                                                            <div className="text-center p-1.5 bg-gray-100 dark:bg-aqua-800/30 rounded">
                                                                <p className="text-[9px] text-gray-500">DO</p>
                                                                <p className="text-xs font-bold text-gray-900 dark:text-white">{pond.water.do || '--'}</p>
                                                            </div>
                                                            <div className="text-center p-1.5 bg-gray-100 dark:bg-aqua-800/30 rounded">
                                                                <p className="text-[9px] text-gray-500">pH</p>
                                                                <p className="text-xs font-bold text-gray-900 dark:text-white">{pond.water.ph || '--'}</p>
                                                            </div>
                                                            <div className="text-center p-1.5 bg-gray-100 dark:bg-aqua-800/30 rounded">
                                                                <p className="text-[9px] text-gray-500">Temp</p>
                                                                <p className="text-xs font-bold text-gray-900 dark:text-white">{pond.water.temp || '--'}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col items-center justify-center py-6 text-gray-400 dark:text-gray-500">
                                                        <Activity size={24} className="mb-2 opacity-30"/>
                                                        <p className="text-xs">No device connected</p>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Actions Footer */}
                                            <div className="p-3 bg-gray-50 dark:bg-aqua-900/50 border-t border-gray-200 dark:border-aqua-800 flex gap-2">
                                                {isConnected ? (
                                                    <>
                                                        <button className="flex-1 bg-white dark:bg-aqua-800 hover:bg-gray-100 dark:hover:bg-aqua-700 text-gray-700 dark:text-white py-1.5 rounded text-[10px] font-bold border border-gray-300 dark:border-aqua-700 transition-colors">
                                                            Calibrate
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDisconnect(pond)}
                                                            className="flex-1 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-500 dark:text-red-400 py-1.5 rounded text-[10px] font-bold border border-red-200 dark:border-red-900/30 transition-colors"
                                                        >
                                                            Disconnect
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button 
                                                        onClick={() => handleConnectClick(pond)}
                                                        className="w-full bg-aqua-500 hover:bg-aqua-400 text-white dark:text-aqua-950 py-2 rounded-lg text-xs font-bold shadow-lg shadow-aqua-500/10 flex items-center justify-center gap-2 transition-all"
                                                    >
                                                        <LinkIcon size={12} /> Connect Device
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
                            <Search size={48} className="mb-4 opacity-20" />
                            <p>Select a farmer to view IoT connections.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* --- CONNECT DEVICE SLIDE-OVER --- */}
            <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isConnectModalOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                <div 
                    className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isConnectModalOpen ? 'opacity-100' : 'opacity-0'}`} 
                    onClick={() => setIsConnectModalOpen(false)}
                />
                
                <div className={`absolute right-0 top-0 h-full w-full md:w-[450px] bg-white dark:bg-aqua-900 border-l border-gray-200 dark:border-aqua-700 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${isConnectModalOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    
                    <div className="p-5 border-b border-gray-200 dark:border-aqua-700 bg-gray-50 dark:bg-aqua-800 flex justify-between items-center">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <Zap size={20} className="text-aqua-600 dark:text-aqua-400"/> Connect Device
                            </h2>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Pair a new hardware unit to {targetPond?.name}.</p>
                        </div>
                        <button onClick={() => setIsConnectModalOpen(false)} className="p-1.5 hover:bg-gray-200 dark:hover:bg-aqua-700 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-lg p-3 flex gap-3 items-start">
                            <AlertCircle size={16} className="text-blue-500 dark:text-blue-400 mt-0.5 shrink-0"/>
                            <p className="text-xs text-blue-700 dark:text-blue-200 leading-relaxed">Ensure the device is powered on and within range of the LoRaWAN gateway before attempting connection.</p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs text-gray-700 dark:text-aqua-100 mb-1.5 font-medium">Device Type</label>
                                <select 
                                    className="w-full bg-white dark:bg-aqua-800 border border-gray-300 dark:border-aqua-700 rounded-lg p-2.5 text-sm text-gray-900 dark:text-white focus:border-aqua-500 focus:outline-none appearance-none"
                                    value={deviceForm.type}
                                    onChange={(e) => setDeviceForm({...deviceForm, type: e.target.value})}
                                >
                                    <option>Smart Buoy</option>
                                    <option>Auto-Feeder</option>
                                    <option>Aerator Controller</option>
                                    <option>Water Station</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs text-gray-700 dark:text-aqua-100 mb-1.5 font-medium">Device Serial / ID</label>
                                <input 
                                    type="text" 
                                    className="w-full bg-white dark:bg-aqua-800 border border-gray-300 dark:border-aqua-700 rounded-lg p-2.5 text-sm text-gray-900 dark:text-white focus:border-aqua-500 focus:outline-none uppercase placeholder:normal-case"
                                    placeholder="e.g. DEV-AQ-XXXX"
                                    value={deviceForm.deviceId}
                                    onChange={(e) => setDeviceForm({...deviceForm, deviceId: e.target.value})}
                                />
                            </div>

                            <div>
                                <label className="block text-xs text-gray-700 dark:text-aqua-100 mb-1.5 font-medium">MAC Address (Optional)</label>
                                <input 
                                    type="text" 
                                    className="w-full bg-white dark:bg-aqua-800 border border-gray-300 dark:border-aqua-700 rounded-lg p-2.5 text-sm text-gray-900 dark:text-white focus:border-aqua-500 focus:outline-none font-mono"
                                    placeholder="00:1B:44:11:3A:B7"
                                    value={deviceForm.macAddress}
                                    onChange={(e) => setDeviceForm({...deviceForm, macAddress: e.target.value})}
                                />
                            </div>

                            <div>
                                <label className="block text-xs text-gray-700 dark:text-aqua-100 mb-1.5 font-medium">Installation Date</label>
                                <input 
                                    type="date" 
                                    className="w-full bg-white dark:bg-aqua-800 border border-gray-300 dark:border-aqua-700 rounded-lg p-2.5 text-sm text-gray-900 dark:text-white focus:border-aqua-500 focus:outline-none"
                                    value={deviceForm.installDate}
                                    onChange={(e) => setDeviceForm({...deviceForm, installDate: e.target.value})}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="p-4 border-t border-gray-200 dark:border-aqua-700 bg-gray-50 dark:bg-aqua-800 flex gap-3">
                        <button onClick={() => setIsConnectModalOpen(false)} className="flex-1 py-2.5 rounded-xl font-bold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-aqua-700 transition-colors text-sm">
                            Cancel
                        </button>
                        <button 
                            onClick={handleSaveConnection} 
                            className="flex-1 bg-aqua-500 hover:bg-aqua-400 text-white dark:text-aqua-950 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-aqua-500/20 transition-all text-sm"
                        >
                            <LinkIcon size={18} /> Establish Link
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default IoTConnections;
