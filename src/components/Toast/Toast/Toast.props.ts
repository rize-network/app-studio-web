import {
  ToastItem,
  ToastOptions,
  ToastPosition,
  ToastStyles,
  ToastVariant,
  ThemesType,
} from './Toast.type';

export interface ToastProps {
  /**
   * The variant of the toast
   */
  variant: ToastVariant;

  /**
   * The title of the toast
   */
  title: string;

  /**
   * The description of the toast (optional)
   */
  description?: string;

  /**
   * Function to close the toast
   */
  onClose: () => void;

  /**
   * Whether the toast should have a close button
   */
  isClosable?: boolean;

  /**
   * Function to execute when the action button is clicked
   */
  action?: () => void;

  /**
   * Text for the action button
   */
  actionText?: string;

  /**
   * Whether to show an icon based on the variant
   */
  showIcon?: boolean;

  /**
   * Custom theme for the toast
   */
  theme?: ThemesType;

  /**
   * Custom styles for different parts of the toast
   */
  views?: ToastStyles;

  /**
   * Duration in milliseconds before the toast auto-closes
   */
  duration?: number;
}

export interface ToastContainerProps {
  /**
   * The position of the toast container
   */
  position?: ToastPosition;

  /**
   * The gap between toasts
   */
  gap?: number;

  /**
   * The maximum number of toasts to show at once
   */
  limit?: number;

  /**
   * Custom styles for the container
   */
  containerStyle?: React.CSSProperties;
}

export interface ToastState {
  toasts: ToastItem[];
  add: (
    variant: ToastVariant,
    title: string,
    description?: string,
    options?: ToastOptions
  ) => string;
  remove: (id: string) => void;
  removeAll: () => void;
}
