import { CSSProperties } from 'react';

export type Variant = 'default' | 'info' | 'success' | 'error' | 'warning';
export type AlertStyles = {
  container?: CSSProperties;
  title?: any;
  description?: any;
  icon?: any;
};
