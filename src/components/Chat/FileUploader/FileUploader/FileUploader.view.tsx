/**
 * FileUploader View
 */

import React from 'react';
import { View } from 'app-studio';
import { Vertical } from 'app-studio';
import { Horizontal } from 'app-studio';
import { Text } from '../../../Text/Text';
import { Button } from '../../../Button/Button';
import { FileUploaderProps } from './FileUploader.props';
import {
  containerStyles,
  dropzoneStyles,
  fileListStyles,
  fileItemStyles,
  fileIconStyles,
  fileInfoStyles,
  fileNameStyles,
  fileSizeStyles,
  fileActionsStyles,
  progressBarContainerStyles,
  progressBarStyles,
} from './FileUploader.style';

interface Props extends FileUploaderProps {
  isDragging: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleDragEnter: (e: React.DragEvent) => void;
  handleDragLeave: (e: React.DragEvent) => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent) => void;
  handleFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  openFileDialog: () => void;
  formatBytes: (bytes: number, decimals?: number) => string;
}

export const FileUploaderView: React.FC<Props> = ({
  files,
  onFilesAdded,
  onFileRemove,
  onFileRetry,
  maxFiles = Infinity,
  maxSize = Infinity,
  accept = '*',
  multiple = true,
  isDisabled = false,
  styles = {},
  isDragging,
  fileInputRef,
  handleDragEnter,
  handleDragLeave,
  handleDragOver,
  handleDrop,
  handleFileInputChange,
  openFileDialog,
  formatBytes,
  ...props
}) => {
  // Get file icon based on file type
  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return '🖼️';
    if (fileType.startsWith('video/')) return '🎬';
    if (fileType.startsWith('audio/')) return '🎵';
    if (fileType.includes('pdf')) return '📄';
    if (fileType.includes('word') || fileType.includes('document')) return '📝';
    if (fileType.includes('excel') || fileType.includes('sheet')) return '📊';
    return '📁';
  };

  return (
    <View {...containerStyles} {...props} {...styles.container}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileInputChange}
        style={{ display: 'none' }}
        disabled={
          isDisabled || (maxFiles !== Infinity && files.length >= maxFiles)
        }
      />

      {(!maxFiles || files.length < maxFiles) && (
        <View
          {...dropzoneStyles(isDragging)}
          {...styles.dropzone}
          onDragEnter={isDisabled ? undefined : handleDragEnter}
          onDragLeave={isDisabled ? undefined : handleDragLeave}
          onDragOver={isDisabled ? undefined : handleDragOver}
          onDrop={isDisabled ? undefined : handleDrop}
          onClick={isDisabled ? undefined : openFileDialog}
          opacity={isDisabled ? 0.6 : 1}
        >
          <Text fontSize="xl" marginBottom="sm">
            📂
          </Text>
          <Text fontWeight="medium">
            {isDragging ? 'Drop files here' : 'Drag & drop files here'}
          </Text>
          <Text fontSize="sm" color="color.gray.500" marginTop="xs">
            or click to browse
          </Text>
          {maxSize !== Infinity && (
            <Text fontSize="xs" color="color.gray.500" marginTop="sm">
              Maximum file size: {formatBytes(maxSize)}
            </Text>
          )}
          {accept !== '*' && (
            <Text fontSize="xs" color="color.gray.500">
              Accepted formats: {accept}
            </Text>
          )}
        </View>
      )}

      {files.length > 0 && (
        <Vertical {...fileListStyles} {...styles.fileList}>
          {files.map((file) => (
            <View key={file.id} {...fileItemStyles} {...styles.fileItem}>
              <View {...fileIconStyles(file.type)}>
                <Text fontSize="xl">{getFileIcon(file.type)}</Text>
              </View>

              <Vertical {...fileInfoStyles} {...styles.fileInfo}>
                <Text
                  {...fileNameStyles}
                  color={file.error ? 'color.red.500' : 'inherit'}
                >
                  {file.name}
                </Text>

                <Text {...fileSizeStyles}>{formatBytes(file.size)}</Text>

                {file.error && (
                  <Text fontSize="xs" color="color.red.500">
                    {file.error}
                  </Text>
                )}

                {file.isUploading && file.progress !== undefined && (
                  <View {...progressBarContainerStyles} {...styles.progressBar}>
                    <View {...progressBarStyles(file.progress)} />
                  </View>
                )}
              </Vertical>

              <Horizontal {...fileActionsStyles} {...styles.fileActions}>
                {file.error && onFileRetry && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onFileRetry(file.id)}
                    isDisabled={isDisabled}
                  >
                    Retry
                  </Button>
                )}

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onFileRemove(file.id)}
                  isDisabled={isDisabled || file.isUploading}
                >
                  Remove
                </Button>
              </Horizontal>
            </View>
          ))}
        </Vertical>
      )}
    </View>
  );
};
