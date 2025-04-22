/**
 * Radio View Component
 *
 * Renders a radio button with various styles and states
 * according to the design guidelines.
 */

import React from 'react';
import { Typography } from 'app-studio';

import { Center } from 'app-studio';
import { Label } from '../../../Form/Label/Label';
import { RadioViewProps } from './Radio.props';
import {
  Sizes,
  DotSizes,
  VariantStyles,
  StateStyles,
  DotStyles,
  DotStateStyles,
} from './Radio.style';
import { Text } from '../../../Text/Text';
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
  const handleHover = () => setIsHovered(!isHovered);

  const handleChange = () => {
    if (!isReadOnly && !isDisabled) {
      if (setIsSelected) setIsSelected(true);
      if (onChange) onChange(value);
      if (onValueChange) onValueChange(value);
    }
  };

  /**
   * Determine the variant based on component state
   */
  const variant = isChecked || isSelected ? 'selected' : 'unselected';

  /**
   * Apply state-specific styles
   */
  const stateStyle = error
    ? StateStyles.error[variant]
    : isDisabled
    ? StateStyles.disabled[variant]
    : isHovered
    ? StateStyles.hover[variant]
    : {};

  /**
   * Apply state-specific dot styles
   */
  const dotStateStyle = error
    ? DotStateStyles.error[variant]
    : isDisabled
    ? DotStateStyles.disabled[variant]
    : isHovered
    ? DotStateStyles.hover[variant]
    : {};

  /**
   * Styles for the radio component
   */
  const radioStyle = {
    container: {
      // Layout properties
      gap: 8, // 2 × 4px grid
      display: 'flex',
      height: 'fit-content',
      flexDirection: 'column',
      width: 'fit-content',

      // Typography properties

      // Visual properties
      color: error
        ? 'color.red.600'
        : isDisabled
        ? 'color.gray.400'
        : 'color.gray.700',

      // State properties
      cursor: isDisabled ? 'not-allowed' : isReadOnly ? 'default' : 'pointer',
      opacity: isDisabled ? 0.6 : 1,

      // Animation
      transition: 'all 0.2s ease',

      // Apply custom styles
      ...views['label'],
    },
    radio: {
      // Base variant styles
      ...VariantStyles[variant],

      // State-specific styles
      ...stateStyle,

      // Visual properties
      borderRadius: '50%', // Always circular for radio buttons
      backgroundColor: 'color.white',

      // Size properties
      ...Sizes[size],

      // Animation
      transition: 'all 0.2s ease',

      // Apply shadow and custom styles
      ...shadow,
      ...views['radio'],
    },
    dot: {
      // Base variant styles
      ...DotStyles[variant],

      // State-specific styles
      ...dotStateStyle,

      // Visual properties
      borderRadius: '50%', // Always circular for radio buttons

      // Size properties
      ...DotSizes[size],

      // Animation
      transition: 'all 0.2s ease',
    },
  };

  return (
    <Label
      htmlFor={id}
      as="div"
      onClick={handleChange}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      size={Typography.fontSizes[size]}
      {...radioStyle.container}
      {...props}
    >
      <Vertical gap={8}>
        {' '}
        {/* 2 × 4px grid */}
        <Horizontal gap={12} alignItems="center">
          {' '}
          {/* 3 × 4px grid */}
          {/* Label on the left side */}
          {labelPosition === 'left' && label && (
            <Text
              size={size}
              fontWeight="500" // Medium weight for better readability
              {...views?.label}
            >
              {label}
            </Text>
          )}
          {/* Radio */}
          <Center {...radioStyle.radio}>
            {(isChecked || isSelected) && <View {...radioStyle.dot} />}
          </Center>
          {/* Label on the right side */}
          {labelPosition === 'right' && label && (
            <Text
              size={size}
              fontWeight="500" // Medium weight for better readability
              {...views?.label}
            >
              {label}
            </Text>
          )}
        </Horizontal>
        {/* Info text */}
        {infoText && (
          <Text
            marginLeft={labelPosition === 'left' ? 0 : 36} // 9 × 4px grid
            color="color.gray.500"
            size="sm"
            fontWeight="400" // Regular weight
            lineHeight="1.5"
            {...views?.infoText}
          >
            {infoText}
          </Text>
        )}
      </Vertical>

      {/* Error message */}
      {error && (
        <Text
          size="xs"
          marginTop={4} // 1 × 4px grid
          marginHorizontal={0}
          color="color.red.500"
          fontWeight="500" // Medium weight for better readability
          transition="all 0.2s ease"
        >
          {error}
        </Text>
      )}
    </Label>
  );
};

export default RadioView;
