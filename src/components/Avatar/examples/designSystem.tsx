/**
 * Avatar Examples - Design System
 *
 * Showcases the Avatar component following the design guidelines:
 * - Typography: Inter/Geist font, specific sizes/weights
 * - Spacing: 4px grid system
 * - Colors: Neutral palette with semantic colors
 * - Rounded corners: Consistent border radius
 * - Transitions: Subtle animations
 */

import React from 'react';
import { Avatar } from '../Avatar';
import { Vertical } from 'app-studio';
import { Horizontal } from 'app-studio';
import { Text } from 'app-studio';
import { View } from 'app-studio';

export const DesignSystemAvatars = () => {
  // Sample image URLs
  const sampleImages = [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80',
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80',
    'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80',
  ];

  // Sample fallback initials
  const fallbackInitials = ['JD', 'AS', 'RW', 'KM', 'BT'];

  return (
    <Vertical gap={32}>
      {/* Size Variants */}
      <View>
        <Text marginBottom={8} fontWeight="600">
          Size Variants
        </Text>
        <Horizontal gap={16} alignItems="center" flexWrap="wrap">
          {['xs', 'sm', 'md', 'lg', 'xl'].map((size, index) => (
            <Vertical key={size} alignItems="center" gap={8}>
              <Avatar src={sampleImages[0]} size={size as any} />
              <Text color="color.gray.500">{size}</Text>
            </Vertical>
          ))}
        </Horizontal>
      </View>

      {/* Fallback Initials */}
      <View>
        <Text marginBottom={8} fontWeight="600">
          Fallback Initials
        </Text>
        <Horizontal gap={16} alignItems="center" flexWrap="wrap">
          {fallbackInitials.map((initials, index) => (
            <Avatar key={index} src="" fallback={initials} size="md" />
          ))}
        </Horizontal>
      </View>

      {/* Image Avatars */}
      <View>
        <Text marginBottom={8} fontWeight="600">
          Image Avatars
        </Text>
        <Horizontal gap={16} alignItems="center" flexWrap="wrap">
          {sampleImages.map((src, index) => (
            <Avatar key={index} src={src} size="md" />
          ))}
        </Horizontal>
      </View>

      {/* Custom Styling */}
      <View>
        <Text marginBottom={8} fontWeight="600">
          Custom Styling
        </Text>
        <Horizontal gap={16} alignItems="center" flexWrap="wrap">
          {/* Border */}
          <Vertical alignItems="center" gap={8}>
            <Avatar
              src={sampleImages[1]}
              views={{
                container: {
                  borderWidth: '2px',
                  borderColor: 'color.blue.500',
                },
              }}
            />
            <Text color="color.gray.500">Border</Text>
          </Vertical>

          {/* Shadow */}
          <Vertical alignItems="center" gap={8}>
            <Avatar
              src={sampleImages[2]}
              views={{
                container: {
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                },
              }}
            />
            <Text color="color.gray.500">Shadow</Text>
          </Vertical>

          {/* Custom Fallback */}
          <Vertical alignItems="center" gap={8}>
            <Avatar
              src=""
              fallback="AB"
              views={{
                container: {
                  backgroundColor: 'color.purple.100',
                },
                fallback: {
                  color: 'color.purple.700',
                  fontWeight: '600',
                },
              }}
            />
            <Text color="color.gray.500">Custom Fallback</Text>
          </Vertical>

          {/* Gradient */}
          <Vertical alignItems="center" gap={8}>
            <Avatar
              src=""
              fallback="CD"
              views={{
                container: {
                  background:
                    'linear-gradient(135deg, #4F46E5 0%, #9333EA 100%)',
                  borderColor: 'transparent',
                },
                fallback: {
                  color: 'color.white',
                  fontWeight: '600',
                },
              }}
            />
            <Text color="color.gray.500">Gradient</Text>
          </Vertical>
        </Horizontal>
      </View>

      {/* Avatar Groups */}
      <View>
        <Text marginBottom={8} fontWeight="600">
          Avatar Groups
        </Text>
        <Horizontal>
          <View position="relative" width={120} height={48}>
            {sampleImages.map((src, index) => (
              <View
                key={index}
                position="absolute"
                left={`${index * 30}px`}
                zIndex={3 - index}
              >
                <Avatar
                  src={src}
                  size="md"
                  views={{
                    container: {
                      borderWidth: '2px',
                      borderColor: 'white',
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                    },
                  }}
                />
              </View>
            ))}
          </View>
        </Horizontal>
      </View>

      {/* Interactive Avatars */}
      <View>
        <Text marginBottom={8} fontWeight="600">
          Interactive Avatars
        </Text>
        <Horizontal gap={16} alignItems="center" flexWrap="wrap">
          <Avatar
            src={sampleImages[0]}
            onClick={() => alert('Avatar clicked!')}
            views={{
              container: {
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                _hover: {
                  transform: 'scale(1.1)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                },
              },
            }}
          />
        </Horizontal>
      </View>
    </Vertical>
  );
};
