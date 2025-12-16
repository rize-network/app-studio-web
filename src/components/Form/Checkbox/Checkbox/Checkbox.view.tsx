/**
 * Checkbox View Component
 *
 * Renders a checkbox with various styles and states
 * according to the design guidelines.
 */

import React from 'react';
import { Typography } from 'app-studio';

import { Center } from 'app-studio';
import { Label } from '../../../Form/Label/Label';
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
  views = { checkbox: {}, label: {} },
  infoText,
  helperText,
  ...props
}) => {
  const handleHover = () => setIsHovered(!isHovered);

  const handleChange = () => {
    if (!isReadOnly && !isDisabled) {
      if (setIsSelected) setIsSelected(!isSelected);
      if (onChange) onChange(!isChecked);
      if (onValueChange) onValueChange(!isChecked);
    }
  };

  /**
   * Determine the variant based on component state
   */
  const variant = isIndeterminate
    ? 'indeterminate'
    : isChecked || isSelected
    ? 'selected'
    : 'unselected';

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
   * Styles for the checkbox component
   */
  const checkboxStyle = {
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
    checkbox: {
      // Base variant styles
      ...VariantStyles[variant],

      // State-specific styles
      ...stateStyle,

      // Visual properties
      borderRadius: '4px', // Consistent with design system

      // Size properties
      ...Sizes[size],

      // Animation
      transition: 'all 0.2s ease',

      // Apply shadow and custom styles
      ...shadow,
      ...views['checkbox'],
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
      {...checkboxStyle.container}
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
          {/* Checkbox */}
          <Center {...checkboxStyle.checkbox}>
            {isIndeterminate ? (
              <MinusIcon
                widthHeight={IconSizes[size]}
                color="white"
                transition="all 0.2s ease"
              />
            ) : (
              (isChecked || isSelected) &&
              (icon ?? (
                <TickIcon
                  widthHeight={IconSizes[size]}
                  color="white"
                  transition="all 0.2s ease"
                />
              ))
            )}
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
            lineHeight="15"
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

export default CheckboxView;
