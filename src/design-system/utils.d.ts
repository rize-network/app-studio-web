import {
  DesignSystemComponentConfig,
  DesignSystemComponentName,
  DesignSystemConfig,
} from './types';
export declare const normalizeDesignSystemComponentProps: <
  T extends Record<string, any>
>(
  props: T
) => T;
export declare const deepMerge: <
  T extends Record<string, any> = Record<string, any>
>(
  ...objects: Array<Record<string, any> | undefined>
) => T;
export declare const getDesignSystemComponentProps: (
  componentName: DesignSystemComponentName,
  config?: DesignSystemConfig
) => DesignSystemComponentConfig;
export declare const mergeDesignSystemComponentProps: <
  T extends Record<string, any>
>(
  componentName: DesignSystemComponentName,
  props: T,
  config?: DesignSystemConfig
) => T;
