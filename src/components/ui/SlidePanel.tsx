'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { ReactNode } from 'react';
import { useSPCTheme } from '@/providers/ThemeProvider';

interface SlidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function SlidePanel({ isOpen, onClose, title, subtitle, children }: SlidePanelProps) {
  const { colors, radius } = useSPCTheme();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - Synced with textMain for depth */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={onClose} 
            className="fixed inset-0 backdrop-blur-sm" 
            style={{ 
              zIndex: 110,
              backgroundColor: `${colors.textMain}33` // 20% opacity of your theme's dark text color
            }}
          />
          
          {/* Panel Container */}
          <motion.div 
            initial={{ x: '100%' }} 
            animate={{ x: 0 }} 
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md shadow-2xl p-8 border-l transition-colors"
            style={{ 
              zIndex: 120,
              backgroundColor: colors.card,
              borderColor: colors.border
            }}
          >
            {/* Header Section */}
            <div className="flex justify-between mb-10">
              <div>
                <h3 className="text-xl font-black" style={{ color: colors.textMain }}>
                  {title}
                </h3>
                {subtitle && (
                  <p 
                    className="text-[10px] font-bold uppercase tracking-widest mt-1"
                    style={{ color: colors.primary, opacity: 0.6 }}
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

            {/* Content Slot */}
            <div className="relative h-[calc(100%-100px)] overflow-y-auto custom-scrollbar">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}