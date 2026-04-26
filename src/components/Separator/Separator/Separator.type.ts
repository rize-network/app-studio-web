import { ViewProps } from 'app-studio';
// Defines the possible orientations for the Separator component, allowing it to be displayed either horizontally or vertically.
export type Orientation = 'horizontal' | 'vertical';
// Specifies the visual style or pattern of the Separator line, such as a solid, dashed, or dotted line.
export type Variant = 'solid' | 'dashed' | 'dotted';
// Determines the thickness of the Separator line, providing options like thin, medium, or thick.
export type Thickness = 'thin' | 'medium' | 'thick';
// Defines the style properties available for different parts of the Separator component.
export interface SeparatorStyles {
  // Optional style properties for the main container wrapping the Separator.
  container?: ViewProps;
  // Optional style properties for the label displayed within the Separator, if any.
  label?: ViewProps;
}
