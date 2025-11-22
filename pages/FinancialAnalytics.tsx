
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, AreaChart, Area, CartesianGrid, XAxis, YAxis } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, AlertTriangle, Sparkles, ThumbsUp, ThumbsDown, ArrowRight, Layers, Sprout, Pill, Package, Users, BarChart } from 'lucide-react';

interface FinancialAnalyticsProps {
    category?: 'General' | 'Feed' | 'Seed' | 'Medicine';
}

// Mock Data Generation
const generateTrendData = (category: string) => {
    const base = category === 'General' ? 100000 : 30000;
    return [
        { name: 'Jan', revenue: base + Math.random() * 5000, profit: (base * 0.3) + Math.random() * 1000 },
        { name: 'Feb', revenue: base + Math.random() * 8000, profit: (base * 0.32) + Math.random() * 2000 },
        { name: 'Mar', revenue: base + Math.random() * 10000, profit: (base * 0.35) + Math.random() * 3000 },
        { name: 'Apr', revenue: base + Math.random() * 6000, profit: (base * 0.31) + Math.random() * 1500 },
        { name: 'May', revenue: base + Math.random() * 12000, profit: (base * 0.38) + Math.random() * 4000 },
        { name: 'Jun', revenue: base + Math.random() * 15000, profit: (base * 0.4) + Math.random() * 5000 },
    ];
};

const productPerformance = {
    'Feed': {
        top: [
            { name: 'Grower Feed 2mm', revenue: '$125,000', margin: '22%', trend: 'up' },
            { name: 'Starter Feed 1mm', revenue: '$85,000', margin: '28%', trend: 'up' },
        ],
        bad: [
            { name: 'Generic Bran Mix', revenue: '$12,000', margin: '8%', trend: 'down', reason: 'Low Demand' },
            { name: 'Eco-Bulk 5mm', revenue: '$8,500', margin: '5%', trend: 'down', reason: 'High Returns' },
        ],
        popular: ['Grower Feed 2mm', 'Starter Feed 1mm', 'Finisher Pro']
    },
    'Seed': {
        top: [
            { name: 'Vannamei PL15', revenue: '$95,000', margin: '45%', trend: 'up' },
            { name: 'Tiger Prawn PL', revenue: '$45,000', margin: '40%', trend: 'stable' },
        ],
        bad: [
            { name: 'Local Hatchery Mix', revenue: '$5,000', margin: '15%', trend: 'down', reason: 'Poor Survival Rate' },
        ],
        popular: ['Vannamei PL15', 'Vannamei PL10']
    },
    'Medicine': {
        top: [
            { name: 'GutWell Probiotic', revenue: '$32,000', margin: '55%', trend: 'up' },
            { name: 'AquaMin Minerals', revenue: '$28,000', margin: '35%', trend: 'up' },
        ],
        bad: [
            { name: 'Old Gen Antibiotic', revenue: '$1,200', margin: '60%', trend: 'down', reason: 'Regulatory Ban' },
        ],
        popular: ['GutWell Probiotic', 'Oxygen Tablets', 'pH Buffer']
    },
    'General': {
        top: [
            { name: 'Grower Feed 2mm', revenue: '$125,000', margin: '22%', trend: 'up' },
            { name: 'Vannamei PL15', revenue: '$95,000', margin: '45%', trend: 'up' },
        ],
        bad: [
            { name: 'Generic Bran Mix', revenue: '$12,000', margin: '8%', trend: 'down', reason: 'Low Demand' },
        ],
        popular: ['Grower Feed 2mm', 'Vannamei PL15', 'GutWell Probiotic']
    }
};

const predictions = {
    'General': { text: 'Overall revenue is projected to grow by 12% next quarter due to peak harvest season demand.', sentiment: 'positive' },
    'Feed': { text: 'Raw material costs for Soy are rising. Recommend stocking up now to maintain 22% margin in Q4.', sentiment: 'warning' },
    'Seed': { text: 'High demand for Vannamei PL15 expected in Coastal Andhra. Increase stock by 20%.', sentiment: 'positive' },
    'Medicine': { text: 'Probiotic sales correlate with recent rainfalls. Expect 15% surge in water treatment sales.', sentiment: 'positive' }
};

