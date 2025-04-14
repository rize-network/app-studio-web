/**
 * FileUploader Component
 *
 * A component for uploading files with drag and drop support, progress tracking,
 * and file validation.
 */

import React from 'react';
import { FileUploaderProps } from './FileUploader/FileUploader.props';
import { useFileUploaderState } from './FileUploader/FileUploader.state';
import { FileUploaderView } from './FileUploader/FileUploader.view';

export const FileUploader: React.FC<FileUploaderProps> = (props) => {
  const {
    onFilesAdded,
    maxFiles = Infinity,
    maxSize = Infinity,
    accept = '*',
  } = props;

  const {
    isDragging,
    fileInputRef,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleFileInputChange,
    openFileDialog,
    formatBytes,
  } = useFileUploaderState(onFilesAdded, maxFiles, maxSize, accept);

  return (
    <FileUploaderView
      {...props}
      isDragging={isDragging}
      fileInputRef={fileInputRef}
      handleDragEnter={handleDragEnter}
      handleDragLeave={handleDragLeave}
      handleDragOver={handleDragOver}
      handleDrop={handleDrop}
      handleFileInputChange={handleFileInputChange}
      openFileDialog={openFileDialog}
      formatBytes={formatBytes}
    />
  );
};

export type { FileUploaderProps } from './FileUploader/FileUploader.props';
export type { UploadedFile } from './FileUploader/FileUploader.type';
