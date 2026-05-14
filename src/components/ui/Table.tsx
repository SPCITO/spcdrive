'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';
import { useSPCTheme } from '@/providers/ThemeProvider';

interface Column<T> {
  header: string;
  render: (item: T, index: number) => ReactNode;
  align?: 'left' | 'right' | 'center';
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  emptyMessage?: string;
}

export function Table<T>({ data, columns, emptyMessage = "No records found" }: TableProps<T>) {
  const { colors } = useSPCTheme();

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-0">
        <thead>
          <tr className="text-left">
            {columns.map((col, i) => (
              <th 
                key={i} 
                className={`pb-4 text-[10px] font-black uppercase tracking-widest border-b
                  ${col.align === 'right' ? 'text-right' : ''}
                  ${col.align === 'center' ? 'text-center' : ''}
                `}
                style={{ 
                  color: colors.textMuted,
                  borderColor: colors.border 
                }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        
        <tbody className="divide-y" style={{ borderColor: colors.border }}>
          <AnimatePresence mode="popLayout">
            {data.length > 0 ? (
              data.map((item, idx) => (
                <motion.tr
                  layout
                  key={(item as any).id || idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ delay: idx * 0.03, ease: "easeOut" }}
                  className="group transition-colors"
                  // Using a very faint primary tint on hover
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `${colors.primary}05`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {columns.map((col, colIdx) => (
                    <td 
                      key={colIdx} 
                      className={`py-4 transition-colors text-sm font-medium
                        ${col.align === 'right' ? 'text-right' : ''}
                        ${col.align === 'center' ? 'text-center' : ''}
                      `}
                      style={{ color: colors.textMain }}
                    >
                      {col.render(item, idx)}
                    </td>
                  ))}
                </motion.tr>
              ))
            ) : (
              <tr>
                <td 
                  colSpan={columns.length} 
                  className="py-12 text-center text-xs font-bold uppercase tracking-widest opacity-40"
                  style={{ color: colors.textMuted }}
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
}