'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SPCUser, UserRole } from '@/types/auth';
import { MOCK_USERS } from '@/lib/mock-data';

const STORAGE_KEY = 'spc_user_session';

export function useMockAuth() {
  const [user, setUser] = useState<SPCUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem(STORAGE_KEY);
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    // Artificial delay for that "Hacker" feel
    await new Promise((res) => setTimeout(res, 1500));

    // Find the user in our central mock database
    const foundUser = MOCK_USERS.find((u) => u.email === email);

    // Verify user existence and password
    if (!foundUser || foundUser.password !== password) {
      setError("SECURITY BREACH: INVALID CREDENTIALS.");
      setLoading(false);
      return;
    }

    const sessionUser: SPCUser = {
      id: foundUser.id,
      email: foundUser.email,
      name: foundUser.name,
      role: foundUser.role as UserRole,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionUser));
    setUser(sessionUser);
    setLoading(false);

    // Redirect based on the actual role found in mock-data
    router.push(sessionUser.role === 'admin' ? '/dashboard' : '/dashboard/user');
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
    router.push('/dashboard/auth');
  };

  return { user, loading, error, login, logout };
}