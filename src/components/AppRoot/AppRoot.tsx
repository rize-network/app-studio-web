import React from 'react';
import {
  ThemeProvider,
  ResponsiveProvider,
  WindowSizeProvider,
} from 'app-studio';
import { AppRootProps } from './AppRoot.types';

export type { AppRootProps };

/**
 * AppRoot — one entry point that mounts every App Studio provider in the right
 * order, so apps don't wire them by hand.
 *
 * Web build: Theme → Responsive → WindowSize. The native build
 * (`AppRoot.native.tsx`) additionally wraps `SafeAreaProvider` so `safeArea*`
 * props / `<SafeArea>` resolve to real device insets. Mount it once at the root:
 *
 * ```tsx
 * import { AppRoot } from '@app-studio/components';
 * export default () => <AppRoot><Screens /></AppRoot>;
 * ```
 */
export const AppRoot: React.FC<AppRootProps> = ({
  children,
  ...themeProps
}) => (
  <ThemeProvider {...themeProps}>
    <ResponsiveProvider>
      <WindowSizeProvider>{children}</WindowSizeProvider>
    </ResponsiveProvider>
  </ThemeProvider>
);
