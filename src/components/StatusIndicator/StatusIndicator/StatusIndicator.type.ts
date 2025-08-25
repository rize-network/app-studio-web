import { ViewProps } from 'app-studio';

export type Status = 'default' | 'info' | 'success' | 'warning' | 'error';

export type StatusIndicatorStyles = {
  container?: ViewProps;
  indicator?: ViewProps;
  label?: ViewProps;
};
