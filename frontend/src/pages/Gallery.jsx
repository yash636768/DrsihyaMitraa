import React, { useState, useEffect } from 'react';
import { Search, Filter, Share2 } from 'lucide-react';
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
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold">Your Gallery</h2>
                    <p className="text-slate-400 mt-1">Found {photos.length} photos</p>
                </div>

                <form onSubmit={handleSearch} className="flex gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input
                            type="text"
                            placeholder="Find memories..."
                            className="input-field pl-12 pr-6 py-3 w-80"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>
                    <button className="p-2.5 glass text-slate-400 hover:text-white transition-colors">
                        <Filter size={20} />
                    </button>
                </form>
            </header>

            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
            ) : (
                <div className="photo-grid">
                    {photos.length > 0 ? photos.map((photo) => (
                        <div key={photo.id} className="photo-card glass group">
                            <img
                                src={`http://localhost:5000/api/photos/${photo.id}`}
                                alt={photo.filename}
                                className="group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                                <p className="text-white font-bold">{photo.event_name || 'Uncategorized'}</p>
                                <div className="flex items-center justify-between mt-2">
                                    <p className="text-slate-300 text-xs">{new Date(photo.upload_date).toLocaleDateString()}</p>
                                    <button className="text-white hover:text-indigo-400 transition-colors">
                                        <Share2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="col-span-full py-20 text-center glass">
                            <p className="text-slate-500">No photos found. Try uploading some!</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Gallery;
