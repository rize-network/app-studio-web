import { ViewProps } from 'app-studio';
import { Size, Variant, Shape } from './ColorInput.type';
// Defines a collection of default styles for various structural elements within the ColorInput component.
export const DefaultColorInputStyles = {
  // Styles for the main container element of the ColorInput, controlling its positioning and display properties.
  container: {
    position: 'relative',
    display: 'inline-block',
    width: 'fit-content',
  } as ViewProps,
  // Styles for the clickable trigger element that opens the color picker dropdown, including visual appearance, interactive transitions, and borders.
  trigger: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    backgroundColor: 'color-white',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'color-gray-300',
    padding: '8px 12px',
    borderRadius: 8,
  } as ViewProps,
  // Styles for the dropdown panel that appears when the trigger is clicked, defining its absolute positioning, background, borders, shadow, padding, and minimum width.
  dropdown: {
    position: 'absolute',
    top: 'calc(100% + 4px)',
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: 'color-white',
    borderRadius: 12,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'color-gray-200',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    padding: '16px',
    minWidth: '280px',
  } as ViewProps,
  // Styles for the grid layout used to display the selectable color options within the dropdown, specifying column structure and gap.
  colorGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(8, 1fr)',
    gap: '8px',
  } as ViewProps,
  // Styles for the container displaying recently selected colors, managing its flexbox layout and spacing.
  recentColors: {
    display: 'flex',
    gap: '4px',
    flexWrap: 'wrap',
  } as ViewProps,
};
// Maps predefined size options (e.g., xs, sm, md, lg, xl) to specific styling properties like height, font size, and padding for the ColorInput component's elements.
export const Sizes: Record<Size, ViewProps> = {
  xs: {
    height: '28px',
    fontSize: '10px',
    padding: '4px 8px',
  },
  sm: {
    height: '32px',
    fontSize: '12px',
    padding: '6px 10px',
  },
  md: {
    height: '40px',
    fontSize: '14px',
    padding: '8px 12px',
  },
  lg: {
    height: '48px',
    fontSize: '16px',
    padding: '12px 16px',
  },
  xl: {
    height: '56px',
    fontSize: '20px',
    padding: '16px 20px',
  },
};
// Maps predefined shape options (e.g., default, square, rounded, pill) to specific border-radius styling for the ColorInput component's elements.
export const Shapes: Record<Shape, ViewProps> = {
  default: {
    borderRadius: 8,
  },
  square: {
    borderRadius: 0,
  },
  rounded: {
    borderRadius: 8,
  },
  pill: {
    borderRadius: 9999,
  },
};
// Maps predefined visual variant options (e.g., default, outline, none) to specific background, border, and border style properties for the ColorInput component's elements.
export const Variants: Record<Variant, ViewProps> = {
  default: {
    backgroundColor: 'color-white',
    borderColor: 'color-gray-300',
    borderWidth: '1px',
    borderStyle: 'solid',
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: 'color-gray-300',
    borderWidth: '1px',
    borderStyle: 'solid',
  },
  none: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: '0px',
  },
};
// Defines the default set of colors available for selection in the color picker, including their display names and corresponding CSS color values.
export const DefaultColorPalette = [
  { name: 'Red 500', value: 'color-red-500' },
  { name: 'Orange 500', value: 'color-orange-500' },
  { name: 'Yellow 500', value: 'color-yellow-500' },
  { name: 'Green 500', value: 'color-green-500' },
  { name: 'Blue 500', value: 'color-blue-500' },
  { name: 'Indigo 500', value: 'color-indigo-500' },
  { name: 'Purple 500', value: 'color-purple-500' },
  { name: 'Pink 500', value: 'color-pink-500' },
  { name: 'Red 300', value: 'color-red-300' },
  { name: 'Orange 300', value: 'color-orange-300' },
  { name: 'Yellow 300', value: 'color-yellow-300' },
  { name: 'Green 300', value: 'color-green-300' },
  { name: 'Blue 300', value: 'color-blue-300' },
  { name: 'Indigo 300', value: 'color-indigo-300' },
  { name: 'Purple 300', value: 'color-purple-300' },
  { name: 'Pink 300', value: 'color-pink-300' },
  { name: 'Red 700', value: 'color-red-700' },
  { name: 'Orange 700', value: 'color-orange-700' },
  { name: 'Yellow 700', value: 'color-yellow-700' },
  { name: 'Green 700', value: 'color-green-700' },
  { name: 'Blue 700', value: 'color-blue-700' },
  { name: 'Indigo 700', value: 'color-indigo-700' },
  { name: 'Purple 700', value: 'color-purple-700' },
  { name: 'Pink 700', value: 'color-pink-700' },
  { name: 'Gray 100', value: 'color-gray-100' },
  { name: 'Gray 300', value: 'color-gray-300' },
  { name: 'Gray 500', value: 'color-gray-500' },
  { name: 'Gray 700', value: 'color-gray-700' },
  { name: 'Gray 900', value: 'color-gray-900' },
  { name: 'White', value: 'color-white' },
  { name: 'Black', value: 'color-black' },
  { name: 'Transparent', value: 'transparent' },
];
