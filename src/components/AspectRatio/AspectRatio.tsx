import React from 'react';
import { AspectRatioProps } from './AspectRatio/AspectRatio.props';
import { AspectRatioView } from './AspectRatio/AspectRatio.view';

const AspectRatioComponent = ({
  ratio,
  children,
  ...props
}: AspectRatioProps) => {
  return (
    <AspectRatioView ratio={ratio} {...props}>
      {children}
    </AspectRatioView>
  );
};

export const AspectRatio = AspectRatioComponent;
