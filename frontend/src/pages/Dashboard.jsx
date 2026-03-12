import React from 'react';
import { Camera, Users, Shield, Send, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className="glass stat-card">
        <div className={`icon-box ${color} bg-opacity-20`}>
            <Icon className={color.replace('bg-', 'text-')} size={28} />
        </div>
        <div>
            <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider">{label}</p>
            <h3 className="stat-value">{value}</h3>
        </div>
    </div>
);

const Dashboard = () => {
    const stats = [
        { icon: Camera, label: 'Total Photos', value: '1,284', color: 'bg-indigo-500' },
        { icon: Users, label: 'Identified Persons', value: '42', color: 'bg-emerald-500' },
        { icon: Shield, label: 'Secured Embeddings', value: '2,568', color: 'bg-purple-500' },
        { icon: Send, label: 'Photos Shared', value: '156', color: 'bg-pink-500' },
    ];

    return (
        <div className="space-y-8">
            <header>
                <h2 className="text-3xl font-bold">Welcome back, Drishyamitra</h2>
                <p className="text-slate-400 mt-2">Your AI-powered photo library is organized and safe.</p>
            </header>

            <div className="stat-grid">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <StatCard {...stat} />
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 glass p-10">
                    <div className="flex justify-between items-center mb-10">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-indigo-600/10 rounded-2xl flex items-center justify-center">
                                <Clock className="text-indigo-400" size={24} />
                            </div>
                            <h3 className="text-2xl font-extrabold text-white">Live Insights</h3>
                        </div>
                        <button className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-sm font-bold hover:bg-white/10 transition-all">Export Log</button>
                    </div>
                    <div className="space-y-6">
                        {[
                            { title: 'New Batch Processed', desc: '12 family portraits organized', time: '2m ago', icon: Camera, status: 'Completed' },
                            { title: 'New Person Identified', desc: 'Added "Rohan" to 8 existing photos', time: '1h ago', icon: Users, status: 'Success' },
                            { title: 'Gallery Shared', desc: 'Beach Trip album shared via Email', time: '4h ago', icon: Send, status: 'Sent' },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="group flex items-center gap-6 p-6 rounded-3xl hover:bg-white/5 transition-all border border-transparent hover:border-white/10"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-white/5 flex items-center justify-center overflow-hidden relative">
                                    <item.icon size={28} className="text-slate-500 group-hover:text-indigo-400 transition-colors z-10" />
                                    <div className="absolute inset-0 bg-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-1">
                                        <p className="font-extrabold text-white text-lg">{item.title}</p>
                                        <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">{item.status}</span>
                                    </div>
                                    <p className="text-slate-400 font-medium truncate">{item.desc}</p>
                                </div>
                                <div className="text-right flex-shrink-0">
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">{item.time}</p>
                                    <div className="mt-2 flex -space-x-2 justify-end opacity-40 group-hover:opacity-100 transition-opacity">
                                        {[1, 2, 3].map(j => (
                                            <div key={j} className="w-6 h-6 rounded-full border-2 border-bg-dark bg-slate-800" />
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="glass p-8">
                    <h3 className="text-xl font-bold text-white mb-6">Face Recognition</h3>
                    <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-white/10 rounded-2xl">
                        <Users size={48} className="text-slate-600 mb-4" />
                        <p className="text-slate-500 text-center px-4">Identify unknown faces to improve library organization</p>
                        <button className="mt-4 text-indigo-400 font-semibold text-sm">Start Identifying</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
