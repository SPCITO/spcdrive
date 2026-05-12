'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useMockAuth } from '@/hooks/useMockAuth';
import { AuthCard } from '@/components/AuthCard';
import { UserRole } from '@/types/auth';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [switching, setSwitching] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);

  const { login, loading, error } = useMockAuth();

  useEffect(() => {
    setLoaded(true);
  }, []);

  const getRoleFromEmail = (emailStr: string): UserRole => {
    return emailStr.includes('admin') || emailStr === 'jason@test' ? 'admin' : 'user';
  };

  const handleAuth = async (): Promise<void> => {
    if (!email || !password) return;
    const role = getRoleFromEmail(email);
    await login(role, password);
  };

  // Fixed: Removed <HTMLDivElement> to align with AuthCardProps
  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter' && !loading) {
      handleAuth();
    }
  };

  const toggleMode = (): void => {
    setSwitching(true);
    setTimeout(() => {
      setIsLogin((p) => !p);
      setSwitching(false);
    }, 200); 
  };

  return (
    <main 
      className="relative min-h-screen flex items-center justify-center px-6 font-sans overflow-hidden"
      onKeyDown={handleKeyDown}
    >
      <div className="absolute inset-0 -z-10">
        <Image 
          src="/assets/green.png" 
          alt="System Background" 
          fill 
          priority 
          className="object-cover scale-105" 
        />
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" />
      </div>

      <div 
        className={`
          w-full flex justify-center transition-all duration-1000 ease-out
          ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
        `}
      >
        <AuthCard
          isLogin={isLogin}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          loading={loading}
          error={error}
          switching={switching}
          onAuth={handleAuth}
          onToggle={toggleMode}
          onKeyDown={handleKeyDown}
        />
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-40">
        <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">
          Secure Access Protocol Active
        </span>
      </div>
    </main>
  );
}