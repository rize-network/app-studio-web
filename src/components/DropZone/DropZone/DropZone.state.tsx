import React, { useState, useRef, useCallback, useEffect } from 'react';
import { DropZoneProps, DropZoneStateProps } from './DropZone.props';
// This file defines the `useDropZone` custom React hook, which encapsulates all the state management and event-handling logic for the DropZone component. It manages drag-and-drop states, processes selected files, generates image previews, and provides event handlers for user interactions.
export const useDropZone = ({
  onFileSelect,
  onMultipleFileSelect,
  validateFile,
  accept,
  multiple,
  disabled,
  previewUrl: externalPreviewUrl,
}: DropZoneProps): DropZoneStateProps => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [internalPreview, setInternalPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const preview =
    externalPreviewUrl !== undefined ? externalPreviewUrl : internalPreview;
  useEffect(() => {
    return () => {
      if (internalPreview) {
        URL.revokeObjectURL(internalPreview);
      }
    };
  }, [internalPreview]);
  const handleDragEnter = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (disabled) return;
      setIsDragActive(true);
    },
    [disabled]
  );
  const handleDragLeave = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (disabled) return;
      setIsDragActive(false);
    },
    [disabled]
  );
  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (disabled) return;
      setIsDragActive(true);
    },
    [disabled]
  );
  const processFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;
      const fileArray = Array.from(files);
      if (!multiple && fileArray.length > 0) {
        const file = fileArray[0];
        if (file.type.startsWith('image/')) {
          const newPreview = URL.createObjectURL(file);
          setInternalPreview((prev) => {
            if (prev) URL.revokeObjectURL(prev);
            return newPreview;
          });
        } else {
          setInternalPreview(null);
        }
      }
      if (multiple) {
        if (onMultipleFileSelect) {
          onMultipleFileSelect(fileArray);
        }
      } else {
        if (fileArray.length > 0 && onFileSelect) {
          onFileSelect(fileArray[0]);
        }
      }
    },
    [multiple, onMultipleFileSelect, onFileSelect]
  );
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);
      if (disabled) return;
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        processFiles(e.dataTransfer.files);
        e.dataTransfer.clearData();
      }
    },
    [disabled, processFiles]
  );
  const handleClick = useCallback(() => {
    if (disabled) return;
    inputRef.current?.click();
  }, [disabled]);
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      processFiles(e.target.files);
      if (e.target.value) {
        e.target.value = '';
      }
    },
    [processFiles]
  );
  return {
    isDragActive,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleClick,
    handleFileChange,
    inputRef,
    preview,
  };
};
