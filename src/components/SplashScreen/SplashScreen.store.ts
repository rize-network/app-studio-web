import { create } from 'zustand';

/**
 * Splash state machine, mirroring the original app-demo SplashLayout
 * (`started` / `loaded`) but framework-agnostic (zustand instead of Redux) and
 * with NO `react-native-bootsplash` dependency — the overlay is pure JS so it
 * works on web and native alike.
 */
export interface SplashState {
  // The app has begun its first render / bootstrap.
  started: boolean;
  // The app finished loading; the splash should animate out.
  loaded: boolean;
  setStarted: (value?: boolean) => void;
  setLoaded: (value?: boolean) => void;
  reset: () => void;
}

export const useSplashStore = create<SplashState>((set) => ({
  started: false,
  loaded: false,
  setStarted: (value = true) => set({ started: value }),
  setLoaded: (value = true) => set({ loaded: value }),
  reset: () => set({ started: false, loaded: false }),
}));

/** Imperatively flag the app as loaded, dismissing the splash. */
export const setSplashLoaded = (value = true) =>
  useSplashStore.getState().setLoaded(value);

/** Imperatively flag the app as started. */
export const setSplashStarted = (value = true) =>
  useSplashStore.getState().setStarted(value);
