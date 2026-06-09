import React from 'react';
import { View, Text, Vertical, Horizontal } from 'app-studio';
import { HelperText } from '../../Input/HelperText/HelperText';
import { SliderViewProps } from './Slider.props';
import {
  SliderSizes,
  SliderShapes,
  SliderVariants,
  ThumbSizes,
  EnhancedSliderSizes,
} from './Slider.style';

const isRawCssColor = (value?: string) =>
  typeof value === 'string' &&
  (/^(#|rgb\(|rgba\(|hsl\(|hsla\(|var\()/.test(value) ||
    ['black', 'currentColor', 'inherit', 'transparent', 'white'].includes(
      value
    ));

const colorStyleProp = (property: string, value: string) =>
  isRawCssColor(value)
    ? { style: { [property]: value } }
    : { [property]: value };

export const SliderView: React.FC<SliderViewProps> = React.memo(
  ({
    min = 0,
    max = 100,
    step = 1,
    currentValue,
    stepValues,
    shape = 'rounded',
    size = 'md',
    variant = 'default',
    orientation = 'horizontal',
    isDisabled = false,
    showValue = false,
    backgroundColor = 'theme-primary',
    label,
    helperText,
    themeMode: elementMode,
    isDragging,
    isHovered,
    setIsHovered,
    trackRef,
    thumbRef,
    handleThumbMouseDown,
    handleTrackMouseDown,
    handleKeyDown,
    thumbPositionPercent,
    ariaLabel = 'Slider',
    views = {},
    onChange,
    onDrag,
    value,
    defaultValue,
    ...props
  }) => {
    const themeColor = backgroundColor;
    const disabledColor = 'theme-disabled';
    const trackColor = SliderVariants[variant].backgroundColor as string;
    const activeTrackColor = isDisabled ? disabledColor : themeColor;
    const { trackCrossAxisSize, thumbSize } = EnhancedSliderSizes[size] || {
      trackCrossAxisSize: SliderSizes[size].height as number,
      thumbSize: (ThumbSizes[size].width as number) || 16,
    };
    return (
      <Vertical width="100%" gap={8} {...views.container} {...(props as any)}>
        {label && (
          <Horizontal justifyContent="space-between" alignItems="center">
            <Text fontSize={14} fontWeight={500} {...views.label}>
              {label}
            </Text>
            {showValue && (
              <Text fontSize={14} color="color-gray-500" {...views.valueLabel}>
                {currentValue}
              </Text>
            )}
          </Horizontal>
        )}
        <View
          ref={trackRef}
          position="relative"
          opacity={isDisabled ? 0.6 : 1}
          onStartShouldSetResponder={() => !isDisabled}
          onResponderGrant={handleTrackMouseDown}
          {...SliderSizes[size]}
          borderRadius={SliderShapes[shape]}
          backgroundColor={trackColor}
          {...SliderVariants[variant]}
          {...views.track}
        >
          {stepValues && stepValues.length > 0 && (
            <>
              {stepValues.map((stepValue) => {
                const stepPercentage = ((stepValue - min) / (max - min)) * 100;
                return (
                  <View
                    key={stepValue}
                    position="absolute"
                    top="50%"
                    left={`${stepPercentage}%`}
                    width={4}
                    height={4}
                    borderRadius={2}
                    zIndex={1}
                    {...colorStyleProp('backgroundColor', activeTrackColor)}
                    {...views.stepMarks}
                  />
                );
              })}
            </>
          )}
          <View
            position="absolute"
            top={0}
            left={0}
            height="100%"
            width={`${thumbPositionPercent}%`}
            borderRadius={SliderShapes[shape]}
            {...colorStyleProp('backgroundColor', activeTrackColor)}
            {...views.progress}
            {...views.filledTrack}
          />
          <View
            ref={thumbRef}
            position="absolute"
            top="50%"
            left={`${thumbPositionPercent}%`}
            borderRadius={thumbSize / 2}
            backgroundColor="color-white"
            borderWidth={2}
            borderStyle="solid"
            zIndex={2}
            {...colorStyleProp('borderColor', activeTrackColor)}
            onStartShouldSetResponder={() => !isDisabled}
            onResponderGrant={handleThumbMouseDown}
            {...ThumbSizes[size]}
            {...views.thumb}
          />
        </View>
        {helperText && <HelperText>{helperText}</HelperText>}
      </Vertical>
    );
  }
);
