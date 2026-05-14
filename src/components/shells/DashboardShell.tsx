'use client';

import { useSPCTheme } from '@/providers/ThemeProvider';
import { ReactNode } from 'react';
import Image from 'next/image';

interface DashboardShellProps {
  children: ReactNode;
  title: string;
  role: string;
  userName: string;
  onLogout: () => void;
}

export function DashboardShell({
  children,
  title,
  role,
  userName,
  onLogout,
}: DashboardShellProps) {
  const { colors, radius } = useSPCTheme();

  return (
    <div 
      className="min-h-screen p-4 md:p-10 font-sans transition-colors duration-500"
      style={{ backgroundColor: colors.background }}
    >
      <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-700">

        {/* HEADER SECTION */}
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex items-center gap-6">
            
            {/* Logo Box - The "Anchor" point */}
            <div 
              className="w-16 h-16 shadow-xl flex items-center justify-center transition-transform hover:scale-105"
              style={{ 
                backgroundColor: colors.card, 
                borderRadius: radius.base,
                border: `1px solid ${colors.border}`
              }}
            >
              <Image
                src="/assets/SPCLOGO.avif"
                alt="SPC Logo"
                width={40}
                height={40}
                className="object-contain p-1"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span 
                  className="w-2 h-2 rounded-full animate-pulse" 
                  style={{ backgroundColor: colors.primary }}
                />
                <p 
                  className="text-[10px] font-black uppercase tracking-[0.3em]" 
                  style={{ color: `${colors.primary}aa` }} // 66% opacity primary
                >
                  {role} • {title}
                </p>
              </div>

              <h1 
                className="text-4xl font-black tracking-tight" 
                style={{ color: colors.textMain }}
              >
                {userName}
              </h1>
            </div>
          </div>

          {/* DANGER ACTION: Sign Out */}
          <button
            onClick={onLogout}
            className="px-6 py-3 text-[10px] font-black uppercase tracking-widest border transition-all active:scale-95 shadow-sm"
            style={{ 
              color: colors.danger,
              borderColor: `${colors.danger}30`, // Subtle red border
              backgroundColor: colors.card,
              borderRadius: '0.75rem' // Slightly tighter radius than base
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = `${colors.danger}08`; // 5% Red tint
              e.currentTarget.style.borderColor = colors.danger;
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.card;
              e.currentTarget.style.borderColor = `${colors.danger}30`;
              e.currentTarget.style.transform = 'translateY(0px)';
            }}
          >
            Terminal Sign Out
          </button>
        </header>

        {/* MAIN SLOT: Where BentoCards are rendered */}
        <main className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
          {children}
        </main>

      </div>
    </div>
  );
}