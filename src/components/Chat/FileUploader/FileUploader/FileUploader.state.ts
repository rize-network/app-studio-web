/**
 * FileUploader State
 */

import { useState, useRef } from 'react';

export const useFileUploaderState = (
  onFilesAdded: (files: File[]) => void,
  maxFiles: number,
  maxSize: number,
  accept: string
) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const validateFiles = (
    files: File[]
  ): { valid: File[]; errors: string[] } => {
    const valid: File[] = [];
    const errors: string[] = [];

    // Check max files
    if (maxFiles && files.length > maxFiles) {
      errors.push(`Maximum ${maxFiles} files allowed`);
      return { valid, errors };
    }

    // Check file types and sizes
    for (const file of files) {
      // Check file size
      if (maxSize && file.size > maxSize) {
        errors.push(
          `File "${file.name}" exceeds maximum size of ${formatBytes(maxSize)}`
        );
        continue;
      }

      // Check file type if accept is specified
      if (accept && accept !== '*') {
        const acceptedTypes = accept.split(',').map((type) => type.trim());
        const fileType = file.type;
        const fileExtension = `.${file.name.split('.').pop()}`;

        const isAccepted = acceptedTypes.some((type) => {
          if (type.startsWith('.')) {
            // Check extension
            return fileExtension.toLowerCase() === type.toLowerCase();
          } else if (type.includes('*')) {
            // Check mime type pattern (e.g., image/*)
            const [category, subtype] = type.split('/');
            const [fileCategory, fileSubtype] = fileType.split('/');
            return (
              category === fileCategory &&
              (subtype === '*' || subtype === fileSubtype)
            );
          } else {
            // Check exact mime type
            return fileType === type;
          }
        });

        if (!isAccepted) {
          errors.push(`File "${file.name}" has an unsupported format`);
          continue;
        }
      }

      valid.push(file);
    }

    return { valid, errors };
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      const { valid, errors } = validateFiles(droppedFiles);

      if (errors.length > 0) {
        // In a real app, you would show these errors to the user
        console.error(errors);
      }

      if (valid.length > 0) {
        onFilesAdded(valid);
      }
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      const { valid, errors } = validateFiles(selectedFiles);

      if (errors.length > 0) {
        // In a real app, you would show these errors to the user
        console.error(errors);
      }

      if (valid.length > 0) {
        onFilesAdded(valid);
      }

      // Reset the input value so the same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Helper function to format bytes
  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  return {
    isDragging,
    fileInputRef,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleFileInputChange,
    openFileDialog,
    formatBytes,
  };
};
