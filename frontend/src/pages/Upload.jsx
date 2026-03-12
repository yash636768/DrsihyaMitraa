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
        <div className="max-w-5xl mx-auto space-y-12 animate-fade">
            <header className="flex justify-between items-end">
                <div>
                    <h2 className="text-4xl font-extrabold text-white">Upload Center</h2>
                    <p className="text-slate-400 mt-2 text-lg">AI-powered face detection and organization starts here.</p>
                </div>
                {files.length > 0 && (
                    <button
                        onClick={handleUpload}
                        disabled={uploading}
                        className="btn-primary flex items-center gap-3 px-8"
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
                    borderColor: isDragging ? 'rgba(99, 102, 241, 0.8)' : 'rgba(99, 102, 241, 0.15)',
                    scale: isDragging ? 1.02 : 1,
                    backgroundColor: isDragging ? 'rgba(99, 102, 241, 0.05)' : 'rgba(15, 23, 42, 0.4)'
                }}
                className={`glass p-20 border-2 border-dashed flex flex-col items-center justify-center text-center relative overflow-hidden rounded-3xl transition-all duration-300`}
            >
                <div className={`transition-transform duration-500 ${isDragging ? 'scale-110' : ''}`}>
                    <div className="w-24 h-24 bg-indigo-500/10 rounded-full flex items-center justify-center mb-8 mx-auto">
                        <UploadIcon size={48} className="text-indigo-400" />
                    </div>
                    <h3 className="text-3xl font-bold mb-4 text-white">Drop your memories here</h3>
                    <p className="text-slate-400 text-lg mb-10 max-w-md mx-auto">
                        Drag and drop photos, or click to browse. We support high-res JPG, PNG and RAW formats.
                    </p>
                </div>

                <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                />

                <button className="btn-primary pointer-events-none px-10 py-4 text-lg">
                    Browse Files
                </button>

                {isDragging && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 pointer-events-none bg-indigo-500/5 backdrop-blur-[2px] flex items-center justify-center"
                    >
                        <div className="bg-indigo-600 text-white px-6 py-3 rounded-full font-bold shadow-xl">
                            Release to start
                        </div>
                    </motion.div>
                )}
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-6">
                    <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                        <ImageIcon className="text-indigo-400" size={24} />
                        Current Batch
                        {files.length > 0 && <span className="text-sm font-medium bg-white/10 px-3 py-1 rounded-full text-indigo-300 ml-2">{files.length}</span>}
                    </h3>

                    {files.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                            <AnimatePresence>
                                {files.map((file, i) => (
                                    <motion.div
                                        key={`${file.name}-${i}`}
                                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.8, y: -20 }}
                                        layout
                                        className="relative group rounded-3xl overflow-hidden aspect-square glass border-0"
                                    >
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt="preview"
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                                            <p className="text-white text-xs font-bold truncate">{file.name}</p>
                                        </div>
                                        <button
                                            onClick={() => removeFile(i)}
                                            className="absolute top-4 right-4 p-2 bg-red-500/80 backdrop-blur-md rounded-xl text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:scale-110"
                                        >
                                            <X size={16} />
                                        </button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className="glass p-20 text-center rounded-3xl border-dashed border-white/5">
                            <p className="text-slate-500 text-lg italic">No photos selected yet</p>
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                        <Clock className="text-indigo-400" size={24} />
                        Recent History
                    </h3>
                    <div className="glass p-6 rounded-3xl space-y-4">
                        {[
                            { name: 'Tokyo_Night.jpg', status: 'Success', time: '2m ago' },
                            { name: 'Family_Dinner.png', status: 'Success', time: '15m ago' },
                            { name: 'Graduation_01.jpg', status: 'Parsing...', time: 'Just now' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all group border border-transparent hover:border-white/5">
                                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                                    <FileText size={20} className="text-indigo-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-white truncate text-sm">{item.name}</p>
                                    <p className={`text-xs ${item.status === 'Success' ? 'text-emerald-500' : 'text-indigo-400 animate-pulse'}`}>{item.status}</p>
                                </div>
                                <p className="text-[10px] text-slate-500 font-medium">{item.time}</p>
                            </div>
                        ))}
                        <button className="w-full py-4 text-indigo-400 text-sm font-bold hover:text-white transition-colors mt-2">
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
                        className="fixed bottom-12 left-1/2 -translate-x-1/2 glass px-10 py-6 text-white border-emerald-500/50 flex items-center gap-6 z-[1000] shadow-2xl shadow-emerald-500/10"
                    >
                        <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/40">
                            <CheckCircle2 size={24} />
                        </div>
                        <div>
                            <p className="font-extrabold text-xl">Upload Complete!</p>
                            <p className="text-emerald-400 text-sm font-medium">All photos are being indexed and organized.</p>
                        </div>
                        <button onClick={() => setStatus(null)} className="ml-4 p-2 hover:bg-white/10 rounded-full transition-colors">
                            <X size={20} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Upload;
