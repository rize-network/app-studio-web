import React from 'react';
import { View, Text, useTheme, Center, Vertical, Horizontal } from 'app-studio';
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

export const SliderView: React.FC<SliderViewProps> = ({
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
  backgroundColor = 'theme.primary',
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
  ...props
}) => {
  const { getColor, themeMode } = useTheme();
  const themeColor = getColor(backgroundColor, {
    themeMode: elementMode || themeMode,
  });
  const disabledColor = getColor('theme.disabled', {
    themeMode: elementMode || themeMode,
  });
  const trackColor = getColor(
    SliderVariants[variant].backgroundColor as string,
    { themeMode: elementMode || themeMode }
  );

  const isVertical = orientation === 'vertical';
  const { trackCrossAxisSize, thumbSize } = EnhancedSliderSizes[size] || {
    trackCrossAxisSize: SliderSizes[size].height as number,
    thumbSize: (ThumbSizes[size].width as number) || 16,
  };

  // For backward compatibility with the old implementation
  const legacyView = (
    <Vertical width="100%" gap={8} {...views.container} {...props}>
      {label && (
        <Horizontal justifyContent="space-between" alignItems="center">
          <Text fontSize={14} fontWeight={500} {...views.label}>
            {label}
          </Text>
          {showValue && (
            <Text
              fontSize={14}
              color="color.blueGray.500"
              {...views.valueLabel}
            >
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
        {/* Step markers */}
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
                  backgroundColor={isDisabled ? disabledColor : themeColor}
                  zIndex={1}
                  {...views.stepMarks}
                />
              );
            })}
          </>
        )}

        {/* Progress bar */}
        <View
          position="absolute"
          top={0}
          left={0}
          height="100%"
          width={`${thumbPositionPercent}%`}
          backgroundColor={isDisabled ? disabledColor : themeColor}
          borderRadius={SliderShapes[shape]}
          transition="width 0.1s ease-in-out"
          {...views.progress}
          {...views.filledTrack}
        />

        {/* Thumb */}
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
          backgroundColor="color.white"
          boxShadow="0 2px 4px rgba(0, 0, 0, 0.2)"
          border={`2px solid ${isDisabled ? disabledColor : themeColor}`}
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
          {/* Tooltip */}
          {showTooltip && (isHovered || isDragging) && (
            <View
              position="absolute"
              bottom="100%"
              left="50%"
              transform="translateX(-50%)"
              marginBottom={8}
              padding="4px 8px"
              backgroundColor="color.black"
              color="color.white"
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

  // Enhanced view with vertical support and other features
  const enhancedView = (
    <Center
      // Use Center to easily manage orientation layout
      {...OrientationStyles[orientation]}
      position="relative" // Needed for absolute positioning of thumb/tooltip
      onMouseEnter={() => !isDisabled && setIsHovered(true)}
      onMouseLeave={() => !isDisabled && setIsHovered(false)}
      {...props} // Spread remaining view props
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
            <Text
              fontSize={14}
              color="color.blueGray.500"
              {...views.valueLabel}
            >
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
        {/* Step markers */}
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
                  backgroundColor={isDisabled ? disabledColor : themeColor}
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
          backgroundColor={isDisabled ? disabledColor : themeColor}
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
          {...views?.progress} // For backward compatibility
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
          backgroundColor={isDisabled ? disabledColor : themeColor}
          border={`2px solid ${getColor('color.white')}`}
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
              backgroundColor={getColor('color.black')}
              color={getColor('color.white')}
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

  // Use the enhanced view if orientation is vertical or showTooltip is true
  // Otherwise use the legacy view for backward compatibility
  return isVertical || showTooltip ? enhancedView : legacyView;
};
