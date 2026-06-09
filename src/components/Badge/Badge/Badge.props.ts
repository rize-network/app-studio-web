import { Size, Variant, Shape, Position, BadgeStyles } from './Badge.type';
import { ViewProps } from 'app-studio';

// Defines an interface 'AspectRatioProps' for component properties.
export interface BadgeProps extends Omit<ViewProps, 'content' | 'position'> {
  content?: string | number;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  pastil?: boolean | string;
  pastilContent?: React.ReactNode;
  action?: React.ReactNode;
  variant?: Variant;
  position?: Position;
  size?: Size;
  shape?: Shape;
  views?: BadgeStyles;
  /**
   * Auto-derive a foreground color from the badge's background color
   * (used by examples that loop over theme tokens for the `content` prop).
   */
  isAuto?: boolean;
  config?: Record<string, unknown>;
}
