import { create } from 'zustand';

/**
 * A single entry in the navigation history.
 */
export interface HistoryEntry {
  path: string;
  params: Record<string, any>;
}

export interface RouterState {
  // The full history stack (index 0 = first visited).
  stack: HistoryEntry[];
  // Position of the current entry within `stack`.
  index: number;
  // Navigate to a new path, truncating any forward history.
  push: (path: string, params?: Record<string, any>) => void;
  // Replace the current entry in place (no new history step).
  replace: (path: string, params?: Record<string, any>) => void;
  // Go back one entry. Returns false when already at the root.
  back: () => boolean;
  // Move by a relative delta within the stack.
  go: (delta: number) => void;
  // Clear the stack and start fresh at `path`.
  reset: (path: string, params?: Record<string, any>) => void;
}

/**
 * The cross-platform history store. This is the single source of truth shared
 * by web and native — replacing the original app-demo RouterLayout's reliance
 * on `react-router-native` + a global history singleton. The store is plain
 * zustand, so it works identically on both platforms and can be driven
 * imperatively from anywhere via `navigate` / `goBack`.
 */
export const useRouterStore = create<RouterState>((set, get) => ({
  stack: [{ path: '/', params: {} }],
  index: 0,
  push: (path, params = {}) =>
    set((state) => {
      const stack = state.stack.slice(0, state.index + 1);
      stack.push({ path, params });
      return { stack, index: stack.length - 1 };
    }),
  replace: (path, params = {}) =>
    set((state) => {
      const stack = state.stack.slice();
      stack[state.index] = { path, params };
      return { stack };
    }),
  back: () => {
    const { index } = get();
    if (index <= 0) return false;
    set({ index: index - 1 });
    return true;
  },
  go: (delta) =>
    set((state) => ({
      index: Math.min(Math.max(state.index + delta, 0), state.stack.length - 1),
    })),
  reset: (path, params = {}) => set({ stack: [{ path, params }], index: 0 }),
}));

/** Imperatively navigate to a path from outside React. */
export const navigate = (path: string, params?: Record<string, any>) =>
  useRouterStore.getState().push(path, params);

/** Imperatively go back. Returns false when already at the root. */
export const goBack = (): boolean => useRouterStore.getState().back();
