import React from 'react';
import { BadgeProps } from './Badge/Badge.props';
import BadgeView from './Badge/Badge.view';
// Importing type definitions for BadgeProps that will be used to type-check the Badge component's props.
export const Badge = ({
  // Importing the BadgeView component which is the presentation component for Badge.
  content,
  // Exporting the Badge as a functional component from this module.
  shape,
  // Destructuring the props in the component function parameter list, to directly access individual properties.
  colorScheme,
  // The functional component Badge is implicitly returning the BadgeView component.
  position,
  // Passing all the destructured props to the BadgeView component to maintain the same API surface.
  variant,
  size,
  styles,
}: BadgeProps) => (
  <BadgeView
    content={content}
    shape={shape}
    colorScheme={colorScheme}
    position={position}
    variant={variant}
    size={size}
    styles={styles}
  />
);
