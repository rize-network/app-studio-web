/**
 * Alert View Component
 *
 * Renders an alert with various styles and states according to the design guidelines.
 */

import React from 'react';
import { View } from 'app-studio';
import { Text } from '../../Text/Text';
import { Vertical } from 'app-studio';
import { Horizontal } from 'app-studio';
import { WarningIcon, InfoIcon, ErrorIcon, SuccessIcon } from '../../Icon/Icon';
import { AlertProps } from './Alert.props';
import { Themes } from './Alert.style';

/**
 * Alert component that displays important messages to users
 */
export const AlertView = ({
  icon,
  title,
  views,
  description,
  variant = 'default',
}: AlertProps) => {
  // Select the appropriate icon based on the variant
  const getIcon = () => {
    if (icon) return icon;

    // Use the theme color directly from Themes
    const iconColor = views?.icon?.color ?? Themes[variant].icon.color;

    const iconProps = {
      size: 20,
      color: iconColor,
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
      borderColor={Themes[variant].container.borderColor}
      backgroundColor={Themes[variant].container.backgroundColor}
      boxShadow={Themes[variant].container.containerShadow}
      // Animation
      transition="all 0.2s ease"
      // Apply custom container styles
      {...views?.container}
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
          color={Themes[variant].content.color}
          {...views?.title}
        >
          {title}
        </Text>
        {/* Description */}
        <Text
          fontSize="14px"
          fontWeight="400" // Regular
          lineHeight="20px"
          color={Themes[variant].content.color}
          {...views?.description}
        >
          {description}
        </Text>
      </Vertical>
    </Horizontal>
  );
};
