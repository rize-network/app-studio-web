import React from 'react';
import { UploadProps } from './Uploader/Uploader.props';
import { useUpload } from './Uploader/Uploader.state';
import { UploadView } from './Uploader/Uploader.view';
// Defines the main Uploader functional component, responsible for handling file selection, preview, and managing the overall upload state and logic.
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
  // Destructures state variables and handler functions from the `useUpload` custom hook, which encapsulates the core logic for file management, validation, and UI interactions.
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
  // Defines a helper function to determine the specific type of the selected file (e.g., 'image', 'video', or 'file') based on explicit `fileType` prop or the selected file's MIME type.
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
  // Stores the determined file type, which is used to render appropriate previews or UI elements within the component.
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
