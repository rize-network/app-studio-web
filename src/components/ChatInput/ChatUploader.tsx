import React, { forwardRef, useEffect } from 'react';
import { Button, Horizontal } from 'app-studio';
import { useUpload } from '../Uploader/Uploader/Uploader.state';
import { AttachmentIcon, LoadingSpinnerIcon } from '../Icon/Icon';
// Defines the shape of props accepted by the ChatUploader component.
interface ChatUploaderProps {
  // Indicates if the component is in a loading state.
  loading: boolean;
  // Determines if the component's functionality is disabled.
  disabled: boolean;
  // Indicates whether an agent process is currently active.
  isAgentRunning: boolean;
  // Specifies if files are currently in the process of being uploaded.
  isUploading: boolean;
  // Optional flag to hide the attachment UI.
  hideAttachments?: boolean;
  // Optional identifier for a sandbox environment, used for file uploads.
  sandboxId?: string;
  // Function to update the array of files that are pending upload.
  setPendingFiles: React.Dispatch<React.SetStateAction<File[]>>;
  // Function to update the array of files that have been successfully uploaded.
  setUploadedFiles: React.Dispatch<React.SetStateAction<File[]>>;
  // Function to set the boolean state indicating whether an upload is in progress.
  setIsUploading: React.Dispatch<React.SetStateAction<boolean>>;
  // Optional object to provide custom components for different parts of the uploader's view (button, icon, text, tooltip).
  views?: {
    button?: any;
    icon?: any;
    text?: any;
    tooltip?: any;
  };
}
// Processes selected files locally, including filtering out oversized files, and updates pending and uploaded file lists.
const handleLocalFiles = (
  files: File[],
  setPendingFiles: React.Dispatch<React.SetStateAction<File[]>>,
  setUploadedFiles: React.Dispatch<React.SetStateAction<File[]>>
) => {
  const filteredFiles = files.filter((file) => {
    if (file.size > 50 * 1024 * 1024) {
      console.error(`File size exceeds 50MB limit: ${file.name}`);
      return false;
    }
    return true;
  });
  setPendingFiles((prevFiles) => [...prevFiles, ...filteredFiles]);
  setUploadedFiles((prev) => [...prev, ...filteredFiles]);
};
// Asynchronously handles file processing, calling `handleLocalFiles` and managing upload state.
const handleFiles = async (
  files: File[],
  sandboxId: string | undefined,
  setPendingFiles: React.Dispatch<React.SetStateAction<File[]>>,
  setUploadedFiles: React.Dispatch<React.SetStateAction<File[]>>,
  setIsUploading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  handleLocalFiles(files, setPendingFiles, setUploadedFiles);
};
// The main ChatUploader functional component, wrapped with `forwardRef` to allow parent components to access its DOM node (typically the hidden file input).
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
    // Validates a single file against specific criteria, such as maximum size, returning an error message if validation fails.
    const validateFile = (file: File): string | null => {
      if (file.size > 50 * 1024 * 1024) {
        return `File size exceeds 50MB limit`;
      }
      return null;
    };
    // Asynchronously processes a selection of multiple files by delegating to the `handleFiles` function.
    const handleMultipleFileSelect = async (files: File[]) => {
      await handleFiles(
        files,
        sandboxId,
        setPendingFiles,
        setUploadedFiles,
        setIsUploading
      );
    };
    // Utilizes the `useUpload` hook to manage the file input element and its related events (click to open file dialog, change event on file selection).
    const { fileInputRef, handleClick, handleFileChange } = useUpload({
      accept: '*/*',
      maxSize: 50 * 1024 * 1024,
      multiple: true,
      onMultipleFileSelect: handleMultipleFileSelect,
      validateFile,
    });
    // Cleans up any object URLs created for uploaded files when the component unmounts to prevent memory leaks.
    useEffect(() => {
      return () => {
        setUploadedFiles((prev) => {
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
            color="color-gray-500"
            disabled={loading || (disabled && !isAgentRunning) || isUploading}
            _hover={{
              backgroundColor: 'color-gray-100',
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
// Sets a display name for the component, useful for debugging and introspection in React DevTools.
ChatUploader.displayName = 'ChatUploader';
