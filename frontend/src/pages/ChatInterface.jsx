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
        <div className="max-w-5xl mx-auto h-[calc(100vh-160px)] flex flex-col glass overflow-hidden animate-fade">
            <header className="p-6 border-b border-white/10 flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    <Bot className="text-white" size={24} />
                </div>
                <div>
                    <h2 className="text-xl font-bold">AI Assistant</h2>
                    <p className="text-xs text-emerald-500 font-medium uppercase tracking-wider">Online & Processing</p>
                </div>
            </header>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
                <AnimatePresence>
                    {messages.map((msg, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-[80%] flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-purple-600' : 'bg-indigo-600'
                                    }`}>
                                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                                </div>
                                <div className="space-y-4">
                                    <div className={`p-4 rounded-2xl ${msg.role === 'user'
                                        ? 'bg-indigo-600 text-white rounded-tr-none'
                                        : 'bg-white/5 text-slate-200 border border-white/10 rounded-tl-none'
                                        }`}>
                                        {msg.content}
                                    </div>

                                    {msg.results && msg.results.length > 0 && (
                                        <div className="grid grid-cols-2 gap-2 max-w-sm">
                                            {msg.results.slice(0, 4).map((res) => (
                                                <div key={res.id} className="aspect-square rounded-lg overflow-hidden border border-white/10">
                                                    <img
                                                        src={`http://localhost:5000/api/photos/${res.id}`}
                                                        alt="result"
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/10">
                            <Loader2 className="animate-spin text-indigo-500" size={20} />
                        </div>
                    </div>
                )}
            </div>

            <form onSubmit={handleSend} className="p-6 border-t border-white/10 bg-white/5">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Talk to Drishyamitra..."
                        className="input-field pl-8 pr-16 py-4"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white hover:bg-indigo-500 transition-colors shadow-lg"
                    >
                        <Send size={18} />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChatInterface;
