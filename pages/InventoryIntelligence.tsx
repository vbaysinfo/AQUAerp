
import React, { useState } from 'react';
import { MapPin, Building2, Navigation, ArrowUpRight, Plus, Truck, Save, X, Package, FileText, CheckCircle } from 'lucide-react';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

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

// Mock Data for Andhra Pradesh Regional Breakdown
const initialLocations = [
    { 
        id: 'AP-W01', city: 'Bhimavaram', type: 'Central Hub', 
        stock: 450, capacity: 800, unit: 'Tons',
        items: [
            { name: 'Grower Feed 2mm', sku: 'FD-GR-002', qty: 200 },
            { name: 'Starter Feed 1mm', sku: 'FD-ST-001', qty: 150 },
            { name: 'Probiotics', sku: 'SUP-PRO-01', qty: 100 }
        ],
        status: 'Healthy'
    },
    { 
        id: 'AP-W02', city: 'Nellore', type: 'Distribution', 
        stock: 120, capacity: 500, unit: 'Tons',
        items: [
            { name: 'Vannamei PL 15', sku: 'SD-VN-015', qty: 80 },
            { name: 'Minerals', sku: 'SUP-MIN-05', qty: 40 }
        ],
        status: 'Low Stock'
    },
    { 
        id: 'AP-W03', city: 'Kakinada', type: 'Logistics Point', 
        stock: 300, capacity: 400, unit: 'Tons',
        items: [
            { name: 'Finisher Feed', sku: 'FD-FN-003', qty: 300 }
        ],
        status: 'Healthy'
    },
    { 
        id: 'AP-W04', city: 'Vizag', type: 'Cold Chain', 
        stock: 45, capacity: 100, unit: 'kL',
        items: [
            { name: 'Liquid Supplements', sku: 'SUP-LIQ-01', qty: 45 }
        ],
        status: 'Critical'
    },
    { 
        id: 'AP-W05', city: 'Ongole', type: 'Retail Depot', 
        stock: 85, capacity: 200, unit: 'Tons',
        items: [
            { name: 'General Feed', sku: 'FD-GEN-001', qty: 85 }
        ],
        status: 'Healthy'
    }
];

const suppliers = [
    { id: 'SUP-001', name: 'Bhimavaram Feeds Ltd.' },
    { id: 'SUP-002', name: 'Nellore Biotech' },
    { id: 'SUP-003', name: 'Coastal Logistics Inc' },
    { id: 'SUP-004', name: 'Global Agro Exports' },
];

const products = [
    { name: 'Grower Feed 2mm', sku: 'FD-GR-002', unit: 'Tons' },
    { name: 'Starter Feed 1mm', sku: 'FD-ST-001', unit: 'Tons' },
    { name: 'Finisher Feed', sku: 'FD-FN-003', unit: 'Tons' },
    { name: 'Vannamei PL 15', sku: 'SD-VN-015', unit: 'Million' },
    { name: 'Probiotics', sku: 'SUP-PRO-01', unit: 'kg' },
    { name: 'Minerals', sku: 'SUP-MIN-05', unit: 'kg' },
];

const COLORS = ['#13c8ec', '#10b981', '#f59e0b', '#ef4444'];

