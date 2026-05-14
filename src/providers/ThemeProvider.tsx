'use client';
import React, { createContext, useContext, ReactNode } from 'react';

export const SPC_THEME = {
  colors: {
    primary: '#10b981',       
    primaryDark: '#059669',   
    primaryLight: '#ecfdf5',  
    buttonText: '#ffffff',     
    
    secondary: '#f8fafc',      
    secondaryHover: '#f1f5f9', 
    
    danger: '#ef4444',        
    
    textMain: '#09090b',      
    textMuted: '#71717a',     
    background: '#ebedef',    
    card: '#ffffff',          
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
          // Use 'spc' prefix to avoid collision with Tailwind/Global CSS vars
          ['--spc-primary' as string]: SPC_THEME.colors.primary,
          ['--spc-primary-dark' as string]: SPC_THEME.colors.primaryDark,
          ['--spc-button-text' as string]: SPC_THEME.colors.buttonText,
          ['--spc-danger' as string]: SPC_THEME.colors.danger,
          ['--spc-text-main' as string]: SPC_THEME.colors.textMain,
          ['--spc-text-muted' as string]: SPC_THEME.colors.textMuted,
          ['--spc-background' as string]: SPC_THEME.colors.background,
          ['--spc-card' as string]: SPC_THEME.colors.card,
          ['--spc-border' as string]: SPC_THEME.colors.border,
          ['--spc-radius-base' as string]: SPC_THEME.radius.base,
          ['--spc-radius-large' as string]: SPC_THEME.radius.large,

          // Hard overrides to kill the "White" from globals.css
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