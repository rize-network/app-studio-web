/**
 * SettingsPanel Types
 */

import { ViewProps } from 'app-studio';

export interface SettingItem {
  id: string;
  label: string;
  description?: string;
  type: 'toggle' | 'select' | 'slider' | 'input' | 'button';
  value?: any;
  options?: { label: string; value: any }[];
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  onClick?: () => void;
  category?: string;
}

export interface SettingsPanelStyles {
  container?: ViewProps;
  header?: ViewProps;
  content?: ViewProps;
  settingItem?: ViewProps;
  settingInfo?: ViewProps;
  settingControl?: ViewProps;
  categoryHeader?: ViewProps;
}
