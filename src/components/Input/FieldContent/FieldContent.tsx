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
  const color = error
    ? 'color-red-500'
    : isInteractive
    ? 'theme-primary'
    : '#E5E7EB';

  return (
    <Horizontal
      gap={8}
      width="100%"
      display="flex"
      flexWrap="nowrap"
      alignItems="center"
      justifyContent="flex-start"
      borderStyle="solid"
      borderColor={color}
      backgroundColor={isDark ? 'color-gray-900' : 'color-white'}
      fontSize={Typography.fontSizes[size]}
      cursor={isDisabled ? 'not-allowed' : isReadOnly ? 'auto' : 'text'}
      opacity={isDisabled ? 0.7 : 1}
      transition="border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease"
      {...(showLabel ? PadddingWithLabel : PaddingWithoutLabel)}
      {...shadow}
      {...Shapes[shape]}
      {...InputVariants[variant]}
      {...views?.container}
      {...props}
    >
      {children}
    </Horizontal>
  );
};
