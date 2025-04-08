import { create } from 'zustand';
import { ToastState } from './Toast.props';
import { ToastOptions, ToastVariant } from './Toast.type';

// Generate a unique ID for each toast
const generateId = () => Math.random().toString(36).substring(2, 9);

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
      ...options,
    };

    set((state) => ({
      toasts: [...state.toasts, toast],
    }));

    return id;
  },
  remove: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
  removeAll: () => {
    set({ toasts: [] });
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
