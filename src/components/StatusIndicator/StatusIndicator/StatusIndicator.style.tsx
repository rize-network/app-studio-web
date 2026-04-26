import { ViewProps } from 'app-studio';
import { Status } from './StatusIndicator.type';
// Defines a function to generate a set of styling themes for different status types (e.g., default, info, success, warning, error), applying specific background colors for indicators and text colors for labels.
export const getThemes = (
  // Represents the current theme mode, which could be used to adjust the returned styles (though currently not utilized in the function's logic).
  themeMode: string
): Record<Status, { indicator: ViewProps; label: ViewProps }> => {
  return {
    default: {
      indicator: { backgroundColor: 'color-gray-400' },
      label: { color: 'color-gray-700' },
    },
    info: {
      indicator: { backgroundColor: 'color-blue-500' },
      label: { color: 'color-blue-700' },
    },
    success: {
      indicator: { backgroundColor: 'color-green-500' },
      label: { color: 'color-green-700' },
    },
    warning: {
      indicator: { backgroundColor: 'color-orange-500' },
      label: { color: 'color-orange-700' },
    },
    error: {
      indicator: { backgroundColor: 'color-red-500' },
      label: { color: 'color-red-700' },
    },
  };
};
// Exports a constant `Themes` that holds the specific styling themes for the StatusIndicator, initialized by calling `getThemes` with the 'light' theme mode.
export const Themes = getThemes('light');
