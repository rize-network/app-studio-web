/**
 * Switch View Component (React Native)
 *
 * RN counterpart of Switch.view.tsx. Uses React Native's built-in <Switch/>
 * for the native toggle UX (drops the custom slider/knob/active-child concept,
 * which is a notable simplification — activeChild/inActiveChild are not
 * rendered because RN's Switch has no slot for in-track content).
 *
 * Drops web-only concepts: cursor, transitions, _hover, boxShadow ring, the
 * hidden checkbox input, the custom-painted slider/knob.
 */

import React from 'react';
import { Switch as RNSwitch } from 'react-native';
import { Horizontal, Text, useTheme, View } from 'app-studio';
import { SwitchViewProps } from './Switch.props';
import { ColorSchemes } from './Switch.style';

const SwitchView: React.FC<SwitchViewProps> = ({
  id,
  name,
  label,
  isChecked,
  labelPosition = 'right',
  size = 'sm',
  value = false,
  isHovered = false,
  isDisabled = false,
  isReadOnly = false,
  on,
  setOn = () => {},
  onChange,
  setValue = () => {},
  setIsHovered = () => {},
  helperText,
  inActiveChild: _inActiveChild,
  activeChild: _activeChild,
  shadow: _shadow,
  views = { slider: {}, circle: {}, label: {} },
  ...props
}) => {
  const checked = typeof isChecked === 'boolean' ? isChecked : Boolean(value);
  const { getColor } = useTheme();

  const handleToggle = (newValue: boolean) => {
    if (!isReadOnly && !isDisabled) {
      setValue(newValue);
      setOn(newValue);
      if (onChange) onChange(newValue);
    }
  };

  const containerStyle = {
    gap: 12,
    opacity: isDisabled ? 0.6 : 1,
    ...views.label,
  };

  return (
    <View {...containerStyle} {...props}>
      <Horizontal gap={12} alignItems="center">
        {labelPosition === 'left' && label && (
          <Text
            fontWeight="500"
            color={isDisabled ? 'color-gray-400' : 'inherit'}
          >
            {label}
          </Text>
        )}
        <RNSwitch
          value={checked}
          disabled={isDisabled || isReadOnly}
          onValueChange={handleToggle}
          trackColor={{
            false: getColor(ColorSchemes.default.inactive),
            true: getColor(ColorSchemes.default.active),
          }}
          thumbColor={getColor(ColorSchemes.default.knob)}
          ios_backgroundColor={getColor(ColorSchemes.default.inactive)}
        />
        {labelPosition === 'right' && label && (
          <Text
            fontWeight="500"
            color={isDisabled ? 'color-gray-400' : 'inherit'}
          >
            {label}
          </Text>
        )}
      </Horizontal>
    </View>
  );
};

export default SwitchView;
