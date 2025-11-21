
import React, { useState } from 'react';
import { 
    Filter, 
    Search, 
    Smartphone, 
    Shield, 
    Mail, 
    Phone, 
    Calendar, 
    Key, 
    Check, 
    X,
    Edit,
    UserPlus,
    MoreHorizontal
} from 'lucide-react';
import { Employee } from '../types';

const initialEmployees: Employee[] = [
    { 
        id: 'AERP-0012', 
        name: 'Olivia Rhye', 
        role: 'Technician', 
        department: 'Field Ops', 
        status: 'Active', 
        email: 'olivia@aquaerp.com',
        phone: '+1 (555) 123-4567',
        joinDate: '2022-03-15',
        mobileAppAccess: true,
        lastLogin: '2 hrs ago',
        permissions: ['crm', 'inventory'],
        avatar: 'https://picsum.photos/id/1027/200'
    },
    { 
        id: 'AERP-0025', 
        name: 'Phoenix Baker', 
        role: 'Logistics Mgr', 
        department: 'Supply Chain', 
        status: 'Active', 
        email: 'phoenix@aquaerp.com',
        phone: '+1 (555) 987-6543',
        joinDate: '2021-11-01',
        mobileAppAccess: false,
        lastLogin: '1 day ago',
        permissions: ['logistics', 'inventory', 'orders'],
        avatar: 'https://picsum.photos/id/338/200'
    },
    { 
        id: 'AERP-0003', 
        name: 'Lana Steiner', 
        role: 'Finance Head', 
        department: 'Accounting', 
        status: 'On Leave', 
        email: 'lana@aquaerp.com',
        phone: '+1 (555) 456-7890',
        joinDate: '2020-05-20',
        mobileAppAccess: true,
        lastLogin: '5 days ago',
        permissions: ['finance', 'hr', 'reports'],
        avatar: 'https://picsum.photos/id/64/200'
    },
    { 
        id: 'AERP-0001', 
        name: 'Demi Wilkinson', 
        role: 'Sys Admin', 
        department: 'IT', 
        status: 'Active', 
        email: 'demi@aquaerp.com',
        phone: '+1 (555) 222-3333',
        joinDate: '2019-01-10',
        mobileAppAccess: true,
        lastLogin: 'Just now',
        permissions: ['all'],
        avatar: 'https://picsum.photos/id/342/200'
    },
    { 
        id: 'AERP-0045', 
        name: 'John Doe', 
        role: 'Plant Operator', 
        department: 'Production', 
        status: 'Active', 
        email: 'john.d@aquaerp.com',
        phone: '+1 (555) 777-8888',
        joinDate: '2023-06-01',
        mobileAppAccess: false,
        lastLogin: 'Never',
        permissions: ['feed-plant'],
        avatar: 'https://picsum.photos/id/237/200'
    },
];

const availableModules = [
    { id: 'feed-plant', label: 'Feed Plant' },
    { id: 'inventory', label: 'Inventory' },
    { id: 'logistics', label: 'Logistics' },
    { id: 'finance', label: 'Finance' },
    { id: 'hr', label: 'HR Management' },
    { id: 'crm', label: 'Farmer 360' },
];

