
import React, { useState } from 'react';
import { 
    MoreHorizontal, 
    Plus, 
    Search, 
    Smartphone, 
    Globe, 
    User, 
    CheckCircle, 
    XCircle, 
    Package, 
    Calendar, 
    MapPin, 
    Clock,
    DollarSign,
    AlertCircle,
    Trash2,
    Save,
    X
} from 'lucide-react';
import { Order } from '../types';

// --- MOCK DATA ---
const initialOrders: Order[] = [
    { 
        id: 'ORD-8825', 
        customer: 'Kamehameha Farms', 
        customerId: 'F001',
        date: '2023-10-26 09:30 AM',
        amount: '$3,240.00',
        totalValue: 3240,
        status: 'Awaiting Approval', 
        paymentStatus: 'Pending',
        source: 'Mobile App',
        deliveryAddress: 'North Shore, Oahu (Main Gate)',
        items: [
            { productId: 'FD-GR-002', productName: 'Grower Feed 2mm', quantity: 2, unit: 'Tons', unitPrice: 1200, total: 2400 },
            { productId: 'SUP-PRO-01', productName: 'GutWell Probiotic', quantity: 10, unit: 'kg', unitPrice: 84, total: 840 }
        ]
    },
    { 
        id: 'ORD-8824', 
        customer: 'Maui Prawns Co.', 
        customerId: 'F003',
        date: '2023-10-26 08:15 AM',
        amount: '$1,150.00',
        totalValue: 1150,
        status: 'Awaiting Approval', 
        paymentStatus: 'Paid',
        source: 'Mobile App',
        deliveryAddress: 'Kahului, Maui, Zone B',
        items: [
            { productId: 'SD-VN-015', productName: 'Vannamei Seed PL15', quantity: 1, unit: 'Million', unitPrice: 1150, total: 1150 }
        ]
    },
    { 
        id: 'ORD-8821', 
        customer: 'Green Acres Farm', 
        customerId: 'F012',
        date: '2023-10-25',
        amount: '$1,250.00',
        totalValue: 1250,
        status: 'Confirmed', 
        paymentStatus: 'Pending',
        source: 'Sales Rep',
        deliveryAddress: 'Nellore, AP',
        items: [
             { productId: 'FD-ST-001', productName: 'Starter Feed', quantity: 1, unit: 'Ton', unitPrice: 1250, total: 1250 }
        ]
    },
    { 
        id: 'ORD-8815', 
        customer: 'Coastal Farms', 
        customerId: 'F008',
        date: '2023-10-24',
        amount: '$990.00',
        totalValue: 990,
        status: 'In Transit', 
        paymentStatus: 'Paid',
        source: 'Web Portal',
        deliveryAddress: 'Vizag Coast Road',
        items: []
    },
    { 
        id: 'ORD-8812', 
        customer: 'Delta Prawns', 
        customerId: 'F005',
        date: '2023-10-23',
        amount: '$3,120.75',
        totalValue: 3120.75,
        status: 'In Transit', 
        paymentStatus: 'Partial',
        source: 'Mobile App',
        deliveryAddress: 'Bhimavaram Hub',
        items: []
    },
    { 
        id: 'ORD-8809', 
        customer: 'Happy Hatcheries', 
        customerId: 'F009',
        date: '2023-10-22',
        amount: '$550.00',
        totalValue: 550,
        status: 'Delivered', 
        paymentStatus: 'Paid',
        source: 'Sales Rep',
        deliveryAddress: 'Kakinada Port',
        items: []
    },
];

// --- RENDER HELPERS ---
const getSourceIcon = (source: string) => {
    switch(source) {
        case 'Mobile App': return <Smartphone size={14} className="text-purple-500 dark:text-purple-400"/>;
        case 'Web Portal': return <Globe size={14} className="text-blue-500 dark:text-blue-400"/>;
        default: return <User size={14} className="text-gray-400"/>;
    }
};

