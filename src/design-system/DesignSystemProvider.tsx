import React, { createContext, ReactNode, useContext, useMemo } from 'react';
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

  return (
    <DesignSystemContext.Provider value={value}>
      {children}
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
