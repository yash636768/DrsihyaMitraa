import React, { useState, useEffect } from 'react';
import { Search, Filter, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { photoService } from '../services/api';

const Gallery = () => {
    const [photos, setPhotos] = useState([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchPhotos();
    }, []);

    const fetchPhotos = async (q = '') => {
        setLoading(true);
        try {
            const resp = await photoService.getPhotos(q);
            setPhotos(resp.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchPhotos(query);
    };

    return (
        <div className="space-y-8">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
                <div>
                    <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest mb-4 inline-block">All Memories</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Your Gallery</h2>
                    <p className="text-slate-400 mt-2 text-lg">Found {photos.length} photos in your secure library</p>
                </div>

                <form onSubmit={handleSearch} className="flex gap-4">
                    <div className="relative group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-purple-400 transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Find memories..."
                            className="w-full md:w-96 pl-14 pr-6 py-4 bg-slate-900/50 border border-white/10 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all font-medium"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>
                    <button className="px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-slate-300 hover:text-white hover:bg-white/10 transition-all focus:ring-2 focus:ring-purple-500/50 outline-none flex items-center justify-center">
                        <Filter size={22} />
                    </button>
                </form>
            </header>

            {loading ? (
                <div className="flex flex-col items-center justify-center h-96 gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-white/10 border-t-purple-500"></div>
                    <p className="text-slate-400 font-medium">Fetching photos...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative z-10">
                    {photos.length > 0 ? photos.map((photo, i) => (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            key={photo.id} 
                            className="aspect-[4/5] rounded-[2rem] overflow-hidden relative group cursor-pointer border border-white/5 shadow-2xl"
                        >
                            <img
                                src={`http://localhost:5000/api/photos/${photo.id}`}
                                alt={photo.filename}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/95 via-bg-dark/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                            
                            {/* Content */}
                            <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                <span className="text-[10px] font-black uppercase tracking-widest text-purple-400 mb-2">{new Date(photo.upload_date).toLocaleDateString()}</span>
                                <p className="text-white font-extrabold text-xl leading-tight">{photo.event_name || 'Uncategorized'}</p>
                                <div className="flex items-center justify-between mt-4">
                                    <button className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl text-white text-xs font-bold hover:bg-white/20 transition-colors">
                                        View Full
                                    </button>
                                    <button className="w-9 h-9 bg-white/10 backdrop-blur-md rounded-xl text-white flex items-center justify-center hover:bg-white/20 hover:text-purple-400 transition-colors">
                                        <Share2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )) : (
                        <div className="col-span-full py-32 flex flex-col items-center justify-center text-center glass rounded-[3rem] border-dashed border-2 border-white/5">
                            <div className="w-20 h-20 bg-slate-900 rounded-[2rem] flex items-center justify-center mb-6">
                                <Search className="text-slate-500" size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">No photos found</h3>
                            <p className="text-slate-400 max-w-sm">We couldn't find any photos matching your search query. Try uploading more memories!</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Gallery;
