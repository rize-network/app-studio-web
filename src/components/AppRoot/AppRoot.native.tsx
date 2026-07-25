import React from 'react';
import {
  ThemeProvider,
  ResponsiveProvider,
  WindowSizeProvider,
} from 'app-studio';
import { AppRootProps } from './AppRoot.types';
import { ModalRouter } from '../Modal/Modal';

export type { AppRootProps };

// `react-native-safe-area-context` is an OPTIONAL peer — lazy-require so apps
// that don't use safe-area props don't need the dependency. When present, its
// SafeAreaProvider measures device insets and feeds them to every `safeArea*`
// prop / `<SafeArea>` rendered below.
let SafeAreaProvider: React.ComponentType<{
  children?: React.ReactNode;
}> | null = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  SafeAreaProvider = require('react-native-safe-area-context').SafeAreaProvider;
} catch {
  SafeAreaProvider = null;
}

/**
 * AppRoot (native) — SafeAreaProvider → Theme → Responsive → WindowSize.
 * Falls back to no SafeAreaProvider when the peer isn't installed (safe-area
 * props then resolve to zero insets instead of crashing).
 */
export const AppRoot: React.FC<AppRootProps> = ({
  children,
  modals,
  onModalShow,
  onModalHide,
  ...themeProps
}) => {
  const tree = (
    <ThemeProvider {...themeProps}>
      <ResponsiveProvider>
        <WindowSizeProvider>
          {children}
          {modals && (
            <ModalRouter
              modals={modals}
              onShow={onModalShow}
              onHide={onModalHide}
            />
          )}
        </WindowSizeProvider>
      </ResponsiveProvider>
    </ThemeProvider>
  );

  const Provider = SafeAreaProvider;
  return Provider ? <Provider>{tree}</Provider> : tree;
};
