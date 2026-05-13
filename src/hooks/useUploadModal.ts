'use client';

import { useState } from 'react';
import { FileItem } from '@/types/dashboard';

export function useUploadModal(onSuccess?: (file: FileItem) => void) {
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => {
    if (!isProcessing) setIsOpen(false);
  };

  const handleUpload = async (rawFile: File) => {
    setIsProcessing(true);

    // 1. Simulate the "Secure Processing" delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // 2. Transform raw File into our System's FileItem type
    const newFile: FileItem = {
      id: Math.random().toString(36).substring(2, 11),
      name: rawFile.name,
      size: (rawFile.size / (1024 * 1024)).toFixed(1) + ' MB',
      type: rawFile.name.split('.').pop()?.toUpperCase() || 'FILE',
      updatedAt: new Date().toISOString().split('T')[0],
    };

    // 3. Callback to update the parent's file list
    if (onSuccess) onSuccess(newFile);

    setIsProcessing(false);
    return newFile;
  };

  return {
    isOpen,
    isProcessing,
    open,
    close,
    handleUpload,
  };
}