import type { ImageProps, TextProps, ViewProps } from 'app-studio';
import { IconProps } from '../..';
// Defines the core properties for the Uploader's functional behavior, including file handling and validation logic.
export interface UseUploadProps {
  // Specifies the accepted file types, e.g., 'image/*', '.pdf', or a comma-separated list of extensions.
  accept?: string;
  // Sets the maximum allowed file size in bytes for client-side validation.
  maxSize?: number;
  // Callback function invoked when a single file is successfully selected and validated.
  onFileSelect?: (file: File) => void;
  // Callback function invoked when multiple files are successfully selected and validated.
  onMultipleFileSelect?: (files: File[]) => void;
  // A custom function to validate individual files, returning an error message string or null if valid.
  validateFile?: (file: File) => string | null;
  // Callback function triggered when an error occurs during file selection or validation.
  onError?: (error: string) => void;
  // A URL for a default thumbnail or placeholder image to display.
  thumbnail?: string;
  // Boolean flag indicating whether the user can select multiple files.
  multiple?: boolean;
}
// Defines the properties representing the internal state and element references managed by the Uploader component.
export interface UploadStateProps {
  // A handler function for the HTML file input's change event.
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // The currently selected single `File` object, or null if no file is selected.
  selectedFile: File | null;
  // An array of `File` objects when multiple file selection is enabled.
  selectedFiles: File[];
  // A React ref object pointing to the hidden HTML file input element.
  fileInputRef: React.RefObject<HTMLInputElement>;
  // A React ref object pointing to the HTML video element, used for video previews.
  videoRef: React.RefObject<HTMLVideoElement>;
}
// Defines the properties related to the visual presentation and custom rendering of the Uploader component.
export interface UploadViewProps {
  // Callback function invoked when a display-related error occurs in the view layer.
  onError?: (error: string) => void;
  // Props to be passed to the main container `View` component.
  containerProps?: ViewProps;
  // Props to be passed to the `Text` component displaying error messages.
  errorMessageProps?: TextProps;
  // Props to be passed to the `View` component wrapping the thumbnail display.
  thumbnailContainerProps?: ViewProps;
  // Props to be passed to the `View` component for the loading indicator.
  loadingProps?: ViewProps;
  // Props to be passed to the `View` component for the progress display.
  progressProps?: ViewProps;
  // Props to be passed to the `View` component containing the video preview.
  videoProps?: ViewProps;
  // Props to be passed to the `Image` component for image previews.
  imageProps?: ImageProps;
  // Props to be passed to the `Icon` component.
  iconProps?: IconProps;
  // Props to be passed to a generic `Text` component.
  textProps?: TextProps;
  // A custom render prop function to display a video preview.
  renderVideo?: (props: any) => React.ReactNode;
  // A custom render prop function to display text content.
  renderText?: (props: any) => React.ReactNode;
  // A custom render prop function to display an image preview.
  renderImage?: (props: any) => React.ReactNode;
  // A custom render prop function to display error messages.
  renderError?: (props: any) => React.ReactNode;
  // A custom render prop function to display general file information.
  renderFile?: (props: any) => React.ReactNode;
  // A custom render prop function to display upload progress.
  renderProgress?: (props: any) => React.ReactNode;
  // The URL of the file to be previewed.
  previewUrl?: string | null;
  // The URL of the thumbnail image to be displayed.
  thumbnailUrl?: string | null;
  // The error message string to display to the user.
  errorMessage?: string | null;
  // Boolean indicating whether the Uploader is in a loading state.
  isLoading?: boolean;
  // A React node to be rendered as the main icon within the Uploader.
  icon?: React.ReactNode;
  // Specifies the accepted file types for the upload input field.
  accept?: string;
  // The text content to be displayed within the Uploader's interface.
  text?: string;
  // The maximum allowed file size in bytes, used for validation in the view.
  maxSize?: number;
  // The current upload progress, typically a number between 0 and 100.
  progress?: number;
  // Indicates the type of file currently being handled ('video', 'image', or 'file').
  fileType?: 'video' | 'image' | 'file';
  // A handler function invoked when the Uploader's clickable area is interacted with.
  handleClick?: () => void;
  // Callback function to be executed when a single file is selected in the view.
  onFileSelect?: (file: File) => void;
  // Callback function to be executed when multiple files are selected in the view.
  onMultipleFileSelect?: (files: File[]) => void;
  // A custom validation function for files selected via the view.
  validateFile?: (file: File) => string | null;
  // Boolean flag enabling or disabling multiple file selection.
  multiple?: boolean;
  // An object containing nested style or component props for specific sub-views.
  views?: {
    // Props for the main container within the `views` object.
    container?: ViewProps;
    // Generic props for a view component within the `views` object.
    view?: ViewProps;
    // Props for an image component within the `views` object.
    image?: ImageProps;
    // Props for a horizontal layout view within the `views` object.
    horizontal?: ViewProps;
    // Props for a text component within the `views` object.
    text?: ViewProps;
  };
}
// Combines all properties from `UseUploadProps` and `UploadViewProps` to form the complete set of props for the Uploader component.
export interface UploadProps extends UseUploadProps, UploadViewProps {}
