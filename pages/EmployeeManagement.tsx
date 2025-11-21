
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
    UserPlus,
    Save,
    ChevronDown,
    Briefcase,
    User,
    Lock,
    AlertCircle
} from 'lucide-react';
import { Employee, ModuleType } from '../types';

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
        permissions: ['logistics', 'inventory', 'orders', 'fleet'],
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

const availableModules: { id: ModuleType, label: string }[] = [
    { id: 'all', label: 'Full Admin Access' },
    { id: 'feed-plant', label: 'Feed Plant' },
    { id: 'inventory', label: 'Inventory' },
    { id: 'logistics', label: 'Logistics' },
    { id: 'fleet', label: 'Fleet Tracking' },
    { id: 'orders', label: 'Order Management' },
    { id: 'finance', label: 'Finance' },
    { id: 'hr', label: 'HR Management' },
    { id: 'crm', label: 'Farmer 360' },
    { id: 'reports', label: 'Reports' },
];

const departmentsList = ['Field Ops', 'Supply Chain', 'Accounting', 'IT', 'Production', 'Sales', 'HR'];
const rolesByDept: Record<string, string[]> = {
    'Field Ops': ['Technician', 'Field Supervisor', 'Quality Inspector'],
    'Supply Chain': ['Logistics Mgr', 'Warehouse Lead', 'Driver'],
    'Accounting': ['Finance Head', 'Accountant', 'Auditor'],
    'IT': ['Sys Admin', 'Developer', 'Support Specialist'],
    'Production': ['Plant Operator', 'Shift Manager', 'Maintenance Eng'],
    'Sales': ['Sales Rep', 'Regional Manager'],
    'HR': ['HR Manager', 'Recruiter']
};

// Default permissions based on Role
const DEFAULT_ROLE_PERMISSIONS: Record<string, ModuleType[]> = {
    'Technician': ['crm', 'inventory'],
    'Field Supervisor': ['crm', 'inventory', 'fleet'],
    'Quality Inspector': ['feed-plant', 'inventory'],
    'Logistics Mgr': ['logistics', 'fleet', 'inventory', 'orders'],
    'Warehouse Lead': ['inventory', 'logistics'],
    'Driver': ['fleet', 'logistics'],
    'Finance Head': ['finance', 'reports', 'hr'],
    'Accountant': ['finance', 'reports'],
    'Auditor': ['finance', 'reports', 'inventory'],
    'Sys Admin': ['all'],
    'Developer': ['all'],
    'Support Specialist': ['crm', 'orders'],
    'Plant Operator': ['feed-plant', 'inventory'],
    'Shift Manager': ['feed-plant', 'hr', 'inventory'],
    'Maintenance Eng': ['feed-plant', 'fleet'],
    'Sales Rep': ['crm', 'orders', 'inventory'],
    'Regional Manager': ['crm', 'orders', 'reports', 'finance'],
    'HR Manager': ['hr', 'finance'],
    'Recruiter': ['hr']
};

