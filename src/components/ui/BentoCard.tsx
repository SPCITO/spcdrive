'use client';
import { ReactNode, CSSProperties } from 'react';
import { useSPCTheme } from '@/providers/ThemeProvider';

export interface BentoProps {
  children: ReactNode;
  title?: string;
  className?: string;
  style?: CSSProperties; 
}

export function BentoCard({ children, title, className = '', style }: BentoProps) {
  const { colors, radius } = useSPCTheme();

  return (
    <div 
      style={{ 
        ...style,
        backgroundColor: `${colors.card}b3`, // 70% opacity white/card
        borderColor: colors.border,
        borderRadius: radius.large
      }}
      className={`
        relative overflow-hidden p-8 border backdrop-blur-md
        shadow-sm transition-all duration-500 group
        ${className}
      `}
      // Handling dynamic hover shadow via JS to keep it linked to colors.primary
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 20px 25px -5px ${colors.primary}15`;
        e.currentTarget.style.borderColor = `${colors.primary}30`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = colors.border;
      }}
    >
      {/* Internal Glow Effect linked to Radius */}
      <div 
        className="absolute inset-px pointer-events-none border border-white/50" 
        style={{ borderRadius: `calc(${radius.large} - 1px)` }}
      />
      
      {title && (
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            {/* Status Dot */}
            <div 
              className="w-2 h-2 rounded-full" 
              style={{ backgroundColor: colors.primary }} 
            />
            <h3 
              className="text-[10px] font-black uppercase tracking-[0.25em]"
              style={{ color: colors.textMuted }}
            >
              {title}
            </h3>
          </div>
          {/* Decorative Divider */}
          <div 
            className="h-px grow ml-4 opacity-50" 
            style={{ backgroundColor: colors.border }} 
          />
        </div>
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}