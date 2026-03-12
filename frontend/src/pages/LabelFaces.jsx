import React, { useState, useEffect } from 'react';
import { UserCheck, HelpCircle, Save, CheckCircle } from 'lucide-react';
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
        <div className="space-y-8">
            <header>
                <h2 className="text-3xl font-bold">Label Unknown Faces</h2>
                <p className="text-slate-400 mt-2">Identify people to help Drishyamitra organize your library better.</p>
            </header>

            {unknownFaces.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {unknownFaces.map((face) => (
                        <div key={face.id} className="glass overflow-hidden border-2 border-transparent hover:border-indigo-500/30 transition-all">
                            <div className="aspect-square bg-slate-800 relative">
                                <img
                                    src={`http://localhost:5000/api/photos/${face.photo_id}`}
                                    className="w-full h-full object-cover filter blur-[2px] opacity-50"
                                    alt="context"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-32 h-32 rounded-2xl border-2 border-white shadow-2xl overflow-hidden bg-slate-900">
                                        <img
                                            src={`http://localhost:5000/api/photos/${face.photo_id}?face_id=${face.id}`}
                                            className="w-full h-full object-cover"
                                            alt="face"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 space-y-4 flex flex-col items-center">
                                {labeling === face.id ? (
                                    <div className="flex flex-col gap-3 w-full">
                                        <input
                                            type="text"
                                            placeholder="Enter name"
                                            className="input-field"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            autoFocus
                                        />
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleLabel(face.id)}
                                                disabled={loading}
                                                className="flex-1 btn-primary py-3 flex items-center justify-center gap-2"
                                            >
                                                {loading ? <div className="animate-spin h-5 w-5 border-2 border-white/30 border-t-white rounded-full" /> : <Save size={18} />}
                                                Save
                                            </button>
                                            <button onClick={() => setLabeling(null)} className="px-4 bg-white/5 rounded-xl text-slate-400 hover:text-white">Cancel</button>
                                        </div>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setLabeling(face.id)}
                                        className="w-full max-w-[160px] py-2.5 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center gap-3 hover:bg-white/10 transition-colors"
                                    >
                                        <UserCheck size={18} className="text-indigo-400" />
                                        <span className="font-bold">Identify</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="py-20 text-center glass">
                    <CheckCircle size={64} className="text-emerald-500 mx-auto mb-6 opacity-20" />
                    <h3 className="text-xl font-bold mb-2">Excellent Work!</h3>
                    <p className="text-slate-500">All faces in your library have been identified.</p>
                </div>
            )}
        </div>
    );
};

export default LabelFaces;
