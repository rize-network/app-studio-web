import { ViewProps } from 'app-studio';
import { Status } from './StatusIndicator.type';
// Defines a function to generate a set of styling themes for different status types (e.g., default, info, success, warning, error), applying specific background colors for indicators and text colors for labels.
export const getThemes = (
  // Represents the current theme mode, which could be used to adjust the returned styles (though currently not utilized in the function's logic).
  themeMode: string
): Record<Status, { indicator: ViewProps; label: ViewProps }> => {
  // Labels inherit color from the surrounding context so they stay readable on
  // any brand surface (light or dark). The indicator dot carries the semantic hue.
  return {
    default: {
      indicator: { backgroundColor: 'color-gray-400' },
      label: { color: 'inherit' },
    },
    info: {
      indicator: { backgroundColor: 'color-blue-500' },
      label: { color: 'inherit' },
    },
    success: {
      indicator: { backgroundColor: 'color-green-500' },
      label: { color: 'inherit' },
    },
    warning: {
      indicator: { backgroundColor: 'color-orange-500' },
      label: { color: 'inherit' },
    },
    error: {
      indicator: { backgroundColor: 'color-red-500' },
      label: { color: 'inherit' },
    },
  };
};
// Exports a constant `Themes` that holds the specific styling themes for the StatusIndicator, initialized by calling `getThemes` with the 'light' theme mode.
export const Themes = getThemes('light');
