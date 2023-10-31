import React from 'react';
import { Element, Typography } from 'app-studio';

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
  ...props
}) => {
  const headingStyles = heading ? HeadingSizes[heading] : {};

  return (
    <Element
      as="label"
      width="100%"
      fontSize={size}
      fontStyle={isItalic ? 'italic' : 'normal'}
      fontWeight={Typography.fontWeights[weight]}
      textDecoration={isStriked ? 'line-through' : isUnderlined ? 'underline' : 'none'}
      {...headingStyles}
      {...props}
    >
      {children}
    </Element>
  );
};

export default LabelView;
