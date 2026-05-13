'use client';

import { useState } from 'react';
import { useMockAuth } from './useMockAuth';

export function useAuthForm() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [switching, setSwitching] = useState<boolean>(false);

  const { login, loading, error } = useMockAuth();

  const handleAuth = async (): Promise<void> => {
    if (!email || !password) return;
    // Pass email and password directly to the mock auth handler
    await login(email, password);
  };

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

  return {
    isLogin, email, setEmail, password, setPassword,
    switching, loading, error, handleAuth, toggleMode, handleKeyDown
  };
}