import React from 'react';
import { GradientProps } from './Gradient/Gradient.props';
import { GradientView } from './Gradient/Gradient.view';
// This file defines the main `Gradient` functional component, which serves as a wrapper to pass its properties directly to the `GradientView` component for rendering the gradient UI.
export const Gradient: React.FC<GradientProps> = (props) => {
  return <GradientView {...props} />;
};
