/**
 * FileUploader Props
 */

import { ViewProps } from 'app-studio';
import { UploadedFile, FileUploaderStyles } from './FileUploader.type';

export interface FileUploaderProps extends ViewProps {
  /**
   * List of uploaded files
   */
  files: UploadedFile[];

  /**
   * Callback function when files are added
   */
  onFilesAdded: (files: File[]) => void;

  /**
   * Callback function when a file is removed
   */
  onFileRemove: (fileId: string) => void;

  /**
   * Callback function when a file is retried after an error
   */
  onFileRetry?: (fileId: string) => void;

  /**
   * Maximum number of files allowed
   */
  maxFiles?: number;

  /**
   * Maximum file size in bytes
   */
  maxSize?: number;

  /**
   * Accepted file types
   */
  accept?: string;

  /**
   * Whether to allow multiple files
   */
  multiple?: boolean;

  /**
   * Whether the uploader is disabled
   */
  isDisabled?: boolean;

  /**
   * Custom styles for the component
   */
  styles?: FileUploaderStyles;
}