const COLORS = ['#13c8ec', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const FinancialAnalytics: React.FC<FinancialAnalyticsProps> = ({ category = 'General' }) => {
  
  const trendData = generateTrendData(category);
  const products = productPerformance[category as keyof typeof productPerformance] || productPerformance['General'];
  const prediction = predictions[category as keyof typeof predictions] || predictions['General'];

  // Pie Data based on category
  const getPieData = () => {
      if (category === 'General') return [
          { name: 'Feed', value: 55, color: '#13c8ec' },
          { name: 'Seed', value: 25, color: '#10b981' },
          { name: 'Medicine', value: 15, color: '#f59e0b' },
          { name: 'Services', value: 5, color: '#8b5cf6' },
      ];
      return [
          { name: 'Direct Sales', value: 60, color: '#13c8ec' },
          { name: 'Distributors', value: 30, color: '#10b981' },
          { name: 'Online/App', value: 10, color: '#f59e0b' },
      ];
  };

  return (
    <div className="space-y-4 max-w-[1920px] mx-auto pb-6">
       
       {/* Header */}
       <div className="flex flex-col md:flex-row justify-between items-end gap-4">
           <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    {category === 'General' ? <BarChart size={24} className="text-aqua-600 dark:text-aqua-400"/> : 
                     category === 'Feed' ? <Layers size={24} className="text-aqua-600 dark:text-aqua-400"/> :
                     category === 'Seed' ? <Sprout size={24} className="text-aqua-600 dark:text-aqua-400"/> :
                     <Pill size={24} className="text-aqua-600 dark:text-aqua-400"/>}
                    {category} Financial Analytics
                </h2>
                <p className="text-gray-500 dark:text-aqua-400 text-xs mt-1">Profitability, cost analysis, and product performance for {category}.</p>
           </div>
           
           {/* AI Prediction Widget */}
           <div className="bg-gradient-to-r from-purple-600/90 to-indigo-600/90 dark:from-purple-900/80 dark:to-indigo-900/80 border border-purple-500/50 p-3 rounded-xl shadow-lg max-w-md w-full md:w-auto animate-in fade-in slide-in-from-right-4">
               <div className="flex items-start gap-3">
                   <div className="bg-white/20 dark:bg-purple-500/20 p-2 rounded-lg shrink-0">
                       <Sparkles size={18} className="text-white dark:text-purple-400 animate-pulse"/>
                   </div>
                   <div>
                       <p className="text-[10px] font-bold text-purple-100 dark:text-purple-300 uppercase mb-1">AI Financial Forecast</p>
                       <p className="text-xs text-white leading-relaxed">{prediction.text}</p>
                   </div>
               </div>
           </div>
       </div>

       {/* KPI Cards */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
           <div className="bg-white dark:bg-aqua-800/50 border border-gray-200 dark:border-aqua-700 p-4 rounded-xl shadow-sm">
               <div className="flex justify-between items-start mb-2">
                   <p className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase">Total Revenue</p>
                   <div className="bg-green-100 dark:bg-green-500/20 p-1 rounded text-green-600 dark:text-green-400"><DollarSign size={14}/></div>
               </div>
               <p className="text-2xl font-bold text-gray-900 dark:text-white">$1,280,450</p>
               <p className="text-[10px] text-green-500 flex items-center gap-1 mt-1"><TrendingUp size={12}/> +5.2% vs last month</p>
           </div>
           <div className="bg-white dark:bg-aqua-800/50 border border-gray-200 dark:border-aqua-700 p-4 rounded-xl shadow-sm">
               <div className="flex justify-between items-start mb-2">
                   <p className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase">Net Profit</p>
                   <div className="bg-blue-100 dark:bg-blue-500/20 p-1 rounded text-blue-600 dark:text-blue-400"><DollarSign size={14}/></div>
               </div>
               <p className="text-2xl font-bold text-gray-900 dark:text-white">$345,120</p>
               <p className="text-[10px] text-green-500 flex items-center gap-1 mt-1"><TrendingUp size={12}/> +8.1% margin</p>
           </div>
           <div className="bg-white dark:bg-aqua-800/50 border border-gray-200 dark:border-aqua-700 p-4 rounded-xl shadow-sm">
               <div className="flex justify-between items-start mb-2">
                   <p className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase">Stock Value</p>
                   <div className="bg-yellow-100 dark:bg-yellow-500/20 p-1 rounded text-yellow-600 dark:text-yellow-400"><Package size={14}/></div>
               </div>
               <p className="text-2xl font-bold text-gray-900 dark:text-white">$512,000</p>
               <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">Current inventory assets</p>
           </div>
           <div className="bg-white dark:bg-aqua-800/50 border border-gray-200 dark:border-aqua-700 p-4 rounded-xl shadow-sm">
               <div className="flex justify-between items-start mb-2">
                   <p className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase">COGS</p>
                   <div className="bg-red-100 dark:bg-red-500/20 p-1 rounded text-red-600 dark:text-red-400"><TrendingDown size={14}/></div>
               </div>
               <p className="text-2xl font-bold text-gray-900 dark:text-white">$850,200</p>
               <p className="text-[10px] text-red-500 flex items-center gap-1 mt-1"><AlertTriangle size={12}/> +2% cost increase</p>
           </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
           {/* Main Revenue Trend */}
           <div className="lg:col-span-2 bg-white dark:bg-aqua-800/50 border border-gray-200 dark:border-aqua-700 p-4 rounded-xl shadow-sm">
               <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-sm flex items-center gap-2">
                   <TrendingUp size={16} className="text-aqua-600 dark:text-aqua-400"/> Revenue vs Profit Trend
               </h3>
               <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={trendData}>
                            <defs>
                                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#13c8ec" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#13c8ec" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorProf" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" strokeOpacity={0.2} />
                            <XAxis dataKey="name" stroke="#9ca3af" fontSize={10} />
                            <YAxis stroke="#9ca3af" fontSize={10} />
                            <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', fontSize: '12px', color: '#fff' }} itemStyle={{color: '#fff'}} />
                            <Legend wrapperStyle={{fontSize: '12px'}}/>
                            <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#13c8ec" fillOpacity={1} fill="url(#colorRev)" />
                            <Area type="monotone" dataKey="profit" name="Profit" stroke="#10b981" fillOpacity={1} fill="url(#colorProf)" />
                        </AreaChart>
                    </ResponsiveContainer>
               </div>
           </div>

           {/* Category Breakdown Pie */}
           <div className="bg-white dark:bg-aqua-800/50 border border-gray-200 dark:border-aqua-700 p-4 rounded-xl shadow-sm">
               <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-sm">Revenue Breakdown</h3>
               <div className="h-64">
                   <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie 
                                data={getPieData()} 
                                innerRadius={60} 
                                outerRadius={90} 
                                paddingAngle={5} 
                                dataKey="value"
                            >
                                {getPieData().map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none"/>
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', fontSize: '12px', color: '#fff' }} itemStyle={{color: '#fff'}} />
                            <Legend verticalAlign="bottom" height={36} wrapperStyle={{fontSize: '12px'}}/>
                        </PieChart>
                   </ResponsiveContainer>
               </div>
               <div className="mt-2 p-3 bg-gray-50 dark:bg-aqua-900/50 rounded-lg border border-gray-200 dark:border-aqua-800">
                   <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-1">Insight</p>
                   <p className="text-xs text-gray-700 dark:text-gray-200">
                       {category === 'General' 
                        ? 'Feed sales constitute 55% of total revenue, driving the majority of cash flow.' 
                        : 'Direct farmer sales have higher margins compared to distributor channels.'}
                   </p>
               </div>
           </div>
       </div>

       {/* Product Performance Matrix */}
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
           {/* Best Performers */}
           <div className="bg-white dark:bg-aqua-800/50 border border-gray-200 dark:border-aqua-700 rounded-xl p-4 flex flex-col shadow-sm">
               <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                   <ThumbsUp size={16} className="text-green-500" /> Top Performing Products
               </h3>
               <div className="space-y-3 flex-1">
                   {products.top.map((p, i) => (
                       <div key={i} className="bg-gray-50 dark:bg-aqua-900/50 p-3 rounded-lg border border-gray-200 dark:border-aqua-800 flex justify-between items-center">
                           <div>
                               <p className="font-bold text-gray-800 dark:text-white text-xs">{p.name}</p>
                               <p className="text-[10px] text-gray-500 dark:text-gray-400">Margin: <span className="text-green-600 dark:text-green-400">{p.margin}</span></p>
                           </div>
                           <div className="text-right">
                               <p className="font-bold text-gray-900 dark:text-white text-sm">{p.revenue}</p>
                               <p className="text-[10px] text-green-500 flex items-center justify-end gap-1"><TrendingUp size={10}/> High Vol</p>
                           </div>
                       </div>
                   ))}
               </div>
           </div>

            {/* Underperformers */}
           <div className="bg-white dark:bg-aqua-800/50 border border-gray-200 dark:border-aqua-700 rounded-xl p-4 flex flex-col shadow-sm">
               <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                   <ThumbsDown size={16} className="text-red-500" /> Areas for Improvement
               </h3>
               <div className="space-y-3 flex-1">
                   {products.bad.map((p, i) => (
                       <div key={i} className="bg-gray-50 dark:bg-aqua-900/50 p-3 rounded-lg border border-gray-200 dark:border-aqua-800 flex justify-between items-center">
                           <div>
                               <p className="font-bold text-gray-800 dark:text-white text-xs">{p.name}</p>
                               <p className="text-[10px] text-red-500 dark:text-red-400">{p.reason}</p>
                           </div>
                           <div className="text-right">
                               <p className="font-bold text-gray-900 dark:text-white text-sm">{p.revenue}</p>
                               <p className="text-[10px] text-red-500 flex items-center justify-end gap-1"><TrendingDown size={10}/> Low Margin</p>
                           </div>
                       </div>
                   ))}
                   {products.bad.length === 0 && <p className="text-xs text-gray-500 italic">No underperforming products found.</p>}
               </div>
           </div>

            {/* Farmer Usage Stats */}
           <div className="bg-white dark:bg-aqua-800/50 border border-gray-200 dark:border-aqua-700 rounded-xl p-4 flex flex-col shadow-sm">
               <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                   <Users size={16} className="text-blue-500 dark:text-blue-400" /> Farmer Usage & Adoption
               </h3>
               <div className="space-y-3 flex-1">
                   {products.popular.map((name, i) => (
                       <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-aqua-800/50 last:border-0">
                           <p className="text-xs text-gray-700 dark:text-gray-200">{name}</p>
                           <div className="flex items-center gap-2">
                               <div className="w-16 bg-gray-200 dark:bg-aqua-900 h-1.5 rounded-full">
                                   <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${80 - (i * 15)}%` }}></div>
                               </div>
                               <span className="text-[10px] text-gray-500 dark:text-gray-400">{(80 - (i * 15))}% users</span>
                           </div>
                       </div>
                   ))}
               </div>
               <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-[10px] text-blue-700 dark:text-blue-200 text-center border border-blue-100 dark:border-transparent">
                   "Starter Feed" retention rate is 92% among new farmers.
               </div>
           </div>
       </div>

       {/* Detailed P&L Table */}
       <div className="bg-white dark:bg-aqua-800/50 border border-gray-200 dark:border-aqua-700 rounded-xl p-4 shadow-sm">
           <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900 dark:text-white text-sm">Detailed Profit & Loss Statement ({category})</h3>
                <button className="text-xs text-aqua-600 dark:text-aqua-400 hover:text-aqua-800 dark:hover:text-white flex items-center gap-1">
                    View Full Report <ArrowRight size={12}/>
                </button>
           </div>
           <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                    <thead className="bg-gray-50 dark:bg-aqua-900/50 text-gray-500 dark:text-gray-400 uppercase text-[10px]">
                        <tr>
                            <th className="px-4 py-3">Line Item</th>
                            <th className="px-4 py-3 text-right">Amount</th>
                            <th className="px-4 py-3 text-right">% of Rev</th>
                            <th className="px-4 py-3 text-right">MoM Change</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 dark:text-gray-300 divide-y divide-gray-100 dark:divide-aqua-800/50">
                        <tr>
                            <td className="px-4 py-2.5 font-medium text-gray-900 dark:text-white">Revenue from Operations</td>
                            <td className="px-4 py-2.5 text-right text-gray-900 dark:text-white font-bold">$1,250,000</td>
                            <td className="px-4 py-2.5 text-right">100.0%</td>
                            <td className="px-4 py-2.5 text-right text-green-600 dark:text-green-400">+5.2%</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2.5">Cost of Goods Sold (COGS)</td>
                            <td className="px-4 py-2.5 text-right text-red-500 dark:text-red-300">($750,000)</td>
                            <td className="px-4 py-2.5 text-right">60.0%</td>
                            <td className="px-4 py-2.5 text-right text-red-600 dark:text-red-400">+1.2%</td>
                        </tr>
                        <tr className="bg-gray-50 dark:bg-aqua-900/30">
                            <td className="px-4 py-2.5 font-bold text-aqua-700 dark:text-aqua-100">Gross Profit</td>
                            <td className="px-4 py-2.5 text-right font-bold text-gray-900 dark:text-white">$500,000</td>
                            <td className="px-4 py-2.5 text-right font-medium">40.0%</td>
                            <td className="px-4 py-2.5 text-right text-green-600 dark:text-green-400">+8.5%</td>
                        </tr>
                         <tr>
                            <td className="px-4 py-2.5">Logistics & Distribution</td>
                            <td className="px-4 py-2.5 text-right text-red-500 dark:text-red-300">($80,000)</td>
                            <td className="px-4 py-2.5 text-right">6.4%</td>
                            <td className="px-4 py-2.5 text-right text-green-600 dark:text-green-400">-2.0%</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2.5">Sales & Marketing</td>
                            <td className="px-4 py-2.5 text-right text-red-500 dark:text-red-300">($45,000)</td>
                            <td className="px-4 py-2.5 text-right">3.6%</td>
                            <td className="px-4 py-2.5 text-right text-gray-500">0.0%</td>
                        </tr>
                         <tr className="bg-green-50 dark:bg-aqua-900/50 border-t border-green-200 dark:border-aqua-600">
                            <td className="px-4 py-3 font-bold text-green-700 dark:text-green-400">Net Profit</td>
                            <td className="px-4 py-3 text-right font-bold text-green-700 dark:text-green-400 text-sm">$375,000</td>
                            <td className="px-4 py-3 text-right font-bold text-green-700 dark:text-green-400">30.0%</td>
                            <td className="px-4 py-3 text-right text-green-700 dark:text-green-400">+12.1%</td>
                        </tr>
                    </tbody>
                </table>
           </div>
       </div>
    </div>
  );
};

export default FinancialAnalytics;
