import type { ViewProps, TextProps, ImageProps } from 'app-studio';
import { UseUploadProps } from '../../Uploader/Uploader/Uploader.props';
// Defines the properties available for the `DropZone` component, extending `UseUploadProps` for upload-specific functionalities.
export interface DropZoneProps extends UseUploadProps {
  // Represents the content to be rendered inside the `DropZone`.
  children?: React.ReactNode;
  // Defines styling and layout properties for the main container of the `DropZone` component.
  containerProps?: ViewProps;
  // Specifies the main text to be displayed within the `DropZone`.
  text?: string;
  // Defines styling and layout properties for the text displayed within the `DropZone`.
  textProps?: TextProps;
  // Allows passing a CSS class name to style the `DropZone` component.
  className?: string;
  // Indicates whether the `DropZone` component is in a disabled state, preventing user interaction.
  disabled?: boolean;
  // Defines properties for any image displayed within the `DropZone`, such as a preview image.
  imageProps?: ImageProps;
  // The URL of an image to be displayed as a preview in the `DropZone`.
  previewUrl?: string | null;
  // An array of `File` objects representing the files currently selected or uploaded in the `DropZone`.
  selectedFiles?: File[];
  // Callback function invoked when a file needs to be removed from the `DropZone`.
  // Parameters: `index` (number) - The position of the file to be removed.
  onRemove?: (index: number) => void;
}
// Defines properties related to the internal state and event handlers for the `DropZone` component.
export interface DropZoneStateProps {
  // Indicates whether a drag operation is currently active over the `DropZone`.
  isDragActive: boolean;
  // Event handler for when a draggable element enters the `DropZone` area.
  // Parameters: `e` (React.DragEvent<HTMLDivElement>) - The drag event object.
  handleDragEnter: (e: React.DragEvent<HTMLDivElement>) => void;
  // Event handler for when a draggable element leaves the `DropZone` area.
  // Parameters: `e` (React.DragEvent<HTMLDivElement>) - The drag event object.
  handleDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  // Event handler for when a draggable element is being dragged over the `DropZone` area.
  // Parameters: `e` (React.DragEvent<HTMLDivElement>) - The drag event object.
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  // Event handler for when a draggable element is dropped onto the `DropZone` area.
  // Parameters: `e` (React.DragEvent<HTMLDivElement>) - The drag event object containing the dropped files.
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  // Event handler for when the `DropZone` area is clicked, typically to open the file selection dialog.
  handleClick: () => void;
  // Event handler for when files are selected via the file input element.
  // Parameters: `e` (React.ChangeEvent<HTMLInputElement>) - The change event object from the file input.
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // A ref object used to directly access and manipulate the hidden file input element.
  inputRef: React.RefObject<HTMLInputElement>;
  // The URL of the file currently selected for preview, or `null` if no file is selected.
  preview: string | null;
}
