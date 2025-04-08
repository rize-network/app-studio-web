import React, { useRef, useEffect } from 'react';
import { useTheme } from 'app-studio';
import { View } from '../../../components/Layout/View/View';
import { Vertical } from '../../../components/Layout/Vertical/Vertical';
import { Horizontal } from '../../../components/Layout/Horizontal/Horizontal';
import { Text } from '../../../components/Text/Text';
import { HelperText } from '../../../components/Layout/Input/HelperText/HelperText';
import { SliderViewProps } from './Slider.props';
import {
  SliderSizes,
  SliderShapes,
  SliderVariants,
  ThumbSizes,
} from './Slider.style';

const SliderView: React.FC<SliderViewProps> = ({
  min = 0,
  max = 100,
  value = 50,
  step = 1,
  stepValues,
  shape = 'rounded',
  size = 'md',
  variant = 'default',
  isDisabled = false,
  showValue = false,
  label,
  helperText,
  themeMode: elementMode,
  shadow = {},
  isHovered = false,
  setIsHovered = () => {},
  setValue = () => {},
  onDrag,
  views = {
    container: {},
    track: {},
    progress: {},
    thumb: {},
    label: {},
    valueLabel: {},
    stepMarks: {},
  },
  ...props
}) => {
  const { getColor, themeMode } = useTheme();
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const primaryColor = getColor(
    'theme.primary',
    elementMode ? elementMode : themeMode
  );
  const disabledColor = getColor(
    'theme.disabled',
    elementMode ? elementMode : themeMode
  );
  const trackColor = getColor(
    SliderVariants[variant].backgroundColor as string,
    elementMode ? elementMode : themeMode
  );

  // Calculate the percentage for the progress bar
  const percentage = ((value - min) / (max - min)) * 100;

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDisabled) return;

    isDragging.current = true;
    updateValue(e);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging.current) {
      updateValue(e);
      if (onDrag) {
        onDrag(value);
      }
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const updateValue = (e: MouseEvent | React.MouseEvent) => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const width = rect.width;

    let newPercentage = (offsetX / width) * 100;
    newPercentage = Math.max(0, Math.min(100, newPercentage));

    // If stepValues are provided, find the closest value in the array
    if (stepValues && stepValues.length > 0) {
      const rawValue = min + (newPercentage / 100) * (max - min);

      // Find the closest value in stepValues
      let closestValue = stepValues[0];
      let minDistance = Math.abs(rawValue - closestValue);

      for (let i = 1; i < stepValues.length; i++) {
        const distance = Math.abs(rawValue - stepValues[i]);
        if (distance < minDistance) {
          minDistance = distance;
          closestValue = stepValues[i];
        }
      }

      setValue(closestValue);
    } else {
      // Use regular step logic
      const rawValue = min + (newPercentage / 100) * (max - min);
      const steppedValue = Math.round(rawValue / step) * step;
      const clampedValue = Math.max(min, Math.min(max, steppedValue));

      setValue(clampedValue);
    }
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
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
              {value}
            </Text>
          )}
        </Horizontal>
      )}

      <View
        ref={sliderRef}
        position="relative"
        cursor={isDisabled ? 'not-allowed' : 'pointer'}
        opacity={isDisabled ? 0.6 : 1}
        onMouseDown={handleMouseDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
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
                  backgroundColor={isDisabled ? disabledColor : primaryColor}
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
          width={`${percentage}%`}
          backgroundColor={isDisabled ? disabledColor : primaryColor}
          borderRadius={SliderShapes[shape]}
          transition="width 0.1s ease-in-out"
          {...views.progress}
        />

        {/* Thumb */}
        <View
          position="absolute"
          top="50%"
          left={`${percentage}%`}
          borderRadius="50%"
          backgroundColor="white"
          boxShadow="0 2px 4px rgba(0, 0, 0, 0.2)"
          border={`2px solid ${isDisabled ? disabledColor : primaryColor}`}
          transition="transform 0.1s ease-in-out"
          transform={
            isHovered
              ? 'translate(-50%, -50%) scale(1.1)'
              : 'translate(-50%, -50%)'
          }
          zIndex={2}
          {...ThumbSizes[size]}
          {...views.thumb}
        />
      </View>

      {helperText && <HelperText>{helperText}</HelperText>}
    </Vertical>
  );
};

export default SliderView;
