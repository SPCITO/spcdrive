'use client';
import { User, FileText, Globe, Clock } from 'lucide-react';
import { BentoCard } from '@/components/ui/BentoCard';
import { Table } from '@/components/ui/Table';
import { DownloadLog } from '@/types/dashboard';
import { useSPCTheme } from '@/providers/ThemeProvider';

interface DownloadHistoryProps {
  logs: DownloadLog[];
}

export function DownloadHistory({ logs }: DownloadHistoryProps) {
  const { colors } = useSPCTheme();

  const columns = [
    {
      header: 'Agent',
      render: (log: DownloadLog) => (
        <div className="flex items-center gap-2">
          <User className="w-3.5 h-3.5" style={{ color: colors.primary }} />
          <span className="text-sm font-bold" style={{ color: colors.textMain }}>
            {log.user}
          </span>
        </div>
      )
    },
    {
      header: 'Asset Retrieved',
      render: (log: DownloadLog) => (
        <div className="flex items-center gap-2">
          <FileText className="w-3.5 h-3.5" style={{ color: colors.textMuted }} />
          <span className="text-xs font-medium" style={{ color: colors.textMain }}>
            {log.file}
          </span>
        </div>
      )
    },
    {
      header: 'Network ID',
      render: (log: DownloadLog) => (
        <div className="flex items-center gap-2">
          <Globe className="w-3.5 h-3.5 opacity-40" style={{ color: colors.textMuted }} />
          <code 
            className="text-[10px] px-1.5 py-0.5 rounded font-mono border"
            style={{ 
              backgroundColor: colors.background, 
              color: colors.textMuted,
              borderColor: colors.border
            }}
          >
            {log.ip}
          </code>
        </div>
      )
    },
    {
      header: 'Timestamp',
      render: (log: DownloadLog) => (
        <div className="flex items-center justify-end gap-2 opacity-60" style={{ color: colors.textMuted }}>
          <Clock className="w-3 h-3" />
          <span className="text-[10px] font-bold tabular-nums uppercase">
            {log.timestamp}
          </span>
        </div>
      )
    }
  ];

  return (
    <BentoCard title="Download Documentation" className="md:col-span-6">
      <Table data={logs} columns={columns} />
      
      {/* Specific Domain Footer */}
      <div 
        className="mt-6 pt-6 border-t flex items-center justify-between"
        style={{ borderColor: colors.border }}
      >
        <p 
          className="text-[9px] font-black uppercase tracking-widest"
          style={{ color: `${colors.primary}66` }} // 40% primary green
        >
          Autosave: Documentation_Protocol_v4.log
        </p>
        
        <div className="flex items-center gap-2">
          {/* Live Status Indicator */}
          <div 
            className="w-2 h-2 rounded-full animate-pulse" 
            style={{ 
              backgroundColor: colors.primary,
              boxShadow: `0 0 8px ${colors.primary}` 
            }} 
          />
          <span 
            className="text-[9px] font-bold uppercase tracking-tighter"
            style={{ color: colors.textMuted }}
          >
            Live Audit Active
          </span>
        </div>
      </div>
    </BentoCard>
  );
}