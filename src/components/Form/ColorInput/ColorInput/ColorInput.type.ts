import { ViewProps } from 'app-studio';
// Defines the visual style variant of the ColorInput component.
export type Variant = 'outline' | 'default' | 'none';
// Specifies the shape of the ColorInput's visual elements, such as buttons or containers.
export type Shape = 'default' | 'square' | 'rounded' | 'pill';
// Determines the predefined size of the ColorInput component.
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
// Defines an interface for custom styling of various internal parts of the ColorInput component.
export type ColorInputStyles = {
  // Styles for the text element within the ColorInput.
  text?: ViewProps;
  // Styles for the label associated with the ColorInput.
  label?: ViewProps;
  // Styles for displaying error messages.
  error?: ViewProps;
  // Styles for the helper text providing additional information.
  helperText?: ViewProps;
  // Styles for the main container of the ColorInput component.
  container?: ViewProps;
  // Styles for the element that triggers the color picker dropdown.
  trigger?: ViewProps;
  // Styles for the dropdown panel containing the color picker.
  dropdown?: ViewProps;
  // Styles for the grid display of selectable colors.
  colorGrid?: ViewProps;
  // Styles for individual color swatches within the grid.
  colorSwatch?: ViewProps;
  // Styles for the custom input field for manual color entry.
  customInput?: ViewProps;
  // Styles for the section displaying recently used colors.
  recentColors?: ViewProps;
};
// Defines the allowed color formats for input or output.
export type ColorFormat = 'hex' | 'rgb' | 'hsl';
// Defines the structure for storing a color value in different formats.
export type ColorValue = {
  // The hexadecimal representation of the color.
  hex: string;
  // The RGB (Red, Green, Blue) representation of the color.
  rgb: { r: number; g: number; b: number };
  // The HSL (Hue, Saturation, Lightness) representation of the color.
  hsl: { h: number; s: number; l: number };
};
// Defines the structure for a predefined color option.
export type PredefinedColor = {
  // The display name of the predefined color.
  name: string;
  // The string value of the predefined color (e.g., hex code).
  value: string;
  // An optional category for grouping predefined colors.
  category?: string;
};
