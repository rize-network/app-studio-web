import React from 'react';
import { BackgroundProps } from './Background/Background.props';
import { BackgroundView } from './Background/Background.view';
const BackgroundComponent = React.forwardRef<HTMLDivElement, BackgroundProps>(
  (props, ref) => <BackgroundView {...props} ref={ref} />
);
BackgroundComponent.displayName = 'Background';
// This file defines the main `Background` component, which utilizes `React.forwardRef` to pass a ref to its underlying view. It then statically extends the `Background` component by attaching various specialized background variants (such as `Layout`, `Aurora`, `Meteors`, etc.) directly from `BackgroundView`, making them accessible as `Background.VariantName` properties.
export const Background = Object.assign(BackgroundComponent, {
  Layout: BackgroundView.Layout,
  Aurora: BackgroundView.Aurora,
  Meteors: BackgroundView.Meteors,
  Wall: BackgroundView.Wall,
  Particles: BackgroundView.Particles,
  Grid: BackgroundView.Grid,
  Ripples: BackgroundView.Ripples,
  Image: BackgroundView.Image,
  Video: BackgroundView.Video,
  Gradient: BackgroundView.Gradient,
  Overlay: BackgroundView.Overlay,
});
Background.displayName = 'Background';
