import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Image as ImageIcon } from 'lucide-react';
import { photoService } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';

const ChatInterface = () => {
    const [messages, setMessages] = useState([
        { role: 'bot', content: 'Hello! I am Drishyamitra. How can I help you find or share your photos today?' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMsg = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setLoading(true);

        try {
            const resp = await photoService.chat(userMsg);
            setMessages(prev => [...prev, {
                role: 'bot',
                content: resp.data.response,
                results: resp.data.results
            }]);
        } catch (err) {
            setMessages(prev => [...prev, { role: 'bot', content: 'Sorry, I encountered an error processing your request.' }]);
        } finally {
            setLoading(true);
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto h-[calc(100vh-140px)] flex flex-col glass rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden animate-fade relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            
            <header className="p-6 border-b border-white/5 flex items-center justify-between bg-bg-dark/40 backdrop-blur-md relative z-10">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <Bot className="text-white" size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-extrabold text-white">AI Assistant</h2>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Online & Processing</p>
                        </div>
                    </div>
                </div>
                <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                    <ImageIcon size={18} />
                </button>
            </header>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 scroll-smooth relative z-10">
                <AnimatePresence>
                    {messages.map((msg, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95, y: 10, originX: msg.role === 'user' ? 1 : 0 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-[85%] md:max-w-[70%] flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                <div className={`w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-lg ${
                                    msg.role === 'user' 
                                        ? 'bg-gradient-to-tr from-purple-500 to-pink-500 shadow-purple-500/20' 
                                        : 'bg-gradient-to-tr from-indigo-500 to-blue-500 shadow-indigo-500/20'
                                    }`}>
                                    {msg.role === 'user' ? <User size={18} className="text-white" /> : <Bot size={18} className="text-white" />}
                                </div>
                                <div className="space-y-4 pt-1">
                                    <div className={`p-5 text-[15px] leading-relaxed relative ${
                                        msg.role === 'user'
                                            ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-[1.5rem] rounded-tr-sm shadow-xl shadow-indigo-500/10'
                                            : 'bg-slate-900/80 backdrop-blur-md text-slate-200 border border-white/10 rounded-[1.5rem] rounded-tl-sm shadow-xl'
                                        }`}>
                                        {msg.content}
                                    </div>

                                    {msg.results && msg.results.length > 0 && (
                                        <div className="grid grid-cols-2 gap-3 max-w-sm mt-4">
                                            {msg.results.slice(0, 4).map((res) => (
                                                <motion.div 
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    key={res.id} 
                                                    className="aspect-square rounded-2xl overflow-hidden border border-white/10 relative group cursor-pointer"
                                                >
                                                    <img
                                                        src={`http://localhost:5000/api/photos/${res.id}`}
                                                        alt="Search Result"
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </motion.div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                
                {loading && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                    >
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center bg-gradient-to-tr from-indigo-500 to-blue-500 shadow-lg shadow-indigo-500/20">
                                <Bot size={18} className="text-white" />
                            </div>
                            <div className="bg-slate-900/80 backdrop-blur-md p-5 rounded-[1.5rem] rounded-tl-sm border border-white/10 flex items-center gap-3">
                                <Loader2 className="animate-spin text-indigo-400" size={20} />
                                <span className="text-slate-400 text-sm font-medium">Searching memories...</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>

            <form onSubmit={handleSend} className="p-6 md:p-8 border-t border-white/5 bg-bg-dark/40 backdrop-blur-md relative z-10">
                <div className="relative group flex items-center">
                    <input
                        type="text"
                        placeholder="Talk to Drishyamitra..."
                        className="w-full pl-6 pr-16 py-5 bg-slate-900/50 border border-white/10 rounded-3xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium text-[15px]"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || loading}
                        className="absolute right-3 w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white hover:bg-indigo-500 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-50 disabled:pointer-events-none"
                    >
                        <Send size={20} className="ml-1" />
                    </button>
                </div>
                <p className="text-center text-[10px] text-slate-500 mt-4 uppercase tracking-widest font-bold">Press Enter to send</p>
            </form>
        </div>
    );
};

export default ChatInterface;
