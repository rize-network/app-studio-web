/**
 * Button Examples - Design System
 *
 * Showcases the Button component following the design guidelines:
 * - Typography: Inter/Geist font, specific sizes/weights
 * - Spacing: 4px grid system
 * - Colors: Neutral palette with semantic colors
 * - Rounded corners: Consistent border radius
 * - Transitions: Subtle animations
 */

import React from 'react';
import { Button } from '../Button';
import { Vertical } from '../../Layout/Vertical/Vertical';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';
import { Text } from '../../Text/Text';
import { View } from '../../Layout/View/View';

export const DesignSystemButtons = () => (
  <Vertical gap={24}>
    {/* Size Variants */}
    <View>
      <Text marginBottom={8} fontWeight="600">
        Size Variants
      </Text>
      <Horizontal gap={16} alignItems="center" flexWrap="wrap">
        {['xs', 'sm', 'md', 'lg', 'xl'].map((size) => (
          <Button key={size} size={size as any}>
            {size.toUpperCase()}
          </Button>
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
          <Button key={variant} variant={variant as any}>
            {variant}
          </Button>
        ))}
      </Horizontal>
    </View>

    {/* Shape Variants */}
    <View>
      <Text marginBottom={8} fontWeight="600">
        Shape Variants
      </Text>
      <Horizontal gap={16} alignItems="center" flexWrap="wrap">
        {['sharp', 'rounded', 'pillShaped'].map((shape) => (
          <Button key={shape} shape={shape as any}>
            {shape}
          </Button>
        ))}
      </Horizontal>
    </View>

    {/* With Icons */}
    <View>
      <Text marginBottom={8} fontWeight="600">
        With Icons
      </Text>
      <Horizontal gap={16} alignItems="center" flexWrap="wrap">
        <Button icon={<span>→</span>} iconPosition="right">
          Right Icon
        </Button>
        <Button icon={<span>←</span>} iconPosition="left">
          Left Icon
        </Button>
        <Button icon={<span>↑</span>} iconPosition="top">
          Top Icon
        </Button>
        <Button icon={<span>↓</span>} iconPosition="bottom">
          Bottom Icon
        </Button>
      </Horizontal>
    </View>

    {/* States */}
    <View>
      <Text marginBottom={8} fontWeight="600">
        States
      </Text>
      <Horizontal gap={16} alignItems="center" flexWrap="wrap">
        <Button>Default</Button>
        <Button isDisabled>Disabled</Button>
        <Button isLoading>Loading</Button>
        <Button isLoading loaderPosition="right">
          Loading Right
        </Button>
      </Horizontal>
    </View>

    {/* Custom Styling */}
    <View>
      <Text marginBottom={8} fontWeight="600">
        Custom Styling
      </Text>
      <Horizontal gap={16} alignItems="center" flexWrap="wrap">
        <Button
          backgroundColor="color.blue.500"
          color="white"
          _hover={{
            backgroundColor: 'color.blue.600',
          }}
        >
          Custom Color
        </Button>
        <Button
          backgroundColor="color.green.500"
          color="white"
          borderRadius="16px"
          boxShadow="0 4px 14px rgba(0, 0, 0, 0.1)"
        >
          Custom Shape
        </Button>
        <Button
          backgroundColor="color.purple.500"
          color="white"
          paddingX="32px"
          fontSize="20px"
          fontWeight="bold"
        >
          Custom Text
        </Button>
      </Horizontal>
    </View>
  </Vertical>
);
