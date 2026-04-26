import { ViewProps } from 'app-studio';
// Defines the visual style variant for the ColorPicker component.
export type Variant = 'outline' | 'default' | 'filled';
// Defines the shape options for the ColorPicker component or its elements.
export type Shape = 'default' | 'square' | 'rounded' | 'pill';
// Defines the size options for the ColorPicker component.
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
// Defines a type for custom styling properties for various internal parts of the ColorPicker component.
export type ColorPickerStyles = {
  // Optional styling properties for the main container of the ColorPicker.
  container?: ViewProps;
  // Optional styling properties for the element that triggers the color picker dropdown.
  trigger?: ViewProps;
  // Optional styling properties for the dropdown panel containing the color selection UI.
  dropdown?: ViewProps;
  // Optional styling properties for the color grid or palette section within the dropdown.
  colorGrid?: ViewProps;
  // Optional styling properties for individual color swatches in the grid or recent colors display.
  colorSwatch?: ViewProps;
  // Optional styling properties for the custom input field, often used for manual hex/RGB/HSL entry.
  customInput?: ViewProps;
  // Optional styling properties for the section displaying recently selected colors.
  recentColors?: ViewProps;
  // Optional styling properties for the label associated with the ColorPicker.
  label?: ViewProps;
  // Optional styling properties for the helper text providing additional information or instructions.
  helperText?: ViewProps;
};
// Defines the supported color formats for input or output values, such as 'hex', 'rgb', or 'hsl'.
export type ColorFormat = 'hex' | 'rgb' | 'hsl';
// Defines a type representing a color value across multiple formats (hex, RGB, HSL).
export type ColorValue = {
  // The hexadecimal string representation of the color.
  hex: string;
  // The RGB (Red, Green, Blue) object representation of the color.
  rgb: { r: number; g: number; b: number };
  // The HSL (Hue, Saturation, Lightness) object representation of the color.
  hsl: { h: number; s: number; l: number };
};
// Defines a type for a predefined color, including its display name, value, and an optional category.
export type PredefinedColor = {
  // The display name of the predefined color.
  name: string;
  // The string value of the predefined color (e.g., '#FFFFFF').
  value: string;
  // An optional category used for grouping predefined colors.
  category?: string;
};
