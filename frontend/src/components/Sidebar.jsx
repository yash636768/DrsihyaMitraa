import React from 'react';
import { Camera, Grid, MessageSquare, UserCheck, BarChart3, LogOut, Settings } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await signOut();
        navigate('/');
    };

    const navItems = [
        { icon: <BarChart3 size={20} />, label: 'Dashboard', path: '/dashboard' },
        { icon: <Camera size={20} />, label: 'Upload', path: '/upload' },
        { icon: <Grid size={20} />, label: 'Gallery', path: '/gallery' },
        { icon: <UserCheck size={20} />, label: 'Label Faces', path: '/label' },
        { icon: <MessageSquare size={20} />, label: 'AI Chat', path: '/chat' },
        { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
    ];

    return (
        <div className="sidebar glass border-r border-white/5 bg-bg-dark/80 backdrop-blur-3xl pt-8 pb-6 px-6 shadow-2xl z-50">
            {/* Branding */}
            <div className="flex items-center gap-3 mb-12">
                <div className="w-12 h-12 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                    <Camera className="text-white" size={24} />
                </div>
                <div>
                    <h1 className="text-xl font-extrabold tracking-tight text-white leading-none">Drishyamitra</h1>
                    <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">AI Platform</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-2 flex-grow">
                <p className="text-xs font-semibold text-slate-500 mb-2 px-2 uppercase tracking-widest">Menu</p>
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `nav-link px-4 py-3.5 rounded-2xl font-bold flex items-center gap-3 transition-all ${
                                isActive 
                                    ? 'bg-white/10 text-white shadow-inner border border-white/10' 
                                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                            }`
                        }
                    >
                        <div className={`${item.path === window.location.pathname ? 'text-indigo-400' : ''}`}>
                            {item.icon}
                        </div>
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            {/* Bottom Section - Storage & User */}
            <div className="mt-auto space-y-4">
                <div className="p-5 rounded-3xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/5 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex justify-between items-center mb-3">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Storage</p>
                        <span className="text-xs font-bold text-indigo-400">60%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-400 w-[60%]" />
                    </div>
                    <p className="text-[11px] font-medium text-slate-500 mt-3 text-center">1.2GB of 2.0GB used</p>
                </div>

                {user && (
                    <button 
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors font-bold text-sm text-left group"
                    >
                        <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-red-500/20 group-hover:border-red-500/30 transition-colors">
                            <LogOut size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                        </div>
                        <div className="flex-1 truncate">
                            <p className="text-white text-sm truncate">{user.email}</p>
                            <p className="text-[10px] uppercase font-bold text-slate-500 group-hover:text-red-400 transition-colors">Sign Out</p>
                        </div>
                    </button>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
