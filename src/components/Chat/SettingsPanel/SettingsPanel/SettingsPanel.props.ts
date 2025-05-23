/**
 * SettingsPanel Props
 */

import { ViewProps } from 'app-studio';
import { SettingItem, SettingsPanelStyles } from './SettingsPanel.type';

export interface SettingsPanelProps extends ViewProps {
  /**
   * Title of the settings panel
   */
  title?: string;

  /**
   * List of setting items
   */
  settings: SettingItem[];

  /**
   * Callback function when a setting value changes
   */
  onSettingChange: (id: string, value: any) => void;

  /**
   * Whether to group settings by category
   */
  groupByCategory?: boolean;

  /**
   * Whether the panel is disabled
   */
  isDisabled?: boolean;

  /**
   * Custom styles for the component
   */
  styles?: SettingsPanelStyles;
}
