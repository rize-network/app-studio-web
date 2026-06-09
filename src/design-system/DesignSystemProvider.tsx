import React, { createContext, ReactNode, useContext, useMemo } from 'react';
import {
  ThemeProvider,
  useTheme,
  type Theme as AppStudioTheme,
} from 'app-studio';
import {
  defaultDesignSystemConfig,
  designSystemConfigs,
  DesignSystemConfigId,
} from './configs';
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
}

export const DesignSystemProvider: React.FC<DesignSystemProviderProps> = ({
  children,
  config,
  configId,
  mode,
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
  return (
    <DesignSystemContext.Provider value={value}>
      <ThemeProvider
        theme={resolvedConfig.theme as Partial<AppStudioTheme>}
        mode={effectiveMode}
        transparentWrapper
      >
        <div
          data-design-system={resolvedConfig.metadata.id}
          data-appearance={effectiveMode}
          style={{ display: 'contents' }}
        >
          {children}
        </div>
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
