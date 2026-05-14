'use client';
import { useSPCTheme } from '@/providers/ThemeProvider';
import Link from 'next/link';

export default function MainDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { colors, radius } = useSPCTheme();

  return (
    <main 
      className="min-h-screen p-6 md:p-10 font-sans transition-colors duration-300"
      style={{ backgroundColor: colors.background }} 
    >
      {/* Persistent Brand Header */}
      <header className="mb-10 flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/" className="group flex flex-col">
          <h1 
            className="text-2xl font-black tracking-tighter transition-colors"
            style={{ 
              color: colors.textMain,
              // We can use the primary color on hover via the group class logic
            }}
          >
            SPC <span className="transition-colors group-hover:opacity-70" style={{ color: colors.primary }}>DRIVE</span>
          </h1>
          <p 
            className="text-[10px] font-bold uppercase tracking-[0.2em] transition-opacity group-hover:opacity-100 opacity-60" 
            style={{ color: colors.textMuted }}
          >
            Secure File Platform
          </p>
        </Link>

        {/* System Status Indicator (The "Node" box) */}
        <div 
          className="h-12 w-12 flex items-center justify-center border shadow-sm transition-all hover:scale-105"
          style={{ 
            backgroundColor: colors.card, 
            borderColor: colors.border,
            borderRadius: radius.base 
          }}
        >
          <div 
            className="h-2.5 w-2.5 rounded-full animate-pulse"
            style={{ 
              backgroundColor: colors.primary,
              // Dynamic glow based on the primary color
              boxShadow: `0 0 15px ${colors.primary}80` 
            }} 
          />
        </div>
      </header>

      {/* The Page Content Area */}
      <div className="max-w-7xl mx-auto">
        {children}
      </div>

      {/* Subtle Footer Section */}
      <footer 
        className="mt-20 py-8 border-t text-center max-w-7xl mx-auto"
        style={{ borderColor: colors.border }}
      >
        <div className="flex flex-col items-center gap-2">
          <p className="text-[9px] font-black uppercase tracking-[0.4em]" style={{ color: colors.textMuted }}>
            Secured Protocol • San Pablo City Node
          </p>
          {/* Added a tiny brand mark in the footer for polish */}
          <div 
            className="h-1 w-8 rounded-full opacity-20" 
            style={{ backgroundColor: colors.primary }} 
          />
        </div>
      </footer>
    </main>
  );
}