'use client';

import React, { forwardRef, useEffect } from 'react';
import { Button, Horizontal, Text, useTheme } from 'app-studio';
import { UploadedFile } from './ChatInput/ChatInput.type';
import { LoadingSpinnerIcon, UploadIcon } from '../Icon/Icon';

interface FileUploadHandlerProps {
  loading: boolean;
  disabled: boolean;
  isAgentRunning: boolean;
  isUploading: boolean;
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
    type: file.type || 'application/octet-stream',
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

export const FileUploadHandler = forwardRef<
  HTMLInputElement,
  FileUploadHandlerProps
>(
  (
    {
      loading,
      disabled,
      isAgentRunning,
      isUploading,
      sandboxId,
      setPendingFiles,
      setUploadedFiles,
      setIsUploading,
      views = {},
    },
    ref
  ) => {
    const { getColor } = useTheme();

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

    // Handle file upload button click
    const handleFileUpload = () => {
      if (ref && 'current' in ref && ref.current) {
        ref.current.click();
      }
    };

    // Process file upload
    const processFileUpload = async (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      if (!event.target.files || event.target.files.length === 0) return;

      const files = Array.from(event.target.files);

      // Handle files
      handleFiles(
        files,
        sandboxId,
        setPendingFiles,
        setUploadedFiles,
        setIsUploading
      );

      // Reset the input value
      event.target.value = '';
    };

    return (
      <>
        <Button
          type="button"
          onClick={handleFileUpload}
          variant="ghost"
          height="36px"
          padding="0 12px"
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
              <UploadIcon
                widthHeight={16}
                color="currentColor"
                filled={false}
                {...views?.icon}
              />
            )}
            <Text fontSize="14px" {...views?.text}>
              Attachments
            </Text>
          </Horizontal>
        </Button>

        <input
          type="file"
          ref={ref}
          style={{ display: 'none' }}
          onChange={processFileUpload}
          multiple
        />
      </>
    );
  }
);

FileUploadHandler.displayName = 'FileUploadHandler';
