'use client';

import { motion } from 'framer-motion';
import { useSPCTheme } from '@/providers/ThemeProvider';

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  color: string;
  onClick: () => void;
  disabled?: boolean;
}

export function ActionButton({ icon, label, color, onClick, disabled }: ActionButtonProps) {
  const { colors, radius } = useSPCTheme();
  
  return (
    <motion.button
      whileHover={disabled ? {} : "hover"} 
      whileTap={disabled ? {} : { scale: 0.95 }} 
      onClick={onClick}
      disabled={disabled}
      className={`relative flex items-center gap-2 px-3 py-2 transition-all border group overflow-hidden ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
      style={{ borderRadius: radius.base, borderColor: `${color}20`, backgroundColor: colors.background }}
    >
      <motion.div 
        variants={{ hover: { x: 0 } }} 
        initial={{ x: '-105%' }} 
        className="absolute inset-0 z-0 opacity-10" 
        style={{ backgroundColor: color }} 
      />
      <span className="relative z-10" style={{ color: color }}>{icon}</span>
      <span className="text-[9px] font-black uppercase tracking-tighter relative z-10 hidden lg:block overflow-hidden" style={{ color: color }}>
        <motion.div variants={{ hover: { y: 0 } }} initial={{ y: 20 }}>{label}</motion.div>
      </span>
    </motion.button>
  );
}