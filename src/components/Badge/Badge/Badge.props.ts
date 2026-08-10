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
   * When the badge's `content` is a color token (`theme-*` / `color-*`),
   * auto-derive the badge colors from it: the token becomes the background
   * and the label switches to white (used by examples that loop over theme
   * tokens for the `content` prop).
   */
  isAuto?: boolean;
  // Per-instance design-system config override; consumed by
  // `useMergedDesignSystemComponentProps('badge', …)` before rendering.
  config?: Record<string, unknown>;
}
