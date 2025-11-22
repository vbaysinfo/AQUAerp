
import React, { useState } from 'react';
import { 
    User, 
    Bell, 
    Lock, 
    Globe, 
    CreditCard, 
    Smartphone, 
    Mail, 
    Shield, 
    Save, 
    Camera,
    Slack,
    Database,
    Cloud,
    X,
    Edit2,
    Building2,
    MapPin
} from 'lucide-react';

type SettingsTab = 'general' | 'notifications' | 'security' | 'integrations' | 'billing';

const SettingsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<SettingsTab>('general');
    
    // Main Data State
    const [profileData, setProfileData] = useState({
        name: 'Super Admin',
        email: 'admin@aquaerp.com',
        role: 'Master Access',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCxGWhgpIqIcOkeFi1i03XHprh6uoF4uleuC27dPD-t9OvTDUgNBSAMPdTWF4D7OV3hgOtx6ht9tYmX99YdgZ2slnR2YQObFd2LSsdhaouD1r_nZOsNAr9tdNlmMHrj50u5RKG8fTbOgIZ3uxodQSyJ2eFSoVPL3R6Utd36yiAVNafZtxNQUvauZIRLoL2Gfv_J-ky3lc2rkm4ueubMC0-AUmsC0Zw85LCJ7V61vP8gm2PalDFMuycM8MvhUNcnee8GRGRP2J11otK',
        companyName: 'AquaERP Inc.',
        supportEmail: 'support@aquaerp.com',
        website: 'https://aquaerp.com',
        phone: '+1 (555) 123-4567',
        language: 'English (US)',
        timezone: 'IST (UTC+05:30)',
        currency: 'USD ($)'
    });

    // Edit Mode State
    const [isEditPanelOpen, setIsEditPanelOpen] = useState(false);
    const [formData, setFormData] = useState(profileData);

    const tabs: { id: SettingsTab; label: string; icon: React.ElementType }[] = [
        { id: 'general', label: 'General & Profile', icon: User },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'security', label: 'Security & Access', icon: Lock },
        { id: 'integrations', label: 'Integrations', icon: Globe },
        { id: 'billing', label: 'Plan & Billing', icon: CreditCard },
    ];

    const handleOpenEdit = () => {
        setFormData(profileData); // Reset form to current data
        setIsEditPanelOpen(true);
    };

    const handleSaveChanges = () => {
        setProfileData(formData);
        setIsEditPanelOpen(false);
    };

    return (
        <div className="max-w-[1920px] mx-auto space-y-6 pb-8 relative">
            
            {/* Header */}
            <div>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">System Settings</h2>
                <p className="text-gray-500 dark:text-aqua-400 text-xs mt-1">Manage your account preferences and company configuration.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 min-h-[600px]">
                
                {/* Left Sidebar Navigation */}
                <div className="w-full lg:w-64 shrink-0 space-y-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                                activeTab === tab.id
                                ? 'bg-aqua-500 text-white dark:text-aqua-950 shadow-lg shadow-aqua-500/20'
                                : 'bg-white dark:bg-aqua-800/40 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-aqua-800 hover:text-gray-900 dark:hover:text-white'
                            }`}
                        >
                            <tab.icon size={18} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Right Content Area */}
                <div className="flex-1 bg-white dark:bg-aqua-800/30 border border-gray-200 dark:border-aqua-800 rounded-2xl p-6 lg:p-8 shadow-sm">
                    
                    {/* --- GENERAL TAB --- */}
                    {activeTab === 'general' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                            
                            {/* Profile Header */}
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 pb-6 border-b border-gray-100 dark:border-aqua-800/50 relative">
                                <div className="relative group cursor-pointer">
                                    <div className="h-24 w-24 rounded-full bg-gray-200 dark:bg-gray-700 bg-cover bg-center border-4 border-white dark:border-aqua-800 shadow-md" style={{ backgroundImage: `url(${profileData.avatar})` }}></div>
                                    <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" onClick={handleOpenEdit}>
                                        <Camera size={24} className="text-white" />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{profileData.name}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{profileData.email}</p>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-500/20 dark:text-purple-300 mt-1">
                                        {profileData.role}
                                    </span>
                                </div>
                                <button 
                                    onClick={handleOpenEdit}
                                    className="md:ml-auto flex items-center gap-2 text-sm bg-gray-100 dark:bg-aqua-900/50 hover:bg-gray-200 dark:hover:bg-aqua-800 text-gray-700 dark:text-white px-4 py-2 rounded-lg font-bold transition-colors"
                                >
                                    <Edit2 size={14}/> Edit Profile
                                </button>
                            </div>

                            {/* Company Details View */}
                            <section className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide flex items-center gap-2">
                                        <Building2 size={16} className="text-aqua-600 dark:text-aqua-400"/> Company Information
                                    </h4>
                                    <button onClick={handleOpenEdit} className="text-xs text-aqua-600 dark:text-aqua-400 hover:underline">Edit</button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="p-4 bg-gray-50 dark:bg-aqua-900/20 rounded-xl border border-gray-100 dark:border-aqua-800/50">
                                        <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase">Company Name</label>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">{profileData.companyName}</p>
                                    </div>
                                    <div className="p-4 bg-gray-50 dark:bg-aqua-900/20 rounded-xl border border-gray-100 dark:border-aqua-800/50">
                                        <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase">Support Email</label>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">{profileData.supportEmail}</p>
                                    </div>
                                    <div className="p-4 bg-gray-50 dark:bg-aqua-900/20 rounded-xl border border-gray-100 dark:border-aqua-800/50">
                                        <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase">Website</label>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">{profileData.website}</p>
                                    </div>
                                    <div className="p-4 bg-gray-50 dark:bg-aqua-900/20 rounded-xl border border-gray-100 dark:border-aqua-800/50">
                                        <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase">Phone</label>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">{profileData.phone}</p>
                                    </div>
                                </div>
                            </section>

                            {/* Preferences View */}
                            <section className="space-y-4 pt-4 border-t border-gray-100 dark:border-aqua-800/50">
                                <div className="flex justify-between items-center">
                                    <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide flex items-center gap-2">
                                        <MapPin size={16} className="text-aqua-600 dark:text-aqua-400"/> Regional Preferences
                                    </h4>
                                    <button onClick={handleOpenEdit} className="text-xs text-aqua-600 dark:text-aqua-400 hover:underline">Edit</button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-1">
                                        <label className="text-xs text-gray-500 dark:text-gray-400">Language</label>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">{profileData.language}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs text-gray-500 dark:text-gray-400">Timezone</label>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">{profileData.timezone}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs text-gray-500 dark:text-gray-400">Currency</label>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">{profileData.currency}</p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    )}

                    {/* --- NOTIFICATIONS TAB --- */}
                    {activeTab === 'notifications' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Notification Preferences</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Control how and when you receive alerts.</p>
                            </div>

                            <div className="space-y-6">
                                {/* Critical Alerts */}
                                <div className="bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/30 p-4 rounded-xl">
                                    <div className="flex items-start gap-3">
                                        <Shield className="text-red-500 shrink-0 mt-1" size={20} />
                                        <div className="flex-1">
                                            <h4 className="text-sm font-bold text-gray-900 dark:text-white">Critical System Alerts</h4>
                                            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">Notifications about server downtime, security breaches, or critical data loss.</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-medium text-red-600 dark:text-red-400">Always On</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Channels */}
                                <div className="space-y-4">
                                    <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Alert Channels</h4>
                                    
                                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-aqua-900/30 border border-gray-200 dark:border-aqua-800 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-white dark:bg-aqua-800 rounded-lg text-aqua-600 dark:text-aqua-400 border border-gray-200 dark:border-aqua-700">
                                                <Mail size={18} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-900 dark:text-white">Email Notifications</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">Sent to {profileData.email}</p>
                                            </div>
                                        </div>
                                        <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-aqua-500 cursor-pointer">
                                            <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6"/>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-aqua-900/30 border border-gray-200 dark:border-aqua-800 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-white dark:bg-aqua-800 rounded-lg text-purple-600 dark:text-purple-400 border border-gray-200 dark:border-aqua-700">
                                                <Smartphone size={18} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-900 dark:text-white">Push Notifications</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">Mobile app alerts</p>
                                            </div>
                                        </div>
                                        <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 dark:bg-gray-600 cursor-pointer">
                                            <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-1"/>
                                        </div>
                                    </div>
                                </div>

                                {/* Event Toggles */}
                                <div className="space-y-3 pt-2">
                                    <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Event Triggers</h4>
                                    {[
                                        'Low Stock Warning (< 20%)',
                                        'New Order Received',
                                        'Technician Visit Completed',
                                        'IoT Device Offline',
                                        'Payment Failure'
                                    ].map((event, i) => (
                                        <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-aqua-800/50 last:border-0">
                                            <span className="text-sm text-gray-700 dark:text-gray-300">{event}</span>
                                            <input type="checkbox" defaultChecked className="accent-aqua-500 h-4 w-4 rounded border-gray-300" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- SECURITY TAB --- */}
                    {activeTab === 'security' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Security Settings</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Manage password and access controls.</p>
                            </div>

                            <div className="space-y-6">
                                {/* Password Change */}
                                <section className="space-y-4">
                                    <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide">Change Password</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Current Password</label>
                                            <input type="password" className="w-full bg-gray-50 dark:bg-aqua-900/50 border border-gray-200 dark:border-aqua-700 rounded-lg px-4 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-aqua-500 focus:outline-none" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-medium text-gray-700 dark:text-gray-300">New Password</label>
                                            <input type="password" className="w-full bg-gray-50 dark:bg-aqua-900/50 border border-gray-200 dark:border-aqua-700 rounded-lg px-4 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-aqua-500 focus:outline-none" />
                                        </div>
                                        <div className="col-span-2 flex justify-end">
                                            <button className="bg-aqua-500 hover:bg-aqua-400 text-white dark:text-aqua-950 px-4 py-2 rounded-lg text-xs font-bold shadow-lg shadow-aqua-500/20 transition-all">
                                                Update Password
                                            </button>
                                        </div>
                                    </div>
                                </section>

                                {/* 2FA */}
                                <section className="bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/30 p-4 rounded-xl flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white dark:bg-aqua-900 rounded-lg text-blue-600 dark:text-blue-400 shadow-sm">
                                            <Shield size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-gray-900 dark:text-white">Two-Factor Authentication (2FA)</h4>
                                            <p className="text-xs text-gray-600 dark:text-gray-300">Add an extra layer of security to your account.</p>
                                        </div>
                                    </div>
                                    <button className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-white dark:bg-aqua-900 border border-blue-200 dark:border-blue-500/50 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors">
                                        Enable 2FA
                                    </button>
                                </section>

                                {/* Active Sessions */}
                                <section className="space-y-3">
                                    <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide">Active Sessions</h4>
                                    <div className="border border-gray-200 dark:border-aqua-700 rounded-xl overflow-hidden">
                                        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-aqua-700 bg-gray-50 dark:bg-aqua-900/30">
                                            <div className="flex items-center gap-3">
                                                <Globe size={16} className="text-gray-400"/>
                                                <div>
                                                    <p className="text-xs font-bold text-gray-900 dark:text-white">Chrome on Windows</p>
                                                    <p className="text-[10px] text-gray-500 dark:text-gray-400">Bhimavaram, India • 192.168.1.1</p>
                                                </div>
                                            </div>
                                            <span className="text-[10px] font-bold text-green-500 bg-green-100 dark:bg-green-500/20 px-2 py-0.5 rounded-full">Current</span>
                                        </div>
                                        <div className="flex items-center justify-between p-4 bg-white dark:bg-transparent">
                                            <div className="flex items-center gap-3">
                                                <Smartphone size={16} className="text-gray-400"/>
                                                <div>
                                                    <p className="text-xs font-bold text-gray-900 dark:text-white">Safari on iPhone 14</p>
                                                    <p className="text-[10px] text-gray-500 dark:text-gray-400">Nellore, India • 10.0.0.5</p>
                                                </div>
                                            </div>
                                            <button className="text-[10px] font-bold text-red-500 hover:underline">Revoke</button>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    )}

                    {/* --- INTEGRATIONS TAB --- */}
                    {activeTab === 'integrations' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Connected Integrations</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Manage third-party tools and API access.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="border border-gray-200 dark:border-aqua-700 rounded-xl p-4 flex items-start justify-between hover:border-aqua-500 transition-colors bg-white dark:bg-aqua-900/20">
                                    <div className="flex gap-3">
                                        <div className="p-2.5 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
                                            <Database size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-gray-900 dark:text-white">QuickBooks</h4>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Sync financial data and invoices.</p>
                                            <div className="mt-2 flex items-center gap-1.5">
                                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                                <span className="text-[10px] text-gray-600 dark:text-gray-300 font-medium">Connected</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="text-xs text-gray-500 hover:text-gray-900 dark:hover:text-white">Manage</button>
                                </div>

                                <div className="border border-gray-200 dark:border-aqua-700 rounded-xl p-4 flex items-start justify-between hover:border-aqua-500 transition-colors bg-white dark:bg-aqua-900/20">
                                    <div className="flex gap-3">
                                        <div className="p-2.5 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-600 dark:text-purple-400">
                                            <Slack size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-gray-900 dark:text-white">Slack</h4>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Team notifications and alerts.</p>
                                            <div className="mt-2 flex items-center gap-1.5">
                                                <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                                                <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">Disconnected</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="px-3 py-1.5 bg-aqua-50 dark:bg-aqua-900 text-aqua-600 dark:text-aqua-400 rounded-lg text-xs font-bold border border-aqua-200 dark:border-aqua-700 hover:bg-aqua-100 dark:hover:bg-aqua-800 transition-colors">Connect</button>
                                </div>

                                <div className="border border-gray-200 dark:border-aqua-700 rounded-xl p-4 flex items-start justify-between hover:border-aqua-500 transition-colors bg-white dark:bg-aqua-900/20">
                                    <div className="flex gap-3">
                                        <div className="p-2.5 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-orange-600 dark:text-orange-400">
                                            <Cloud size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-gray-900 dark:text-white">AWS IoT Core</h4>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Device telemetry stream.</p>
                                            <div className="mt-2 flex items-center gap-1.5">
                                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                                <span className="text-[10px] text-gray-600 dark:text-gray-300 font-medium">Syncing (20ms)</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="text-xs text-gray-500 hover:text-gray-900 dark:hover:text-white">Config</button>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-100 dark:border-aqua-800/50">
                                <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3">API Access</h4>
                                <div className="flex gap-2">
                                    <input type="text" readOnly value="sk_live_8823_xxxxxxxxxxxx" className="flex-1 bg-gray-50 dark:bg-aqua-900 border border-gray-200 dark:border-aqua-700 rounded-lg px-4 py-2 text-xs text-gray-500 font-mono" />
                                    <button className="px-4 py-2 bg-gray-100 dark:bg-aqua-800 text-gray-700 dark:text-white rounded-lg text-xs font-bold border border-gray-200 dark:border-aqua-700 hover:bg-gray-200 dark:hover:bg-aqua-700">Copy</button>
                                    <button className="px-4 py-2 bg-aqua-500 hover:bg-aqua-400 text-white dark:text-aqua-950 rounded-lg text-xs font-bold shadow-lg shadow-aqua-500/20">Regenerate</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- BILLING TAB --- */}
                    {activeTab === 'billing' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Plan & Billing</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Manage your subscription and payment methods.</p>
                            </div>

                            <div className="bg-gradient-to-r from-aqua-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-aqua-100 text-xs font-bold uppercase tracking-wider mb-1">Current Plan</p>
                                        <h3 className="text-3xl font-black">Enterprise</h3>
                                        <p className="text-sm text-aqua-50 mt-2 opacity-90">Unlimited users • Advanced Analytics • IoT Support</p>
                                    </div>
                                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold border border-white/30">Active</span>
                                </div>
                                <div className="mt-6 pt-4 border-t border-white/20 flex justify-between items-center">
                                    <p className="text-xs">Next billing date: <strong className="text-white">Nov 01, 2023</strong></p>
                                    <button className="bg-white text-aqua-600 px-4 py-2 rounded-lg text-xs font-bold hover:bg-aqua-50 transition-colors">Manage Subscription</button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide">Payment Method</h4>
                                <div className="border border-gray-200 dark:border-aqua-700 rounded-xl p-4 flex items-center justify-between bg-white dark:bg-aqua-900/20">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-14 bg-gray-100 dark:bg-white rounded flex items-center justify-center border border-gray-200">
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900 dark:text-white">Mastercard ending in 8821</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Expires 12/25</p>
                                        </div>
                                    </div>
                                    <button className="text-xs font-bold text-aqua-600 dark:text-aqua-400 hover:underline">Update</button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide">Invoice History</h4>
                                <div className="border border-gray-200 dark:border-aqua-700 rounded-xl overflow-hidden">
                                    {[
                                        { id: 'INV-001', date: 'Oct 01, 2023', amount: '$2,499.00', status: 'Paid' },
                                        { id: 'INV-002', date: 'Sep 01, 2023', amount: '$2,499.00', status: 'Paid' },
                                        { id: 'INV-003', date: 'Aug 01, 2023', amount: '$2,499.00', status: 'Paid' },
                                    ].map((inv, i) => (
                                        <div key={i} className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-aqua-800/50 last:border-0 hover:bg-gray-50 dark:hover:bg-aqua-800/30 transition-colors">
                                            <div>
                                                <p className="text-sm font-bold text-gray-900 dark:text-white">{inv.date}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">{inv.id}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-bold text-gray-900 dark:text-white">{inv.amount}</p>
                                                <span className="text-[10px] text-green-600 dark:text-green-400 font-medium bg-green-50 dark:bg-green-500/10 px-2 py-0.5 rounded">{inv.status}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* --- EDIT PROFILE SLIDE-OVER --- */}
            <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isEditPanelOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                <div 
                    className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isEditPanelOpen ? 'opacity-100' : 'opacity-0'}`} 
                    onClick={() => setIsEditPanelOpen(false)}
                />
                <div className={`absolute right-0 top-0 h-full w-full md:w-[500px] bg-white dark:bg-aqua-900 border-l border-gray-200 dark:border-aqua-700 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${isEditPanelOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    
                    {/* Header */}
                    <div className="p-5 border-b border-gray-200 dark:border-aqua-700 bg-gray-50 dark:bg-aqua-800 flex justify-between items-center">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <Edit2 size={20} className="text-aqua-600 dark:text-aqua-400"/> Edit General Settings
                            </h2>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Update your personal and company details.</p>
                        </div>
                        <button onClick={() => setIsEditPanelOpen(false)} className="p-1.5 hover:bg-gray-200 dark:hover:bg-aqua-700 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Form Content */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        
                        {/* Personal Info */}
                        <section className="space-y-3">
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200 dark:border-aqua-800 pb-1 flex items-center gap-2">
                                <User size={12} /> Personal Details
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs text-gray-700 dark:text-aqua-100 mb-1.5 font-medium">Full Name</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-white dark:bg-aqua-800 border border-gray-300 dark:border-aqua-700 rounded-lg p-2.5 text-sm text-gray-900 dark:text-white focus:border-aqua-500 focus:outline-none"
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-700 dark:text-aqua-100 mb-1.5 font-medium">Email Address</label>
                                    <input 
                                        type="email" 
                                        className="w-full bg-white dark:bg-aqua-800 border border-gray-300 dark:border-aqua-700 rounded-lg p-2.5 text-sm text-gray-900 dark:text-white focus:border-aqua-500 focus:outline-none"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-700 dark:text-aqua-100 mb-1.5 font-medium">Role / Title</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-white dark:bg-aqua-800 border border-gray-300 dark:border-aqua-700 rounded-lg p-2.5 text-sm text-gray-900 dark:text-white focus:border-aqua-500 focus:outline-none"
                                        value={formData.role}
                                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-700 dark:text-aqua-100 mb-1.5 font-medium">Avatar URL</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-white dark:bg-aqua-800 border border-gray-300 dark:border-aqua-700 rounded-lg p-2.5 text-sm text-gray-900 dark:text-white focus:border-aqua-500 focus:outline-none text-xs"
                                        value={formData.avatar}
                                        onChange={(e) => setFormData({...formData, avatar: e.target.value})}
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Company Info */}
                        <section className="space-y-3">
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200 dark:border-aqua-800 pb-1 flex items-center gap-2">
                                <Building2 size={12} /> Company Information
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs text-gray-700 dark:text-aqua-100 mb-1.5 font-medium">Company Name</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-white dark:bg-aqua-800 border border-gray-300 dark:border-aqua-700 rounded-lg p-2.5 text-sm text-gray-900 dark:text-white focus:border-aqua-500 focus:outline-none"
                                        value={formData.companyName}
                                        onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-700 dark:text-aqua-100 mb-1.5 font-medium">Support Email</label>
                                    <input 
                                        type="email" 
                                        className="w-full bg-white dark:bg-aqua-800 border border-gray-300 dark:border-aqua-700 rounded-lg p-2.5 text-sm text-gray-900 dark:text-white focus:border-aqua-500 focus:outline-none"
                                        value={formData.supportEmail}
                                        onChange={(e) => setFormData({...formData, supportEmail: e.target.value})}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs text-gray-700 dark:text-aqua-100 mb-1.5 font-medium">Website</label>
                                        <input 
                                            type="text" 
                                            className="w-full bg-white dark:bg-aqua-800 border border-gray-300 dark:border-aqua-700 rounded-lg p-2.5 text-sm text-gray-900 dark:text-white focus:border-aqua-500 focus:outline-none"
                                            value={formData.website}
                                            onChange={(e) => setFormData({...formData, website: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-700 dark:text-aqua-100 mb-1.5 font-medium">Phone</label>
                                        <input 
                                            type="text" 
                                            className="w-full bg-white dark:bg-aqua-800 border border-gray-300 dark:border-aqua-700 rounded-lg p-2.5 text-sm text-gray-900 dark:text-white focus:border-aqua-500 focus:outline-none"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Preferences */}
                        <section className="space-y-3">
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200 dark:border-aqua-800 pb-1 flex items-center gap-2">
                                <Globe size={12} /> Preferences
                            </h3>
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-xs text-gray-700 dark:text-aqua-100 mb-1.5 font-medium">Language</label>
                                    <select 
                                        className="w-full bg-white dark:bg-aqua-800 border border-gray-300 dark:border-aqua-700 rounded-lg p-2.5 text-sm text-gray-900 dark:text-white focus:border-aqua-500 focus:outline-none appearance-none"
                                        value={formData.language}
                                        onChange={(e) => setFormData({...formData, language: e.target.value})}
                                    >
                                        <option>English (US)</option>
                                        <option>Telugu</option>
                                        <option>Hindi</option>
                                        <option>Spanish</option>
                                    </select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs text-gray-700 dark:text-aqua-100 mb-1.5 font-medium">Timezone</label>
                                        <select 
                                            className="w-full bg-white dark:bg-aqua-800 border border-gray-300 dark:border-aqua-700 rounded-lg p-2.5 text-sm text-gray-900 dark:text-white focus:border-aqua-500 focus:outline-none appearance-none"
                                            value={formData.timezone}
                                            onChange={(e) => setFormData({...formData, timezone: e.target.value})}
                                        >
                                            <option>IST (UTC+05:30)</option>
                                            <option>PST (UTC-08:00)</option>
                                            <option>EST (UTC-05:00)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-700 dark:text-aqua-100 mb-1.5 font-medium">Currency</label>
                                        <select 
                                            className="w-full bg-white dark:bg-aqua-800 border border-gray-300 dark:border-aqua-700 rounded-lg p-2.5 text-sm text-gray-900 dark:text-white focus:border-aqua-500 focus:outline-none appearance-none"
                                            value={formData.currency}
                                            onChange={(e) => setFormData({...formData, currency: e.target.value})}
                                        >
                                            <option>USD ($)</option>
                                            <option>INR (₹)</option>
                                            <option>EUR (€)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </section>

                    </div>

                    {/* Footer Buttons */}
                    <div className="p-4 border-t border-gray-200 dark:border-aqua-700 bg-gray-50 dark:bg-aqua-800 flex gap-3">
                        <button onClick={() => setIsEditPanelOpen(false)} className="flex-1 py-2.5 rounded-xl font-bold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-aqua-700 transition-colors text-sm">
                            Cancel
                        </button>
                        <button 
                            onClick={handleSaveChanges} 
                            className="flex-1 bg-aqua-500 hover:bg-aqua-400 text-white dark:text-aqua-950 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-aqua-500/20 transition-all text-sm"
                        >
                            <Save size={18} /> Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
