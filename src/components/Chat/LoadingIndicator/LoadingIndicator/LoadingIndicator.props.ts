/**
 * LoadingIndicator Props
 */

import { ViewProps } from 'app-studio';
import {
  LoadingIndicatorSize,
  LoadingIndicatorVariant,
  LoadingIndicatorStyles,
} from './LoadingIndicator.type';

export interface LoadingIndicatorProps extends ViewProps {
  /**
   * Size of the loading indicator
   */
  size?: LoadingIndicatorSize;

  /**
   * Variant of the loading indicator
   */
  variant?: LoadingIndicatorVariant;

  /**
   * Color of the loading indicator
   */
  color?: string;

  /**
   * Text to display alongside the loading indicator
   */
  text?: string;

  /**
   * Custom styles for the component
   */
  styles?: LoadingIndicatorStyles;
}
