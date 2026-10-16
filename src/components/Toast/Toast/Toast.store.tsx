import { create } from 'zustand';
import { ToastState } from './Toast.props';
import { ToastOptions, ToastVariant } from './Toast.type';
// Generates a unique identifier for each toast notification.
const generateId = () => Math.random().toString(36).substring(2, 9);
// Stores a map of toast IDs to their corresponding timeout IDs, used for clearing timers if a toast is dismissed manually.
let timeouts = new Map<string, NodeJS.Timeout>();
// Initializes the Zustand store for managing toast notifications, providing state and actions to interact with the toasts.
export const useToastStore = create<ToastState>((set) => ({
  // Represents the array of active toast notifications currently in the store's state.
  toasts: [],
  // Action function to add a new toast notification to the state.
  add: (variant, title, description, options = {}) => {
    // Assigns a unique ID to the toast; uses a provided ID from options or generates a new one.
    const id = options.id || generateId();
    // Constructs the toast object with its properties, including ID, variant, title, description, creation timestamp, visibility, and any additional options.
    const toast = {
      id,
      variant,
      title,
      description,
      createdAt: Date.now(),
      isVisible: true,
      ...options,
    };
    // Updates the store's state by appending the newly created toast to the existing array of toasts.
    set((state: any) => ({
      toasts: [...state.toasts, toast],
    }));
    // Conditionally sets a timeout to automatically remove the toast after a specified duration, unless `duration` is explicitly set to 0.
    if (options.duration !== 0) {
      // Determines the toast's display duration, defaulting to 5000ms if not explicitly provided in options.
      const duration = options.duration || 5000;
      // Creates a timer that, upon completion, triggers the removal of the toast from the state.
      const timerId = setTimeout(() => {
        useToastStore.getState().remove(id);
      }, duration);
      // Stores the `timerId` associated with the toast's unique ID, allowing for manual clearing of the timeout.
      timeouts.set(id, timerId);
    }
    // Returns the unique identifier of the newly added toast.
    return id;
  },
  // Action function to initiate the removal process for a specific toast by its ID.
  remove: (id) => {
    // Updates the toast's `isVisible` property to `false`, allowing for exit animations before permanent removal.
    set((state) => ({
      toasts: state.toasts.map((toast: any) =>
        toast.id === id ? { ...toast, isVisible: false } : toast
      ),
    }));
    // Checks if an active timeout exists for the specified toast ID.
    if (timeouts.has(id)) {
      // Clears any active timeout associated with the toast, preventing it from being removed prematurely or twice.
      clearTimeout(timeouts.get(id)!);
      // Removes the toast's timeout ID from the `timeouts` map.
      timeouts.delete(id);
    }
    // After a short delay (300ms, typically for animation), permanently filters the toast out of the `toasts` array from the state.
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((toast) => toast.id !== id),
      }));
    }, 300);
  },
  // Action function to remove all current toast notifications from the display and state.
  removeAll: () => {
    // Iterates through all stored timeout IDs and clears each associated timer.
    timeouts.forEach(clearTimeout);
    // Clears the map that stores all toast timeout IDs.
    timeouts.clear();
    // Updates the state by marking all toasts as invisible to trigger their exit animations.
    set((state) => ({
      toasts: state.toasts.map((toast) => ({ ...toast, isVisible: false })),
    }));
    // After an animation delay, completely clears the `toasts` array from the state, effectively removing all toasts.
    setTimeout(() => {
      set({ toasts: [] });
    }, 300);
  },
}));
// Public function to display a toast notification with a specified variant, title, description, and optional settings.
export const showToast = (
  variant: ToastVariant,
  title: string,
  description?: string,
  options?: ToastOptions
) => {
  // Delegates the actual toast creation and display logic to the `add` action of the Zustand store.
  return useToastStore.getState().add(variant, title, description, options);
};
// Convenience function to display a toast notification with the 'info' variant pre-set.
export const showInfoToast = (
  title: string,
  description?: string,
  options?: ToastOptions
) => {
  // Calls the generic `showToast` function with the 'info' variant to display the toast.
  return showToast('info', title, description, options);
};
// Convenience function to display a toast notification with the 'success' variant pre-set.
export const showSuccessToast = (
  title: string,
  description?: string,
  options?: ToastOptions
) => {
  // Calls the generic `showToast` function with the 'success' variant to display the toast.
  return showToast('success', title, description, options);
};
// Convenience function to display a toast notification with the 'warning' variant pre-set.
export const showWarningToast = (
  title: string,
  description?: string,
  options?: ToastOptions
) => {
  // Calls the generic `showToast` function with the 'warning' variant to display the toast.
  return showToast('warning', title, description, options);
};
// Convenience function to display a toast notification with the 'error' variant pre-set.
export const showErrorToast = (
  title: string,
  description?: string,
  options?: ToastOptions
) => {
  // Calls the generic `showToast` function with the 'error' variant to display the toast.
  return showToast('error', title, description, options);
};
// Public function to remove a specific toast by its unique ID.
export const removeToast = (id: string) => {
  // Delegates the actual toast removal logic to the `remove` action of the Zustand store.
  useToastStore.getState().remove(id);
};
// Public function to remove all active toast notifications.
export const removeAllToasts = () => {
  // Delegates the actual removal of all toasts to the `removeAll` action of the Zustand store.
  useToastStore.getState().removeAll();
};
