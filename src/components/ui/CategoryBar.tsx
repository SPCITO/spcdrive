'use client';

import { Folder } from 'lucide-react';
import { useSPCTheme } from '@/providers/ThemeProvider';

interface CategoryBarProps {
  role: string;
  categories: string[];
  activeFilterCategory: string;
  dragOverCategory: string | null;
  changeFilterCategory: (category: string) => void;
  setDragOverCategory: (category: string | null) => void;
  handleFolderDrop: (e: React.DragEvent, category: string) => void;
}

export function CategoryBar({
  role,
  categories,
  activeFilterCategory,
  dragOverCategory,
  changeFilterCategory,
  setDragOverCategory,
  handleFolderDrop
}: CategoryBarProps) {
  const { colors, radius } = useSPCTheme();

  return (
    <div className="flex gap-2 overflow-x-auto pb-1.5 pt-0.5 custom-scrollbar shrink-0 select-none">
      <button
        type="button"
        onClick={() => changeFilterCategory('ALL_ASSETS')}
        onDragOver={(e) => { e.preventDefault(); role === 'admin' && setDragOverCategory('ALL_ASSETS'); }}
        onDragLeave={() => setDragOverCategory(null)}
        onDrop={(e) => handleFolderDrop(e, 'Not Categorized')}
        className="flex items-center gap-1.5 px-3 py-2 border text-[10px] font-black uppercase tracking-wider transition-all duration-200 shrink-0"
        style={{
          borderRadius: radius.base,
          backgroundColor: activeFilterCategory === 'ALL_ASSETS' || dragOverCategory === 'ALL_ASSETS' ? `${colors.primary}15` : colors.card,
          borderColor: activeFilterCategory === 'ALL_ASSETS' || dragOverCategory === 'ALL_ASSETS' ? colors.primary : colors.border,
          color: activeFilterCategory === 'ALL_ASSETS' || dragOverCategory === 'ALL_ASSETS' ? colors.primary : colors.textMuted,
          boxShadow: activeFilterCategory === 'ALL_ASSETS' ? `0 2px 10px ${colors.primary}10` : 'none',
          transform: dragOverCategory === 'ALL_ASSETS' ? 'scale(1.05)' : 'none'
        }}
      >
        <Folder className="w-3.5 h-3.5" />
        All Assets
      </button>

      {categories.map((cat) => {
        const isSelected = activeFilterCategory.toLowerCase() === cat.toLowerCase();
        const isHoveredDrag = dragOverCategory === cat;
        return (
          <button
            key={`filter-${cat}`}
            type="button"
            onClick={() => changeFilterCategory(cat)}
            onDragOver={(e) => { e.preventDefault(); role === 'admin' && setDragOverCategory(cat); }}
            onDragLeave={() => setDragOverCategory(null)}
            onDrop={(e) => handleFolderDrop(e, cat)}
            className="flex items-center gap-1.5 px-3 py-2 border text-[10px] font-black uppercase tracking-wider transition-all duration-200 shrink-0"
            style={{
              borderRadius: radius.base,
              backgroundColor: isSelected || isHoveredDrag ? `${colors.primary}15` : colors.card,
              borderColor: isSelected || isHoveredDrag ? colors.primary : colors.border,
              color: isSelected || isHoveredDrag ? colors.primary : colors.textMuted,
              boxShadow: isSelected ? `0 2px 10px ${colors.primary}10` : 'none',
              transform: isHoveredDrag ? 'scale(1.05)' : 'none'
            }}
          >
            <Folder className="w-3.5 h-3.5" style={{ color: isSelected || isHoveredDrag ? colors.primary : colors.textMuted }} />
            {cat}
          </button>
        );
      })}
    </div>
  );
}