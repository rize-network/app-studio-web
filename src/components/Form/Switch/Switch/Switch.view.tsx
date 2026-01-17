/**
 * Switch View Component
 *
 * Renders a switch toggle with various styles and states
 * according to the design guidelines.
 */

import React from 'react';
import { Input } from 'app-studio';
import { Label } from '../../../Form/Label/Label';
import { View } from 'app-studio';
import { Text } from 'app-studio';
import { SwitchViewProps } from './Switch.props';
import {
  KnobSizes,
  SliderPadding,
  SliderSizes,
  ColorSchemes,
  TransitionStyles,
} from './Switch.style';
const SwitchContent = (props: any) => <Input type="checkbox" {...props} />;
const SwitchView: React.FC<SwitchViewProps> = ({
  id,
  name,
  label,
  inActiveChild,
  isChecked,
  activeChild,
  labelPosition = 'right',
  shadow = {},
  size = 'sm',
  value = false,
  isHovered = false,
  isDisabled = false,
  isReadOnly = false,
  on,
  setOn,
  onChange,
  setValue = () => {},
  setIsHovered = () => {},
  helperText,
  views = { slider: {}, circle: {}, label: {} },
  ...props
}) => {
  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isReadOnly && !isDisabled) {
      const newValue = event.target.checked;
      setValue(newValue);
      setOn(newValue);
      if (onChange) onChange(newValue);
    }
  };
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  /**
   * Styles for the switch component
   */
  const switchStyle = {
    container: {
      // Layout properties
      gap: 12, // 3 × 4px grid
      display: 'flex',
      height: 'fit-content',
      width: 'fit-content',
      alignItems: 'center',

      // Typography properties

      // State properties
      cursor: isDisabled ? 'not-allowed' : isReadOnly ? 'default' : 'pointer',
      opacity: isDisabled ? 0.6 : 1,

      // Animation
      transition: 'all 0.2s ease',

      // Apply custom styles
      ...views.label,
    },
  };
  return (
    <Label
      htmlFor={id}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...switchStyle.container}
      {...props}
    >
      <SwitchContent
        id={id}
        name={name}
        opacity={0}
        width={0}
        height={0}
        checked={value}
        onChange={handleToggle}
        disabled={isDisabled}
        readOnly={isReadOnly}
        {...props}
      />
      {/* Label on the left side */}
      {labelPosition === 'left' && label && (
        <Text
          fontWeight="500" // Medium weight for better readability
          color={isDisabled ? 'color-gray-400' : 'color-gray-700'}
          transition="all 0.2s ease"
        >
          {label}
        </Text>
      )}

      {/* Switch slider */}
      <View
        // Layout properties
        display="flex"
        alignItems="center"
        justifyContent={
          value
            ? activeChild
              ? 'space-between'
              : 'flex-end'
            : inActiveChild
            ? 'space-between'
            : 'flex-start'
        }
        marginBottom={4} // 1 × 4px grid
        // Visual properties
        borderRadius="9999px" // Full rounded for pill shape
        backgroundColor={
          isDisabled
            ? ColorSchemes.default.disabled
            : value
            ? isHovered
              ? ColorSchemes.states.hover.active
              : ColorSchemes.default.active
            : isHovered
            ? ColorSchemes.states.hover.inactive
            : ColorSchemes.default.inactive
        }
        opacity={
          !isDisabled && value && isHovered
            ? ColorSchemes.states.hover.activeOpacity
            : 1
        }
        // State properties
        cursor="pointer"
        // Animation
        {...TransitionStyles.slider}
        // Apply styles
        {...shadow}
        {...SliderPadding[size]}
        {...SliderSizes[size]}
        {...views['slider']}
      >
        {/* Active content */}
        {activeChild && value && (
          <View
            marginLeft={8} // 2 × 4px grid
            marginRight={4} // 1 × 4px grid
            transition="all 0.3s ease"
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100%"
          >
            {activeChild}
          </View>
        )}

        {/* Knob */}
        <View
          borderRadius="50%"
          backgroundColor={ColorSchemes.default.knob}
          boxShadow={
            isHovered
              ? '0 2px 4px rgba(0, 0, 0, 0.2)'
              : '0 1px 2px rgba(0, 0, 0, 0.1)'
          }
          transform={isHovered ? 'scale(1.05)' : 'scale(1)'}
          {...TransitionStyles.knob}
          zIndex={1} // Ensure knob is above content
          {...KnobSizes[size]}
          {...views['circle']}
        />

        {/* Inactive content */}
        {inActiveChild && !value && (
          <View
            marginRight={8} // 2 × 4px grid
            marginLeft={4} // 1 × 4px grid
            transition="all 0.3s ease"
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100%"
          >
            {inActiveChild}
          </View>
        )}
      </View>

      {/* Label on the right side */}
      {labelPosition === 'right' && label && (
        <Text
          fontWeight="500" // Medium weight for better readability
          color={isDisabled ? 'color-gray-400' : 'color-gray-700'}
          transition="all 0.2s ease"
        >
          {label}
        </Text>
      )}
    </Label>
  );
};
export default SwitchView;
