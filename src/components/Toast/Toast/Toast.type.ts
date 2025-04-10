import { ViewProps } from 'app-studio';

export type ToastVariant = 'info' | 'success' | 'warning' | 'error';
export type ToastPosition =
  | 'top'
  | 'top-right'
  | 'top-left'
  | 'bottom'
  | 'bottom-right'
  | 'bottom-left';

export interface Theme {
  container: {
    backgroundColor: string;
    border: string;
  };
  content: {
    color: string;
  };
  icon: {
    color: string;
  };
}

export type ThemesType = {
  info: Theme;
  success: Theme;
  error: Theme;
  warning: Theme;
};

export interface ToastStyles {
  container?: ViewProps;
  title?: ViewProps;
  description?: ViewProps;
  icon?: ViewProps;
  closeButton?: ViewProps;
  actionButton?: ViewProps;
}

export interface ToastOptions {
  id?: string;
  duration?: number;
  position?: ToastPosition;
  isClosable?: boolean;
  onClose?: () => void;
  action?: () => void;
  actionText?: string;
  showIcon?: boolean;
  views?: ToastStyles;
  /**
   * Custom render function for complete control over toast appearance
   */
  render?: (props: { id: string; onClose: () => void }) => React.ReactNode;
  /**
   * Custom icon to display instead of the default variant icon
   */
  icon?: React.ReactNode;
}

export interface ToastItem extends ToastOptions {
  id: string;
  variant: ToastVariant;
  title: string;
  description?: string;
  createdAt: number;
  /**
   * Whether the toast is visible (for animation purposes)
   */
  isVisible?: boolean;
}
