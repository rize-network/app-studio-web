/**
 * Label View Component (React Native)
 *
 * RN counterpart of Label.view.tsx. Drops the HTML <label> semantic (RN
 * has no label element / `htmlFor`) and renders the label text directly
 * inside a <Text/>. textDecoration is preserved (RN supports
 * textDecorationLine).
 */

import React from 'react';
import { Text, Typography } from 'app-studio';
import { LabelProps } from './Label.props';
import { HeadingSizes } from './Label.style';

const LabelView: React.FC<LabelProps> = ({
  children,
  heading,
  isItalic = false,
  isUnderlined = false,
  isStriked = false,
  weight = 'normal',
  size = 'sm',
  dropDown: _dropDown,
  error,
  isDisabled,
  helperText: _helperText,
  views: _views,
  htmlFor: _htmlFor,
  ...props
}) => {
  const headingStyles = heading ? HeadingSizes[heading] : {};
  const textDecorationLine = isStriked
    ? 'line-through'
    : isUnderlined
    ? 'underline'
    : 'none';

  return (
    <Text
      width="100%"
      fontSize={size}
      fontStyle={isItalic ? 'italic' : 'normal'}
      fontWeight={Typography.fontWeights[weight]}
      textDecorationLine={textDecorationLine as any}
      // Error wins over disabled, mirroring the web view (no cursor on RN).
      {...(error
        ? { color: 'color-red-500' }
        : isDisabled
        ? { color: 'color-gray-400' }
        : {})}
      {...headingStyles}
      {...props}
    >
      {children}
    </Text>
  );
};

export default LabelView;
