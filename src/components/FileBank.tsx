'use client';

import { Download, Edit2, Trash2, FileCode, FolderPlus, Plus, Tag, Layers, CheckSquare, Square, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileItem } from '@/types/dashboard';
import { Table } from '@/components/ui/Table';
import { SearchInput } from '@/components/ui/SearchInput';
import { SlidePanel } from '@/components/ui/SlidePanel';
import { useSPCTheme } from '@/providers/ThemeProvider';
import { FileEditForm } from '@/components/ui/FileEditForm';
import { useFileBank } from '@/hooks/useFileBank';

// Separated Component Imports
import { ActionButton } from '@/components/ui/ActionButton';
import { CategoryBar } from '@/components/ui/CategoryBar';
import { DocViewerModal } from '@/components/ui/DocViewerModal';

interface FileBankProps {
  role: 'admin' | 'user';
  files: FileItem[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onDownload: (file: FileItem) => void | Promise<void>;
  onDelete: (id: string) => void | Promise<void>; // 👈 Fixed: strictly expect string to match dashboard
  onUpdate: (id: string, updatedData: any) => void | Promise<void>; // 👈 Fixed: strictly expect string to match dashboard
}

export function FileBank({ role, files, searchQuery, setSearchQuery, onDownload, onDelete, onUpdate }: FileBankProps) {
  const { colors, radius } = useSPCTheme();
  const state = useFileBank({ files, searchQuery, onUpdate });

  const columns = [
    {
      header: (
        <div className="flex items-center pl-4 cursor-pointer select-none" onClick={state.toggleSelectAll}>
          {state.allVisibleAreChecked ? (
            <CheckSquare className="w-4 h-4 transition-colors" style={{ color: colors.primary }} />
          ) : (
            <Square className="w-4 h-4 opacity-40 hover:opacity-100 transition-opacity" style={{ color: colors.textMuted }} />
          )}
        </div>
      ),
      render: (file: FileItem) => (
        <div className="flex items-center pl-4 cursor-pointer h-full" onClick={() => state.toggleSelectRow(file.id)}>
          {state.selectedFileIds[file.id] ? (
            <CheckSquare className="w-4 h-4" style={{ color: colors.primary }} />
          ) : (
            <Square className="w-4 h-4 opacity-20 group-hover:opacity-60 transition-opacity" style={{ color: colors.textMuted }} />
          )}
        </div>
      )
    },
    {
      header: 'Asset Identity',
      render: (file: FileItem) => (
        <motion.div 
          layout="position"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ type: 'spring', stiffness: 500, damping: 38 }}
          draggable={role === 'admin'}
          onDragStart={(e: any) => state.handleDragStart(e, file)}
          className={`flex items-center justify-between gap-4 pr-2 py-1 group w-full relative will-change-transform ${role === 'admin' ? 'cursor-grab active:cursor-grabbing' : ''}`}
        >
          <div className="flex items-center gap-4 text-left min-w-0 grow">
            <div className="w-10 h-10 flex flex-col items-center justify-center border relative shrink-0" style={{ borderColor: colors.border, borderRadius: '0.75rem' }}>
              <span className="text-[8px] font-black opacity-40 uppercase">{file.type}</span>
              <FileCode className="w-3 h-3 opacity-20 absolute -bottom-1 -right-1 rotate-12" />
            </div>
            <div className="flex flex-col text-left min-w-0 grow">
              <span className="text-sm font-bold tracking-tight line-clamp-1 truncate" style={{ color: colors.textMain }}>{file.name}</span>
              
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[9px] font-mono opacity-40 shrink-0">UID_{file.id}</span>
                
                {role === 'admin' ? (
                  <div className="relative flex items-center gap-1 group/select shrink-0" onClick={(e) => e.stopPropagation()}>
                    <select
                      value={file.category || 'Not Categorized'}
                      onChange={(e) => onUpdate(file.id, { ...file, category: e.target.value })}
                      className="text-[9px] font-black uppercase pl-1.5 pr-5 py-0.5 tracking-tight border bg-transparent cursor-pointer appearance-none focus:outline-none transition-colors"
                      style={{ 
                        borderRadius: '4px',
                        backgroundColor: file.category === 'Not Categorized' ? `${colors.textMuted}10` : `${colors.primary}15`,
                        borderColor: file.category === 'Not Categorized' ? colors.border : `${colors.primary}30`,
                        color: file.category === 'Not Categorized' ? colors.textMuted : colors.primary
                      }}
                    >
                      <option value="Not Categorized" className="bg-neutral-900 text-white">Not Categorized</option>
                      {state.categories.map((c) => (
                        <option key={c} value={c} className="bg-neutral-900 text-white">{c}</option>
                      ))}
                    </select>
                    <Tag className="w-2.5 h-2.5 absolute right-1.5 pointer-events-none opacity-40 group-hover/select:opacity-100 transition-opacity" style={{ color: file.category === 'Not Categorized' ? colors.textMuted : colors.primary }} />
                  </div>
                ) : (
                  <span 
                    className="text-[9px] font-black uppercase px-1.5 py-0.5 tracking-tight border select-none shrink-0"
                    style={{ 
                      borderRadius: '4px',
                      backgroundColor: file.category === 'Not Categorized' ? `${colors.textMuted}10` : `${colors.primary}15`,
                      borderColor: file.category === 'Not Categorized' ? colors.border : `${colors.primary}30`,
                      color: file.category === 'Not Categorized' ? colors.textMuted : colors.primary
                    }}
                  >
                    {file.category || 'Not Categorized'}
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.div>
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
        <div className="flex justify-end gap-2 pr-4" onClick={(e) => e.stopPropagation()}>
          <ActionButton icon={<Eye size={15} />} label="View" color={colors.primary} onClick={() => state.handleOpenViewer(file)} />
          <ActionButton icon={<Download size={15} />} label="Retrieve" color={colors.textMain} onClick={() => onDownload(file)} />
          {role === 'admin' && (
            <>
              <ActionButton icon={<Edit2 size={15} />} label="Modify" color={colors.textMuted} onClick={() => state.setEditingFile(file)} />
              <ActionButton icon={<Trash2 size={15} />} label="Purge" color={colors.danger} onClick={() => onDelete(file.id)} />
            </>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-4 flex flex-col h-full">
      {/* Top Utility Control bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <div className="grow">
          <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="SCAN REPOSITORY..." />
        </div>
        
        <div className="flex gap-2 items-center">
          {state.filteredFiles.length > 0 && (
            <button
              type="button"
              disabled={state.isBulkDownloading}
              onClick={state.handleBulkDownload}
              className="flex items-center justify-center gap-2 px-4 py-2 border text-xs font-bold uppercase tracking-wider transition-colors shrink-0 disabled:opacity-50"
              style={{ borderColor: `${colors.primary}40`, borderRadius: radius.base, color: colors.primary, backgroundColor: `${colors.primary}05` }}
            >
              <Layers className={`w-4 h-4 ${state.isBulkDownloading ? 'animate-pulse' : ''}`} />
              {state.isBulkDownloading ? 'Packaging ZIP...' : `Bulk Retrieve (${state.targetsForBulkDownload.length})`}
            </button>
          )}

          {role === 'admin' && !state.isCreatingCategory && (
            <button
              type="button"
              onClick={() => state.setIsCreatingCategory(true)}
              className="flex items-center justify-center gap-2 px-4 py-2 border text-xs font-bold uppercase tracking-wider transition-colors shrink-0"
              style={{ borderColor: colors.border, borderRadius: radius.base, color: colors.textMuted, backgroundColor: colors.card }}
            >
              <FolderPlus className="w-4 h-4" style={{ color: colors.primary }} />
              New Category
            </button>
          )}
        </div>
      </div>

      {/* Creation Mode Bar */}
      {role === 'admin' && state.isCreatingCategory && (
        <form 
          onSubmit={state.handleCreateCategory} 
          className="flex gap-2 items-center p-2 border animate-in slide-in-from-top-2 duration-200 shrink-0" 
          style={{ backgroundColor: colors.card, borderColor: colors.border, borderRadius: radius.base }}
        >
          <input
            type="text"
            required
            autoFocus
            placeholder="NAME NEW CATEGORY (E.G., HR, LEGAL, TECH)..."
            value={state.newCategoryName}
            onChange={(e) => state.setNewCategoryName(e.target.value)}
            className="grow bg-transparent border-none text-xs font-bold font-mono tracking-wide uppercase focus:outline-none focus:ring-0 px-2"
            style={{ color: colors.textMain }}
          />
          <div className="flex gap-1.5 shrink-0">
            <button
              type="submit"
              className="px-3 py-1.5 text-[10px] font-black uppercase text-white tracking-widest flex items-center gap-1 transition-transform active:scale-95"
              style={{ backgroundColor: colors.primary, borderRadius: radius.base }}
            >
              <Plus className="w-3 h-3" /> Save
            </button>
            <button
              type="button"
              onClick={() => { state.setIsCreatingCategory(false); state.setNewCategoryName(''); }}
              className="px-3 py-1.5 text-[10px] font-black uppercase border tracking-widest transition-colors"
              style={{ borderColor: colors.border, color: colors.textMuted, borderRadius: radius.base }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Extracted Category Toolbar Bar Component */}
      <CategoryBar
        role={role}
        categories={state.categories}
        activeFilterCategory={state.activeFilterCategory}
        dragOverCategory={state.dragOverCategory}
        changeFilterCategory={state.changeFilterCategory}
        setDragOverCategory={state.setDragOverCategory}
        handleFolderDrop={state.handleFolderDrop}
      />
      
      {/* Table Container Wrapper Viewport */}
      <div className="grow overflow-y-auto max-h-105 pr-2 custom-scrollbar relative">
        <AnimatePresence mode="popLayout" initial={false}>
          <Table data={state.filteredFiles} columns={columns} />
        </AnimatePresence>
      </div>

      {/* Right Drawer Slide out */}
      <SlidePanel isOpen={!!state.editingFile} onClose={() => state.setEditingFile(null)} title="Asset Modification">
        <FileEditForm file={state.editingFile} onSave={(updated) => { onUpdate(updated.id, updated); state.setEditingFile(null); }} />
      </SlidePanel>

      {/* Extracted Portaled Document Viewer Overlay Modal Component */}
      <DocViewerModal
        previewFile={state.previewFile}
        previewUrl={state.previewUrl}
        isPreviewLoading={state.isPreviewLoading}
        isOfficeDoc={state.isOfficeDoc}
        fileExtension={state.fileExtension}
        textPreviewContent={state.textPreviewContent}
        onClose={state.handleCloseViewer}
        onDownload={onDownload}
      />
    </div>
  );
}