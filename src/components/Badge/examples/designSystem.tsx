/**
 * Badge Examples - Design System
 *
 * Showcases the Badge component following the design guidelines:
 * - Typography: Inter/Geist font, specific sizes/weights
 * - Spacing: 4px grid system
 * - Colors: Neutral palette with semantic colors
 * - Rounded corners: Consistent border radius
 * - Transitions: Subtle animations
 */

import React from 'react';
import { Badge } from '../Badge';
import { Vertical } from 'app-studio';
import { Horizontal } from 'app-studio';
import { Text } from 'app-studio';
import { View } from 'app-studio';

export const DesignSystemBadges = () => (
  <Vertical gap={24}>
    {/* Size Variants */}
    <View>
      <Text marginBottom={8} fontWeight="600">
        Size Variants
      </Text>
      <Horizontal gap={16} alignItems="center" flexWrap="wrap">
        {['xs', 'sm', 'md', 'lg', 'xl'].map((size) => (
          <Badge key={size} content={size} size={size as any} />
        ))}
      </Horizontal>
    </View>

    {/* Style Variants */}
    <View>
      <Text marginBottom={8} fontWeight="600">
        Style Variants
      </Text>
      <Horizontal gap={16} alignItems="center" flexWrap="wrap">
        {['filled', 'outline', 'ghost', 'link'].map((variant) => (
          <Badge key={variant} content={variant} variant={variant as any} />
        ))}
      </Horizontal>
    </View>

    {/* Shape Variants */}
    <View>
      <Text marginBottom={8} fontWeight="600">
        Shape Variants
      </Text>
      <Horizontal gap={16} alignItems="center" flexWrap="wrap">
        {['square', 'rounded', 'pill'].map((shape) => (
          <Badge key={shape} content={shape} shape={shape as any} />
        ))}
      </Horizontal>
    </View>

    {/* Position Examples */}
    <View>
      <Text marginBottom={8} fontWeight="600">
        Position Examples
      </Text>
      <Horizontal gap={24} alignItems="flex-start" flexWrap="wrap">
        {['top-right', 'top-left', 'bottom-right', 'bottom-left'].map(
          (position) => (
            <View
              key={position}
              width="100px"
              height="100px"
              backgroundColor="color-gray-100"
              position="relative"
              borderRadius="8px"
            >
              <Badge
                content={position.split('-')[1]}
                position={position as any}
                size="sm"
              />
              <Text
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                color="color-gray-500"
              >
                {position}
              </Text>
            </View>
          )
        )}
      </Horizontal>
    </View>

    {/* Custom Styling */}
    <View>
      <Text marginBottom={8} fontWeight="600">
        Custom Styling
      </Text>
      <Horizontal gap={16} alignItems="center" flexWrap="wrap">
        <Badge content="New" backgroundColor="color-blue-500" color="white" />
        <Badge
          content="Sale"
          backgroundColor="color-green-500"
          color="white"
          borderRadius="16px"
        />
        <Badge
          content="Hot"
          backgroundColor="color-red-500"
          color="white"
          fontWeight="bold"
        />
        <Badge
          content="Premium"
          views={{
            container: {
              background: 'linear-gradient(90deg, #4F46E5 0%, #9333EA 100%)',
              color: 'color-white',
              boxShadow: '0 2px 8px rgba(99, 102, 241, 0.3)',
            },
            text: {
              fontWeight: 'bold',
              letterSpacing: '0.05em',
            },
          }}
        />
      </Horizontal>
    </View>
  </Vertical>
);
