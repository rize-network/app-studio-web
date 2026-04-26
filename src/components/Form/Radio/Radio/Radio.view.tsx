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
import { Text } from 'app-studio';
import { Horizontal } from 'app-studio';
import { Vertical } from 'app-studio';
import { View } from 'app-studio';
// Defines the `RadioView` functional React component, responsible for rendering the visual representation of a radio button. It accepts various props to control its appearance, behavior, and state.
//
// **Parameters:**
// - `id`: A unique identifier for the radio input element.
// - `icon`: An optional icon to display alongside the radio.
// - `name`: The name attribute for the radio input, essential for grouping radio buttons.
// - `label`: The text label displayed next to the radio button.
// - `value`: The current value associated with this specific radio button.
// - `isChecked`: A boolean indicating if the radio button is currently checked (controlled state).
// - `onChange`: Callback function triggered when the radio button's checked state changes.
// - `onValueChange`: Another callback function for when the radio button's value is selected.
// - `shadow`: Custom shadow styles to apply to the radio button.
// - `labelPosition`: Specifies where the label should be positioned ('right' or 'left') relative to the radio icon.
// - `size`: Defines the predefined size of the radio button ('sm', 'md', 'lg').
// - `error`: A boolean or string indicating an error state, which applies error styling.
// - `isSelected`: An internal state variable indicating if the radio is selected (potentially for uncontrolled components).
// - `isHovered`: An internal state variable indicating if the radio is currently hovered over.
// - `isDisabled`: A boolean that disables interaction with the radio button.
// - `isReadOnly`: A boolean that makes the radio button unchangeable by the user.
// - `defaultIsSelected`: The initial selected state for an uncontrolled radio button.
// - `setIsSelected`: A setter function to update the `isSelected` state.
// - `setIsHovered`: A setter function to update the `isHovered` state.
// - `views`: An object allowing custom style overrides for specific parts of the radio (e.g., `radio` or `label`).
// - `infoText`: Supplemental text displayed below the main label.
// - `helperText`: Additional helper text for the radio input.
// - `...props`: Any other standard HTML attributes passed to the root element.
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
  // Handles the hover event for the radio button. This function toggles the `isHovered` state, which can be used to apply hover-specific styles.
  const handleHover = () => setIsHovered(!isHovered);
  // Manages the click/change event for the radio button. If the radio is not disabled or read-only, it updates the internal selected state and triggers the provided `onChange` or `onValueChange` callbacks with the radio's current `value`.
  const handleChange = () => {
    if (!isReadOnly && !isDisabled) {
      if (setIsSelected) setIsSelected(true);
      if (onChange) onChange(value);
      if (onValueChange) onValueChange(value);
    }
  };
  // Determines the visual variant of the radio button based on whether it is `isChecked` (controlled) or `isSelected` (internal state). This variant ('selected' or 'unselected') is then used to apply distinct base styles.
  const variant = isChecked || isSelected ? 'selected' : 'unselected';
  // Calculates the dynamic styles for the radio button's container based on its current state (error, disabled, hovered) and the determined `variant`. This allows for visual feedback specific to the interaction state.
  const stateStyle = error
    ? StateStyles.error[variant]
    : isDisabled
    ? StateStyles.disabled[variant]
    : isHovered
    ? StateStyles.hover[variant]
    : {};
  // Calculates the dynamic styles for the inner dot of the radio button based on its current state (error, disabled, hovered) and the determined `variant`. This applies visual feedback to the dot itself.
  const dotStateStyle = error
    ? DotStateStyles.error[variant]
    : isDisabled
    ? DotStateStyles.disabled[variant]
    : isHovered
    ? DotStateStyles.hover[variant]
    : {};
  // A comprehensive style object consolidating all styling properties for the radio component, including base styles, state-dependent styles, and custom overrides. It defines styles for the `container`, the `radio` circle, and the inner `dot`.
  const radioStyle = {
    container: {
      gap: 8,
      display: 'flex',
      height: 'fit-content',
      flexDirection: 'column',
      width: 'fit-content',
      selected: {
        borderColor: 'theme-primary',
      },
      color: error
        ? 'color-red-600'
        : isDisabled
        ? 'color-gray-400'
        : 'color-gray-700',
      cursor: isDisabled ? 'not-allowed' : isReadOnly ? 'default' : 'pointer',
      opacity: isDisabled ? 0.6 : 1,
      transition: 'all 0.2s ease-in-out',
      ...views['label'],
    },
    radio: {
      ...VariantStyles[variant],
      ...stateStyle,
      borderRadius: '50%',
      selected: {
        backgroundColor: 'theme-primary',
      },
      backgroundColor: 'color-white',
      ...Sizes[size],
      transition: 'all 0.2s ease-in-out',
      ...shadow,
      ...views['radio'],
    },
    dot: {
      ...DotStyles[variant],
      ...dotStateStyle,
      borderRadius: '50%',
      ...DotSizes[size],
      transition: 'all 0.2s ease-in-out',
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
        {}
        <Horizontal gap={12} alignItems="center">
          {' '}
          {}
          {}
          {labelPosition === 'left' && label && (
            <Text size={size} fontWeight="500" {...views?.label}>
              {label}
            </Text>
          )}
          {}
          <Center {...radioStyle.radio}>
            {(isChecked || isSelected) && <View {...radioStyle.dot} />}
          </Center>
          {}
          {labelPosition === 'right' && label && (
            <Text size={size} fontWeight="500" {...views?.label}>
              {label}
            </Text>
          )}
        </Horizontal>
        {}
        {infoText && (
          <Text
            marginLeft={labelPosition === 'left' ? 0 : 36}
            color="color-gray-500"
            size="sm"
            fontWeight="400"
            lineHeight="20px"
            {...views?.infoText}
          >
            {infoText}
          </Text>
        )}
      </Vertical>
      {}
      {error && (
        <Text
          size="xs"
          marginTop={4}
          marginHorizontal={0}
          color="color-red-500"
          fontWeight="500"
          transition="color 0.2s ease, opacity 0.2s ease"
        >
          {error}
        </Text>
      )}
    </Label>
  );
};
export default RadioView;
