import { Size, Variant, Shape, Position, BadgeStyles } from './Badge.type';

export interface BadgeProps {
  content: string | number;
  variant?: Variant;
  colorScheme?: string;
  position?: Position;
  size?: Size;
  shape?: Shape;
  styles?: BadgeStyles;
  [x: string]: any;
}
