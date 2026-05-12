'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { AuthCardProps } from '@/types/auth';

export function AuthCard({
  isLogin,
  email,
  setEmail,
  password,
  setPassword,
  loading,
  error,
  switching,
  onAuth,
  onToggle,
  onKeyDown
}: AuthCardProps) {
  return (
    <div className="w-full max-w-md">
      {/* Brand Header */}
      <div className="flex justify-center mb-10">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-11 h-11 rounded-2xl bg-white/20 border border-white/20 shadow-lg overflow-hidden transition-transform group-hover:scale-105">
            <Image 
              src="/assets/SPCLOGO.avif" 
              alt="Logo" 
              fill 
              className="object-contain p-2" 
            />
          </div>
          <span className="font-black text-xl tracking-tight text-white drop-shadow">
            SPC <span className="text-emerald-300">Drive</span>
          </span>
        </Link>
      </div>

      {/* Main Card */}
      <div 
        className={`
          bg-white/15 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-10 shadow-2xl 
          transition-all duration-300 ease-out
          ${switching ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100'}
        `}
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-white tracking-tight">
            {isLogin ? 'Welcome back' : 'Join SPC Drive'}
          </h1>
          <p className="text-sm text-white/70 mt-2">
            {isLogin ? 'Sign in to workspace' : 'Create workspace'}
          </p>
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-xl py-2 px-4 mt-4">
              <p className="text-red-200 text-xs font-bold">{error}</p>
            </div>
          )}
        </div>

        <div className="space-y-5">
          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] ml-1">
              Identity
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                onKeyDown={onKeyDown}
                placeholder="you@spc.drive" 
                className="w-full pl-11 pr-4 py-4 rounded-2xl border border-white/10 bg-white text-slate-900 focus:outline-none focus:ring-4 focus:ring-emerald-400/20 transition-all placeholder:text-slate-400 font-medium" 
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] ml-1">
              Security Key
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                onKeyDown={onKeyDown}
                placeholder="••••••••" 
                className="w-full pl-11 pr-4 py-4 rounded-2xl border border-white/10 bg-white text-slate-900 focus:outline-none focus:ring-4 focus:ring-emerald-400/20 transition-all placeholder:text-slate-400 font-medium" 
              />
            </div>
          </div>

          {/* Action Button */}
          <button 
            onClick={onAuth} 
            disabled={loading} 
            className="w-full flex items-center justify-center gap-2 bg-emerald-500 text-white font-black py-4 rounded-2xl hover:bg-emerald-400 shadow-lg shadow-emerald-900/20 transition-all active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                {isLogin ? 'ACCESS SYSTEM' : 'INITIALIZE ACCOUNT'}
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>

        {/* Footer Toggle */}
        <div className="mt-8 text-center">
          <button 
            onClick={onToggle} 
            className="text-xs font-black text-white/40 hover:text-emerald-300 uppercase tracking-widest transition-colors"
          >
            {isLogin ? "Generate new credentials?" : "Existing operative? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}