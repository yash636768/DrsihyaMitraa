import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield, Bell, Key, Moon, Monitor, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Settings = () => {
    const { user, signOut } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');

    const tabs = [
        { id: 'profile', label: 'Profile Settings', icon: User },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'appearance', label: 'Appearance', icon: Moon },
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-10 animate-fade relative z-10 pb-20">
            <header className="mb-10">
                <span className="px-3 py-1 rounded-full bg-slate-500/10 border border-slate-500/20 text-slate-400 text-xs font-bold uppercase tracking-widest mb-4 inline-block">Configuration</span>
                <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Settings</h2>
                <p className="text-slate-400 mt-2 text-lg">Manage your account preferences and security.</p>
            </header>

            <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
                {/* Sidebar Navigation */}
                <div className="w-full md:w-64 shrink-0">
                    <div className="glass p-3 rounded-3xl border border-white/5 flex flex-col gap-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all text-left ${
                                    activeTab === tab.id
                                        ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-inner'
                                        : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                                }`}
                            >
                                <tab.icon size={20} className={activeTab === tab.id ? 'text-indigo-400' : 'text-slate-500'} />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="glass p-8 md:p-10 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                        {activeTab === 'profile' && (
                            <div className="space-y-10 relative z-10">
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-6">Profile Information</h3>
                                    <div className="flex items-center gap-6 mb-8">
                                        <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-indigo-500 to-purple-500 p-[3px] shadow-xl">
                                            <div className="w-full h-full bg-slate-900 rounded-[21px] flex items-center justify-center">
                                                <User size={40} className="text-indigo-400" />
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-white">{user?.email?.split('@')[0]}</h4>
                                            <p className="text-slate-400 text-sm">{user?.email}</p>
                                            <button className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition-colors">
                                                Change Avatar
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-5 max-w-lg">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 px-2">Email Address</label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                            <input 
                                                type="email" 
                                                disabled 
                                                value={user?.email || ''}
                                                className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-slate-300 font-medium opacity-70 cursor-not-allowed"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 px-2">Display Name</label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                            <input 
                                                type="text" 
                                                defaultValue={user?.email?.split('@')[0]}
                                                className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white font-medium focus:ring-2 focus:ring-indigo-500/50 transition-all outline-none"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="pt-4">
                                        <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-indigo-500/20 active:scale-95">
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'security' && (
                            <div className="space-y-10 relative z-10">
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Security Settings</h3>
                                    <p className="text-slate-400 text-sm">Update your password and manage account security.</p>
                                </div>

                                <div className="space-y-6 max-w-lg">
                                    <div className="p-6 bg-slate-900/50 border border-white/10 rounded-3xl space-y-5">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Key className="text-indigo-400" size={20} />
                                            <h4 className="font-bold text-white">Change Password</h4>
                                        </div>
                                        <input 
                                            type="password" 
                                            placeholder="Current Password"
                                            className="w-full bg-black/20 border border-white/5 rounded-2xl py-3.5 px-4 text-white font-medium focus:ring-2 focus:ring-indigo-500/50 outline-none"
                                        />
                                        <input 
                                            type="password" 
                                            placeholder="New Password"
                                            className="w-full bg-black/20 border border-white/5 rounded-2xl py-3.5 px-4 text-white font-medium focus:ring-2 focus:ring-indigo-500/50 outline-none"
                                        />
                                        <input 
                                            type="password" 
                                            placeholder="Confirm New Password"
                                            className="w-full bg-black/20 border border-white/5 rounded-2xl py-3.5 px-4 text-white font-medium focus:ring-2 focus:ring-indigo-500/50 outline-none"
                                        />
                                        <button className="w-full py-4 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 font-bold rounded-2xl transition-colors border border-indigo-500/20">
                                            Update Password
                                        </button>
                                    </div>

                                    <div className="p-6 bg-red-500/5 border border-red-500/10 rounded-3xl space-y-4 mt-10">
                                        <div>
                                            <h4 className="font-bold text-red-400 flex items-center gap-2">
                                                <Trash2 size={18} /> Danger Zone
                                            </h4>
                                            <p className="text-slate-400 text-sm mt-1">Permanently delete your account and all associated data.</p>
                                        </div>
                                        <button className="px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold rounded-xl transition-colors border border-red-500/20 text-sm">
                                            Delete Account
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                         {activeTab === 'appearance' && (
                            <div className="space-y-10 relative z-10">
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Appearance</h3>
                                    <p className="text-slate-400 text-sm">Customize how Drishyamitra looks on your device.</p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
                                    <div className="p-6 bg-slate-900/80 border-2 border-indigo-500 rounded-3xl cursor-pointer relative overflow-hidden group">
                                        <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center">
                                            <div className="w-2 h-2 rounded-full bg-white" />
                                        </div>
                                        <Moon className="text-indigo-400 mb-4" size={32} />
                                        <h4 className="font-bold text-white text-lg">Dark Mode</h4>
                                        <p className="text-slate-400 text-sm mt-1">Sleek, premium dark theme.</p>
                                    </div>

                                    <div className="p-6 bg-slate-900/30 border border-white/5 rounded-3xl cursor-pointer hover:border-white/20 transition-colors opacity-50 relative">
                                        <div className="absolute inset-0 bg-black/20 rounded-3xl flex items-center justify-center backdrop-blur-[1px]">
                                            <span className="px-3 py-1 bg-black/80 rounded-full text-xs font-bold text-white">Coming Soon</span>
                                        </div>
                                        <Monitor className="text-slate-400 mb-4" size={32} />
                                        <h4 className="font-bold text-white text-lg">System Default</h4>
                                        <p className="text-slate-400 text-sm mt-1">Match your OS scheme.</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'notifications' && (
                            <div className="space-y-10 relative z-10">
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Notifications</h3>
                                    <p className="text-slate-400 text-sm">Manage when and how you receive alerts.</p>
                                </div>

                                <div className="space-y-4 max-w-xl">
                                    {[
                                        { title: 'Processing Complete', desc: 'Get notified when an upload batch finishes processing.', enabled: true },
                                        { title: 'New Faces Identified', desc: 'Alert when AI automatically identifies a known face.', enabled: true },
                                        { title: 'Weekly Summary', desc: 'Receive a digest of your library statistics weekly.', enabled: false },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center justify-between p-6 bg-slate-900/50 border border-white/5 rounded-3xl">
                                            <div>
                                                <h4 className="font-bold text-white">{item.title}</h4>
                                                <p className="text-slate-400 text-sm mt-1">{item.desc}</p>
                                            </div>
                                            <button className={`w-14 h-8 rounded-full p-1 transition-colors ${item.enabled ? 'bg-indigo-500' : 'bg-slate-700'}`}>
                                                <div className={`w-6 h-6 rounded-full bg-white transition-transform ${item.enabled ? 'translate-x-6' : 'translate-x-0'}`} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
