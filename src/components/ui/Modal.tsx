'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { ReactNode } from 'react';
import { useSPCTheme } from '@/providers/ThemeProvider';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, title, subtitle, children }: ModalProps) {
  const { colors, radius } = useSPCTheme();

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 flex items-center justify-center p-4"
          style={{ zIndex: 100 }}
        >
          {/* Overlay / Backdrop - Synced with textMain for a deep, cinematic blur */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={onClose} 
            className="absolute inset-0 backdrop-blur-sm" 
            style={{ backgroundColor: `${colors.textMain}66` }} // 40% opacity of your textMain
          />

          {/* Modal Content */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }} 
            animate={{ scale: 1, opacity: 1, y: 0 }} 
            exit={{ scale: 0.95, opacity: 0, y: 20 }} 
            className="relative w-full max-w-lg shadow-2xl overflow-hidden border"
            style={{ 
              backgroundColor: colors.card,
              borderRadius: radius.large,
              borderColor: colors.border
            }}
          >
            {/* Header */}
            <div 
              className="p-6 border-b flex justify-between items-center"
              style={{ borderColor: `${colors.border}80` }}
            >
              <div>
                <h3 className="text-lg font-black" style={{ color: colors.textMain }}>
                  {title}
                </h3>
                {subtitle && (
                  <p 
                    className="text-[10px] font-bold uppercase tracking-widest mt-0.5"
                    style={{ color: colors.textMuted }}
                  >
                    {subtitle}
                  </p>
                )}
              </div>
              
              {/* Close Button */}
              <button 
                onClick={onClose} 
                className="p-2 transition-all active:scale-90"
                style={{ 
                  borderRadius: radius.base,
                  color: colors.textMuted
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${colors.primary}10`;
                  e.currentTarget.style.color = colors.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = colors.textMuted;
                }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Body */}
            <div className="relative">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}