import React from 'react';
import { Typography } from 'app-studio';

import { InputVariants, PadddingWithLabel, PaddingWithoutLabel, Shapes } from '../../configs/Input.style';
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
  colorScheme = 'theme.primary',
  styles = { pickerBox: {} },
  ...props
}) => {
  const isInteractive = (isHovered || isFocused) && !isDisabled;
  const color = error ? 'error' : isInteractive ? colorScheme : 'midgray';

  return (
    <Horizontal
      gap={10}
      width="100%"
      display="flex"
      wrap="nowrap"
      borderStyle="solid"
      alignItems="center"
      borderColor={color}
      backgroundColor="trueGray.50"
      transition="padding 0.2s ease"
      justifyContent="space-between"
      fontSize={Typography.fontSizes[size]}
      filter={isHovered ? 'brightness(0.97)' : 'brightness(1)'}
      cursor={isDisabled ? 'not-allowed' : isReadOnly ? 'auto' : 'pointer'}
      {...(isWithLabel ? PadddingWithLabel : PaddingWithoutLabel)}
      {...shadow}
      {...Shapes[shape]}
      {...InputVariants[variant]}
      {...styles['box']}
      {...props}
    >
      {children}
    </Horizontal>
  );
};
