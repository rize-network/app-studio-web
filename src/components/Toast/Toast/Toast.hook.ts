import { ToastOptions, ToastVariant } from './Toast.type';
import {
  showToast,
  showInfoToast,
  showSuccessToast,
  showWarningToast,
  showErrorToast,
  removeToast,
  removeAllToasts,
} from './Toast.store';

/**
 * Hook for using Toast functionality within components
 * @returns Object with methods to show and manage toasts
 */
export const useToast = () => {
  return {
    /**
     * Show a toast with the specified variant
     */
    toast: (
      variant: ToastVariant,
      title: string,
      description?: string,
      options?: ToastOptions
    ) => showToast(variant, title, description, options),

    /**
     * Show an info toast
     */
    info: (title: string, description?: string, options?: ToastOptions) =>
      showInfoToast(title, description, options),

    /**
     * Show a success toast
     */
    success: (title: string, description?: string, options?: ToastOptions) =>
      showSuccessToast(title, description, options),

    /**
     * Show a warning toast
     */
    warning: (title: string, description?: string, options?: ToastOptions) =>
      showWarningToast(title, description, options),

    /**
     * Show an error toast
     */
    error: (title: string, description?: string, options?: ToastOptions) =>
      showErrorToast(title, description, options),

    /**
     * Remove a specific toast by ID
     */
    remove: (id: string) => removeToast(id),

    /**
     * Remove all toasts
     */
    removeAll: () => removeAllToasts(),
  };
};
