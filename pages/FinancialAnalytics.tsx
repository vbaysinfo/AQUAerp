import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const pieData = [
    { name: 'Feed', value: 540000, color: '#13c8ec' },
    { name: 'Seed', value: 320000, color: '#0d9488' },
    { name: 'Medicine', value: 210000, color: '#f59e0b' },
    { name: 'Consulting', value: 150000, color: '#6366f1' },
];

const FinancialAnalytics: React.FC = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
       <h2 className="text-3xl font-bold text-white">Financial Analytics Dashboard</h2>
       
       {/* Stats Row */}
       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           {['Total Revenue', 'Gross Profit', 'Net Profit Margin', 'ARPU'].map((label, i) => (
               <div key={i} className="bg-aqua-800/50 border border-aqua-700 p-6 rounded-xl">
                   <p className="text-gray-400 text-sm">{label}</p>
                   <p className="text-2xl font-bold text-white mt-2">${(Math.random() * 10000).toFixed(0)},000</p>
               </div>
           ))}
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           {/* Pie Chart */}
           <div className="bg-aqua-800/50 border border-aqua-700 p-6 rounded-xl h-96">
               <h3 className="font-bold text-white mb-4">Revenue by Product</h3>
               <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie 
                            data={pieData} 
                            innerRadius={60} 
                            outerRadius={100} 
                            paddingAngle={5} 
                            dataKey="value"
                        >
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} stroke="none"/>
                            ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#152a2e', borderColor: '#234248' }} itemStyle={{color: '#fff'}} />
                        <Legend verticalAlign="bottom" height={36}/>
                    </PieChart>
               </ResponsiveContainer>
           </div>

           {/* P&L Summary */}
           <div className="bg-aqua-800/50 border border-aqua-700 p-6 rounded-xl">
               <h3 className="font-bold text-white mb-4">P&L Statement Summary</h3>
               <table className="w-full text-sm text-left">
                   <thead className="bg-aqua-900/50 text-gray-400 uppercase text-xs">
                       <tr>
                           <th className="px-4 py-3">Account</th>
                           <th className="px-4 py-3 text-right">This Month</th>
                           <th className="px-4 py-3 text-right">Change</th>
                       </tr>
                   </thead>
                   <tbody className="text-gray-300 divide-y divide-aqua-700">
                       <tr>
                           <td className="px-4 py-3 font-medium text-white">Revenue</td>
                           <td className="px-4 py-3 text-right">$1,280,450</td>
                           <td className="px-4 py-3 text-right text-green-400">+5.2%</td>
                       </tr>
                        <tr>
                           <td className="px-4 py-3 font-medium text-white">COGS</td>
                           <td className="px-4 py-3 text-right">$512,180</td>
                           <td className="px-4 py-3 text-right text-green-400">+1.0%</td>
                       </tr>
                       <tr>
                           <td className="px-4 py-3 font-medium text-white">Gross Profit</td>
                           <td className="px-4 py-3 text-right">$768,270</td>
                           <td className="px-4 py-3 text-right text-green-400">+8.1%</td>
                       </tr>
                        <tr>
                           <td className="px-4 py-3 font-medium text-white">Operating Expenses</td>
                           <td className="px-4 py-3 text-right">$454,990</td>
                           <td className="px-4 py-3 text-right text-red-400">+7.4%</td>
                       </tr>
                   </tbody>
               </table>
           </div>
       </div>
    </div>
  );
};

export default FinancialAnalytics;