const getStatusColor = (status: string) => {
    switch(status) {
        case 'Awaiting Approval': return 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-500/30';
        case 'Confirmed': return 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/30';
        case 'In Transit': return 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/30';
        case 'Delivered': return 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-500/30';
        case 'Cancelled': return 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-500/30';
        default: return 'bg-gray-100 dark:bg-gray-500/20 text-gray-500';
    }
};

const OrderManagement: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>(initialOrders);
    const [viewMode, setViewMode] = useState<'approvals' | 'board' | 'list'>('approvals');
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    
    // --- CREATE ORDER STATE ---
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [newOrderData, setNewOrderData] = useState({
        customer: '',
        address: '',
        date: new Date().toISOString().split('T')[0],
        source: 'Web Portal' as const,
        items: [] as { id: number, product: string, qty: number, price: number }[] 
    });

    // --- ACTIONS ---
    const handleApprove = (orderId: string) => {
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'Confirmed' } : o));
        if(selectedOrder?.id === orderId) {
            setSelectedOrder(prev => prev ? {...prev, status: 'Confirmed'} : null);
        }
    };

    const handleReject = (orderId: string) => {
        if(window.confirm('Are you sure you want to reject this order?')) {
            setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'Cancelled' } : o));
             if(selectedOrder?.id === orderId) {
                setSelectedOrder(null);
            }
        }
    };

    const addItemToNewOrder = () => {
        setNewOrderData(prev => ({
            ...prev,
            items: [...prev.items, { id: Date.now(), product: 'Grower Feed 2mm', qty: 1, price: 1200 }]
        }));
    };

    const removeNewOrderItem = (id: number) => {
        setNewOrderData(prev => ({
            ...prev,
            items: prev.items.filter(i => i.id !== id)
        }));
    };

    const updateNewOrderItem = (id: number, field: string, value: any) => {
        setNewOrderData(prev => ({
            ...prev,
            items: prev.items.map(i => i.id === id ? { ...i, [field]: value } : i)
        }));
    };

    const submitNewOrder = () => {
        const total = newOrderData.items.reduce((acc, item) => acc + (item.qty * item.price), 0);
        const newOrder: Order = {
            id: `ORD-${Math.floor(Math.random() * 10000)}`,
            customer: newOrderData.customer || 'Unknown Customer',
            customerId: 'N/A',
            date: newOrderData.date,
            amount: `$${total.toLocaleString()}`,
            totalValue: total,
            status: 'Confirmed',
            paymentStatus: 'Pending',
            source: 'Web Portal',
            deliveryAddress: newOrderData.address,
            items: newOrderData.items.map(i => ({
                productId: 'GEN-001',
                productName: i.product,
                quantity: i.qty,
                unit: 'Units',
                unitPrice: i.price,
                total: i.qty * i.price
            }))
        };

        setOrders(prev => [newOrder, ...prev]);
        setIsCreateOpen(false);
        setNewOrderData({ customer: '', address: '', date: new Date().toISOString().split('T')[0], source: 'Web Portal', items: [] });
        setViewMode('board'); // Switch to board to see new order
    };

    // --- FILTERING ---
    const pendingOrders = orders.filter(o => o.status === 'Awaiting Approval');
    const activeOrders = orders.filter(o => o.status !== 'Awaiting Approval' && o.status !== 'Cancelled' && o.status !== 'Delivered');
    
    return (
        <div className="h-full flex flex-col max-w-[1920px] mx-auto space-y-4 relative">
            
            {/* TOP STATS BAR */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div onClick={() => setViewMode('approvals')} className={`cursor-pointer p-3 rounded-xl border transition-all ${viewMode === 'approvals' ? 'bg-white dark:bg-aqua-800 border-aqua-500 shadow-md' : 'bg-white dark:bg-aqua-800/30 border-gray-200 dark:border-aqua-800 hover:bg-gray-50 dark:hover:bg-aqua-800/60'}`}>
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-500 dark:text-gray-400 text-[10px] uppercase font-bold">Pending Approvals</p>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1">{pendingOrders.length}</h3>
                        </div>
                        <div className="p-1.5 bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400 rounded-lg"><AlertCircle size={16}/></div>
                    </div>
                    <p className="text-[10px] text-yellow-600 dark:text-yellow-500 mt-1 font-medium flex items-center gap-1">Action Required</p>
                </div>

                <div onClick={() => setViewMode('board')} className={`cursor-pointer p-3 rounded-xl border transition-all ${viewMode === 'board' ? 'bg-white dark:bg-aqua-800 border-aqua-500 shadow-md' : 'bg-white dark:bg-aqua-800/30 border-gray-200 dark:border-aqua-800 hover:bg-gray-50 dark:hover:bg-aqua-800/60'}`}>
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-500 dark:text-gray-400 text-[10px] uppercase font-bold">In Fulfillment</p>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1">{activeOrders.length}</h3>
                        </div>
                        <div className="p-1.5 bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 rounded-lg"><Package size={16}/></div>
                    </div>
                    <p className="text-[10px] text-blue-500 dark:text-blue-400 mt-1 font-medium">Processing & Transit</p>
                </div>

                <div className="p-3 rounded-xl border bg-white dark:bg-aqua-800/30 border-gray-200 dark:border-aqua-800">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-500 dark:text-gray-400 text-[10px] uppercase font-bold">Today's Revenue</p>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1">$4,390</h3>
                        </div>
                        <div className="p-1.5 bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400 rounded-lg"><DollarSign size={16}/></div>
                    </div>
                    <p className="text-[10px] text-green-500 mt-1 font-medium">+12% vs yesterday</p>
                </div>

                <div className="flex items-center justify-end">
                    <button 
                        onClick={() => setIsCreateOpen(true)}
                        className="bg-aqua-500 hover:bg-aqua-400 text-white dark:text-aqua-950 px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg shadow-aqua-500/20 transition-all hover:scale-105"
                    >
                        <Plus size={16} /> Create Manual Order
                    </button>
                </div>
            </div>

            {/* MAIN CONTENT SPLIT */}
            <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-0">
                
                {/* LEFT PANEL: ORDER LIST / BOARD */}
                <div className={`flex-1 flex flex-col gap-4 transition-all ${selectedOrder ? 'lg:w-2/3' : 'w-full'}`}>
                    
                    {/* View Tabs */}
                    <div className="flex items-center gap-1 bg-white dark:bg-aqua-800/30 p-1 rounded-lg w-fit border border-gray-200 dark:border-aqua-800">
                        <button onClick={() => setViewMode('approvals')} className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors ${viewMode === 'approvals' ? 'bg-gray-100 text-gray-900 dark:bg-aqua-700 dark:text-white shadow' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}>Incoming Requests</button>
                        <button onClick={() => setViewMode('board')} className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors ${viewMode === 'board' ? 'bg-gray-100 text-gray-900 dark:bg-aqua-700 dark:text-white shadow' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}>Fulfillment Board</button>
                    </div>

                    {/* --- APPROVALS VIEW --- */}
                    {viewMode === 'approvals' && (
                        <div className="flex-1 bg-white dark:bg-aqua-800/20 border border-gray-200 dark:border-aqua-800 rounded-2xl overflow-hidden flex flex-col shadow-sm">
                            <div className="p-3 border-b border-gray-200 dark:border-aqua-800 flex justify-between items-center bg-gray-50 dark:bg-aqua-800/40">
                                <h3 className="font-bold text-gray-900 dark:text-white text-sm flex items-center gap-2">
                                    <Smartphone className="text-purple-500 dark:text-purple-400" size={16}/> Mobile App Orders
                                </h3>
                                <span className="bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400 px-2 py-0.5 rounded text-[10px] font-bold">{pendingOrders.length} Pending</span>
                            </div>
                            
                            <div className="overflow-y-auto p-3 space-y-2">
                                {pendingOrders.length === 0 ? (
                                    <div className="text-center py-20 text-gray-500">
                                        <CheckCircle size={48} className="mx-auto mb-4 opacity-20"/>
                                        <p className="text-sm">All caught up! No pending orders.</p>
                                    </div>
                                ) : pendingOrders.map(order => (
                                    <div 
                                        key={order.id} 
                                        onClick={() => setSelectedOrder(order)}
                                        className={`p-3 rounded-xl border cursor-pointer transition-all hover:translate-x-1 group relative overflow-hidden
                                            ${selectedOrder?.id === order.id 
                                                ? 'bg-aqua-50 dark:bg-aqua-800 border-aqua-500 ring-1 ring-aqua-500' 
                                                : 'bg-white dark:bg-aqua-900/50 border-gray-200 dark:border-aqua-700/50 hover:border-aqua-400 dark:hover:border-aqua-600'}`}
                                    >
                                        {/* Mobile Stripe */}
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500"></div>
                                        
                                        <div className="flex justify-between items-start mb-1 pl-3">
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-gray-900 dark:text-white text-base">{order.amount}</span>
                                                <span className="text-[10px] bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-300 px-1.5 py-0.5 rounded-full flex items-center gap-1">
                                                    <Smartphone size={10} /> App
                                                </span>
                                            </div>
                                            <span className="text-[10px] text-gray-500 dark:text-gray-400 flex items-center gap-1"><Clock size={10}/> {order.date}</span>
                                        </div>
                                        
                                        <div className="pl-3 flex justify-between items-end">
                                            <div>
                                                <h4 className="font-bold text-gray-800 dark:text-aqua-100 text-sm">{order.customer}</h4>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">{order.items.length} Items • {order.deliveryAddress}</p>
                                            </div>
                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button 
                                                    onClick={(e) => { e.stopPropagation(); handleApprove(order.id); }}
                                                    className="bg-green-600 hover:bg-green-500 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1"
                                                >
                                                    <CheckCircle size={12} /> Approve
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* --- KANBAN BOARD VIEW --- */}
                    {viewMode === 'board' && (
                         <div className="flex-1 overflow-x-auto pb-2">
                            <div className="flex gap-3 h-full min-w-max">
                                <KanbanColumn 
                                    title="Processing" 
                                    count={orders.filter(o => o.status === 'Confirmed').length} 
                                    color="bg-blue-500"
                                    orders={orders.filter(o => o.status === 'Confirmed')} 
                                    onSelect={setSelectedOrder}
                                    selectedId={selectedOrder?.id}
                                />
                                <KanbanColumn 
                                    title="In Transit" 
                                    count={orders.filter(o => o.status === 'In Transit').length} 
                                    color="bg-indigo-500"
                                    orders={orders.filter(o => o.status === 'In Transit')} 
                                    onSelect={setSelectedOrder}
                                    selectedId={selectedOrder?.id}
                                />
                                <KanbanColumn 
                                    title="Delivered" 
                                    count={orders.filter(o => o.status === 'Delivered').length} 
                                    color="bg-green-500"
                                    orders={orders.filter(o => o.status === 'Delivered')} 
                                    onSelect={setSelectedOrder}
                                    selectedId={selectedOrder?.id}
                                />
                            </div>
                         </div>
                    )}
                </div>

                {/* RIGHT PANEL: ORDER DETAILS */}
                {selectedOrder && (
                    <div className="lg:w-[380px] xl:w-[420px] bg-white dark:bg-aqua-800/40 border border-gray-200 dark:border-aqua-700 rounded-2xl flex flex-col shadow-xl animate-in slide-in-from-right-4 duration-300 shrink-0">
                        <div className="p-4 border-b border-gray-200 dark:border-aqua-700 flex justify-between items-start bg-gray-50 dark:bg-aqua-800/60 rounded-t-2xl">
                            <div>
                                <h2 className="text-lg font-black text-gray-900 dark:text-white flex items-center gap-2">
                                    Order Details
                                    <span className={`text-[10px] border px-1.5 py-0.5 rounded-full ${getStatusColor(selectedOrder.status)}`}>
                                        {selectedOrder.status}
                                    </span>
                                </h2>
                                <p className="text-xs text-gray-500 dark:text-aqua-400 mt-0.5">ID: {selectedOrder.id}</p>
                            </div>
                            <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-aqua-900 p-1 rounded-full"><XCircle size={18}/></button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {/* Customer Info */}
                            <div className="bg-gray-50 dark:bg-aqua-900/50 p-3 rounded-xl border border-gray-200 dark:border-aqua-800">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
                                        {selectedOrder.customer.substring(0, 2).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900 dark:text-white text-sm">{selectedOrder.customer}</p>
                                        <p className="text-[10px] text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                            {getSourceIcon(selectedOrder.source)} via {selectedOrder.source}
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-1.5 text-xs">
                                    <div className="flex gap-2">
                                        <MapPin size={14} className="text-gray-500 shrink-0" />
                                        <span className="text-gray-600 dark:text-gray-300">{selectedOrder.deliveryAddress}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Calendar size={14} className="text-gray-500 shrink-0" />
                                        <span className="text-gray-600 dark:text-gray-300">{selectedOrder.date}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Line Items */}
                            <div>
                                <h4 className="text-[10px] uppercase font-bold text-gray-500 mb-2 flex items-center gap-2">
                                    <Package size={10} /> Order Items
                                </h4>
                                <div className="bg-gray-50 dark:bg-aqua-900/30 rounded-xl border border-gray-200 dark:border-aqua-800/50 overflow-hidden">
                                    {selectedOrder.items.length > 0 ? selectedOrder.items.map((item, idx) => (
                                        <div key={idx} className="flex justify-between items-center p-2.5 border-b border-gray-200 dark:border-aqua-800/50 last:border-0 hover:bg-gray-100 dark:hover:bg-aqua-800/30">
                                            <div>
                                                <p className="font-bold text-gray-900 dark:text-white text-xs">{item.productName}</p>
                                                <p className="text-[10px] text-gray-500">{item.quantity} {item.unit} x ${item.unitPrice}</p>
                                            </div>
                                            <p className="font-bold text-gray-800 dark:text-aqua-100 text-sm">${item.total.toLocaleString()}</p>
                                        </div>
                                    )) : (
                                        <div className="p-3 text-center text-gray-500 text-xs italic">Items summary not available for this legacy order.</div>
                                    )}
                                </div>
                                <div className="mt-2 flex justify-between items-center p-2.5 bg-gray-100 dark:bg-aqua-800/50 rounded-lg border border-gray-200 dark:border-aqua-700">
                                    <span className="font-medium text-gray-600 dark:text-gray-300 text-xs">Total Amount</span>
                                    <span className="text-lg font-black text-gray-900 dark:text-white">{selectedOrder.amount}</span>
                                </div>
                            </div>

                            {/* Payment Info */}
                            <div>
                                <h4 className="text-[10px] uppercase font-bold text-gray-500 mb-2 flex items-center gap-2">
                                    <DollarSign size={10} /> Payment Status
                                </h4>
                                <div className="flex items-center gap-3">
                                    <div className={`px-2.5 py-0.5 rounded-lg text-xs font-bold border ${
                                        selectedOrder.paymentStatus === 'Paid' ? 'bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-500/30' : 
                                        selectedOrder.paymentStatus === 'Pending' ? 'bg-yellow-100 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-500/30' : 
                                        'bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/30'
                                    }`}>
                                        {selectedOrder.paymentStatus}
                                    </div>
                                    {selectedOrder.paymentStatus === 'Pending' && (
                                        <button className="text-[10px] text-aqua-600 dark:text-aqua-400 hover:underline">Send Invoice Reminder</button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Action Footer */}
                        <div className="p-4 border-t border-gray-200 dark:border-aqua-700 bg-gray-50 dark:bg-aqua-800/60 rounded-b-2xl flex flex-col gap-2">
                            {selectedOrder.status === 'Awaiting Approval' ? (
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => handleApprove(selectedOrder.id)}
                                        className="flex-1 bg-green-600 hover:bg-green-500 text-white py-2.5 rounded-xl font-bold shadow-lg shadow-green-500/20 flex justify-center items-center gap-2 transition-all text-sm"
                                    >
                                        <CheckCircle size={16} /> Approve Order
                                    </button>
                                    <button 
                                        onClick={() => handleReject(selectedOrder.id)}
                                        className="flex-1 bg-red-50 dark:bg-red-900/50 hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 py-2.5 rounded-xl font-bold flex justify-center items-center gap-2 transition-all text-sm"
                                    >
                                        <XCircle size={16} /> Reject
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-2">
                                    <button className="bg-gray-200 dark:bg-aqua-700 hover:bg-gray-300 dark:hover:bg-aqua-600 text-gray-800 dark:text-white py-2 rounded-lg text-xs font-medium">Download Invoice</button>
                                    <button className="bg-gray-200 dark:bg-aqua-700 hover:bg-gray-300 dark:hover:bg-aqua-600 text-gray-800 dark:text-white py-2 rounded-lg text-xs font-medium">Assign Driver</button>
                                    {selectedOrder.status !== 'Delivered' && (
                                        <button className="col-span-2 border border-aqua-500 text-aqua-600 dark:text-aqua-400 hover:bg-aqua-500 hover:text-white dark:hover:text-aqua-950 py-2 rounded-lg text-xs font-bold transition-colors">
                                            Update Status
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* --- CREATE MANUAL ORDER SLIDE-OVER --- */}
            <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isCreateOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                {/* Backdrop */}
                <div 
                    className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isCreateOpen ? 'opacity-100' : 'opacity-0'}`} 
                    onClick={() => setIsCreateOpen(false)}
                />
                
                {/* Sliding Panel */}
                <div className={`absolute right-0 top-0 h-full w-full md:w-[550px] bg-white dark:bg-aqua-900 border-l border-gray-200 dark:border-aqua-700 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${isCreateOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    
                    {/* Header */}
                    <div className="p-4 border-b border-gray-200 dark:border-aqua-700 bg-gray-50 dark:bg-aqua-800 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <Plus size={20} className="text-aqua-600 dark:text-aqua-400"/> Create Manual Order
                        </h2>
                        <button onClick={() => setIsCreateOpen(false)} className="p-1.5 hover:bg-gray-200 dark:hover:bg-aqua-700 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Form Body */}
                    <div className="flex-1 overflow-y-auto p-5 space-y-6">
                        
                        {/* Section 1: Customer & Logistics */}
                        <section className="space-y-3">
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200 dark:border-aqua-800 pb-1">Customer & Delivery</h3>
                            
                            <div className="grid grid-cols-2 gap-3">
                                <div className="col-span-2">
                                    <label className="block text-xs text-gray-700 dark:text-aqua-100 mb-1">Customer Name / ID</label>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
                                        <input 
                                            type="text" 
                                            placeholder="Search existing customers..." 
                                            className="w-full bg-gray-50 dark:bg-aqua-800 border border-gray-300 dark:border-aqua-700 rounded-lg py-2 pl-9 pr-3 text-sm text-gray-900 dark:text-white focus:border-aqua-500 focus:outline-none"
                                            value={newOrderData.customer}
                                            onChange={(e) => setNewOrderData({...newOrderData, customer: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-700 dark:text-aqua-100 mb-1">Order Date</label>
                                    <input 
                                        type="date" 
                                        className="w-full bg-gray-50 dark:bg-aqua-800 border border-gray-300 dark:border-aqua-700 rounded-lg p-2 text-sm text-gray-900 dark:text-white focus:border-aqua-500 focus:outline-none"
                                        value={newOrderData.date}
                                        onChange={(e) => setNewOrderData({...newOrderData, date: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-700 dark:text-aqua-100 mb-1">Order Source</label>
                                    <select 
                                        className="w-full bg-gray-50 dark:bg-aqua-800 border border-gray-300 dark:border-aqua-700 rounded-lg p-2 text-sm text-gray-900 dark:text-white focus:border-aqua-500 focus:outline-none appearance-none"
                                        value={newOrderData.source}
                                        onChange={(e) => setNewOrderData({...newOrderData, source: e.target.value as any})}
                                    >
                                        <option>Web Portal</option>
                                        <option>Sales Rep</option>
                                        <option>Phone Order</option>
                                    </select>
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-xs text-gray-700 dark:text-aqua-100 mb-1">Delivery Address</label>
                                    <textarea 
                                        rows={2} 
                                        className="w-full bg-gray-50 dark:bg-aqua-800 border border-gray-300 dark:border-aqua-700 rounded-lg p-2 text-sm text-gray-900 dark:text-white focus:border-aqua-500 focus:outline-none resize-none"
                                        placeholder="Enter full shipping address..."
                                        value={newOrderData.address}
                                        onChange={(e) => setNewOrderData({...newOrderData, address: e.target.value})}
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Section 2: Items */}
                        <section className="space-y-3">
                            <div className="flex justify-between items-end border-b border-gray-200 dark:border-aqua-800 pb-1">
                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Order Items</h3>
                                <button onClick={addItemToNewOrder} className="text-[10px] bg-aqua-100 text-aqua-700 dark:bg-aqua-500/20 dark:text-aqua-400 px-2 py-1 rounded-full hover:bg-aqua-200 dark:hover:bg-aqua-500 dark:hover:text-aqua-950 transition-colors font-bold flex items-center gap-1">
                                    <Plus size={10} /> Add Item
                                </button>
                            </div>

                            <div className="space-y-2">
                                {newOrderData.items.map((item, index) => (
                                    <div key={item.id} className="flex gap-2 items-start bg-gray-50 dark:bg-aqua-800/30 p-2.5 rounded-xl border border-gray-200 dark:border-aqua-800/50">
                                        <div className="flex-1">
                                            <label className="block text-[10px] text-gray-500 dark:text-gray-400 mb-0.5">Product</label>
                                            <select 
                                                className="w-full bg-white dark:bg-aqua-900 border border-gray-300 dark:border-aqua-700 rounded p-1.5 text-xs text-gray-900 dark:text-white focus:border-aqua-500 focus:outline-none"
                                                value={item.product}
                                                onChange={(e) => updateNewOrderItem(item.id, 'product', e.target.value)}
                                            >
                                                <option>Grower Feed 2mm</option>
                                                <option>Starter Feed 1mm</option>
                                                <option>Vannamei Seed PL15</option>
                                                <option>GutWell Probiotic</option>
                                                <option>Lime (Minerals)</option>
                                            </select>
                                        </div>
                                        <div className="w-16">
                                            <label className="block text-[10px] text-gray-500 dark:text-gray-400 mb-0.5">Qty</label>
                                            <input 
                                                type="number" 
                                                className="w-full bg-white dark:bg-aqua-900 border border-gray-300 dark:border-aqua-700 rounded p-1.5 text-xs text-gray-900 dark:text-white focus:border-aqua-500 focus:outline-none"
                                                value={item.qty}
                                                onChange={(e) => updateNewOrderItem(item.id, 'qty', parseInt(e.target.value))}
                                                min="1"
                                            />
                                        </div>
                                        <div className="w-20">
                                            <label className="block text-[10px] text-gray-500 dark:text-gray-400 mb-0.5">Price</label>
                                            <input 
                                                type="number" 
                                                className="w-full bg-white dark:bg-aqua-900 border border-gray-300 dark:border-aqua-700 rounded p-1.5 text-xs text-gray-900 dark:text-white focus:border-aqua-500 focus:outline-none"
                                                value={item.price}
                                                onChange={(e) => updateNewOrderItem(item.id, 'price', parseInt(e.target.value))}
                                            />
                                        </div>
                                        <div className="w-6 pt-5">
                                            <button onClick={() => removeNewOrderItem(item.id)} className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 p-1">
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {newOrderData.items.length === 0 && (
                                    <div className="text-center py-6 text-gray-500 text-xs italic border-2 border-dashed border-gray-300 dark:border-aqua-800 rounded-xl">
                                        No items added. Click "Add Item" to start.
                                    </div>
                                )}
                            </div>

                            {/* Total Calculation */}
                            <div className="flex justify-end pt-2">
                                <div className="text-right">
                                    <p className="text-gray-500 dark:text-gray-400 text-xs">Total Amount</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                        ${newOrderData.items.reduce((acc, item) => acc + (item.qty * item.price), 0).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Footer Buttons */}
                    <div className="p-4 border-t border-gray-200 dark:border-aqua-700 bg-gray-50 dark:bg-aqua-800 flex gap-3">
                        <button onClick={() => setIsCreateOpen(false)} className="flex-1 py-2.5 rounded-xl font-bold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-aqua-700 transition-colors text-sm">
                            Cancel
                        </button>
                        <button onClick={submitNewOrder} className="flex-1 bg-aqua-500 hover:bg-aqua-400 text-white dark:text-aqua-950 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-aqua-500/20 transition-all text-sm">
                            <Save size={18} /> Create Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- KANBAN COLUMN COMPONENT ---
const KanbanColumn: React.FC<{
    title: string; 
    count: number; 
    color: string; 
    orders: Order[]; 
    onSelect: (o: Order) => void;
    selectedId?: string;
}> = ({ title, count, color, orders, onSelect, selectedId }) => (
    <div className="flex flex-col gap-2 min-w-[300px] w-[300px] bg-gray-50 dark:bg-aqua-800/20 p-3 rounded-xl border border-gray-200 dark:border-aqua-800/60 h-full">
        <div className="flex justify-between items-center mb-1 px-1">
            <h3 className="font-bold text-gray-800 dark:text-white text-sm flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${color}`}></span>
                {title} 
                <span className="text-gray-500 text-xs bg-white dark:bg-aqua-900 px-1.5 py-0.5 rounded-full border border-gray-200 dark:border-transparent">{count}</span>
            </h3>
            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-white"><MoreHorizontal size={14}/></button>
        </div>
        <div className="space-y-2 overflow-y-auto max-h-[calc(100vh-220px)] pr-1 custom-scrollbar">
            {orders.length === 0 && <div className="text-center text-gray-500 text-xs py-10 italic">No orders</div>}
            {orders.map((order) => (
                <div 
                    key={order.id} 
                    onClick={() => onSelect(order)}
                    className={`p-3 rounded-xl border shadow-sm hover:shadow-md transition-all cursor-pointer group
                        ${selectedId === order.id 
                            ? 'bg-white dark:bg-aqua-800 border-aqua-500 ring-1 ring-aqua-500' 
                            : 'bg-white dark:bg-aqua-900 border-gray-200 dark:border-aqua-800 hover:border-aqua-400 dark:hover:border-aqua-600'}`}
                >
                    <div className="flex justify-between items-start mb-2">
                        <span className="font-bold text-gray-700 dark:text-white text-[10px] bg-gray-100 dark:bg-aqua-950 px-1.5 py-0.5 rounded">{order.id}</span>
                        {getSourceIcon(order.source)}
                    </div>
                    <p className="text-xs text-gray-700 dark:text-gray-300 font-medium mb-1 truncate">{order.customer}</p>
                    <div className="flex justify-between items-end mt-2 pt-2 border-t border-gray-100 dark:border-aqua-800/50">
                        <span className="text-[10px] text-gray-500">{order.items.length} Items</span>
                        <span className="text-xs font-black text-gray-900 dark:text-white">{order.amount}</span>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default OrderManagement;
