/**
 * SettingsPanel View
 */

import React from 'react';
import { View } from 'app-studio';
import { Vertical } from 'app-studio';
import { Text } from '../../../Text/Text';
import { Button } from '../../../Button/Button';
import { Toggle } from '../../../Toggle/Toggle';
import { Slider } from '../../../Slider/Slider';
import { SettingsPanelProps } from './SettingsPanel.props';
import { SettingItem } from './SettingsPanel.type';
import {
  containerStyles,
  headerStyles,
  contentStyles,
  settingItemStyles,
  settingInfoStyles,
  settingControlStyles,
  categoryHeaderStyles,
} from './SettingsPanel.style';

export const SettingsPanelView: React.FC<SettingsPanelProps> = ({
  title = 'Settings',
  settings,
  onSettingChange,
  groupByCategory = false,
  isDisabled = false,
  styles = {},
  ...props
}) => {
  // Group settings by category if needed
  const getGroupedSettings = () => {
    if (!groupByCategory) {
      return { ungrouped: settings };
    }

    return settings.reduce<Record<string, SettingItem[]>>((acc, setting) => {
      const category = setting.category || 'General';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(setting);
      return acc;
    }, {});
  };

  const groupedSettings = getGroupedSettings();

  // Render the appropriate control based on setting type
  const renderSettingControl = (setting: SettingItem) => {
    const { id, type, value, options, min, max, step, placeholder, onClick } =
      setting;

    switch (type) {
      case 'toggle':
        return (
          <Toggle
            isToggled={value}
            onChange={(checked: any) => onSettingChange(id, checked)}
            isDisabled={isDisabled}
          >
            {value}
          </Toggle>
        );

      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => onSettingChange(id, e.target.value)}
            disabled={isDisabled}
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              backgroundColor: isDisabled ? '#f1f1f1' : 'white',
            }}
          >
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'slider':
        return (
          <Slider
            value={value}
            min={min || 0}
            max={max || 100}
            step={step || 1}
            onChange={(val) => onSettingChange(id, val)}
            isDisabled={isDisabled}
          />
        );

      case 'input':
        return (
          <input
            type="text"
            value={value}
            placeholder={placeholder}
            onChange={(e) => onSettingChange(id, e.target.value)}
            disabled={isDisabled}
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              backgroundColor: isDisabled ? '#f1f1f1' : 'white',
            }}
          />
        );

      case 'button':
        return (
          <Button onClick={onClick} isDisabled={isDisabled}>
            {value || 'Click'}
          </Button>
        );

      default:
        return null;
    }
  };

  return (
    <View {...containerStyles} {...props} {...styles.container}>
      {title && (
        <View {...headerStyles} {...styles.header}>
          <Text fontWeight="bold">{title}</Text>
        </View>
      )}

      <Vertical {...contentStyles} {...styles.content}>
        {Object.entries(groupedSettings).map(([category, categorySettings]) => (
          <React.Fragment key={category}>
            {groupByCategory && category !== 'ungrouped' && (
              <View {...categoryHeaderStyles} {...styles.categoryHeader}>
                <Text>{category}</Text>
              </View>
            )}

            {categorySettings.map((setting) => (
              <View
                key={setting.id}
                {...settingItemStyles}
                {...styles.settingItem}
              >
                <View {...settingInfoStyles} {...styles.settingInfo}>
                  <Text fontWeight="medium">{setting.label}</Text>

                  {setting.description && (
                    <Text color="color.gray.600">{setting.description}</Text>
                  )}
                </View>

                <View {...settingControlStyles} {...styles.settingControl}>
                  {renderSettingControl(setting)}
                </View>
              </View>
            ))}
          </React.Fragment>
        ))}
      </Vertical>
    </View>
  );
};
