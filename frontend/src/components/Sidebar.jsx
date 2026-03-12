import React from 'react';
import { Camera, Grid, MessageSquare, Settings, UserCheck, BarChart3 } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const navItems = [
        { icon: <BarChart3 size={20} />, label: 'Dashboard', path: '/' },
        { icon: <Camera size={20} />, label: 'Upload', path: '/upload' },
        { icon: <Grid size={20} />, label: 'Gallery', path: '/gallery' },
        { icon: <UserCheck size={20} />, label: 'Label Faces', path: '/label' },
        { icon: <MessageSquare size={20} />, label: 'AI Chat', path: '/chat' },
    ];

    return (
        <div className="sidebar glass">
            <div className="flex items-center gap-2 mb-10 px-2">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Camera className="text-white" size={24} />
                </div>
                <h1 className="text-xl font-bold tracking-tight">Drishyamitra</h1>
            </div>

            <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `nav-link ${isActive ? 'active' : ''}`
                        }
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="mt-auto pt-10">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-white/5">
                    <p className="text-xs text-slate-400 mb-1">STORAGE</p>
                    <div className="h-2 w-full bg-white/10 rounded-full mt-2 overflow-hidden">
                        <div className="h-full bg-indigo-500 w-3/4" />
                    </div>
                    <p className="text-[10px] text-slate-500 mt-2">1.2GB of 2GB used</p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
