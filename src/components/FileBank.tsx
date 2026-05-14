'use client';
import { Download, Edit2, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { FileItem } from '@/types/dashboard';
import { Table } from '@/components/ui/Table';
import { SearchInput } from '@/components/ui/SearchInput';
import { useSPCTheme } from '@/providers/ThemeProvider';

interface FileBankProps {
  role: 'admin' | 'user';
  files: FileItem[];
  searchQuery: string;
  setSearchQuery: (val: string) => void;
}

export function FileBank({ role, files, searchQuery, setSearchQuery }: FileBankProps) {
  const { colors, radius } = useSPCTheme();

  const columns = [
    {
      header: 'File Name',
      render: (file: FileItem) => (
        <div className="flex items-center gap-3 pl-4">
          {/* File Icon Box - Now reacts to theme primary on group hover */}
          <div 
            className="w-8 h-8 flex items-center justify-center font-bold text-[9px] border transition-all duration-300"
            style={{ 
              backgroundColor: `${colors.background}80`,
              borderColor: colors.border,
              borderRadius: '0.5rem', // Slightly tighter radius for small boxes
              color: colors.textMuted
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = colors.primary;
              e.currentTarget.style.color = colors.primary;
              e.currentTarget.style.backgroundColor = `${colors.primary}08`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = colors.border;
              e.currentTarget.style.color = colors.textMuted;
              e.currentTarget.style.backgroundColor = `${colors.background}80`;
            }}
          >
            {file.type}
          </div>
          <span className="text-sm font-bold tracking-tight" style={{ color: colors.textMain }}>
            {file.name}
          </span>
        </div>
      )
    },
    {
      header: 'Size',
      render: (file: FileItem) => (
        <span className="text-xs font-mono" style={{ color: colors.textMuted }}>
          {file.size}
        </span>
      )
    },
    {
      header: 'Status',
      render: () => (
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span 
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ backgroundColor: colors.primary }}
            ></span>
            <span 
              className="relative inline-flex rounded-full h-2 w-2"
              style={{ backgroundColor: colors.primary }}
            ></span>
          </span>
          <span 
            className="text-[9px] font-black uppercase tracking-widest"
            style={{ color: colors.primary }}
          >
            Secure
          </span>
        </div>
      )
    },
    {
      header: 'Actions',
      align: 'right' as const,
      render: (file: FileItem) => (
        <div className="flex justify-end gap-1 pr-4">
          {/* Download Action */}
          <motion.button 
            whileHover={{ scale: 1.1 }} 
            whileTap={{ scale: 0.9 }} 
            className="p-2 transition-colors"
            style={{ color: colors.primary, borderRadius: radius.base }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${colors.primary}08`}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <Download className="w-4 h-4" />
          </motion.button>
          
          {role === 'admin' && (
            <>
              {/* Edit Action */}
              <motion.button 
                whileHover={{ scale: 1.1 }} 
                whileTap={{ scale: 0.9 }} 
                className="p-2 transition-colors"
                style={{ color: colors.textMuted, borderRadius: radius.base }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${colors.border}50`}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <Edit2 className="w-4 h-4" />
              </motion.button>

              {/* Delete Action - Linked to colors.danger */}
              <motion.button 
                whileHover={{ scale: 1.1, color: colors.danger }} 
                whileTap={{ scale: 0.9 }} 
                className="p-2 transition-colors"
                style={{ color: colors.textMuted, borderRadius: radius.base }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${colors.danger}10`}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
            </>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <SearchInput 
          value={searchQuery} 
          onChange={setSearchQuery} 
          placeholder="SEARCH REPOSITORY..." 
          className="max-w-md w-full"
        />
        <p className="text-[10px] font-black uppercase tracking-widest opacity-40 pr-2">
          {files.length} ASSETS DETECTED
        </p>
      </div>
      
      <Table 
        data={files} 
        columns={columns} 
        emptyMessage={`No files matching "${searchQuery}"`}
      />
    </div>
  );
}