import type { ViewProps, TextProps, ImageProps } from 'app-studio';
import { UseUploadProps } from '../../Uploader/Uploader/Uploader.props';

export interface DropZoneProps extends UseUploadProps {
  /**
   * Custom content to render inside the dropzone
   */
  children?: React.ReactNode;

  /**
   * Props for the container/drop area
   */
  containerProps?: ViewProps;

  /**
   * Text to display when no children are provided
   */
  text?: string;

  /**
   * Props for the text
   */
  textProps?: TextProps;

  /**
   * Class name for custom styling
   */
  className?: string;

  /**
   * Whether the dropzone is disabled
   */
  disabled?: boolean;

  /**
   * Props for the preview image
   */
  imageProps?: ImageProps;

  /**
   * External preview URL (if controlled)
   */
  previewUrl?: string | null;

  /**
   * List of selected files to display
   */
  selectedFiles?: File[];

  /**
   * Callback when a file is removed from the selected list
   */
  onRemove?: (index: number) => void;
}

export interface DropZoneStateProps {
  isDragActive: boolean;
  handleDragEnter: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  handleClick: () => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  preview: string | null;
}
