import React from 'react';
import { UploadProps } from './Uploader/Uploader.props';
import { useUpload } from './Uploader/Uploader.state';
import { UploadView } from './Uploader/Uploader.view';

export const Uploader: React.FC<UploadProps> = ({
  accept = '*/*',
  icon,
  text,
  maxSize,
  onFileSelect,
  validateFile,
  isLoading = false,
  progress = 0,
  ...props
}: UploadProps) => {
  const {
    previewUrl,
    thumbnailUrl,
    errorMessage,
    videoRef,
    fileInputRef,
    selectedFile,
    handleFileChange,
    handleClick,
  } = useUpload({ accept, maxSize, onFileSelect, validateFile });

  return (
    <UploadView
      handleClick={handleClick}
      accept={accept}
      isLoading={isLoading}
      progress={progress}
      icon={icon}
      text={text}
      maxSize={maxSize}
      onFileSelect={onFileSelect}
      validateFile={validateFile}
      errorMessage={errorMessage}
      handleFileChange={handleFileChange}
      selectedFile={selectedFile}
      videoRef={videoRef}
      fileInputRef={fileInputRef}
      previewUrl={previewUrl}
      thumbnailUrl={thumbnailUrl}
      {...props}
    />
  );
};
