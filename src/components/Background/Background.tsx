/**
 * Background Component
 *
 * A comprehensive collection of background effects including animated backgrounds
 * (Aurora, Meteors, Particles, Grid, Ripples, Wall), background images with overlays,
 * and gradient backgrounds. All components follow the design system guidelines and
 * integrate seamlessly with the app-studio theme system.
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
 *
 * @example
 * // Background Image
 * <Background.Image src="/path/to/image.jpg" size="cover" overlay="rgba(0,0,0,0.5)">
 *   <Text color="white">Content over image</Text>
 * </Background.Image>
 *
 * @example
 * // Background Video
 * <Background.Video src="/path/to/video.mp4" overlay="rgba(0,0,0,0.5)">
 *   <Text color="white">Content over video</Text>
 * </Background.Video>
 *
 * @example
 * // Background Gradient
 * <Background.Gradient from="blue.500" to="purple.500" animate={true}>
 *   <Text color="white">Content over gradient</Text>
 * </Background.Gradient>
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
  Image: BackgroundView.Image,
  Video: BackgroundView.Video,
  Gradient: BackgroundView.Gradient,
});

Background.displayName = 'Background';
