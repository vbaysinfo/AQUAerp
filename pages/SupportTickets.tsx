
import React, { useState } from 'react';
import { 
    Search, 
    Filter, 
    MessageSquare, 
    Clock, 
    User, 
    CheckCircle, 
    AlertCircle, 
    Send, 
    Paperclip, 
    MoreVertical, 
    Phone,
    AlertTriangle
} from 'lucide-react';

interface Ticket {
    id: string;
    subject: string;
    farmer: string;
    farmerId: string;
    avatar: string;
    status: 'Open' | 'In Progress' | 'Resolved';
    priority: 'High' | 'Medium' | 'Low';
    category: 'Disease' | 'Order' | 'Technical' | 'Feed';
    lastMessage: string;
    timestamp: string;
    unread: boolean;
    messages: {
        id: number;
        sender: 'Farmer' | 'Agent';
        text: string;
        time: string;
    }[];
}

const initialTickets: Ticket[] = [
    {
        id: 'TKT-9921',
        subject: 'White Spot Symptoms Detected',
        farmer: 'Kamehameha Farms',
        farmerId: 'F001',
        avatar: 'https://picsum.photos/id/433/200',
        status: 'Open',
        priority: 'High',
        category: 'Disease',
        lastMessage: 'The shrimp are lethargic and have white spots on the shell.',
        timestamp: '10 mins ago',
        unread: true,
        messages: [
            { id: 1, sender: 'Farmer', text: 'Hello, I need urgent help. I noticed white spots on my Vannamei shrimp in Pond A-2.', time: '10:30 AM' },
            { id: 2, sender: 'Farmer', text: 'The shrimp are lethargic and have white spots on the shell. Please advise.', time: '10:32 AM' }
        ]
    },
    {
        id: 'TKT-9920',
        subject: 'Order Delivery Delayed',
        farmer: 'Maui Prawns Co.',
        farmerId: 'F003',
        avatar: 'https://picsum.photos/id/64/200',
        status: 'In Progress',
        priority: 'Medium',
        category: 'Order',
        lastMessage: 'We are checking with the logistics driver now.',
        timestamp: '2 hours ago',
        unread: true,
        messages: [
            { id: 1, sender: 'Farmer', text: 'My feed order #ORD-8824 was supposed to arrive yesterday.', time: '09:00 AM' },
            { id: 2, sender: 'Agent', text: 'Apologies for the delay. Let me track that for you immediately.', time: '09:15 AM' },
            { id: 3, sender: 'Agent', text: 'We are checking with the logistics driver now.', time: '09:20 AM' }
        ]
    },
    {
        id: 'TKT-9918',
        subject: 'App Login Issue',
        farmer: 'Big Island Aqua',
        farmerId: 'F002',
        avatar: 'https://picsum.photos/id/54/200',
        status: 'Resolved',
        priority: 'Low',
        category: 'Technical',
        lastMessage: 'Password reset link sent successfully.',
        timestamp: 'Yesterday',
        unread: false,
        messages: [
            { id: 1, sender: 'Farmer', text: 'I cannot login to the mobile app. It says invalid credentials.', time: 'Yesterday' },
            { id: 2, sender: 'Agent', text: 'Password reset link sent successfully. Please check your email.', time: 'Yesterday' }
        ]
    },
    {
        id: 'TKT-9915',
        subject: 'Feed Quality Inquiry',
        farmer: 'Kauai Shrimp',
        farmerId: 'F004',
        avatar: 'https://picsum.photos/id/91/200',
        status: 'Open',
        priority: 'Medium',
        category: 'Feed',
        lastMessage: 'Is the new batch of Grower Feed sinking or floating?',
        timestamp: '2 days ago',
        unread: false,
        messages: [
            { id: 1, sender: 'Farmer', text: 'Is the new batch of Grower Feed sinking or floating type?', time: 'Mon' }
        ]
    }
];

