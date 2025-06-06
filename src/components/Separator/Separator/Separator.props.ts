import { ViewProps } from 'app-studio';
import {
  Orientation,
  Variant,
  Thickness,
  SeparatorStyles,
} from './Separator.type';

export interface SeparatorProps extends ViewProps {
  /**
   * The orientation of the separator
   */
  orientation?: Orientation;

  /**
   * The visual style variant of the separator
   */
  variant?: Variant;

  /**
   * The thickness of the separator
   */
  thickness?: Thickness;

  /**
   * The color of the separator
   */
  color?: string;

  /**
   * The spacing around the separator
   */
  spacing?: number | string;

  /**
   * Optional label to display in the middle of the separator
   */
  label?: React.ReactNode;

  /**
   * Whether the separator has decorative purpose only
   * If true, the separator will be hidden from screen readers
   */
  decorative?: boolean;

  /**
   * Custom styles for different parts of the separator
   */
  views?: SeparatorStyles;

  /**
   * Optional theme mode override ('light' or 'dark')
   * If not provided, the component will use the theme mode from context
   */
}
