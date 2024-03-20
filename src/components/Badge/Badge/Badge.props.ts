import { Size, Variant, Shape, Position, BadgeStyles } from './Badge.type';
// Imports custom type definitions for the Badge component such as size, variant, etc.
export interface BadgeProps {
// Defines a TypeScript interface for the Badge component props.
  content: string | number;
// Mandatory content of the badge, can be a string or a number.
  variant?: Variant;
// Optional variant, controls the visual style of the badge (e.g., success, warning, etc).
  colorScheme?: string;
// Optional color scheme, likely to define the foreground and background colors.
  position?: Position;
// Optional position, possibly to set the badge's position in relation to its parent element.
  size?: Size;
// Optional size, could be predefined sizes for the badge (e.g., small, medium, large).
  shape?: Shape;
// Optional shape, to define the badge geometry (e.g., circle, square, rounded corners).
  styles?: BadgeStyles;
// Optional styles, perhaps to provide additional inline styling or CSS classes.
  [x: string]: any;
// Allows for additional properties not explicitly defined in the interface.
}
