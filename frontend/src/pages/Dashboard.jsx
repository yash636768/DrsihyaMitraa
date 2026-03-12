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
            <header className="mb-10 relative z-10">
                <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4 inline-block">Overview</span>
                <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Welcome back</h2>
                <p className="text-slate-400 mt-2 text-lg">Your AI-powered photo library is organized and safe.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 relative z-10">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                        className="glass p-6 rounded-[2rem] hover:-translate-y-1 transition-transform group"
                    >
                        <div className={`w-14 h-14 rounded-2xl ${stat.color} bg-opacity-10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                            <stat.icon className={stat.color.replace('bg-', 'text-')} size={28} />
                        </div>
                        <div>
                            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                            <h3 className="text-3xl font-extrabold text-white">{stat.value}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
                <div className="lg:col-span-2 glass rounded-[2.5rem] p-8 md:p-10 border border-white/5 shadow-2xl">
                    <div className="flex justify-between items-center mb-10">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center border border-indigo-500/20">
                                <Clock className="text-indigo-400" size={24} />
                            </div>
                            <h3 className="text-2xl font-extrabold text-white">Live Insights</h3>
                        </div>
                        <button className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-sm font-bold hover:bg-white/10 hover:text-white transition-all">Export Log</button>
                    </div>
                    <div className="space-y-4">
                        {[
                            { title: 'New Batch Processed', desc: '12 family portraits organized', time: '2m ago', icon: Camera, status: 'Completed', color: 'emerald' },
                            { title: 'Person Identified', desc: 'Added "Rohan" to 8 existing photos', time: '1h ago', icon: Users, status: 'Success', color: 'indigo' },
                            { title: 'Gallery Shared', desc: 'Beach Trip album shared via Email', time: '4h ago', icon: Send, status: 'Sent', color: 'purple' },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 + 0.3 }}
                                className="group flex items-center gap-5 p-5 rounded-3xl hover:bg-white/5 transition-all border border-transparent hover:border-white/10"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-slate-900/50 border border-white/5 flex items-center justify-center flex-shrink-0">
                                    <item.icon size={24} className={`text-${item.color}-400`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-1">
                                        <p className="font-bold text-white text-lg truncate">{item.title}</p>
                                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md bg-${item.color}-500/10 text-${item.color}-400 border border-${item.color}-500/20 flex-shrink-0`}>{item.status}</span>
                                    </div>
                                    <p className="text-slate-400 font-medium text-sm truncate">{item.desc}</p>
                                </div>
                                <div className="text-right flex-shrink-0">
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">{item.time}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="glass rounded-[2.5rem] p-8 border border-white/5 shadow-2xl flex flex-col items-center justify-center text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="w-20 h-20 rounded-[2rem] bg-slate-900/80 border border-white/5 flex items-center justify-center mb-6 shadow-xl z-10">
                        <Users size={32} className="text-indigo-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 z-10">Face Recognition</h3>
                    <p className="text-slate-400 text-sm mb-8 z-10 leading-relaxed max-w-[200px]">Identify unknown faces to vastly improve search accuracy</p>
                    <button className="w-full py-4 rounded-2xl bg-white text-slate-900 font-bold text-sm hover:scale-[1.02] active:scale-95 transition-all z-10 shadow-[0_0_30px_-10px_rgba(255,255,255,0.3)]">
                        Start Identifying
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
