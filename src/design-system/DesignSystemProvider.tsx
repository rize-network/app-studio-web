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

const hexToRgbTriplet = (hex: string): string | null => {
  if (!hex || typeof hex !== 'string') return null;
  const normalized = hex.replace('#', '');
  if (!/^([0-9a-f]{6}|[0-9a-f]{3})$/i.test(normalized)) return null;
  const full =
    normalized.length === 3
      ? normalized
          .split('')
          .map((c) => c + c)
          .join('')
      : normalized;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `${r}, ${g}, ${b}`;
};

const buildThemeCssVars = (
  config: DesignSystemConfig
): React.CSSProperties => {
  const theme = config.theme;
  const slotToVar: Record<string, string> = {
    primary: '--theme-primary',
    secondary: '--theme-secondary',
    success: '--theme-success',
    warning: '--theme-warning',
    error: '--theme-error',
    canvas: '--theme-canvas',
    surface: '--theme-surface',
    text: '--theme-text',
    muted: '--theme-muted',
    border: '--theme-border',
    onPrimary: '--theme-on-primary',
  };
  const vars: Record<string, string> = {};
  Object.entries(slotToVar).forEach(([slot, cssVar]) => {
    const value = (theme as any)[slot];
    if (typeof value === 'string') {
      vars[cssVar] = value;
      const rgb = hexToRgbTriplet(value);
      if (rgb) vars[`${cssVar}-rgb`] = rgb;
    }
  });
  // Convenience aliases used in component CSS
  if (theme.muted) vars['--theme-text-secondary'] = theme.muted;
  return vars as React.CSSProperties;
};

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

  const cssVars = useMemo(
    () => buildThemeCssVars(resolvedConfig),
    [resolvedConfig]
  );

  return (
    <DesignSystemContext.Provider value={value}>
      <div
        data-design-system={resolvedConfig.metadata.id}
        data-appearance={resolvedConfig.metadata.defaultAppearance}
        style={{
          ...cssVars,
          display: 'contents',
        }}
      >
        {children}
      </div>
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