const SupportTickets: React.FC = () => {
    const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
    const [selectedTicketId, setSelectedTicketId] = useState<string | null>(initialTickets[0].id);
    const [replyText, setReplyText] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    const selectedTicket = tickets.find(t => t.id === selectedTicketId);

    const activeCount = tickets.filter(t => t.status === 'Open').length;
    const urgentCount = tickets.filter(t => t.priority === 'High').length;

    const handleSendMessage = () => {
        if (!replyText.trim() || !selectedTicketId) return;
        
        const newMessage = {
            id: Date.now(),
            sender: 'Agent' as const,
            text: replyText,
            time: 'Just now'
        };

        setTickets(prev => prev.map(t => {
            if (t.id === selectedTicketId) {
                return {
                    ...t,
                    messages: [...t.messages, newMessage],
                    lastMessage: `You: ${replyText}`,
                    status: 'In Progress', // Auto update status
                    unread: false
                };
            }
            return t;
        }));
        setReplyText('');
    };

    const markAsResolved = (id: string) => {
        setTickets(prev => prev.map(t => t.id === id ? { ...t, status: 'Resolved', unread: false } : t));
    };

    return (
        <div className="flex flex-col h-full max-w-[1920px] mx-auto space-y-4 pb-6">
            
            {/* Header Stats */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-4 shrink-0">
                <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        Support Tickets
                        <span className="flex h-3 w-3 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.6)]"></span>
                    </h2>
                    <p className="text-aqua-400 text-xs mt-1">Farmer inquiries and emergency alerts.</p>
                </div>
                <div className="flex gap-3">
                    <div className="bg-aqua-800/50 border border-aqua-700 px-4 py-2 rounded-xl flex items-center gap-3">
                        <div className="p-1.5 bg-red-500/20 text-red-400 rounded-lg"><AlertCircle size={18}/></div>
                        <div>
                            <p className="text-[10px] text-gray-400 uppercase font-bold">Open Tickets</p>
                            <p className="text-lg font-bold text-white">{activeCount}</p>
                        </div>
                    </div>
                    <div className="bg-aqua-800/50 border border-aqua-700 px-4 py-2 rounded-xl flex items-center gap-3">
                        <div className="p-1.5 bg-orange-500/20 text-orange-400 rounded-lg"><AlertTriangle size={18}/></div>
                        <div>
                            <p className="text-[10px] text-gray-400 uppercase font-bold">High Priority</p>
                            <p className="text-lg font-bold text-white">{urgentCount}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Layout */}
            <div className="flex-1 flex flex-col lg:flex-row gap-4 min-h-0 overflow-hidden">
                
                {/* Left: Ticket List */}
                <div className="w-full lg:w-1/3 bg-aqua-900/30 border border-aqua-800 rounded-2xl flex flex-col overflow-hidden">
                    {/* Search & Filters */}
                    <div className="p-3 border-b border-aqua-800 space-y-3 bg-aqua-900/50">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14}/>
                            <input 
                                type="text" 
                                placeholder="Search tickets..." 
                                className="w-full bg-aqua-800 border border-aqua-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-aqua-500"
                            />
                        </div>
                        <div className="flex gap-2">
                            {['All', 'Open', 'Resolved'].map(status => (
                                <button 
                                    key={status}
                                    onClick={() => setFilterStatus(status)}
                                    className={`flex-1 py-1.5 text-[10px] font-bold rounded-lg border transition-all ${
                                        filterStatus === status 
                                        ? 'bg-aqua-700 text-white border-aqua-600' 
                                        : 'bg-aqua-900/50 text-gray-400 border-aqua-800 hover:bg-aqua-800'
                                    }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Scrollable List */}
                    <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
                        {tickets.map(ticket => (
                            <div 
                                key={ticket.id}
                                onClick={() => { setSelectedTicketId(ticket.id); }}
                                className={`p-3 rounded-xl cursor-pointer transition-all border relative group
                                    ${selectedTicketId === ticket.id 
                                        ? 'bg-aqua-800 border-aqua-500 shadow-md' 
                                        : 'bg-aqua-800/20 border-aqua-800/50 hover:bg-aqua-800/50 hover:border-aqua-700'}`}
                            >
                                {/* Red Dot Indicator for Unread */}
                                {ticket.unread && (
                                    <div className="absolute top-3 right-3 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-aqua-900 shadow-sm animate-pulse"></div>
                                )}

                                <div className="flex justify-between items-start mb-1.5">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-bold text-aqua-400 bg-aqua-900/50 px-1.5 py-0.5 rounded">{ticket.id}</span>
                                        {ticket.priority === 'High' && (
                                            <span className="text-[10px] font-bold text-red-400 bg-red-900/20 px-1.5 py-0.5 rounded flex items-center gap-1">
                                                <AlertTriangle size={10}/> High
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-[10px] text-gray-500">{ticket.timestamp}</span>
                                </div>
                                
                                <h4 className={`text-xs font-bold mb-1 truncate pr-4 ${ticket.unread ? 'text-white' : 'text-gray-300'}`}>{ticket.subject}</h4>
                                <p className="text-[10px] text-gray-400 line-clamp-2 mb-2">{ticket.lastMessage}</p>
                                
                                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-aqua-700/30">
                                    <img src={ticket.avatar} alt="" className="h-5 w-5 rounded-full" />
                                    <span className="text-[10px] text-gray-300 font-medium">{ticket.farmer}</span>
                                    <span className={`ml-auto text-[10px] px-2 py-0.5 rounded-full border ${
                                        ticket.status === 'Open' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                        ticket.status === 'Resolved' ? 'bg-gray-500/10 text-gray-400 border-gray-500/20' :
                                        'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                    }`}>
                                        {ticket.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Chat/Detail View */}
                <div className="flex-1 bg-aqua-900/30 border border-aqua-800 rounded-2xl flex flex-col overflow-hidden">
                    {selectedTicket ? (
                        <>
                            {/* Chat Header */}
                            <div className="p-4 border-b border-aqua-800 bg-aqua-800/40 flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <img src={selectedTicket.avatar} alt="" className="h-10 w-10 rounded-full border-2 border-aqua-700" />
                                    <div>
                                        <h3 className="font-bold text-white text-sm flex items-center gap-2">
                                            {selectedTicket.subject}
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                                                selectedTicket.category === 'Disease' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-aqua-500/10 text-aqua-400 border-aqua-500/20'
                                            }`}>{selectedTicket.category}</span>
                                        </h3>
                                        <p className="text-xs text-gray-400 flex items-center gap-1">
                                            <User size={10}/> {selectedTicket.farmer} ({selectedTicket.farmerId})
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="p-2 hover:bg-aqua-700 rounded-full text-gray-400 hover:text-white transition-colors">
                                        <Phone size={18} />
                                    </button>
                                    {selectedTicket.status !== 'Resolved' && (
                                        <button 
                                            onClick={() => markAsResolved(selectedTicket.id)}
                                            className="flex items-center gap-1.5 bg-green-600 hover:bg-green-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg shadow-green-500/20 transition-all"
                                        >
                                            <CheckCircle size={14} /> Resolve
                                        </button>
                                    )}
                                    <button className="p-2 hover:bg-aqua-700 rounded-full text-gray-400 hover:text-white transition-colors">
                                        <MoreVertical size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Chat Messages Area */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                                <div className="flex justify-center">
                                    <span className="text-[10px] text-gray-500 bg-aqua-900 px-2 py-1 rounded-full">{selectedTicket.timestamp}</span>
                                </div>
                                
                                {selectedTicket.messages.map((msg) => (
                                    <div key={msg.id} className={`flex ${msg.sender === 'Agent' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm
                                            ${msg.sender === 'Agent' 
                                                ? 'bg-aqua-600 text-white rounded-br-sm' 
                                                : 'bg-aqua-800 text-gray-200 rounded-bl-sm border border-aqua-700'}`}
                                        >
                                            <p>{msg.text}</p>
                                            <p className={`text-[9px] mt-1 text-right ${msg.sender === 'Agent' ? 'text-aqua-200' : 'text-gray-500'}`}>{msg.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Input Area */}
                            <div className="p-3 border-t border-aqua-800 bg-aqua-800/20">
                                {selectedTicket.status === 'Resolved' ? (
                                    <div className="text-center p-2 bg-green-900/20 border border-green-900/50 rounded-lg">
                                        <p className="text-xs text-green-400 font-medium flex items-center justify-center gap-2">
                                            <CheckCircle size={14}/> This ticket has been marked as resolved.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <button className="p-2 text-gray-400 hover:text-white hover:bg-aqua-800 rounded-full transition-colors">
                                            <Paperclip size={18} />
                                        </button>
                                        <input 
                                            type="text" 
                                            placeholder="Type your reply..." 
                                            className="flex-1 bg-aqua-900 border border-aqua-700 rounded-full px-4 py-2.5 text-sm text-white focus:outline-none focus:border-aqua-500 focus:ring-1 focus:ring-aqua-500 transition-all"
                                            value={replyText}
                                            onChange={(e) => setReplyText(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                        />
                                        <button 
                                            onClick={handleSendMessage}
                                            disabled={!replyText.trim()}
                                            className="p-2.5 bg-aqua-500 hover:bg-aqua-400 text-aqua-950 rounded-full shadow-lg shadow-aqua-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <Send size={18} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500">
                            <MessageSquare size={48} className="mb-4 opacity-20"/>
                            <p className="text-sm">Select a ticket to view the conversation</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SupportTickets;
