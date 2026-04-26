import { ViewProps } from 'app-studio';
import {
  ToastItem,
  ToastOptions,
  ToastPosition,
  ToastStyles,
  ToastVariant,
  ThemesType,
} from './Toast.type';
// Defines the properties for the individual Toast component, extending standard view properties.
export interface ToastProps extends Omit<ViewProps, 'theme'> {
  // An optional unique identifier for the toast instance.
  id?: string;
  // Specifies the visual style or semantic type of the toast (e.g., success, error, warning).
  variant: ToastVariant;
  // The main heading or title text displayed on the toast.
  title: string;
  // An optional detailed message or descriptive text for the toast.
  description?: string;
  // A callback function invoked when the toast is dismissed or closed.
  onClose: () => void;
  // Indicates whether the user can manually close the toast.
  isClosable?: boolean;
  // An optional callback function to execute when an action button within the toast is clicked.
  action?: () => void;
  // The text label for the optional action button.
  actionText?: string;
  // Determines if a default icon associated with the variant should be displayed.
  showIcon?: boolean;
  // The theme to apply to the toast component for styling.
  theme?: ThemesType;
  // Optional custom styles for various parts of the toast component, overriding default views.
  views?: ToastStyles;
  // The duration in milliseconds after which the toast automatically disappears.
  duration?: number;
  // A custom render function to provide entirely custom content for the toast.
  render?: (props: {
    // The unique identifier of the toast instance passed to the custom render function.
    id: string;
    // The close function for the toast, provided to the custom render function.
    onClose: () => void;
  }) => React.ReactNode;
  // An optional custom React node to be used as the toast's icon.
  icon?: React.ReactNode;
  // Controls the visibility state of the individual toast instance.
  isVisible?: boolean;
}
// Defines properties for the container responsible for managing and displaying multiple toasts.
export interface ToastContainerProps {
  // The desired screen position for the toast container (e.g., 'top-right', 'bottom-left').
  position?: ToastPosition;
  // The spacing in pixels between individual toasts within the container.
  gap?: number;
  // The maximum number of toasts that can be displayed simultaneously in the container.
  limit?: number;
  containerStyle?: React.CSSProperties;
}
// Defines the state structure and associated actions for managing the collection of toasts.
export interface ToastState {
  // An array containing all currently active toast items.
  toasts: ToastItem[];
  // A function to add a new toast to the state, returning its unique ID.
  add: (
    // The visual variant for the new toast.
    variant: ToastVariant,
    // The title for the new toast.
    title: string,
    // The optional description for the new toast.
    description?: string,
    // Optional configuration options for the new toast.
    options?: ToastOptions
  ) => string;
  // A function to remove a specific toast from the state using its ID.
  remove: (id: string) => void;
  // A function to remove all active toasts from the state.
  removeAll: () => void;
}
