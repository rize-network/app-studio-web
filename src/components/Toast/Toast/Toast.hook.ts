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
// Defines and exports the `useToast` custom React hook, providing an interface to interact with the Toast notification system.
export const useToast = () => {
  return {
    // A generic method to display a toast notification with specified `variant`, `title`, optional `description`, and `options`.
    toast: (
      variant: ToastVariant,
      title: string,
      description?: string,
      options?: ToastOptions
    ) => showToast(variant, title, description, options),
    // Displays an information toast notification with a `title`, optional `description`, and `options`.
    info: (title: string, description?: string, options?: ToastOptions) =>
      showInfoToast(title, description, options),
    // Displays a success toast notification with a `title`, optional `description`, and `options`.
    success: (title: string, description?: string, options?: ToastOptions) =>
      showSuccessToast(title, description, options),
    // Displays a warning toast notification with a `title`, optional `description`, and `options`.
    warning: (title: string, description?: string, options?: ToastOptions) =>
      showWarningToast(title, description, options),
    // Displays an error toast notification with a `title`, optional `description`, and `options`.
    error: (title: string, description?: string, options?: ToastOptions) =>
      showErrorToast(title, description, options),
    // Removes a specific toast notification from display using its unique `id`.
    remove: (id: string) => removeToast(id),
    // Clears all currently displayed toast notifications.
    removeAll: () => removeAllToasts(),
  };
};
