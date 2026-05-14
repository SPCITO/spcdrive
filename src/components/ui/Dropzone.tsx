'use client';
import { Upload } from 'lucide-react';
import { useSPCTheme } from '@/providers/ThemeProvider';

interface DropzoneProps {
  onFileSelect: (file: File) => void;
  isDragging: boolean;
  setIsDragging: (val: boolean) => void;
}

export function Dropzone({ onFileSelect, isDragging, setIsDragging }: DropzoneProps) {
  const { colors, radius } = useSPCTheme();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.type === 'dragenter' || e.type === 'dragover') setIsDragging(true);
    else setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) onFileSelect(e.dataTransfer.files[0]);
  };

  return (
    <div 
      onDragOver={handleDrag} 
      onDragLeave={handleDrag} 
      onDrop={handleDrop} 
      className="relative border-2 border-dashed p-12 flex flex-col items-center gap-4 transition-all duration-300"
      style={{ 
        // Dynamic Border and Background
        borderColor: isDragging ? colors.primary : colors.border,
        backgroundColor: isDragging ? `${colors.primary}08` : `${colors.background}50`,
        borderRadius: radius.base
      }}
    >
      {/* Upload Icon - Pulsing when dragging */}
      <Upload 
        className={`w-8 h-8 transition-transform duration-300 ${isDragging ? 'scale-110 animate-bounce' : ''}`} 
        style={{ color: colors.primary }} 
      />
      
      <div className="text-center">
        <p className="text-sm font-bold" style={{ color: colors.textMain }}>
          {isDragging ? 'Drop to Upload' : 'Drop file or click to browse'}
        </p>
        <p className="text-[10px] font-black uppercase tracking-widest mt-1 opacity-40" style={{ color: colors.textMuted }}>
          Secure Node Transfer
        </p>
      </div>

      <input 
        type="file" 
        className="absolute inset-0 opacity-0 cursor-pointer" 
        onChange={(e) => e.target.files && onFileSelect(e.target.files[0])} 
      />
    </div>
  );
}