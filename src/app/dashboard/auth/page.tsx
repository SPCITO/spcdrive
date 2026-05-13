'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AuthCard } from '@/components/AuthCard';
import { useAuthForm } from '@/hooks/useAuthForm';

export default function AuthPage() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const form = useAuthForm();

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
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" />
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
        <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">
          Secure Access Protocol Active
        </span>
      </div>
    </main>
  );
}