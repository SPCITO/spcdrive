'use client';

import { useUserDashboard } from '@/hooks/useUserDashboard';
import { useFileManagement } from '@/hooks/useFileManagement';
import { useSearch } from '@/hooks/useSearch';
import { BentoCard } from '@/components/ui/BentoCard';
import { DashboardShell } from '@/components/shells/DashboardShell';
import { Button } from '@/components/ui/Button';
import { useSPCTheme } from '@/providers/ThemeProvider';
import { Loader2, ShieldCheck, DownloadCloud } from 'lucide-react';
import { FileBank } from '@/components/FileBank';

export default function UserDashboard() {
  const { user, logout, loading } = useUserDashboard();
  const { colors, radius } = useSPCTheme();
  
  // Connect to the shared file state engine
  const fileManager = useFileManagement();

  // Use the search hook for file filtering
  const { 
    query: searchQuery, 
    setQuery: setSearchQuery, 
    filteredData: filteredFiles 
  } = useSearch(fileManager.files, ['name', 'type']);

  // Loading State
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
        
        {/* --- Profile Identity Card --- */}
        <BentoCard className="md:col-span-4">
          <div className="flex items-center justify-between p-2">
            <div className="flex items-center gap-5">
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg transition-transform hover:scale-105 duration-300"
                style={{ 
                  backgroundColor: colors.primary,
                  boxShadow: `0 10px 15px -3px ${colors.primary}40`,
                  borderRadius: radius.base
                }}
              >
                {user.name.charAt(0)}
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-0.5" style={{ color: colors.primary }}>
                  Authenticated Node
                </p>
                <h2 className="text-2xl font-black tracking-tight leading-none" style={{ color: colors.textMain }}>
                  {user.name}
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: colors.primary }} />
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-40" style={{ color: colors.primary }}>
                    Active Session: Encrypted
                  </span>
                </div>
              </div>
            </div>
            
            <div className="hidden sm:block text-right">
              <p className="text-[10px] font-black uppercase opacity-30 tracking-tighter">Last Access</p>
              <p className="text-xs font-mono font-bold" style={{ color: colors.textMain }}>{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </BentoCard>

        {/* --- Central File Bank --- */}
        <BentoCard title="Available Protocols & Assets" className="md:col-span-4">
          <FileBank 
            role="user" 
            files={filteredFiles} 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            
            // Standard User Action
            onDownload={(file: any) => {
              console.log(`RETRIEVING_ASSET: ${file.name}`);
              alert(`Initializing secure download protocol for ${file.name}`);
            }}
            
            // Non-functional for users, but required by prop-types
            onUpdate={() => {}} 
            onDelete={() => {}}
          />
        </BentoCard>

        {/* --- Security Status Footer Card --- */}
        <BentoCard 
          className="md:col-span-4 flex flex-col md:flex-row items-center justify-between gap-4 py-4"
        >
          <div className="flex items-center gap-4">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}
            >
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.15em]" style={{ color: colors.primary }}>
                Security: Restricted
              </p>
              <p className="text-xs font-bold tracking-tight" style={{ color: colors.textMuted }}>
                Your current clearance level allows for <span style={{ color: colors.textMain }}>Read-Only & Retrieval</span> privileges.
              </p>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.open('https://docs.spcdrive.com', '_blank')}
            className="w-full md:w-auto"
          >
            Access Protocol Documentation
          </Button>
        </BentoCard>

      </div>
    </DashboardShell>
  );
}