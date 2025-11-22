
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Truck, 
  Users, 
  BarChart3, 
  Package, 
  Wheat, 
  Settings, 
  LogOut,
  Leaf,
  ChevronDown,
  ChevronRight,
  Factory,
  ClipboardCheck,
} from 'lucide-react';
import { NavItem } from '../types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const navItems: NavItem[] = [
  { 
    id: 'enterprise', 
    label: 'Dashboard', 
    icon: LayoutDashboard 
  },
  { 
    id: 'crm', 
    label: 'Farmer 360', 
    icon: Wheat,
    subItems: [
        { id: 'crm-list', label: 'Farmer List' },
        { id: 'crm-iot', label: 'IoT Connections' },
        { id: 'crm-approvals', label: 'Registration Approvals' },
        { id: 'crm-tickets', label: 'Support Tickets' },
    ]
  },
  {
    id: 'field-ops',
    label: 'Field Operators',
    icon: ClipboardCheck,
    subItems: [
      { id: 'field-technician', label: 'Technician Visits' },
      { id: 'field-sales', label: 'Field Sales' },
    ]
  },
  { 
    id: 'inventory', 
    label: 'Inventory', 
    icon: Package,
    subItems: [
      { id: 'inventory-feed', label: 'Feed Supply' },
      { id: 'inventory-seed', label: 'Seed Supply' },
      { id: 'inventory-medicine', label: 'Medicine Supply' },
    ]
  },
  { 
    id: 'logistics', 
    label: 'Logistics', 
    icon: Truck,
    subItems: [
      { id: 'orders-list', label: 'Order Management' },
      { id: 'fleet', label: 'Fleet Tracking' },
    ]
  },
  { 
    id: 'finance', 
    label: 'Finance', 
    icon: BarChart3,
    subItems: [
      { id: 'finance-analytics', label: 'Overview' },
      { id: 'finance-feed', label: 'Feed Financials' },
      { id: 'finance-seed', label: 'Seed Financials' },
      { id: 'finance-medicine', label: 'Medicine Financials' },
      { id: 'finance-reports', label: 'Statements' },
    ]
  },
  { 
    id: 'hr', 
    label: 'HR Management', 
    icon: Users,
    subItems: [
      { id: 'hr-employees', label: 'Employees' },
      { id: 'hr-payroll', label: 'Payroll' },
    ]
  },
  { 
    id: 'feed-plant', 
    label: 'Feed Plant', 
    icon: Factory,
    subItems: [
      { id: 'feed-dashboard', label: 'Plant Overview' },
      { id: 'feed-production', label: 'Production Planning' },
      { id: 'feed-materials', label: 'Raw Materials' },
      { id: 'feed-formulas', label: 'Formulas & Types' },
      { id: 'feed-qc', label: 'Quality Control' },
    ]
  },
];

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['crm']);

  // Auto-expand menu if a child is active
  useEffect(() => {
    const parent = navItems.find(item => item.subItems?.some(sub => sub.id === activeTab));
    if (parent && !expandedMenus.includes(parent.id)) {
      setExpandedMenus(prev => [...prev, parent.id]);
    }
  }, [activeTab]);

  const toggleMenu = (id: string) => {
    setExpandedMenus(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <aside className="flex flex-col w-64 bg-white dark:bg-aqua-900 border-r border-gray-200 dark:border-aqua-800 text-gray-800 dark:text-white h-full shrink-0 transition-colors duration-300">
      <div className="p-6 flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-aqua-500 to-blue-600 flex items-center justify-center shadow-lg shadow-aqua-500/20">
            <Leaf className="text-white h-6 w-6" />
        </div>
        <div>
          <h1 className="font-bold text-lg leading-tight text-gray-900 dark:text-white">AquaERP</h1>
          <p className="text-gray-500 dark:text-aqua-400 text-xs">Super Admin</p>
        </div>
      </div>

      <nav className="flex-1 px-3 space-y-1 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isExpanded = expandedMenus.includes(item.id);
          const hasSubMenu = item.subItems && item.subItems.length > 0;
          const isActive = activeTab === item.id || item.subItems?.some(sub => sub.id === activeTab);
          
          // Notification Logic for Farmer 360 Menu
          const showParentBadge = item.id === 'crm';

          return (
            <div key={item.id} className="space-y-1">
              <button
                onClick={() => hasSubMenu ? toggleMenu(item.id) : setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 relative
                  ${isActive && !hasSubMenu
                    ? 'bg-aqua-500 text-white shadow-md dark:bg-aqua-700' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-aqua-800 hover:text-gray-900 dark:hover:text-white'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} className={isActive ? 'text-white dark:text-aqua-500' : ''} />
                  {item.label}
                </div>
                <div className="flex items-center gap-2">
                    {showParentBadge && !isExpanded && (
                        <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.6)]"></span>
                    )}
                    {hasSubMenu && (
                    isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />
                    )}
                </div>
              </button>

              {hasSubMenu && isExpanded && (
                <div className="pl-11 space-y-1">
                  {item.subItems?.map((subItem) => {
                     const isSubActive = activeTab === subItem.id;
                     const showSubBadge = subItem.id === 'crm-tickets';

                     return (
                        <button
                            key={subItem.id}
                            onClick={() => setActiveTab(subItem.id)}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors
                                ${isSubActive 
                                    ? 'bg-aqua-50 dark:bg-aqua-800/50 text-aqua-700 dark:text-aqua-400 font-medium border-l-2 border-aqua-500 rounded-l-none' 
                                    : 'text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-aqua-900/50'
                                }`
                            }
                        >
                            <span>{subItem.label}</span>
                            {showSubBadge && (
                                <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                            )}
                        </button>
                     );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-gray-200 dark:border-aqua-800">
        <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
                activeTab === 'settings' 
                ? 'bg-aqua-50 dark:bg-aqua-800 text-aqua-600 dark:text-white' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-aqua-800'
            }`}
        >
          <Settings size={20} />
          Settings
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors text-sm font-medium mt-1">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
