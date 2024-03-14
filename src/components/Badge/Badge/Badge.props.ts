import { Size, Variant, Shape, Position } from './Badge.type';

export interface BadgeProps {
  content: string | number;
  variant?: Variant;
  colorScheme?: string;
  position?: Position;
  size?: Size;
  shape?: Shape;
  [x: string]: any;
}
