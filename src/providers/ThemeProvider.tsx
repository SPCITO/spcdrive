'use client';
import React, { createContext, useContext, ReactNode } from 'react';

/**
 * MASTER THEME CONFIGURATION
 * Now with a deeper background for better contrast with white cards.
 */
export const SPC_THEME = {
  colors: {
    // Brand Greens
    primary: '#10b981',       
    primaryDark: '#059669',   
    primaryLight: '#ecfdf5',  
    
    // System Colors
    danger: '#ef4444',        
    
    // Neutrals & UI
    textMain: '#09090b',      
    textMuted: '#71717a',     
    // Shifted from #f4f4f5 to a more distinct "Interface Gray"
    background: '#ebedef',    
    card: '#ffffff',          
    // Tightened border color to maintain crispness against the new gray
    border: '#dcdfe4',        
  },
  radius: {
    base: '1rem',             
    large: '2.5rem',          
  }
} as const;

const ThemeContext = createContext(SPC_THEME);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeContext.Provider value={SPC_THEME}>
      <div 
        className="theme-wrapper transition-colors duration-300"
        style={{ 
          // 1. CSS Variables
          ['--primary' as string]: SPC_THEME.colors.primary,
          ['--primary-dark' as string]: SPC_THEME.colors.primaryDark,
          ['--primary-light' as string]: SPC_THEME.colors.primaryLight,
          ['--danger' as string]: SPC_THEME.colors.danger,
          ['--text-main' as string]: SPC_THEME.colors.textMain,
          ['--text-muted' as string]: SPC_THEME.colors.textMuted,
          ['--background' as string]: SPC_THEME.colors.background,
          ['--card' as string]: SPC_THEME.colors.card,
          ['--border' as string]: SPC_THEME.colors.border,
          ['--radius-base' as string]: SPC_THEME.radius.base,
          ['--radius-large' as string]: SPC_THEME.radius.large,

          // 2. Base Styles
          backgroundColor: SPC_THEME.colors.background,
          color: SPC_THEME.colors.textMain,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column'
        } as React.CSSProperties}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useSPCTheme = () => useContext(ThemeContext);