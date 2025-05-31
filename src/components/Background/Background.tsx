/**
 * Background Component
 *
 * A collection of animated background effects including Aurora, Meteors,
 * and animated border effects following the design system guidelines.
 */

import React from 'react';
import { BackgroundProps } from './Background/Background.props';
import { BackgroundView } from './Background/Background.view';

/**
 * Background Component with compound pattern
 *
 * @example
 * // Aurora background
 * <Background.Aurora showRadialGradient={true}>
 *   <Text>Content with aurora background</Text>
 * </Background.Aurora>
 *
 * @example
 * // Meteors effect
 * <Background.Meteors number={20} />
 *
 * @example
 * // Wall effect
 * <Background.Wall rows={15} cols={10} squareSize={40} />
 *
 * @example
 * // Particles effect
 * <Background.Particles count={50} speed="medium" shapes={['circle', 'square']} />
 *
 * @example
 * // Grid effect
 * <Background.Grid gridSize={30} animationSpeed="medium" />
 *
 * @example
 * // Ripples effect
 * <Background.Ripples rippleCount={5} maxSize={200} frequency={3} />
 */
const BackgroundComponent = React.forwardRef<HTMLDivElement, BackgroundProps>(
  (props, ref) => <BackgroundView {...props} ref={ref} />
);

BackgroundComponent.displayName = 'Background';

export const Background = Object.assign(BackgroundComponent, {
  Aurora: BackgroundView.Aurora,
  Meteors: BackgroundView.Meteors,
  Wall: BackgroundView.Wall,
  Particles: BackgroundView.Particles,
  Grid: BackgroundView.Grid,
  Ripples: BackgroundView.Ripples,
});

Background.displayName = 'Background';
