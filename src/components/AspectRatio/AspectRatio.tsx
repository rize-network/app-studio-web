import React from 'react';
import { AspectRatioProps } from './AspectRatio/AspectRatio.props';
import { AspectRatioView } from './AspectRatio/AspectRatio.view';
// Declaration of the AspectRatioComponent functional component with destructured props.
const AspectRatioComponent = ({
  ratio,
  children,
  ...props
}: 
// Opening of the functional component's body.
AspectRatioProps) => {
// Beginning of the return statement in the functional component.
  return (
    <AspectRatioView ratio={ratio} {...props}>
      {children}
    </AspectRatioView>
  );
};
export const AspectRatio = AspectRatioComponent;
