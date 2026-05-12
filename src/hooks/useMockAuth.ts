'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SPCUser, UserRole } from '@/types/auth';

// We store the user in localStorage so the session persists on refresh
const STORAGE_KEY = 'spc_user_session';

export function useMockAuth() {
  const [user, setUser] = useState<SPCUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // 1. Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem(STORAGE_KEY);
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // 2. Mock Login Function
  const login = async (role: UserRole, password: string) => {
    setLoading(true);
    setError(null);

    // Artificial delay to simulate network
    await new Promise((res) => setTimeout(res, 1500));

    // Simple mock validation
    if (password.length < 4) {
      setError("SECURITY KEY TOO SHORT. ACCESS DENIED.");
      setLoading(false);
      return;
    }

    const mockUser: SPCUser = {
      id: Math.random().toString(36).substring(7),
      email: role === 'admin' ? 'jason@test' : 'user@spc.drive',
      name: role === 'admin' ? 'Jason (Admin)' : 'Standard Operative',
      role: role,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser));
    setUser(mockUser);
    setLoading(false);

    // Redirect based on role
    router.push(role === 'admin' ? '/dashboard/' : '/dashboard/user');
  };

  // 3. Logout Function
  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
    router.push('/dashboard/auth');
  };

  return {
    user,
    loading,
    error,
    login,
    logout
  };
}