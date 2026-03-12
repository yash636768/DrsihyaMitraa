import React from 'react';
import { Camera, Users, Shield, Send } from 'lucide-react';
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
                <div className="lg:col-span-2 glass p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-white">Recent Activity</h3>
                        <button className="text-indigo-400 text-sm font-semibold hover:text-indigo-300">View All</button>
                    </div>
                    <div className="space-y-4">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                                <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center">
                                    <Camera size={20} className="text-slate-500" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-white">New photos uploaded</p>
                                    <p className="text-sm text-slate-400">12 photos from "Beach Trip"</p>
                                </div>
                                <p className="text-xs text-slate-500">2h ago</p>
                            </div>
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
