'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useSPCTheme } from '@/providers/ThemeProvider';

interface SearchInputProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchInput({ value, onChange, placeholder = "SEARCH FILES...", className = "" }: SearchInputProps) {
  const { colors, radius } = useSPCTheme();

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative group ${className}`}
    >
      {/* Search Icon - Changes color when text is present */}
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <Search 
          className="w-4 h-4 transition-colors" 
          style={{ color: value ? colors.primary : colors.textMuted }} 
        />
      </div>

      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border py-3 pl-12 pr-10 text-[10px] font-black uppercase tracking-[0.2em] focus:outline-none transition-all shadow-sm"
        style={{ 
          backgroundColor: `${colors.background}80`, // 50% opacity background
          borderColor: colors.border,
          color: colors.textMain,
          borderRadius: radius.base,
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = colors.primary;
          e.currentTarget.style.boxShadow = `0 0 0 4px ${colors.primary}15`;
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = colors.border;
          e.currentTarget.style.boxShadow = 'none';
        }}
      />

      {/* Clear Button */}
      <AnimatePresence>
        {value && (
          <motion.button 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => onChange('')}
            className="absolute inset-y-0 right-4 flex items-center transition-colors"
            style={{ color: colors.textMuted }}
            onMouseEnter={(e) => e.currentTarget.style.color = colors.danger}
          >
            <X className="w-3 h-3" />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}