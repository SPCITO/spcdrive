'use client';
import { UserCircle, ShieldCheck, UserMinus, Edit3, Check, User as UserIcon } from 'lucide-react';
import { useSPCTheme } from '@/providers/ThemeProvider';
import { BentoCard } from '@/components/ui/BentoCard';
import { Table } from '@/components/ui/Table';
import { SlidePanel } from '@/components/ui/SlidePanel';
import { UserManagementData } from '@/types/dashboard';

interface UserManagementProps {
  users: UserManagementData[];
  isEditing: boolean;
  selectedUser: UserManagementData | null;
  onApprove: (id: string) => void;
  onToggleStatus: (id: string) => void;
  onEdit: (user: UserManagementData) => void;
  onCloseEdit: () => void;
}

export function UserManagement({ 
  users, isEditing, selectedUser, onApprove, onToggleStatus, onEdit, onCloseEdit 
}: UserManagementProps) {
  const { colors, radius } = useSPCTheme();

  const columns = [
    {
      header: 'Identity',
      render: (u: UserManagementData) => (
        <div className="flex items-center gap-3 pl-4">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors border"
            style={{ 
              backgroundColor: colors.background, 
              borderColor: colors.border,
              color: colors.textMuted 
            }}
          >
            <UserCircle className="w-6 h-6 group-hover:text--primary transition-colors" style={{ color: 'inherit' }} />
          </div>
          <div>
            <p className="text-sm font-bold" style={{ color: colors.textMain }}>{u.name}</p>
            <p className="text-[11px] font-medium" style={{ color: colors.textMuted }}>{u.email}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Permissions',
      render: (u: UserManagementData) => {
        const isAdmin = u.role === 'admin';
        return (
          <span 
            className="px-2 py-1 rounded text-[9px] font-black uppercase tracking-wider border"
            style={{ 
              backgroundColor: isAdmin ? `${colors.primary}10` : colors.background,
              color: isAdmin ? colors.primary : colors.textMuted,
              borderColor: isAdmin ? `${colors.primary}20` : colors.border
            }}
          >
            {u.role}
          </span>
        );
      }
    },
    {
      header: 'Status',
      render: (u: UserManagementData) => {
        const statusColors = {
          active: colors.primary,
          pending: '#f59e0b', // Amber remains for warning/pending
          disabled: colors.textMuted
        };
        return (
          <div className="flex items-center gap-2">
            <div 
              className={`w-1.5 h-1.5 rounded-full ${u.status === 'active' ? 'animate-pulse' : ''}`} 
              style={{ backgroundColor: statusColors[u.status] || colors.textMuted }} 
            />
            <span className="text-[11px] font-bold uppercase tracking-tight" style={{ color: colors.textMain }}>
              {u.status}
            </span>
          </div>
        );
      }
    },
    {
      header: 'Protocols',
      align: 'right' as const,
      render: (u: UserManagementData) => (
        <div className="flex justify-end gap-1 pr-4">
          {u.status === 'pending' && (
            <button 
              onClick={() => onApprove(u.id)} 
              className="p-2 transition-all hover:scale-110"
              style={{ color: colors.primary }}
            >
              <ShieldCheck className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={() => onEdit(u)} 
            className="p-2 transition-all hover:scale-110"
            style={{ color: colors.textMuted }}
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button 
            onClick={() => onToggleStatus(u.id)} 
            className="p-2 transition-all hover:scale-110"
            style={{ color: u.status === 'disabled' ? colors.primary : colors.danger }}
          >
            {u.status === 'disabled' ? <Check className="w-4 h-4" /> : <UserMinus className="w-4 h-4" />}
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="md:col-span-6 relative">
      <BentoCard title="Operative Directory">
        <Table data={users} columns={columns} />
      </BentoCard>

      <SlidePanel 
        isOpen={isEditing} 
        onClose={onCloseEdit} 
        title="Edit Identity" 
        subtitle="UPDATE_AGENT_CREDENTIALS"
      >
        <div className="space-y-6 pt-4">
          <div className="relative">
            <UserIcon 
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" 
              style={{ color: colors.textMuted }} 
            />
            <input 
              type="text" 
              defaultValue={selectedUser?.name} 
              className="w-full pl-11 pr-4 py-4 outline-none transition-all font-bold text-sm border" 
              style={{ 
                backgroundColor: colors.background,
                borderColor: colors.border,
                borderRadius: radius.base,
                color: colors.textMain
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = colors.primary}
              onBlur={(e) => e.currentTarget.style.borderColor = colors.border}
            />
          </div>
          
          <button 
            onClick={onCloseEdit} 
            className="w-full py-4 text-white font-black uppercase tracking-widest shadow-lg active:scale-95 hover:brightness-110 transition-all"
            style={{ 
              backgroundColor: colors.primary,
              borderRadius: radius.base 
            }}
          >
            Commit Changes
          </button>
        </div>
      </SlidePanel>
    </div>
  );
}