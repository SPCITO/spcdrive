'use client';
import { useState, useEffect } from 'react';
import { FileText, Hash, HardDrive } from 'lucide-react';
import { useSPCTheme } from '@/providers/ThemeProvider';
import { FileItem } from '@/types/dashboard';

export function FileEditForm({ file, onSave }: { file: FileItem | null, onSave: (f: FileItem) => void }) {
  const { colors, radius } = useSPCTheme();
  const [formData, setFormData] = useState<FileItem | null>(null);

  useEffect(() => { if (file) setFormData({ ...file }); }, [file]);
  if (!formData) return null;

  return (
    <div className="space-y-5 pt-6">
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest opacity-40 px-1">Asset Designation</label>
        <div className="relative">
          <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: colors.textMuted }} />
          <input 
            type="text" value={formData.name} 
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full pl-11 pr-4 py-4 outline-none font-bold text-sm border transition-all" 
            style={{ backgroundColor: colors.background, borderColor: colors.border, borderRadius: radius.base, color: colors.textMain }}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest opacity-40 px-1">Extension</label>
          <input 
            type="text" value={formData.type} 
            onChange={(e) => setFormData({ ...formData, type: e.target.value.toUpperCase() })}
            className="w-full px-4 py-4 outline-none font-mono text-xs border" 
            style={{ backgroundColor: colors.background, borderColor: colors.border, borderRadius: radius.base, color: colors.primary }}
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest opacity-40 px-1">Payload Size</label>
          <input 
            type="text" value={formData.size} readOnly
            className="w-full px-4 py-4 outline-none font-mono text-xs border opacity-50 cursor-not-allowed" 
            style={{ backgroundColor: colors.background, borderColor: colors.border, borderRadius: radius.base, color: colors.textMain }}
          />
        </div>
      </div>
      <button 
        onClick={() => onSave(formData)} 
        className="w-full py-4 text-white font-black uppercase tracking-widest active:scale-95 transition-all mt-4"
        style={{ backgroundColor: colors.primary, borderRadius: radius.base }}
      >
        Commit Registry Changes
      </button>
    </div>
  );
}