import React from 'react';
import { TrendingUp, ArrowRightCircle, AlertTriangle, DollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
  { name: 'Jan', revenue: 4000, profit: 2400 },
  { name: 'Feb', revenue: 3000, profit: 1398 },
  { name: 'Mar', revenue: 2000, profit: 9800 },
  { name: 'Apr', revenue: 2780, profit: 3908 },
  { name: 'May', revenue: 1890, profit: 4800 },
  { name: 'Jun', revenue: 2390, profit: 3800 },
  { name: 'Jul', revenue: 3490, profit: 4300 },
];

const EnterpriseDashboard: React.FC = () => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">Enterprise Dashboard</h2>
          <p className="text-aqua-400 mt-1">Complete oversight of aquaculture operations</p>
        </div>
        <div className="flex gap-2">
           <select className="bg-aqua-800 border border-aqua-700 text-sm rounded-lg px-3 py-2 focus:ring-aqua-500">
             <option>Last 30 Days</option>
             <option>This Quarter</option>
             <option>Year to Date</option>
           </select>
        </div>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-aqua-800/50 border border-aqua-700 p-6 rounded-2xl hover:bg-aqua-800/80 transition-all duration-300 group">
          <div className="flex justify-between items-start">
            <p className="text-sm font-medium text-gray-400 group-hover:text-aqua-400">Total Revenue</p>
            <TrendingUp className="text-green-500 h-5 w-5" />
          </div>
          <h3 className="text-3xl font-bold text-white mt-4">$2,450,320</h3>
          <p className="text-xs text-green-500 mt-2 font-medium">+12.5% vs last month</p>
        </div>

        <div className="bg-aqua-800/50 border border-aqua-700 p-6 rounded-2xl hover:bg-aqua-800/80 transition-all duration-300 group">
          <div className="flex justify-between items-start">
            <p className="text-sm font-medium text-gray-400 group-hover:text-aqua-400">Net Profit</p>
            <TrendingUp className="text-green-500 h-5 w-5" />
          </div>
          <h3 className="text-3xl font-bold text-white mt-4">$834,115</h3>
          <p className="text-xs text-green-500 mt-2 font-medium">+8.2% vs last month</p>
        </div>

        <div className="bg-aqua-800/50 border border-aqua-700 p-6 rounded-2xl hover:bg-aqua-800/80 transition-all duration-300 group">
          <div className="flex justify-between items-start">
            <p className="text-sm font-medium text-gray-400 group-hover:text-aqua-400">Accounts Receivable</p>
            <DollarSign className="text-yellow-500 h-5 w-5" />
          </div>
          <h3 className="text-3xl font-bold text-white mt-4">$120,500</h3>
          <p className="text-xs text-yellow-500 mt-2 font-medium">Due in next 30 days</p>
        </div>

        <div className="bg-aqua-800/50 border border-aqua-700 p-6 rounded-2xl hover:bg-aqua-800/80 transition-all duration-300 group">
          <div className="flex justify-between items-start">
            <p className="text-sm font-medium text-gray-400 group-hover:text-aqua-400">Accounts Payable</p>
            <ArrowRightCircle className="text-red-500 h-5 w-5" />
          </div>
          <h3 className="text-3xl font-bold text-white mt-4">$55,800</h3>
          <p className="text-xs text-red-500 mt-2 font-medium">Due in next 30 days</p>
        </div>
      </div>

      {/* Charts and Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-aqua-800/50 border border-aqua-700 p-6 rounded-2xl">
           <h3 className="text-lg font-bold text-white mb-6">Financial Performance</h3>
           <div className="h-80 w-full">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={data}>
                 <defs>
                   <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#13c8ec" stopOpacity={0.3}/>
                     <stop offset="95%" stopColor="#13c8ec" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" stroke="#234248" />
                 <XAxis dataKey="name" stroke="#92c0c9" fontSize={12} />
                 <YAxis stroke="#92c0c9" fontSize={12} />
                 <Tooltip 
                    contentStyle={{ backgroundColor: '#152a2e', borderColor: '#234248', color: '#fff' }}
                    itemStyle={{ color: '#13c8ec' }}
                 />
                 <Area type="monotone" dataKey="revenue" stroke="#13c8ec" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={3} />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-aqua-800/50 border border-aqua-700 p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="text-orange-500" size={20} />
            Low Stock Alerts
          </h3>
          <div className="space-y-4">
            {[
                { name: 'Grower Feed 2mm', sku: 'FD-GR-002', stock: '12 tons', threshold: '20 tons', urgent: true },
                { name: 'Vannamei Seed', sku: 'SD-VN-001', stock: '5M PL', threshold: '10M PL', urgent: true },
                { name: 'Probiotic Med', sku: 'MD-PB-003', stock: '25 kg', threshold: '20 kg', urgent: false },
            ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-aqua-900/50 rounded-lg border border-aqua-700/50 hover:border-aqua-600 transition-colors">
                    <div>
                        <p className="font-semibold text-white text-sm">{item.name}</p>
                        <p className="text-xs text-gray-400">{item.sku}</p>
                    </div>
                    <div className="text-right">
                        <p className={`font-bold text-sm ${item.urgent ? 'text-red-500' : 'text-yellow-500'}`}>{item.stock}</p>
                        <p className="text-[10px] text-gray-500">Threshold: {item.threshold}</p>
                    </div>
                </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-sm font-medium text-aqua-400 hover:text-aqua-300 hover:bg-aqua-900/50 rounded-lg transition-colors">
              View All Alerts
          </button>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-aqua-800/50 border border-aqua-700 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-aqua-700">
            <h3 className="text-lg font-bold text-white">Recent Orders</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="bg-aqua-900/80 text-gray-400 uppercase text-xs">
                    <tr>
                        <th className="px-6 py-4 font-medium">Order ID</th>
                        <th className="px-6 py-4 font-medium">Customer</th>
                        <th className="px-6 py-4 font-medium">Amount</th>
                        <th className="px-6 py-4 font-medium">Status</th>
                        <th className="px-6 py-4 font-medium text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-aqua-700 text-gray-300">
                    {[
                        { id: '#AQR-8765', customer: 'Green Farms', amount: '$2,540', status: 'Delivered' },
                        { id: '#AQR-8764', customer: 'Coastal Prawns', amount: '$1,200', status: 'Pending' },
                        { id: '#AQR-8763', customer: 'Aqua Growers', amount: '$5,800', status: 'Shipped' },
                    ].map((order, i) => (
                        <tr key={i} className="hover:bg-aqua-700/30 transition-colors">
                            <td className="px-6 py-4 font-medium text-white">{order.id}</td>
                            <td className="px-6 py-4">{order.customer}</td>
                            <td className="px-6 py-4">{order.amount}</td>
                            <td className="px-6 py-4">
                                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold
                                    ${order.status === 'Delivered' ? 'bg-green-500/20 text-green-400' : 
                                      order.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400' : 
                                      'bg-blue-500/20 text-blue-400'}`}>
                                    {order.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button className="text-aqua-400 hover:text-white">View</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
          </div>
      </div>
    </div>
  );
};

export default EnterpriseDashboard;