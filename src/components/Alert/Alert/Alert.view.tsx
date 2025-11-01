/**
 * Alert View Component
 *
 * Renders an alert with various styles and states according to the design guidelines.
 */

import React from 'react';
import { View, useTheme } from 'app-studio';
import { Text } from '../../Text/Text';
import { Vertical } from 'app-studio';
import { Horizontal } from 'app-studio';
import { WarningIcon, InfoIcon, ErrorIcon, SuccessIcon } from '../../Icon/Icon';
import { AlertProps } from './Alert.props';
import { getThemes } from './Alert.style';
import contrast from 'contrast';

/**
 * Alert component that displays important messages to users
 */
export const AlertView = ({
  icon,
  title = '',
  views,
  description = '',
  variant = 'default',
  bgColor,
  themeMode: elementMode,
  children,
  ...props
}: AlertProps) => {
  const { themeMode, getColor } = useTheme();
  const currentThemeMode = elementMode || themeMode;
  const themes = getThemes(currentThemeMode);

  // Calculate colors based on bgColor if provided
  let backgroundColor = themes[variant].container.backgroundColor;
  let textColor = themes[variant].content.color;
  let iconColor = themes[variant].icon.color;
  let borderColor = themes[variant].container.borderColor;

  if (bgColor) {
    backgroundColor = bgColor;

    // Get the actual color value and determine if it's light or dark
    const actualBgColor = getColor(bgColor, { themeMode: currentThemeMode });
    const tone = contrast(actualBgColor);

    // Set appropriate text and icon colors based on background luminance
    textColor = tone === 'light' ? 'color.black' : 'color.white';
    iconColor = textColor;

    // For border, use a slightly darker/lighter version of the text color
    borderColor = tone === 'light' ? 'color.gray.300' : 'color.gray.600';
  }

  // Select the appropriate icon based on the variant
  const getIcon = () => {
    if (icon) return icon;

    // Use the calculated icon color or custom color from views
    const finalIconColor = views?.icon?.color ?? iconColor;

    const iconProps = {
      size: 20,
      color: finalIconColor,
    };

    switch (variant) {
      case 'info':
        return <InfoIcon {...iconProps} />;
      case 'success':
        return <SuccessIcon {...iconProps} />;
      case 'error':
        return <ErrorIcon {...iconProps} />;
      case 'warning':
      default:
        return <WarningIcon {...iconProps} />;
    }
  };

  return (
    <Horizontal
      // Layout properties
      gap={12} // 3 × 4px grid
      padding="16px" // 4 × 4px grid
      flexWrap="nowrap"
      alignItems="flex-start"
      // Visual properties
      borderRadius="8px" // Consistent with design system (rounded-md)
      borderWidth="1px"
      borderStyle="solid"
      borderColor={borderColor}
      backgroundColor={backgroundColor}
      boxShadow={themes[variant].container.boxShadow}
      // Animation
      transition="all 0.2s ease"
      // Apply custom container styles and any other props
      {...views?.container}
      {...props}
    >
      {/* Icon */}
      <View alignSelf="flex-start" marginTop="2px" {...views?.icon}>
        {getIcon()}
      </View>

      {/* Content */}
      <Vertical gap={8}>
        {' '}
        {/* 2 × 4px grid */}
        {/* Title */}
        <Text
          fontSize="16px"
          fontWeight="600" // Semi-bold
          lineHeight="24px"
          color={textColor}
          {...views?.title}
        >
          {title}
        </Text>
        {/* Description */}
        <Text
          fontSize="14px"
          fontWeight="400" // Regular
          lineHeight="20px"
          color={textColor}
          {...views?.description}
        >
          {description || children}
        </Text>
      </Vertical>
    </Horizontal>
  );
};
