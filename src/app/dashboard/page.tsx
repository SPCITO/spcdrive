'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMockAuth } from '@/hooks/useMockAuth';
import { useAdminDashboard } from '@/hooks/useAdminDashboard';
import { useSearch } from '@/hooks/useSearch';
import { useUserManagement } from '@/hooks/useUserManagement';

// UI Components
import { Button } from '@/components/ui/Button';
import { BentoCard } from '@/components/ui/BentoCard';
import { DashboardShell } from '@/components/shells/DashboardShell';
import { FileBank } from '@/components/FileBank';
import { UploadModal } from '@/components/UploadModal';
import { UserManagement } from '@/components/UserManagement';
import { DownloadHistory } from '@/components/DownloadHistory';

// Utilities & Data
import { MOCK_LOGS } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { 
  Upload, UserCircle, Download, ArrowRight, 
  LayoutDashboard, Loader2 
} from 'lucide-react';

export default function AdminDashboard() {
  const { user, logout, loading } = useMockAuth();
  const router = useRouter();
  
  const dash = useAdminDashboard();
  const userManager = useUserManagement();
  
  const [isProcessingUpload, setIsProcessingUpload] = useState(false);

  // Search Logic
  const { query: searchQuery, setQuery: setSearchQuery, filteredData: filteredFiles } = useSearch(dash.files, ['name', 'type']);
  const userSearch = useSearch(userManager.users, ['name', 'email']);

  useEffect(() => {
    if (!loading) {
      if (!user) router.push('/dashboard/auth');
      else if (user.role !== 'admin') router.push('/dashboard/user');
    }
  }, [user, loading, router]);

  if (!user || loading || user.role !== 'admin') {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-50">
        <Loader2 className="w-10 h-10 animate-spin text-emerald-500" />
      </div>
    );
  }

  const handleUpload = async (file: File) => {
    setIsProcessingUpload(true);
    const newFile = {
      id: Math.random().toString(36).substring(2, 11),
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      type: file.name.split('.').pop()?.toUpperCase() || 'FILE',
      updatedAt: new Date().toISOString().split('T')[0],
    };
    dash.handleUploadComplete(newFile);
    setIsProcessingUpload(false);
  };

  return (
    <DashboardShell 
      title={dash.activeView === 'files' ? "File Manager" : dash.activeView === 'users' ? "User Management" : "Download Logs"} 
      role="Administrator" 
      userName={user.name} 
      onLogout={logout}
    >
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        
        {/* Profile & Primary Action */}
        <BentoCard className="md:col-span-4">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-6">
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Active Session</p>
              <h2 className="text-3xl font-black tracking-tight text-slate-900">{user.name}</h2>
              <p className="text-emerald-600/40 text-xs font-medium italic">"Node {dash.activeView.toUpperCase()} Protocol Active"</p>
            </div>
            
            <Button 
              size="lg"
              onClick={() => dash.activeView === 'files' ? dash.toggleUpload(true) : dash.setView('files')}
              leftIcon={dash.activeView === 'files' ? <Upload className="w-5 h-5" /> : <LayoutDashboard className="w-5 h-5" />}
            >
              {dash.activeView === 'files' ? "Upload File" : "Return to Files"}
            </Button>
          </div>
        </BentoCard>

        {/* Navigation Stack */}
        <div className="md:col-span-2 flex flex-col gap-4">
          {[
            { id: 'users', label: 'Manage Account', sub: 'Directory', icon: UserCircle },
            { id: 'history', label: 'Download Logs', sub: 'Access Documentation', icon: Download }
          ].map((btn) => (
            <button 
              key={btn.id}
              onClick={() => dash.setView(btn.id as any)}
              className={cn(
                "flex items-center justify-between p-5 bg-white border rounded-3xl transition-all",
                dash.activeView === btn.id 
                  ? 'border-emerald-500 ring-2 ring-emerald-500/10' 
                  : 'border-zinc-100 hover:shadow-xl hover:shadow-emerald-500/5'
              )}
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  "p-3 rounded-xl",
                  dash.activeView === btn.id ? 'bg-emerald-500 text-white' : 'bg-emerald-50 text-emerald-600'
                )}>
                  <btn.icon className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-slate-900">{btn.label}</p>
                  <p className="text-[10px] text-emerald-600/40 font-black uppercase tracking-wider">{btn.sub}</p>
                </div>
              </div>
              <ArrowRight className={cn(
                "w-4 h-4",
                dash.activeView === btn.id ? 'text-emerald-500' : 'text-zinc-300'
              )} />
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-6">
          {dash.activeView === 'files' ? (
            <BentoCard title="Your Files">
              <FileBank 
                role="admin" 
                files={filteredFiles} 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </BentoCard>
          ) : dash.activeView === 'users' ? (
            <UserManagement 
              users={userSearch.filteredData}
              isEditing={userManager.isEditing}
              selectedUser={userManager.selectedUser}
              onApprove={userManager.approveUser}
              onToggleStatus={userManager.toggleStatus}
              onEdit={userManager.openEdit}
              onCloseEdit={userManager.closeEdit}
            />
          ) : (
            <DownloadHistory logs={MOCK_LOGS} />
          )}
        </div>
        
        <UploadModal 
          isOpen={dash.isUploadOpen} 
          isProcessing={isProcessingUpload}
          onClose={() => dash.toggleUpload(false)} 
          onUpload={handleUpload} 
        />
      </div>
    </DashboardShell>
  );
}