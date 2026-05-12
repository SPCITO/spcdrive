'use client';
import { useState, useCallback } from 'react';
import { X, Upload, File as FileIcon, CheckCircle2, Loader2 } from 'lucide-react';
import { useSPCTheme } from '@/providers/ThemeProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadModalProps, FileItem } from '@/types/dashboard';

export function UploadModal({ isOpen, onClose, onUploadComplete }: UploadModalProps) {
  const { colors } = useSPCTheme();
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (e.type === 'dragenter' || e.type === 'dragover') setIsDragging(true);
    else setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) setFile(e.dataTransfer.files[0]);
  }, []);

  const simulateUpload = async () => {
    if (!file) return;
    setUploading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newFile: FileItem = {
      id: Math.random().toString(36).substring(2, 11),
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
      type: file.name.split('.').pop()?.toUpperCase() || 'FILE',
      updatedAt: new Date().toISOString().split('T')[0]
    };

    onUploadComplete(newFile);
    setUploading(false);
    setFile(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-lg bg-white rounded-4xl shadow-2xl border border-white overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-black text-slate-900">Upload Protocol</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Inject assets into system node</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-xl"><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <div className="p-8">
              {!file ? (
                <div onDragOver={handleDrag} onDragLeave={handleDrag} onDrop={handleDrop} className={`relative border-2 border-dashed rounded-3xl p-12 flex flex-col items-center gap-4 transition-all ${isDragging ? 'border-emerald-500 bg-emerald-50' : 'border-slate-100 bg-slate-50/30'}`}>
                  <Upload className="w-8 h-8 text-emerald-500" />
                  <p className="text-sm font-bold">Drop file or click to browse</p>
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => e.target.files && setFile(e.target.files[0])} />
                </div>
              ) : (
                <div className="bg-slate-50 rounded-3xl p-6 flex items-center gap-4 border border-emerald-100/50">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center text-white"><FileIcon /></div>
                  <div className="grow"><p className="text-sm font-bold truncate">{file.name}</p></div>
                  <button onClick={() => setFile(null)} className="text-xs font-bold text-red-400">Remove</button>
                </div>
              )}
              <button disabled={!file || uploading} onClick={simulateUpload} style={{ backgroundColor: file ? colors.primary : '#f1f5f9' }} className={`w-full mt-8 py-4 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${file ? 'text-white shadow-lg active:scale-95' : 'text-slate-400'}`}>
                {uploading ? <Loader2 className="animate-spin w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                {uploading ? 'Processing...' : 'Initialize Upload'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}