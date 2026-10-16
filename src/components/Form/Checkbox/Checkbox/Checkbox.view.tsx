/**
 * Checkbox View Component
 *
 * Renders a checkbox with various styles and states
 * according to the design guidelines.
 */

import React from 'react';
import { Typography } from 'app-studio';

import { Center, Input } from 'app-studio';
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
  const generatedId = React.useId();
  const checkboxId = id ?? generatedId;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = React.useState(false);
  const checked = Boolean(isChecked || isSelected);

  // `indeterminate` only exists as a DOM property, never as an attribute.
  React.useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = isIndeterminate;
  }, [isIndeterminate]);

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
      display: 'flex' as const,
      height: 'fit-content',
      flexDirection: 'column' as const,
      width: 'fit-content',

      // Typography properties

      // Visual properties — inherit so the brand/page ink shows on every surface
      color: error
        ? 'color-red-600'
        : isDisabled
        ? 'color-gray-400'
        : 'inherit',

      // State properties
      cursor: isDisabled ? 'not-allowed' : isReadOnly ? 'default' : 'pointer',
      opacity: isDisabled ? 0.6 : 1,

      // Animation
      transition: 'all 0.2s ease-in-out',

      // Apply custom styles
      ...views['label'],
    },
    checkbox: {
      // Base variant styles
      ...VariantStyles[variant],

      // State-specific styles
      ...stateStyle,

      // Visual properties
      borderRadius: 6, // radius-sm

      // Size properties
      ...Sizes[size],

      // Animation
      transition: 'all 0.2s ease-in-out',

      // Apply shadow and custom styles
      ...shadow,
      ...views['checkbox'],
    },
  };

  const infoTextId = `${checkboxId}-info`;
  const errorId = `${checkboxId}-error`;
  const describedBy =
    [infoText ? infoTextId : '', error ? errorId : '']
      .filter(Boolean)
      .join(' ') || undefined;

  return (
    <Vertical {...checkboxStyle.container}>
      <Label
        htmlFor={checkboxId}
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
        size={Typography.fontSizes[size]}
        cursor="inherit"
      >
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
          <Center
            position="relative"
            {...checkboxStyle.checkbox}
            {...(isFocused ? StateStyles.focus[variant] : {})}
          >
            {/* Real control: a transparent input covering the visible box, so
                the element found by role/name is the one that receives clicks */}
            <Input
              ref={inputRef}
              type="checkbox"
              id={checkboxId}
              name={name}
              checked={checked}
              aria-checked={isIndeterminate ? 'mixed' : undefined}
              onChange={handleChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              disabled={isDisabled}
              readOnly={isReadOnly}
              position="absolute"
              top={0}
              left={0}
              width="100%"
              height="100%"
              margin={0}
              opacity={0}
              zIndex={1}
              cursor={
                isDisabled ? 'not-allowed' : isReadOnly ? 'default' : 'pointer'
              }
              aria-describedby={describedBy}
              // Consumer rest props (aria-*, role, data-*) belong on the real
              // control, not the wrapping label.
              {...props}
            />
            {isIndeterminate ? (
              <MinusIcon
                widthHeight={IconSizes[size]}
                color="color-white"
                transition="opacity 0.2s ease"
              />
            ) : (
              (isChecked || isSelected) &&
              (icon ?? (
                <TickIcon
                  widthHeight={IconSizes[size]}
                  color="color-white"
                  transition="opacity 0.2s ease"
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
      </Label>
      {/* Info text — outside the <label> so it describes the input through
          `aria-describedby` instead of polluting its accessible name */}
      {infoText && (
        <Text
          id={infoTextId}
          marginLeft={labelPosition === 'left' ? 0 : 36} // 9 × 4px grid
          color="color-gray-500"
          size="sm"
          fontWeight="400" // Regular weight
          lineHeight="20px"
          {...views?.infoText}
        >
          {infoText}
        </Text>
      )}

      {/* Error message — outside the <label> for the same reason */}
      {error && (
        <Text
          id={errorId}
          size="xs"
          marginTop={4} // 1 × 4px grid
          marginHorizontal={0}
          color="color-red-500"
          fontWeight="500" // Medium weight for better readability
          transition="all 0.2s ease-in-out"
        >
          {error}
        </Text>
      )}
    </Vertical>
  );
};

export default CheckboxView;
