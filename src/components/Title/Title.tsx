import React from 'react';

import { TitleProps } from './Title/Title.props';
import TitleView from './Title/Title.view';

/**
 * Title Component
 *
 * A component for rendering animated and highlighted titles in hero sections.
 *
 * Features:
 * - Text highlighting with various styles (background, underline, gradient, outline, glow)
 * - Multiple animation options (fade, slide, typewriter, reveal)
 * - Responsive sizing
 * - Customizable styling
 *
 * @example
 * // Basic usage
 * <Title>Welcome to Our Platform</Title>
 *
 * @example
 * // With highlighting
 * <Title highlightText="Platform" highlightStyle="background" highlightColor="theme.primary">
 *   Welcome to Our Platform
 * </Title>
 *
 * @example
 * // With animation
 * <Title
 *   animation="fadeIn"
 *   animationDuration="1.5s"
 *   size="xl"
 * >
 *   Animated Title
 * </Title>
 *
 * @example
 * // With multiple highlights
 * <Title
 *   highlightText={["Amazing", "Features"]}
 *   highlightStyle="gradient"
 *   highlightColor="theme.primary"
 *   highlightSecondaryColor="theme.secondary"
 * >
 *   Discover our Amazing Product with Great Features
 * </Title>
 */
const TitleComponent: React.FC<TitleProps> = (props) => {
  return <TitleView {...props} />;
};

export const Title = TitleComponent;
