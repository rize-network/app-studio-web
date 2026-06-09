/**
 * Checkbox View Component (React Native)
 *
 * RN counterpart of Checkbox.view.tsx. React Native has no native checkbox,
 * so we simulate one with a pressable <View/> that displays a TickIcon when
 * checked (or MinusIcon when indeterminate). Drops web-only concepts: cursor,
 * transitions, _hover (we use isHovered state only via onPress feedback).
 */

import React from 'react';
import { Typography } from 'app-studio';
import { Center, View } from 'app-studio';
import { TickIcon, MinusIcon } from '../../../Icon/Icon';

import { CheckboxViewProps } from './Checkbox.props';
import { IconSizes, Sizes, VariantStyles, StateStyles } from './Checkbox.style';
import { Text } from 'app-studio';
import { Horizontal } from 'app-studio';
import { Vertical } from 'app-studio';

const CheckboxView: React.FC<CheckboxViewProps> = ({
  id,
  icon,
  name,
  label,
  isChecked,
  onChange,
  onValueChange,
  shadow = {},
  labelPosition = 'right',
  size = 'md',
  error = false,
  isSelected = false,
  isHovered = false,
  isDisabled = false,
  isReadOnly = false,
  isIndeterminate = false,
  defaultIsSelected = false,
  setIsSelected = () => {},
  setIsHovered = () => {},
  setIsChecked,
  views = { checkbox: {}, label: {} },
  infoText,
  helperText,
  ...props
}) => {
  const handleChange = () => {
    if (!isReadOnly && !isDisabled) {
      if (setIsSelected) setIsSelected(!isSelected);
      if (onChange) onChange(!isChecked);
      if (onValueChange) onValueChange(!isChecked);
    }
  };

  const variant = isIndeterminate
    ? 'indeterminate'
    : isChecked || isSelected
    ? 'selected'
    : 'unselected';

  const stateStyle = error
    ? StateStyles.error[variant]
    : isDisabled
    ? (StateStyles.disabled as any)[variant]
    : {};

  const containerStyle = {
    gap: 8,
    color: error ? 'color-red-600' : isDisabled ? 'color-gray-400' : 'inherit',
    opacity: isDisabled ? 0.6 : 1,
    ...views['label'],
  };

  const checkboxStyle = {
    ...VariantStyles[variant],
    ...stateStyle,
    borderRadius: 6,
    ...Sizes[size],
    ...shadow,
    ...views['checkbox'],
  };

  return (
    <View
      onPress={handleChange}
      fontSize={Typography.fontSizes[size]}
      {...containerStyle}
      {...props}
    >
      <Vertical gap={8}>
        <Horizontal gap={12} alignItems="center">
          {labelPosition === 'left' && label && (
            <Text size={size} fontWeight="500" {...views?.label}>
              {label}
            </Text>
          )}
          <Center {...checkboxStyle}>
            {isIndeterminate ? (
              <MinusIcon widthHeight={IconSizes[size]} color="color-white" />
            ) : (
              (isChecked || isSelected) &&
              (icon ?? (
                <TickIcon widthHeight={IconSizes[size]} color="color-white" />
              ))
            )}
          </Center>
          {labelPosition === 'right' && label && (
            <Text size={size} fontWeight="500" {...views?.label}>
              {label}
            </Text>
          )}
        </Horizontal>
        {infoText && (
          <Text
            marginLeft={labelPosition === 'left' ? 0 : 36}
            color="color-gray-500"
            size="sm"
            fontWeight="400"
            lineHeight={20}
            {...views?.infoText}
          >
            {infoText}
          </Text>
        )}
      </Vertical>
      {error && (
        <Text
          size="xs"
          marginTop={4}
          marginHorizontal={0}
          color="color-red-500"
          fontWeight="500"
        >
          {error}
        </Text>
      )}
    </View>
  );
};

export default CheckboxView;
