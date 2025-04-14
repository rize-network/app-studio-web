/**
 * LoadingIndicator Types
 */

import { ViewProps } from 'app-studio';

export type LoadingIndicatorSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type LoadingIndicatorVariant = 'spinner' | 'dots' | 'pulse' | 'typing';

export interface LoadingIndicatorStyles {
  container?: ViewProps;
  spinner?: ViewProps;
  dot?: ViewProps;
}
