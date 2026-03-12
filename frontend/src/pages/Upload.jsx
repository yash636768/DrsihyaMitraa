import React, { useState } from 'react';
import { Upload as UploadIcon, X, CheckCircle2, Loader2 } from 'lucide-react';
import { photoService } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';

const Upload = () => {
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [status, setStatus] = useState(null);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(prev => [...prev, ...selectedFiles]);
    };

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
        } catch (err) {
            console.error(err);
            setStatus('error');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <header>
                <h2 className="text-3xl font-bold">Upload Photos</h2>
                <p className="text-slate-400 mt-2">AI will automatically detect faces and organize them.</p>
            </header>

            <div className="glass p-12 border-2 border-dashed border-indigo-500/20 hover:border-indigo-500/40 transition-colors flex flex-col items-center justify-center text-center relative overflow-hidden my-8">
                <UploadIcon size={64} className="text-indigo-400 mb-8" />
                <h3 className="text-2xl font-bold mb-4">Drag and drop photos or click to browse</h3>
                <p className="text-slate-500 mb-10">Supports JPG, PNG and RAW formats</p>

                <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                />

                <button className="btn-primary relative z-10 pointer-events-none">
                    Select Files
                </button>
            </div>

            {files.length > 0 && (
                <div className="glass p-6 space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="font-bold">{files.length} files selected</h3>
                        <button
                            onClick={handleUpload}
                            disabled={uploading}
                            className="btn-primary flex items-center gap-2"
                        >
                            {uploading ? <Loader2 className="animate-spin" size={20} /> : 'Start Processing'}
                        </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {files.map((file, i) => (
                            <div key={i} className="relative group rounded-xl overflow-hidden aspect-square bg-slate-800">
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt="preview"
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    onClick={() => removeFile(i)}
                                    className="absolute top-2 right-2 p-1.5 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <AnimatePresence>
                {status === 'success' && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="fixed bottom-10 right-10 bg-emerald-500 text-white p-6 rounded-2xl shadow-2xl flex items-center gap-4 z-50"
                    >
                        <CheckCircle2 size={32} />
                        <div>
                            <p className="font-bold">Photos Processed!</p>
                            <p className="text-sm opacity-90">AI has finished analyzing your photos.</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Upload;
