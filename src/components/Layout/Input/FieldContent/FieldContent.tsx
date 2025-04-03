import React from 'react';
import { Typography } from 'app-studio';

import {
  InputVariants,
  PadddingWithLabel,
  PaddingWithoutLabel,
  Shapes,
} from '../../configs/Input.style';
import { Horizontal } from '../../Horizontal/Horizontal';

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
  isWithLabel = false,
  isFocused = false,
  isHovered = false,
  isDisabled = false,
  isReadOnly = false,
  views = { pickerBox: {} },
  ...props
}) => {
  const isInteractive = (isHovered || isFocused) && !isDisabled;
  const color = error ? 'error' : isInteractive ? 'theme.primary' : 'midgray';

  return (
    <Horizontal
      gap={10}
      width="100%"
      display="flex"
      flexWrap="nowrap"
      borderStyle="solid"
      alignItems="center"
      borderColor={color}
      backgroundColor="color.white"
      transition="padding 0.2s ease"
      justifyContent="space-between"
      marginBottom={5}
      fontSize={Typography.fontSizes[size]}
      // filter={isHovered ?  'brightness(1)':'brightness(0.97)'}
      cursor={isDisabled ? 'not-allowed' : isReadOnly ? 'auto' : 'pointer'}
      {...(isWithLabel ? PadddingWithLabel : PaddingWithoutLabel)}
      {...shadow}
      {...Shapes[shape]}
      {...InputVariants[variant]}
      {...views['box']}
      {...props}
    >
      {children}
    </Horizontal>
  );
};
