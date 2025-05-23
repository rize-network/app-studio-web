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
  maxSize = 100 * 1024 * 1024, // 100MB default
  onFileSelect,
  validateFile,
  thumbnail,
  onError = (error: string) => {
    showMessage('error', 'Error', error);
  },
}: UseUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(
    thumbnail || null
  );

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      setErrorMessage(null);

      if (!file) {
        onError('No file selected');
        setErrorMessage('No file selected');
        return;
      }

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
    },
    [maxSize, onFileSelect, validateFile]
  );

  const handleClick = () => fileInputRef.current?.click();

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      if (thumbnailUrl) URL.revokeObjectURL(thumbnailUrl);
    };
  }, [previewUrl, thumbnailUrl]);

  return {
    previewUrl,
    thumbnailUrl,
    errorMessage,
    fileInputRef,
    videoRef,
    selectedFile,
    handleFileChange,
    handleClick,
  };
};
