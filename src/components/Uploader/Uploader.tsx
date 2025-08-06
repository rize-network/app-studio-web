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
  onMultipleFileSelect,
  validateFile,
  isLoading = false,
  progress = 0,
  fileType,
  multiple = false,
  ...props
}: UploadProps) => {
  const {
    previewUrl,
    thumbnailUrl,
    errorMessage,
    videoRef,
    fileInputRef,
    selectedFile,
    selectedFiles,
    handleFileChange,
    handleClick,
  } = useUpload({
    accept,
    maxSize,
    onFileSelect,
    onMultipleFileSelect,
    validateFile,
    multiple,
  });

  // Determine file type based on the selected file's MIME type if not explicitly provided
  const determineFileType = () => {
    if (fileType) return fileType;

    if (!selectedFile) return undefined;

    if (selectedFile.type.startsWith('image/')) {
      return 'image';
    } else if (selectedFile.type.startsWith('video/')) {
      return 'video';
    } else {
      return 'file';
    }
  };

  const detectedFileType = determineFileType();

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
      selectedFiles={selectedFiles}
      videoRef={videoRef}
      fileInputRef={fileInputRef}
      previewUrl={previewUrl}
      thumbnailUrl={thumbnailUrl}
      fileType={detectedFileType}
      multiple={multiple}
      {...props}
    />
  );
};
