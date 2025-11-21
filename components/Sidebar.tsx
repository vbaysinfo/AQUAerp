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
  FlaskConical,
  ClipboardList,
  Layers
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
      { id: 'finance-analytics', label: 'Analytics' },
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
    id: 'crm', 
    label: 'Farmer 360', 
    icon: Wheat,
    subItems: [
        { id: 'crm-list', label: 'Farmer List' },
        { id: 'crm-approvals', label: 'Registration Approvals' },
        { id: 'crm-tickets', label: 'Support Tickets' },
    ]
  },
];

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['feed-plant']);

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
    <aside className="flex flex-col w-64 bg-aqua-900 border-r border-aqua-800 text-white h-full shrink-0">
      <div className="p-6 flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-aqua-500 to-blue-600 flex items-center justify-center shadow-lg shadow-aqua-500/20">
            <Leaf className="text-white h-6 w-6" />
        </div>
        <div>
          <h1 className="font-bold text-lg leading-tight">AquaERP</h1>
          <p className="text-aqua-400 text-xs">Super Admin</p>
        </div>
      </div>

      <nav className="flex-1 px-3 space-y-1 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isExpanded = expandedMenus.includes(item.id);
          const hasSubMenu = item.subItems && item.subItems.length > 0;
          const isActive = activeTab === item.id || item.subItems?.some(sub => sub.id === activeTab);

          return (
            <div key={item.id} className="space-y-1">
              <button
                onClick={() => hasSubMenu ? toggleMenu(item.id) : setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 
                  ${isActive && !hasSubMenu
                    ? 'bg-aqua-700 text-white shadow-md' 
                    : 'text-gray-400 hover:bg-aqua-800 hover:text-white'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} className={isActive ? 'text-aqua-500' : ''} />
                  {item.label}
                </div>
                {hasSubMenu && (
                  isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />
                )}
              </button>

              {hasSubMenu && isExpanded && (
                <div className="pl-11 space-y-1">
                  {item.subItems?.map((subItem) => {
                     const isSubActive = activeTab === subItem.id;
                     return (
                        <button
                            key={subItem.id}
                            onClick={() => setActiveTab(subItem.id)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors
                                ${isSubActive 
                                    ? 'bg-aqua-800/50 text-aqua-400 font-medium border-l-2 border-aqua-500 rounded-l-none' 
                                    : 'text-gray-500 hover:text-gray-300 hover:bg-aqua-900/50'
                                }`
                            }
                        >
                            {subItem.label}
                        </button>
                     );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-aqua-800">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-aqua-800 rounded-lg transition-colors text-sm font-medium">
          <Settings size={20} />
          Settings
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors text-sm font-medium mt-1">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;