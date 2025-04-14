/**
 * SettingsPanel Component
 *
 * A panel for displaying and managing AI application settings.
 */

import React from 'react';
import { SettingsPanelProps } from './SettingsPanel/SettingsPanel.props';
import { SettingsPanelView } from './SettingsPanel/SettingsPanel.view';

export const SettingsPanel: React.FC<SettingsPanelProps> = (props) => {
  return <SettingsPanelView {...props} />;
};

export type { SettingsPanelProps } from './SettingsPanel/SettingsPanel.props';
export type { SettingItem } from './SettingsPanel/SettingsPanel.type';
