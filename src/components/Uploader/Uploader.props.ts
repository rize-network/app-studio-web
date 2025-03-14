import type { ImageProps, TextProps, ViewProps } from 'app-studio';

import { IconProps } from '..';

export interface UseUploadProps {
  accept?: string;
  maxSize?: number;
  onFileSelect?: (file: File) => void;
  validateFile?: (file: File) => string | null;
  onError?: (error: string) => void;
  thumbnail?: string;
}

export interface UploadProps {
  isLoading?: boolean;
  icon?: React.ReactNode;
  accept?: string;
  text?: string;
  maxSize?: number;
  progress?: number;
  onFileSelect?: (file: File) => void;
  validateFile?: (file: File) => string | null;
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
}
