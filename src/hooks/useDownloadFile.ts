'use client';

import { useState } from 'react';
import { useDownloadHistory } from './useDownloadHistory';
import { createClient } from '@/utils/supabase/client';

export function useDownloadFile() {
  const [isDownloading, setIsDownloading] = useState(false);
  const { recordDownloadEvent } = useDownloadHistory();
  const supabase = createClient();

  const downloadAsset = async (file: { name: string; url: string }) => {
    if (!file?.url) {
      alert("Error: This record does not contain an active storage path.");
      return;
    }

    try {
      setIsDownloading(true);

      // 1. Extract the relative storage path from the public URL
      let relativePath = file.url;
      if (file.url.includes('/assets/')) {
        relativePath = file.url.split('/assets/')[1];
      }

      console.log("Requesting secure download stream token for path:", relativePath);

      // 2. Request the temporary secure download link from Supabase
      const { data, error } = await supabase.storage
        .from('assets')
        .createSignedUrl(relativePath, 60); // Removed download: true to read raw binary stream safely

      if (error || !data?.signedUrl) {
        throw new Error(error?.message || "Could not generate authentication download token.");
      }

      // 3. Fetch the file as binary blob to completely bypass Content-Disposition header overrides
      const response = await fetch(data.signedUrl);
      if (!response.ok) throw new Error("Network stream response failed.");
      const fileBlob = await response.blob();

      // 4. Generate local runtime Object URL wrapper
      const blobUrl = window.URL.createObjectURL(fileBlob);

      // 5. Programmatically execute the file save dialog box with target custom filename matching file.name
      const downloadAnchor = document.createElement('a');
      downloadAnchor.href = blobUrl;
      downloadAnchor.download = file.name; // This will now accurately override the cloud bucket's file asset name
      
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      
      // Clean up DOM and revoke allocation memory addresses
      document.body.removeChild(downloadAnchor);
      window.URL.revokeObjectURL(blobUrl);

      // 6. Fire and forget the background event tracking call
      await recordDownloadEvent(file.name);

    } catch (err: any) {
      console.error("Download pipeline execution aborted:", err);
      alert(`Download Failed: ${err.message || 'System could not verify cloud asset routing.'}`);
    } finally {
      setIsDownloading(false);
    }
  };

  return {
    downloadAsset,
    isDownloading
  };
}