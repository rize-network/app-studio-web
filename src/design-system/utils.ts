import {
  DesignSystemComponentConfig,
  DesignSystemComponentName,
  DesignSystemConfig,
  DesignSystemViewProps,
} from './types';

const isPlainObject = (value: unknown): value is Record<string, any> =>
  Boolean(value) &&
  typeof value === 'object' &&
  !Array.isArray(value) &&
  Object.prototype.toString.call(value) === '[object Object]';

export const normalizeDesignSystemComponentProps = <
  T extends Record<string, any>
>(
  props: T
): T => {
  return props;
};

export const deepMerge = <T extends Record<string, any> = Record<string, any>>(
  ...objects: Array<Record<string, any> | undefined>
): T => {
  const result: Record<string, any> = {};

  objects.forEach((object) => {
    if (!isPlainObject(object)) return;

    Object.entries(object).forEach(([key, value]) => {
      if (value === undefined) return;

      if (isPlainObject(value) && isPlainObject(result[key])) {
        result[key] = deepMerge(result[key], value);
        return;
      }

      result[key] = value;
    });
  });

  return result as T;
};

export const getDesignSystemComponentProps = (
  componentName: DesignSystemComponentName,
  config?: DesignSystemConfig
): DesignSystemComponentConfig => {
  if (!config) return {};
  return normalizeDesignSystemComponentProps(
    config.components[componentName] || {}
  );
};

export const mergeDesignSystemComponentProps = <T extends Record<string, any>>(
  componentName: DesignSystemComponentName,
  props: T,
  config?: DesignSystemConfig
): T => {
  const { config: localConfig, ...otherProps } = props;

  const globalConfig = getDesignSystemComponentProps(componentName, config);

  const mergedConfig = deepMerge(globalConfig, localConfig || {});

  return normalizeDesignSystemComponentProps(
    deepMerge<T>(mergedConfig as any, otherProps as any) as T
  );
};
