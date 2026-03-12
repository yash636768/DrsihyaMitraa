import React, { useState, useCallback } from 'react';
import { Upload as UploadIcon, X, CheckCircle2, Loader2, FileText, Image as ImageIcon, Clock } from 'lucide-react';
import { photoService } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';

const Upload = () => {
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [status, setStatus] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        addFiles(selectedFiles);
    };

    const addFiles = (selectedFiles) => {
        setFiles(prev => [...prev, ...selectedFiles]);
    };

    const onDragOver = useCallback((e) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const onDragLeave = useCallback(() => {
        setIsDragging(false);
    }, []);

    const onDrop = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFiles = Array.from(e.dataTransfer.files);
        addFiles(droppedFiles);
    }, []);

    const removeFile = (index) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    const handleUpload = async () => {
        if (files.length === 0) return;
        setUploading(true);
        setStatus('uploading');

        try {
            for (const file of files) {
                await photoService.uploadPhoto(file);
            }
            setStatus('success');
            setFiles([]);
            setTimeout(() => setStatus(null), 5000);
        } catch (err) {
            console.error(err);
            setStatus('error');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-12 animate-fade relative z-10">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4 inline-block">Upload & Process</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Add Memories</h2>
                    <p className="text-slate-400 mt-2 text-lg">AI-powered face detection and organization starts here.</p>
                </div>
                {files.length > 0 && (
                    <button
                        onClick={handleUpload}
                        disabled={uploading}
                        className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-bold flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_-10px_rgba(255,255,255,0.3)] disabled:opacity-50 disabled:pointer-events-none"
                    >
                        {uploading ? <Loader2 className="animate-spin" size={20} /> : <UploadIcon size={20} />}
                        <span>{uploading ? 'Processing...' : `Upload ${files.length} Photos`}</span>
                    </button>
                )}
            </header>

            <motion.div
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                animate={{
                    borderColor: isDragging ? 'rgba(99, 102, 241, 0.5)' : 'rgba(255, 255, 255, 0.05)',
                    scale: isDragging ? 1.01 : 1,
                    backgroundColor: isDragging ? 'rgba(99, 102, 241, 0.05)' : 'rgba(15, 23, 42, 0.6)'
                }}
                className={`glass p-16 md:p-24 border-2 border-dashed flex flex-col items-center justify-center text-center relative overflow-hidden rounded-[3rem] transition-all duration-300 shadow-2xl group`}
            >
                <div className={`transition-transform duration-500 z-10 ${isDragging ? 'scale-110' : ''}`}>
                    <div className="w-24 h-24 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-[2rem] flex items-center justify-center mb-8 mx-auto shadow-lg shadow-indigo-500/10 group-hover:scale-110 transition-transform">
                        <UploadIcon size={40} className="text-indigo-400" />
                    </div>
                    <h3 className="text-3xl font-extrabold mb-4 text-white tracking-tight">Drop your memories here</h3>
                    <p className="text-slate-400 text-lg mb-10 max-w-md mx-auto leading-relaxed">
                        Drag and drop photos, or click to browse. We safely process your files entirely on our secure servers.
                    </p>
                </div>

                <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer z-20"
                />

                <button className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl z-10 pointer-events-none group-hover:bg-white/10 transition-colors">
                    Browse Files
                </button>

                {isDragging && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 pointer-events-none bg-indigo-500/10 backdrop-blur-[4px] flex items-center justify-center z-30"
                    >
                        <div className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold shadow-2xl flex items-center gap-3">
                            <UploadIcon size={24} />
                            Release to drop
                        </div>
                    </motion.div>
                )}
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-6 lg:space-y-8">
                    <h3 className="text-2xl font-extrabold text-white flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                            <ImageIcon className="text-purple-400" size={20} />
                        </div>
                        Current Batch
                        {files.length > 0 && <span className="text-sm font-bold bg-white/10 px-3 py-1 rounded-full text-purple-300 ml-2 border border-white/10">{files.length}</span>}
                    </h3>

                    {files.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6">
                            <AnimatePresence>
                                {files.map((file, i) => (
                                    <motion.div
                                        key={`${file.name}-${i}`}
                                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.8, y: -20 }}
                                        layout
                                        className="relative group rounded-[2rem] overflow-hidden aspect-square glass border border-white/5 shadow-xl"
                                    >
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt="preview"
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/95 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                                            <p className="text-white text-xs font-bold truncate leading-relaxed">{file.name}</p>
                                        </div>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                                            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-red-500/80 backdrop-blur-md rounded-xl text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:scale-110 shadow-lg z-10"
                                        >
                                            <X size={16} />
                                        </button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className="glass p-16 text-center rounded-[3rem] border-dashed border-2 border-white/5 flex flex-col items-center justify-center">
                            <ImageIcon size={32} className="text-slate-600 mb-4" />
                            <p className="text-slate-500 text-lg font-medium">No photos selected yet</p>
                        </div>
                    )}
                </div>

                <div className="space-y-6 lg:space-y-8">
                    <h3 className="text-2xl font-extrabold text-white flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                            <Clock className="text-emerald-400" size={20} />
                        </div>
                        Recent History
                    </h3>
                    <div className="glass p-6 rounded-[2.5rem] border border-white/5 space-y-4 shadow-2xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        
                        {[
                            { name: 'Tokyo_Night.jpg', status: 'Success', time: '2m ago' },
                            { name: 'Family_Dinner.png', status: 'Success', time: '15m ago' },
                            { name: 'Graduation_01.jpg', status: 'Parsing...', time: 'Just now' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all group/item cursor-pointer border border-transparent hover:border-white/5 z-10 relative">
                                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center group-hover/item:bg-white/10 transition-colors">
                                    <FileText size={20} className="text-slate-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-white truncate text-[15px]">{item.name}</p>
                                    <p className={`text-xs font-bold uppercase tracking-wider mt-0.5 ${item.status === 'Success' ? 'text-emerald-400' : 'text-indigo-400 animate-pulse'}`}>{item.status}</p>
                                </div>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{item.time}</p>
                            </div>
                        ))}
                        <button className="w-full py-4 text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-2xl text-sm font-bold transition-colors mt-4 relative z-10">
                            View Full History
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {status === 'success' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 50 }}
                        className="fixed bottom-12 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-xl border border-emerald-500/30 px-8 py-5 rounded-3xl text-white flex items-center gap-6 z-[1000] shadow-2xl shadow-emerald-500/20"
                    >
                        <div className="w-12 h-12 bg-gradient-to-tr from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/40 shrink-0">
                            <CheckCircle2 size={24} className="text-white" />
                        </div>
                        <div className="pr-4">
                            <p className="font-extrabold text-lg">Upload Complete!</p>
                            <p className="text-emerald-400 text-sm font-medium mt-0.5">All photos are being indexed and organized.</p>
                        </div>
                        <button onClick={() => setStatus(null)} className="p-2.5 hover:bg-white/10 rounded-full transition-colors shrink-0">
                            <X size={20} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Upload;
