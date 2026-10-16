import { ViewProps } from 'app-studio';
import {
  Orientation,
  Variant,
  Thickness,
  SeparatorStyles,
} from './Separator.type';
export interface SeparatorProps extends ViewProps {
  // Defines the orientation of the separator, either horizontal or vertical.
  orientation?: Orientation;
  // Specifies the visual variant of the separator, such as solid, dashed, or dotted.
  variant?: Variant;
  // Sets the thickness of the separator line.
  thickness?: Thickness;
  // Determines the color of the separator line.
  color?: string;
  // Controls the space around the separator.
  spacing?: number | string;
  // Provides content to be displayed within or alongside the separator, often text or an icon.
  label?: React.ReactNode;
  // Indicates whether the separator is purely decorative (true) or has semantic meaning (false).
  decorative?: boolean;
  // Allows for custom styling of different parts of the separator component.
  views?: SeparatorStyles;
}
