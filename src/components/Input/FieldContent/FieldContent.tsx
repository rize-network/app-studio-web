/**
 * FieldContent Component
 *
 * Renders the content area of a form field with various styles and states
 * according to the design guidelines.
 */

import React from 'react';
import { Typography, useTheme } from 'app-studio';

import {
  InputVariants,
  PadddingWithLabel,
  PaddingWithoutLabel,
  Shapes,
} from '../Input.style';
import { Horizontal } from 'app-studio';

import { ContentProps } from './FieldContent/FieldContent.props';

export const FieldContent: React.FC<ContentProps> = ({
  label,
  shadow,
  children,
  value,
  size = 'md',
  shape = 'default',
  variant = 'default',
  error = false,
  showLabel = false,
  isFocused = false,
  isHovered = false,
  isDisabled = false,
  isReadOnly = false,
  views = { pickerBox: {} },
  ...props
}) => {
  const { themeMode } = useTheme();
  const isDark = themeMode === 'dark';

  // Determine if the field is in an interactive state
  const isInteractive = (isHovered || isFocused) && !isDisabled;

  // Set the appropriate color based on state
  const color = error
    ? 'color-red-500'
    : isInteractive
    ? 'theme-primary'
    : isDark
    ? 'color-gray-700'
    : 'color-gray-200';

  return (
    <Horizontal
      // Layout properties
      gap={8} // 2 × 4px grid
      width="100%"
      display="flex"
      flexWrap="nowrap"
      alignItems="center"
      justifyContent="space-between"
      // Visual properties
      borderStyle="solid"
      borderColor={color}
      backgroundColor={isDark ? 'color-gray-900' : 'color-white'}
      fontSize={Typography.fontSizes[size]}
      // State properties
      cursor={isDisabled ? 'not-allowed' : isReadOnly ? 'auto' : 'text'}
      opacity={isDisabled ? 0.7 : 1}
      // Animation - unified 200ms timing for consistent feel
      transition="border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease"
      // Apply conditional padding based on label presence
      {...(showLabel ? PadddingWithLabel : PaddingWithoutLabel)}
      // Apply shadow if provided
      {...shadow}
      // Apply shape, variant, and custom styles
      {...Shapes[shape]}
      {...InputVariants[variant]}
      {...views?.container}
      {...props}
    >
      {children}
    </Horizontal>
  );
};
