
import React, { useState } from 'react';
import { 
    FileText, 
    Download, 
    Printer, 
    Calendar, 
    Filter, 
    TrendingUp, 
    TrendingDown, 
    Minus, 
    ChevronDown, 
    ChevronRight 
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';

type StatementType = 'income' | 'balance' | 'cashflow';

interface LineItem {
    id: string;
    label: string;
    current: number;
    previous: number;
    type: 'header' | 'item' | 'total' | 'subtotal';
    indent?: number;
}

// --- MOCK DATA ---
const incomeStatementData: LineItem[] = [
    { id: '1', label: 'Revenue', current: 0, previous: 0, type: 'header', indent: 0 },
    { id: '1-1', label: 'Feed Sales', current: 850000, previous: 780000, type: 'item', indent: 1 },
    { id: '1-2', label: 'Seed Sales', current: 250000, previous: 210000, type: 'item', indent: 1 },
    { id: '1-3', label: 'Medicine & Probiotics', current: 150000, previous: 135000, type: 'item', indent: 1 },
    { id: '1-T', label: 'Total Revenue', current: 1250000, previous: 1125000, type: 'total', indent: 0 },
    
    { id: '2', label: 'Cost of Goods Sold (COGS)', current: 0, previous: 0, type: 'header', indent: 0 },
    { id: '2-1', label: 'Raw Materials', current: 450000, previous: 420000, type: 'item', indent: 1 },
    { id: '2-2', label: 'Direct Labor', current: 120000, previous: 115000, type: 'item', indent: 1 },
    { id: '2-3', label: 'Manufacturing Overhead', current: 80000, previous: 75000, type: 'item', indent: 1 },
    { id: '2-T', label: 'Total COGS', current: 650000, previous: 610000, type: 'total', indent: 0 },

    { id: '3-T', label: 'Gross Profit', current: 600000, previous: 515000, type: 'total', indent: 0 },

    { id: '4', label: 'Operating Expenses', current: 0, previous: 0, type: 'header', indent: 0 },
    { id: '4-1', label: 'Sales & Marketing', current: 45000, previous: 40000, type: 'item', indent: 1 },
    { id: '4-2', label: 'R&D', current: 30000, previous: 28000, type: 'item', indent: 1 },
    { id: '4-3', label: 'General & Admin', current: 55000, previous: 52000, type: 'item', indent: 1 },
    { id: '4-4', label: 'Depreciation', current: 15000, previous: 15000, type: 'item', indent: 1 },
    { id: '4-T', label: 'Total OpEx', current: 145000, previous: 135000, type: 'total', indent: 0 },

    { id: '5-T', label: 'Operating Income (EBIT)', current: 455000, previous: 380000, type: 'total', indent: 0 },
    { id: '6-1', label: 'Interest Expense', current: 12000, previous: 12500, type: 'item', indent: 0 },
    { id: '6-2', label: 'Taxes (25%)', current: 110750, previous: 91875, type: 'item', indent: 0 },
    
    { id: '7-T', label: 'Net Income', current: 332250, previous: 275625, type: 'total', indent: 0 },
];

const balanceSheetData: LineItem[] = [
    { id: '1', label: 'Assets', current: 0, previous: 0, type: 'header', indent: 0 },
    { id: '1-1', label: 'Current Assets', current: 0, previous: 0, type: 'subtotal', indent: 1 },
    { id: '1-1-1', label: 'Cash & Equivalents', current: 120000, previous: 95000, type: 'item', indent: 2 },
    { id: '1-1-2', label: 'Accounts Receivable', current: 120500, previous: 110000, type: 'item', indent: 2 },
    { id: '1-1-3', label: 'Inventory', current: 512000, previous: 480000, type: 'item', indent: 2 },
    { id: '1-2', label: 'Fixed Assets', current: 0, previous: 0, type: 'subtotal', indent: 1 },
    { id: '1-2-1', label: 'Property, Plant & Equip', current: 1500000, previous: 1520000, type: 'item', indent: 2 },
    { id: '1-T', label: 'Total Assets', current: 2252500, previous: 2205000, type: 'total', indent: 0 },

    { id: '2', label: 'Liabilities', current: 0, previous: 0, type: 'header', indent: 0 },
    { id: '2-1', label: 'Current Liabilities', current: 0, previous: 0, type: 'subtotal', indent: 1 },
    { id: '2-1-1', label: 'Accounts Payable', current: 55800, previous: 62000, type: 'item', indent: 2 },
    { id: '2-1-2', label: 'Short-term Debt', current: 25000, previous: 30000, type: 'item', indent: 2 },
    { id: '2-2', label: 'Long-term Liabilities', current: 0, previous: 0, type: 'subtotal', indent: 1 },
    { id: '2-2-1', label: 'Long-term Debt', current: 400000, previous: 450000, type: 'item', indent: 2 },
    { id: '2-T', label: 'Total Liabilities', current: 480800, previous: 542000, type: 'total', indent: 0 },

    { id: '3', label: 'Equity', current: 0, previous: 0, type: 'header', indent: 0 },
    { id: '3-1', label: 'Retained Earnings', current: 1771700, previous: 1663000, type: 'item', indent: 1 },
    { id: '3-T', label: 'Total Liabilities & Equity', current: 2252500, previous: 2205000, type: 'total', indent: 0 },
];

const sparklineData = [
    { value: 4000 }, { value: 3000 }, { value: 5000 }, { value: 4500 }, { value: 6000 }, { value: 5500 }, { value: 7000 }
];

const FinancialStatements: React.FC = () => {
    const [activeTab, setActiveTab] = useState<StatementType>('income');
    const [dateRange, setDateRange] = useState('Oct 2023');

    const currentData = activeTab === 'income' ? incomeStatementData : balanceSheetData;

    const calculateVariance = (curr: number, prev: number) => {
        if (prev === 0) return 0;
        return ((curr - prev) / prev) * 100;
    };

    return (
        <div className="space-y-4 max-w-[1920px] mx-auto pb-6 h-full flex flex-col">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-4 shrink-0">
                <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <FileText size={24} className="text-aqua-400"/> Financial Statements
                    </h2>
                    <p className="text-aqua-400 text-xs mt-1">Official reporting and variance analysis.</p>
                </div>
                
                <div className="flex items-center gap-2">
                    <div className="flex items-center bg-aqua-800/50 border border-aqua-700 rounded-lg px-3 py-1.5 gap-2">
                        <Calendar size={14} className="text-gray-400"/>
                        <select 
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                            className="bg-transparent text-white text-xs focus:outline-none appearance-none cursor-pointer"
                        >
                            <option>Oct 2023</option>
                            <option>Sep 2023</option>
                            <option>Q3 2023</option>
                            <option>YTD 2023</option>
                        </select>
                        <ChevronDown size={12} className="text-gray-400"/>
                    </div>
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-aqua-800 hover:bg-aqua-700 text-white rounded-lg text-xs font-medium transition-colors border border-aqua-700">
                        <Printer size={14}/> Print
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-aqua-500 hover:bg-aqua-400 text-aqua-950 rounded-lg text-xs font-bold transition-colors shadow-lg shadow-aqua-500/20">
                        <Download size={14}/> Export PDF
                    </button>
                </div>
            </div>

            {/* Tabs & Summary */}
            <div className="flex flex-col gap-4 shrink-0">
                {/* Tab Switcher */}
                <div className="flex bg-aqua-900/50 p-1 rounded-xl border border-aqua-800 w-fit">
                    {[
                        { id: 'income', label: 'Income Statement' },
                        { id: 'balance', label: 'Balance Sheet' },
                        { id: 'cashflow', label: 'Cash Flow' }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as StatementType)}
                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                                activeTab === tab.id 
                                ? 'bg-aqua-500 text-aqua-950 shadow-md' 
                                : 'text-gray-400 hover:text-white hover:bg-aqua-800'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-aqua-800/40 border border-aqua-700 p-4 rounded-xl flex justify-between items-center">
                        <div>
                            <p className="text-gray-400 text-[10px] uppercase font-bold mb-1">{activeTab === 'income' ? 'Net Income' : 'Total Assets'}</p>
                            <p className="text-2xl font-bold text-white">{activeTab === 'income' ? '$332,250' : '$2.25M'}</p>
                        </div>
                        <div className="h-10 w-20 opacity-50">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={sparklineData}>
                                    <Area type="monotone" dataKey="value" stroke="#13c8ec" fill="#13c8ec" strokeWidth={2} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="bg-aqua-800/40 border border-aqua-700 p-4 rounded-xl">
                        <p className="text-gray-400 text-[10px] uppercase font-bold mb-1">Period Variance</p>
                        <div className="flex items-end gap-2">
                            <p className="text-2xl font-bold text-green-400">+20.5%</p>
                            <TrendingUp size={16} className="text-green-500 mb-1.5"/>
                        </div>
                    </div>
                    {activeTab === 'income' && (
                        <div className="bg-aqua-800/40 border border-aqua-700 p-4 rounded-xl">
                            <p className="text-gray-400 text-[10px] uppercase font-bold mb-1">Gross Margin</p>
                            <p className="text-2xl font-bold text-white">48%</p>
                        </div>
                    )}
                    {activeTab === 'balance' && (
                        <div className="bg-aqua-800/40 border border-aqua-700 p-4 rounded-xl">
                            <p className="text-gray-400 text-[10px] uppercase font-bold mb-1">Debt Ratio</p>
                            <p className="text-2xl font-bold text-yellow-400">0.21</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Statement Table */}
            <div className="flex-1 bg-aqua-900/30 border border-aqua-800 rounded-xl overflow-hidden flex flex-col min-h-0">
                {/* Table Header */}
                <div className="grid grid-cols-12 bg-aqua-800/80 border-b border-aqua-700 px-6 py-3 text-[10px] uppercase font-bold text-gray-400 sticky top-0 z-10 backdrop-blur-md">
                    <div className="col-span-5">Description</div>
                    <div className="col-span-2 text-right">{dateRange}</div>
                    <div className="col-span-2 text-right">Previous</div>
                    <div className="col-span-2 text-right">Variance</div>
                    <div className="col-span-1 text-center">Trend</div>
                </div>

                {/* Table Body */}
                <div className="overflow-y-auto flex-1 custom-scrollbar">
                    {currentData.map((row) => {
                        const variance = calculateVariance(row.current, row.previous);
                        const isPositive = variance > 0;
                        
                        // Styling classes based on row type
                        let rowClass = "border-b border-aqua-800/30 hover:bg-aqua-800/20 transition-colors text-xs py-2.5 px-6 grid grid-cols-12 items-center";
                        let labelClass = "text-gray-300";
                        let valueClass = "text-gray-300 font-medium";

                        if (row.type === 'header') {
                            rowClass += " bg-aqua-800/30 mt-2";
                            labelClass = "text-aqua-400 font-bold uppercase text-[10px] tracking-wider";
                            valueClass = "hidden"; // Hide values for section headers
                        } else if (row.type === 'total') {
                            rowClass += " bg-aqua-800/10 border-t border-aqua-600 border-b-2 border-b-aqua-600 font-bold";
                            labelClass = "text-white";
                            valueClass = "text-white";
                        } else if (row.type === 'subtotal') {
                            labelClass = "text-gray-400 font-semibold italic";
                            valueClass = "hidden";
                        }

                        return (
                            <div key={row.id} className={rowClass}>
                                <div 
                                    className={`col-span-5 flex items-center ${labelClass}`}
                                    style={{ paddingLeft: `${row.indent * 20}px` }}
                                >
                                    {row.type === 'item' && row.indent > 0 && <div className="w-1 h-1 bg-gray-600 rounded-full mr-2"></div>}
                                    {row.label}
                                </div>
                                
                                <div className={`col-span-2 text-right ${valueClass}`}>
                                    {row.type !== 'header' && row.type !== 'subtotal' ? `$${row.current.toLocaleString()}` : ''}
                                </div>
                                
                                <div className={`col-span-2 text-right text-gray-500 ${valueClass}`}>
                                    {row.type !== 'header' && row.type !== 'subtotal' ? `$${row.previous.toLocaleString()}` : ''}
                                </div>
                                
                                <div className={`col-span-2 text-right ${valueClass}`}>
                                    {row.type !== 'header' && row.type !== 'subtotal' && (
                                        <span className={`px-2 py-0.5 rounded ${isPositive ? 'bg-green-500/10 text-green-400' : variance < 0 ? 'bg-red-500/10 text-red-400' : 'text-gray-500'}`}>
                                            {variance > 0 ? '+' : ''}{variance.toFixed(1)}%
                                        </span>
                                    )}
                                </div>

                                <div className="col-span-1 flex justify-center">
                                    {row.type !== 'header' && row.type !== 'subtotal' && (
                                        variance > 0 ? <TrendingUp size={14} className="text-green-500"/> : 
                                        variance < 0 ? <TrendingDown size={14} className="text-red-500"/> : 
                                        <Minus size={14} className="text-gray-500"/>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                    
                    {/* Disclaimer Footer */}
                    <div className="p-6 text-center text-gray-500 text-[10px] italic">
                        * Unaudited interim financial statements. Generated automatically by AquaERP Finance Module.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FinancialStatements;
