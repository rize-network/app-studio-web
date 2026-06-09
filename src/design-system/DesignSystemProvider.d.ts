import React, { ReactNode } from 'react';
import { DesignSystemConfigId } from './configs';
import {
  DesignSystemComponentConfig,
  DesignSystemComponentName,
  DesignSystemConfig,
  DesignSystemContextValue,
} from './types';
export interface DesignSystemProviderProps {
  children: ReactNode;
  config?: DesignSystemConfig;
  configId?: DesignSystemConfigId | string;
}
export declare const DesignSystemProvider: React.FC<DesignSystemProviderProps>;
export declare const useDesignSystem: () => DesignSystemContextValue;
export declare const useDesignSystemComponentProps: (
  componentName: DesignSystemComponentName
) => DesignSystemComponentConfig;
export declare const useMergedDesignSystemComponentProps: <
  T extends Record<string, any>
>(
  componentName: DesignSystemComponentName,
  props: T
) => T;
