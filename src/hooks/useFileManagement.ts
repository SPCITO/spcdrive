'use client';
import { useState } from 'react';
import { FileItem } from '@/types/dashboard';
import { MOCK_FILES } from '@/lib/mock-data';

export function useFileManagement() {
  const [files, setFiles] = useState<FileItem[]>(MOCK_FILES);

  const uploadFile = (browserFile: File) => {
    const newFile: FileItem = {
      id: Math.random().toString(36).substring(2, 11),
      name: browserFile.name,
      size: browserFile.size > 1024 * 1024 
        ? `${(browserFile.size / (1024 * 1024)).toFixed(1)} MB` 
        : `${(browserFile.size / 1024).toFixed(1)} KB`,
      type: browserFile.name.split('.').pop()?.toUpperCase() || 'BIN',
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setFiles(prev => [newFile, ...prev]);
  };

  const deleteFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const updateFile = (id: string, updates: Partial<FileItem>) => {
    setFiles(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  return { files, uploadFile, deleteFile, updateFile };
}