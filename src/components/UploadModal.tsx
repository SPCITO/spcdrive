'use client';
import { useState } from 'react';
import { File as FileIcon, CheckCircle2, Loader2 } from 'lucide-react';
import { useSPCTheme } from '@/providers/ThemeProvider';
import { Modal } from '@/components/ui/Modal';
import { Dropzone } from '@/components/ui/Dropzone';

interface UploadModalProps {
  isOpen: boolean;
  isProcessing: boolean;
  onClose: () => void;
  onUpload: (file: File) => Promise<any>;
}

export function UploadModal({ isOpen, isProcessing, onClose, onUpload }: UploadModalProps) {
  const { colors, radius } = useSPCTheme();
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleAction = async () => {
    if (!selectedFile) return;
    await onUpload(selectedFile);
    setSelectedFile(null);
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Upload Protocol" 
      subtitle="Inject assets into system node"
    >
      <div className="p-8">
        {!selectedFile ? (
          <Dropzone 
            onFileSelect={setSelectedFile} 
            isDragging={isDragging} 
            setIsDragging={setIsDragging} 
          />
        ) : (
          /* File Preview Card */
          <div 
            className="p-6 flex items-center gap-4 border animate-in fade-in zoom-in-95"
            style={{ 
              backgroundColor: `${colors.background}80`,
              borderColor: `${colors.primary}20`,
              borderRadius: radius.base 
            }}
          >
            <div 
              className="w-12 h-12 flex items-center justify-center text-white shadow-md"
              style={{ 
                backgroundColor: colors.primary,
                borderRadius: '0.75rem' 
              }}
            >
              <FileIcon className="w-6 h-6" />
            </div>
            
            <div className="grow overflow-hidden">
              <p className="text-sm font-bold truncate" style={{ color: colors.textMain }}>
                {selectedFile.name}
              </p>
              <p 
                className="text-[10px] font-mono tracking-tighter uppercase opacity-60"
                style={{ color: colors.primary }}
              >
                READY FOR INJECTION
              </p>
            </div>

            <button 
              disabled={isProcessing} 
              onClick={() => setSelectedFile(null)} 
              className="text-xs font-black uppercase tracking-tighter transition-colors disabled:opacity-50"
              style={{ color: colors.danger }}
              onMouseEnter={(e) => e.currentTarget.style.color = colors.textMain}
              onMouseLeave={(e) => e.currentTarget.style.color = colors.danger}
            >
              Remove
            </button>
          </div>
        )}

        {/* Action Button */}
        <button 
          disabled={!selectedFile || isProcessing} 
          onClick={handleAction} 
          className={`w-full mt-8 py-4 text-sm font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}
          style={{ 
            backgroundColor: selectedFile ? colors.primary : colors.border,
            color: selectedFile ? '#ffffff' : colors.textMuted,
            borderRadius: radius.base 
          }}
          onMouseEnter={(e) => {
            if (selectedFile && !isProcessing) e.currentTarget.style.filter = 'brightness(1.1)';
          }}
          onMouseLeave={(e) => {
            if (selectedFile) e.currentTarget.style.filter = 'none';
          }}
        >
          {isProcessing ? (
            <Loader2 className="animate-spin w-4 h-4" />
          ) : (
            <CheckCircle2 className="w-4 h-4" />
          )}
          {isProcessing ? 'Processing...' : 'Initialize Upload'}
        </button>
      </div>
    </Modal>
  );
}