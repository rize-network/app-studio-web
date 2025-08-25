import { ViewProps } from 'app-studio';
import { Status, StatusIndicatorStyles } from './StatusIndicator.type';

export interface StatusIndicatorProps extends ViewProps {
  label?: string;
  status?: Status;
  views?: StatusIndicatorStyles;
  /**
   * Optional theme mode override ('light' or 'dark')
   * If not provided, the component will use the theme mode from context
   */
  themeMode?: 'light' | 'dark';
}
