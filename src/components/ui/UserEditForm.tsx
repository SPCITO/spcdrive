'use client';

import { useState, useEffect } from 'react';
import { User as UserIcon, Lock, Mail } from 'lucide-react';
import { useSPCTheme } from '@/providers/ThemeProvider';
import { MockUser } from '@/lib/mock-data';

interface UserEditFormProps {
  user: MockUser | null;
  onSave: (updatedUser: MockUser) => void;
}

export function UserEditForm({ user, onSave }: UserEditFormProps) {
  const { colors, radius } = useSPCTheme();
  const [formData, setFormData] = useState<MockUser | null>(null);

  useEffect(() => {
    if (user) setFormData({ ...user });
  }, [user]);

  if (!formData) return null;

  return (
    <div className="space-y-5 pt-6">
      {/* Name Field */}
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest opacity-40 px-1">Full Name</label>
        <div className="relative">
          <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: colors.textMuted }} />
          <input 
            type="text" 
            value={formData.name} 
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full pl-11 pr-4 py-4 outline-none font-bold text-sm border transition-all" 
            style={{ 
              backgroundColor: colors.background, 
              borderColor: colors.border, 
              borderRadius: radius.base, 
              color: colors.textMain 
            }}
          />
        </div>
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest opacity-40 px-1">Access Key (Password)</label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: colors.textMuted }} />
          <input 
            type="text" 
            value={formData.password || ''} 
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full pl-11 pr-4 py-4 outline-none font-mono text-sm border tracking-widest transition-all" 
            style={{ 
              backgroundColor: colors.background, 
              borderColor: colors.border, 
              borderRadius: radius.base, 
              color: colors.primary 
            }}
          />
        </div>
      </div>

      <button 
        onClick={() => onSave(formData)} 
        className="w-full py-4 text-white font-black uppercase tracking-widest shadow-lg active:scale-95 hover:brightness-110 transition-all mt-4"
        style={{ backgroundColor: colors.primary, borderRadius: radius.base }}
      >
        Commit Changes
      </button>
    </div>
  );
}