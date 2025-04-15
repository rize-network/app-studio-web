import { create } from 'zustand';
import { ToastState } from './Toast.props';
import { ToastOptions, ToastVariant } from './Toast.type';

// Generate a unique ID for each toast
const generateId = () => Math.random().toString(36).substring(2, 9);

// Create a ref to store timeouts for cleanup
let timeouts = new Map<string, NodeJS.Timeout>();

// Create the toast store
export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  add: (variant, title, description, options = {}) => {
    const id = options.id || generateId();
    const toast = {
      id,
      variant,
      title,
      description,
      createdAt: Date.now(),
      isVisible: true, // For animation purposes
      ...options,
    };

    set((state: any) => ({
      toasts: [...state.toasts, toast],
    }));

    // Set up auto-dismiss timeout if duration is provided
    if (options.duration !== 0) {
      const duration = options.duration || 5000; // Default 5 seconds
      const timerId = setTimeout(() => {
        useToastStore.getState().remove(id);
      }, duration);

      // Store the timeout for cleanup
      timeouts.set(id, timerId);
    }

    return id;
  },
  remove: (id) => {
    // First set isVisible to false for animation
    set((state) => ({
      toasts: state.toasts.map((toast: any) =>
        toast.id === id ? { ...toast, isVisible: false } : toast
      ),
    }));

    // Clear any existing timeout
    if (timeouts.has(id)) {
      clearTimeout(timeouts.get(id)!);
      timeouts.delete(id);
    }

    // Then remove after a short delay to allow for animation
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((toast) => toast.id !== id),
      }));
    }, 300); // Animation duration
  },
  removeAll: () => {
    // Clear all timeouts
    timeouts.forEach(clearTimeout);
    timeouts.clear();

    // Set all toasts to invisible first for animation
    set((state) => ({
      toasts: state.toasts.map((toast) => ({ ...toast, isVisible: false })),
    }));

    // Then remove after animation delay
    setTimeout(() => {
      set({ toasts: [] });
    }, 300);
  },
}));

// Helper functions to show different types of toasts
export const showToast = (
  variant: ToastVariant,
  title: string,
  description?: string,
  options?: ToastOptions
) => {
  return useToastStore.getState().add(variant, title, description, options);
};

export const showInfoToast = (
  title: string,
  description?: string,
  options?: ToastOptions
) => {
  return showToast('info', title, description, options);
};

export const showSuccessToast = (
  title: string,
  description?: string,
  options?: ToastOptions
) => {
  return showToast('success', title, description, options);
};

export const showWarningToast = (
  title: string,
  description?: string,
  options?: ToastOptions
) => {
  return showToast('warning', title, description, options);
};

export const showErrorToast = (
  title: string,
  description?: string,
  options?: ToastOptions
) => {
  return showToast('error', title, description, options);
};

export const removeToast = (id: string) => {
  useToastStore.getState().remove(id);
};

export const removeAllToasts = () => {
  useToastStore.getState().removeAll();
};
