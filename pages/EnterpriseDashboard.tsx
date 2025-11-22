
import React from 'react';
import { TrendingUp, ArrowRightCircle, AlertTriangle, DollarSign } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
    <div className="space-y-4 max-w-[1920px] mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Enterprise Dashboard</h2>
          <p className="text-gray-500 dark:text-aqua-400 text-xs mt-1">Complete oversight of aquaculture operations</p>
        </div>
        <div className="flex gap-2">
           <select className="bg-white dark:bg-aqua-800 border border-gray-200 dark:border-aqua-700 text-xs rounded-lg px-3 py-1.5 focus:ring-aqua-500 text-gray-700 dark:text-white shadow-sm">
             <option>Last 30 Days</option>
             <option>This Quarter</option>
             <option>Year to Date</option>
           </select>
        </div>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-aqua-800/50 border border-gray-200 dark:border-aqua-700 p-4 rounded-xl hover:shadow-md dark:hover:bg-aqua-800/80 transition-all duration-300 group">
          <div className="flex justify-between items-start">
            <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase group-hover:text-aqua-600 dark:group-hover:text-aqua-400">Total Revenue</p>
            <TrendingUp className="text-green-500 h-4 w-4" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">$2,450,320</h3>
          <p className="text-[10px] text-green-500 mt-1 font-medium">+12.5% vs last month</p>
        </div>

        <div className="bg-white dark:bg-aqua-800/50 border border-gray-200 dark:border-aqua-700 p-4 rounded-xl hover:shadow-md dark:hover:bg-aqua-800/80 transition-all duration-300 group">
          <div className="flex justify-between items-start">
            <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase group-hover:text-aqua-600 dark:group-hover:text-aqua-400">Net Profit</p>
            <TrendingUp className="text-green-500 h-4 w-4" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">$834,115</h3>
          <p className="text-[10px] text-green-500 mt-1 font-medium">+8.2% vs last month</p>
        </div>

        <div className="bg-white dark:bg-aqua-800/50 border border-gray-200 dark:border-aqua-700 p-4 rounded-xl hover:shadow-md dark:hover:bg-aqua-800/80 transition-all duration-300 group">
          <div className="flex justify-between items-start">
            <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase group-hover:text-aqua-600 dark:group-hover:text-aqua-400">Accounts Receivable</p>
            <DollarSign className="text-yellow-500 h-4 w-4" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">$120,500</h3>
          <p className="text-[10px] text-yellow-500 mt-1 font-medium">Due in next 30 days</p>
        </div>

        <div className="bg-white dark:bg-aqua-800/50 border border-gray-200 dark:border-aqua-700 p-4 rounded-xl hover:shadow-md dark:hover:bg-aqua-800/80 transition-all duration-300 group">
          <div className="flex justify-between items-start">
            <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase group-hover:text-aqua-600 dark:group-hover:text-aqua-400">Accounts Payable</p>
            <ArrowRightCircle className="text-red-500 h-4 w-4" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">$55,800</h3>
          <p className="text-[10px] text-red-500 mt-1 font-medium">Due in next 30 days</p>
        </div>
      </div>

      {/* Charts and Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-aqua-800/50 border border-gray-200 dark:border-aqua-700 p-4 rounded-xl shadow-sm">
           <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Financial Performance</h3>
           <div className="h-72 w-full">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={data}>
                 <defs>
                   <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#13c8ec" stopOpacity={0.3}/>
                     <stop offset="95%" stopColor="#13c8ec" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" stroke="#374151" strokeOpacity={0.2} />
                 <XAxis dataKey="name" stroke="#9ca3af" fontSize={10} />
                 <YAxis stroke="#9ca3af" fontSize={10} />
                 <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff', fontSize: '12px' }}
                    itemStyle={{ color: '#13c8ec' }}
                 />
                 <Area type="monotone" dataKey="revenue" stroke="#13c8ec" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={2} />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white dark:bg-aqua-800/50 border border-gray-200 dark:border-aqua-700 p-4 rounded-xl shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <AlertTriangle className="text-orange-500" size={16} />
            Low Stock Alerts
          </h3>
          <div className="space-y-3">
            {[
                { name: 'Grower Feed 2mm', sku: 'FD-GR-002', stock: '12 tons', threshold: '20 tons', urgent: true },
                { name: 'Vannamei Seed', sku: 'SD-VN-001', stock: '5M PL', threshold: '10M PL', urgent: true },
                { name: 'Probiotic Med', sku: 'MD-PB-003', stock: '25 kg', threshold: '20 kg', urgent: false },
            ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 bg-gray-50 dark:bg-aqua-900/50 rounded-lg border border-gray-200 dark:border-aqua-700/50 hover:border-aqua-500 dark:hover:border-aqua-600 transition-colors">
                    <div>
                        <p className="font-bold text-gray-800 dark:text-white text-xs">{item.name}</p>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400">{item.sku}</p>
                    </div>
                    <div className="text-right">
                        <p className={`font-bold text-xs ${item.urgent ? 'text-red-500' : 'text-yellow-600 dark:text-yellow-500'}`}>{item.stock}</p>
                        <p className="text-[10px] text-gray-500">Min: {item.threshold}</p>
                    </div>
                </div>
            ))}
          </div>
          <button className="w-full mt-3 py-1.5 text-xs font-medium text-aqua-600 dark:text-aqua-400 hover:text-aqua-700 dark:hover:text-aqua-300 hover:bg-aqua-50 dark:hover:bg-aqua-900/50 rounded-lg transition-colors">
              View All Alerts
          </button>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white dark:bg-aqua-800/50 border border-gray-200 dark:border-aqua-700 rounded-xl overflow-hidden shadow-sm">
          <div className="p-4 border-b border-gray-200 dark:border-aqua-700">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">Recent Orders</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 dark:bg-aqua-900/80 text-gray-500 dark:text-gray-400 uppercase text-[10px]">
                    <tr>
                        <th className="px-4 py-3 font-bold">Order ID</th>
                        <th className="px-4 py-3 font-bold">Customer</th>
                        <th className="px-4 py-3 font-bold">Amount</th>
                        <th className="px-4 py-3 font-bold">Status</th>
                        <th className="px-4 py-3 font-bold text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-aqua-700 text-gray-700 dark:text-gray-300">
                    {[
                        { id: '#AQR-8765', customer: 'Green Farms', amount: '$2,540', status: 'Delivered' },
                        { id: '#AQR-8764', customer: 'Coastal Prawns', amount: '$1,200', status: 'Pending' },
                        { id: '#AQR-8763', customer: 'Aqua Growers', amount: '$5,800', status: 'Shipped' },
                    ].map((order, i) => (
                        <tr key={i} className="hover:bg-gray-50 dark:hover:bg-aqua-700/30 transition-colors text-xs">
                            <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{order.id}</td>
                            <td className="px-4 py-3">{order.customer}</td>
                            <td className="px-4 py-3">{order.amount}</td>
                            <td className="px-4 py-3">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold
                                    ${order.status === 'Delivered' ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' : 
                                      order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400' : 
                                      'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400'}`}>
                                    {order.status}
                                </span>
                            </td>
                            <td className="px-4 py-3 text-right">
                                <button className="text-aqua-600 dark:text-aqua-400 hover:text-aqua-800 dark:hover:text-white text-[10px]">View</button>
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
