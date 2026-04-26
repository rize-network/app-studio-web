import React from 'react';
import { View, Text, Center, Vertical, Horizontal } from 'app-studio';
import { HelperText } from '../../Input/HelperText/HelperText';
import { SliderViewProps } from './Slider.props';
import {
  SliderSizes,
  SliderShapes,
  SliderVariants,
  ThumbSizes,
  EnhancedSliderSizes,
  OrientationStyles,
} from './Slider.style';
// Defines the SliderView functional component, which renders the visual representation of the slider, memoized for performance to prevent unnecessary re-renders.
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
    showTooltip = false,
    backgroundColor = 'theme-primary',
    label,
    helperText,
    themeMode: elementMode,
    shadow = {},
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
    views = {
      container: {},
      track: {},
      progress: {},
      filledTrack: {},
      thumb: {},
      label: {},
      valueLabel: {},
      stepMarks: {},
      tooltip: {},
    },
    onChange,
    onDrag,
    ...props
  }) => {
    // Assigns the `backgroundColor` prop to `themeColor` for consistent styling across different parts of the slider.
    const themeColor = backgroundColor;
    // Defines a standard color to be used when the slider is in a disabled state.
    const disabledColor = 'theme-disabled';
    // Determines the default background color of the slider track based on the selected `variant` from `SliderVariants`.
    const trackColor = SliderVariants[variant].backgroundColor as string;
    // Sets the color for the active or filled portion of the track, defaulting to `disabledColor` if the slider is `isDisabled`.
    const activeTrackColor = isDisabled ? disabledColor : themeColor;
    // A boolean flag indicating whether the slider's `orientation` is set to 'vertical', influencing layout and styling.
    const isVertical = orientation === 'vertical';
    // Calculates the track's cross-axis size and the thumb's size based on the slider's `size` property, with fallbacks to default values.
    const { trackCrossAxisSize, thumbSize } = EnhancedSliderSizes[size] || {
      trackCrossAxisSize: SliderSizes[size].height as number,
      thumbSize: (ThumbSizes[size].width as number) || 16,
    };
    // Defines the JSX structure for a 'legacy' slider view, typically used for horizontal sliders without advanced tooltip functionality.
    const legacyView = (
      <Vertical
        width="100%"
        gap={8}
        themeMode={elementMode}
        {...views.container}
        {...props}
      >
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
          cursor={isDisabled ? 'not-allowed' : 'pointer'}
          opacity={isDisabled ? 0.6 : 1}
          onMouseDown={handleTrackMouseDown}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          {...SliderSizes[size]}
          borderRadius={SliderShapes[shape]}
          backgroundColor={trackColor}
          {...SliderVariants[variant]}
          {...shadow}
          {...views.track}
        >
          {}
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
                    transform="translate(-50%, -50%)"
                    width={4}
                    height={4}
                    borderRadius="50%"
                    backgroundColor={activeTrackColor}
                    zIndex={1}
                    {...views.stepMarks}
                  />
                );
              })}
            </>
          )}
          {}
          <View
            position="absolute"
            top={0}
            left={0}
            height="100%"
            width={`${thumbPositionPercent}%`}
            backgroundColor={activeTrackColor}
            borderRadius={SliderShapes[shape]}
            transition="width 0.1s ease-in-out"
            {...views.progress}
            {...views.filledTrack}
          />
          {}
          <View
            ref={thumbRef}
            role="slider"
            tabIndex={isDisabled ? -1 : 0}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={currentValue}
            aria-orientation={orientation}
            aria-disabled={isDisabled}
            aria-label={ariaLabel}
            position="absolute"
            top="50%"
            left={`${thumbPositionPercent}%`}
            borderRadius="50%"
            backgroundColor="color-white"
            boxShadow="0 2px 4px rgba(0, 0, 0, 0.2)"
            borderWidth={2}
            borderStyle="solid"
            borderColor={activeTrackColor}
            transition={isDragging ? 'none' : 'transform 0.1s ease-in-out'}
            transform={
              isHovered
                ? 'translate(-50%, -50%) scale(1.1)'
                : 'translate(-50%, -50%)'
            }
            zIndex={2}
            onMouseDown={handleThumbMouseDown}
            onTouchStart={handleThumbMouseDown}
            onKeyDown={handleKeyDown}
            {...ThumbSizes[size]}
            {...views.thumb}
          >
            {}
            {showTooltip && (isHovered || isDragging) && (
              <View
                position="absolute"
                bottom="100%"
                left="50%"
                transform="translateX(-50%)"
                marginBottom={8}
                padding="4px 8px"
                backgroundColor="color-black"
                color="color-white"
                borderRadius={4}
                fontSize={12}
                whiteSpace="nowrap"
                zIndex={3}
                {...views.tooltip}
              >
                <Text {...views.tooltip?.text}>
                  {currentValue?.toFixed(step < 1 ? 1 : 0)}
                </Text>
              </View>
            )}
          </View>
        </View>
        {helperText && <HelperText>{helperText}</HelperText>}
      </Vertical>
    );
    const enhancedView = (
      <Center
        {...OrientationStyles[orientation]}
        position="relative"
        themeMode={elementMode}
        onMouseEnter={() => !isDisabled && setIsHovered(true)}
        onMouseLeave={() => !isDisabled && setIsHovered(false)}
        {...props}
        {...views?.container}
      >
        {label && (
          <Horizontal
            justifyContent="space-between"
            alignItems="center"
            marginBottom={8}
            width="100%"
          >
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
          borderRadius={trackCrossAxisSize / 2}
          backgroundColor={isDisabled ? disabledColor : trackColor}
          cursor={isDisabled ? 'not-allowed' : 'pointer'}
          width={isVertical ? `${trackCrossAxisSize}px` : '100%'}
          height={isVertical ? '100%' : `${trackCrossAxisSize}px`}
          onMouseDown={handleTrackMouseDown}
          onTouchStart={handleTrackMouseDown}
          {...views?.track}
        >
          {}
          {stepValues && stepValues.length > 0 && (
            <>
              {stepValues.map((stepValue) => {
                const stepPercentage = ((stepValue - min) / (max - min)) * 100;
                return (
                  <View
                    key={stepValue}
                    position="absolute"
                    width={4}
                    height={4}
                    borderRadius="50%"
                    backgroundColor={activeTrackColor}
                    zIndex={1}
                    {...(isVertical
                      ? {
                          bottom: `${stepPercentage}%`,
                          left: '50%',
                          transform: 'translate(-50%, 50%)',
                        }
                      : {
                          left: `${stepPercentage}%`,
                          top: '50%',
                          transform: 'translate(-50%, -50%)',
                        })}
                    {...views.stepMarks}
                  />
                );
              })}
            </>
          )}
          <View
            position="absolute"
            borderRadius={trackCrossAxisSize / 2}
            backgroundColor={activeTrackColor}
            {...(isVertical
              ? {
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: `${thumbPositionPercent}%`,
                }
              : {
                  top: 0,
                  left: 0,
                  height: '100%',
                  width: `${thumbPositionPercent}%`,
                })}
            {...views?.filledTrack}
            {...views?.progress}
          />
          <View
            ref={thumbRef}
            role="slider"
            tabIndex={isDisabled ? -1 : 0}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={currentValue}
            aria-orientation={orientation}
            aria-disabled={isDisabled}
            aria-label={ariaLabel}
            position="absolute"
            width={`${thumbSize}px`}
            height={`${thumbSize}px`}
            borderRadius="50%"
            backgroundColor={activeTrackColor}
            borderWidth={2}
            borderStyle="solid"
            borderColor="color-white"
            boxShadow="0 1px 3px rgba(0, 0, 0, 0.2)"
            cursor={isDisabled ? 'not-allowed' : 'grab'}
            transform={isVertical ? 'translateX(-50%)' : 'translateY(-50%)'}
            zIndex={2}
            transition={isDragging ? 'none' : 'left 0.1s, bottom 0.1s'}
            {...(isVertical
              ? {
                  left: '50%',
                  bottom: `${thumbPositionPercent}%`,
                }
              : {
                  top: '50%',
                  left: `${thumbPositionPercent}%`,
                })}
            onMouseDown={handleThumbMouseDown}
            onTouchStart={handleThumbMouseDown}
            onKeyDown={handleKeyDown}
            {...views?.thumb}
          >
            {showTooltip && (isHovered || isDragging) && (
              <View
                position="absolute"
                padding="4px 8px"
                backgroundColor={'color-black'}
                color={'color-white'}
                borderRadius="4px"
                whiteSpace="nowrap"
                zIndex={3}
                {...(isVertical
                  ? {
                      left: '100%',
                      marginLeft: '8px',
                      bottom: '0',
                      transform: 'translateY(50%)',
                    }
                  : {
                      bottom: '100%',
                      left: '50%',
                      marginBottom: '8px',
                      transform: 'translateX(-50%)',
                    })}
                {...views?.tooltip}
              >
                <Text {...views?.tooltip?.text}>
                  {currentValue?.toFixed(step < 1 ? 1 : 0)}
                </Text>
              </View>
            )}
          </View>
        </View>
        {helperText && <HelperText marginTop={8}>{helperText}</HelperText>}
      </Center>
    );
    return isVertical || showTooltip ? enhancedView : legacyView;
  }
);
