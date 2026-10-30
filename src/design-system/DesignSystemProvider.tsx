import React, { createContext, ReactNode, useContext, useMemo } from 'react';
import { ThemeProvider, useTheme } from 'app-studio';
import {
  defaultDesignSystemConfig,
  designSystemConfigs,
  DesignSystemConfigId,
} from './configs';
import { DesignSystemScope } from './DesignSystemScope';
import {
  DesignSystemAppearance,
  DesignSystemComponentConfig,
  DesignSystemComponentName,
  DesignSystemConfig,
  DesignSystemContextValue,
} from './types';
import {
  getDesignSystemComponentProps,
  mergeDesignSystemComponentProps,
} from './utils';

const DesignSystemContext = createContext<DesignSystemContextValue>({
  isEnabled: false,
});

export interface DesignSystemProviderProps {
  children: ReactNode;
  config?: DesignSystemConfig;
  configId?: DesignSystemConfigId | string;
  /**
   * Explicitly pin the appearance for this subtree (light/dark). When omitted,
   * the provider follows the **global** theme mode (so a light/dark toggle
   * flips the design system), falling back to the config's `defaultAppearance`
   * only when there is no surrounding ThemeProvider.
   */
  mode?: DesignSystemAppearance;
  /** Document that owns the subtree and its theme stylesheet (for iframe portals). */
  targetWindow?: Window;
  /**
   * Render no ThemeProvider of its own: colours and mode come from the
   * surrounding ThemeProvider (an app's `brand`), and this provider only
   * supplies the component configuration. Without it (the default), the
   * config's `theme` is applied through a nested ThemeProvider.
   */
  inheritTheme?: boolean;
}

export const DesignSystemProvider: React.FC<DesignSystemProviderProps> = ({
  children,
  config,
  configId,
  mode,
  targetWindow,
  inheritTheme = false,
}) => {
  const resolvedConfig =
    config ||
    (configId ? designSystemConfigs[configId as DesignSystemConfigId] : null) ||
    defaultDesignSystemConfig;

  // Follow the active global theme mode so a light/dark toggle actually flips
  // the design system. An explicit `mode` prop pins the subtree; otherwise we
  // inherit the surrounding ThemeProvider's mode and fall back to the config's
  // declared default appearance when no provider is present.
  const { themeMode } = useTheme();
  const effectiveMode: DesignSystemAppearance =
    mode ?? themeMode ?? resolvedConfig.metadata.defaultAppearance;

  const value = useMemo(
    () => ({
      config: resolvedConfig,
      configId: resolvedConfig.metadata.id,
      isEnabled: true,
    }),
    [resolvedConfig]
  );

  // Delegate token resolution to app-studio's ThemeProvider: it emits
  // `--theme-<slot>` CSS variables from the theme object and registers them
  // with its color resolver, so `theme-primary`, `theme-canvas`, etc. work
  // anywhere a component uses them. `transparentWrapper` is auto-inferred
  // (nested under another ThemeProvider) and keeps the page layout intact.
  const scoped = (
    <DesignSystemScope
      id={resolvedConfig.metadata.id}
      appearance={effectiveMode}
    >
      {children}
    </DesignSystemScope>
  );

  if (inheritTheme) {
    return (
      <DesignSystemContext.Provider value={value}>
        {scoped}
      </DesignSystemContext.Provider>
    );
  }

  return (
    <DesignSystemContext.Provider value={value}>
      {/* No cast: app-studio's `theme` prop accepts ThemeSlots, which
          DesignSystemTheme satisfies structurally. */}
      <ThemeProvider
        theme={resolvedConfig.theme}
        mode={effectiveMode}
        targetWindow={targetWindow}
        transparentWrapper
      >
        {scoped}
      </ThemeProvider>
    </DesignSystemContext.Provider>
  );
};

export const useDesignSystem = () => useContext(DesignSystemContext);

export const useDesignSystemComponentProps = (
  componentName: DesignSystemComponentName
): DesignSystemComponentConfig => {
  const { config } = useDesignSystem();
  return getDesignSystemComponentProps(componentName, config);
};

export const useMergedDesignSystemComponentProps = <
  T extends Record<string, any>
>(
  componentName: DesignSystemComponentName,
  props: T
): T => {
  const { config } = useDesignSystem();
  return mergeDesignSystemComponentProps(componentName, props, config);
};
