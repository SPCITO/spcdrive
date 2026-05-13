'use client';
import { UserCircle, ShieldCheck, UserMinus, Edit3, Check, X, User } from 'lucide-react';
import { useSPCTheme } from '@/providers/ThemeProvider';
import { BentoCard } from './BentoCard';
import { motion, AnimatePresence } from 'framer-motion';
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
  users, 
  isEditing, 
  selectedUser, 
  onApprove, 
  onToggleStatus, 
  onEdit, 
  onCloseEdit 
}: UserManagementProps) {
  const { colors } = useSPCTheme();

  return (
    <div className="md:col-span-6 relative">
      <BentoCard title="User Directory">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                <th className="pb-4">Identity</th>
                <th className="pb-4">Permissions</th>
                <th className="pb-4">Status</th>
                <th className="pb-4 text-right">Protocols</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {users.map((u, idx) => (
                <motion.tr key={u.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.05 }} className="group">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-emerald-500 transition-colors">
                        <UserCircle />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{u.name}</p>
                        <p className="text-xs text-slate-400">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase ${u.role === 'admin' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${u.status === 'active' ? 'bg-emerald-500' : u.status === 'pending' ? 'bg-amber-500' : 'bg-slate-300'}`} />
                      <span className="text-xs capitalize">{u.status}</span>
                    </div>
                  </td>
                  <td className="py-4 text-right">
                    <div className="flex justify-end gap-2">
                      {u.status === 'pending' && (
                        <button onClick={() => onApprove(u.id)} className="p-2 hover:bg-emerald-50 text-emerald-600 rounded-lg transition-all">
                          <ShieldCheck className="w-4 h-4" />
                        </button>
                      )}
                      <button onClick={() => onEdit(u)} className="p-2 hover:bg-slate-50 text-slate-400 rounded-lg transition-all">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => onToggleStatus(u.id)} 
                        className={`p-2 rounded-lg transition-all ${u.status === 'disabled' ? 'hover:bg-emerald-50 text-emerald-600' : 'hover:bg-red-50 text-red-400'}`}
                      >
                        {u.status === 'disabled' ? <Check className="w-4 h-4" /> : <UserMinus className="w-4 h-4" />}
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </BentoCard>

      <AnimatePresence>
        {isEditing && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onCloseEdit} className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[110]" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[120] p-8 border-l">
              <div className="flex justify-between mb-10">
                <div>
                  <h3 className="text-xl font-black">Edit Identity</h3>
                  <p className="text-[10px] text-emerald-600/40 font-bold uppercase">Protocol: Update_User_V2</p>
                </div>
                <button onClick={onCloseEdit}><X className="w-5 h-5 text-slate-400" /></button>
              </div>
              <div className="space-y-6">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                  <input type="text" defaultValue={selectedUser?.name} className="w-full pl-11 pr-4 py-3 bg-slate-50 rounded-2xl" />
                </div>
                <button onClick={onCloseEdit} style={{ backgroundColor: colors.primary }} className="w-full py-4 text-white rounded-2xl font-bold shadow-lg active:scale-95">
                  Commit Changes
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}