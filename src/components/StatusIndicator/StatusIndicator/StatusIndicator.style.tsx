import { ViewProps } from 'app-studio';
import { Status } from './StatusIndicator.type';

export const getThemes = (
  themeMode: string
): Record<Status, { indicator: ViewProps; label: ViewProps }> => {
  return {
    default: {
      indicator: { backgroundColor: 'color.gray.400' },
      label: { color: 'color.gray.700' },
    },
    info: {
      indicator: { backgroundColor: 'color.blue.500' },
      label: { color: 'color.blue.700' },
    },
    success: {
      indicator: { backgroundColor: 'color.green.500' },
      label: { color: 'color.green.700' },
    },
    warning: {
      indicator: { backgroundColor: 'color.orange.500' },
      label: { color: 'color.orange.700' },
    },
    error: {
      indicator: { backgroundColor: 'color.red.500' },
      label: { color: 'color.red.700' },
    },
  };
};

export const Themes = getThemes('light');
