import type { ImageProps, TextProps, ViewProps } from 'app-studio';

import { IconProps } from '../..';

export interface UseUploadProps {
  accept?: string;
  maxSize?: number;
  onFileSelect?: (file: File) => void;
  onMultipleFileSelect?: (files: File[]) => void;
  validateFile?: (file: File) => string | null;
  onError?: (error: string) => void;
  thumbnail?: string;
  multiple?: boolean;
}

export interface UploadStateProps {
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedFile: File | null;
  selectedFiles: File[];
  fileInputRef: React.RefObject<HTMLInputElement>;
  videoRef: React.RefObject<HTMLVideoElement>;
}

export interface UploadViewProps {
  onError?: (error: string) => void;
  containerProps?: ViewProps;
  errorMessageProps?: TextProps;
  thumbnailContainerProps?: ViewProps;
  loadingProps?: ViewProps;
  progressProps?: ViewProps;
  videoProps?: ViewProps;
  imageProps?: ImageProps;
  iconProps?: IconProps;
  textProps?: TextProps;
  renderVideo?: (props: any) => React.ReactNode;
  renderText?: (props: any) => React.ReactNode;
  renderImage?: (props: any) => React.ReactNode;
  renderError?: (props: any) => React.ReactNode;
  renderFile?: (props: any) => React.ReactNode;
  renderProgress?: (props: any) => React.ReactNode;
  previewUrl?: string | null;
  thumbnailUrl?: string | null;
  errorMessage?: string | null;
  isLoading?: boolean;
  icon?: React.ReactNode;
  accept?: string;
  text?: string;
  maxSize?: number;
  progress?: number;
  fileType?: 'video' | 'image' | 'file';
  handleClick?: () => void;
  onFileSelect?: (file: File) => void;
  onMultipleFileSelect?: (files: File[]) => void;
  validateFile?: (file: File) => string | null;
  multiple?: boolean;
  views?: {
    container?: ViewProps;
    view?: ViewProps;
    image?: ImageProps;
    horizontal?: ViewProps;
    text?: ViewProps;
  };
}

export interface UploadProps extends UseUploadProps, UploadViewProps {}
