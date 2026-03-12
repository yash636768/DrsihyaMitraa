import React from 'react';
import { motion } from 'framer-motion';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Camera, Shield, Zap, ChevronRight, Layers, Users } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        className="glass p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 group"
    >
        <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <Icon className="text-indigo-400 group-hover:text-indigo-300 transition-colors" size={28} />
        </div>
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-slate-400 leading-relaxed">{description}</p>
    </motion.div>
);

export default function Landing() {
    const { user } = useAuth();
    const navigate = useNavigate();

    if (user) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div className="min-h-screen bg-bg-dark overflow-hidden selection:bg-indigo-500/30">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 glass border-b-0 border-white/5 rounded-none backdrop-blur-md bg-bg-dark/50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                            <Camera className="text-white" size={20} />
                        </div>
                        <span className="text-xl font-extrabold text-white tracking-tight">DrishyaMitraa</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to="/login" className="text-slate-300 hover:text-white font-semibold transition-colors px-4 py-2">Log In</Link>
                        <Link to="/signup" className="bg-white text-slate-900 px-6 py-2.5 rounded-full font-bold hover:scale-105 transition-transform">Get Started</Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
                {/* Visual Effects */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[400px] bg-purple-500/20 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-indigo-500/30 mb-8">
                            <span className="flex h-2 w-2 rounded-full bg-indigo-400"></span>
                            <span className="text-indigo-300 text-sm font-semibold tracking-wide uppercase">AI-Powered Photo Management</span>
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-extrabold text-white tracking-tight mb-8 leading-[1.1]">
                            Your smart gallery,<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400">
                                beautifully organized.
                            </span>
                        </h1>
                        <p className="text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                            Automatically recognize faces, categorize events, and search your memories using natural language. Experience the future of photo libraries.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/signup" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 rounded-2xl font-bold text-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2">
                                Start Organizing Free
                                <ChevronRight size={20} />
                            </Link>
                            <a href="#features" className="w-full sm:w-auto px-8 py-4 glass text-white rounded-2xl font-bold text-lg hover:bg-white/5 transition-all">
                                See Features
                            </a>
                        </div>
                    </motion.div>

                    {/* Dashboard Preview Mockup */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                        className="mt-20 relative mx-auto max-w-4xl"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-transparent z-10 pointer-events-none h-full" />
                        <div className="glass rounded-t-3xl border-b-0 overflow-hidden shadow-2xl p-2 relative">
                            {/* Browser Header */}
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                            </div>
                            <img 
                                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
                                alt="Dashboard Preview" 
                                className="w-full h-auto rounded-b-2xl opacity-60 mix-blend-overlay"
                            />
                            {/* Overlay UI Elements */}
                            <div className="absolute inset-0 flex items-center justify-center z-20 top-12">
                                <div className="glass p-6 rounded-2xl flex items-center gap-4">
                                    <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center">
                                        <Users className="text-white" size={24} />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-white font-bold">Identified "Sarah"</p>
                                        <p className="text-slate-400 text-sm">in 42 photos from Hawaii Trip</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>

            {/* Features Section */}
            <section id="features" className="py-32 px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl lg:text-5xl font-extrabold text-white mb-6">Designed for scale. <br className="hidden lg:block"/>Built for simplicity.</h2>
                        <p className="text-slate-400 text-lg max-w-xl mx-auto">Stop scrolling endlessly. Let our cutting-edge AI models index your visual life.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <FeatureCard 
                            icon={Shield}
                            title="Private by Design"
                            description="All facial embeddings and metadata stay secure. No unauthorized access to your personal moments."
                            delay={0.1}
                        />
                        <FeatureCard 
                            icon={Zap}
                            title="Lightning Fast Search"
                            description="Search by face, context, or date. Find that one specific photo from years ago instantly."
                            delay={0.2}
                        />
                        <FeatureCard 
                            icon={Layers}
                            title="Auto-Categorization"
                            description="Upload dumps of photos. We'll automatically identify duplicate events and create beautiful albums."
                            delay={0.3}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}
