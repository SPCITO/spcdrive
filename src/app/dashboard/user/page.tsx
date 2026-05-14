'use client';

import { useUserDashboard } from '@/hooks/useUserDashboard';
import { useSearch } from '@/hooks/useSearch';
import { BentoCard } from '@/components/ui/BentoCard';
import { DashboardShell } from '@/components/shells/DashboardShell';
import { Button } from '@/components/ui/Button';
import { useSPCTheme } from '@/providers/ThemeProvider'; // Linked to Provider
import { Loader2, ShieldCheck } from 'lucide-react';
import { FileBank } from '@/components/FileBank';

export default function UserDashboard() {
  const { user, logout, loading, files } = useUserDashboard();
  const { colors } = useSPCTheme(); // Accessing Master Colors

  // Use the search hook for file filtering
  const { query: searchQuery, setQuery: setSearchQuery, filteredData: filteredFiles } = useSearch(files, ['name', 'type']);

  // Loading State (Fully reactive to Provider)
  if (!user || loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen" style={{ backgroundColor: colors.background }}>
        <Loader2 className="w-10 h-10 animate-spin" style={{ color: colors.primary }} />
        <p 
          className="mt-4 text-[10px] font-black uppercase tracking-[0.3em] animate-pulse" 
          style={{ color: `${colors.primary}88` }}
        >
          Opening Your Drive...
        </p>
      </div>
    );
  }

  return (
    <DashboardShell 
      title="User Drive"
      role="Standard Operative"
      userName={user.name}
      onLogout={logout}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Profile Identity Card */}
        <BentoCard className="md:col-span-4">
          <div className="flex items-center gap-5 p-2">
            <div 
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg transition-transform hover:scale-105 duration-300"
              style={{ 
                backgroundColor: colors.primary,
                boxShadow: `0 10px 15px -3px ${colors.primary}40` 
              }}
            >
              {user.name.charAt(0)}
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-0.5" style={{ color: `${colors.primary}66` }}>
                Authenticated Node
              </p>
              <h2 className="text-2xl font-black tracking-tight leading-none" style={{ color: colors.textMain }}>
                {user.name}
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: colors.primary }} />
                <span className="text-[10px] font-black uppercase tracking-widest opacity-40" style={{ color: colors.primary }}>
                  Active Session
                </span>
              </div>
            </div>
          </div>
        </BentoCard>

        {/* Central File Bank */}
        <BentoCard title="Available Protocols & Assets" className="md:col-span-4">
          <FileBank 
            role="user" 
            files={filteredFiles} 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </BentoCard>

        {/* Security Status Component */}
        <BentoCard 
          className="md:col-span-2 flex items-center gap-4 transition-all hover:shadow-xl border border-transparent"
          style={{ borderColor: 'transparent' }} // Logic for hover managed by CSS/Tailwind
        >
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}
          >
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-black uppercase tracking-[0.15em]" style={{ color: colors.primary }}>
              Security: Restricted
            </p>
            <p className="text-[11px] font-bold tracking-tight" style={{ color: colors.textMuted }}>
              Read-Only Access Enabled
            </p>
          </div>
          <Button variant="ghost" size="sm">
            Learn More
          </Button>
        </BentoCard>

      </div>
    </DashboardShell>
  );
}