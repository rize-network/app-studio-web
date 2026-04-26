import { ViewProps } from 'app-studio';
// Defines the available variants or types for a toast notification, such as 'info', 'success', 'warning', or 'error'.
export type ToastVariant = 'info' | 'success' | 'warning' | 'error';
// Specifies the possible screen positions where a toast notification can be displayed.
export type ToastPosition =
  | 'top'
  | 'top-right'
  | 'top-left'
  | 'bottom'
  | 'bottom-right'
  | 'bottom-left';
// Defines the theme structure for a toast, including styling for the container, content, and icon.
export interface Theme {
  container: {
    // Specifies the background color of the toast container.
    backgroundColor: string;
    // Defines the border style or color for the toast container.
    border: string;
  };
  content: {
    // Specifies the text color for the toast's content (title/description).
    color: string;
  };
  icon: {
    // Specifies the color for the toast's icon.
    color: string;
  };
}
// Defines a mapping of each ToastVariant to its corresponding Theme object.
export type ThemesType = {
  // Represents the theme configuration for 'info' variant toasts.
  info: Theme;
  // Represents the theme configuration for 'success' variant toasts.
  success: Theme;
  // Represents the theme configuration for 'error' variant toasts.
  error: Theme;
  // Represents the theme configuration for 'warning' variant toasts.
  warning: Theme;
};
// Defines optional custom styles that can be applied to various parts of the toast component using ViewProps.
export interface ToastStyles {
  // Optional custom styles for the main container of the toast.
  container?: ViewProps;
  // Optional custom styles for the toast's title component.
  title?: ViewProps;
  // Optional custom styles for the toast's description component.
  description?: ViewProps;
  // Optional custom styles for the toast's icon component.
  icon?: ViewProps;
  // Optional custom styles for the toast's close button.
  closeButton?: ViewProps;
  // Optional custom styles for the toast's action button.
  actionButton?: ViewProps;
}
// Defines the optional configuration properties that can be passed when creating or updating a toast notification.
export interface ToastOptions {
  // An optional unique identifier for the toast. If not provided, one will be generated.
  id?: string;
  // The optional time in milliseconds after which the toast will automatically close. Set to 0 for infinite duration.
  duration?: number;
  // The optional screen position where the toast should be displayed, overriding the default.
  position?: ToastPosition;
  // A boolean indicating if the toast can be manually closed by the user.
  isClosable?: boolean;
  // An optional callback function to be executed when the toast is closed.
  onClose?: () => void;
  // An optional callback function to be executed when the toast's action button is pressed.
  action?: () => void;
  // The optional text to display on the action button within the toast.
  actionText?: string;
  // A boolean indicating whether to display an icon in the toast.
  showIcon?: boolean;
  // Optional custom style overrides for different elements of the toast component.
  views?: ToastStyles;
  // An optional custom render function to provide a completely custom UI for the toast.
  render?: (props: { id: string; onClose: () => void }) => React.ReactNode;
  // An optional custom React node to use as the icon for the toast.
  icon?: React.ReactNode;
}
// Defines the structure of a single toast item, extending ToastOptions with mandatory and runtime properties.
export interface ToastItem extends ToastOptions {
  // The unique identifier for the toast item.
  id: string;
  // The visual variant or type of the toast (e.g., 'info', 'success').
  variant: ToastVariant;
  // The main title text for the toast notification.
  title: string;
  // An optional detailed description text for the toast.
  description?: string;
  // A timestamp indicating when the toast item was created, used for ordering or duration calculations.
  createdAt: number;
  // An optional boolean flag indicating the current visibility state of the toast item.
  isVisible?: boolean;
}
