'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { ReactNode } from 'react';

interface SlidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function SlidePanel({ isOpen, onClose, title, subtitle, children }: SlidePanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={onClose} 
            // Moved z-index to style to stop the Tailwind Linter from complaining
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm" 
            style={{ zIndex: 110 }}
          />
          {/* Panel */}
          <motion.div 
            initial={{ x: '100%' }} 
            animate={{ x: 0 }} 
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl p-8 border-l"
            // Moved z-index to style to stop the Tailwind Linter from complaining
            style={{ zIndex: 120 }}
          >
            <div className="flex justify-between mb-10">
              <div>
                <h3 className="text-xl font-black text-slate-900">{title}</h3>
                {subtitle && (
                  <p className="text-[10px] text-emerald-600/40 font-bold uppercase tracking-widest">
                    {subtitle}
                  </p>
                )}
              </div>
              <button 
                onClick={onClose} 
                className="p-2 hover:bg-slate-50 rounded-xl transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <div className="relative h-full">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}