const EmployeeManagement: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('All');
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Get unique departments for filter
    const departments = ['All', ...Array.from(new Set(employees.map(e => e.department)))];

    // Filter logic
    const filteredEmployees = employees.filter(emp => {
        const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              emp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              emp.id.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesDept = selectedDepartment === 'All' || emp.department === selectedDepartment;

        return matchesSearch && matchesDept;
    });

    const handleEditClick = (emp: Employee) => {
        setSelectedEmployee(emp);
        setIsModalOpen(true);
    };

    const handleSave = (updatedEmp: Employee) => {
        setEmployees(prev => prev.map(e => e.id === updatedEmp.id ? updatedEmp : e));
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-10">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-white">Employee Access & HR</h2>
                    <p className="text-aqua-400 text-sm">Manage staff profiles, mobile app logins, and ERP permissions.</p>
                </div>
                <button className="bg-aqua-500 hover:bg-aqua-400 text-aqua-950 font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-aqua-500/20">
                    <UserPlus size={18} />
                    Add Employee
                </button>
            </div>

            {/* KPIs Compact */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-aqua-800/50 border border-aqua-700 p-4 rounded-lg flex items-center justify-between">
                    <div>
                        <p className="text-gray-400 text-xs uppercase font-bold">Total Staff</p>
                        <p className="text-xl font-bold text-white">{employees.length}</p>
                    </div>
                    <div className="h-8 w-8 bg-aqua-900 rounded-full flex items-center justify-center text-aqua-400"><UserPlus size={16}/></div>
                </div>
                <div className="bg-aqua-800/50 border border-aqua-700 p-4 rounded-lg flex items-center justify-between">
                    <div>
                        <p className="text-gray-400 text-xs uppercase font-bold">App Users</p>
                        <p className="text-xl font-bold text-green-400">{employees.filter(e => e.mobileAppAccess).length}</p>
                    </div>
                    <div className="h-8 w-8 bg-aqua-900 rounded-full flex items-center justify-center text-green-400"><Smartphone size={16}/></div>
                </div>
                <div className="bg-aqua-800/50 border border-aqua-700 p-4 rounded-lg flex items-center justify-between">
                    <div>
                        <p className="text-gray-400 text-xs uppercase font-bold">Technicians</p>
                        <p className="text-xl font-bold text-blue-400">{employees.filter(e => e.role.includes('Tech')).length}</p>
                    </div>
                    <div className="h-8 w-8 bg-aqua-900 rounded-full flex items-center justify-center text-blue-400"><Shield size={16}/></div>
                </div>
                <div className="bg-aqua-800/50 border border-aqua-700 p-4 rounded-lg flex items-center justify-between">
                    <div>
                        <p className="text-gray-400 text-xs uppercase font-bold">On Leave</p>
                        <p className="text-xl font-bold text-yellow-400">{employees.filter(e => e.status === 'On Leave').length}</p>
                    </div>
                    <div className="h-8 w-8 bg-aqua-900 rounded-full flex items-center justify-center text-yellow-400"><Calendar size={16}/></div>
                </div>
            </div>

            {/* Filters & Search Bar */}
            <div className="flex flex-col md:flex-row gap-4 bg-aqua-800/30 p-3 rounded-xl border border-aqua-800 backdrop-blur-sm">
                
                {/* Department Filter */}
                <div className="relative min-w-[200px]">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-aqua-400" size={16} />
                    <select 
                        value={selectedDepartment}
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                        className="w-full bg-aqua-900 border border-aqua-700 rounded-lg pl-10 pr-8 py-2.5 text-sm text-white focus:outline-none focus:border-aqua-500 cursor-pointer appearance-none"
                    >
                        {departments.map(dept => (
                            <option key={dept} value={dept}>{dept === 'All' ? 'All Departments' : dept}</option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>

                {/* Search Input */}
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input 
                        type="text" 
                        placeholder="Search by Name, ID, or Role..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-aqua-900 border border-aqua-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-aqua-500"
                    />
                </div>
            </div>

            {/* ERP Compact Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredEmployees.length === 0 ? (
                    <div className="col-span-full flex flex-col items-center justify-center py-12 text-gray-500">
                        <UserPlus size={48} className="mb-4 opacity-50" />
                        <p>No employees found matching your criteria.</p>
                    </div>
                ) : filteredEmployees.map((emp) => (
                    <div key={emp.id} className="bg-aqua-800/40 border border-aqua-700 rounded-lg hover:border-aqua-500 transition-all group relative flex flex-col">
                        {/* Card Header */}
                        <div className="p-4 flex items-start gap-3 border-b border-aqua-700/50">
                            <div className="relative">
                                <img src={emp.avatar} alt={emp.name} className="h-12 w-12 rounded-md object-cover border border-aqua-600" />
                                {emp.mobileAppAccess && (
                                    <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-0.5 border border-aqua-800" title="Mobile App Access Enabled">
                                        <Smartphone size={10} className="text-aqua-900 fill-current" />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-white font-bold text-sm truncate">{emp.name}</h3>
                                    <span className={`h-2 w-2 rounded-full ${emp.status === 'Active' ? 'bg-green-500' : emp.status === 'On Leave' ? 'bg-yellow-500' : 'bg-red-500'}`}></span>
                                </div>
                                <p className="text-aqua-400 text-xs truncate">{emp.role}</p>
                                <p className="text-gray-500 text-[10px] truncate">{emp.id}</p>
                            </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-4 space-y-3 flex-1">
                            <div className="grid grid-cols-2 gap-2">
                                <div className="flex items-center gap-2 text-xs text-gray-400">
                                    <Mail size={12} className="shrink-0" />
                                    <span className="truncate">{emp.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-400">
                                    <Phone size={12} className="shrink-0" />
                                    <span className="truncate">{emp.phone}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-400">
                                    <Calendar size={12} className="shrink-0" />
                                    <span>Joined: {new Date(emp.joinDate).toLocaleDateString(undefined, { month: 'short', year: '2-digit' })}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-400">
                                    <Shield size={12} className="shrink-0" />
                                    <span>{emp.department}</span>
                                </div>
                            </div>
                            
                            {/* Permissions Tags */}
                            <div className="pt-2">
                                <p className="text-[10px] uppercase font-bold text-gray-500 mb-1.5">System Access</p>
                                <div className="flex flex-wrap gap-1">
                                    {emp.permissions.includes('all') ? (
                                        <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 text-[10px] rounded border border-purple-500/30">Full Admin</span>
                                    ) : emp.permissions.map(perm => (
                                        <span key={perm} className="px-2 py-0.5 bg-aqua-900 text-gray-300 text-[10px] rounded border border-aqua-700 capitalize">
                                            {perm.replace('-', ' ')}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Card Footer */}
                        <div className="p-3 bg-aqua-900/50 border-t border-aqua-700/50 flex justify-between items-center">
                             <span className="text-[10px] text-gray-500">Last login: {emp.lastLogin}</span>
                             <button 
                                onClick={() => handleEditClick(emp)}
                                className="flex items-center gap-1 text-xs font-medium text-aqua-400 hover:text-white transition-colors"
                             >
                                <Key size={12} /> Manage Access
                             </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- MANAGE ACCESS MODAL --- */}
            {isModalOpen && selectedEmployee && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
                    <div className="bg-aqua-900 border border-aqua-700 w-full max-w-lg rounded-xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
                        {/* Modal Header */}
                        <div className="p-5 border-b border-aqua-700 flex justify-between items-center bg-aqua-800">
                            <div className="flex items-center gap-3">
                                <img src={selectedEmployee.avatar} alt="" className="h-10 w-10 rounded-full border border-aqua-600" />
                                <div>
                                    <h3 className="font-bold text-white text-lg">Manage Access</h3>
                                    <p className="text-xs text-aqua-400">{selectedEmployee.name} ({selectedEmployee.id})</p>
                                </div>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white"><X size={20}/></button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 overflow-y-auto space-y-6">
                            
                            {/* 1. Mobile App Login */}
                            <div className="bg-aqua-800/50 p-4 rounded-lg border border-aqua-700">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="p-2 bg-aqua-900 rounded text-aqua-400"><Smartphone size={20} /></div>
                                        <div>
                                            <h4 className="font-bold text-white text-sm">Mobile App Access</h4>
                                            <p className="text-xs text-gray-400">Allow login to technician mobile app</p>
                                        </div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            checked={selectedEmployee.mobileAppAccess}
                                            onChange={() => setSelectedEmployee({...selectedEmployee, mobileAppAccess: !selectedEmployee.mobileAppAccess})}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-aqua-500"></div>
                                    </label>
                                </div>
                                {selectedEmployee.mobileAppAccess && (
                                    <div className="grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-top-2">
                                        <div>
                                            <label className="block text-xs text-gray-400 mb-1">App Username</label>
                                            <input type="text" value={selectedEmployee.email.split('@')[0]} disabled className="w-full bg-aqua-900 border border-aqua-700 rounded px-3 py-2 text-gray-400 text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-400 mb-1">Reset Password</label>
                                            <button className="w-full bg-aqua-700 hover:bg-aqua-600 text-white text-sm py-2 rounded border border-aqua-600 transition-colors">Send Reset Link</button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* 2. ERP Permissions */}
                            <div>
                                <h4 className="font-bold text-white text-sm mb-3 flex items-center gap-2"><Shield size={16} className="text-aqua-400"/> ERP Module Permissions</h4>
                                <div className="grid grid-cols-2 gap-3">
                                    {availableModules.map(mod => (
                                        <label key={mod.id} className="flex items-center gap-3 p-3 bg-aqua-900/50 rounded border border-aqua-700 cursor-pointer hover:bg-aqua-800 transition-colors">
                                            <div className={`w-5 h-5 rounded border flex items-center justify-center ${selectedEmployee.permissions.includes('all') || selectedEmployee.permissions.includes(mod.id) ? 'bg-aqua-500 border-aqua-500' : 'border-gray-500'}`}>
                                                {(selectedEmployee.permissions.includes('all') || selectedEmployee.permissions.includes(mod.id)) && <Check size={14} className="text-aqua-950" />}
                                            </div>
                                            <span className="text-sm text-gray-300">{mod.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* 3. Account Status */}
                            <div>
                                <h4 className="font-bold text-white text-sm mb-3">Account Status</h4>
                                <select 
                                    value={selectedEmployee.status}
                                    onChange={(e) => setSelectedEmployee({...selectedEmployee, status: e.target.value as any})}
                                    className="w-full bg-aqua-900 border border-aqua-700 text-white rounded px-3 py-2 text-sm focus:ring-1 focus:ring-aqua-500"
                                >
                                    <option value="Active">Active</option>
                                    <option value="On Leave">On Leave</option>
                                    <option value="Terminated">Terminated</option>
                                </select>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-5 border-t border-aqua-700 bg-aqua-800/50 flex justify-end gap-3">
                            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded text-sm font-medium text-gray-400 hover:text-white">Cancel</button>
                            <button onClick={() => handleSave(selectedEmployee)} className="px-6 py-2 rounded bg-aqua-500 hover:bg-aqua-400 text-aqua-950 font-bold text-sm shadow-lg shadow-aqua-500/20">Save Changes</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeeManagement;
