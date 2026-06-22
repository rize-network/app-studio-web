// This file encapsulates the state management logic and utility functions for the Uploader component, including file selection, validation, preview generation, and thumbnail creation for media files.
import React, { useCallback, useRef, useState, useEffect } from 'react';
import { UseUploadProps } from '../Uploader/Uploader.props';
import { showMessage } from '../../Message/Message';
export const generateThumbnail = (
  videoFile: File,
  setThumbnailUrl: (url: string) => void
) => {
  const video = document.createElement('video');
  video.preload = 'metadata';
  video.onloadedmetadata = () => {
    video.currentTime = 1;
  };
  video.oncanplay = () => {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const thumbnailDataUrl = canvas.toDataURL('image/jpeg');
      setThumbnailUrl(thumbnailDataUrl);
    }
    URL.revokeObjectURL(video.src);
  };
  video.src = URL.createObjectURL(videoFile);
};
export const useUpload = ({
  maxSize = 100 * 1024 * 1024,
  onFileSelect,
  onMultipleFileSelect,
  validateFile,
  thumbnail,
  multiple = false,
  onError = (error: string) => {
    showMessage('error', 'Error', error);
  },
}: UseUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(
    thumbnail || null
  );
  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      setErrorMessage(null);
      if (!files || files.length === 0) {
        onError('No file selected');
        setErrorMessage('No file selected');
        return;
      }
      if (multiple) {
        const fileArray = Array.from(files);
        const validFiles: File[] = [];
        for (const file of fileArray) {
          if (file.size > maxSize) {
            onError(
              `File ${file.name} exceeds ${Math.round(
                maxSize / (1024 * 1024)
              )}MB.`
            );
            setErrorMessage(
              `File ${file.name} exceeds ${Math.round(
                maxSize / (1024 * 1024)
              )}MB.`
            );
            continue;
          }
          if (validateFile) {
            const validationError = validateFile(file);
            if (validationError) {
              onError(`${file.name}: ${validationError}`);
              setErrorMessage(`${file.name}: ${validationError}`);
              continue;
            }
          }
          validFiles.push(file);
        }
        if (validFiles.length > 0) {
          setSelectedFiles(validFiles);
          if (onMultipleFileSelect) {
            onMultipleFileSelect(validFiles);
          }
        }
      } else {
        const file = files[0];
        if (file.size > maxSize) {
          onError(`File exceeds ${Math.round(maxSize / (1024 * 1024))}MB.`);
          setErrorMessage(
            `File exceeds ${Math.round(maxSize / (1024 * 1024))}MB.`
          );
          return;
        }
        if (validateFile) {
          const validationError = validateFile(file);
          if (validationError) {
            onError(validationError);
            setErrorMessage(validationError);
            return;
          }
        }
        setPreviewUrl(URL.createObjectURL(file));
        if (file.type.startsWith('video/')) {
          generateThumbnail(file, setThumbnailUrl);
        }
        if (onFileSelect) {
          setSelectedFile(file);
          onFileSelect(file);
        }
      }
    },
    [maxSize, onFileSelect, onMultipleFileSelect, validateFile, multiple]
  );
  const handleClick = () => {
    // On web the hidden file input exposes `.click()`. On React Native there is
    // no DOM file input (the ref resolves to a TextInput or null), so guard the
    // call to keep the Uploader a safe, no-op-on-tap preview on native.
    const input = fileInputRef.current as unknown as {
      click?: () => void;
    } | null;
    if (input && typeof input.click === 'function') {
      input.click();
    }
  };
  useEffect(() => {
    return () => {
      // `URL.revokeObjectURL` is web-only; on native these URLs are never
      // created (no file picker), so only call it when the API exists.
      if (
        typeof URL !== 'undefined' &&
        typeof URL.revokeObjectURL === 'function'
      ) {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        if (thumbnailUrl) URL.revokeObjectURL(thumbnailUrl);
      }
    };
  }, [previewUrl, thumbnailUrl]);
  return {
    previewUrl,
    thumbnailUrl,
    errorMessage,
    fileInputRef,
    videoRef,
    selectedFile,
    selectedFiles,
    handleFileChange,
    handleClick,
  };
};
