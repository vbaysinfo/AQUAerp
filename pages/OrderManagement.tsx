import React from 'react';
import { MoreHorizontal, Plus } from 'lucide-react';

interface KanbanColumnProps {
    title: string;
    count: number;
    color: string;
    orders: { id: string; customer: string; amount: string }[];
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, count, color, orders }) => (
    <div className="flex flex-col gap-3 min-w-[280px] bg-aqua-800/30 p-4 rounded-xl border border-aqua-800 h-full">
        <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-white flex items-center gap-2">
                {title} <span className="text-gray-500 text-sm">({count})</span>
            </h3>
            <div className={`w-2 h-2 rounded-full ${color}`}></div>
        </div>
        <div className="space-y-3 overflow-y-auto max-h-[600px] pr-1">
            {orders.map((order) => (
                <div key={order.id} className={`bg-aqua-800 p-4 rounded-lg border-l-4 shadow-lg hover:translate-y-[-2px] transition-all cursor-pointer`} style={{ borderColor: color.replace('bg-', 'var(--tw-bg-opacity:1); border-color: ') }}>
                    <div className="flex justify-between items-start">
                        <p className="font-bold text-white text-sm">{order.id}</p>
                        <button className="text-gray-500 hover:text-white"><MoreHorizontal size={16} /></button>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{order.customer}</p>
                    <p className="text-sm font-bold text-white mt-3">{order.amount}</p>
                </div>
            ))}
        </div>
    </div>
);

const OrderManagement: React.FC = () => {
  return (
    <div className="h-full flex flex-col max-w-[1600px] mx-auto">
      <div className="flex justify-between items-center mb-6 shrink-0">
        <div>
            <h2 className="text-2xl font-bold text-white">Real-Time Order Pipeline</h2>
            <p className="text-gray-400 text-sm">Drag and drop to update status</p>
        </div>
        <button className="bg-aqua-500 hover:bg-aqua-400 text-aqua-950 px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-colors">
            <Plus size={18} /> New Order
        </button>
      </div>

      <div className="flex-1 overflow-x-auto pb-4">
          <div className="flex gap-6 h-full min-w-max">
            <KanbanColumn 
                title="Pending" 
                count={12} 
                color="bg-yellow-400"
                orders={[
                    { id: '#ORD-8821', customer: 'Green Acres Farm', amount: '$1,250.00' },
                    { id: '#ORD-8820', customer: 'Riverbend Fisheries', amount: '$875.50' },
                    { id: '#ORD-8825', customer: 'Blue Lagoon', amount: '$3,200.00' },
                ]} 
            />
             <KanbanColumn 
                title="Confirmed" 
                count={8} 
                color="bg-blue-400"
                orders={[
                    { id: '#ORD-8819', customer: 'Sunrise Aqua', amount: '$2,400.00' },
                    { id: '#ORD-8822', customer: 'Deep Blue Inc', amount: '$540.00' },
                ]} 
            />
             <KanbanColumn 
                title="In Transit" 
                count={5} 
                color="bg-indigo-400"
                orders={[
                    { id: '#ORD-8815', customer: 'Coastal Farms', amount: '$990.00' },
                    { id: '#ORD-8812', customer: 'Delta Prawns', amount: '$3,120.75' },
                ]} 
            />
             <KanbanColumn 
                title="Delivered" 
                count={21} 
                color="bg-purple-400"
                orders={[
                    { id: '#ORD-8809', customer: 'Happy Hatcheries', amount: '$550.00' },
                ]} 
            />
             <KanbanColumn 
                title="Paid" 
                count={150} 
                color="bg-green-400"
                orders={[
                    { id: '#ORD-8795', customer: 'Ocean Fresh Inc.', amount: '$1,800.25' },
                ]} 
            />
          </div>
      </div>
    </div>
  );
};

export default OrderManagement;