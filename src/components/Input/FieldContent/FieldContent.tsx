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
import { fieldSizeProps } from '../fieldSizes';
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
    : 'color-gray-200';

  return (
    <Horizontal
      gap={8}
      width="100%"
      // Fields set `width: 100%` and then add their own padding/border, so they
      // only fit their container under border-box. Declared here rather than
      // relying on a host `* { box-sizing: border-box }` reset, whose absence
      // otherwise makes every field overflow its parent by padding + border.
      boxSizing="border-box"
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
      // Sizing belongs to the shell, not to each field. Those padding constants
      // above are size-independent (both are 10px/12px), so without this every
      // field rendered at roughly `md` height whatever size was asked for.
      // Placed after them so it wins, and before `views`/`props` so a caller can
      // still override.
      {...fieldSizeProps(size)}
      {...(typeof shadow === 'object' && shadow !== null ? shadow : {})}
      {...Shapes[shape]}
      {...InputVariants[variant]}
      {...views?.container}
      {...props}
    >
      {children}
    </Horizontal>
  );
};
