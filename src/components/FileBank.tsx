'use client';
import { useState } from 'react';
import { Download, Edit2, Trash2, FileCode } from 'lucide-react';
import { motion } from 'framer-motion';
import { FileItem } from '@/types/dashboard';
import { Table } from '@/components/ui/Table';
import { SearchInput } from '@/components/ui/SearchInput';
import { SlidePanel } from '@/components/ui/SlidePanel';
import { useSPCTheme } from '@/providers/ThemeProvider';
import { FileEditForm } from '@/components/ui/FileEditForm';

// Internal Action Button Component
function ActionButton({ icon, label, color, onClick }: { icon: any, label: string, color: string, onClick: () => void }) {
  const { colors, radius } = useSPCTheme();
  return (
    <motion.button
      whileHover="hover" whileTap={{ scale: 0.95 }} onClick={onClick}
      className="relative flex items-center gap-2 px-3 py-2 transition-all border group overflow-hidden"
      style={{ borderRadius: radius.base, borderColor: `${color}20`, backgroundColor: colors.background }}
    >
      <motion.div variants={{ hover: { x: 0 } }} initial={{ x: '-105%' }} className="absolute inset-0 z-0 opacity-10" style={{ backgroundColor: color }} />
      <span className="relative z-10" style={{ color: color }}>{icon}</span>
      <span className="text-[9px] font-black uppercase tracking-tighter relative z-10 hidden lg:block overflow-hidden" style={{ color: color }}>
        <motion.div variants={{ hover: { y: 0 } }} initial={{ y: 20 }}>{label}</motion.div>
      </span>
    </motion.button>
  );
}

export function FileBank({ role, files, searchQuery, setSearchQuery, onDownload, onDelete, onUpdate }: any) {
  const { colors } = useSPCTheme();
  const [editingFile, setEditingFile] = useState<FileItem | null>(null);

  const columns = [
    {
      header: 'Asset Identity',
      render: (file: FileItem) => (
        <div className="flex items-center gap-4 pl-4 group">
          <div className="w-10 h-10 flex flex-col items-center justify-center border relative" style={{ borderColor: colors.border, borderRadius: '0.75rem' }}>
            <span className="text-[8px] font-black opacity-40 uppercase">{file.type}</span>
            <FileCode className="w-3 h-3 opacity-20 absolute -bottom-1 -right-1 rotate-12" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight" style={{ color: colors.textMain }}>{file.name}</span>
            <span className="text-[9px] font-mono opacity-40">UID_{file.id}</span>
          </div>
        </div>
      )
    },
    {
        header: 'Payload',
        render: (file: FileItem) => <span className="text-xs font-mono font-bold" style={{ color: colors.textMuted }}>{file.size}</span>
    },
    {
      header: 'Actions',
      align: 'right' as const,
      render: (file: FileItem) => (
        <div className="flex justify-end gap-2 pr-4">
          <ActionButton icon={<Download size={15} />} label="Retrieve" color={colors.primary} onClick={() => onDownload(file)} />
          {role === 'admin' && (
            <>
              <ActionButton icon={<Edit2 size={15} />} label="Modify" color={colors.textMuted} onClick={() => setEditingFile(file)} />
              <ActionButton icon={<Trash2 size={15} />} label="Purge" color={colors.danger} onClick={() => onDelete(file.id)} />
            </>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="SCAN REPOSITORY..." />
      <Table data={files} columns={columns} />
      <SlidePanel isOpen={!!editingFile} onClose={() => setEditingFile(null)} title="Asset Modification">
        <FileEditForm file={editingFile} onSave={(updated) => { onUpdate(updated.id, updated); setEditingFile(null); }} />
      </SlidePanel>
    </div>
  );
}