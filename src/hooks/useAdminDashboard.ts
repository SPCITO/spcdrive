'use client';

import { useState } from 'react';
import { FileItem } from '@/types/dashboard';
import { MOCK_FILES } from '@/lib/mock-data'; // Import our new source of truth

type DashboardView = 'files' | 'users' | 'history';

export function useAdminDashboard() {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [activeView, setActiveView] = useState<DashboardView>('files');
  
  // Initialize state with the central mock files
  const [files, setFiles] = useState<FileItem[]>(MOCK_FILES);

  // Logic for handling new uploads
  const handleUploadComplete = (newFile: FileItem) => {
    setFiles((prev) => [newFile, ...prev]);
    setIsUploadOpen(false);
  };

  // Logic for switching tabs/views
  const setView = (view: DashboardView) => setActiveView(view);
  
  // Logic for opening/closing the upload UI
  const toggleUpload = (state: boolean) => setIsUploadOpen(state);

  return {
    files,
    activeView,
    isUploadOpen,
    setView,
    toggleUpload,
    handleUploadComplete
  };
}