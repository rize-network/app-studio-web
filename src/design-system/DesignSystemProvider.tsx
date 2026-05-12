import React, { createContext, ReactNode, useContext, useMemo } from 'react';
import { ThemeProvider, type Theme as AppStudioTheme } from 'app-studio';
import {
  defaultDesignSystemConfig,
  designSystemConfigs,
  DesignSystemConfigId,
} from './configs';
import {
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
}

export const DesignSystemProvider: React.FC<DesignSystemProviderProps> = ({
  children,
  config,
  configId,
}) => {
  const resolvedConfig =
    config ||
    (configId ? designSystemConfigs[configId as DesignSystemConfigId] : null) ||
    defaultDesignSystemConfig;

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
        mode={resolvedConfig.metadata.defaultAppearance}
        transparentWrapper
      >
        <div
          data-design-system={resolvedConfig.metadata.id}
          data-appearance={resolvedConfig.metadata.defaultAppearance}
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
