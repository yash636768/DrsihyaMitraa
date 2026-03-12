import React, { useState, useEffect } from 'react';
import { UserCheck, HelpCircle, Save, CheckCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { photoService } from '../services/api';

const LabelFaces = () => {
    const [unknownFaces, setUnknownFaces] = useState([]);
    const [loading, setLoading] = useState(false);
    const [labeling, setLabeling] = useState(null);
    const [name, setName] = useState('');

    // Mocking unknown faces for the UI demonstration
    useEffect(() => {
        // In a real app, you'd fetch faces with person_id=null
        setUnknownFaces([
            { id: 1, photo_id: 101, bbox: [100, 50, 80, 80] },
            { id: 2, photo_id: 105, bbox: [200, 120, 90, 90] },
        ]);
    }, []);

    const handleLabel = async (faceId) => {
        if (!name.trim()) return;
        setLoading(true);
        try {
            await photoService.labelFace(faceId, name);
            setUnknownFaces(unknownFaces.filter(f => f.id !== faceId));
            setName('');
            setLabeling(null);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8 animate-fade relative z-10">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div>
                    <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4 inline-block">Face Recognition</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Label Unknown Faces</h2>
                    <p className="text-slate-400 mt-2 text-lg">Help Drishyamitra identify people to automatically organize your photo library.</p>
                </div>
            </header>

            {unknownFaces.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {unknownFaces.map((face, i) => (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            key={face.id} 
                            className="glass rounded-[2rem] overflow-hidden border border-white/5 hover:border-indigo-500/30 transition-all group flex flex-col shadow-xl"
                        >
                            <div className="aspect-square bg-slate-900 relative overflow-hidden">
                                <img
                                    src={`http://localhost:5000/api/photos/${face.photo_id}`}
                                    className="w-full h-full object-cover filter blur-md opacity-40 scale-110 group-hover:scale-100 transition-transform duration-700"
                                    alt="context"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 to-transparent" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-32 h-32 rounded-[1.5rem] border-4 border-slate-800 shadow-2xl overflow-hidden bg-slate-900 relative group-hover:scale-105 transition-transform duration-500">
                                        <div className="absolute inset-0 bg-indigo-500/20 animate-pulse" />
                                        <img
                                            src={`http://localhost:5000/api/photos/${face.photo_id}?face_id=${face.id}`}
                                            className="w-full h-full object-cover relative z-10"
                                            alt="face"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-slate-900/50 backdrop-blur-md flex-1 flex flex-col justify-center">
                                {labeling === face.id ? (
                                    <div className="flex flex-col gap-3 w-full animate-fade">
                                        <input
                                            type="text"
                                            placeholder="Who is this?"
                                            className="w-full px-5 py-3.5 bg-slate-900/80 border border-indigo-500/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold text-center"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            autoFocus
                                            onKeyDown={(e) => e.key === 'Enter' && handleLabel(face.id)}
                                        />
                                        <div className="flex gap-2 mt-2">
                                            <button
                                                onClick={() => handleLabel(face.id)}
                                                disabled={loading || !name.trim()}
                                                className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:pointer-events-none shadow-lg shadow-indigo-500/20"
                                            >
                                                {loading ? <Loader2 className="animate-spin" size={18} /> : <CheckCircle size={18} />}
                                                Save
                                            </button>
                                            <button 
                                                onClick={() => { setLabeling(null); setName(''); }} 
                                                className="px-5 bg-white/5 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white font-semibold transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setLabeling(face.id)}
                                        className="w-full py-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white flex items-center justify-center gap-3 transition-all group-hover:border-indigo-500/30"
                                    >
                                        <UserCheck size={20} className="text-indigo-400 group-hover:scale-110 transition-transform" />
                                        <span className="font-bold text-[15px]">Identify Person</span>
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-24 text-center glass rounded-[3rem] border-dashed border-2 border-white/5 flex flex-col items-center justify-center relative overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="w-24 h-24 bg-emerald-500/10 rounded-[2rem] flex items-center justify-center mb-8 relative z-10">
                        <CheckCircle size={48} className="text-emerald-400" />
                    </div>
                    <h3 className="text-3xl font-extrabold text-white mb-3 relative z-10">Library Organized!</h3>
                    <p className="text-slate-400 text-lg max-w-md relative z-10">All faces in your current library have been successfully identified. Great job!</p>
                </motion.div>
            )}
        </div>
    );
};

export default LabelFaces;
