import { ViewProps } from 'app-studio';
import { Size } from './Selector.type';
// Defines a mapping of `Size` enums to `ViewProps` objects, specifying standard dimensions (height and width) for the Selector component based on its size (xs, sm, md, lg, xl).
export const Sizes: Record<Size, ViewProps> = {
  xs: { height: '24px', width: '24px' },
  sm: { height: '32px', width: '32px' },
  md: { height: '40px', width: '40px' },
  lg: { height: '48px', width: '48px' },
  xl: { height: '56px', width: '56px' },
};
// Defines a mapping of `Size` enums to numeric values, specifying standard icon sizes that correspond to the Selector component's overall dimensions.
export const IconSizes: Record<Size, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
};
// Defines the standard `ViewProps` for the dropdown container, including its dimensions, scroll behavior, layering, background, borders, shadow, and transition effects.
export const dropdownStyles: ViewProps = {
  width: '100%',
  maxHeight: '240px',
  overflowY: 'auto',
  zIndex: 1000,
  backgroundColor: 'color-white',
  borderRadius: '8px',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'color-gray-200',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.05), 0px 2px 4px rgba(0, 0, 0, 0.03)',
  transition: 'opacity 0.2s ease, transform 0.2s ease',
};
// Defines the standard `ViewProps` for individual options within the dropdown, including padding, cursor, and transition effects, along with specific styles for hover, focus, and selected states.
export const optionStyles: ViewProps = {
  padding: '8px 12px',
  cursor: 'pointer',
  transition: 'background-color 0.15s ease, color 0.15s ease',
  _hover: {
    backgroundColor: 'color-gray-100',
  },
  _focus: {
    backgroundColor: 'color-gray-100',
    outline: 'none',
  },
  _selected: {
    backgroundColor: 'theme-primary',
    color: 'color-white',
  },
};
