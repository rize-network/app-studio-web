'use client';

import React, { forwardRef, useEffect } from 'react';
import { Button, Horizontal } from 'app-studio';
import { useUpload } from '../Uploader/Uploader/Uploader.state';
import { UploadedFile } from './ChatInput/ChatInput.type';
import { AttachmentIcon, LoadingSpinnerIcon } from '../Icon/Icon';
import { getFileCategory } from '../../utils/file'; // Import the helper function

interface ChatUploaderProps {
  loading: boolean;
  disabled: boolean;
  isAgentRunning: boolean;
  isUploading: boolean;
  hideAttachments?: boolean;
  sandboxId?: string;
  setPendingFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setUploadedFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>;
  setIsUploading: React.Dispatch<React.SetStateAction<boolean>>;
  views?: {
    button?: any;
    icon?: any;
    text?: any;
    tooltip?: any;
  };
}

/**
 * Handle local files without uploading to server
 */
const handleLocalFiles = (
  files: File[],
  setPendingFiles: React.Dispatch<React.SetStateAction<File[]>>,
  setUploadedFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>
) => {
  // Filter files that exceed size limit
  const filteredFiles = files.filter((file) => {
    if (file.size > 50 * 1024 * 1024) {
      console.error(`File size exceeds 50MB limit: ${file.name}`);
      return false;
    }
    return true;
  });

  // Add files to pending files
  setPendingFiles((prevFiles) => [...prevFiles, ...filteredFiles]);

  // Create uploaded file objects
  const newUploadedFiles: UploadedFile[] = filteredFiles.map((file) => ({
    name: file.name,
    path: `/workspace/${file.name}`,
    size: file.size,
    type: getFileCategory(file.type), // Use helper to determine category
    localUrl: URL.createObjectURL(file),
  }));

  // Add files to uploaded files
  setUploadedFiles((prev) => [...prev, ...newUploadedFiles]);
};

/**
 * Handle files based on whether a sandboxId is available
 */
const handleFiles = async (
  files: File[],
  sandboxId: string | undefined,
  setPendingFiles: React.Dispatch<React.SetStateAction<File[]>>,
  setUploadedFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>,
  setIsUploading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  // If no sandboxId, just handle files locally
  handleLocalFiles(files, setPendingFiles, setUploadedFiles);
};

export const ChatUploader = forwardRef<HTMLInputElement, ChatUploaderProps>(
  (
    {
      loading,
      disabled,
      isAgentRunning,
      isUploading,
      sandboxId,
      hideAttachments,
      setPendingFiles,
      setUploadedFiles,
      setIsUploading,
      views = {},
    },
    ref
  ) => {
    // Validate file size (50MB limit for chat)
    const validateFile = (file: File): string | null => {
      if (file.size > 50 * 1024 * 1024) {
        return `File size exceeds 50MB limit`;
      }
      return null;
    };

    // Handle multiple file selection
    const handleMultipleFileSelect = async (files: File[]) => {
      await handleFiles(
        files,
        sandboxId,
        setPendingFiles,
        setUploadedFiles,
        setIsUploading
      );
    };

    // Use the Uploader hook for file handling
    const { fileInputRef, handleClick, handleFileChange } = useUpload({
      accept: '*/*',
      maxSize: 50 * 1024 * 1024, // 50MB limit
      multiple: true,
      onMultipleFileSelect: handleMultipleFileSelect,
      validateFile,
    });

    // Clean up object URLs when component unmounts
    useEffect(() => {
      return () => {
        setUploadedFiles((prev) => {
          prev.forEach((file) => {
            if (file.localUrl) {
              URL.revokeObjectURL(file.localUrl);
            }
          });
          return prev;
        });
      };
    }, [setUploadedFiles]);

    return (
      <>
        {hideAttachments && (
          <Button
            type="button"
            onClick={handleClick}
            variant="ghost"
            height="36px"
            padding="0 12px"
            border={'1px solid'}
            borderRadius="8px"
            backgroundColor="transparent"
            color="color.gray.500"
            disabled={loading || (disabled && !isAgentRunning) || isUploading}
            _hover={{
              backgroundColor: 'color.gray.100',
            }}
            {...views?.button}
          >
            <Horizontal gap={4} alignItems="center">
              {isUploading ? (
                <LoadingSpinnerIcon
                  widthHeight={16}
                  color="currentColor"
                  filled={false}
                  style={{ animation: 'spin 1s linear infinite' }}
                  {...views?.icon}
                />
              ) : (
                <AttachmentIcon
                  widthHeight={16}
                  color="currentColor"
                  filled={false}
                  {...views?.icon}
                />
              )}
            </Horizontal>
          </Button>
        )}

        <input
          type="file"
          ref={ref || fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
          multiple
          accept="*/*"
        />
      </>
    );
  }
);

ChatUploader.displayName = 'ChatUploader';