const EmployeeManagement: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('All');
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // --- ADD EMPLOYEE STATE ---
    const [isAddPanelOpen, setIsAddPanelOpen] = useState(false);
    const [newEmployeeForm, setNewEmployeeForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        department: '',
        role: '',
        mobileAppAccess: false,
        appUsername: '',
        appPassword: '',
        permissions: [] as ModuleType[]
    });

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

    const handleRoleChange = (role: string) => {
        const defaultPerms = DEFAULT_ROLE_PERMISSIONS[role] || [];
        setNewEmployeeForm(prev => ({ 
            ...prev, 
            role, 
            permissions: defaultPerms
        }));
    };

    const togglePermission = (module: ModuleType) => {
        setNewEmployeeForm(prev => {
            const hasPerm = prev.permissions.includes(module);
            if (hasPerm) {
                return { ...prev, permissions: prev.permissions.filter(p => p !== module) };
            } else {
                return { ...prev, permissions: [...prev.permissions, module] };
            }
        });
    };

    const handleAddEmployeeSubmit = () => {
        if (!newEmployeeForm.firstName || !newEmployeeForm.lastName || !newEmployeeForm.department || !newEmployeeForm.role) {
            alert("Please fill in all required fields.");
            return;
        }

        if (newEmployeeForm.mobileAppAccess && (!newEmployeeForm.appUsername || !newEmployeeForm.appPassword)) {
            alert("Please provide a username and password for mobile app access.");
            return;
        }

        const newEmp: Employee = {
            id: `AERP-${Math.floor(1000 + Math.random() * 9000)}`,
            name: `${newEmployeeForm.firstName} ${newEmployeeForm.lastName}`,
            role: newEmployeeForm.role,
            department: newEmployeeForm.department,
            status: 'Active',
            email: newEmployeeForm.email,
            phone: newEmployeeForm.phone,
            joinDate: new Date().toISOString().split('T')[0],
            mobileAppAccess: newEmployeeForm.mobileAppAccess,
            lastLogin: 'Never',
            permissions: newEmployeeForm.permissions, 
            avatar: `https://ui-avatars.com/api/?name=${newEmployeeForm.firstName}+${newEmployeeForm.lastName}&background=random`
        };

        setEmployees([...employees, newEmp]);
        setIsAddPanelOpen(false);
        setNewEmployeeForm({
            firstName: '', lastName: '', email: '', phone: '', department: '', role: '', mobileAppAccess: false, appUsername: '', appPassword: '', permissions: []
        });
    };

    return (
        <div className="space-y-4 max-w-[1920px] mx-auto pb-6 relative">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white">Employee Access & HR</h2>
                    <p className="text-aqua-400 text-xs">Manage staff profiles, mobile app logins, and ERP permissions.</p>
                </div>
                <button 
                    onClick={() => setIsAddPanelOpen(true)}
                    className="bg-aqua-500 hover:bg-aqua-400 text-aqua-950 font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-aqua-500/20 text-sm"
                >
                    <UserPlus size={16} />
                    Add Employee
                </button>
            </div>

            {/* KPIs Compact */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-aqua-800/50 border border-aqua-700 p-3 rounded-lg flex items-center justify-between">
                    <div>
                        <p className="text-gray-400 text-[10px] uppercase font-bold">Total Staff</p>
                        <p className="text-lg font-bold text-white">{employees.length}</p>
                    </div>
                    <div className="h-7 w-7 bg-aqua-900 rounded-full flex items-center justify-center text-aqua-400"><UserPlus size={14}/></div>
                </div>
                <div className="bg-aqua-800/50 border border-aqua-700 p-3 rounded-lg flex items-center justify-between">
                    <div>
                        <p className="text-gray-400 text-[10px] uppercase font-bold">App Users</p>
                        <p className="text-lg font-bold text-green-400">{employees.filter(e => e.mobileAppAccess).length}</p>
                    </div>
                    <div className="h-7 w-7 bg-aqua-900 rounded-full flex items-center justify-center text-green-400"><Smartphone size={14}/></div>
                </div>
                <div className="bg-aqua-800/50 border border-aqua-700 p-3 rounded-lg flex items-center justify-between">
                    <div>
                        <p className="text-gray-400 text-[10px] uppercase font-bold">Technicians</p>
                        <p className="text-lg font-bold text-blue-400">{employees.filter(e => e.role.includes('Tech')).length}</p>
                    </div>
                    <div className="h-7 w-7 bg-aqua-900 rounded-full flex items-center justify-center text-blue-400"><Shield size={14}/></div>
                </div>
                <div className="bg-aqua-800/50 border border-aqua-700 p-3 rounded-lg flex items-center justify-between">
                    <div>
                        <p className="text-gray-400 text-[10px] uppercase font-bold">On Leave</p>
                        <p className="text-lg font-bold text-yellow-400">{employees.filter(e => e.status === 'On Leave').length}</p>
                    </div>
                    <div className="h-7 w-7 bg-aqua-900 rounded-full flex items-center justify-center text-yellow-400"><Calendar size={14}/></div>
                </div>
            </div>

            {/* Filters & Search Bar */}
            <div className="flex flex-col md:flex-row gap-3 bg-aqua-800/30 p-2 rounded-xl border border-aqua-800 backdrop-blur-sm">
                
                {/* Department Filter */}
                <div className="relative min-w-[180px]">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-aqua-400" size={14} />
                    <select 
                        value={selectedDepartment}
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                        className="w-full bg-aqua-900 border border-aqua-700 rounded-lg pl-9 pr-6 py-2 text-xs text-white focus:outline-none focus:border-aqua-500 cursor-pointer appearance-none"
                    >
                        {departments.map(dept => (
                            <option key={dept} value={dept}>{dept === 'All' ? 'All Departments' : dept}</option>
                        ))}
                    </select>
                </div>

                {/* Search Input */}
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
                    <input 
                        type="text" 
                        placeholder="Search by Name, ID, or Role..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-aqua-900 border border-aqua-700 rounded-lg pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-aqua-500"
                    />
                </div>
            </div>

            {/* ERP Compact Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {filteredEmployees.length === 0 ? (
                    <div className="col-span-full flex flex-col items-center justify-center py-12 text-gray-500">
                        <UserPlus size={32} className="mb-3 opacity-50" />
                        <p className="text-sm">No employees found matching your criteria.</p>
                    </div>
                ) : filteredEmployees.map((emp) => (
                    <div key={emp.id} className="bg-aqua-800/40 border border-aqua-700 rounded-lg hover:border-aqua-500 transition-all group relative flex flex-col">
                        {/* Card Header */}
                        <div className="p-3 flex items-start gap-3 border-b border-aqua-700/50">
                            <div className="relative">
                                <img src={emp.avatar} alt={emp.name} className="h-10 w-10 rounded-md object-cover border border-aqua-600" />
                                {emp.mobileAppAccess && (
                                    <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-0.5 border border-aqua-800" title="Mobile App Access Enabled">
                                        <Smartphone size={8} className="text-aqua-900 fill-current" />
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
                        <div className="p-3 space-y-2 flex-1">
                            <div className="grid grid-cols-2 gap-1.5">
                                <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
                                    <Mail size={10} className="shrink-0" />
                                    <span className="truncate">{emp.email}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
                                    <Phone size={10} className="shrink-0" />
                                    <span className="truncate">{emp.phone}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
                                    <Calendar size={10} className="shrink-0" />
                                    <span>Joined: {new Date(emp.joinDate).toLocaleDateString(undefined, { month: 'short', year: '2-digit' })}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
                                    <Shield size={10} className="shrink-0" />
                                    <span>{emp.department}</span>
                                </div>
                            </div>
                            
                            {/* Permissions Tags */}
                            <div className="pt-1">
                                <p className="text-[10px] uppercase font-bold text-gray-500 mb-1">System Access</p>
                                <div className="flex flex-wrap gap-1">
                                    {emp.permissions.includes('all') ? (
                                        <span className="px-1.5 py-0.5 bg-purple-500/20 text-purple-300 text-[10px] rounded border border-purple-500/30">Full Admin</span>
                                    ) : emp.permissions.length > 0 ? emp.permissions.slice(0, 3).map(perm => (
                                        <span key={perm} className="px-1.5 py-0.5 bg-aqua-900 text-gray-300 text-[10px] rounded border border-aqua-700 capitalize">
                                            {perm.replace('-', ' ')}
                                        </span>
                                    )) : <span className="text-[10px] text-gray-600 italic">No access assigned</span>}
                                    {emp.permissions.length > 3 && <span className="text-[10px] text-gray-500">+{emp.permissions.length - 3} more</span>}
                                </div>
                            </div>
                        </div>

                        {/* Card Footer */}
                        <div className="p-2.5 bg-aqua-900/50 border-t border-aqua-700/50 flex justify-between items-center">
                             <span className="text-[10px] text-gray-500">Last login: {emp.lastLogin}</span>
                             <button 
                                onClick={() => handleEditClick(emp)}
                                className="flex items-center gap-1 text-[10px] font-bold text-aqua-400 hover:text-white transition-colors"
                             >
                                <Key size={10} /> Manage Access
                             </button>
                        </div>
                    </div>
                ))}
            </div>

             {/* --- ADD EMPLOYEE SLIDE-OVER --- */}
             <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isAddPanelOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                {/* Backdrop */}
                <div 
                    className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isAddPanelOpen ? 'opacity-100' : 'opacity-0'}`} 
                    onClick={() => setIsAddPanelOpen(false)}
                />
                
                {/* Sliding Panel */}
                <div className={`absolute right-0 top-0 h-full w-full md:w-[550px] bg-aqua-900 border-l border-aqua-700 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${isAddPanelOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    
                    {/* Header */}
                    <div className="p-5 border-b border-aqua-700 bg-aqua-800 flex justify-between items-center">
                        <div>
                            <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                <UserPlus size={20} className="text-aqua-400"/> New Employee
                            </h2>
                            <p className="text-xs text-gray-400">Create a new staff profile and assign roles.</p>
                        </div>
                        <button onClick={() => setIsAddPanelOpen(false)} className="p-1.5 hover:bg-aqua-700 rounded-full text-gray-400 hover:text-white transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Form Body */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        
                        {/* Section 1: Personal Information */}
                        <section className="space-y-3">
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-aqua-800 pb-1 flex items-center gap-2">
                                <User size={12} /> Personal Information
                            </h3>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs text-aqua-100 mb-1.5 font-medium">First Name <span className="text-red-400">*</span></label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-aqua-800 border border-aqua-700 rounded-lg p-2.5 text-sm text-white focus:border-aqua-500 focus:outline-none"
                                        placeholder="Jane"
                                        value={newEmployeeForm.firstName}
                                        onChange={(e) => setNewEmployeeForm({...newEmployeeForm, firstName: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-aqua-100 mb-1.5 font-medium">Last Name <span className="text-red-400">*</span></label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-aqua-800 border border-aqua-700 rounded-lg p-2.5 text-sm text-white focus:border-aqua-500 focus:outline-none"
                                        placeholder="Doe"
                                        value={newEmployeeForm.lastName}
                                        onChange={(e) => setNewEmployeeForm({...newEmployeeForm, lastName: e.target.value})}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-xs text-aqua-100 mb-1.5 font-medium">Email Address <span className="text-red-400">*</span></label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
                                        <input 
                                            type="email" 
                                            className="w-full bg-aqua-800 border border-aqua-700 rounded-lg py-2.5 pl-9 pr-3 text-sm text-white focus:border-aqua-500 focus:outline-none"
                                            placeholder="jane.doe@aquaerp.com"
                                            value={newEmployeeForm.email}
                                            onChange={(e) => setNewEmployeeForm({...newEmployeeForm, email: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-xs text-aqua-100 mb-1.5 font-medium">Phone Number</label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
                                        <input 
                                            type="tel" 
                                            className="w-full bg-aqua-800 border border-aqua-700 rounded-lg py-2.5 pl-9 pr-3 text-sm text-white focus:border-aqua-500 focus:outline-none"
                                            placeholder="+1 (555) 000-0000"
                                            value={newEmployeeForm.phone}
                                            onChange={(e) => setNewEmployeeForm({...newEmployeeForm, phone: e.target.value})}
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section 2: Role & Department */}
                        <section className="space-y-3">
                             <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-aqua-800 pb-1 flex items-center gap-2">
                                <Briefcase size={12} /> Job Assignment
                            </h3>

                             <div className="space-y-4">
                                <div>
                                    <label className="block text-xs text-aqua-100 mb-1.5 font-medium">Department <span className="text-red-400">*</span></label>
                                    <div className="relative">
                                        <select 
                                            className="w-full bg-aqua-800 border border-aqua-700 rounded-lg p-2.5 text-sm text-white focus:border-aqua-500 focus:outline-none appearance-none"
                                            value={newEmployeeForm.department}
                                            onChange={(e) => setNewEmployeeForm({...newEmployeeForm, department: e.target.value, role: ''})}
                                        >
                                            <option value="" disabled>Select Department</option>
                                            {departmentsList.map(d => <option key={d} value={d}>{d}</option>)}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-xs text-aqua-100 mb-1.5 font-medium">Role / Job Title <span className="text-red-400">*</span></label>
                                    <div className="relative">
                                        <select 
                                            className="w-full bg-aqua-800 border border-aqua-700 rounded-lg p-2.5 text-sm text-white focus:border-aqua-500 focus:outline-none appearance-none disabled:opacity-50"
                                            value={newEmployeeForm.role}
                                            onChange={(e) => handleRoleChange(e.target.value)}
                                            disabled={!newEmployeeForm.department}
                                        >
                                            <option value="" disabled>Select Role</option>
                                            {newEmployeeForm.department && rolesByDept[newEmployeeForm.department]?.map(r => (
                                                <option key={r} value={r}>{r}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
                                    </div>
                                    {!newEmployeeForm.department && <p className="text-[10px] text-gray-500 mt-1 italic">Select a department to view available roles.</p>}
                                </div>
                             </div>
                        </section>

                        {/* Section 3: Access Control */}
                        <section className="space-y-3">
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-aqua-800 pb-1 flex items-center gap-2">
                                <Key size={12} /> Quick Access Setup
                            </h3>
                            
                            <div className="bg-aqua-800/50 p-3 rounded-lg border border-aqua-700">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-bold text-white text-sm flex items-center gap-2">
                                            <Smartphone size={14} className="text-aqua-400" /> Enable Mobile App Login
                                        </h4>
                                        <p className="text-[10px] text-gray-400 mt-0.5">Create credentials for technician app access.</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            className="sr-only peer"
                                            checked={newEmployeeForm.mobileAppAccess}
                                            onChange={(e) => setNewEmployeeForm({...newEmployeeForm, mobileAppAccess: e.target.checked})}
                                        />
                                        <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-aqua-500"></div>
                                    </label>
                                </div>

                                {/* Conditional Fields */}
                                {newEmployeeForm.mobileAppAccess && (
                                    <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-aqua-700/50 animate-in fade-in duration-300">
                                         <div className="col-span-2 bg-aqua-900/50 p-2 rounded border border-aqua-700/50 flex gap-2 items-start">
                                            <AlertCircle size={14} className="text-aqua-400 mt-0.5 shrink-0" />
                                            <p className="text-[10px] text-gray-400">Admin must set initial credentials. User will be prompted to change password on first login.</p>
                                         </div>
                                         <div>
                                            <label className="block text-xs text-aqua-100 mb-1.5 font-medium">Username <span className="text-red-400">*</span></label>
                                            <div className="relative">
                                                <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                                <input 
                                                    type="text" 
                                                    className="w-full bg-aqua-900 border border-aqua-700 rounded-lg pl-9 pr-3 py-2.5 text-sm text-white focus:border-aqua-500 focus:outline-none"
                                                    placeholder="jdoe"
                                                    value={newEmployeeForm.appUsername}
                                                    onChange={(e) => setNewEmployeeForm({...newEmployeeForm, appUsername: e.target.value})}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs text-aqua-100 mb-1.5 font-medium">Password <span className="text-red-400">*</span></label>
                                            <div className="relative">
                                                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                                <input 
                                                    type="password" 
                                                    className="w-full bg-aqua-900 border border-aqua-700 rounded-lg pl-9 pr-3 py-2.5 text-sm text-white focus:border-aqua-500 focus:outline-none"
                                                    placeholder="••••••••"
                                                    value={newEmployeeForm.appPassword}
                                                    onChange={(e) => setNewEmployeeForm({...newEmployeeForm, appPassword: e.target.value})}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* Section 4: Role Permissions */}
                        <section className="space-y-3">
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-aqua-800 pb-1 flex items-center gap-2">
                                <Shield size={12} /> Role Permissions
                            </h3>
                            <div className="bg-aqua-800/30 p-3 rounded-lg border border-aqua-700">
                                <p className="text-[10px] text-gray-400 mb-3 italic">
                                    Access levels are pre-filled based on the selected Role. You can manually override them below.
                                </p>
                                <div className="grid grid-cols-2 gap-2">
                                    {availableModules.map(mod => (
                                        <label key={mod.id} className={`flex items-center gap-2 p-2 rounded border cursor-pointer transition-colors ${newEmployeeForm.permissions.includes(mod.id) ? 'bg-aqua-900/80 border-aqua-500' : 'bg-aqua-900/30 border-aqua-700 hover:border-aqua-600'}`}>
                                            <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 ${newEmployeeForm.permissions.includes(mod.id) ? 'bg-aqua-500 border-aqua-500' : 'border-gray-500'}`}>
                                                {newEmployeeForm.permissions.includes(mod.id) && <Check size={10} className="text-aqua-950" />}
                                            </div>
                                            <span className={`text-xs ${newEmployeeForm.permissions.includes(mod.id) ? 'text-white font-medium' : 'text-gray-400'}`}>{mod.label}</span>
                                            <input 
                                                type="checkbox" 
                                                className="hidden"
                                                checked={newEmployeeForm.permissions.includes(mod.id)}
                                                onChange={() => togglePermission(mod.id)}
                                            />
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </section>

                    </div>

                    {/* Footer Buttons */}
                    <div className="p-4 border-t border-aqua-700 bg-aqua-800 flex gap-3">
                        <button onClick={() => setIsAddPanelOpen(false)} className="flex-1 py-2.5 rounded-xl font-bold text-gray-400 hover:text-white hover:bg-aqua-700 transition-colors text-sm">
                            Cancel
                        </button>
                        <button 
                            onClick={handleAddEmployeeSubmit} 
                            className="flex-1 bg-aqua-500 hover:bg-aqua-400 text-aqua-950 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-aqua-500/20 transition-all text-sm"
                        >
                            <Save size={18} /> Create Profile
                        </button>
                    </div>
                </div>
            </div>

            {/* --- MANAGE ACCESS MODAL --- */}
            {isModalOpen && selectedEmployee && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
                    <div className="bg-aqua-900 border border-aqua-700 w-full max-w-lg rounded-xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
                        {/* Modal Header */}
                        <div className="p-4 border-b border-aqua-700 flex justify-between items-center bg-aqua-800">
                            <div className="flex items-center gap-3">
                                <img src={selectedEmployee.avatar} alt="" className="h-10 w-10 rounded-full border border-aqua-600" />
                                <div>
                                    <h3 className="font-bold text-white text-sm">Manage Access</h3>
                                    <p className="text-xs text-aqua-400">{selectedEmployee.name} ({selectedEmployee.id})</p>
                                </div>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white"><X size={18}/></button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-4 overflow-y-auto space-y-4">
                            
                            {/* 1. Mobile App Login */}
                            <div className="bg-aqua-800/50 p-3 rounded-lg border border-aqua-700">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-2">
                                        <div className="p-1.5 bg-aqua-900 rounded text-aqua-400"><Smartphone size={16} /></div>
                                        <div>
                                            <h4 className="font-bold text-white text-xs">Mobile App Access</h4>
                                            <p className="text-[10px] text-gray-400">Allow login to technician mobile app</p>
                                        </div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            checked={selectedEmployee.mobileAppAccess}
                                            onChange={() => setSelectedEmployee({...selectedEmployee, mobileAppAccess: !selectedEmployee.mobileAppAccess})}
                                            className="sr-only peer"
                                        />
                                        <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-aqua-500"></div>
                                    </label>
                                </div>
                                {selectedEmployee.mobileAppAccess && (
                                    <div className="grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-top-2">
                                        <div>
                                            <label className="block text-[10px] text-gray-400 mb-1">App Username</label>
                                            <input type="text" value={selectedEmployee.email.split('@')[0]} disabled className="w-full bg-aqua-900 border border-aqua-700 rounded px-2 py-1.5 text-gray-400 text-xs" />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] text-gray-400 mb-1">Reset Password</label>
                                            <button className="w-full bg-aqua-700 hover:bg-aqua-600 text-white text-xs py-1.5 rounded border border-aqua-600 transition-colors">Send Reset Link</button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* 2. ERP Permissions */}
                            <div>
                                <h4 className="font-bold text-white text-xs mb-2 flex items-center gap-2"><Shield size={14} className="text-aqua-400"/> ERP Module Permissions</h4>
                                <div className="grid grid-cols-2 gap-2">
                                    {availableModules.map(mod => (
                                        <label key={mod.id} className="flex items-center gap-2 p-2 bg-aqua-900/50 rounded border border-aqua-700 cursor-pointer hover:bg-aqua-800 transition-colors">
                                            <div className={`w-4 h-4 rounded border flex items-center justify-center ${selectedEmployee.permissions.includes('all') || selectedEmployee.permissions.includes(mod.id) ? 'bg-aqua-500 border-aqua-500' : 'border-gray-500'}`}>
                                                {(selectedEmployee.permissions.includes('all') || selectedEmployee.permissions.includes(mod.id)) && <Check size={10} className="text-aqua-950" />}
                                            </div>
                                            <span className="text-xs text-gray-300">{mod.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* 3. Account Status */}
                            <div>
                                <h4 className="font-bold text-white text-xs mb-2">Account Status</h4>
                                <select 
                                    value={selectedEmployee.status}
                                    onChange={(e) => setSelectedEmployee({...selectedEmployee, status: e.target.value as any})}
                                    className="w-full bg-aqua-900 border border-aqua-700 text-white rounded px-2 py-1.5 text-xs focus:ring-1 focus:ring-aqua-500"
                                >
                                    <option value="Active">Active</option>
                                    <option value="On Leave">On Leave</option>
                                    <option value="Terminated">Terminated</option>
                                </select>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-4 border-t border-aqua-700 bg-aqua-800/50 flex justify-end gap-3">
                            <button onClick={() => setIsModalOpen(false)} className="px-3 py-1.5 rounded text-xs font-medium text-gray-400 hover:text-white">Cancel</button>
                            <button onClick={() => handleSave(selectedEmployee)} className="px-4 py-1.5 rounded bg-aqua-500 hover:bg-aqua-400 text-aqua-950 font-bold text-xs shadow-lg shadow-aqua-500/20">Save Changes</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeeManagement;
