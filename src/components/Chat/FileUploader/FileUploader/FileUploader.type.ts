/**
 * FileUploader Types
 */

import { ViewProps } from 'app-studio';

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
  file: File;
  progress?: number;
  error?: string;
  isUploading?: boolean;
}

export interface FileUploaderStyles {
  container?: ViewProps;
  dropzone?: ViewProps;
  fileList?: ViewProps;
  fileItem?: ViewProps;
  fileInfo?: ViewProps;
  fileActions?: ViewProps;
  progressBar?: ViewProps;
}