const InventoryIntelligence: React.FC<InventoryProps> = ({ category = 'Feed' }) => {
  const [locations, setLocations] = useState(initialLocations);
  const [selectedRegion, setSelectedRegion] = useState('Andhra Pradesh');
  
  // Receive Stock State
  const [isReceiveOpen, setIsReceiveOpen] = useState(false);
  const [grnForm, setGrnForm] = useState({
      supplierId: '',
      locationId: '',
      productSku: '',
      quantity: 0,
      date: new Date().toISOString().split('T')[0],
      invoiceNo: ''
  });

  const handleReceiveStock = () => {
      if (!grnForm.supplierId || !grnForm.locationId || !grnForm.productSku || grnForm.quantity <= 0) {
          alert("Please fill all required fields.");
          return;
      }

      const selectedProduct = products.find(p => p.sku === grnForm.productSku);

      setLocations(prevLocations => prevLocations.map(loc => {
          if (loc.id === grnForm.locationId) {
              // Calculate new total stock for location
              const newTotalStock = loc.stock + grnForm.quantity;
              
              // Update or Add item in location
              const itemIndex = loc.items.findIndex(i => i.sku === grnForm.productSku);
              let updatedItems = [...loc.items];
              
              if (itemIndex >= 0) {
                  updatedItems[itemIndex] = {
                      ...updatedItems[itemIndex],
                      qty: updatedItems[itemIndex].qty + grnForm.quantity
                  };
              } else if (selectedProduct) {
                  updatedItems.push({
                      name: selectedProduct.name,
                      sku: selectedProduct.sku,
                      qty: grnForm.quantity
                  });
              }

              // Simple status update logic
              const utilization = (newTotalStock / loc.capacity) * 100;
              let newStatus = loc.status;
              if (utilization > 90) newStatus = 'Healthy'; // Assuming full is good
              else if (utilization < 20) newStatus = 'Critical';

              return {
                  ...loc,
                  stock: newTotalStock,
                  items: updatedItems,
                  status: newStatus
              };
          }
          return loc;
      }));

      setIsReceiveOpen(false);
      setGrnForm({ supplierId: '', locationId: '', productSku: '', quantity: 0, date: new Date().toISOString().split('T')[0], invoiceNo: '' });
      alert("Stock updated successfully!");
  };

  const totalStock = locations.reduce((acc, loc) => acc + loc.stock, 0);

  return (
    <div className="space-y-4 max-w-[1920px] mx-auto pb-6 relative">
      
      {/* Header & Filter */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
          <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{category} Inventory Intelligence</h2>
              <p className="text-gray-500 dark:text-aqua-400 text-xs">Real-time tracking for {category.toLowerCase()} stock across regions.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 bg-white dark:bg-aqua-800/30 p-1.5 rounded-lg border border-gray-200 dark:border-aqua-800">
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">Region:</span>
                <select 
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="bg-transparent dark:bg-aqua-900 border-none dark:border border-aqua-700 text-gray-900 dark:text-white text-xs rounded-md px-2 py-1 focus:ring-aqua-500 appearance-none cursor-pointer font-medium"
                >
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Odisha">Odisha</option>
                </select>
            </div>
            <button 
                onClick={() => setIsReceiveOpen(true)}
                className="bg-aqua-500 hover:bg-aqua-400 text-white dark:text-aqua-950 font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm shadow-lg shadow-aqua-500/20"
            >
                <Plus size={16} /> Receive Stock
            </button>
          </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-aqua-800/50 border border-gray-200 dark:border-aqua-700 p-4 rounded-xl relative overflow-hidden group shadow-sm">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <Building2 size={48} className="text-gray-900 dark:text-white" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-xs">Total {category} Stock</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{totalStock.toLocaleString()} <span className="text-sm text-gray-500 font-normal">Tons</span></p>
            <p className="text-green-500 text-[10px] mt-1 flex items-center gap-1"><ArrowUpRight size={10}/> +2.5% vs last month</p>
        </div>
        <div className="bg-white dark:bg-aqua-800/50 border border-gray-200 dark:border-aqua-700 p-4 rounded-xl shadow-sm">
            <p className="text-gray-500 dark:text-gray-400 text-xs">Warehouses in {selectedRegion}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{locations.length}</p>
            <p className="text-aqua-600 dark:text-aqua-400 text-[10px] mt-1 flex items-center gap-1"><Navigation size={10}/> Across 5 districts</p>
        </div>
         <div className="bg-white dark:bg-aqua-800/50 border border-gray-200 dark:border-aqua-700 p-4 rounded-xl shadow-sm">
            <p className="text-gray-500 dark:text-gray-400 text-xs">Capacity Utilization</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">68%</p>
            <div className="w-full bg-gray-200 dark:bg-aqua-900 h-1 rounded-full mt-2">
                <div className="bg-yellow-500 h-1 rounded-full" style={{ width: '68%' }}></div>
            </div>
        </div>
         <div className="bg-white dark:bg-aqua-800/50 border border-gray-200 dark:border-aqua-700 p-4 rounded-xl shadow-sm">
            <p className="text-gray-500 dark:text-gray-400 text-xs">Critical Low Stock</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">1 <span className="text-sm font-normal text-gray-500">Location</span></p>
            <p className="text-red-500 text-[10px] mt-1 font-bold">Vizag Hub needs refill</p>
        </div>
      </div>

      {/* Regional Breakdown (Andhra Pradesh) */}
      <div className="bg-white dark:bg-aqua-800/40 border border-gray-200 dark:border-aqua-700 rounded-xl p-4 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <MapPin className="text-aqua-600 dark:text-aqua-400" size={18}/> 
              Regional Stock Distribution: {selectedRegion}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
              {locations.map((loc) => {
                  const utilization = (loc.stock / loc.capacity) * 100;
                  let statusColor = 'bg-green-500';
                  if(loc.status === 'Low Stock') statusColor = 'bg-yellow-500';
                  if(loc.status === 'Critical') statusColor = 'bg-red-500';

                  return (
                      <div key={loc.id} className="bg-gray-50 dark:bg-aqua-900/80 border border-gray-200 dark:border-aqua-700 p-3 rounded-lg hover:border-aqua-500 transition-all group">
                          <div className="flex justify-between items-start mb-1.5">
                              <div>
                                  <h4 className="font-bold text-gray-900 dark:text-white text-sm">{loc.city}</h4>
                                  <p className="text-[10px] text-gray-500 dark:text-gray-400">{loc.type}</p>
                              </div>
                              <span className={`h-2 w-2 rounded-full ${statusColor} ring-1 ring-white dark:ring-aqua-900`}></span>
                          </div>
                          
                          <div className="mt-2 space-y-1">
                              <div className="flex justify-between text-[10px]">
                                  <span className="text-gray-500 dark:text-gray-400">Stock</span>
                                  <span className="text-gray-900 dark:text-white font-bold">{loc.stock} {loc.unit}</span>
                              </div>
                              <div className="w-full bg-gray-200 dark:bg-aqua-950 h-1.5 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full rounded-full transition-all duration-500 ${statusColor}`} 
                                    style={{ width: `${utilization}%` }}
                                  ></div>
                              </div>
                              <div className="flex justify-between text-[10px] text-gray-500">
                                  <span>0</span>
                                  <span>Cap: {loc.capacity}</span>
                              </div>
                          </div>

                          <div className="mt-3 pt-2 border-t border-gray-200 dark:border-aqua-800/50">
                              <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Top Items</p>
                              <div className="space-y-0.5">
                                  {loc.items.slice(0, 3).map((item, idx) => (
                                      <div key={idx} className="flex justify-between text-[10px] text-gray-600 dark:text-gray-300">
                                          <span>{item.name}</span>
                                          <span>{item.qty}</span>
                                      </div>
                                  ))}
                              </div>
                          </div>
                      </div>
                  );
              })}
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Col: Detailed Table */}
        <div className="lg:col-span-2 space-y-4">
            <div className="bg-white dark:bg-aqua-800/50 border border-gray-200 dark:border-aqua-700 rounded-xl overflow-hidden shadow-sm">
                <div className="p-4 border-b border-gray-200 dark:border-aqua-700 flex justify-between items-center">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">Location-wise Inventory Details</h3>
                    <button className="text-[10px] bg-gray-100 dark:bg-aqua-900 text-aqua-600 dark:text-aqua-400 px-2 py-1 rounded border border-gray-200 dark:border-aqua-700 hover:bg-gray-200 dark:hover:text-white transition-colors">Export CSV</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                        <thead className="bg-gray-50 dark:bg-aqua-900/50 text-gray-500 dark:text-gray-400 uppercase text-[10px]">
                            <tr>
                                <th className="px-4 py-3">Location</th>
                                <th className="px-4 py-3">Item Name</th>
                                <th className="px-4 py-3">SKU</th>
                                <th className="px-4 py-3">Available Qty</th>
                                <th className="px-4 py-3">Incoming</th>
                                <th className="px-4 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-aqua-700 text-gray-700 dark:text-gray-300">
                            {locations.flatMap(loc => 
                                loc.items.map((item, idx) => (
                                    <tr key={`${loc.id}-${idx}`} className="hover:bg-gray-50 dark:hover:bg-aqua-900/20 transition-colors">
                                        <td className="px-4 py-2.5 font-bold text-aqua-600 dark:text-aqua-400">{idx === 0 ? loc.city : ''}</td>
                                        <td className="px-4 py-2.5">{item.name}</td>
                                        <td className="px-4 py-2.5 text-gray-500">{item.sku}</td>
                                        <td className="px-4 py-2.5 font-bold text-gray-900 dark:text-white">{item.qty} {loc.unit === 'kL' && item.sku.includes('LIQ') ? 'kL' : 'Tons'}</td>
                                        <td className="px-4 py-2.5 text-gray-400">-</td>
                                        <td className="px-4 py-2.5">
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${loc.status === 'Healthy' ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400' : loc.status === 'Low Stock' ? 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400' : 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400'}`}>
                                                {loc.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-white dark:bg-aqua-800/50 border border-gray-200 dark:border-aqua-700 rounded-xl p-4 shadow-sm">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Demand Forecasting vs Stock (Regional)</h3>
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={forecastData}>
                            <CartesianGrid stroke="#374151" strokeDasharray="3 3" strokeOpacity={0.2} />
                            <XAxis dataKey="name" stroke="#9ca3af" fontSize={10} />
                            <YAxis stroke="#9ca3af" fontSize={10} />
                            <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', fontSize: '12px', color: '#fff' }} />
                            <Legend wrapperStyle={{fontSize: '12px'}}/>
                            <Bar dataKey="stock" name="Available Stock" barSize={16} fill="#13c8ec" />
                            <Line type="monotone" dataKey="demand" name="Projected Demand" stroke="#f59e0b" strokeWidth={2} />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>

        {/* Right Col: Map & Suppliers */}
        <div className="space-y-4">
             <div className="bg-white dark:bg-aqua-800/50 border border-gray-200 dark:border-aqua-700 rounded-xl p-4 shadow-sm">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Top Suppliers ({category})</h3>
                <ul className="space-y-3">
                    <li className="flex justify-between items-center">
                        <div>
                            <p className="text-gray-900 dark:text-white font-medium text-xs">Bhimavaram Feeds Ltd.</p>
                            <p className="text-[10px] text-gray-500 dark:text-gray-400">On-time: 99%</p>
                        </div>
                        <div className="text-right">
                            <p className="text-green-600 dark:text-green-400 font-medium text-xs">Preferred</p>
                            <p className="text-[10px] text-gray-500 dark:text-gray-400">Vol: 500T/mo</p>
                        </div>
                    </li>
                    <li className="flex justify-between items-center">
                        <div>
                            <p className="text-gray-900 dark:text-white font-medium text-xs">Nellore Biotech</p>
                            <p className="text-[10px] text-gray-500 dark:text-gray-400">On-time: 92%</p>
                        </div>
                        <div className="text-right">
                            <p className="text-yellow-600 dark:text-yellow-400 font-medium text-xs">Good</p>
                            <p className="text-[10px] text-gray-500 dark:text-gray-400">Vol: 120T/mo</p>
                        </div>
                    </li>
                    <li className="flex justify-between items-center">
                        <div>
                            <p className="text-gray-900 dark:text-white font-medium text-xs">Costal Logistics Inc</p>
                            <p className="text-[10px] text-gray-500 dark:text-gray-400">On-time: 85%</p>
                        </div>
                        <div className="text-right">
                            <p className="text-orange-600 dark:text-orange-400 font-medium text-xs">Review</p>
                            <p className="text-[10px] text-gray-500 dark:text-gray-400">Vol: 50T/mo</p>
                        </div>
                    </li>
                </ul>
            </div>

            <div className="bg-white dark:bg-aqua-800/50 border border-gray-200 dark:border-aqua-700 rounded-xl p-4 shadow-sm">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Stock Valuation</h3>
                <div className="h-40 w-full flex justify-center">
                     <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie 
                                data={locations} 
                                dataKey="stock" 
                                nameKey="city"
                                innerRadius={35} 
                                outerRadius={60} 
                                paddingAngle={5}
                            >
                                {locations.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none"/>
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', fontSize: '12px', color: '#fff' }} />
                            <Legend verticalAlign="bottom" height={36} iconSize={8} wrapperStyle={{fontSize: '10px'}}/>
                        </PieChart>
                   </ResponsiveContainer>
                </div>
            </div>
        </div>
      </div>

      {/* --- SLIDE-OVER: RECEIVE STOCK (GRN) --- */}
      <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isReceiveOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <div 
            className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isReceiveOpen ? 'opacity-100' : 'opacity-0'}`}
            onClick={() => setIsReceiveOpen(false)}
        />
        <div className={`absolute right-0 top-0 h-full w-full md:w-[500px] bg-white dark:bg-aqua-900 border-l border-gray-200 dark:border-aqua-700 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${isReceiveOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            
            {/* Header */}
            <div className="p-5 border-b border-gray-200 dark:border-aqua-700 bg-gray-50 dark:bg-aqua-800 flex justify-between items-center">
                <div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Package size={20} className="text-aqua-600 dark:text-aqua-400"/> Receive Stock (GRN)
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Log incoming inventory from suppliers.</p>
                </div>
                <button onClick={() => setIsReceiveOpen(false)} className="p-1.5 hover:bg-gray-200 dark:hover:bg-aqua-700 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    <X size={20} />
                </button>
            </div>

            {/* Form */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* Section 1: Source Info */}
                <section className="space-y-3">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200 dark:border-aqua-800 pb-1 flex items-center gap-2">
                        <Truck size={12} /> Supplier & Logistics
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs text-gray-700 dark:text-aqua-100 mb-1.5 font-medium">Supplier <span className="text-red-400">*</span></label>
                            <select 
                                className="w-full bg-white dark:bg-aqua-800 border border-gray-300 dark:border-aqua-700 rounded-lg p-2.5 text-sm text-gray-900 dark:text-white focus:border-aqua-500 focus:outline-none appearance-none"
                                value={grnForm.supplierId}
                                onChange={(e) => setGrnForm({...grnForm, supplierId: e.target.value})}
                            >
                                <option value="" disabled>Select Supplier</option>
                                {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </select>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs text-gray-700 dark:text-aqua-100 mb-1.5 font-medium">Date Received</label>
                                <input 
                                    type="date" 
                                    className="w-full bg-white dark:bg-aqua-800 border border-gray-300 dark:border-aqua-700 rounded-lg p-2.5 text-sm text-gray-900 dark:text-white focus:border-aqua-500 focus:outline-none"
                                    value={grnForm.date}
                                    onChange={(e) => setGrnForm({...grnForm, date: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-700 dark:text-aqua-100 mb-1.5 font-medium">Invoice / GRN Ref</label>
                                <div className="relative">
                                    <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
                                    <input 
                                        type="text" 
                                        className="w-full bg-white dark:bg-aqua-800 border border-gray-300 dark:border-aqua-700 rounded-lg pl-9 pr-3 py-2.5 text-sm text-gray-900 dark:text-white focus:border-aqua-500 focus:outline-none"
                                        placeholder="#GRN-..."
                                        value={grnForm.invoiceNo}
                                        onChange={(e) => setGrnForm({...grnForm, invoiceNo: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 2: Stock Details */}
                <section className="space-y-3">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200 dark:border-aqua-800 pb-1 flex items-center gap-2">
                        <Building2 size={12} /> Inventory Assignment
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs text-gray-700 dark:text-aqua-100 mb-1.5 font-medium">Receiving Warehouse <span className="text-red-400">*</span></label>
                            <select 
                                className="w-full bg-white dark:bg-aqua-800 border border-gray-300 dark:border-aqua-700 rounded-lg p-2.5 text-sm text-gray-900 dark:text-white focus:border-aqua-500 focus:outline-none appearance-none"
                                value={grnForm.locationId}
                                onChange={(e) => setGrnForm({...grnForm, locationId: e.target.value})}
                            >
                                <option value="" disabled>Select Warehouse</option>
                                {locations.map(l => <option key={l.id} value={l.id}>{l.city} ({l.type})</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs text-gray-700 dark:text-aqua-100 mb-1.5 font-medium">Product <span className="text-red-400">*</span></label>
                            <select 
                                className="w-full bg-white dark:bg-aqua-800 border border-gray-300 dark:border-aqua-700 rounded-lg p-2.5 text-sm text-gray-900 dark:text-white focus:border-aqua-500 focus:outline-none appearance-none"
                                value={grnForm.productSku}
                                onChange={(e) => setGrnForm({...grnForm, productSku: e.target.value})}
                            >
                                <option value="" disabled>Select Item</option>
                                {products.map(p => <option key={p.sku} value={p.sku}>{p.name} (SKU: {p.sku})</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs text-gray-700 dark:text-aqua-100 mb-1.5 font-medium">Quantity Received <span className="text-red-400">*</span></label>
                            <div className="relative">
                                <input 
                                    type="number" 
                                    className="w-full bg-white dark:bg-aqua-800 border border-gray-300 dark:border-aqua-700 rounded-lg p-2.5 pr-16 text-sm text-gray-900 dark:text-white focus:border-aqua-500 focus:outline-none font-bold"
                                    placeholder="0.00"
                                    value={grnForm.quantity || ''}
                                    onChange={(e) => setGrnForm({...grnForm, quantity: parseFloat(e.target.value)})}
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 font-medium">
                                    {grnForm.productSku ? products.find(p => p.sku === grnForm.productSku)?.unit : 'Units'}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 dark:border-aqua-700 bg-gray-50 dark:bg-aqua-800 flex gap-3">
                <button onClick={() => setIsReceiveOpen(false)} className="flex-1 py-2.5 rounded-xl font-bold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-aqua-700 transition-colors text-sm">
                    Cancel
                </button>
                <button 
                    onClick={handleReceiveStock}
                    className="flex-1 bg-aqua-500 hover:bg-aqua-400 text-white dark:text-aqua-950 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-aqua-500/20 transition-all text-sm"
                >
                    <Save size={18} /> Update Inventory
                </button>
            </div>
        </div>
      </div>

    </div>
  );
};

export default InventoryIntelligence;
