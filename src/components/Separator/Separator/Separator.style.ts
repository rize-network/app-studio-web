import { ViewProps } from 'app-studio';
import { Orientation, Variant, Thickness } from './Separator.type';
// Defines predefined styles for separator orientations (horizontal and vertical), specifying their width and height properties.
export const SeparatorOrientations: Record<Orientation, ViewProps> = {
  horizontal: {
    width: '100%',
    height: 'auto',
  },
  vertical: {
    width: 'auto',
    height: '100%',
  },
};
// A function that returns an object mapping separator variants (solid, dashed, dotted) to their corresponding CSS border styles. The `themeMode` parameter is currently not utilized.
export const getSeparator = (themeMode: string): Record<Variant, string> => {
  return {
    solid: 'solid',
    dashed: 'dashed',
    dotted: 'dotted',
  };
};
// An object containing predefined separator variant styles (solid, dashed, dotted), derived from the `getSeparator` function.
export const SeparatorVariants = getSeparator('light');
// Defines standard thickness values for the separator component, allowing for thin, medium, and thick options.
export const SeparatorThicknesses: Record<Thickness, string> = {
  thin: '1px',
  medium: '2px',
  thick: '4px',
};
// Specifies the default inline styles for different parts of the Separator component: the container, the dividing line, and an optional label.
export const DefaultSeparatorStyles = {
  container: {
    transition: 'opacity 0.15s ease',
  },
  line: {
    backgroundColor: 'color-gray-200',
    transition: 'background-color 0.15s ease',
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: 'color-gray-600',
    paddingHorizontal: '8px',
    backgroundColor: 'color-white',
    transition: 'color 0.15s ease',
  },
};
