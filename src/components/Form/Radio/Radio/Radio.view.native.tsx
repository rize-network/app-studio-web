/**
 * Radio View Component (React Native)
 *
 * RN counterpart of Radio.view.tsx. No native radio in RN — we simulate it
 * with a pressable circle <View/> containing an inner filled dot when
 * selected. Drops web-only concepts: cursor, transitions, _hover.
 */

import React from 'react';
import { Typography } from 'app-studio';
import { Center } from 'app-studio';
import { RadioViewProps } from './Radio.props';
import {
  Sizes,
  DotSizes,
  VariantStyles,
  StateStyles,
  DotStyles,
  DotStateStyles,
} from './Radio.style';
import { Text } from 'app-studio';
import { Horizontal } from 'app-studio';
import { Vertical } from 'app-studio';
import { View } from 'app-studio';

const RadioView: React.FC<RadioViewProps> = ({
  id,
  icon,
  name,
  label,
  value,
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
  defaultIsSelected = false,
  setIsSelected = () => {},
  setIsHovered = () => {},
  views = { radio: {}, label: {} },
  infoText,
  helperText,
  ...props
}) => {
  const handleChange = () => {
    if (!isReadOnly && !isDisabled) {
      if (setIsSelected) setIsSelected(true);
      if (onChange) onChange(value);
      if (onValueChange) onValueChange(value);
    }
  };

  const variant = isChecked || isSelected ? 'selected' : 'unselected';

  const stateStyle = error
    ? StateStyles.error[variant]
    : isDisabled
    ? StateStyles.disabled[variant]
    : {};

  const dotStateStyle = error
    ? DotStateStyles.error[variant]
    : isDisabled
    ? DotStateStyles.disabled[variant]
    : {};

  const containerStyle = {
    gap: 8,
    color: error ? 'color-red-600' : isDisabled ? 'color-gray-400' : 'inherit',
    opacity: isDisabled ? 0.6 : 1,
    ...views['label'],
  };

  const radioStyle = {
    ...VariantStyles[variant],
    ...stateStyle,
    borderRadius: 9999,
    backgroundColor: 'color-white',
    ...Sizes[size],
    ...shadow,
    ...views['radio'],
  };

  const dotStyle = {
    ...DotStyles[variant],
    ...dotStateStyle,
    borderRadius: 9999,
    ...DotSizes[size],
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
          <Center {...radioStyle}>
            {(isChecked || isSelected) && <View {...dotStyle} />}
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

export default RadioView;
