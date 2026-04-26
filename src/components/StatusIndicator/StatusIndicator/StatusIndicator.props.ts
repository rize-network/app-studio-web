import { ViewProps } from 'app-studio';
import { Status, StatusIndicatorStyles } from './StatusIndicator.type';
export interface StatusIndicatorProps extends ViewProps {
  // Defines the optional text label to be displayed next to the status indicator.
  label?: string;
  // Specifies the current status of the item, which determines the indicator's visual representation (e.g., 'success', 'warning', 'error').
  status?: Status;
  // Provides an object to customize the styles of various sub-components within the StatusIndicator.
  views?: StatusIndicatorStyles;
  // Sets the theme mode for the component, allowing it to adapt to 'light' or 'dark' UI environments.
  themeMode?: 'light' | 'dark';
}
