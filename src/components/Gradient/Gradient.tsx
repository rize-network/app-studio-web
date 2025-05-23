/**
 * Gradient Component
 *
 * A component for creating and displaying various types of gradients
 * following the design system guidelines.
 */

import React from 'react';
import { GradientProps } from './Gradient/Gradient.props';
import { GradientView } from './Gradient/Gradient.view';

/**
 * Gradient Component
 *
 * @example
 * // Basic linear gradient
 * <Gradient from="blue.500" to="purple.500" height="200px" width="100%" />
 *
 * @example
 * // Radial gradient with content
 * <Gradient
 *   type="radial"
 *   colors={[
 *     { color: 'red.500', position: '0%' },
 *     { color: 'orange.500', position: '50%' },
 *     { color: 'yellow.500', position: '100%' }
 *   ]}
 *   height="200px"
 * >
 *   <Text color="white">Content inside gradient</Text>
 * </Gradient>
 */
export const Gradient: React.FC<GradientProps> = (props) => {
  return <GradientView {...props} />;
};
