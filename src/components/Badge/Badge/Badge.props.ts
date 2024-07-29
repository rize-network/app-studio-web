import { Size, Variant, Shape, Position, BadgeStyles } from './Badge.type';
import { ViewProps } from 'app-studio';

// Defines an interface 'AspectRatioProps' for component properties.
export interface BadgeProps extends Omit<ViewProps, 'content'> {
  content: string | number;
  variant?: Variant;
  colorScheme?: string;
  position?: Position;
  size?: Size;
  shape?: Shape;
  styles?: BadgeStyles;
}
