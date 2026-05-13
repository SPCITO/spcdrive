'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMockAuth } from './useMockAuth';
import { FileItem } from '@/types/dashboard';
import { MOCK_FILES } from '@/lib/mock-data'; // Use the mock-data file we discussed!

export function useUserDashboard() {
  const { user, logout, loading } = useMockAuth();
  const router = useRouter();
  
  // Use a piece of state for files in case we want to add search/filter logic later
  const [files] = useState<FileItem[]>(MOCK_FILES);

  // Auth Guard Logic
  useEffect(() => {
    if (!loading && !user) {
      router.push('/dashboard/auth');
    }
  }, [user, loading, router]);

  return {
    user,
    logout,
    loading,
    files
  };
}