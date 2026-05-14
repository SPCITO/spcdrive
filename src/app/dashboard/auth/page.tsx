'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AuthCard } from '@/components/AuthCard';
import { useAuthForm } from '@/hooks/useAuthForm';
import { useSPCTheme } from '@/providers/ThemeProvider';

export default function AuthPage() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const form = useAuthForm();
  const theme = useSPCTheme();

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <main 
      className="relative min-h-screen flex items-center justify-center px-6 font-sans overflow-hidden"
      onKeyDown={form.handleKeyDown}
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image 
          src="/assets/green.png" 
          alt="Background" 
          fill 
          priority 
          className="object-cover scale-105" 
        />
        <div 
          className="absolute inset-0 backdrop-blur-[2px]"
          style={{ backgroundColor: `rgba(${parseInt(theme.colors.textMain.slice(1, 3), 16)}, ${parseInt(theme.colors.textMain.slice(3, 5), 16)}, ${parseInt(theme.colors.textMain.slice(5, 7), 16)}, 0.1)` }}
        />
      </div>

      {/* Auth Card Content */}
      <div className={`w-full flex justify-center transition-all duration-1000 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <AuthCard
          isLogin={form.isLogin}
          email={form.email}
          setEmail={form.setEmail}
          password={form.password}
          setPassword={form.setPassword}
          loading={form.loading}
          error={form.error}
          switching={form.switching}
          onAuth={form.handleAuth}
          onToggle={form.toggleMode}
          onKeyDown={form.handleKeyDown}
        />
      </div>
      
      {/* Footer Branding */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-40">
        <div 
          className="w-1.5 h-1.5 rounded-full animate-pulse"
          style={{ backgroundColor: theme.colors.card }}
        />
        <span 
          className="text-[10px] font-black uppercase tracking-[0.4em]"
          style={{ color: theme.colors.card }}
        >
          Secure Access Protocol Active
        </span>
      </div>
    </main>
  );
}