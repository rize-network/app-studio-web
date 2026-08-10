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
import { Vertical } from 'app-studio';
import { SwitchViewProps } from './Switch.props';
import {
  KnobSizes,
  SliderPadding,
  SliderSizes,
  ContentSliderSizes,
  ContentFontSizes,
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
  setOn = () => {},
  onChange,
  setValue = () => {},
  setIsHovered = () => {},
  helperText,
  description,
  views = { slider: {}, circle: {}, label: {} },
  ...props
}) => {
  const generatedId = React.useId();
  const switchId = id ?? generatedId;
  const [isFocused, setIsFocused] = React.useState(false);
  const checked = typeof isChecked === 'boolean' ? isChecked : value;
  const hasContent = Boolean(activeChild || inActiveChild);
  const sliderDimensions = hasContent
    ? ContentSliderSizes[size]
    : SliderSizes[size];
  const knobOffset = `${SliderPadding[size].paddingHorizontal}px`;
  const contentSpace = `${SliderPadding[size].paddingHorizontal + 2}px`;
  const contentInset = `calc(${KnobSizes[size].width} + ${SliderPadding[size].paddingHorizontal}px + 4px)`;
  const contentFontSize = ContentFontSizes[size];

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
  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    let visible = true;
    try {
      visible = event.target.matches(':focus-visible');
    } catch {
      // engines without :focus-visible support: always show the ring
    }
    setIsFocused(visible);
  };
  const handleBlur = () => setIsFocused(false);
  const descriptionId = `${switchId}-description`;
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
      transition: 'all 0.2s ease-in-out',

      // Apply custom styles
      ...views.label,
    },
  };
  // Rest props are routed to the input only: spreading them here as well
  // landed consumer `aria-*`/`id` attributes on two elements at once.
  const control = (
    <Label
      htmlFor={switchId}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...switchStyle.container}
    >
      {/* Label on the left side */}
      {labelPosition === 'left' && label && (
        <Text
          fontWeight="500" // Medium weight for better readability
          color={isDisabled ? 'color-gray-400' : 'inherit'}
          transition="color 0.2s ease, opacity 0.2s ease"
        >
          {label}
        </Text>
      )}

      {/* Switch slider */}
      <View
        // Layout properties
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
        marginBottom={4} // 1 × 4px grid
        // Visual properties
        borderRadius="9999px" // Full rounded for pill shape
        backgroundColor={
          isDisabled
            ? ColorSchemes.default.disabled
            : checked
            ? isHovered
              ? ColorSchemes.states.hover.active
              : ColorSchemes.default.active
            : isHovered
            ? ColorSchemes.states.hover.inactive
            : ColorSchemes.default.inactive
        }
        opacity={
          !isDisabled && checked && isHovered
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
        {...sliderDimensions}
        {...views['slider']}
        {...(isFocused
          ? checked
            ? ColorSchemes.states.focus.active
            : ColorSchemes.states.focus.inactive
          : {})}
      >
        {/* Real control: a transparent input covering the whole track, so the
            element found by role/name is the one that receives clicks */}
        <SwitchContent
          id={switchId}
          name={name}
          role="switch"
          aria-checked={checked}
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          margin={0}
          opacity={0}
          zIndex={2}
          cursor={
            isDisabled ? 'not-allowed' : isReadOnly ? 'default' : 'pointer'
          }
          checked={checked}
          onChange={handleToggle}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={isDisabled}
          readOnly={isReadOnly}
          aria-describedby={description ? descriptionId : undefined}
          {...props}
        />
        {/* Active content */}
        {activeChild && checked && (
          <View
            marginLeft={contentSpace}
            marginRight={contentInset}
            transition="all 0.2s ease-in-out"
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100%"
            width="100%"
            overflow="hidden"
            fontSize={contentFontSize}
            color="color-white"
            fontWeight={600}
          >
            {activeChild}
          </View>
        )}

        {/* Knob */}
        <View
          position="absolute"
          top="50%"
          left={checked ? undefined : knobOffset}
          right={checked ? knobOffset : undefined}
          borderRadius="50%"
          backgroundColor={ColorSchemes.default.knob}
          boxShadow={
            isHovered
              ? '0 4px 10px rgba(15, 23, 42, 0.18)'
              : '0 1px 3px rgba(15, 23, 42, 0.18)'
          }
          transform={`translateY(-50%) ${
            isHovered ? 'scale(1.05)' : 'scale(1)'
          }`}
          {...TransitionStyles.knob}
          zIndex={1} // Ensure knob is above content
          {...KnobSizes[size]}
          {...views['circle']}
        />

        {/* Inactive content */}
        {inActiveChild && !checked && (
          <View
            marginLeft={contentInset}
            marginRight={contentSpace}
            transition="all 0.2s ease-in-out"
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100%"
            width="100%"
            overflow="hidden"
            fontSize={contentFontSize}
            color="color-white"
            fontWeight={600}
          >
            {inActiveChild}
          </View>
        )}
      </View>

      {/* Label on the right side */}
      {labelPosition === 'right' && label && (
        <Text
          fontWeight="500" // Medium weight for better readability
          color={isDisabled ? 'color-gray-400' : 'inherit'}
          transition="all 0.2s ease-in-out"
        >
          {label}
        </Text>
      )}
    </Label>
  );

  if (!description) return control;

  // The description sits outside the <label> so it describes the input via
  // `aria-describedby` instead of polluting its accessible name.
  return (
    <Vertical gap={4} width="fit-content">
      {control}
      <Text
        id={descriptionId}
        color="color-gray-500"
        fontSize="14px"
        lineHeight="20px"
      >
        {description}
      </Text>
    </Vertical>
  );
};
export default SwitchView;
