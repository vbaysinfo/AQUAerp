
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import EnterpriseDashboard from './pages/EnterpriseDashboard';
import OrderManagement from './pages/OrderManagement';
import InventoryIntelligence from './pages/InventoryIntelligence';
import FinancialAnalytics from './pages/FinancialAnalytics';
import EmployeeManagement from './pages/EmployeeManagement';
import Farmer360 from './pages/Farmer360';
import FeedPlant from './pages/FeedPlant';
import FleetTracking from './pages/FleetTracking';
import FinancialStatements from './pages/FinancialStatements';
import SupportTickets from './pages/SupportTickets';
import IoTConnections from './pages/IoTConnections';
import TechnicianDashboard from './pages/TechnicianDashboard';
import SalesDashboard from './pages/SalesDashboard';
import SettingsPage from './pages/SettingsPage';
import { Bell, Search, Menu, Sparkles, AlertCircle, AlertTriangle, Info, Check, Sun, Moon } from 'lucide-react';
import AiModal from './components/AiModal';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('enterprise');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  // Theme Management - Defaulting to Light Mode as requested
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Shared search state (simulated)
  const [searchQuery, setSearchQuery] = useState('');

  const notifications = [
    { id: 1, title: 'Critical Stock Alert', message: 'Fishmeal stock below 15 tons. Reorder immediately.', time: '2 min ago', type: 'critical' },
    { id: 2, title: 'New Order Request', message: 'Kamehameha Farms placed a mobile order for $3,240.', time: '15 min ago', type: 'info' },
    { id: 3, title: 'Quality Control Warning', message: 'Batch #B-2023-090 failed moisture test in QC.', time: '1 hour ago', type: 'warning' },
    { id: 4, title: 'Vehicle Delayed', message: 'Truck AP 39 CX 9921 reported breakdown near Guntur.', time: '2 hours ago', type: 'warning' },
  ];

  // Determine which page component to render based on activeTab
  const renderContent = () => {
    switch (activeTab) {
      case 'enterprise': 
        return <EnterpriseDashboard />;
      
      // Feed Plant
      case 'feed-dashboard':
        return <FeedPlant initialTab="overview" />;
      case 'feed-production':
        return <FeedPlant initialTab="production" />;
      case 'feed-materials':
        return <FeedPlant initialTab="materials" />;
      case 'feed-formulas':
        return <FeedPlant initialTab="formulas" />;
      case 'feed-qc':
        return <FeedPlant initialTab="qc" />;
      case 'feed-plant':
        return <FeedPlant initialTab="overview" />;

      // Inventory Sub-menus
      case 'inventory-feed': 
        return <InventoryIntelligence category="Feed" />;
      case 'inventory-seed': 
        return <InventoryIntelligence category="Seed" />;
      case 'inventory-medicine': 
        return <InventoryIntelligence category="Medicine" />;
      case 'inventory': // Fallback if parent is somehow selected
        return <InventoryIntelligence category="General" />;

      // Logistics
      case 'orders-list':
      case 'logistics':
        return <OrderManagement />;
      case 'fleet':
        return <FleetTracking />;

      // Finance
      case 'finance-analytics': 
      case 'finance':
        return <FinancialAnalytics category="General" />;
      case 'finance-feed':
        return <FinancialAnalytics category="Feed" />;
      case 'finance-seed':
        return <FinancialAnalytics category="Seed" />;
      case 'finance-medicine':
        return <FinancialAnalytics category="Medicine" />;
      case 'finance-reports':
         return <FinancialStatements />;

      // HR
      case 'hr-employees':
      case 'hr': 
        return <EmployeeManagement />;
      case 'hr-payroll':
        return <div className="flex items-center justify-center h-full text-gray-400">Payroll Module Coming Soon</div>;

      // CRM / Farmer 360
      case 'crm-list':
        return <Farmer360 initialView="list" />;
      case 'crm-approvals':
        return <Farmer360 initialView="approvals" />;
      case 'crm-iot':
        return <IoTConnections />;
      case 'crm-tickets':
         return <SupportTickets />;
      case 'crm-profiles': // Legacy fallback
      case 'crm': 
        return <Farmer360 initialView="list" />;
        
      // Field Operators
      case 'field-technician':
        return <TechnicianDashboard />;
      case 'field-sales':
        return <SalesDashboard />;

      // Settings
      case 'settings':
        return <SettingsPage />;
      
      default: return <EnterpriseDashboard />;
    }
  };

  // Helper to get readable title for AI context
  const getPageTitle = () => {
    // Simple mapping or just use activeTab for now
    if(activeTab.includes('inventory')) return 'Inventory Management';
    if(activeTab.includes('finance')) return 'Financial Analytics';
    if(activeTab.includes('hr')) return 'Human Resources';
    if(activeTab.includes('crm')) return 'Farmer Relations';
    if(activeTab.includes('orders')) return 'Orders & Logistics';
    if(activeTab.includes('feed')) return 'Feed Plant Operations';
    if(activeTab.includes('fleet')) return 'Fleet Tracking';
    if(activeTab.includes('field')) return 'Field Operations';
    if(activeTab === 'settings') return 'System Settings';
    return 'Enterprise Dashboard';
  }

  const getPageContext = () => {
    return {
        activeView: activeTab,
        timestamp: new Date().toISOString(),
        user: "Super Admin",
        note: `User is currently viewing the ${getPageTitle()} section.`
    };
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-aqua-900 text-gray-900 dark:text-gray-100 font-sans overflow-hidden selection:bg-aqua-500 selection:text-aqua-900 transition-colors duration-300">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}
      
      {/* Sidebar (Hidden on Mobile unless toggled) */}
      <div className={`fixed lg:relative z-30 h-full transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <Sidebar activeTab={activeTab} setActiveTab={(tab) => { setActiveTab(tab); setIsMobileMenuOpen(false); }} />
      </div>

      {/* Main Layout */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Header */}
        <header className="h-16 bg-white/80 dark:bg-aqua-800/50 backdrop-blur-md border-b border-gray-200 dark:border-aqua-700 flex items-center justify-between px-4 lg:px-8 shrink-0 z-10 transition-colors duration-300">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-aqua-700 rounded-lg text-gray-600 dark:text-white" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={20} />
            </button>
            
            <div className="relative hidden md:block w-64 lg:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-aqua-400" size={18} />
              <input 
                type="text" 
                placeholder={`Search ${getPageTitle()}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-100 dark:bg-aqua-900/50 border border-gray-200 dark:border-aqua-700 rounded-full py-2 pl-10 pr-4 text-sm text-gray-900 dark:text-white placeholder:text-gray-500 focus:outline-none focus:border-aqua-500 focus:ring-1 focus:ring-aqua-500 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Theme Toggle */}
            <button 
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-aqua-700 text-gray-500 dark:text-aqua-400 transition-colors"
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button 
              onClick={() => setIsAiModalOpen(true)}
              className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-aqua-600 to-aqua-500 hover:from-aqua-500 hover:to-aqua-400 text-white dark:text-aqua-950 px-4 py-2 rounded-full text-sm font-bold shadow-lg shadow-aqua-500/20 transition-all hover:scale-105"
            >
              <Sparkles size={16} />
              <span>Ask AI</span>
            </button>
            
            {/* Notification Bell with Dropdown */}
            <div className="relative">
                <button 
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className={`relative p-2 rounded-full transition-colors ${isNotificationsOpen ? 'bg-gray-200 dark:bg-aqua-700 text-gray-800 dark:text-white' : 'hover:bg-gray-100 dark:hover:bg-aqua-700 text-gray-500 dark:text-gray-300'}`}
                >
                  <Bell size={20} />
                  <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white dark:border-aqua-800 animate-pulse"></span>
                </button>

                {isNotificationsOpen && (
                  <>
                    {/* Invisible backdrop to handle click-outside */}
                    <div className="fixed inset-0 z-40" onClick={() => setIsNotificationsOpen(false)}></div>
                    
                    {/* Dropdown Panel */}
                    <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-aqua-900 border border-gray-200 dark:border-aqua-700 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 ring-1 ring-black/5 dark:ring-black/20">
                        <div className="p-3 border-b border-gray-100 dark:border-aqua-800 flex justify-between items-center bg-gray-50 dark:bg-aqua-950/50">
                            <h3 className="text-xs font-bold text-gray-700 dark:text-white uppercase tracking-wider">Notifications</h3>
                            <button className="text-[10px] text-aqua-600 dark:text-aqua-400 hover:text-aqua-800 dark:hover:text-white flex items-center gap-1 transition-colors">
                                <Check size={12} /> Mark all read
                            </button>
                        </div>
                        <div className="max-h-[320px] overflow-y-auto custom-scrollbar">
                            {notifications.map(n => (
                                <div key={n.id} className="p-3 border-b border-gray-100 dark:border-aqua-800/50 hover:bg-gray-50 dark:hover:bg-aqua-800/50 transition-colors cursor-pointer group">
                                    <div className="flex gap-3">
                                        <div className={`mt-0.5 h-8 w-8 rounded-lg flex items-center justify-center shrink-0 border ${
                                            n.type === 'critical' ? 'bg-red-500/10 border-red-500/30 text-red-500' : 
                                            n.type === 'warning' ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500' : 
                                            'bg-blue-500/10 border-blue-500/30 text-blue-500'
                                        }`}>
                                            {n.type === 'critical' ? <AlertCircle size={14} /> : n.type === 'warning' ? <AlertTriangle size={14} /> : <Info size={14} />}
                                        </div>
                                        <div>
                                            <div className="flex justify-between items-start">
                                                <p className="text-xs font-bold text-gray-800 dark:text-white group-hover:text-aqua-600 dark:group-hover:text-aqua-400 transition-colors">{n.title}</p>
                                                <span className="text-[9px] text-gray-400 dark:text-gray-500 whitespace-nowrap ml-2">{n.time}</span>
                                            </div>
                                            <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">{n.message}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-2 text-center bg-gray-50 dark:bg-aqua-950/30 border-t border-gray-100 dark:border-aqua-800">
                            <button className="text-[10px] font-medium text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors">View All Activity</button>
                        </div>
                    </div>
                  </>
                )}
            </div>
            
            <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 bg-cover bg-center border-2 border-gray-300 dark:border-aqua-700 cursor-pointer" style={{ backgroundImage: 'url(https://picsum.photos/200)' }}></div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 scroll-smooth relative">
            {/* Render the Active Page */}
            {renderContent()}
            
            {/* Floating AI Button for Mobile */}
            <button 
              onClick={() => setIsAiModalOpen(true)}
              className="sm:hidden fixed bottom-6 right-6 h-14 w-14 rounded-full bg-aqua-500 text-aqua-900 flex items-center justify-center shadow-xl shadow-aqua-500/30 z-40 hover:scale-110 transition-transform"
            >
              <Sparkles size={24} />
            </button>
        </main>
      </div>

      {/* AI Modal */}
      <AiModal 
        isOpen={isAiModalOpen} 
        onClose={() => setIsAiModalOpen(false)} 
        pageData={getPageContext()} 
        pageTitle={getPageTitle()}
      />
    </div>
  );
};

export default App;
