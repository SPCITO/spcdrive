'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';
import { useSPCTheme } from '@/providers/ThemeProvider';

interface Column<T> {
  header: React.ReactNode;
  render: (item: T, index: number) => ReactNode;
  align?: 'left' | 'right' | 'center';
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  emptyMessage?: string;
}

export function Table<T>({ data, columns, emptyMessage = 'No records found' }: TableProps<T>) {
  const { colors } = useSPCTheme();

  const alignClass = (align?: 'left' | 'right' | 'center') => {
    if (align === 'right') return 'text-right';
    if (align === 'center') return 'text-center';
    return 'text-left';
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-0">
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th
                key={i}
                className={`pb-4 text-[10px] font-black uppercase tracking-widest border-b ${alignClass(col.align)}`}
                style={{ color: colors.textMuted, borderColor: colors.border }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          <AnimatePresence mode="popLayout" initial={false}>
            {data.length > 0 ? (
              data.map((item, idx) => (
                <motion.tr
                  // motion.tr is valid — Framer Motion does NOT wrap in a div,
                  // it applies transforms directly to the element via style.
                  key={(item as any).id ?? idx}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ delay: idx * 0.03, ease: 'easeOut', duration: 0.15 }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `${colors.primary}08`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                  style={{ transition: 'background-color 0.15s' }}
                >
                  {columns.map((col, colIdx) => (
                    <td
                      key={colIdx}
                      className={`py-4 text-sm font-medium ${alignClass(col.align)}`}
                      style={{
                        color: colors.textMain,
                        // Row divider applied per-cell so it survives AnimatePresence
                        borderBottom: `1px solid ${colors.border}`,
                      }}
                    >
                      {col.render(item, idx)}
                    </td>
                  ))}
                </motion.tr>
              ))
            ) : (
              <tr key="empty">
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